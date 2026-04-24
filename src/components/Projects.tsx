import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const projects = [
  {
    title: 'E-Commerce NextGen',
    category: 'Site Web & E-commerce',
    description: 'Une plateforme de vente en ligne ultra-rapide avec gestion des stocks automatisée et paiements intégrés.',
    accent: '#5eb1ff',
    tags: ['React', 'Node.js', 'Stripe'],
    year: '2025',
  },
  {
    title: 'SmartData Analytics',
    category: 'SaaS & Data',
    description: 'Tableau de bord sur-mesure pour la visualisation de données financières en temps réel pour une PME.',
    accent: '#93c5fd',
    tags: ['Vue.js', 'Python', 'D3.js'],
    year: '2025',
  },
  {
    title: 'AutoSupport IA',
    category: 'Intelligence Artificielle',
    description: 'Agent conversationnel intelligent capable de résoudre 70% des requêtes clients automatiquement 24/7.',
    accent: '#3b82f6',
    tags: ['OpenAI', 'TypeScript', 'Cloud'],
    year: '2026',
  },
];

export default function Projects() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.project-header > *',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 80%' },
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
      }
    );
    gsap.fromTo('.project-item',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 72%' },
        y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: 'expo.out',
      }
    );
  }, { scope: container });

  return (
    <section id="realisations" ref={container} className="py-16 md:py-24 bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 max-w-[1200px]">

        {/* Header */}
        <div className="project-header mb-12 md:flex md:items-end md:justify-between gap-8">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 text-white">
              Nos Réalisations
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">
              Découvrez comment nous avons aidé d'autres entreprises à atteindre leurs objectifs grâce au digital.
            </p>
          </div>
          <a
            href="mailto:mamadousanogo352@gmail.com"
            className="hidden md:inline-flex items-center gap-2 text-sm text-[#5eb1ff] border border-[#5eb1ff]/25 rounded-full px-5 py-2.5 hover:bg-[#5eb1ff]/5 transition-colors whitespace-nowrap"
          >
            Voir tous les projets <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Project list — not a card grid, but a numbered list with dividers */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {projects.map((project, i) => (
            <div
              key={i}
              className="project-item group flex flex-col sm:flex-row sm:items-center gap-5 py-8 hover:bg-white/[0.015] -mx-3 px-3 rounded-2xl transition-colors duration-300 cursor-pointer"
            >
              {/* Index */}
              <span className="text-xs font-mono text-gray-600 w-8 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              {/* Accent dot + category */}
              <div className="flex items-center gap-2 w-40 shrink-0">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: project.accent }} />
                <span className="text-[12px] text-gray-500 truncate">{project.category}</span>
              </div>

              {/* Title + description */}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1.5 group-hover:text-[#5eb1ff] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                  {project.description}
                </p>
              </div>

              {/* Tags — hidden on smallest screens */}
              <div className="hidden lg:flex flex-wrap gap-1.5 w-52 shrink-0">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[11px] text-gray-400 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Year + arrow */}
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-xs text-gray-600 font-mono hidden sm:block">{project.year}</span>
                <div
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:border-[#5eb1ff]/40 group-hover:text-[#5eb1ff] transition-all duration-300"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile CTA */}
        <a
          href="mailto:mamadousanogo352@gmail.com"
          className="mt-10 md:hidden flex items-center justify-center gap-2 text-[#5eb1ff] text-sm font-medium w-full py-3 border border-[#5eb1ff]/25 rounded-full hover:bg-[#5eb1ff]/5 transition-colors"
        >
          Voir tous les projets <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
}
