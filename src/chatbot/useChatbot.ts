import { useState, useCallback, useRef } from 'react';

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

export type ChatStatus = 'idle' | 'loading' | 'error' | 'quota_exceeded' | 'no_api_key';

export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('idle');
  const [streamingContent, setStreamingContent] = useState<string>('');
  const abortRef = useRef<boolean>(false);

  // The API key lives on the server — we always consider it "present" client-side.
  // The /api/chat endpoint will return 503 if the key is missing server-side.
  const hasApiKey = true;

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!userText.trim() || status === 'loading') return;

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

      // Build conversation history for the server
      const history = messages.map((m) => ({
        role: m.role === 'user' ? ('user' as const) : ('model' as const),
        parts: [{ text: m.content }],
      }));

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userText.trim(), history }),
        });

        // Handle server-side errors
        if (!response.ok) {
          const data = await response.json().catch(() => ({})) as { error?: string };
          if (response.status === 503 || data.error === 'no_api_key') {
            setStatus('no_api_key');
          } else if (response.status === 429 || data.error === 'quota_exceeded') {
            setStatus('quota_exceeded');
          } else {
            setStatus('error');
          }
          return;
        }

        // Read the full text response (non-streaming, compatible with Vercel Serverless)
        const fullContent = await response.text();

        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: fullContent?.trim() || 'Je suis désolé, je n\'ai pas pu générer une réponse.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setStreamingContent('');
        setStatus('idle');
      } catch {
        setStreamingContent('');
        setStatus('error');
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages.length, status]
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
