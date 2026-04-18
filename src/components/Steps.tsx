import { useRef } from 'react';
import { MessageSquareText, PenTool, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Steps() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.step-header > *', 
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

    gsap.fromTo('.step-number', 
      { y: 100, opacity: 0 },
      {
        scrollTrigger: {
          trigger: container.current,
          start: "top 75%",
        },
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    gsap.fromTo('.step-card', 
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
        ease: "power3.out"
      }
    );
  }, { scope: container });

  return (
    <section ref={container} className="py-16 md:py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="step-header mb-16 md:mb-24 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Notre Processus en 3 Étapes</h2>
          <p className="text-gray-400 text-base sm:text-lg">De l'idée à la réalisation, nous vous accompagnons à chaque étape.</p>
        </div>

        {/* Background Numbers */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-[-5.5rem] relative z-0 pointer-events-none select-none">
          <div className="step-number flex justify-center">
            <span className="text-[12rem] font-bold text-[#1a1a1a] leading-none tracking-tighter">01</span>
          </div>
          <div className="step-number flex justify-center">
            <span className="text-[12rem] font-bold text-[#1a1a1a] leading-none tracking-tighter">02</span>
          </div>
          <div className="step-number flex justify-center">
            <span className="text-[12rem] font-bold text-[#1a1a1a] leading-none tracking-tighter">03</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {/* Step 1 */}
          <div className="step-card relative bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-10 flex flex-col items-center text-center overflow-hidden border border-white/15 shadow-2xl hover:bg-white/[0.05] transition-colors group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5eb1ff] to-transparent opacity-80"></div>
            
            <h3 className="text-2xl font-semibold text-white mb-4">Consultation & Stratégie</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-16">
              Nous discutons de vos besoins, analysons votre marché et définissons ensemble la meilleure stratégie digitale.
            </p>
            
            <div className="mt-auto">
              <MessageSquareText className="w-20 h-20 text-white stroke-[1.5]" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-card relative bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-10 flex flex-col items-center text-center overflow-hidden border border-white/15 shadow-2xl hover:bg-white/[0.05] transition-colors group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5eb1ff] to-transparent opacity-80"></div>
            
            <h3 className="text-2xl font-semibold text-white mb-4">Design & Développement</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-16">
              Nos experts conçoivent l'interface et développent votre solution sur-mesure avec les dernières technologies.
            </p>
            
            <div className="mt-auto">
              <PenTool className="w-20 h-20 text-white stroke-[1.5]" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-card relative bg-white/[0.03] backdrop-blur-2xl rounded-3xl p-10 flex flex-col items-center text-center overflow-hidden border border-white/15 shadow-2xl hover:bg-white/[0.05] transition-colors group">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#5eb1ff] to-transparent opacity-80"></div>
            
            <h3 className="text-2xl font-semibold text-white mb-4">Déploiement & Suivi</h3>
            <p className="text-gray-400 text-[15px] leading-relaxed mb-16">
              Nous lançons votre projet et assurons un suivi continu pour garantir des performances optimales.
            </p>
            
            <div className="mt-auto">
              <Rocket className="w-20 h-20 text-white stroke-[1.5]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
