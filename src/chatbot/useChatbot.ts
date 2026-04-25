import { useState, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { DIGICRAFT_SYSTEM_PROMPT } from './chatbotKnowledge';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type ChatStatus = 'idle' | 'loading' | 'error' | 'quota_exceeded' | 'no_api_key';

/** Reads the Gemini API key injected by Vite via define. */
function resolveApiKey(): string | null {
  try {
    const key: string = process.env.GEMINI_API_KEY ?? '';
    if (!key || key === 'MY_GEMINI_API_KEY') return null;
    return key;
  } catch {
    return null;
  }
}

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [streamingContent, setStreamingContent] = useState<string>('');
  const abortRef = useRef<boolean>(false);

  const hasApiKey = Boolean(resolveApiKey());

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || status === 'loading') return;

      const apiKey = resolveApiKey();

      // Show a friendly no-key state if key is missing
      if (!apiKey) {
        const userMsg: ChatMessage = {
          id: `user-${Date.now()}`,
          role: 'user',
          content: userText.trim(),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMsg]);
        setStatus('no_api_key');
        return;
      }

      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: userText.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setStatus('loading');
      setStreamingContent('');
      abortRef.current = false;

      try {
        const ai = new GoogleGenAI({ apiKey });

        // We capture messages *before* adding the user message so the
        // history only contains prior turns (not the current one).
        const history = messages.map((m) => ({
          role: m.role === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: m.content }],
        }));

        const chat = ai.chats.create({
          model: 'gemini-2.0-flash',
          config: { systemInstruction: DIGICRAFT_SYSTEM_PROMPT },
          history,
        });

        const stream = await chat.sendMessageStream({ message: userText.trim() });

        let fullContent = '';

        for await (const chunk of stream) {
          if (abortRef.current) break;
          const text = chunk.text ?? '';
          fullContent += text;
          setStreamingContent(fullContent);
        }

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: fullContent || 'Je suis désolé, je n\'ai pas pu générer une réponse.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setStreamingContent('');
        setStatus('idle');
      } catch (err: unknown) {
        setStreamingContent('');

        const error = err as { status?: number; message?: string; code?: number };
        const msg = (error?.message ?? '').toLowerCase();
        const statusCode = error?.status ?? error?.code ?? 0;

        const isQuota =
          statusCode === 429 ||
          msg.includes('quota') ||
          msg.includes('rate limit') ||
          msg.includes('resource has been exhausted') ||
          msg.includes('too many requests');

        setStatus(isQuota ? 'quota_exceeded' : 'error');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages.length, status] // use .length to avoid stale closure issues
  );

  const resetError = useCallback(() => {
    setStatus('idle');
  }, []);

  const clearHistory = useCallback(() => {
    setMessages([]);
    setStatus('idle');
    setStreamingContent('');
  }, []);

  return {
    messages,
    status,
    streamingContent,
    sendMessage,
    resetError,
    clearHistory,
    hasApiKey,
  };
}
