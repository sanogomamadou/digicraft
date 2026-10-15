import { useState, useRef, useEffect, KeyboardEvent, type ReactNode } from 'react';
import { useChatbot } from '../chatbot/useChatbot';
import { SUGGESTED_QUESTIONS } from '../chatbot/chatbotKnowledge';
import ChatMarkdown from '../chatbot/ChatMarkdown';
import { ArrowCorner, Asterisk, CONTACT_EMAIL } from './ui';

/* ─── Typing dots ────────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-center gap-1 py-1" aria-label="DIGIBOT écrit">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-blue-soft"
          style={{ animation: `digiBounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

function BotAvatar() {
  return (
    <div className="w-7 h-7 rounded-full bg-blue flex items-center justify-center shrink-0">
      <Asterisk className="w-3 h-3 text-white" />
    </div>
  );
}

/* ─── Status notice (quota, clé absente, erreur réseau) ─────── */
function Notice({ title, children, action, onAction }: { title: string; children: ReactNode; action: string; onAction: () => void }) {
  return (
    <div className="chatbot-message flex gap-2.5">
      <BotAvatar />
      <div className="flex-1 rounded-[18px] rounded-tl-[4px] bg-white/[0.05] px-4 py-3.5">
        <p className="label text-blue-soft mb-1.5">{title}</p>
        <div className="text-[14px] leading-relaxed text-white/75">{children}</div>
        <button onClick={onAction} className="label mt-3 text-white/60 hover:text-white border-b border-white/25 hover:border-white pb-0.5 transition-colors">
          {action}
        </button>
      </div>
    </div>
  );
}

const EmailLink = () => (
  <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-soft underline underline-offset-2 hover:text-white">{CONTACT_EMAIL}</a>
);

