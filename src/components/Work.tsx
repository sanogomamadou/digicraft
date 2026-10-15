import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '../content';
import { ArrowCorner, Asterisk, SectionMeta } from './ui';

const ROW = 118; // hauteur d'une ligne de la liste (desktop)

/** Visuel du workflow n8n (pas de capture : on dessine le flux). */
function WorkflowVisual() {
  const nodes = [
    { x: 8, y: 22, t: 'LinkedIn', s: 'Collecte' },
    { x: 8, y: 62, t: 'Formulaire', s: 'Collecte' },
    { x: 38, y: 42, t: 'Enrichir', s: 'Données' },
    { x: 66, y: 22, t: 'Score IA', s: 'Qualification' },
    { x: 66, y: 62, t: 'Gmail', s: 'Relance auto' },
  ];
  return (
    <div className="relative w-full h-full bg-[#f4f4f4] [background-image:radial-gradient(#cfcfcf_1px,transparent_1px)] [background-size:16px_16px]">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {[[26, 28, 38, 48], [26, 68, 38, 48], [56, 48, 66, 28], [56, 48, 66, 68]].map(([x1, y1, x2, y2], i) => (
          <path key={i} d={`M${x1} ${y1} C ${x1 + 7} ${y1}, ${x2 - 7} ${y2}, ${x2} ${y2}`} fill="none" stroke="#086eba" strokeWidth="0.6" vectorEffect="non-scaling-stroke" strokeDasharray="3 3" />
        ))}
      </svg>
      {nodes.map(n => (
        <div key={n.t} className="absolute w-[26%] -translate-y-1/2 rounded-xl bg-white border border-black/10 shadow-[0_6px_16px_-10px_rgba(0,0,0,0.3)] px-3 py-2.5" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue" />
            <span className="text-[12px] font-medium tracking-[-0.03em] text-text">{n.t}</span>
          </div>
          <span className="label text-[9px] text-muted">{n.s}</span>
        </div>
      ))}
    </div>
  );
}

function ProjectVisual({ p, className = '' }: { p: Project; className?: string }) {
  return p.image
    ? <img src={p.image} alt={`Aperçu du site ${p.name}`} loading="lazy" decoding="async" className={`w-full h-full object-cover object-left-top ${className}`} />
    : <WorkflowVisual />;
}

function ProjectLink({ p, light = false }: { p: Project; light?: boolean }) {
  if (!p.url) return <span className={`label ${light ? 'text-white/50' : 'text-muted'}`}>Projet client · confidentiel</span>;
  return (
    <a href={p.url} target="_blank" rel="noopener noreferrer" className={`label inline-flex items-center gap-1.5 border-b pb-0.5 transition-colors ${light ? 'border-white/40 text-white hover:text-blue-soft' : 'border-text text-text hover:text-blue hover:border-blue'}`}>
      Voir le projet en ligne <ArrowCorner className="w-3.5 h-3.5" />
    </a>
  );
}

