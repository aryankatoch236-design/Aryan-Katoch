import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Flame } from 'lucide-react';

interface PhilosophySectionProps {
  onHoverStateChange?: (text: string) => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onHoverStateChange }) => {
  const word = (text: string, cls: string, cursor: string) => (
    <h2
      className={`kinetic-title text-[clamp(2.4rem,12vw,3.9rem)] sm:text-8xl md:text-9xl font-black tracking-tight uppercase max-w-full break-words ${cls}`}
      onMouseEnter={() => onHoverStateChange?.(cursor)}
      onMouseLeave={() => onHoverStateChange?.('')}
    >
      {text}
    </h2>
  );

  return (
    <section id="about" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 select-none">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Flame className="w-4 h-4 text-brand-ember animate-pulse" />
        <span>PHILOSOPHY / 09</span>
      </div>

      <div className="space-y-4 mb-12">
        <div className="text-xs sm:text-sm font-mono tracking-[0.25em] text-gray-400 uppercase">LIKES DON'T PAY RENT.</div>
        <div className="space-y-1">
          {word('SEEN.', 'text-white', 'SEEN')}
          {word('TRUSTED.', 'text-transparent bg-clip-text bg-gradient-to-r from-brand-ember via-brand-gold to-white', 'TRUSTED')}
          {word('CHOSEN.', 'text-brand-gold text-glow-gold', 'CHOSEN')}
        </div>
      </div>

      <div className="max-w-4xl p-8 sm:p-12 rounded-3xl glass-panel-active border-2 border-brand-gold/40 shadow-[0_0_50px_rgba(255,90,31,0.22)]">
        <p className="text-xl sm:text-2xl md:text-3xl text-gray-100 font-display font-light leading-relaxed">"{PERSONAL_INFO.philosophyBody}"</p>
        <div className="mt-6 flex items-center space-x-3 text-xs font-mono text-brand-gold">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
          <span>ARYAN KATOCH — GROUND-FIRST MANIFESTO</span>
        </div>
      </div>
    </section>
  );
};
