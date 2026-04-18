import { useRef } from 'react';
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const maliNeighbors = [
  "Algeria", "Niger", "Burkina Faso", "Côte d'Ivoire", "Guinea", "Senegal", "Mauritania"
];

export default function Hero() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-content > *', 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.6,
        stagger: 0.15,
        ease: 'expo.out',
        delay: 0.2
      }
    )
    .fromTo('.hero-card', 
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.6,
        stagger: 0.12,
        ease: 'expo.out'
      }, 
      "-=1.2"
    );
  }, { scope: container });

  return (
    <section id="accueil" ref={container} className="relative min-h-screen flex items-center pt-28 md:pt-32 pb-8 overflow-hidden">
      {/* Background Gradients (Optimized) */}
      <div className="absolute top-1/2 left-0 w-[800px] h-[800px] bg-[#5eb1ff]/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -translate-x-1/4 will-change-transform transform-gpu" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[#0a1930]/40 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 -translate-x-1/2 will-change-transform transform-gpu" />
      <div className="absolute top-1/2 right-0 w-[800px] h-[800px] bg-[#3b82f6]/20 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/4 will-change-transform transform-gpu" />

      <div className="container mx-auto px-5 md:px-8 relative z-10 flex flex-col items-center text-center pt-12 md:pt-20">
        <div className="hero-content max-w-4xl flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl md:text-[5rem] font-light leading-[1.1] mb-4 tracking-tight">
            Propulsez votre PME dans <br className="hidden md:block" />
            <span className="font-bold text-5xl sm:text-6xl md:text-[6.5rem] tracking-tight block mt-2 text-[#5eb1ff]">l'ère du Digital</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-[15px] font-light mb-10 max-w-xl px-4">
            Sites Web, SaaS, Data & IA. Des solutions sur-mesure pour accélérer votre croissance et automatiser vos processus.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center bg-transparent sm:bg-white/5 sm:border sm:border-white/10 rounded-3xl sm:rounded-full p-0 sm:p-1.5 w-full max-w-md backdrop-blur-sm mb-20 gap-3 sm:gap-0 px-4 sm:px-0">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="bg-white/5 sm:bg-transparent border border-white/10 sm:border-none outline-none px-6 py-4 sm:py-3 w-full rounded-full sm:rounded-none text-white placeholder:text-gray-500 text-center sm:text-left"
            />
            <button className="bg-[#5eb1ff] text-black px-8 py-4 sm:py-3 w-full sm:w-auto rounded-full font-medium hover:bg-[#4a90e2] transition-colors whitespace-nowrap">
              Démarrer
            </button>
          </div>
        </div>

        {/* Floating elements */}
        <div className="relative w-full max-w-[1400px] h-[500px] hidden md:block mt-20">
          
          {/* Card 1: Chat (AI Agent) */}
          <div className="hero-card absolute left-0 top-0 w-[300px] bg-white/[0.03] backdrop-blur-2xl border border-white/15 rounded-3xl p-5 shadow-2xl flex flex-col gap-4 text-left will-change-transform">
            <div className="bg-[#5eb1ff]/10 border border-[#5eb1ff]/20 rounded-2xl p-3 text-[13px] text-gray-300 w-[85%]">Bonjour ! Comment puis-je automatiser mes factures ?</div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-[13px] text-gray-300 w-[85%] self-end text-right">Je peux configurer un agent IA pour extraire les données et les envoyer à votre comptable.</div>
            <div className="bg-[#5eb1ff]/10 border border-[#5eb1ff]/20 rounded-2xl p-3 text-[13px] text-gray-300 w-[85%]">C'est parfait, combien de temps ça prend ?</div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-3 text-[13px] text-gray-300 w-[85%] self-end text-right">Le déploiement prend environ 48 heures.</div>
          </div>

          {/* Card 2: Visitor Overview (Data Analysis) */}
          <div className="hero-card absolute left-[24%] top-24 w-[340px] bg-white/[0.03] backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl text-left will-change-transform">
            <h3 className="text-white font-medium mb-6 text-lg">Analyse de Données</h3>
            <div className="flex gap-3 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 flex items-center gap-2 text-xs text-gray-300">
                <div className="w-2 h-2 rounded-full bg-[#5eb1ff]"></div> Croissance
              </div>
              <div className="bg-white/5 border border-white/10 rounded-md px-3 py-1.5 flex items-center gap-2 text-xs text-gray-300">
                <div className="w-2 h-2 rounded-full bg-white"></div> Objectif
              </div>
            </div>
            <div className="h-40 relative">
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M 0 90 C 40 90, 60 10, 100 10" fill="none" stroke="#5eb1ff" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 0 100 C 40 100, 60 30, 100 30" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="0" cy="90" r="4" fill="#0a0a0a" className="stroke-[#5eb1ff] stroke-[3px]" />
                <circle cx="0" cy="100" r="4" fill="#0a0a0a" className="stroke-white stroke-[3px]" />
              </svg>
            </div>
          </div>

          {/* Card 3: Select a Representative (Services) */}
          <div className="hero-card absolute right-[24%] top-0 w-[340px] bg-white/[0.03] backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl text-left will-change-transform">
            <h3 className="text-white font-medium mb-2 text-lg">Nos Services</h3>
            <p className="text-gray-400 text-sm mb-8">Des solutions adaptées à vos besoins.</p>
            <div className="space-y-4">
              <div className="bg-white/5 border border-[#5eb1ff]/30 rounded-xl px-4 py-3 text-sm text-white w-[85%] font-medium">Création de Sites Web</div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-[85%] ml-auto font-medium">Applications SaaS</div>
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white w-[85%] font-medium">Design Graphique & Logos</div>
            </div>
          </div>

          {/* Card 4: Country-Wise Sales Map (Global Reach) */}
          <div className="hero-card absolute right-0 top-32 w-[300px] bg-white/[0.03] backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col items-center text-left will-change-transform">
            <h3 className="text-white font-medium mb-6 self-start text-lg">Notre Zone d'Intervention</h3>
            <div className="w-full relative mb-4 flex justify-center overflow-hidden rounded-xl">
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 220, center: [0, 20] }}
                width={800}
                height={600}
                style={{ width: "100%", height: "auto" }}
              >
                <Geographies geography="https://unpkg.com/world-atlas@2.0.2/countries-110m.json">
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const name = geo.properties.name;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          style={{
                            default: { 
                              fill: name === "Mali" ? "var(--map-mali)" : maliNeighbors.includes(name) ? "var(--map-neighbor)" : "var(--map-world)",
                              outline: "none" 
                            },
                            hover: { outline: "none", fill: "#5eb1ff" },
                            pressed: { outline: "none" },
                          }}
                          stroke="rgba(0,0,0,0.1)"
                          strokeWidth={1}
                        />
                      );
                    })
                  }
                </Geographies>
              </ComposableMap>
            </div>
            <div className="text-center mt-auto">
              <div className="text-sm text-white font-medium mb-1">Pays Couverts</div>
              <div className="text-3xl font-bold text-[#5eb1ff]">8</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
