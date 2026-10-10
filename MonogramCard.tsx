import React from 'react';

/*
 * Stand-in visual until a real photo of Aryan is added.
 * To use a photo: put it in src/assets/images/, import it in the parent section,
 * and pass it as `photo` (e.g. <MonogramCard photo={aryanImg} ... />).
 */
interface MonogramCardProps {
  photo?: string;
  label: string;
  title: string;
  subtitle: string;
  variant?: 'profile' | 'portrait';
}

export const MonogramCard: React.FC<MonogramCardProps> = ({ photo, label, title, subtitle, variant = 'profile' }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden glass-panel border border-brand-gold/30 shadow-[0_0_50px_rgba(255,120,30,0.18)] p-2">
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-obsidian topo-lines">
        {photo ? (
          <img src={photo} alt={title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* contour rings */}
            <div className="absolute w-[85%] aspect-square rounded-full border border-brand-gold/15" />
            <div className="absolute w-[65%] aspect-square rounded-full border border-brand-ember/20 animate-reverse-spin" style={{ borderStyle: 'dashed' }} />
            <div className="absolute w-[45%] aspect-square rounded-full border border-brand-gold/25" />
            {/* mountain silhouette */}
            <svg viewBox="0 0 400 160" className="absolute bottom-0 left-0 w-full opacity-70" aria-hidden="true">
              <defs>
                <linearGradient id={`mtn-${variant}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FF5A1F" stopOpacity=".35" />
                  <stop offset="1" stopColor="#060504" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path d="M0 160 L0 110 L50 70 L85 95 L140 30 L180 80 L215 55 L260 100 L300 45 L345 90 L400 60 L400 160 Z" fill={`url(#mtn-${variant})`} />
              <path d="M140 30 L128 46 L140 42 L152 48 Z M300 45 L290 58 L301 55 L311 60 Z" fill="#FFE3A8" opacity=".8" />
            </svg>
            <div className="relative text-center">
              <div className="kinetic-title text-[7rem] sm:text-[9rem] font-black text-stroke-gold leading-none">AK</div>
              <div className="mt-2 text-[10px] font-mono tracking-[0.35em] text-brand-gold/80">ARVINEX · KANGRA</div>
            </div>
            {/* pin */}
            <div className="absolute top-[18%] right-[22%] flex flex-col items-center animate-float">
              <div className="w-4 h-4 rounded-full bg-brand-ember shadow-[0_0_18px_#FF5A1F]" />
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[10px] border-l-transparent border-r-transparent border-t-brand-ember -mt-1" />
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-obsidian/80 backdrop-blur-md border border-white/10">
          <div className="text-xs font-mono text-brand-gold tracking-wider uppercase mb-1">{label}</div>
          <div className="text-base font-bold text-white">{title}</div>
          <div className="text-xs text-gray-400 font-mono">{subtitle}</div>
        </div>
      </div>
    </div>
  );
};
