import { useRef } from 'react';
import { Check, Star, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const plans = [
  {
    name: 'Starter',
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
    <section ref={container} id="forfaits" className="py-16 md:py-28 bg-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#5eb1ff]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container mx-auto px-5 md:px-8 relative z-10">
        <div className="pricing-heading text-center mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Nos Forfaits</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Des solutions digitales adaptées à chaque étape de votre croissance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative rounded-3xl flex flex-col transition-all duration-300 ${plan.highlighted
                  ? 'bg-[#5eb1ff]/5 border border-[#5eb1ff]/30 shadow-[0_0_40px_rgba(94,177,255,0.08)] md:-translate-y-3'
                  : 'bg-white/[0.03] border border-white/10'
                }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <div className="flex items-center gap-1.5 bg-[#5eb1ff] text-black text-[11px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                    <Star className="w-3 h-3 fill-black" />
                    Le plus populaire
                  </div>
                </div>
              )}

              <div className="p-6 md:p-7 flex flex-col flex-1">
                {/* Plan name */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-7">
                  <div className="text-3xl font-semibold text-white">Sur devis</div>
                  <p className="text-[11px] text-gray-600 mt-1">Adapté à votre projet</p>
                </div>

                {/* CTA */}
                <a
                  href={`mailto:mamadousanogo352@gmail.com?subject=${encodeURIComponent(plan.subject)}`}
                  className={`flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-medium mb-7 transition-all duration-200 ${plan.highlighted
                      ? 'bg-[#5eb1ff] text-black hover:bg-white'
                      : 'bg-white/[0.05] border border-white/10 text-white hover:bg-white/10'
                    }`}
                >
                  Commencer <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${plan.highlighted ? 'text-[#5eb1ff]' : 'text-gray-500'}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Footer note */}
                <div className="pt-5 border-t border-white/[0.07] text-[12px] text-gray-500 text-center">
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
