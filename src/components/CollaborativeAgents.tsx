import { motion } from 'motion/react';

const stats = [
  { value: '30+', label: 'Projets livrés' },
  { value: '4', label: 'Pays couverts' },
  { value: '98%', label: 'Clients satisfaits' },
  { value: '48h', label: 'Délai de réponse' },
];

export default function CollaborativeAgents() {
  return (
    <section className="py-10 md:py-16 relative z-10 overflow-hidden">
      <div className="container mx-auto px-5 md:px-12 lg:px-24 max-w-5xl">

        {/* Tagline */}
        <div className="grid md:grid-cols-2 gap-6 items-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            Des solutions <span className="text-[#5eb1ff]">digitales</span><br />pour des défis<br />complexes.
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed md:ml-auto max-w-sm">
            De la création de votre identité visuelle au développement d'applications SaaS sur-mesure, en passant par l'analyse de vos données et l'automatisation par l'IA. Nous vous accompagnons de A à Z.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-7 px-4 text-center"
            >
              <span className="text-3xl md:text-4xl font-semibold text-white mb-1">{stat.value}</span>
              <span className="text-xs text-gray-500 tracking-wide">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
