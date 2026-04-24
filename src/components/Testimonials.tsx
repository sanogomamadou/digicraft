import { motion } from 'motion/react';

const testimonials = [
  {
    text: 'DigiCraft a complètement transformé notre présence en ligne. Le site et l\'application SaaS ont automatisé nos processus. L\'impact sur notre croissance a été extraordinaire.',
    name: 'Sarah M. Harvey',
    role: 'COO, TechFlow',
    initial: 'S',
    color: '#5eb1ff',
  },
  {
    text: 'Leur niveau d\'expertise technique est impressionnant. Les agents IA gèrent désormais des workflows complexes qui nécessitaient auparavant une équipe dédiée entière.',
    name: 'Evelyn P. Blake',
    role: 'Directrice des Opérations, Nexus',
    initial: 'E',
    color: '#93c5fd',
  },
  {
    text: 'L\'application SaaS développée a divisé notre temps de traitement par trois. L\'équipe a su comprendre nos besoins métiers et les traduire en solution intuitive.',
    name: 'Marcus T. Dubois',
    role: 'CEO, InnovateX',
    initial: 'M',
    color: '#3b82f6',
  },
  {
    text: 'Notre nouveau site e-commerce a fait bondir nos ventes de 40% en deux mois. Le design est magnifique, l\'expérience est fluide, l\'intégration parfaite. Merci DigiCraft !',
    name: 'Sophie Laurent',
    role: 'Fondatrice, RetailPlus',
    initial: 'S',
    color: '#bfdbfe',
  },
];

export default function Testimonials() {
  return (
    <section id="temoignages" className="py-16 md:py-24 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 mb-12 md:mb-16 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Ils nous font confiance</h2>
        <p className="text-gray-400 text-base sm:text-lg">
          Découvrez ce que nos clients disent de nos solutions digitales.
        </p>
      </div>

      {/* Marquee — two rows for visual rhythm on desktop */}
      <div className="relative flex overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <motion.div
          className="flex gap-5 w-max px-5"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ repeat: Infinity, ease: 'linear', duration: 45 }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="w-[80vw] sm:w-[340px] md:w-[400px] shrink-0 bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 flex flex-col"
            >
              {/* Quote mark */}
              <div className="text-5xl leading-none font-serif mb-4" style={{ color: t.color, opacity: 0.4 }}>
                "
              </div>

              <p className="text-gray-300 text-sm leading-relaxed flex-1 mb-6">
                {t.text}
              </p>

              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.07]">
                {/* Avatar initial */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-black shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="text-sm font-medium text-white">{t.name}</div>
                  <div className="text-[12px] text-gray-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
