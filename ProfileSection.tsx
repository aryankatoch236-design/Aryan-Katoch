import React from 'react';
import { PERSONAL_INFO, INDUSTRIES } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { Sparkles, Target, Footprints, Layers } from 'lucide-react';
import { MonogramCard } from '../ui/MonogramCard';

interface ProfileSectionProps {
  onHoverStateChange?: (text: string) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ onHoverStateChange }) => {
  return (
    <section id="profile" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Sparkles className="w-4 h-4" />
        <span>PROFILE / 02</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
            MORE THAN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-ember via-brand-gold to-white">ADS.</span>
          </h2>

          <div className="p-6 sm:p-8 rounded-3xl glass-panel-active border-l-4 border-brand-gold">
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed font-sans font-light">{PERSONAL_INFO.profileText}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Target className="w-5 h-5 text-brand-gold mb-2" />
              <div className="text-xs font-mono text-gray-400">FOCUS</div>
              <div className="text-sm font-bold text-white">Local Footfall</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Footprints className="w-5 h-5 text-brand-ember mb-2" />
              <div className="text-xs font-mono text-gray-400">STRENGTH</div>
              <div className="text-sm font-bold text-white">Ground Execution</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 col-span-2 sm:col-span-1">
              <Layers className="w-5 h-5 text-amber-300 mb-2" />
              <div className="text-xs font-mono text-gray-400">METHOD</div>
              <div className="text-sm font-bold text-white">Online + Offline</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-3">WORKS WITH</div>
            <div className="flex flex-wrap gap-2">
              {INDUSTRIES.map((ind) => (
                <span
                  key={ind.name}
                  title={ind.hint}
                  onMouseEnter={() => { sound.playHover(940); onHoverStateChange?.('LOCAL'); }}
                  onMouseLeave={() => onHoverStateChange?.('')}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-brand-gold/40 text-xs font-mono text-brand-sand transition-colors"
                >
                  {ind.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative group">
          <MonogramCard label="LEADERSHIP" title={PERSONAL_INFO.role} subtitle={PERSONAL_INFO.company} />
        </div>
      </div>
    </section>
  );
};
