import React from 'react';
import { PERSONAL_INFO, CO_FOUNDER, AREAS } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { User, Compass, Footprints, Handshake, MapPin, ArrowUpRight } from 'lucide-react';
import { MonogramCard } from '../ui/MonogramCard';

interface PersonalSectionProps {
  onHoverStateChange?: (text: string) => void;
}

export const PersonalSection: React.FC<PersonalSectionProps> = ({ onHoverStateChange }) => {
  return (
    <section id="person" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <User className="w-4 h-4" />
        <span>PERSON / 10</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative group order-2 lg:order-1">
          <MonogramCard variant="portrait" label="ROOTED IN" title="Kangra, Himachal Pradesh" subtitle="Working across Himachal" />
        </div>

        <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
          <div>
            <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
              BEYOND <br />
              <span className="text-brand-gold text-glow-gold">THE TITLE.</span>
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="text-lg sm:text-xl font-display font-bold text-white">{PERSONAL_INFO.name}</span>
              <span className="px-3 py-1 rounded-full bg-brand-ember/20 border border-brand-ember/40 text-xs font-mono text-brand-gold">{PERSONAL_INFO.subPositioning}</span>
            </div>
          </div>

          <div className="p-8 rounded-3xl glass-panel-active border-l-4 border-brand-gold">
            <p className="text-xl sm:text-2xl text-gray-100 font-display font-light leading-relaxed">"{PERSONAL_INFO.mindset}"</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Compass className="w-5 h-5 text-brand-gold mb-2" />
              <div className="text-xs font-mono text-gray-400">ORIENTATION</div>
              <div className="text-sm font-bold text-white">Owner's Mindset</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Footprints className="w-5 h-5 text-brand-ember mb-2" />
              <div className="text-xs font-mono text-gray-400">HABIT</div>
              <div className="text-sm font-bold text-white">Walks the Street First</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <Handshake className="w-5 h-5 text-amber-300 mb-2" />
              <div className="text-xs font-mono text-gray-400">STYLE</div>
              <div className="text-sm font-bold text-white">Straight Talk</div>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-gray-500 tracking-widest uppercase mb-3">ON-GROUND FOCUS AREAS</div>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <span key={a} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-brand-ember" /> {a}
                </span>
              ))}
              <span className="px-3 py-1.5 rounded-full border border-dashed border-white/20 text-xs font-mono text-gray-400">Rest of Himachal: ask</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two founders */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl glass-panel-active border border-brand-gold/40">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-ember to-brand-gold flex items-center justify-center font-display font-black text-black text-lg">AK</div>
            <div>
              <div className="text-xs font-mono text-brand-gold uppercase tracking-widest">THE GROUND HALF</div>
              <div className="text-xl font-display font-black text-white">Aryan Katoch</div>
            </div>
          </div>
          <p className="text-sm text-gray-300 font-sans leading-relaxed">Director & Co-Founder. Leads client relationships, strategy and offline campaigns — making sure every plan comes down to what happens at your counter.</p>
        </div>
        <a
          href={CO_FOUNDER.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sound.playClick()}
          onMouseEnter={() => { sound.playHover(1000); onHoverStateChange?.('VISIT'); }}
          onMouseLeave={() => onHoverStateChange?.('')}
          className="p-8 rounded-3xl glass-panel border border-sky-400/30 hover:border-sky-300/60 hover:shadow-[0_0_40px_rgba(0,160,255,0.2)] transition-all group"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center font-display font-black text-white text-lg">SS</div>
            <div>
              <div className="text-xs font-mono text-cyan-300 uppercase tracking-widest">THE DIGITAL HALF</div>
              <div className="text-xl font-display font-black text-white">{CO_FOUNDER.name}</div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-cyan-300 ml-auto group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
          <p className="text-sm text-gray-300 font-sans leading-relaxed">{CO_FOUNDER.role}. {CO_FOUNDER.focus}</p>
          <div className="mt-4 text-xs font-mono text-cyan-300">ARVINEXSARTHAK.ONLINE ↗</div>
        </a>
      </div>
    </section>
  );
};
