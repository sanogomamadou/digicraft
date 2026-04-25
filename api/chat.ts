import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import { DIGICRAFT_SYSTEM_PROMPT } from '../src/chatbot/chatbotKnowledge';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers (needed for Vercel deployments)
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
    console.error('[api/chat] ❌ GROQ_API_KEY is not set in environment');
    return res.status(503).json({ error: 'no_api_key' });
  }

  const { message, history } = req.body as {
    message: string;
    history: { role: 'user' | 'model'; parts: { text: string }[] }[];
  };

  if (!message?.trim()) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const groq = new Groq({ apiKey });

    // Convert history from Gemini format to OpenAI/Groq format
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: DIGICRAFT_SYSTEM_PROMPT },
      ...(history ?? []).map((m) => ({
        role: (m.role === 'model' ? 'assistant' : 'user') as 'user' | 'assistant',
        content: m.parts[0]?.text ?? '',
      })),
      { role: 'user', content: message.trim() },
    ];

    // Non-streaming: returns the full response at once (required for Vercel Serverless Functions)
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: false,
      max_tokens: 1024,
    });

    const text = completion.choices[0]?.message?.content ?? '';
    console.log('[api/chat] ✅ Response ready, chars:', text.length);

    return res.status(200).send(text);
  } catch (err: unknown) {
    console.error('[api/chat] ❌ Error:', err);
    const error = err as { status?: number; message?: string };
    const isQuota = error?.status === 429;
    return res.status(isQuota ? 429 : 500).json({
      error: isQuota ? 'quota_exceeded' : 'api_error',
    });
  }
}
