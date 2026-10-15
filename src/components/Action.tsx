import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useChatbot } from '../chatbot/useChatbot';
import ChatMarkdown from '../chatbot/ChatMarkdown';
import { ArrowCorner, Asterisk, CONTACT_EMAIL, prefersReducedMotion } from './ui';

const suggestions = [
  'Créer un site e-commerce',
  'Développer une appli mobile',
  'Mettre en place un agent IA',
  'Automatiser mes processus',
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-0.5" aria-label="DIGIBOT écrit">
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
    <div className="w-8 h-8 rounded-full bg-blue flex items-center justify-center shrink-0">
      <Asterisk className="w-3.5 h-3.5 text-white" />
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
    if (prefersReducedMotion()) return;
    gsap.fromTo('.action-card',
      { y: 60, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 75%' },
        y: 0, opacity: 1, duration: 1.2, ease: 'expo.out',
      }
    );
  }, { scope: container });

  return (
    <section ref={container} data-nav="dark" className="relative bg-ink text-white pb-20 md:pb-32">
      <div className="mx-4 md:mx-8 h-px bg-white/[0.08]" />
      <div className="px-4 md:px-8 pt-14 md:pt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        {/* Intro */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div>
            <p className="label text-blue-soft mb-8">Démo en direct</p>
            <h2 className="display text-[clamp(48px,6vw,92px)] leading-[0.9]">
              Parlez à<br />DIGIBOT<Asterisk className="inline-block align-top w-[0.3em] h-[0.3em] ml-[0.08em] mt-[0.05em] text-blue" />
            </h2>
          </div>
          <p className="label label-justify text-white/70 max-w-[300px]">
            Notre agent IA répond à vos questions sur nos services et vous oriente vers la bonne solution. Le même type d’agent peut répondre à vos clients, 24h/24.
          </p>
        </div>

        {/* Chat */}
        <div
          className="action-card lg:col-span-7 bg-ink-2 border border-white/[0.06] rounded-[24px] md:rounded-[28px] overflow-hidden flex flex-col"
          style={{ height: 'clamp(460px, 64vh, 600px)' }}
        >
          <div className="px-5 md:px-7 py-4 flex items-center gap-3 border-b border-white/[0.07] shrink-0">
            <BotAvatar />
            <div>
              <p className="text-[15px] tracking-[-0.03em] leading-none mb-1">DIGIBOT</p>
              <p className="label text-[10px] text-white/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> En ligne
              </p>
            </div>
            <p className="ml-auto label text-white/40">Propulsé par IA</p>
          </div>

          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain px-4 md:px-7 py-6 space-y-4 min-h-0"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.12) transparent' }}
            aria-live="polite"
          >
            <div className="flex gap-3">
              <BotAvatar />
              <div className="max-w-[80%] rounded-[18px] rounded-tl-[4px] px-4 py-3 text-[15px] leading-relaxed bg-white/[0.05] text-white/90">
                Bonjour&nbsp;! Je suis DIGIBOT, l'assistant DigiCraft. Dites-moi votre besoin et je vous oriente vers la bonne solution.
              </div>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'user' ? null : <BotAvatar />}
                <div className={`max-w-[80%] rounded-[18px] px-4 py-3 text-[15px] leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue text-white rounded-tr-[4px]'
                    : 'bg-white/[0.05] text-white/90 rounded-tl-[4px]'
                }`}>
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <ChatMarkdown text={msg.content} />
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3">
                <BotAvatar />
                <div className="max-w-[80%] rounded-[18px] rounded-tl-[4px] bg-white/[0.05] px-4 py-3 text-[15px] text-white/90 leading-relaxed">
                  {streamingContent ? (
                    <>
                      <ChatMarkdown text={streamingContent} />
                      <span className="inline-block w-0.5 h-3.5 bg-blue-soft ml-0.5 animate-pulse align-middle" />
                    </>
                  ) : (
                    <TypingDots />
                  )}
                </div>
              </div>
            )}

            {hasError && (
              <div className="flex gap-3">
                <BotAvatar />
                <div className="max-w-[80%] rounded-[18px] rounded-tl-[4px] bg-white/[0.05] px-4 py-3 text-[15px] text-white/75 leading-relaxed">
                  Notre service IA est momentanément indisponible.
                  Écrivez-nous à{' '}
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-soft underline underline-offset-2">
                    {CONTACT_EMAIL}
                  </a>{' '}pour un devis gratuit sous 24h.
                </div>
              </div>
            )}

            {showSuggestions && messages.length === 0 && !isLoading && (
              <div className="flex flex-wrap gap-2 pt-2 pl-11">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSend(s)}
                    className="text-[13px] tracking-[-0.02em] text-white/85 border border-white/15 rounded-full px-4 py-2 hover:bg-white hover:text-ink transition-colors duration-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 md:p-4 border-t border-white/[0.07] shrink-0">
            <div className="flex items-center gap-2 bg-[#f3f3f3] rounded-full pl-5 pr-1.5 h-14 outline-2 outline-offset-2 outline-transparent focus-within:outline-blue-soft transition-[outline-color]">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading || hasError}
                placeholder={hasError ? 'Service indisponible…' : 'Posez votre question…'}
                aria-label="Votre question pour DIGIBOT"
                className="flex-1 bg-transparent text-[15px] text-text placeholder:text-muted focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed min-w-0"
              />
              <button
                type="button"
                onClick={() => handleSend(inputValue)}
                disabled={!inputValue.trim() || isLoading || hasError}
                aria-label="Envoyer"
                className="w-11 h-11 rounded-full bg-blue text-white flex items-center justify-center shrink-0 transition-colors hover:bg-ink disabled:opacity-35 disabled:cursor-not-allowed"
              >
                <ArrowCorner className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
