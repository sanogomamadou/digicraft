import { Fragment } from 'react';
import { Asterisk, PillCta, mailto } from './ui';

const phrases = ['Devis gratuit sous 24h', 'Sites web · SaaS · IA · Automatisation'];

/** Bandeau texte bleu + astérisques. */
export function TextMarquee() {
  const row = (hidden: boolean) => (
    <div className="flex items-center shrink-0" aria-hidden={hidden || undefined}>
      {[...phrases, ...phrases].map((p, i) => (
        <Fragment key={i}>
          <span className="px-6 md:px-10 text-[26px] md:text-[34px] font-medium uppercase tracking-[-0.045em] whitespace-nowrap">{p}</span>
          <Asterisk className="w-7 h-7 md:w-10 md:h-10 shrink-0" />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className="relative bg-paper text-blue py-6 md:py-8 overflow-hidden">
      <div className="marquee" style={{ '--marquee-duration': '38s' } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/** Rangée défilante de pilules CTA. */
export function CtaMarquee() {
  const items = Array.from({ length: 6 });
  const row = (hidden: boolean) => (
    <div className="flex items-center gap-8 md:gap-14 pr-8 md:pr-14 shrink-0" aria-hidden={hidden || undefined}>
      {items.map((_, i) => {
        const inert = hidden || i > 0;
        return (
          <span key={i} inert={inert}>
            <PillCta href={mailto()} size="xl">Lancer mon projet</PillCta>
          </span>
        );
      })}
    </div>
  );
  return (
    <div className="marquee-host relative bg-paper py-10 md:py-16 overflow-hidden">
      <div className="marquee marquee-pausable" style={{ '--marquee-duration': '45s' } as React.CSSProperties}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
