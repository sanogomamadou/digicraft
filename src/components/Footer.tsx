import { Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-black pt-24 overflow-hidden border-t border-white/10 flex flex-col">
      
      {/* Colorful background effect */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 footer-glow"></div>
        <div className="absolute inset-0 footer-mask"></div>
      </div>

      {/* CTA Box & Footer Content - Made wider and closer to edges */}
      <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-[1600px] relative z-10">
        <div className="bg-white/5 border border-white/20 rounded-[2.5rem] px-8 md:px-16 py-6 md:py-8 flex flex-col items-center justify-center text-center backdrop-blur-xl shadow-2xl">
          <div className="mb-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4">Prêt à façonner l'avenir<br className="hidden sm:block" />avec DigiCraft ?</h2>
            <p className="text-gray-400 text-base sm:text-lg">Toutes les solutions digitales dont votre entreprise a besoin pour réussir.</p>
          </div>
          
          <a href="mailto:mamadousanogo352@gmail.com" className="bg-[#5eb1ff] text-black px-8 py-4 rounded-full font-medium hover:bg-[#4a90e2] transition-colors whitespace-nowrap shrink-0 mb-8 w-full sm:w-auto inline-block text-center">
            Commencer maintenant
          </a>

          {/* Main Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-300 mb-8">
            <a href="#accueil" className="hover:text-white transition-colors">Accueil</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#realisations" className="hover:text-white transition-colors">Réalisations</a>
            <a href="mailto:mamadousanogo352@gmail.com" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Separator */}
          <div className="w-full h-px bg-white/10 mb-6"></div>

          {/* Bottom Footer Row */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-400">
            <div className="text-gray-500">
              © 2026 DigiCraft. Tous droits réservés.
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.49-2.5 6.04-1.68 1.63-4 2.5-6.36 2.37-2.61-.13-5.04-1.47-6.57-3.56-1.47-2.02-1.92-4.63-1.31-6.99.5-1.93 1.83-3.66 3.52-4.65 1.76-1.03 3.86-1.34 5.86-.98v4.22c-1.46-.35-3.08-.22-4.32.61-1.07.72-1.74 1.95-1.78 3.25-.04 1.34.56 2.67 1.56 3.52 1.05.89 2.52 1.22 3.87.97 1.65-.3 3.01-1.6 3.39-3.23.16-.67.24-1.37.24-2.07V.02z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Large Background Text in the bottom space */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none flex justify-center opacity-30 mt-auto -mt-[11vw] relative z-0">
        <span className="text-[21.5vw] font-black tracking-tighter bg-clip-text text-transparent footer-text-bg translate-y-[20%] whitespace-nowrap">
          DIGICRAFT
        </span>
      </div>
    </footer>
  );
}
