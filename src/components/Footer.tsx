import { Instagram, Mail, Phone } from 'lucide-react';

const links = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#realisations' },
  { label: 'Contact', href: 'mailto:mamadousanogo352@gmail.com' },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-black pt-20 pb-0 overflow-hidden border-t border-white/[0.07]">

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 footer-glow" />
        <div className="absolute inset-0 footer-mask" />
      </div>

      <div className="relative z-10 container mx-auto px-5 md:px-8 max-w-5xl">

        {/* CTA block */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium mb-5 leading-tight">
            Prêt à façonner l'avenir<br className="hidden sm:block" /> avec DigiCraft ?
          </h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-[15px]">
            Toutes les solutions digitales dont votre entreprise a besoin pour réussir.
          </p>
          <a
            href="mailto:mamadousanogo352@gmail.com"
            className="inline-flex items-center gap-2 bg-[#5eb1ff] text-black px-8 py-4 rounded-full font-medium hover:bg-white transition-colors duration-200"
          >
            Commencer maintenant
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.07] mb-10" />

        {/* Footer meta row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10">

          {/* Brand */}
          <div>
            <div className="text-xl font-bold tracking-wider mb-2">
              <span className="text-[#5eb1ff]">DIGI</span>
              <span className="text-white">CRAFT</span>
            </div>
            <p className="text-[12px] text-gray-600">Agence digitale · Bamako, Mali</p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {links.map(l => (
              <a key={l.label} href={l.href} className="text-sm text-gray-500 hover:text-white transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>

          {/* Contact + socials */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+2055485851"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label="Appeler"
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
            <a
              href="mailto:mamadousanogo352@gmail.com"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-white/20 transition-all duration-200"
              aria-label="TikTok"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.49-2.5 6.04-1.68 1.63-4 2.5-6.36 2.37-2.61-.13-5.04-1.47-6.57-3.56-1.47-2.02-1.92-4.63-1.31-6.99.5-1.93 1.83-3.66 3.52-4.65 1.76-1.03 3.86-1.34 5.86-.98v4.22c-1.46-.35-3.08-.22-4.32.61-1.07.72-1.74 1.95-1.78 3.25-.04 1.34.56 2.67 1.56 3.52 1.05.89 2.52 1.22 3.87.97 1.65-.3 3.01-1.6 3.39-3.23.16-.67.24-1.37.24-2.07V.02z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pb-6 text-center text-[12px] text-gray-700">
          © 2026 DigiCraft. Tous droits réservés.
        </div>
      </div>

      {/* Large background wordmark */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none flex justify-center opacity-[0.04] -mt-4 relative z-0">
        <span className="text-[22vw] font-black tracking-tighter text-white whitespace-nowrap translate-y-[15%]">
          DIGICRAFT
        </span>
      </div>
    </footer>
  );
}
