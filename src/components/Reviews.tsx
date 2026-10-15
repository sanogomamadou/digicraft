import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { testimonials } from '../content';
import { ArrowCorner, Asterisk, SectionMeta, prefersReducedMotion } from './ui';
import Avatar from './Avatar';

export default function Reviews() {
  const container = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo('.reviews-line', { yPercent: 105 }, {
      yPercent: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out',
      scrollTrigger: { trigger: '.reviews-title', start: 'top 80%' },
    });
  }, { scope: container });

  // Index courant d'après le scroll horizontal
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(el.children) as HTMLElement[];
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      cards.forEach((c, i) => {
        if (Math.abs(c.offsetLeft + c.offsetWidth / 2 - center) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - center)) best = i;
      });
      setIndex(best);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const go = (dir: number) => {
    const el = track.current;
    if (!el) return;
    const next = Math.max(0, Math.min(testimonials.length - 1, index + dir));
    const card = el.children[next] as HTMLElement;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section id="temoignages" data-nav="dark" ref={container} className="relative bg-ink text-white overflow-hidden pt-14 md:pt-20 pb-20 md:pb-28">
      {/* Anneaux en filigrane */}
      <div className="pointer-events-none absolute left-[42%] top-[-10%] w-[64vw] aspect-square rounded-full bg-white/[0.018]" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-22%] top-[-6%] w-[46vw] aspect-square rounded-full bg-white/[0.018]" aria-hidden="true" />

      <div className="relative mx-4 md:mx-8 h-px bg-white/[0.08] mb-10 md:mb-12" />
      <SectionMeta dark className="relative px-4 md:px-8" left="Ils nous ont confié leur digital" right="Témoignages" />

      {/* Titre géant */}
      <div className="reviews-title relative px-4 md:px-8 mt-14 md:mt-20">
        <h2 className="display uppercase text-[clamp(76px,13.4vw,200px)] leading-[0.84] tracking-[-0.055em]">
          <span className="reveal-mask"><span className="reviews-line block pl-[9%]">Avis</span></span>
          <span className="reveal-mask"><span className="reviews-line block">Clients</span></span>
        </h2>

        <div className="absolute right-4 md:right-8 top-[2%] md:top-[6%] flex items-center gap-4 md:gap-10 left-[48%] justify-between">
          <div className="flex -space-x-3">
            {testimonials.slice(0, 3).map(t => (
              <span key={t.name} className="block w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-ink">
                <Avatar spec={t.avatar} className="w-full h-full" />
              </span>
            ))}
          </div>
          <span className="hidden md:block text-blue-soft text-[44px] font-light leading-none">+</span>
          <span className="hidden sm:block text-[70px] md:text-[96px] font-light leading-none tracking-[-0.1em] text-white/90">//</span>
        </div>

        <p className="label text-white/80 md:ml-[48%] max-w-[360px] mt-6 md:mt-8 [word-spacing:0.35em]">
          Des dirigeants de PME qui ont confié leur site, leur logiciel ou leur image à DigiCraft.
        </p>
      </div>

      {/* Carrousel */}
      <div
        ref={track}
        className="no-scrollbar relative mt-16 md:mt-24 flex gap-5 md:gap-8 overflow-x-auto snap-x snap-mandatory px-4 md:px-[calc(50vw-390px)] pb-2"
        tabIndex={0}
        aria-label="Témoignages clients, faites défiler horizontalement"
      >
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            className="relative snap-center shrink-0 w-[88vw] sm:w-[640px] md:w-[780px] h-[440px] md:h-[460px] rounded-[24px] md:rounded-[28px] bg-ink-2 border border-white/[0.06] overflow-hidden"
          >
            {/* Médaillon coupé par le bord */}
            <div className="absolute left-6 md:left-10 -top-[62px] md:-top-[80px] w-[210px] h-[210px] md:w-[270px] md:h-[270px] rounded-full overflow-hidden bg-[#e9e9e9]">
              <Avatar spec={t.avatar} framing="low" className="w-full h-full" title={`Avatar de ${t.name}`} />
            </div>
            <Asterisk className="absolute left-[210px] md:left-[276px] top-[96px] md:top-[120px] w-7 h-7 md:w-9 md:h-9 text-blue" />

            <figcaption className="absolute right-6 top-6 md:right-10 md:top-9 text-right">
              <p className="text-[22px] md:text-[27px] tracking-[-0.04em] leading-tight">{t.name}</p>
              <p className="text-[16px] md:text-[20px] tracking-[-0.04em] text-white/40 leading-tight">{t.role}</p>
            </figcaption>

            <div className="absolute inset-x-0 top-[46%] h-px bg-white/[0.07]" />

            <span className="absolute right-[-0.04em] bottom-[-0.22em] display text-blue text-[220px] sm:text-[280px] md:text-[340px] leading-none select-none" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>

            <blockquote className="absolute left-6 md:left-10 bottom-7 md:bottom-10 max-w-[80%] md:max-w-[480px] text-[21px] sm:text-[24px] md:text-[29px] leading-[1.08] tracking-[-0.045em]">
              « {t.text} »
            </blockquote>
          </figure>
        ))}
      </div>

      {/* Contrôles */}
      <div className="relative px-4 md:px-8 mt-8 flex items-center justify-between">
        <p className="label text-white/50 tabular-nums">{String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => go(-1)} disabled={index === 0} aria-label="Témoignage précédent"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f3f3f3] text-blue flex items-center justify-center transition-colors hover:bg-blue hover:text-white disabled:opacity-30 disabled:pointer-events-none">
            <ArrowCorner className="w-5 h-5 -scale-x-100" />
          </button>
          <button type="button" onClick={() => go(1)} disabled={index === testimonials.length - 1} aria-label="Témoignage suivant"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#f3f3f3] text-blue flex items-center justify-center transition-colors hover:bg-blue hover:text-white disabled:opacity-30 disabled:pointer-events-none">
            <ArrowCorner className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
