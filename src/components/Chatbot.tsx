import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Bot,
  RefreshCw,
  Trash2,
  ChevronDown,
  AlertTriangle,
  WifiOff,
  Sparkles,
  Key,
} from 'lucide-react';
import { useChatbot } from '../chatbot/useChatbot';
import { SUGGESTED_QUESTIONS } from '../chatbot/chatbotKnowledge';

/* ─── Markdown-lite renderer ─────────────────────────────────── */
function renderMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^### (.+)$/gm, '<p class="font-semibold text-white/90 mt-3 mb-1">$1</p>')
    .replace(/^## (.+)$/gm, '<p class="font-bold text-white mt-3 mb-1">$1</p>')
    .replace(/^- (.+)$/gm, '<span class="flex gap-1.5 items-start"><span class="text-[#5eb1ff] mt-0.5">•</span><span>$1</span></span>')
    .replace(/✅/g, '<span class="text-emerald-400">✅</span>')
    .replace(/🔧/g, '<span>🔧</span>')
    .replace(/\n/g, '<br/>');
}

/* ─── Typing dots animation ──────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#5eb1ff]/60"
          style={{ animation: `chatbotBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

/* ─── Status banners ─────────────────────────────────────────── */
function QuotaBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 bg-amber-500/10 border border-amber-400/20 rounded-2xl mx-3 my-2">
      <div className="flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-amber-300">Service momentanément indisponible</p>
          <p className="text-xs text-white/50 mt-1 leading-relaxed">
            Notre assistant IA est temporairement hors ligne suite à un pic d'utilisation. Il sera de retour très prochainement.
          </p>
          <p className="text-xs text-white/50 mt-2">
            En attendant :{' '}
            <a href="mailto:mamadousanogo352@gmail.com" className="text-[#5eb1ff] hover:underline">
              mamadousanogo352@gmail.com
            </a>
          </p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="self-end text-xs text-white/40 hover:text-white/70 transition-colors flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" /> Réessayer
      </button>
    </div>
  );
}

function NoApiKeyBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex flex-col gap-3 px-4 py-4 bg-white/[0.04] border border-white/10 rounded-2xl mx-3 my-2">
      <div className="flex items-start gap-2.5">
        <Key className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-white/80">Service momentanément indisponible</p>
          <p className="text-xs text-white/45 mt-1 leading-relaxed">
            Notre assistant IA sera disponible très prochainement. Contactez-nous directement en attendant.
          </p>
          <p className="text-xs text-white/45 mt-2">
            📧{' '}
            <a href="mailto:mamadousanogo352@gmail.com" className="text-[#5eb1ff] hover:underline">
              mamadousanogo352@gmail.com
            </a>
          </p>
        </div>
      </div>
      <button
        onClick={onDismiss}
        className="self-end text-xs text-white/35 hover:text-white/65 transition-colors flex items-center gap-1"
      >
        <RefreshCw className="w-3 h-3" /> OK
      </button>
    </div>
  );
}

function ErrorBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-2.5 px-4 py-3 bg-red-500/10 border border-red-400/20 rounded-2xl mx-3 my-2">
      <WifiOff className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-xs font-semibold text-red-300">Erreur de connexion</p>
        <p className="text-xs text-white/50 mt-0.5">Une erreur est survenue. Vérifiez votre connexion.</p>
      </div>
      <button onClick={onDismiss} className="text-white/40 hover:text-white/70 transition-colors shrink-0">
        <RefreshCw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ─── Bubble component ────────────────────────────────────────── */
interface BubbleProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

