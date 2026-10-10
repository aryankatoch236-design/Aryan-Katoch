import React from 'react';
import { MEASURES } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { Gauge, ArrowDown, Phone, MessageCircle, Footprints, Ticket } from 'lucide-react';

interface ImpactSectionProps {
  onHoverStateChange?: (text: string) => void;
}

const ICONS = [Phone, MessageCircle, Footprints, Ticket];

export const ImpactSection: React.FC<ImpactSectionProps> = ({ onHoverStateChange }) => {
  return (
    <section className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Gauge className="w-4 h-4" />
        <span>HOW WE MEASURE / 08</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
        <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
          NO VANITY. <br />
          <span className="text-brand-gold text-glow-gold">JUST FOOTFALL.</span>
        </h2>
        <div className="p-6 rounded-3xl glass-panel-active border-2 border-brand-gold/40 max-w-md">
          <div className="text-xs font-mono text-brand-gold uppercase tracking-widest mb-2">REPORTING RULE</div>
          <p className="text-sm text-gray-200 font-sans leading-relaxed">
            Likes, reach and impressions don't appear as headline numbers in our reports. These four do — agreed in writing before a campaign starts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {MEASURES.map((m, i) => {
          const Icon = ICONS[i];
          return (
            <div
              key={m.id}
              onMouseEnter={() => { sound.playHover(890); onHoverStateChange?.(m.title); }}
              onMouseLeave={() => onHoverStateChange?.('')}
              className="p-6 rounded-3xl glass-panel hover:glass-panel-active transition-all duration-300 group border border-white/10 hover:border-brand-gold/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-brand-ember/15 border border-brand-ember/30">
                  <Icon className="w-5 h-5 text-brand-gold" />
                </div>
                <span className="text-[10px] font-mono text-gray-500">0{i + 1}</span>
              </div>
              <div className="text-xs font-mono text-brand-gold font-bold tracking-widest uppercase mb-1">{m.subtitle}</div>
              <h3 className="text-2xl font-display font-black text-white group-hover:text-brand-gold transition-colors mb-3">{m.title}</h3>
              <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">{m.description}</p>
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-ember/25 via-brand-gold/15 to-brand-ember/25 border border-brand-gold/40 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <ArrowDown className="w-5 h-5 text-brand-gold animate-bounce" />
        <span className="text-sm font-mono font-bold tracking-widest text-white uppercase">ALL FOUR ROLL UP INTO ONE QUESTION:</span>
        <span className="text-lg font-display font-black text-brand-gold tracking-wider uppercase">DID MORE CUSTOMERS WALK IN?</span>
      </div>
    </section>
  );
};
