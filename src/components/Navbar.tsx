import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleScollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-6 lg:px-12 py-5">
        {/* Left: Logo */}
        <div className="w-auto md:w-1/3 flex justify-start">
          <div className="text-2xl font-bold tracking-wider">
            <span className="text-[#5eb1ff]">DIGI</span><span className="text-white">CRAFT</span>
          </div>
        </div>

        {/* Center: Links (Desktop) */}
        <div className="w-1/3 hidden md:flex justify-center items-center gap-10 text-[15px] text-gray-300">
          <a href="#accueil" onClick={(e) => handleScollTo(e, 'accueil')} className="hover:text-white transition-colors">Accueil</a>
          <a href="#services" onClick={(e) => handleScollTo(e, 'services')} className="hover:text-white transition-colors">Services</a>
          <a href="#realisations" onClick={(e) => handleScollTo(e, 'realisations')} className="hover:text-white transition-colors">Réalisations</a>
          <a href="mailto:mamadousanogo352@gmail.com" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Right: Contact & Menu */}
        <div className="w-auto md:w-1/3 flex justify-end items-center gap-2 sm:gap-4 lg:gap-6">
          <span className="text-[15px] text-gray-300 hidden lg:block">+(205)485-5851</span>
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 bg-white/[0.03] border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 md:w-5 md:h-5" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
          </button>

          <a href="mailto:mamadousanogo352@gmail.com" className="hidden md:flex w-11 h-11 items-center justify-center bg-white/[0.03] border border-white/10 rounded-full hover:bg-white/10 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="9" cy="9" r="1.5"/>
              <circle cx="15" cy="9" r="1.5"/>
              <circle cx="9" cy="15" r="1.5"/>
              <circle cx="15" cy="15" r="1.5"/>
            </svg>
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-6 shadow-2xl overflow-y-auto h-[calc(100vh-73px)]">
          <a href="#accueil" onClick={(e) => handleScollTo(e, 'accueil')} className="text-lg text-gray-300 hover:text-white transition-colors">Accueil</a>
          <a href="#services" onClick={(e) => handleScollTo(e, 'services')} className="text-lg text-gray-300 hover:text-white transition-colors">Services</a>
          <a href="#realisations" onClick={(e) => handleScollTo(e, 'realisations')} className="text-lg text-gray-300 hover:text-white transition-colors">Réalisations</a>
          <a href="mailto:mamadousanogo352@gmail.com" className="text-lg text-gray-300 hover:text-white transition-colors">Contact</a>
          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <span className="text-gray-400">+(205)485-5851</span>
            <a href="mailto:mamadousanogo352@gmail.com" className="bg-[#5eb1ff] text-black px-6 py-3 rounded-full font-medium text-center">
              Démarrer un projet
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
