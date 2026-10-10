import React, { useState } from 'react';
import { FAQS } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { HelpCircle, Plus } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [open, setOpen] = useState<number>(0);
  return (
    <section id="faq" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <HelpCircle className="w-4 h-4" />
        <span>STRAIGHT ANSWERS / 12</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <h2 className="lg:col-span-5 kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
          OWNERS <br />
          <span className="text-brand-gold text-glow-gold">ASK.</span>
        </h2>
        <div className="lg:col-span-7 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`rounded-2xl border transition-all ${isOpen ? 'glass-panel-active border-brand-gold/50' : 'glass-panel border-white/10'}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => { sound.playClick(); setOpen(isOpen ? -1 : i); }}
                  onMouseEnter={() => sound.playHover(840)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="text-base sm:text-lg font-display font-bold text-white">{f.q}</span>
                  <Plus className={`w-5 h-5 shrink-0 text-brand-gold transition-transform ${isOpen ? 'rotate-45' : ''}`} />
                </button>
                {isOpen && <p className="px-5 pb-5 -mt-1 text-sm sm:text-base text-gray-300 font-sans leading-relaxed animate-fadeIn">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
