import { useEffect, useState } from 'react';
import { PillCta, mailto, CONTACT_PHONE, CONTACT_TEL, Asterisk } from './ui';

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Réalisations', id: 'realisations' },
  { label: 'Avis', id: 'temoignages' },
  { label: 'Processus', id: 'processus' },
  { label: 'Forfaits', id: 'forfaits' },
  { label: 'Contact', id: 'contact' },
];

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false);
  const [activeId, setActiveId] = useState('accueil');

  // Fond + masquage : cachée pendant le défilement, de retour à l'arrêt.
  // Lenis émet un événement par frame avec de petits deltas : on compare donc
  // à la position du début du geste, jamais à la frame précédente.
  useEffect(() => {
    let anchor: number | null = null;
    let idle: ReturnType<typeof setTimeout> | undefined;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y < 120) {
        setHidden(false);
        anchor = null;
        clearTimeout(idle);
        return;
      }
      if (anchor === null) anchor = y;
      if (Math.abs(y - anchor) > 12) setHidden(true);
      clearTimeout(idle);
      idle = setTimeout(() => { setHidden(false); anchor = null; }, 250);
    };
    setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(idle); };
  }, []);

  // Thème selon la section sous la barre + section active
  useEffect(() => {
    const themeObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setDark((e.target as HTMLElement).dataset.nav === 'dark'); }),
      { rootMargin: '0px 0px -94% 0px' }
    );
    const activeObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting && e.target.id) setActiveId(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    const seen = new WeakSet<Element>();
    const observeAll = () => {
      document.querySelectorAll<HTMLElement>('[data-nav]').forEach(s => {
        if (seen.has(s)) return;
        seen.add(s);
        themeObs.observe(s);
        activeObs.observe(s);
      });
    };
    observeAll();
    // Les sections arrivent en lazy : on observe celles qui apparaissent ensuite
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { themeObs.disconnect(); activeObs.disconnect(); mo.disconnect(); };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }, [open]);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  const fg = dark ? 'text-white' : 'text-text';
  const bar = scrolled
    ? dark ? 'bg-ink border-white/[0.08]' : 'bg-paper border-black/[0.08]'
    : 'bg-transparent border-transparent';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 border-b transition-[transform,background-color,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${bar} ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="flex items-center justify-between gap-6 px-4 md:px-8 h-14 md:h-16">
          <a href="#accueil" onClick={e => go(e, 'accueil')} className="relative block shrink-0 h-8 md:h-9" aria-label="DigiCraft — accueil">
            {/* Deux versions du logo superposées : on fond de l'une à l'autre selon le fond */}
            <img src="/logo-light.webp" alt="DigiCraft" width={344} height={78}
              className={`h-full w-auto transition-opacity duration-300 ${dark || open ? 'opacity-0' : 'opacity-100'}`} />
            <img src="/logo-dark.webp" alt="" aria-hidden="true" width={344} height={78}
              className={`absolute inset-0 h-full w-auto transition-opacity duration-300 ${dark || open ? 'opacity-100' : 'opacity-0'}`} />
          </a>

          <nav className={`hidden lg:flex items-center gap-7 ${fg}`} aria-label="Navigation principale">
            {navLinks.map(l => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={e => go(e, l.id)}
                className={`label relative py-1 transition-opacity duration-200 ${activeId === l.id ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              >
                {l.label}
                <span className={`absolute left-0 right-0 -bottom-0.5 h-px bg-current origin-left transition-transform duration-500 ${activeId === l.id ? 'scale-x-100' : 'scale-x-0'}`} />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a href={CONTACT_TEL} className={`label hidden xl:inline opacity-70 hover:opacity-100 ${fg}`}>{CONTACT_PHONE}</a>
            <span className="hidden sm:block"><PillCta href={mailto()} size="sm">Démarrer un projet</PillCta></span>
            <button
              type="button"
              onClick={() => setOpen(v => !v)}
              className={`lg:hidden h-10 px-4 rounded-full label border transition-colors ${dark || open ? 'border-white/25 text-white' : 'border-black/15 text-text'}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? 'Fermer' : 'Menu'}
            </button>
          </div>
        </div>
      </header>

      {/* Menu plein écran (mobile / tablette) */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-ink text-white flex flex-col justify-between px-4 pt-24 pb-8 transition-[clip-path] duration-700 ease-[cubic-bezier(.76,0,.24,1)] lg:hidden ${open ? '[clip-path:inset(0_0_0_0)]' : '[clip-path:inset(0_0_100%_0)] pointer-events-none'}`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col" aria-label="Navigation mobile">
          {[{ label: 'Accueil', id: 'accueil' }, ...navLinks].map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={e => go(e, l.id)}
              tabIndex={open ? 0 : -1}
              className="flex items-baseline justify-between border-b border-white/[0.08] py-3"
            >
              <span className="display text-[44px] sm:text-[56px]">{l.label}</span>
              <span className="label text-blue-soft">{String(i).padStart(2, '0')}</span>
            </a>
          ))}
        </nav>
        <div className="flex items-end justify-between gap-4 pt-8">
          <div>
            <a href={CONTACT_TEL} tabIndex={open ? 0 : -1} className="label block text-white/70 mb-4">{CONTACT_PHONE}</a>
            <PillCta href={mailto()} size="sm">Démarrer un projet</PillCta>
          </div>
          <Asterisk className="w-14 h-14 text-blue" />
        </div>
      </div>
    </>
  );
}
