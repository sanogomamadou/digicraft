import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Services', id: 'services' },
  { label: 'Réalisations', id: 'realisations' },
  { label: 'Processus', id: 'processus' },
  { label: 'Forfaits', id: 'forfaits' },
  { label: 'Témoignages', id: 'temoignages' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('accueil');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const ids = ['accueil', 'services', 'realisations', 'processus', 'forfaits', 'temoignages', 'contact'];
    const observers: IntersectionObserver[] = [];

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: '-40% 0px -50% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/70 backdrop-blur-xl border-b border-white/[0.07]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-8 lg:px-12 py-4 md:py-5">
        {/* Logo */}
        <a href="#accueil" onClick={e => scrollTo(e, 'accueil')} className="text-xl font-bold tracking-wider">
          <span className="text-[#5eb1ff]">DIGI</span>
          <span className="text-white">CRAFT</span>
        </a>

        {/* Center links — desktop */}
        <div className="hidden lg:flex items-center gap-5 text-[13px] text-gray-400">
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={e => scrollTo(e, link.id)}
              className={`relative pb-0.5 transition-colors duration-200 ${
                activeId === link.id ? 'text-white' : 'hover:text-white'
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#5eb1ff] rounded-full" />
              )}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[13px] text-gray-500 hidden lg:block">+(205) 485-5851</span>

          {/* Theme toggle */}
          <button
            onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200"
            aria-label="Basculer le thème"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Desktop CTA */}
          <a
            href="mailto:mamadousanogo352@gmail.com"
            className="hidden lg:inline-flex items-center bg-[#5eb1ff] text-black text-sm font-medium px-5 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
          >
            Démarrer un projet
          </a>

          {/* Mobile/tablet menu toggle */}
          <button
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.04] border border-white/10 text-white"
            onClick={() => setIsMobileMenuOpen(v => !v)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-5 shadow-2xl">
          {/* Accueil (logo link on desktop, explicit on mobile) */}
          <a
            href="#accueil"
            onClick={e => scrollTo(e, 'accueil')}
            className={`text-lg transition-colors ${activeId === 'accueil' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
          >
            Accueil
          </a>
          {navLinks.map(link => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={e => scrollTo(e, link.id)}
              className={`text-lg transition-colors ${activeId === link.id ? 'text-white font-medium' : 'text-gray-400 hover:text-white'}`}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-5 border-t border-white/10">
            <a
              href="mailto:mamadousanogo352@gmail.com"
              className="bg-[#5eb1ff] text-black px-6 py-3.5 rounded-2xl font-medium text-center block w-full"
            >
              Démarrer un projet
            </a>
            <p className="text-center text-gray-500 text-sm mt-4">+(205) 485-5851</p>
          </div>
        </div>
      )}
    </nav>
  );
}
