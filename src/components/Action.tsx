import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const suggestions = [
  'Créer un site e-commerce',
  'Développer une appli mobile',
  'Mettre en place un agent IA',
  'Automatiser mes processus',
];

export default function Action() {
  const container = useRef<HTMLElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: "Bonjour ! Je suis DIGIBOT, l'assistant DigiCraft. Dites-moi votre besoin et je vous oriente vers la bonne solution.",
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const msg = text.trim();
    if (!msg) return;
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', text: msg }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          text: `Super demande ! Pour "${msg}", notre équipe a déjà accompagné plusieurs PME avec succès. Envoyez-nous un email pour un devis gratuit sous 24h.`,
        },
      ]);
    }, 1400);
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
    <section ref={container} className="py-16 md:py-24 bg-black relative overflow-hidden">
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

        <div className="action-card max-w-2xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
          style={{ height: 'clamp(420px, 60vh, 560px)' }}
        >
          {/* Chat header */}
          <div className="bg-white/[0.03] border-b border-white/10 px-5 py-4 flex items-center gap-3">
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
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 sm:px-6">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
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
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-[#5eb1ff]/15 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-[#5eb1ff]" />
                </div>
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
                  {[0, 150, 300].map(d => (
                    <span key={d} className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            )}

            {/* Quick suggestion pills */}
            {showSuggestions && messages.length === 1 && !isTyping && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map(s => (
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
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/10 sm:px-5">
            <form
              onSubmit={e => { e.preventDefault(); handleSend(inputValue); }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                placeholder="Posez votre question…"
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-[#5eb1ff]/40 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-[#5eb1ff] text-black p-2.5 rounded-xl hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
