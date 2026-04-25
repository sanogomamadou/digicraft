import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useChatbot } from '../chatbot/useChatbot';

const suggestions = [
  'Créer un site e-commerce',
  'Développer une appli mobile',
  'Mettre en place un agent IA',
  'Automatiser mes processus',
];

/* Markdown-lite renderer (same as Chatbot.tsx) */
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<span class="flex gap-1.5"><span class="text-[#5eb1ff]">•</span><span>$1</span></span>')
    .replace(/\n/g, '<br/>');
}

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#5eb1ff]/60"
          style={{ animation: `actionBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

export default function Action() {
  const container = useRef<HTMLElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const { messages, status, streamingContent, sendMessage } = useChatbot();

  const isLoading = status === 'loading';
  const hasError = status === 'quota_exceeded' || status === 'no_api_key' || status === 'error';

  // Scroll only the internal messages container — never the page
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streamingContent, isLoading]);

  const handleSend = (text: string) => {
    const msg = text.trim();
    if (!msg || isLoading) return;
    setShowSuggestions(false);
    setInputValue('');
    sendMessage(msg);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend(inputValue);
  };

  useGSAP(() => {
    gsap.fromTo('.action-header > *',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 80%' },
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
      }
    );
    gsap.fromTo('.action-card',
      { scale: 0.97, y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 75%' },
        scale: 1, y: 0, opacity: 1, duration: 1.1, ease: 'expo.out',
      }
    );
  }, { scope: container });

  return (
    <>
      <style>{`
        @keyframes actionBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>

      <section ref={container} className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5eb1ff]/8 rounded-full blur-[130px] pointer-events-none" />

        <div className="container mx-auto px-5 md:px-8 relative z-10">
          <div className="action-header mb-10 md:mb-14 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">
              Découvrez DigiCraft en Action
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Discutez avec DIGIBOT pour découvrir comment nous pouvons vous aider.
            </p>
          </div>

          <div
            className="action-card max-w-2xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: 'clamp(420px, 60vh, 560px)' }}
          >
            {/* Chat header */}
            <div className="bg-white/[0.03] border-b border-white/10 px-5 py-4 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#5eb1ff]/15 border border-[#5eb1ff]/25 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[#5eb1ff]" />
              </div>
              <div>
                <p className="text-white font-medium text-sm leading-none mb-1">DIGIBOT</p>
                <div className="flex items-center gap-1.5 text-[11px] text-green-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  En ligne
                </div>
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-500">
                <Sparkles className="w-3.5 h-3.5 text-[#5eb1ff]" />
                Propulsé par IA
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-4 sm:px-6 min-h-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(94,177,255,0.15) transparent' }}
            >
              {/* Welcome message */}
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 bg-[#5eb1ff]/15">
                  <Bot className="w-3.5 h-3.5 text-[#5eb1ff]" />
                </div>
                <div className="max-w-[78%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed bg-white/[0.04] border border-white/10 text-gray-200">
                  Bonjour&nbsp;! Je suis DIGIBOT, l'assistant DigiCraft. Dites-moi votre besoin et je vous oriente vers la bonne solution.
                </div>
              </div>

              {/* Conversation */}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-[#5eb1ff]/15'}`}>
                    {msg.role === 'user'
                      ? <User className="w-3.5 h-3.5 text-white" />
                      : <Bot className="w-3.5 h-3.5 text-[#5eb1ff]" />}
                  </div>
                  <div className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#5eb1ff] text-black rounded-tr-sm font-medium'
                      : 'bg-white/[0.04] border border-white/10 text-gray-200 rounded-tl-sm'
                  }`}>
                    {msg.role === 'user' ? (
                      msg.content
                    ) : (
                      <span dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                    )}
                  </div>
                </div>
              ))}

              {/* Streaming */}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#5eb1ff]/15 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-[#5eb1ff]" />
                  </div>
                  <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-gray-200 leading-relaxed">
                    {streamingContent ? (
                      <>
                        <span dangerouslySetInnerHTML={{ __html: renderMarkdown(streamingContent) }} />
                        <span className="inline-block w-0.5 h-3.5 bg-[#5eb1ff] ml-0.5 animate-pulse align-middle" />
                      </>
                    ) : (
                      <TypingDots />
                    )}
                  </div>
                </div>
              )}

              {/* Error / unavailable state */}
              {hasError && (
                <div className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-white/50" />
                  </div>
                  <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-white/70 leading-relaxed">
                    Notre service IA est momentanément indisponible.
                    Contactez-nous directement à{' '}
                    <a href="mailto:mamadousanogo352@gmail.com" className="text-[#5eb1ff] hover:underline">
                      mamadousanogo352@gmail.com
                    </a>{' '}pour un devis gratuit sous 24h.
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {showSuggestions && messages.length === 0 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="text-[12px] text-gray-300 bg-white/[0.04] border border-white/10 rounded-full px-3.5 py-1.5 hover:border-[#5eb1ff]/30 hover:text-white transition-all duration-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/10 sm:px-5 shrink-0">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading || hasError}
                  placeholder={hasError ? 'Service indisponible…' : 'Posez votre question…'}
                  className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5eb1ff]/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isLoading || hasError}
                  className="bg-[#5eb1ff] text-black p-2.5 rounded-xl hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
