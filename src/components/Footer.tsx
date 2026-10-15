import { useRef, useState, type FormEvent } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowCorner, Asterisk, CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL, mailto, prefersReducedMotion, useFitText } from './ui';
import { scrollToId } from './Navbar';

const row1 = [
  { label: 'Services', id: 'services' },
  { label: 'Réalisations', id: 'realisations' },
  { label: 'Processus', id: 'processus' },
  { label: 'Forfaits', id: 'forfaits' },
];
const row2 = [
  { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: CONTACT_PHONE, href: CONTACT_TEL },
  { label: 'Instagram', href: 'https://www.instagram.com/digi_craft.so/', external: true },
  { label: 'TikTok', href: 'https://www.tiktok.com/@digicraft_so?_r=1&_t=ZS-95oRvXLj4Z2', external: true },
];

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const wordRef = useFitText<HTMLDivElement>();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  useGSAP(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo('.footer-letter', { yPercent: 100 }, {
      yPercent: 0, duration: 1.3, stagger: 0.05, ease: 'expo.out',
      scrollTrigger: { trigger: '.footer-word', start: 'top 95%' },
    });
  }, { scope: container });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Entrez une adresse email valide, par exemple nom@entreprise.com');
      return;
    }
    setError('');
    window.location.href = mailto(
      'Demande de devis gratuit',
      `Bonjour DigiCraft,\n\nJe souhaite recevoir un devis gratuit.\nMon email : ${email.trim()}\n\nMon projet en quelques mots :\n`
    );
  };

  return (
    <footer id="contact" data-nav="dark" ref={container} className="relative bg-ink text-white overflow-hidden">
      {/* Anneau en filigrane */}
      <div className="pointer-events-none absolute right-[4%] top-[34%] w-[min(52vw,620px)] aspect-square rounded-full border-[min(9vw,110px)] border-white/[0.022]" aria-hidden="true" />

      <div className="relative px-4 md:px-8 pt-20 md:pt-28">
        <div className="flex items-center justify-between gap-6">
          <h2 className="display text-[clamp(38px,5.4vw,80px)] leading-[0.95] max-w-[14em]">
            Digitalisez avec clarté. Grandissez avec confiance.
          </h2>
          <a href={mailto()} aria-label="Démarrer un projet par email"
            className="group shrink-0 w-[76px] h-[76px] md:w-[100px] md:h-[100px] rounded-full bg-[#f3f3f3] text-blue flex items-center justify-center transition-colors duration-300 hover:bg-blue hover:text-white">
            <Asterisk className="w-[42%] h-[42%] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:rotate-[120deg]" />
          </a>
        </div>

        <nav aria-label="Pied de page" className="mt-12 md:mt-16">
          <div className="border-t border-white/[0.08] py-5 flex flex-wrap justify-between gap-x-8 gap-y-3">
            {row1.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollToId(l.id); }} className="label text-white/55 hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>
          <div className="border-t border-white/[0.08] py-5 flex flex-wrap justify-between gap-x-8 gap-y-3">
            {row2.map(l => (
              <a key={l.label} href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className={`label text-white/55 hover:text-white transition-colors ${l.label.includes('@') ? 'normal-case' : ''}`}>
                {l.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="mt-14 md:mt-24 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-[15px] uppercase tracking-[-0.02em] leading-[1.3] max-w-[22em]">Recevez un devis gratuit sous 24h pour votre projet digital.</p>
            <form onSubmit={submit} noValidate className="mt-6">
              <div className="flex items-center bg-[#f3f3f3] rounded-full h-12 pl-5 pr-1.5 max-w-[400px] outline-2 outline-offset-2 outline-transparent focus-within:outline-blue-soft transition-[outline-color]">
                <label htmlFor="footer-email" className="sr-only">Votre adresse email</label>
                <input
                  id="footer-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); if (error) setError(''); }}
                  placeholder="Votre adresse email"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'footer-email-error' : 'footer-email-hint'}
                  className="flex-1 min-w-0 bg-transparent text-[15px] text-text placeholder:text-muted focus:outline-none"
                />
                <button type="submit" aria-label="Envoyer ma demande de devis" className="w-9 h-9 rounded-full flex items-center justify-center text-ink hover:bg-blue hover:text-white transition-colors">
                  <ArrowCorner className="w-4 h-4" />
                </button>
              </div>
              {error
                ? <p id="footer-email-error" className="label text-[#ff8a8a] mt-3">{error}</p>
                : <p id="footer-email-hint" className="label text-white/45 mt-4 max-w-[400px]">En envoyant votre email, votre messagerie s’ouvre avec une demande de devis prête à partir. Nous répondons sous 24h.</p>}
            </form>
          </div>
          <div className="md:col-span-4 md:col-start-9 flex flex-col justify-between gap-10">
            <div>
              <img src="/logo-dark.webp" alt="DigiCraft — Solutions digitales" width={344} height={78} loading="lazy" className="h-12 w-auto mb-5" />
              <p className="label text-white/85">Conçu à Bamako, pour l’Afrique et au-delà.</p>
            </div>
            <p className="label text-white/45 max-w-[120px]">© {new Date().getFullYear()} DigiCraft. Tous droits réservés.</p>
          </div>
        </div>
      </div>

      {/* Wordmark géant coupé */}
      <div className="footer-word relative border-t border-white/[0.08] px-4 md:px-8 pt-4 md:pt-6 h-[13vw] min-h-[60px] overflow-hidden">
        <div ref={wordRef} className="wordmark text-blue select-none w-max" aria-hidden="true" style={{ fontSize: '19vw' }}>
          {'DIGICRAFT'.split('').map((l, i) => (
            <span key={i} className="inline-block overflow-hidden align-top">
              <span className="footer-letter inline-block">{l}</span>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
