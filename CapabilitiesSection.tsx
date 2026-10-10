import React, { useState } from 'react';
import { CAPABILITIES } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { Zap, CheckCircle2, ArrowRight } from 'lucide-react';

interface CapabilitiesSectionProps {
  onHoverStateChange?: (text: string) => void;
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ onHoverStateChange }) => {
  const [activeTab, setActiveTab] = useState<string>(CAPABILITIES[0].id);
  const cap = CAPABILITIES.find((c) => c.id === activeTab) || CAPABILITIES[0];

  return (
    <section id="capabilities" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Zap className="w-4 h-4" />
        <span>SERVICES / 05</span>
      </div>

      <div className="mb-14">
        <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
          WHAT WE DO <br />
          <span className="text-brand-gold text-glow-gold">ON THE GROUND.</span>
        </h2>
        <p className="text-sm font-mono text-gray-400 mt-3 max-w-xl">Five disciplines, one plan. Pick one or combine them — the free audit tells you where to start.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-3">
          {CAPABILITIES.map((c) => {
            const current = c.id === activeTab;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => { sound.playClick(); setActiveTab(c.id); }}
                onMouseEnter={() => { sound.playHover(860); onHoverStateChange?.('EXPLORE'); }}
                onMouseLeave={() => onHoverStateChange?.('')}
                className={`w-full text-left p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                  current ? 'bg-brand-ember/15 border-brand-gold shadow-[0_0_25px_rgba(255,176,32,0.22)] translate-x-2' : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="text-xs font-mono text-brand-gold font-bold mb-1">{c.number} — SERVICE</div>
                  <div className="text-base sm:text-lg font-display font-bold text-white">{c.title}</div>
                </div>
                <ArrowRight className={`w-5 h-5 shrink-0 ${current ? 'text-brand-gold' : 'text-gray-600'}`} />
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7">
          <div key={cap.id} className="p-8 sm:p-10 rounded-3xl glass-panel-active border-2 border-brand-gold/40 shadow-[0_0_40px_rgba(255,90,31,0.22)] space-y-6 animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <span className="text-xs font-mono text-brand-gold font-bold tracking-widest">SERVICE: {cap.number}</span>
              <span className="px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-[11px] font-mono text-brand-gold">{cap.visualMetaphor}</span>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white mb-2">{cap.title}</h3>
              <p className="text-base sm:text-lg font-sans text-brand-gold font-medium">"{cap.tagline}"</p>
            </div>
            <p className="text-base text-gray-200 leading-relaxed font-sans">{cap.description}</p>
            <div className="border-t border-white/10 pt-6">
              <div className="text-xs font-mono text-gray-400 tracking-wider uppercase mb-4">WHAT YOU GET</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cap.deliverables.map((d) => (
                  <div key={d} className="flex items-center space-x-2 p-3 rounded-xl bg-white/5 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span className="text-xs font-mono text-gray-200">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
