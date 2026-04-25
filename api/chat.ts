import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import { DIGICRAFT_SYSTEM_PROMPT } from '../src/chatbot/chatbotKnowledge';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
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

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');

    const stream = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      stream: true,
      max_tokens: 1024,
    });

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content ?? '';
      if (text) res.write(text);
    }

    res.end();
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    const isQuota = error?.status === 429;
    res.status(isQuota ? 429 : 500).json({
      error: isQuota ? 'quota_exceeded' : 'api_error',
    });
  }
}
