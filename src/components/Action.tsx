import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Action() {
  const container = useRef<HTMLElement>(null);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Bonjour ! Je suis DIGIBOT, l'assistant virtuel de DigiCraft. Comment puis-je vous aider aujourd'hui avec vos projets de site web, d'application SaaS ou d'Intelligence Artificielle ?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: "Merci pour votre message ! En tant que DIGIBOT (version démo), je note votre intérêt. Pour une réponse détaillée sur nos services de développement, design ou data, n'hésitez pas à utiliser notre formulaire de contact ou à nous appeler." 
      }]);
    }, 1500);
  };

  useGSAP(() => {
    gsap.fromTo('.action-header > *', 
      { y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out"
      }
    );

    gsap.fromTo('.action-card', 
      { scale: 0.95, y: 40, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-16 md:py-24 bg-black relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5eb1ff]/10 rounded-full blur-[120px] pointer-events-none will-change-transform transform-gpu" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="action-header mb-12 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Découvrez DigiCraft en Action</h2>
          <p className="text-gray-400 text-base sm:text-lg">Discutez avec DIGIBOT, notre assistant IA, pour découvrir comment nous pouvons vous aider.</p>
        </div>

        <div className="action-card max-w-3xl mx-auto bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[500px] md:h-[600px]">
          {/* Chat Header */}
          <div className="bg-white/5 border-b border-white/10 p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#5eb1ff]/20 flex items-center justify-center border border-[#5eb1ff]/30">
              <Bot className="w-6 h-6 text-[#5eb1ff]" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">DIGIBOT</h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                En ligne
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-[#5eb1ff]/20'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-[#5eb1ff]" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === 'user' 
                    ? 'bg-[#5eb1ff] text-black rounded-tr-sm' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#5eb1ff]/20 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#5eb1ff]" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 flex gap-1 items-center">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white/5 border-t border-white/10">
            <form onSubmit={handleSend} className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Posez votre question à DIGIBOT..."
                className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#5eb1ff]/50 transition-colors"
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-[#5eb1ff] text-black p-3 rounded-xl hover:bg-[#4a90e2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