function Bubble({ role, content, isStreaming }: BubbleProps) {
  const isUser = role === 'user';
  return (
    <div className={`chatbot-message flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="w-6 h-6 rounded-full bg-[#5eb1ff]/10 border border-[#5eb1ff]/25 flex items-center justify-center shrink-0 mb-0.5">
          <Bot className="w-3 h-3 text-[#5eb1ff]" />
        </div>
      )}
      <div
        className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-[#5eb1ff] text-[#020611] font-medium rounded-br-sm'
            : 'bg-[rgba(255,255,255,0.05)] border border-white/8 text-white/80 rounded-bl-sm'
        }`}
      >
        {isUser ? (
          content
        ) : (
          <>
            <span dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
            {isStreaming && (
              <span className="inline-block w-0.5 h-3.5 bg-[#5eb1ff] ml-0.5 animate-pulse align-middle" />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main Chatbot Component ─────────────────────────────────── */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [hasUnread, setHasUnread] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { messages, status, streamingContent, sendMessage, resetError, clearHistory } = useChatbot();

  const isLoading = status === 'loading';

  /* Auto-scroll */
  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
  };

  useEffect(() => {
    if (isOpen) setTimeout(() => scrollToBottom(false), 60);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
    else if (messages.length > 0) setHasUnread(true);
  }, [messages, streamingContent, isOpen]);

  /* Scroll detection */
  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  /* Open */
  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  /* Send */
  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;
    setInputValue('');
    if (inputRef.current) { inputRef.current.style.height = 'auto'; }
    setShowSuggestions(false);
    await sendMessage(text);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSuggestion = (q: string) => {
    setShowSuggestions(false);
    sendMessage(q);
  };

  /* Textarea auto-resize */
  const handleInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  };

  const inputDisabled = isLoading || status === 'quota_exceeded' || status === 'no_api_key';

  return (
    <>
      {/* ── CSS keyframes ── */}
      <style>{`
        @keyframes chatbotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes chatbotSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes chatbotFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes chatbotGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(94,177,255,0.45); }
          60%       { box-shadow: 0 0 0 10px rgba(94,177,255,0); }
        }
        .chatbot-window   { animation: chatbotSlideUp 0.35s cubic-bezier(0.16,1,0.3,1) forwards; }
        .chatbot-message  { animation: chatbotFadeIn  0.28s ease-out forwards; }
        .chatbot-glow     { animation: chatbotGlow 2.2s ease-in-out infinite; }
      `}</style>

      {/* ── Floating trigger ── */}
      <button
        id="chatbot-trigger"
        aria-label="Ouvrir le chat DigiBot"
        onClick={handleOpen}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#5eb1ff] text-[#020611] flex items-center justify-center shadow-[0_8px_30px_rgba(94,177,255,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_40px_rgba(94,177,255,0.6)] active:scale-95 ${
          isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100 chatbot-glow'
        }`}
      >
        <MessageCircle className="w-6 h-6" fill="currentColor" />
        {hasUnread && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-[#020611]" />
        )}
      </button>

      {/* ── Chat window ── */}
      {isOpen && (
        <div
          id="chatbot-window"
          role="dialog"
          aria-modal="true"
          aria-label="Chat DigiBot"
          className="chatbot-window fixed bottom-6 right-6 z-50 w-[min(390px,calc(100vw-24px))] flex flex-col"
          style={{ maxHeight: 'min(640px, calc(100vh - 48px))' }}
        >
          <div className="flex flex-col h-full rounded-3xl overflow-hidden border border-white/10 bg-[rgba(6,14,32,0.94)] backdrop-blur-2xl shadow-[0_32px_80px_rgba(0,0,0,0.65),0_0_0_1px_rgba(94,177,255,0.07)]">

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.07] bg-[rgba(94,177,255,0.03)] shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#5eb1ff]/10 border border-[#5eb1ff]/30 flex items-center justify-center">
                  <Bot className="w-4.5 h-4.5 text-[#5eb1ff]" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#060e20]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white/95 leading-tight">DigiBot</p>
                <p className="text-[11px] text-white/40 leading-tight">
                  {isLoading ? 'En train de rédiger…' : 'Assistant Digicraft · En ligne'}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearHistory}
                    title="Effacer la conversation"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white/25 hover:text-white/65 hover:bg-white/5 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Fermer le chat"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/25 hover:text-white/65 hover:bg-white/5 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(94,177,255,0.15) transparent' }}
            >
              {/* Welcome + suggestions */}
              {messages.length === 0 && (
                <div className="chatbot-message">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#5eb1ff]/10 border border-[#5eb1ff]/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#5eb1ff]" />
                    </div>
                    <div className="max-w-[85%] px-4 py-3 rounded-2xl rounded-tl-sm bg-[rgba(255,255,255,0.05)] border border-white/8">
                      <p className="text-sm text-white/80 leading-relaxed">
                        Bonjour&nbsp;! 👋 Je suis <strong className="text-white">DigiBot</strong>, l'assistant de{' '}
                        <strong className="text-[#5eb1ff]">Digicraft</strong>.<br />
                        Comment puis-je vous aider aujourd'hui&nbsp;?
                      </p>
                    </div>
                  </div>

                  {showSuggestions && (
                    <div className="mt-3 flex flex-col gap-1.5 pl-9">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSuggestion(q)}
                          className="text-left text-xs px-3.5 py-2.5 rounded-xl border border-[#5eb1ff]/20 bg-[#5eb1ff]/5 text-[#5eb1ff] hover:bg-[#5eb1ff]/12 hover:border-[#5eb1ff]/40 transition-all duration-200"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Message bubbles */}
              {messages.map((msg) => (
                <Bubble key={msg.id} role={msg.role} content={msg.content} />
              ))}

              {/* Streaming bubble */}
              {isLoading && (
                <div className="chatbot-message flex items-end gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#5eb1ff]/10 border border-[#5eb1ff]/25 flex items-center justify-center shrink-0 mb-0.5">
                    <Bot className="w-3 h-3 text-[#5eb1ff]" />
                  </div>
                  <div className="max-w-[82%] px-4 py-3 rounded-2xl rounded-bl-sm bg-[rgba(255,255,255,0.05)] border border-white/8 text-sm text-white/80 leading-relaxed">
                    {streamingContent ? (
                      <Bubble role="assistant" content={streamingContent} isStreaming />
                    ) : (
                      <TypingDots />
                    )}
                  </div>
                </div>
              )}

              {/* Status banners */}
              {status === 'quota_exceeded' && <QuotaBanner onDismiss={resetError} />}
              {status === 'no_api_key'    && <NoApiKeyBanner onDismiss={resetError} />}
              {status === 'error'         && <ErrorBanner onDismiss={resetError} />}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll-to-bottom pill */}
            {showScrollBtn && (
              <button
                onClick={() => scrollToBottom()}
                className="absolute bottom-[72px] right-4 w-7 h-7 rounded-full bg-[#5eb1ff] text-[#020611] flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-10"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.07] shrink-0 bg-[rgba(6,14,32,0.6)]">
              <div className="flex items-end gap-2.5 bg-[rgba(255,255,255,0.04)] border border-white/10 rounded-2xl px-4 py-2.5 focus-within:border-[#5eb1ff]/35 transition-colors duration-200">
                <textarea
                  ref={inputRef}
                  id="chatbot-input"
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onInput={handleInput}
                  disabled={inputDisabled}
                  placeholder={inputDisabled ? 'Service indisponible…' : 'Posez votre question…'}
                  className="flex-1 bg-transparent text-sm text-white/85 placeholder:text-white/28 outline-none resize-none leading-relaxed disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ minHeight: '22px', maxHeight: '120px' }}
                />
                <button
                  id="chatbot-send-btn"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || inputDisabled}
                  aria-label="Envoyer le message"
                  className="w-8 h-8 rounded-full bg-[#5eb1ff] text-[#020611] flex items-center justify-center shrink-0 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-30 disabled:scale-100 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(94,177,255,0.3)]"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-center text-[10px] text-white/18 mt-2">
                Propulsé par Gemini AI · Digicraft {new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