/* ─── Bubble ─────────────────────────────────────────────────── */
function Bubble({ role, content, isStreaming }: { role: 'user' | 'assistant'; content: string; isStreaming?: boolean }) {
  const isUser = role === 'user';
  return (
    <div className={`chatbot-message flex gap-2.5 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <BotAvatar />}
      <div
        className={`max-w-[84%] px-4 py-3 rounded-[18px] text-[14px] leading-relaxed tracking-[-0.01em] ${
          isUser ? 'bg-blue text-white rounded-tr-[4px]' : 'bg-white/[0.05] text-white/85 rounded-tl-[4px]'
        }`}
      >
        {isUser ? content : (
          <>
            <ChatMarkdown text={content} />
            {isStreaming && <span className="inline-block w-0.5 h-3.5 bg-blue-soft ml-0.5 animate-pulse align-middle" />}
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
  const [pastHero, setPastHero] = useState(false);

  // Le bouton flottant n'apparaît qu'après le hero (qui a déjà son propre CTA rond)
  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { messages, status, streamingContent, sendMessage, resetError, clearHistory } = useChatbot();

  const isLoading = status === 'loading';

  const scrollToBottom = (smooth = true) => {
    messagesEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant', block: 'end' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => { scrollToBottom(false); inputRef.current?.focus(); }, 60);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) scrollToBottom();
    else if (messages.length > 0) setHasUnread(true);
  }, [messages, streamingContent, isOpen]);

  // Échap ferme la fenêtre
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 100);
  };

  const open = () => { setIsOpen(true); setHasUnread(false); };
  const close = () => { setIsOpen(false); setTimeout(() => triggerRef.current?.focus(), 50); };

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;
    setInputValue('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
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

  const handleInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 110)}px`;
  };

  const inputDisabled = isLoading || status === 'quota_exceeded' || status === 'no_api_key';

  return (
    <>
      <style>{`
        @keyframes chatbotIn {
          from { opacity: 0; transform: translateY(24px) scale(0.97); clip-path: inset(30% 0 0 0 round 28px); }
          to   { opacity: 1; transform: none; clip-path: inset(0 0 0 0 round 28px); }
        }
        @keyframes chatbotFadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }
        .chatbot-window  { animation: chatbotIn 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .chatbot-message { animation: chatbotFadeIn 0.35s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>

      {/* ── Bouton flottant ── */}
      <button
        ref={triggerRef}
        id="chatbot-trigger"
        aria-label="Ouvrir le chat DIGIBOT"
        aria-expanded={isOpen}
        aria-controls="chatbot-window"
        onClick={open}
        className={`group fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex items-center transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${
          isOpen || !pastHero ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <span className="hidden md:inline-flex items-center h-10 pl-5 pr-8 -mr-6 rounded-full bg-ink text-white label opacity-0 translate-x-3 transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:opacity-100 group-hover:translate-x-0">
          Une question&nbsp;?
        </span>
        <span className="relative w-14 h-14 rounded-full bg-blue text-white flex items-center justify-center shadow-[0_14px_30px_-12px_rgba(8,110,186,0.7)] transition-colors duration-300 group-hover:bg-ink">
          <Asterisk className="w-6 h-6 transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-[120deg]" />
          {hasUnread && <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-blue-soft rounded-full border-2 border-paper" />}
        </span>
      </button>

      {/* ── Fenêtre ── */}
      {isOpen && (
        <div
          id="chatbot-window"
          role="dialog"
          aria-modal="false"
          aria-label="Chat avec DIGIBOT"
          className="chatbot-window fixed z-50 inset-x-3 bottom-3 md:inset-x-auto md:right-6 md:bottom-6 md:w-[410px] flex flex-col"
          style={{ height: 'min(660px, calc(100svh - 24px))' }}
        >
          <div className="relative flex flex-col h-full rounded-[24px] md:rounded-[28px] overflow-hidden bg-ink text-white border border-white/[0.06] shadow-[0_40px_80px_-30px_rgba(10,15,30,0.55)]">

            {/* En-tête */}
            <div className="relative px-5 pt-5 pb-4 shrink-0 overflow-hidden">
              <Asterisk className="absolute -right-6 -top-10 w-36 h-36 text-blue/90 pointer-events-none" />
              <div className="relative flex items-start justify-between gap-3">
                <div>
                  <p className="display text-[34px] leading-[0.9]">
                    DIGIBOT<span className="text-blue-soft">*</span>
                  </p>
                  <p className="label text-white/50 mt-2 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-blue-soft animate-pulse' : 'bg-emerald-400'}`} />
                    {isLoading ? 'En train d’écrire…' : 'Assistant DigiCraft · En ligne'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <button
                      onClick={clearHistory}
                      className="label h-9 px-3.5 rounded-full bg-ink/70 border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition-colors"
                    >
                      Effacer
                    </button>
                  )}
                  <button
                    onClick={close}
                    aria-label="Fermer le chat"
                    className="w-9 h-9 rounded-full bg-[#f3f3f3] text-ink flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="h-px bg-white/[0.07] shrink-0" />

            {/* Messages */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 space-y-3.5 min-h-0"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.12) transparent' }}
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="chatbot-message">
                  <div className="flex gap-2.5">
                    <BotAvatar />
                    <div className="max-w-[84%] px-4 py-3 rounded-[18px] rounded-tl-[4px] bg-white/[0.05] text-[14px] leading-relaxed text-white/85">
                      Bonjour&nbsp;! Je suis <span className="text-white font-medium">DIGIBOT</span>, l’assistant de DigiCraft.
                      Dites-moi votre besoin et je vous oriente vers la bonne solution.
                    </div>
                  </div>

                  {showSuggestions && (
                    <div className="mt-4 pl-[38px]">
                      <p className="label text-white/40 mb-2.5">Questions fréquentes</p>
                      <div className="flex flex-wrap gap-2">
                        {SUGGESTED_QUESTIONS.map((q) => (
                          <button
                            key={q}
                            onClick={() => handleSuggestion(q)}
                            className="text-left text-[13px] tracking-[-0.02em] px-3.5 py-2 rounded-full border border-white/15 text-white/85 hover:bg-white hover:text-ink transition-colors duration-200"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {messages.map((msg) => (
                <Bubble key={msg.id} role={msg.role} content={msg.content} />
              ))}

              {isLoading && (
                streamingContent
                  ? <Bubble role="assistant" content={streamingContent} isStreaming />
                  : (
                    <div className="chatbot-message flex gap-2.5">
                      <BotAvatar />
                      <div className="px-4 py-2.5 rounded-[18px] rounded-tl-[4px] bg-white/[0.05]"><TypingDots /></div>
                    </div>
                  )
              )}

              {status === 'quota_exceeded' && (
                <Notice title="Assistant très sollicité" action="Réessayer" onAction={resetError}>
                  DIGIBOT reçoit beaucoup de demandes en ce moment. Réessayez dans quelques minutes, ou écrivez-nous à <EmailLink />.
                </Notice>
              )}
              {status === 'no_api_key' && (
                <Notice title="Assistant indisponible" action="Compris" onAction={resetError}>
                  DIGIBOT est momentanément hors ligne. Écrivez-nous à <EmailLink /> : nous répondons sous 24h.
                </Notice>
              )}
              {status === 'error' && (
                <Notice title="Message non envoyé" action="Réessayer" onAction={resetError}>
                  La connexion a été interrompue. Vérifiez votre réseau puis renvoyez votre question.
                </Notice>
              )}

              <div ref={messagesEndRef} />
            </div>

            {showScrollBtn && (
              <button
                onClick={() => scrollToBottom()}
                aria-label="Aller au dernier message"
                className="absolute bottom-[96px] left-1/2 -translate-x-1/2 label h-8 px-3.5 rounded-full bg-[#f3f3f3] text-ink shadow-lg hover:bg-white transition-colors z-10"
              >
                Derniers messages ↓
              </button>
            )}

            {/* Saisie */}
            <div className="px-3 pb-3 pt-3 border-t border-white/[0.07] shrink-0">
              <div className="flex items-end gap-2 bg-[#f3f3f3] rounded-[26px] pl-5 pr-1.5 py-1.5 outline-2 outline-offset-2 outline-transparent focus-within:outline-blue-soft transition-[outline-color]">
                <label htmlFor="chatbot-input" className="sr-only">Votre question</label>
                <textarea
                  ref={inputRef}
                  id="chatbot-input"
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onInput={handleInput}
                  disabled={inputDisabled}
                  placeholder={inputDisabled && !isLoading ? 'Assistant indisponible…' : 'Posez votre question…'}
                  className="flex-1 self-center bg-transparent text-[15px] text-text placeholder:text-muted outline-none resize-none leading-snug py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ maxHeight: '110px' }}
                />
                <button
                  id="chatbot-send-btn"
                  onClick={handleSend}
                  disabled={!inputValue.trim() || inputDisabled}
                  aria-label="Envoyer le message"
                  className="w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center shrink-0 transition-colors hover:bg-ink disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ArrowCorner className="w-4 h-4" />
                </button>
              </div>
              <p className="label text-[10px] text-white/35 text-center mt-2.5">Propulsé par IA · DigiCraft</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
