import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../content';
import { Asterisk, prefersReducedMotion } from './ui';

const HEADLINE = 'Des outils digitaux qui font gagner du temps, des clients et de la crédibilité à votre PME.';

export default function Services() {
  const container = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const reduced = prefersReducedMotion();

    // Titre qui se colore mot à mot
    if (!reduced) {
      gsap.fromTo('.why-word',
        { color: '#c3c3c3' },
        {
          color: '#0e1328',
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: '.why-headline', start: 'top 82%', end: 'bottom 40%', scrub: true },
        });
    }

    const cards = gsap.utils.toArray<HTMLElement>('.service-card');
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: self => { if (self.isActive) setActive(i); },
      });
      const next = cards[i + 1];
      if (next && !reduced) {
        gsap.to(card.querySelector('.card-inner'), {
          scale: 0.93,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
        });
        gsap.to(card.querySelector('.card-dim'), {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
        });
      }
    });

    gsap.fromTo('.why-progress', { scaleY: 0 }, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.service-stack', start: 'top 60%', end: 'bottom 60%', scrub: true },
    });
  }, { scope: container });

  const goTo = (i: number) => {
    const el = container.current?.querySelectorAll<HTMLElement>('.service-card')[i];
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -110, duration: 1.2 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section id="services" data-nav="light" ref={container} className="relative bg-paper pt-10 md:pt-14 pb-20 md:pb-32">
      {/* Filet de tête avec croix */}
      <div className="relative mx-4 md:mx-8 h-px bg-black/[0.1]">
        <span className="absolute -left-1 -top-[9px] text-black/30 text-[18px] leading-none font-light">+</span>
        <span className="absolute -right-1 -top-[9px] text-black/30 text-[18px] leading-none font-light">+</span>
      </div>

      {/* Filigrane */}
      <div className="pointer-events-none select-none absolute left-[-4vw] top-[8%] w-[46vw] aspect-square rounded-full border-[3px] border-black/[0.035]" aria-hidden="true" />

      <div className="relative px-4 md:px-8 pt-12 md:pt-16">
        <div className="flex flex-col-reverse md:flex-row md:items-start md:justify-between gap-6">
          <h2 className="why-headline display text-[clamp(34px,4.6vw,68px)] leading-[0.98] max-w-[15.5em] indent-[12%]">
            {HEADLINE.split(' ').map((w, i) => (
              <span key={i} className="why-word">{w} </span>
            ))}
          </h2>
          <p className="label text-blue md:pt-3 shrink-0">Pourquoi DigiCraft</p>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Index collant */}
          <aside className="md:col-span-4 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <div className="w-14 h-px bg-text ml-[38%] mb-14 hidden md:block" />
              <p className="label label-justify max-w-[210px] text-text md:ml-[8%]">
                Une seule équipe pour tout votre digital, du logo au logiciel
              </p>
              <div className="hidden md:flex gap-8 mt-10 md:ml-[8%]">
                <div className="relative w-px bg-black/[0.12] ml-[30%] shrink-0">
                  <div className="why-progress absolute inset-0 bg-blue origin-top" />
                </div>
                <ol className="flex flex-col gap-2.5">
                  {services.map((s, i) => (
                    <li key={s.title}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        className={`label text-left transition-colors duration-300 ${active === i ? 'text-text' : 'text-black/35 hover:text-black/60'}`}
                      >
                        <span className={`inline-block w-6 ${active === i ? 'text-blue' : ''}`}>{String(i + 1).padStart(2, '0')}</span>
                        {s.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </aside>

          {/* Pile de cartes */}
          <div className="service-stack md:col-span-8 flex flex-col gap-6 md:gap-0">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="service-card sticky top-[calc(72px+var(--i)*12px)] md:top-[calc(104px+var(--i)*12px)] md:mb-[18vh] last:mb-0"
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="card-inner relative h-[clamp(340px,calc(100svh-100px-var(--i)*12px),440px)] md:h-[clamp(360px,calc(100svh-136px-var(--i)*12px),470px)] rounded-[24px] md:rounded-[28px] bg-ink text-white overflow-hidden origin-top will-change-transform">
                  {/* Ovale photo + astérisque */}
                  <div className="absolute left-6 top-6 md:left-9 md:top-9 w-[170px] h-[100px] sm:w-[220px] sm:h-[128px] md:w-[210px] md:h-[124px] lg:w-[280px] lg:h-[164px] rounded-full overflow-hidden bg-white/10">
                    <img src={s.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover grayscale-[0.15]" style={{ objectPosition: s.imagePos }} />
                  </div>
                  <Asterisk className="absolute left-[176px] top-[38px] sm:left-[228px] md:left-[220px] md:top-[50px] lg:left-[292px] lg:top-[62px] w-7 h-7 md:w-9 md:h-9 text-blue" />

                  <h3 className="absolute right-6 top-6 md:right-11 md:top-11 text-[19px] sm:text-[22px] md:text-[27px] tracking-[-0.04em] text-right max-w-[48%] md:max-w-[38%] lg:max-w-[48%] leading-[1.05]">
                    {s.title}
                  </h3>

                  <div className="absolute inset-x-0 top-[58%] h-px bg-white/[0.07]" />

                  <span className="absolute right-[-0.04em] bottom-[-0.2em] display text-blue text-[230px] sm:text-[300px] md:text-[360px] leading-none select-none" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <p className="absolute left-6 bottom-7 md:left-11 md:bottom-11 max-w-[78%] md:max-w-[440px] text-[clamp(20px,2.2vw,31px)] leading-[1.06] tracking-[-0.045em]">
                    {s.body}
                  </p>
                  <div className="card-dim absolute inset-0 bg-black opacity-0 pointer-events-none" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
