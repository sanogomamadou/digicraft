import { Globe, Code, Palette, LineChart, Bot } from 'lucide-react';
import { motion } from 'motion/react';

const services = ['Sites Web', 'Applications SaaS', 'Design Graphique', 'Analyse de Données', 'Agents IA'];

// Blue palette — 5 shades from light to deep
const blueDots = [
  'bg-[#5eb1ff]',   // Vitality Blue
  'bg-[#93c5fd]',   // Light blue
  'bg-[#3b82f6]',   // Medium blue
  'bg-[#bfdbfe]',   // Very light blue
  'bg-[#2563eb]',   // Deep blue
];

export default function Features() {
  return (
    <section id="services" className="pt-2 pb-16 md:pb-24 overflow-hidden">
      {/* Marquee strip */}
      <div className="relative flex overflow-hidden mb-16 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <motion.div
          className="flex whitespace-nowrap w-max will-change-transform"
          animate={{ x: ['0%', '-25%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 22 }}
        >
          {[...Array(4)].map((_, ai) => (
            <div key={ai} className="flex gap-3 pr-3">
              {services.map((tab, i) => (
                <div
                  key={`${ai}-${i}`}
                  className="px-5 py-2.5 rounded-full text-[14px] font-medium bg-white/[0.03] text-gray-300 border border-white/10 flex items-center gap-2"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${blueDots[i]}`} />
                  {tab}
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 text-white">
            Pourquoi choisir DigiCraft ?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
            Une expertise technique complète pour digitaliser votre entreprise.
          </p>
        </div>

        {/* Asymmetric layout combining cards and raw text blocks */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left Column: Huge Featured Area */}
          <div className="md:col-span-7 flex flex-col gap-16">

            {/* Sites Web - Highlighted solid card instead of glass */}
            <div className="bg-[#5eb1ff] rounded-3xl p-8 md:p-12 flex flex-col justify-between min-h-[320px] text-black relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4" />
              <div>
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center mb-6">
                  <Globe className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-3xl font-bold mb-4 tracking-tight">Sites Web & E-commerce</h3>
                <p className="text-black/80 text-lg leading-relaxed max-w-md">
                  Des sites vitrines et boutiques en ligne ultra-rapides, optimisés pour le SEO et la conversion, lisibles sur tous les écrans.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8 relative z-10">
                {['React', 'Next.js', 'GSAP', 'SEO'].map(t => (
                  <span key={t} className="text-xs font-semibold text-black bg-white/20 px-3 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </div>

            {/* Design Graphique - Raw text block, no card */}
            <div className="px-2">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#3b82f6]/20 flex items-center justify-center">
                  <Palette className="w-5 h-5 text-[#5eb1ff]" />
                </div>
                <h3 className="text-xl font-medium text-white">Design Graphique</h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed pl-14">
                Logos, flyers, filtres et identités visuelles percutantes qui marquent les esprits et assoient votre crédibilité.
              </p>
            </div>

          </div>

          {/* Right Column: List of other services */}
          <div className="md:col-span-5 flex flex-col gap-12 pt-4">

            {/* SaaS - Raw text block */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#93c5fd]/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-[#5eb1ff]" />
                </div>
                <h3 className="text-xl font-medium text-white">Applications SaaS</h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed pl-14">
                Outils sur-mesure pour digitaliser et automatiser vos processus internes, augmentant la productivité de vos équipes.
              </p>
            </div>

            {/* Data - Raw text block */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#bfdbfe]/10 flex items-center justify-center">
                  <LineChart className="w-5 h-5 text-[#5eb1ff]" />
                </div>
                <h3 className="text-xl font-medium text-white">Analyse de Données</h3>
              </div>
              <p className="text-gray-400 text-base leading-relaxed pl-14">
                Tableaux de bord sur-mesure pour visualiser et piloter vos données en temps réel. Ne naviguez plus à vue.
              </p>
            </div>

            {/* AI Agents — Call to action block */}
            <div className="mt-4 bg-white/5 rounded-3xl p-8 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-[#5eb1ff]/20 flex items-center justify-center mb-5">
                <Bot className="w-5 h-5 text-[#5eb1ff]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Agents IA & Automatisation</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Chatbots et agents intelligents pour automatiser vos interactions client 24/7 et réduire vos coûts opérationnels.
              </p>
              <a
                href="mailto:mamadousanogo352@gmail.com"
                className="inline-flex items-center justify-center bg-white text-black text-sm font-semibold px-6 py-3 rounded-full hover:bg-[#5eb1ff] transition-colors w-full"
              >
                Intégrer l'IA
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
