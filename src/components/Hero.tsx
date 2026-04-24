import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Bot, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo('.hero-line',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.4,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.15
      }
    )
    .fromTo('.proof-card',
      { y: 40, opacity: 0, scale: 0.97 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out'
      },
      "-=1.0"
    );
  }, { scope: container });

  return (
    <section
      id="accueil"
      ref={container}
      className="relative min-h-screen flex flex-col items-center pt-28 pb-12 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#5eb1ff]/15 rounded-full blur-[130px] pointer-events-none -translate-x-1/3 -translate-y-1/4 will-change-transform" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3b82f6]/10 rounded-full blur-[120px] pointer-events-none translate-x-1/3 translate-y-1/4 will-change-transform" />

      {/* Headline + CTA */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-4xl mx-auto mt-10 md:mt-16">
        <div className="hero-line">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#5eb1ff] animate-pulse" />
            Agence digitale · Sites Web · SaaS · IA
          </div>
        </div>

        <div className="hero-line">
          <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-light leading-[1.05] tracking-tight mb-5">
            Propulsez votre PME<br className="hidden sm:block" />{' '}
            dans <span className="font-bold text-[#5eb1ff]">l'ère du Digital</span>
          </h1>
        </div>

        <div className="hero-line">
          <p className="text-gray-400 text-sm sm:text-[15px] font-light mb-10 max-w-md leading-relaxed">
            Sites Web, SaaS, Data et IA. Des solutions sur-mesure pour accélérer votre croissance et automatiser vos processus.
          </p>
        </div>

        <div className="hero-line w-full max-w-md flex flex-col gap-3 sm:block">
          {/* Mobile: separate stacked elements */}
          <div className="sm:hidden flex flex-col gap-3 w-full">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="bg-white/5 border border-white/10 outline-none px-5 py-3.5 w-full text-white placeholder:text-gray-500 text-sm rounded-2xl"
            />
            <a
              href="mailto:mamadousanogo352@gmail.com"
              className="bg-[#5eb1ff] text-black py-3.5 rounded-2xl font-medium text-sm hover:bg-white transition-colors text-center w-full block"
            >
              Démarrer mon projet
            </a>
          </div>
          {/* Desktop: unified pill form */}
          <div className="hidden sm:flex items-center bg-white/5 border border-white/10 rounded-full p-1.5 w-full backdrop-blur-sm">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="bg-transparent outline-none px-5 py-3 w-full text-white placeholder:text-gray-500 text-sm"
            />
            <a
              href="mailto:mamadousanogo352@gmail.com"
              className="bg-[#5eb1ff] text-black px-7 py-3 rounded-full font-medium text-sm hover:bg-white transition-colors whitespace-nowrap shrink-0"
            >
              Démarrer
            </a>
          </div>
        </div>
      </div>

      {/* Proof Cards — mobile: vertical stack, desktop: asymmetric row */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">

        {/* Card 1: AI Chat demo */}
        <div className="proof-card bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex flex-col gap-3 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-full bg-[#5eb1ff]/15 border border-[#5eb1ff]/25 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-[#5eb1ff]" />
            </div>
            <span className="text-xs font-medium text-white">DIGIBOT</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> En ligne
            </span>
          </div>
          <div className="flex flex-col gap-2.5 text-[12px]">
            <div className="bg-[#5eb1ff]/10 border border-[#5eb1ff]/15 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-gray-300 max-w-[85%]">
              Comment automatiser mes factures ?
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tr-sm px-3.5 py-2.5 text-gray-300 max-w-[85%] self-end text-right">
              Je configure un agent IA pour ça en 48h.
            </div>
            <div className="bg-[#5eb1ff]/10 border border-[#5eb1ff]/15 rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-gray-300 max-w-[85%]">
              Combien ça coûte ?
            </div>
            <div className="flex gap-1 items-center px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>

        {/* Card 2: Live growth chart */}
        <div className="proof-card bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex flex-col lg:col-span-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-[11px] text-gray-500 mb-0.5 uppercase tracking-wider">Croissance clients</p>
              <p className="text-2xl font-semibold text-white">+247%</p>
            </div>
            <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 rounded-full px-2.5 py-1 text-[11px] text-green-400">
              <TrendingUp className="w-3 h-3" />
              Ce mois
            </div>
          </div>
          <div className="relative h-28 w-full">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 200 80" preserveAspectRatio="none">
              {/* Area fill */}
              <defs>
                <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#5eb1ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#5eb1ff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 65 C 30 65, 50 50, 80 40 S 130 20, 160 15 S 185 10, 200 5 L 200 80 L 0 80 Z"
                fill="url(#chart-fill)"
              />
              <path
                d="M 0 65 C 30 65, 50 50, 80 40 S 130 20, 160 15 S 185 10, 200 5"
                fill="none"
                stroke="#5eb1ff"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Data points */}
              {[[0,65],[80,40],[160,15],[200,5]].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="2.5" fill="#050505" stroke="#5eb1ff" strokeWidth="1.5" />
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-[10px] text-gray-600 mt-2 px-0.5">
            <span>Jan</span><span>Mars</span><span>Juin</span><span>Aujourd'hui</span>
          </div>
        </div>

        {/* Card 3: Services offered */}
        <div className="proof-card bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-5 flex flex-col gap-3 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-medium text-white">Nos Services</p>
            <a href="#services" className="text-[#5eb1ff] hover:text-white transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
          {[
            { label: 'Sites Web & E-commerce', dot: 'bg-[#5eb1ff]' },
            { label: 'Applications SaaS', dot: 'bg-[#93c5fd]' },
            { label: 'Design Graphique & Logos', dot: 'bg-[#3b82f6]' },
            { label: 'Agents IA & Automatisation', dot: 'bg-[#bfdbfe]' },
            { label: 'Analyse de Données', dot: 'bg-[#2563eb]' },
          ].map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/5 border border-white/[0.07] rounded-xl px-3.5 py-2.5 text-sm text-gray-300 hover:border-white/15 hover:text-white transition-all duration-200"
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
