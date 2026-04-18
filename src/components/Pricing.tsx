import { useRef } from 'react';
import { CheckCircle2, Star } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Pricing() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.pricing-header > *', 
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

    gsap.fromTo('.pricing-card', 
      { y: 60, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "back.out(1.2)"
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-16 md:py-24 bg-black relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#5eb1ff]/5 rounded-full blur-[120px] pointer-events-none will-change-transform transform-gpu" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="pricing-header text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-medium mb-4">Nos Forfaits</h2>
          <p className="text-gray-400 mb-8 px-4">Des solutions digitales adaptées à chaque étape de votre croissance.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-8 max-w-6xl mx-auto items-center">
          {/* Starter Plan */}
          <div className="pricing-card bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl rounded-[2.5rem] p-2">
            <div className="text-white text-center font-semibold py-3 text-lg">Starter</div>
            <div className="border border-white/10 rounded-[2rem] p-5 bg-white/[0.02] backdrop-blur-xl shadow-inner h-full flex flex-col">
              <div className="flex justify-center items-baseline gap-1 mb-2">
                <span className="text-4xl font-semibold text-white">Sur devis</span>
              </div>
              <p className="text-gray-400 text-sm text-center mb-5 h-10">Idéal pour lancer votre présence en ligne.</p>
              <a href="mailto:mamadousanogo352@gmail.com?subject=Demande de devis - Plan Starter" className="w-full py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white font-medium hover:bg-white/10 transition-colors mb-6 text-center inline-block">
                Commencer
              </a>
              <div className="space-y-3 mb-6 px-2 flex-1">
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Site vitrine responsive</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Design personnalisé</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Optimisation SEO de base</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Formulaire de contact</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 text-sm text-white font-semibold text-center">
                Support technique (1 mois)
              </div>
            </div>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="pricing-card relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-[#5eb1ff] via-[#3b82f6] to-[#0a1930] transform lg:-translate-y-4 mt-8 lg:mt-0 shadow-[0_0_30px_rgba(94,177,255,0.15)]">
            {/* Most Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-black border border-[#5eb1ff]/50 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-xl relative overflow-hidden whitespace-nowrap">
                <div className="absolute inset-0 bg-gradient-to-r from-[#5eb1ff]/20 via-[#3b82f6]/20 to-[#0a1930]/20"></div>
                <span className="relative z-10">Le plus populaire</span>
              </div>
            </div>

            <div className="bg-black/90 backdrop-blur-2xl rounded-[2.5rem] p-2 h-full">
              <div className="flex justify-center items-center py-3 relative">
                <div className="text-white text-center font-semibold text-lg flex items-center gap-2">
                  <Star className="w-5 h-5 fill-[#5eb1ff] text-[#5eb1ff]" /> Pro
                </div>
              </div>
              <div className="border border-[#5eb1ff]/20 rounded-[2rem] p-5 relative overflow-hidden flex flex-col h-full">
                {/* Inner Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent z-0"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1930]/40 via-[#3b82f6]/20 to-[#5eb1ff]/10 z-0"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-center items-baseline gap-1 mb-2">
                    <span className="text-4xl font-semibold text-white">Sur devis</span>
                  </div>
                  <p className="text-gray-400 text-sm text-center mb-5 h-10">Pour les entreprises en pleine croissance.</p>
                  <a href="mailto:mamadousanogo352@gmail.com?subject=Demande de devis - Plan Pro" className="w-full py-2.5 rounded-full bg-[#5eb1ff] text-black font-medium hover:bg-[#4a90e2] transition-colors mb-6 text-center inline-block">
                    Commencer
                  </a>
                  <div className="space-y-3 mb-6 px-2 flex-1">
                    <div className="flex items-center gap-4 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#5eb1ff] shrink-0" /> <span className="text-[15px]">Site E-commerce ou Web App</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#5eb1ff] shrink-0" /> <span className="text-[15px]">Intégration CMS</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#5eb1ff] shrink-0" /> <span className="text-[15px]">Automatisations de base</span>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                      <CheckCircle2 className="w-5 h-5 text-[#5eb1ff] shrink-0" /> <span className="text-[15px]">Tableau de bord analytique</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 text-sm text-white font-semibold text-center">
                    Support technique (3 mois)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="pricing-card bg-white/[0.03] backdrop-blur-2xl border border-white/15 shadow-2xl rounded-[2.5rem] p-2">
            <div className="text-white text-center font-semibold py-3 text-lg">Enterprise</div>
            <div className="border border-white/10 rounded-[2rem] p-5 bg-white/[0.02] backdrop-blur-xl shadow-inner h-full flex flex-col">
              <div className="flex justify-center items-baseline gap-1 mb-2">
                <span className="text-4xl font-semibold text-white">Sur devis</span>
              </div>
              <p className="text-gray-400 text-sm text-center mb-5 h-10">Solutions sur-mesure avec Intelligence Artificielle.</p>
              <a href="mailto:mamadousanogo352@gmail.com?subject=Demande de devis - Plan Enterprise" className="w-full py-2.5 rounded-full bg-white/[0.03] border border-white/10 text-white font-medium hover:bg-white/10 transition-colors mb-6 text-center inline-block">
                Commencer
              </a>
              <div className="space-y-3 mb-6 px-2 flex-1">
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Application SaaS sur-mesure</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Intégration d'Agents IA</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Analyse de données avancée</span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-gray-300 shrink-0" /> <span className="text-[15px]">Infrastructure Cloud dédiée</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10 text-sm text-white font-semibold text-center">
                Support prioritaire 24/7
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
