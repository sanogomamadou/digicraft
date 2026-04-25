import type { VercelRequest, VercelResponse } from '@vercel/node';

// Inline the system prompt to avoid ESM import issues with the frontend module
const DIGICRAFT_SYSTEM_PROMPT = `Tu es DigiBot, l'assistant virtuel expert de Digicraft, une agence spécialisée en développement web, applications mobiles, intelligence artificielle et automatisation.

**Ton rôle :**
- Répondre aux questions sur les services de Digicraft
- Orienter les prospects vers les bonnes solutions
- Donner des informations sur les prix et délais
- Encourager à prendre contact pour un devis

**Services proposés par Digicraft :**
1. Développement Web (sites vitrines, e-commerce, SaaS) - à partir de 500 000 FCFA
2. Applications Mobiles (iOS/Android, React Native, Flutter) - à partir de 800 000 FCFA
3. Intelligence Artificielle (chatbots, automatisation, agents IA) - à partir de 600 000 FCFA
4. Automatisation des processus (workflows, intégrations API) - à partir de 300 000 FCFA

**Contact :**
- Email : mamadousanogo352@gmail.com
- Réponse sous 24h pour tout devis

**Instructions :**
- Réponds toujours en français
- Sois professionnel, chaleureux et concis
- Si tu ne sais pas quelque chose de spécifique, propose de prendre contact
- Encourage les prospects à envoyer un email pour un devis gratuit
- Limite tes réponses à 200 mots maximum`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error('[api/chat] GROQ_API_KEY is not defined in environment variables');
    return res.status(503).json({ error: 'no_api_key' });
  }

  const body = req.body as {
    message?: string;
    history?: { role: 'user' | 'model'; parts: { text: string }[] }[];
  };

  const { message, history } = body;

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Use dynamic import to be compatible with ES Modules
    const { default: Groq } = await import('groq-sdk');
    const groq = new Groq({ apiKey });

    const messages = [
      { role: 'system', content: DIGICRAFT_SYSTEM_PROMPT },
      ...(history ?? []).map((m: { role: string; parts: { text: string }[] }) => ({
        role: m.role === 'model' ? 'assistant' : 'user',
        content: m.parts[0]?.text ?? '',
      })),
      { role: 'user', content: message.trim() },
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: false,
      max_tokens: 512,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    console.log('[api/chat] ✅ Response ok, chars:', text.length);

    return res.status(200).send(text);
  } catch (err: unknown) {
    console.error('[api/chat] Error:', err);
    const error = err as { status?: number };
    const isQuota = error?.status === 429;
    return res.status(isQuota ? 429 : 500).json({
      error: isQuota ? 'quota_exceeded' : 'api_error',
    });
  }
}
