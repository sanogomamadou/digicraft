import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
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
  };
});

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
    const { DIGICRAFT_SYSTEM_PROMPT } = await import('./src/chatbot/chatbotKnowledge');

    const groq = new Groq({ apiKey });

    // Convert history from Gemini format → OpenAI/Groq format
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: DIGICRAFT_SYSTEM_PROMPT },
      ...(history ?? []).map((m) => ({
        role: (m.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: m.parts[0]?.text ?? '',
      })),
      { role: 'user', content: message.trim() },
    ];

    res.writeHead(200, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
    });
    headersSent = true;

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: true,
      max_tokens: 1024,
    });

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