export default function Work() {
  const container = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = projects.length;

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1024px)', () => {
      const st = ScrollTrigger.create({
        trigger: stage.current,
        start: 'top top',
        end: () => `+=${(n - 1) * window.innerHeight * 0.6}`,
        pin: true,
        anticipatePin: 1,
        onUpdate: self => setActive(Math.min(n - 1, Math.floor(self.progress * n * 0.999))),
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, { scope: container });

  const p = projects[active];

  return (
    <section id="realisations" data-nav="light" ref={container} className="relative bg-paper" aria-labelledby="realisations-title">
      <h2 id="realisations-title" className="sr-only">Nos réalisations : ClinixPro, eDjago, OG Shop, H2 Design, TAT Mali et Lead Engine</h2>
      <SectionMeta
        className="px-4 md:px-8 pt-14 md:pt-20"
        left="Des projets réels, en ligne, utilisés chaque jour."
        right="Nos réalisations"
      />

      {/* ---------- Desktop : scène épinglée ---------- */}
      <div ref={stage} className="hidden lg:block relative h-[100svh] overflow-hidden">
        {/* Liste des noms en gris flou */}
        <div className="absolute inset-x-0 top-1/2" aria-hidden="true">
          <ul
            className="transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ transform: `translateY(${-active * ROW - ROW / 2}px)` }}
          >
            {projects.map((proj, i) => {
              const d = Math.abs(i - active);
              return (
                <li
                  key={proj.name}
                  className="flex items-center justify-center pr-[22%] display text-[88px] text-[#bdbdbd] transition-[opacity,filter] duration-700"
                  style={{ height: ROW, opacity: d === 0 ? 0 : Math.max(0, 0.9 - d * 0.28), filter: `blur(${d === 0 ? 0 : 1.5 + d * 1.5}px)` }}
                >
                  {proj.name}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Bande encre active */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[104px] bg-ink text-white">
          <div className="relative h-full flex items-center px-8">
            <span className="display text-[72px] w-[22%] tabular-nums">{String(active + 1).padStart(2, '0')}</span>
            <div className="relative h-full flex-1 pr-[22%] flex items-center justify-center overflow-hidden">
              <h3 key={p.name} className="display text-[88px] whitespace-nowrap animate-[bandIn_.8s_cubic-bezier(.16,1,.3,1)]">
                {p.name}
                <Asterisk className="inline-block align-top w-[0.32em] h-[0.32em] ml-[0.1em] text-blue" />
              </h3>
            </div>
          </div>
        </div>

        {/* Description sous la bande */}
        <div key={`d-${p.name}`} className="absolute left-8 top-[calc(50%+92px)] max-w-[250px] animate-[navIn_.7s_cubic-bezier(.16,1,.3,1)]">
          <p className="label text-blue mb-3">{p.kind}{p.owned ? ' · Produit DigiCraft' : ''}</p>
          <p className="label label-justify text-text mb-5">{p.body}</p>
          <ProjectLink p={p} />
        </div>

        {/* Carte image à droite */}
        <div className="absolute right-8 top-[calc(50%-190px)] w-[min(30vw,400px)] aspect-square rounded-[22px] overflow-hidden bg-ink shadow-[0_30px_60px_-30px_rgba(10,20,40,0.45)]">
          {projects.map((proj, i) => (
            <div
              key={proj.name}
              className="absolute inset-0 transition-[clip-path] duration-[1000ms] ease-[cubic-bezier(.76,0,.24,1)]"
              style={{ clipPath: i === active ? 'inset(0 0 0 0)' : i < active ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)' }}
            >
              <ProjectVisual p={proj} />
            </div>
          ))}
          <span key={`t-${p.name}`} className="absolute left-5 -top-[0.2em] display text-[124px] text-white mix-blend-difference leading-none pointer-events-none animate-[navIn_.8s_cubic-bezier(.16,1,.3,1)]">
            {p.tag}
          </span>
        </div>

        {/* Compteur */}
        <p className="absolute left-8 bottom-8 label text-muted tabular-nums">
          {String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
        </p>
      </div>

      {/* ---------- Mobile / tablette : liste ---------- */}
      <div className="lg:hidden pt-10 pb-6 flex flex-col gap-14">
        {projects.map((proj, i) => (
          <article key={proj.name}>
            <div className="bg-ink text-white h-[76px] sm:h-[92px] flex items-center px-4 sm:px-8 gap-6">
              <span className="display text-[40px] sm:text-[52px] tabular-nums w-14 sm:w-20">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="display text-[44px] sm:text-[60px] whitespace-nowrap">
                {proj.name}<Asterisk className="inline-block align-top w-[0.3em] h-[0.3em] ml-[0.1em] text-blue" />
              </h3>
            </div>
            <div className="px-4 sm:px-8 mt-5 grid sm:grid-cols-2 gap-5 sm:gap-8 items-start">
              <div className="relative aspect-[4/3] rounded-[20px] overflow-hidden bg-ink">
                <ProjectVisual p={proj} />
                <span className="absolute left-4 -top-[0.18em] display text-[80px] text-white mix-blend-difference leading-none">{proj.tag}</span>
              </div>
              <div>
                <p className="label text-blue mb-3">{proj.kind}{proj.owned ? ' · Produit DigiCraft' : ''}</p>
                <p className="label label-justify text-text mb-5 max-w-[340px]">{proj.body}</p>
                <ProjectLink p={proj} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
