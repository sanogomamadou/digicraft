import { plans } from '../content';
import { Asterisk, PillCta, SectionMeta, mailto } from './ui';

export default function Pricing() {
  return (
    <section id="forfaits" data-nav="light" aria-labelledby="pricing-heading" className="bg-paper pt-10 md:pt-16 pb-20 md:pb-32">
      <SectionMeta className="px-4 md:px-8" left="Des forfaits clairs, pour chaque étape de votre croissance." right="Forfaits" />

      <h2 id="pricing-heading" className="px-4 md:px-8 mt-12 md:mt-16 display text-[clamp(40px,6vw,92px)] leading-[0.92]">
        Nos forfaits<Asterisk className="inline-block align-top w-[0.3em] h-[0.3em] ml-[0.08em] mt-[0.05em] text-blue" />
      </h2>

      <div className="mt-12 md:mt-16 flex flex-col">
        {plans.map(plan => {
          const hi = plan.highlighted;
          return (
            <article
              key={plan.name}
              className={`relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center px-4 md:px-8 py-9 md:py-11 ${hi ? 'bg-ink text-white' : 'border-t border-black/[0.1] last:border-b'}`}
            >
              <div className="lg:col-span-4 min-w-0">
                {hi && <p className="label text-blue-soft mb-3 flex items-center gap-2"><Asterisk className="w-3 h-3" /> Le plus populaire</p>}
                <h3 className="display text-[clamp(52px,5.4vw,80px)] leading-[0.85] whitespace-nowrap">{plan.name}</h3>
              </div>

              <div className="lg:col-span-3 min-w-0">
                <p className={`text-[17px] tracking-[-0.03em] mb-4 ${hi ? 'text-white' : 'text-text'}`}>{plan.tagline}</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-1.5">
                  {plan.features.map(f => (
                    <li key={f} className={`label flex gap-2 ${hi ? 'text-white/75' : 'text-muted'}`}>
                      <span className={hi ? 'text-blue-soft' : 'text-blue'}>+</span>{f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-3 min-w-0 lg:pl-6">
                <p className={`label mb-1 ${hi ? 'text-white/55' : 'text-muted'}`}>{plan.priceInfo}</p>
                <p className={`display text-[clamp(38px,3.6vw,56px)] leading-none whitespace-nowrap ${hi ? 'text-white' : 'text-text'}`}>{plan.price}</p>
                <p className={`label mt-2 ${hi ? 'text-white/55' : 'text-muted'}`}>{plan.footer}</p>
              </div>

              <div className="lg:col-span-2 lg:justify-self-end">
                <PillCta href={mailto(`Demande de devis - Forfait ${plan.name}`)} size="sm" className={hi ? '[&>span:first-child]:bg-white [&>span:first-child]:text-ink [&>span:first-child]:group-hover:text-white' : ''}>
                  Commencer
                </PillCta>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
