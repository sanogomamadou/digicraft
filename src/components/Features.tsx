import { Globe, Code, Palette, LineChart } from 'lucide-react';
import { motion } from 'motion/react';

export default function Features() {
  const services = ['Sites Web', 'Applications SaaS', 'Design Graphique', 'Analyse de Données', 'Agents IA'];

  return (
    <section id="services" className="pt-2 pb-16 md:pb-24 bg-black overflow-hidden">
      {/* Top Tabs Marquee (Full Width) */}
      <div className="relative flex overflow-hidden mb-16 w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <motion.div 
          className="flex whitespace-nowrap w-max will-change-transform transform-gpu"
          animate={{ x: ["0%", "-25%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
        >
          {[...Array(4)].map((_, arrayIndex) => (
            <div key={arrayIndex} className="flex gap-4 pr-4">
              {services.map((tab, i) => (
                <div 
                  key={`${arrayIndex}-${i}`} 
                  className="px-6 py-3 rounded-full text-[15px] font-medium bg-[#0a0a0a] text-white relative flex items-center justify-center border border-white/10"
                >
                  {tab === 'Applications SaaS' && (
                    <div className="absolute inset-0 rounded-full border border-transparent [background:linear-gradient(var(--color-surface-light),var(--color-surface-light))_padding-box,linear-gradient(to_right,#5eb1ff,var(--color-surface-light))_border-box] [mask-image:linear-gradient(to_bottom,transparent_60%,black)]"></div>
                  )}
                  <span className="relative z-10">{tab}</span>
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-4 text-white">Pourquoi choisir DigiCraft ?</h2>
          <p className="text-gray-400 text-lg">Une expertise technique complète pour digitaliser votre entreprise.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Web */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-[#5eb1ff] to-[#0a1930] mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Sites Web</h3>
            <p className="text-gray-400 text-sm leading-normal">Des sites vitrines et e-commerce performants, optimisés pour le SEO et la conversion.</p>
          </div>

          {/* Card 2: SaaS */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-[#5eb1ff] to-[#0a1930] mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Applications SaaS</h3>
            <p className="text-gray-400 text-sm leading-normal">Développement d'outils sur-mesure pour digitaliser et automatiser vos processus internes.</p>
          </div>

          {/* Card 3: Design */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-[#5eb1ff] to-[#0a1930] mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Design Graphique</h3>
            <p className="text-gray-400 text-sm leading-normal">Création de logos, flyers, filtres Snapchat et identités visuelles percutantes.</p>
          </div>

          {/* Card 4: Data & AI */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl rounded-3xl p-6 flex flex-col items-center text-center">
            <div className="relative p-[1.5px] rounded-full bg-gradient-to-br from-[#5eb1ff] to-[#0a1930] mb-4">
              <div className="w-12 h-12 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <LineChart className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Data & IA</h3>
            <p className="text-gray-400 text-sm leading-normal">Analyse de vos données et intégration d'agents intelligents pour booster votre productivité.</p>
          </div>

          {/* Card 5: CTA */}
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl rounded-3xl p-8 flex flex-col items-center justify-center text-center md:col-span-2 relative overflow-hidden">
            <div className="absolute bottom-0 left-12 right-12 h-[3px] bg-gradient-to-r from-transparent via-[#5eb1ff] to-transparent opacity-80"></div>
            <h3 className="text-2xl font-semibold text-white mb-2">Prêt à digitaliser votre PME ?</h3>
            <p className="text-gray-400 text-sm mb-6">Discutons de votre projet et trouvons les solutions adaptées.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 w-full sm:w-auto">
              <a href="mailto:mamadousanogo352@gmail.com" className="bg-[#5eb1ff] text-black px-8 py-3 rounded-full text-sm font-semibold hover:bg-[#4a90e2] transition-colors w-full sm:w-auto inline-block">Démarrer le projet</a>
              <a href="mailto:mamadousanogo352@gmail.com" className="bg-transparent border border-white/20 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/5 transition-colors w-full sm:w-auto inline-block">Nous contacter</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
