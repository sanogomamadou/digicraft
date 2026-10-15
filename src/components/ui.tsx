import { useLayoutEffect, useRef, type ReactNode, type CSSProperties } from 'react';

export const CONTACT_EMAIL = 'contact@digicraftso.com';
export const CONTACT_PHONE = '+223 66 69 99 99';
export const CONTACT_TEL = 'tel:+22366699999';
export const mailto = (subject = 'Nouveau projet avec DigiCraft', body = '') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Astérisque à six branches, la signature graphique. */
export function Asterisk({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true" fill="currentColor">
      {[0, 60, 120].map(r => (
        <rect key={r} x="41" y="4" width="18" height="92" rx="3" transform={`rotate(${r} 50 50)`} />
      ))}
    </svg>
  );
}

/** Flèche coudée ↱ au trait fin. */
export function ArrowCorner({ className = '', strokeWidth = 1.6 }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square">
      <path d="M6 20V9h12" />
      <path d="M14 5l4 4-4 4" />
    </svg>
  );
}

type CircleProps = {
  href?: string;
  onClick?: () => void;
  label: string;
  tone?: 'white' | 'blue' | 'ink';
  className?: string;
  iconClassName?: string;
  external?: boolean;
  children?: ReactNode;
};

/** Bouton rond avec flèche ↱ (blanc / bleu / encre). */
export function CircleArrow({ href, onClick, label, tone = 'white', className = '', iconClassName = 'w-[30%] h-[30%]', external, children }: CircleProps) {
  const tones = {
    white: 'bg-[#f3f3f3] text-blue hover:bg-blue hover:text-white',
    blue: 'bg-blue text-white hover:bg-ink',
    ink: 'bg-ink text-white hover:bg-blue',
  }[tone];
  const cls = `group/circle relative inline-flex items-center justify-center rounded-full shrink-0 transition-colors duration-300 ${tones} ${className}`;
  const inner = children ?? (
    <ArrowCorner className={`${iconClassName} transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover/circle:-translate-y-[6%] group-hover/circle:translate-x-[6%]`} />
  );
  if (href) {
    return (
      <a href={href} aria-label={label} className={cls} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-label={label} className={cls}>
      {inner}
    </button>
  );
}

/** Pilule encre + rond bleu fléché accolé. */
export function PillCta({ href, children, size = 'md', className = '', external }: { href: string; children: ReactNode; size?: 'sm' | 'md' | 'xl'; className?: string; external?: boolean }) {
  const s = {
    sm: { pill: 'h-10 pl-5 pr-7 text-[13px]', circle: 'w-10 h-10 -ml-3' },
    md: { pill: 'h-14 pl-7 pr-9 text-[16px]', circle: 'w-14 h-14 -ml-4' },
    xl: { pill: 'h-[76px] md:h-[100px] pl-8 md:pl-10 pr-10 md:pr-14 text-[26px] md:text-[40px]', circle: 'w-[76px] h-[76px] md:w-[106px] md:h-[106px] -ml-5' },
  }[size];
  return (
    <a
      href={href}
      className={`group inline-flex items-center shrink-0 ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={`inline-flex items-center rounded-full bg-ink text-white font-medium tracking-[-0.04em] whitespace-nowrap transition-colors duration-300 group-hover:bg-blue ${s.pill}`}>
        {children}
      </span>
      <span className={`relative inline-flex items-center justify-center rounded-full bg-blue text-white transition-colors duration-300 group-hover:bg-ink ${s.circle}`}>
        <ArrowCorner className="w-[30%] h-[30%] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-[8%] group-hover:translate-x-[8%]" />
      </span>
    </a>
  );
}

/** Ajuste la taille de police pour que le texte remplisse exactement la largeur du parent. */
export function useFitText<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || !el.parentElement) return;
    const parent = el.parentElement;
    const fit = () => {
      const target = parent.clientWidth;
      if (Math.abs(el.scrollWidth - target) <= 1) return; // déjà ajusté (évite les boucles)
      el.style.transition = 'none'; // une transition sur font-size fausserait la mesure
      el.style.fontSize = '100px';
      const w = el.scrollWidth;
      if (w > 0) el.style.fontSize = `${(100 * target) / w}px`;
    };
    fit();
    // On observe aussi le texte : quand la police Archivo arrive (chargée en asynchrone),
    // sa largeur change et on réajuste. fonts.ready seul ne suffit pas : il peut se
    // résoudre avant même que le chargement de la police ait commencé.
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    document.fonts?.addEventListener?.('loadingdone', fit);
    return () => {
      ro.disconnect();
      document.fonts?.removeEventListener?.('loadingdone', fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Petit titre de section (label bleu à droite / texte à gauche). */
export function SectionMeta({ left, right, dark = false, className = '' }: { left: ReactNode; right: ReactNode; dark?: boolean; className?: string }) {
  return (
    <div className={`flex items-start justify-between gap-6 ${className}`}>
      <p className={`label label-justify max-w-[230px] ${dark ? 'text-white/85' : 'text-text'}`}>{left}</p>
      <p className={`label text-right ${dark ? 'text-blue-soft' : 'text-blue'}`}>{right}</p>
    </div>
  );
}
