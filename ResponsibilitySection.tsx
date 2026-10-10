import React from 'react';
import { RESPONSIBILITIES } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { Layers } from 'lucide-react';

interface ResponsibilitySectionProps {
  onHoverStateChange?: (text: string) => void;
}

export const ResponsibilitySection: React.FC<ResponsibilitySectionProps> = ({ onHoverStateChange }) => {
  return (
    <section id="responsibilities" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Layers className="w-4 h-4" />
        <span>ROLE & RESPONSIBILITY / 04</span>
      </div>

      <div className="mb-14">
        <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
          WHERE PLANS <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-ember">MEET THE STREET.</span>
        </h2>
        <p className="text-sm font-mono text-gray-400 mt-3 max-w-2xl">
          DIRECTOR & CO-FOUNDER — ARVINEX VENTURE PRIVATE LIMITED. Nine things Aryan owns, from the first conversation with an owner to the report at the end of the month.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESPONSIBILITIES.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => { sound.playHover(820); onHoverStateChange?.(item.number); }}
            onMouseLeave={() => onHoverStateChange?.('')}
            className="p-6 rounded-3xl glass-panel hover:glass-panel-active transition-all duration-300 group border border-white/10 hover:border-brand-gold/50 hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-brand-ember/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-display font-black text-brand-gold group-hover:scale-110 transition-transform">{item.number}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-brand-ember/15 border border-brand-ember/30 text-[10px] font-mono text-brand-gold uppercase">{item.tag}</span>
            </div>
            <h3 className="text-xl font-display font-bold text-white group-hover:text-brand-gold transition-colors mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-sans font-light">{item.shortDesc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
