import React from 'react';
import { STRATEGY_NODES } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { Orbit, ArrowRight, Wifi, Footprints } from 'lucide-react';

interface StrategySectionProps {
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  onHoverStateChange?: (text: string) => void;
}

const isOnline = (id: string) => ['maps', 'reels', 'ads'].includes(id);

export const StrategySection: React.FC<StrategySectionProps> = ({ selectedNodeId, onSelectNode, onHoverStateChange }) => {
  const active = STRATEGY_NODES.find((n) => n.id === selectedNodeId) || STRATEGY_NODES[0];
  const online = isOnline(active.id);
  const pair = STRATEGY_NODES.find((n) => isOnline(n.id) !== online && STRATEGY_NODES.indexOf(n) % 3 === STRATEGY_NODES.indexOf(active) % 3);

  return (
    <section id="strategy" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-brand-gold uppercase mb-4">
        <Orbit className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
        <span>SIGNATURE 3D ENGINE / 03</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="kinetic-title text-[clamp(1.9rem,10vw,3rem)] sm:text-7xl md:text-8xl font-black text-white uppercase leading-[0.9] max-w-full break-words">
            THE 360° <br />
            <span className="text-brand-gold text-glow-gold">HYBRID ENGINE.</span>
          </h2>
          <p className="text-sm font-mono text-gray-400 mt-3 max-w-xl">
            Six touch-points, planned as one campaign. Three get a business noticed on the phone; three make it trusted on the street.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 self-start md:self-auto">
          <span className="text-xs font-mono text-gray-300 px-3 py-1.5 rounded-full bg-white/5 border border-brand-gold/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold" /> ONLINE
          </span>
          <span className="text-xs font-mono text-gray-300 px-3 py-1.5 rounded-full bg-white/5 border border-brand-ember/30 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-ember" /> OFFLINE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-3">
          {STRATEGY_NODES.map((node) => {
            const current = node.id === active.id;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => { sound.playClick(); onSelectNode(node.id); }}
                onMouseEnter={() => { sound.playHover(780); onSelectNode(node.id); onHoverStateChange?.('INSPECT'); }}
                onMouseLeave={() => onHoverStateChange?.('')}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                  current
                    ? 'bg-gradient-to-r from-brand-ember/25 to-brand-gold/15 border-brand-gold shadow-[0_0_30px_rgba(255,176,32,0.25)] translate-x-2'
                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-brand-gold/40'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div
                    className="w-3.5 h-3.5 rotate-45 transition-transform duration-300 group-hover:scale-125"
                    style={{ backgroundColor: node.color, boxShadow: current ? `0 0 15px ${node.color}` : `0 0 5px ${node.color}` }}
                  />
                  <div>
                    <div className="text-sm sm:text-base font-mono font-bold text-white tracking-wider group-hover:text-brand-gold transition-colors">{node.label}</div>
                    <div className="text-xs text-gray-400 font-mono">{node.subtitle}</div>
                  </div>
                </div>
                <ArrowRight className={`w-5 h-5 transition-all duration-300 ${current ? 'text-brand-gold translate-x-1' : 'text-gray-600 group-hover:text-gray-300'}`} />
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-7 lg:sticky lg:top-28">
          <div key={active.id} className="p-8 sm:p-10 rounded-3xl glass-panel-active border-2 border-brand-gold/40 shadow-[0_0_50px_rgba(255,90,31,0.25)] space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-ping" />
                <span className="text-xs font-mono text-brand-gold font-bold tracking-widest uppercase">TOUCH-POINT</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase flex items-center gap-1.5 border ${online ? 'bg-brand-gold/10 border-brand-gold/40 text-brand-gold' : 'bg-brand-ember/10 border-brand-ember/40 text-orange-300'}`}>
                {online ? <Wifi className="w-3 h-3" /> : <Footprints className="w-3 h-3" />}
                {online ? 'ONLINE · ATTENTION' : 'OFFLINE · TRUST'}
              </span>
            </div>

            <div>
              <h3 className="text-3xl sm:text-5xl font-display font-black text-white mb-2 tracking-tight">{active.label}</h3>
              <p className="text-sm sm:text-base font-mono font-semibold" style={{ color: active.color }}>{active.subtitle}</p>
            </div>

            <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-sans font-light">{active.description}</p>

            {pair && (
              <div className="p-4 rounded-xl bg-obsidian/80 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400">
                <span>WORKS BEST TOGETHER WITH</span>
                <button type="button" onClick={() => { sound.playClick(); onSelectNode(pair.id); }} className="font-bold hover:underline" style={{ color: pair.color }}>
                  {pair.label} →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
