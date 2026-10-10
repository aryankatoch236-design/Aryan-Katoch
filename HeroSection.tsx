import React from 'react';
import { PERSONAL_INFO, CONTACT_INFO } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { ArrowDown, MapPin, MessageCircle, ScanSearch } from 'lucide-react';

interface HeroSectionProps {
  onHoverStateChange?: (text: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onHoverStateChange }) => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 max-w-7xl mx-auto select-none"
    >
      {/* Top credentials bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-[0_0_10px_#FFB020] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-brand-gold uppercase">{PERSONAL_INFO.role}</span>
          <span className="text-xs text-gray-500 font-mono">/</span>
          <span className="text-xs font-mono text-gray-300 uppercase">{PERSONAL_INFO.company}</span>
        </div>
        <a
          href="#contact"
          onClick={() => sound.playClick()}
          onMouseEnter={() => sound.playHover(980)}
          className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-gold/10 hover:bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-mono transition-all group"
        >
          <ScanSearch className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
          <span>FREE LOCAL GROWTH AUDIT</span>
        </a>
      </div>

      {/* room for the 3D island on phones/tablets */}
      <div className="lg:hidden h-[36vh] sm:h-[40vh]" aria-hidden="true" />

      {/* Kinetic typography */}
      <div className="my-auto py-6 lg:py-12 relative z-10">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-ember/15 border border-brand-ember/30 text-brand-gold text-xs font-mono tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>ARYAN KATOCH · KANGRA, HIMACHAL PRADESH</span>
          </div>

          <h1
            className="kinetic-title text-[clamp(2.6rem,13vw,4.2rem)] sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-white uppercase leading-[0.85] max-w-full break-words"
            onMouseEnter={() => onHoverStateChange?.('SEEN')}
            onMouseLeave={() => onHoverStateChange?.('')}
          >
            OWN YOUR
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-8">
            <h1
              className="kinetic-title text-[clamp(2.6rem,13vw,4.2rem)] sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter text-brand-gold uppercase leading-[0.85] text-glow-gold max-w-full break-words"
              onMouseEnter={() => onHoverStateChange?.('STREET')}
              onMouseLeave={() => onHoverStateChange?.('')}
            >
              STREET.
            </h1>
            <div className="hidden lg:block max-w-xs p-4 rounded-2xl glass-panel text-xs text-gray-300 font-sans border-l-2 border-brand-gold">
              <span className="font-mono text-brand-gold font-bold block mb-1">CORE POSITIONING</span>
              {PERSONAL_INFO.manifestoSummary}
            </div>
          </div>

          <h2
            className="kinetic-title pt-3 text-[clamp(1.15rem,5.4vw,1.9rem)] sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 uppercase leading-[0.95] max-w-full break-words"
          >
            ONLINE ATTRACTS ATTENTION. <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-ember to-brand-gold">OFFLINE EARNS TRUST.</span>
          </h2>

          <p className="lg:hidden text-sm text-gray-300 font-sans max-w-md pt-3">{PERSONAL_INFO.manifestoSummary}</p>

          <div className="flex flex-wrap items-center gap-3 pt-6">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playClick()}
              onMouseEnter={() => { sound.playHover(1050); onHoverStateChange?.('TALK'); }}
              onMouseLeave={() => onHoverStateChange?.('')}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-ember to-brand-gold text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(255,140,30,0.45)] hover:shadow-[0_0_40px_rgba(255,176,32,0.7)] transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>TALK TO ARYAN ON WHATSAPP</span>
            </a>
            <a
              href="#strategy"
              onClick={() => sound.playWhoosh()}
              onMouseEnter={() => sound.playHover(900)}
              className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-brand-gold/40 text-white font-mono font-bold text-xs tracking-wider transition-all"
            >
              <span>SEE THE 360° ENGINE</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-t border-white/10 pt-6">
        <div className="flex items-center space-x-6">
          <div className="text-left">
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">DISCIPLINE</div>
            <div className="text-sm font-display font-bold text-gray-200">Hybrid Local Marketing</div>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-left">
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase">CURRENT MANDATE</div>
            <div className="text-sm font-display font-bold text-brand-gold">Director @ Arvinex Venture</div>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 hover:border-brand-gold/40 transition-all group"
          onMouseEnter={() => onHoverStateChange?.('DRAG')}
          onMouseLeave={() => onHoverStateChange?.('')}
          onClick={() => {
            sound.playWhoosh();
            document.querySelector('#profile')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
          <span>DRAG THE VALLEY • SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 text-brand-gold group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
