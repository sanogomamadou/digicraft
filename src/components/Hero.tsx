import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Asterisk, CircleArrow, mailto, prefersReducedMotion, useFitText } from './ui';
import Avatar from './Avatar';
import { testimonials } from '../content';

const WORD = 'DIGICRAFT';

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const wordRef = useFitText<HTMLDivElement>();

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    const mobile = window.innerWidth < 768;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // y: 0 explicite : écrase le décalage CSS posé avant l'hydratation (sinon GSAP le conserve)
    tl.fromTo('.hero-letter', { yPercent: 105, y: 0 }, { yPercent: 0, y: 0, duration: mobile ? 0.9 : 1.25, stagger: 0.045 })
      .fromTo('.hero-person',
        { y: mobile ? 30 : 70, opacity: 0, filter: 'blur(14px)' },
        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.4, clearProps: 'filter' }, 0.25)
      .fromTo('.hero-label', { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 }, 0.55)
      .fromTo('.hero-line', { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.1, stagger: 0.09 }, 0.6)
      .fromTo('.hero-proof', { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 0.9)
      .fromTo('.hero-cta', { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 1.1, ease: 'back.out(1.6)' }, 0.85);

    if (!mobile) {
      gsap.to('.hero-word', {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: { trigger: container.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-person-wrap', {
        yPercent: 10,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: { trigger: container.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }
  }, { scope: container });

  // Effet « inversé » du titre, sans mix-blend-mode (que Safari abandonne dès qu'un élément
  // est animé). Les lettres sont remplies avec une image pré-calculée du duo aux couleurs
  // inversées (hero-inverse.webp), recalée chaque frame sous la vraie photo : sombre sur le
  // fond et le blazer, clair sur le pantalon. Desktop uniquement (sur mobile, le titre est
  // sous le duo) : l'image n'est pas téléchargée sur téléphone.
  useEffect(() => {
    const root = container.current;
    if (!root) return;
    const lines = Array.from(root.querySelectorAll<HTMLElement>('.hero-invert'));
    const person = root.querySelector<HTMLImageElement>('.hero-person');
    if (!lines.length || !person) return;

    let ready = false;
    let started = false;
    const align = () => {
      const on = ready && window.innerWidth >= 768 && window.scrollY < window.innerHeight * 1.2;
      if (!on) {
        if (window.innerWidth < 768) lines.forEach(l => l.classList.remove('is-on'));
        return;
      }
      const pr = person.getBoundingClientRect();
      for (const l of lines) {
        const er = l.getBoundingClientRect();
        l.style.backgroundSize = `${pr.width}px ${pr.height}px, 100% 100%`;
        l.style.backgroundPosition = `${pr.left - er.left}px ${pr.top - er.top}px, 0 0`;
        l.classList.add('is-on');
      }
    };
    const start = () => {
      if (started || window.innerWidth < 768) return;
      started = true;
      const img = new Image();
      img.onload = () => { ready = true; align(); };
      img.src = '/hero/hero-inverse.webp';
      gsap.ticker.add(align);
    };
    start();
    window.addEventListener('resize', start);
    return () => {
      window.removeEventListener('resize', start);
      gsap.ticker.remove(align);
    };
  }, []);

  return (
    <section
      id="accueil"
      data-nav="light"
      ref={container}
      className="relative isolate min-h-[640px] h-[100svh] md:min-h-[760px] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #a3a8ad 0%, #b3b7bb 34%, #cfd2d5 62%, #e7e8e9 84%, #efefef 100%)' }}
    >
      {/* Wordmark */}
      <div className="relative px-4 md:px-8 pt-16 md:pt-[72px]">
        <div className="hero-word">
          <div ref={wordRef} className="wordmark text-blue select-none w-max" aria-hidden="true" style={{ fontSize: '19vw' }}>
            {WORD.split('').map((l, i) => (
              <span key={i} className="inline-block overflow-hidden align-top pb-[0.02em]">
                <span className="hero-letter inline-block will-change-transform">{l}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Filet + labels */}
        <div className="mt-2 md:mt-3 border-t border-black/[0.12] pt-3 hidden sm:flex justify-between gap-6 text-text">
          <div className="flex gap-6 md:gap-14">
            <p className="hero-label label">Sites web & e-commerce</p>
            <p className="hero-label label hidden sm:block">Logiciels SaaS</p>
          </div>
          <p className="hero-label label text-right">Agents IA & automatisation</p>
        </div>
      </div>

      {/* Personnage détouré, devant le wordmark */}
      <div className="hero-person-wrap absolute left-1/2 -translate-x-1/2 md:-translate-x-[46%] top-[92px] sm:top-[110px] md:top-[13vw] lg:top-[150px] h-[66%] sm:h-[calc(100%-110px)] aspect-[4/5] pointer-events-none">
        <img
          src="/hero/hero.webp"
          alt="Deux jeunes entrepreneurs maliens en blazer, laptop et tablette à la main"
          width={1122}
          height={1402}
          fetchPriority="high"
          decoding="async"
          className="hero-person w-full h-full object-contain object-top [mask-image:linear-gradient(to_bottom,black_62%,transparent_96%)]"
        />
      </div>

      {/* Labels flottants */}
      <p className="hero-label label absolute left-[19%] top-[52%] text-text hidden md:block">Design & branding</p>
      <p className="hero-label label absolute right-[6%] top-[51%] text-text hidden md:block max-w-[100px]">Data & tableaux de bord</p>

      {/* Fondu vers le papier */}
      <div className="absolute inset-x-0 bottom-0 h-[28%] pointer-events-none bg-gradient-to-b from-transparent to-paper" />

      {/* Titre : la 1re ligne s'inverse sur le duo (voir l'effet ci-dessus) */}
      <div className="absolute left-4 md:left-8 right-4 md:right-auto bottom-[112px] md:bottom-[124px]">
        <h1 className="display text-[clamp(36px,7.1vw,104px)] whitespace-nowrap leading-[0.9]">
          <span className="sr-only">DigiCraft, agence digitale au Mali : sites web, logiciels SaaS, IA et automatisation. </span>
          <span className="reveal-mask">
            <span className="hero-line hero-invert inline-block">Vendez plus. Gérez</span>
            <span className="hero-line inline-block align-top ml-[0.12em] mt-[0.06em]">
              <Asterisk className="block w-[0.32em] h-[0.32em] text-blue" />
            </span>
          </span>
          <span className="reveal-mask">
            <span className="hero-line block text-ghost">mieux.</span>
          </span>
        </h1>
      </div>

      {/* Preuve + CTA */}
      <div className="absolute inset-x-4 md:inset-x-8 bottom-6 md:bottom-9 flex items-end justify-between gap-4">
        <div className="hero-proof flex items-center gap-4">
          <div className="flex -space-x-3">
            {testimonials.slice(0, 3).map(t => (
              <span key={t.name} className="block w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-paper">
                <Avatar spec={t.avatar} className="w-full h-full" />
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="display text-[34px] md:text-[44px] leading-none text-text">30<span className="text-blue">+</span></span>
            <span className="label text-muted max-w-[160px] hidden sm:block">projets livrés pour des PME au Mali et en Afrique de l’Ouest</span>
          </div>
        </div>
        <CircleArrow
          href={mailto()}
          label="Démarrer un projet"
          tone="white"
          className="hero-cta w-[84px] h-[84px] md:w-[140px] md:h-[140px] shadow-[0_10px_30px_-12px_rgba(20,30,50,0.25)]"
          iconClassName="w-[26%] h-[26%]"
        />
      </div>
    </section>
  );
}
