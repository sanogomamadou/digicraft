import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, '.', '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      // Dev-only middleware: simulates the /api/chat Vercel serverless route locally
      {
        name: 'api-chat-dev',
        apply: 'serve' as const,
        configureServer(server) {
          server.middlewares.use('/api/chat', (req, res) => {
            if (req.method !== 'POST') {
              res.writeHead(405);
              res.end('Method Not Allowed');
              return;
            }

            const apiKey = env.GROQ_API_KEY;
            console.log('[api/chat] Groq key present:', !!apiKey, '| starts with:', apiKey?.slice(0, 8));

            if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY_HERE') {
              console.log('[api/chat] ❌ No valid Groq API key');
              res.writeHead(503, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'no_api_key' }));
              return;
            }

            const body: Buffer[] = [];
            req.on('data', (chunk: Buffer) => body.push(chunk));
            req.on('end', () => {
              void handleGroqChat(res, apiKey, body);
            });
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    // Build serveur (pré-génération du HTML) : tout est embarqué dans le bundle Node
    ssr: { noExternal: true },
    build: {
      // Le build serveur n'a pas besoin du dossier public/
      copyPublicDir: !isSsrBuild,
      // Code splitting : séparer les grosses librairies en chunks distincts
      // Permet au navigateur de les mettre en cache indépendamment
      rollupOptions: isSsrBuild ? {} : {
        output: {
          manualChunks(id) {
            // React core — chargé en premier, toujours
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'chunk-react';
            }
            // GSAP animations — utilisé par le hero
            if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap')) {
              return 'chunk-gsap';
            }
            // Lucide icons
            if (id.includes('node_modules/lucide-react')) {
              return 'chunk-icons';
            }
            // react-simple-maps : très lourd (topojson + d3), chargé en lazy
            if (id.includes('node_modules/react-simple-maps') || id.includes('node_modules/topojson') || id.includes('node_modules/d3')) {
              return 'chunk-maps';
            }
            // Motion library
            if (id.includes('node_modules/motion') || id.includes('node_modules/framer-motion')) {
              return 'chunk-motion';
            }
            // SDK IA / Chatbot — chargé uniquement quand le chatbot est ouvert
            if (id.includes('node_modules/groq-sdk') || id.includes('node_modules/@google/genai')) {
              return 'chunk-ai-sdk';
            }
          },
        },
      },
    },
  };
});

// Modèle Groq par défaut (surchargeable via GROQ_MODEL). Liste : https://console.groq.com/docs/models
const GROQ_DEFAULT_MODEL = 'openai/gpt-oss-120b';

/** Les modèles « raisonneurs » (gpt-oss, qwen3) : effort bas et raisonnement masqué pour un chat rapide. */
function reasoningParams(model: string) {
  return /gpt-oss|qwen3/i.test(model) ? { reasoning_effort: 'low' as const, include_reasoning: false } : {};
}

async function handleGroqChat(
  res: import('http').ServerResponse,
  apiKey: string,
  body: Buffer[]
) {
  let headersSent = false;
  try {
    const { message, history } = JSON.parse(Buffer.concat(body).toString()) as {
      message: string;
      history: { role: 'user' | 'model'; parts: { text: string }[] }[];
    };

    console.log('[api/chat] ✅ Message received:', message?.slice(0, 60));

    const { default: Groq } = await import('groq-sdk');
    // Même base de connaissances qu'en production (source unique dans api/chat.ts)
    const { DIGICRAFT_SYSTEM_PROMPT } = await import('./api/chat');

    const groq = new Groq({ apiKey });
    const model = process.env.GROQ_MODEL || GROQ_DEFAULT_MODEL;

    // Convert history from Gemini format → OpenAI/Groq format
    const messages: { role: 'system' | 'user' | 'assistant'; content: string }[] = [
      { role: 'system', content: DIGICRAFT_SYSTEM_PROMPT },
      ...(history ?? []).map((m) => ({
        role: (m.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: m.parts[0]?.text ?? '',
      })),
      { role: 'user', content: message.trim() },
    ];

    // On ouvre le flux AVANT d'envoyer les en-têtes : une erreur Groq (modèle retiré,
    // clé invalide, quota) remonte ainsi en vrai code HTTP au lieu d'une réponse vide.
    const stream = await groq.chat.completions.create({
      model,
      messages,
      stream: true,
      max_tokens: 1024,
      ...reasoningParams(model),
    });

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    });
    headersSent = true;

    let totalChars = 0;
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      if (text) {
        res.write(text);
        totalChars += text.length;
      }
    }
    res.end();
    console.log('[api/chat] ✅ Stream done, chars:', totalChars);
  } catch (err: unknown) {
    console.error('[api/chat] ❌ Error:', err);
    if (!headersSent) {
      const error = err as { status?: number };
      const isQuota = error?.status === 429;
      res.writeHead(isQuota ? 429 : 500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: isQuota ? 'quota_exceeded' : 'api_error' }));
    } else {
      res.end();
    }
  }
}
