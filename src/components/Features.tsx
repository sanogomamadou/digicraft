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
    <section id="services" className="pt-2 pb-16 md:pb-24 bg-black overflow-hidden">
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

        {/* Asymmetric bento grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">

          {/* Large featured card — Web/App */}
          <div className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-3xl p-7 flex flex-col justify-between min-h-[260px] group hover:border-white/20 transition-all duration-300 overflow-hidden relative">
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#5eb1ff]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#5eb1ff]/10 transition-all duration-500" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#5eb1ff]/10 flex items-center justify-center mb-5 border border-[#5eb1ff]/20">
                <Globe className="w-5 h-5 text-[#5eb1ff]" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sites Web & E-commerce</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Des sites vitrines et boutiques en ligne ultra-rapides, optimisés pour le SEO et la conversion, lisibles sur tous les écrans.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 mt-6">
              {['React', 'Next.js', 'Shopify', 'SEO'].map(t => (
                <span key={t} className="text-[11px] text-gray-400 bg-white/5 border border-white/[0.07] px-2.5 py-1 rounded-md">{t}</span>
              ))}
            </div>
          </div>

          {/* SaaS card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col group hover:border-white/20 transition-all duration-300 overflow-hidden relative min-h-[180px]">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#93c5fd]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-[#93c5fd]/10 flex items-center justify-center mb-4 border border-[#93c5fd]/20">
              <Code className="w-5 h-5 text-[#93c5fd]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1.5">Applications SaaS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Outils sur-mesure pour digitaliser et automatiser vos processus internes.
              </p>
            </div>
          </div>

          {/* Design card */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col group hover:border-white/20 transition-all duration-300 min-h-[180px] relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#3b82f6]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-10 h-10 rounded-xl bg-[#3b82f6]/10 flex items-center justify-center mb-4 border border-[#3b82f6]/20">
              <Palette className="w-5 h-5 text-[#3b82f6]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1.5">Design Graphique</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Logos, flyers, filtres et identités visuelles percutantes qui marquent les esprits.
              </p>
            </div>
          </div>

          {/* Data + AI card — spans 2 cols */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Data */}
            <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 flex flex-col group hover:border-white/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#bfdbfe]/5 rounded-full blur-2xl pointer-events-none" />
              <div className="w-10 h-10 rounded-xl bg-[#bfdbfe]/10 flex items-center justify-center mb-4 border border-[#bfdbfe]/15">
                <LineChart className="w-5 h-5 text-[#bfdbfe]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1.5">Analyse de Données</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Tableaux de bord sur-mesure pour visualiser et piloter vos données en temps réel.
              </p>
            </div>

            {/* AI Agents — CTA */}
            <div className="bg-[#5eb1ff]/5 border border-[#5eb1ff]/20 rounded-3xl p-6 flex flex-col justify-between group hover:bg-[#5eb1ff]/8 hover:border-[#5eb1ff]/35 transition-all duration-300 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#5eb1ff]/10 rounded-full blur-3xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#5eb1ff]/15 flex items-center justify-center mb-4 border border-[#5eb1ff]/30">
                  <Bot className="w-5 h-5 text-[#5eb1ff]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1.5">Agents IA</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Chatbots et agents intelligents pour automatiser vos interactions client 24/7.
                </p>
              </div>
              <a
                href="mailto:mamadousanogo352@gmail.com"
                className="mt-5 inline-flex items-center justify-center bg-[#5eb1ff] text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white transition-colors"
              >
                Démarrer le projet
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
