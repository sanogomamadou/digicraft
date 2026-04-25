import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { DIGICRAFT_SYSTEM_PROMPT } from '../src/chatbot/chatbotKnowledge';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // API key lives ONLY on the server — never sent to the browser
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
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
    const ai = new GoogleGenAI({ apiKey });

    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      config: { systemInstruction: DIGICRAFT_SYSTEM_PROMPT },
      history: history ?? [],
    });

    // Stream the response
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');

    const stream = await chat.sendMessageStream({ message: message.trim() });

    for await (const chunk of stream) {
      const text = chunk.text ?? '';
      if (text) res.write(text);
    }

    res.end();
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    const isQuota =
      error?.status === 429 ||
      (error?.message ?? '').toLowerCase().includes('quota');

    res.status(isQuota ? 429 : 500).json({
      error: isQuota ? 'quota_exceeded' : 'api_error',
    });
  }
}
