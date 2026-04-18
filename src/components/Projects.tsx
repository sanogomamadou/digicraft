import { useRef } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const projects = [
  {
    title: "E-Commerce NextGen",
    category: "Site Web & E-commerce",
    description: "Une plateforme de vente en ligne ultra-rapide avec gestion des stocks automatisée et paiements intégrés.",
    image: "https://picsum.photos/seed/ecommerce/800/600?blur=2",
    tags: ["React", "Node.js", "Stripe"]
  },
  {
    title: "SmartData Analytics",
    category: "SaaS & Data",
    description: "Tableau de bord sur-mesure pour la visualisation de données financières en temps réel pour une PME.",
    image: "https://picsum.photos/seed/dashboard/800/600?blur=2",
    tags: ["Vue.js", "Python", "D3.js"]
  },
  {
    title: "AutoSupport IA",
    category: "Intelligence Artificielle",
    description: "Agent conversationnel intelligent capable de résoudre 70% des requêtes clients automatiquement 24/7.",
    image: "https://picsum.photos/seed/ai/800/600?blur=2",
    tags: ["OpenAI", "TypeScript", "Cloud"]
  }
];

export default function Projects() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.project-header > *', 
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

    gsap.fromTo('.project-card', 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <section id="realisations" ref={container} className="py-16 md:py-24 bg-[#050505] relative">
      <div className="container mx-auto px-5 md:px-8 max-w-[1200px]">
        
        {/* Header */}
        <div className="project-header mb-16 md:flex md:items-end md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 text-white">Nos Réalisations</h2>
            <p className="text-gray-400 text-base sm:text-lg">Découvrez comment nous avons aidé d'autres entreprises à atteindre leurs objectifs grâce au digital.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-[#5eb1ff] hover:text-white transition-colors font-medium pb-2">
            Voir tous les projets <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className="project-card group rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-[#5eb1ff]/50 transition-all duration-500 flex flex-col shadow-2xl hover:shadow-[0_0_30px_rgba(94,177,255,0.1)]"
            >
              {/* Image Container */}
              <div className="relative h-60 overflow-hidden will-change-transform">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 will-change-transform"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-black/60 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-full border border-white/10">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#5eb1ff] transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 flex-1 leading-relaxed">{project.description}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-gray-300 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer / Link */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-medium text-white group-hover:text-[#5eb1ff] transition-colors">Explorer le projet</span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#5eb1ff] group-hover:text-black transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile Button */}
        <button className="mt-10 md:hidden flex items-center justify-center gap-2 text-[#5eb1ff] hover:text-white transition-colors font-medium w-full">
          Voir tous les projets <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
