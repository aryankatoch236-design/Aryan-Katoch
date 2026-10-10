import React, { useState, useEffect } from 'react';
import { NAVIGATION_LINKS, PERSONAL_INFO, CONTACT_INFO } from '../../data/portfolioData';
import { AudioToggle } from './AudioToggle';
import { sound } from '../../audio/soundSystem';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';

interface FloatingNavProps {
  activeSection: string;
  onEasterEggTrigger: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeSection,
  onEasterEggTrigger
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = () => {
    sound.playClick();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      sound.playEnergySurge();
      onEasterEggTrigger();
      setClickCount(0);
    }
  };

  const scrollTo = (href: string) => {
    sound.playWhoosh();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 xl:px-8 py-4 sm:py-6 transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-6'
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-[#0f0c09]/85 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-transparent border border-transparent'
          }`}
        >
          <div className="flex items-center space-x-3">
            <button
              onClick={handleLogoClick}
              onMouseEnter={() => sound.playHover(900)}
              title="Aryan Katoch — click 3x for a surprise"
              className="group flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 hover:bg-brand-ember/20 border border-white/10 hover:border-brand-gold/40 transition-all"
            >
              <span className="font-display font-extrabold text-sm tracking-wider text-brand-gold group-hover:scale-110 transition-transform">
                AK
              </span>
              <span className="hidden md:inline-block text-[11px] font-mono text-gray-400 tracking-widest uppercase">
                ARYAN KATOCH
              </span>
            </button>

            <div className="hidden lg:flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-brand-ember/10 border border-brand-ember/20 text-[10px] font-mono text-brand-gold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-ping" />
              <span>DIRECTOR • ARVINEX VENTURE</span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {NAVIGATION_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.href)}
                  onMouseEnter={() => sound.playHover()}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'text-brand-gold bg-brand-gold/10 border border-brand-gold/30 shadow-[0_0_12px_rgba(255,176,32,0.2)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-3">
            

            <AudioToggle />

            <button
              onClick={() => scrollTo('#contact')}
              onMouseEnter={() => sound.playHover(1100)}
              className="hidden sm:flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-brand-ember to-orange-600 hover:from-orange-500 hover:to-brand-gold text-white text-xs font-mono font-semibold tracking-wider transition-all shadow-[0_0_20px_rgba(255,90,31,0.4)] hover:shadow-[0_0_25px_rgba(255,176,32,0.6)] group"
            >
              <span>GET A FREE AUDIT</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-2xl lg:hidden flex flex-col justify-center px-8 space-y-6 animate-fadeIn">
          <div className="text-center space-y-2 mb-4">
            <div className="text-xs font-mono text-brand-gold tracking-widest uppercase">
              {PERSONAL_INFO.role}
            </div>
            <div className="text-2xl font-display font-black text-white">
              {PERSONAL_INFO.name}
            </div>
            <div className="text-xs text-gray-400 font-mono">
              {PERSONAL_INFO.company}
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            {NAVIGATION_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.href)}
                className="text-left py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-base font-mono text-gray-200 hover:text-brand-gold hover:border-brand-gold/40 transition-all flex items-center justify-between"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-500" />
              </button>
            ))}

            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-900/30 border border-emerald-500/40 text-base font-mono text-emerald-300 flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>WHATSAPP ARYAN</span>
              </div>
              <span className="text-xs text-gray-400">1-CLICK</span>
            </a>
          </div>

          <button
            onClick={() => scrollTo('#contact')}
            className="w-full py-3.5 rounded-xl bg-brand-ember text-white font-mono font-bold tracking-wider text-center shadow-[0_0_25px_rgba(255,90,31,0.6)]"
          >
            GET A FREE AUDIT ↗
          </button>
        </div>
      )}
    </>
  );
};
