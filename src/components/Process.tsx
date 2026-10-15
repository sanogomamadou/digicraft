import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { steps } from '../content';
import { SectionMeta, prefersReducedMotion } from './ui';

export default function Process() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.utils.toArray<HTMLElement>('.step-row').forEach(row => {
      gsap.fromTo(row.querySelector('.step-num'), { yPercent: 100 }, {
        yPercent: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: row, start: 'top 82%' },
      });
      gsap.fromTo(row.querySelectorAll('.step-text'), { y: 24, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'expo.out',
        scrollTrigger: { trigger: row, start: 'top 82%' },
      });
    });
  }, { scope: container });

  return (
    <section id="processus" data-nav="light" ref={container} className="bg-paper pt-16 md:pt-24 pb-16 md:pb-24">
      <SectionMeta className="px-4 md:px-8" left="De l’idée au lancement, sans jargon technique." right="Processus" />

      <h2 className="px-4 md:px-8 mt-12 md:mt-16 display text-[clamp(40px,6vw,92px)] leading-[0.92] max-w-[11em]">
        Trois étapes. <span className="text-ghost">Un seul interlocuteur.</span>
      </h2>

      <ol className="mt-14 md:mt-20">
        {steps.map((s, i) => (
          <li key={s.title} className="step-row mx-4 md:mx-8 border-t border-black/[0.1] py-8 md:py-10 grid grid-cols-12 gap-x-4 md:gap-x-8 gap-y-4 items-start">
            <div className="col-span-3 md:col-span-2 overflow-hidden">
              <span className="step-num block display text-blue text-[64px] md:text-[120px] leading-[0.8] tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <h3 className="step-text col-span-9 md:col-span-5 display text-[30px] md:text-[48px] leading-[0.95] tracking-[-0.045em] pt-1">{s.title}</h3>
            <p className="step-text col-span-12 md:col-span-4 md:col-start-9 text-[16px] leading-[1.5] text-muted max-w-[42ch] pt-2">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
