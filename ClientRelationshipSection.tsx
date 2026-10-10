import React from 'react';
import { FIRST_CLIENT_PROMISES, PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { HeartHandshake, CheckCircle2, Quote } from 'lucide-react';

interface ClientRelationshipSectionProps {
  onHoverStateChange?: (text: string) => void;
}

export const ClientRelationshipSection: React.FC<ClientRelationshipSectionProps> = ({ onHoverStateChange }) => {
  return (
    <section id="first-clients" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <HeartHandshake className="w-4 h-4" />
        <span>CLIENT COMMITMENT / 07</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
            TRUST IS EARNED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-ember">IN PERSON.</span>
          </h2>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="text-xs font-mono text-brand-gold tracking-wider uppercase">FIRST-CLIENT PROGRAMME</div>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans">
              Arvinex is young, and we'd rather say so than dress it up. Our first clients get the founders' full attention — and in return we both get honest proof of what works for a local business in Himachal.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass-panel-active border-l-4 border-brand-gold relative">
            <Quote className="w-8 h-8 text-brand-gold/30 absolute top-4 right-4" />
            <p className="text-lg sm:text-xl font-display font-medium text-white italic pr-8">"{PERSONAL_INFO.quote}"</p>
            <div className="mt-3 text-xs font-mono text-brand-gold">— ARYAN KATOCH</div>
          </div>
        </div>

        <div className="lg:col-span-5 grid grid-cols-1 gap-3">
          {FIRST_CLIENT_PROMISES.map((p, i) => (
            <div
              key={p}
              onMouseEnter={() => { sound.playHover(880 + i * 30); onHoverStateChange?.('PROMISE'); }}
              onMouseLeave={() => onHoverStateChange?.('')}
              className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-white/10 hover:border-brand-gold/40 transition-colors"
            >
              <span className="text-xs font-mono font-bold text-brand-ember w-6">0{i + 1}</span>
              <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
              <span className="text-sm font-sans text-gray-100">{p}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
