import { useRef } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const plans = [
  {
    name: 'Starter',
    price: '150 000 F',
    priceInfo: 'À partir de',
    tagline: 'Idéal pour lancer votre présence en ligne.',
    features: [
      'Site vitrine responsive',
      'Design personnalisé',
      'Optimisation SEO de base',
      'Formulaire de contact',
    ],
    footer: 'Support technique 1 mois',
    highlighted: false,
    subject: 'Demande de devis - Plan Starter',
  },
  {
    name: 'Pro',
    price: '300 000 F',
    priceInfo: 'À partir de',
    tagline: 'Pour les entreprises en pleine croissance.',
    features: [
      'Site E-commerce ou Web App',
      'Intégration CMS',
      'Automatisations de base',
      'Tableau de bord analytique',
    ],
    footer: 'Support technique 3 mois',
    highlighted: true,
    subject: 'Demande de devis - Plan Pro',
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    priceInfo: 'Adapté à votre projet',
    tagline: 'Solutions sur-mesure avec IA.',
    features: [
      'Application SaaS sur-mesure',
      'Intégration d\'Agents IA',
      'Analyse de données avancée',
      'Infrastructure Cloud dédiée',
    ],
    footer: 'Support prioritaire 24/7',
    highlighted: false,
    subject: 'Demande de devis - Plan Enterprise',
  },
];

export default function Pricing() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.fromTo('.pricing-heading > *',
      { y: 30, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 80%' },
        y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out',
      }
    );
    gsap.fromTo('.pricing-card',
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: container.current, start: 'top 72%' },
        y: 0, opacity: 1, duration: 1.1, stagger: 0.15, ease: 'expo.out',
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="forfaits" aria-labelledby="pricing-heading" className="py-16 md:py-28 relative overflow-hidden">
      {/* Replaced expensive blur with a radial gradient for better performance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(94,177,255,0.15)_0%,transparent_70%)] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="pricing-heading text-center mb-14">
          <h2 id="pricing-heading" className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 text-white/95">Nos Forfaits</h2>
          <p className="text-white/60 max-w-md mx-auto text-lg">
            Des solutions digitales adaptées à chaque étape de votre croissance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto items-center">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative flex flex-col transition-all duration-300 ${plan.highlighted
                ? 'bg-[#5eb1ff] text-[#050505] rounded-[24px] p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(94,177,255,0.25)] scale-105 z-10'
                : 'bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-[24px] p-8 md:p-10 backdrop-blur-md'
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 bg-[#050505] text-white/90 text-[11px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg border border-white/10">
                    <Star className="w-3 h-3 fill-white/90 text-white/90" />
                    Le plus populaire
                  </div>
                </div>
              )}

              <div className="flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? 'text-[#050505]' : 'text-white/90'}`}>{plan.name}</h3>
                  <p className={`text-sm ${plan.highlighted ? 'text-[#050505]/70' : 'text-white/60'}`}>{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <div className={`text-3xl font-semibold tracking-tight ${plan.highlighted ? 'text-[#050505]' : 'text-white/95'}`}>{plan.price}</div>
                  <p className={`text-[11px] mt-1 ${plan.highlighted ? 'text-[#050505]/60' : 'text-white/50'}`}>{plan.priceInfo}</p>
                </div>

                {/* CTA */}
                <a
                  href={`mailto:mamadousanogo352@gmail.com?subject=${encodeURIComponent(plan.subject)}`}
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full text-sm font-semibold mb-8 transition-all duration-300 ${plan.highlighted
                    ? 'bg-[#050505] text-white/90 hover:bg-[#111111] hover:-translate-y-0.5 hover:shadow-lg'
                    : 'bg-white/5 text-white/90 hover:bg-white/10 hover:-translate-y-0.5 border border-white/10 hover:border-white/20'
                    }`}
                >
                  Commencer <ArrowRight className="w-4 h-4" />
                </a>

                {/* Features */}
                <ul className="space-y-4 flex-1 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-3 text-sm ${plan.highlighted ? 'text-[#050505]/80 font-medium' : 'text-white/70'}`}>
                      <Check
                        className={`w-4.5 h-4.5 mt-0.5 shrink-0 ${plan.highlighted ? 'text-[#050505]' : 'text-[#5eb1ff]'}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Footer note */}
                <div className={`pt-6 border-t text-[12px] text-center font-medium ${plan.highlighted ? 'border-[#050505]/10 text-[#050505]/60' : 'border-white/10 text-white/50'}`}>
                  {plan.footer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
