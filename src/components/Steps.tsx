import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const steps = [
  {
    n: '01',
    title: 'Consultation & Stratégie',
    body: 'Nous discutons de vos besoins, analysons votre marché et définissons ensemble la meilleure stratégie digitale pour votre PME.',
  },
  {
    n: '02',
    title: 'Design & Développement',
    body: 'Nos experts conçoivent l\'interface et développent votre solution sur-mesure avec les technologies les plus adaptées à votre projet.',
  },
  {
    n: '03',
    title: 'Déploiement & Suivi',
    body: 'Nous lançons votre projet et assurons un suivi continu pour garantir des performances optimales dans la durée.',
  },
];

export default function Steps() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.steps-heading > *',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 80%' },
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
      }
    );

    gsap.fromTo('.step-item',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 72%' },
        y: 0, opacity: 1, duration: 1.1, stagger: 0.18, ease: 'expo.out',
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="processus" className="py-16 md:py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#5eb1ff]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="steps-heading text-center mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">
            Notre Processus en 3 Étapes
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            De l'idée à la réalisation, nous vous accompagnons à chaque étape.
          </p>
        </div>

        {/* Timeline: horizontal on desktop, vertical on mobile */}
        <div className="relative max-w-5xl mx-auto">

          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-[2.6rem] left-[calc(16.666%+1.5rem)] right-[calc(16.666%+1.5rem)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="step-item flex flex-col md:items-center group">
                {/* Number node */}
                <div className="flex md:flex-col md:items-center gap-5 md:gap-4 mb-6 md:mb-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full border border-white/15 bg-[#060e20] flex items-center justify-center relative z-10 group-hover:border-[#5eb1ff]/40 transition-colors duration-300">
                      <span className="text-xs font-semibold text-[#5eb1ff]">{step.n}</span>
                    </div>
                    {/* Vertical connector — mobile only */}
                    {i < steps.length - 1 && (
                      <div className="md:hidden absolute left-1/2 top-full -translate-x-1/2 w-px h-10 bg-gradient-to-b from-white/10 to-transparent mt-1" />
                    )}
                  </div>

                  {/* Mobile: title next to node */}
                  <h3 className="text-lg font-semibold text-white md:hidden">{step.title}</h3>
                </div>

                {/* Desktop: title + body below node */}
                <div className="md:text-center md:pt-6 pl-16 md:pl-0">
                  <h3 className="hidden md:block text-lg font-semibold text-white mb-3 group-hover:text-[#5eb1ff] transition-colors duration-300">{step.title}</h3>
                  <p className="text-gray-400 text-[14px] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <a
            href="mailto:mamadousanogo352@gmail.com"
            className="inline-flex items-center gap-2 bg-[#5eb1ff] text-black px-8 py-3.5 rounded-full font-medium text-sm hover:bg-white transition-colors"
          >
            Démarrer mon projet
          </a>
        </div>
      </div>
    </section>
  );
}
