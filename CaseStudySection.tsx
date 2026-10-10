import React from 'react';
import { WORK_ITEMS } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { Briefcase, ExternalLink, Play, MapPin, Plus } from 'lucide-react';
import deviceImg from '../../assets/images/adhyayan_academy_device_1229x820.jpg';

interface CaseStudySectionProps {
  onOpenLivePreview?: (title: string, url: string, client: string) => void;
  onHoverStateChange?: (text: string) => void;
}

export const CaseStudySection: React.FC<CaseStudySectionProps> = ({ onOpenLivePreview, onHoverStateChange }) => {
  const { local, adhyayan } = WORK_ITEMS;
  const launch = (title: string, url: string, client: string) => {
    sound.playEnergySurge();
    if (onOpenLivePreview) onOpenLivePreview(title, url, client);
    else window.open(url, '_blank');
  };

  return (
    <section id="work" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Briefcase className="w-4 h-4" />
        <span>WORK FROM ARVINEX / 06</span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
        <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
          BUILT ON <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-ember">REAL GROUND.</span>
        </h2>
        <p className="text-sm font-mono text-gray-400 max-w-md">
          A short list, and every item is real. Campaign results with numbers get added here once clients agree to share them.
        </p>
      </div>

      {/* ARVINEX LOCAL */}
      <div className="p-8 sm:p-12 rounded-3xl glass-panel-active border-2 border-brand-gold/40 shadow-[0_0_60px_rgba(255,90,31,0.22)] mb-10 relative overflow-hidden">
        <div className="absolute inset-0 topo-lines opacity-60 pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs font-mono text-brand-gold tracking-widest uppercase">{local.kind}</div>
            <h3 className="kinetic-title text-4xl sm:text-6xl font-black text-white">{local.title}</h3>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans font-light">{local.description}</p>
            <div className="flex flex-wrap gap-2">
              {local.tags.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-brand-sand">{t}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => launch(local.title, local.liveUrl, 'Arvinex Venture Private Limited')}
                onMouseEnter={() => { sound.playHover(900); onHoverStateChange?.('PREVIEW'); }}
                onMouseLeave={() => onHoverStateChange?.('')}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-ember to-brand-gold text-black font-mono font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(255,140,30,0.4)] hover:shadow-[0_0_35px_rgba(255,176,32,0.7)] transition-all"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>INTERACTIVE LIVE PREVIEW</span>
              </button>
              <a
                href={local.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center space-x-1.5 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/40 text-xs font-mono text-gray-200 hover:text-white transition-all group"
              >
                <span>ARVINEXLOCAL.SITE</span>
                <ExternalLink className="w-3.5 h-3.5 text-brand-gold" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {['Dharamshala', 'McLeod Ganj', 'Kangra', 'Palampur', 'Bir'].map((town, i) => (
                <div key={town} className={`p-4 rounded-2xl bg-obsidian/70 border border-white/10 flex items-center gap-2 ${i === 4 ? 'col-span-2' : ''}`}>
                  <MapPin className="w-4 h-4 text-brand-ember shrink-0" />
                  <span className="text-sm font-display font-bold text-white">{town}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Adhyayan Academy */}
        <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 hover:border-brand-gold/40 transition-colors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <button
              type="button"
              className="relative rounded-2xl overflow-hidden border border-white/10 group text-left"
              onClick={() => launch(adhyayan.title, adhyayan.liveUrl, adhyayan.client)}
              onMouseEnter={() => onHoverStateChange?.('PREVIEW')}
              onMouseLeave={() => onHoverStateChange?.('')}
            >
              <img src={deviceImg} alt="Adhyayan Academy website on laptop and phone" loading="lazy" width={1229} height={820} className="w-full h-auto group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-obsidian/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-full bg-brand-gold text-black font-mono font-bold text-[11px] tracking-widest flex items-center gap-1.5">
                  <Play className="w-3 h-3 fill-black" /> LIVE PREVIEW
                </span>
              </div>
            </button>
            <div className="space-y-3">
              <div className="text-xs font-mono text-brand-gold tracking-widest uppercase">{adhyayan.kind}</div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white">{adhyayan.title}</h3>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-brand-gold uppercase mb-0.5">OBJECTIVE</div>
                <div className="text-sm text-gray-200">{adhyayan.objective}</div>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-[10px] font-mono text-brand-gold uppercase mb-0.5">WHAT ARVINEX DELIVERED</div>
                <div className="text-sm text-gray-200">{adhyayan.contribution}</div>
              </div>
              <a href={adhyayan.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 py-2 text-xs font-mono text-brand-gold hover:underline">
                VISIT LIVE SITE <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Open slot */}
        <a
          href="#contact"
          onClick={() => sound.playWhoosh()}
          onMouseEnter={() => { sound.playHover(1000); onHoverStateChange?.('YOU?'); }}
          onMouseLeave={() => onHoverStateChange?.('')}
          className="lg:col-span-4 p-8 rounded-3xl border-2 border-dashed border-brand-gold/40 bg-brand-gold/[0.04] hover:bg-brand-gold/[0.08] transition-colors flex flex-col justify-between gap-6 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center">
            <Plus className="w-6 h-6 text-brand-gold group-hover:rotate-90 transition-transform" />
          </div>
          <div>
            <div className="text-xs font-mono text-brand-gold tracking-widest uppercase mb-2">OPEN SLOT</div>
            <h3 className="text-2xl font-display font-black text-white mb-2">Your business, next.</h3>
            <p className="text-sm text-gray-300 font-sans">Our first online + offline campaigns are starting now. Early clients get founder attention and a reduced first-campaign price.</p>
          </div>
          <span className="text-xs font-mono font-bold text-brand-gold">CLAIM THE SLOT →</span>
        </a>
      </div>
    </section>
  );
};
