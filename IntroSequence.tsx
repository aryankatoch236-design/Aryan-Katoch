import React, { useEffect, useState } from 'react';
import { sound } from '../../audio/soundSystem';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<number>(0);

  useEffect(() => {
    sound.playPulse();

    const t1 = setTimeout(() => {
      setPhase(1);
      sound.playHover(600);
    }, 700);

    const t2 = setTimeout(() => {
      setPhase(2);
      sound.playHover(900);
    }, 1500);

    const t3 = setTimeout(() => {
      setPhase(3);
      sound.playWhoosh();
    }, 2400);

    const t4 = setTimeout(() => {
      onComplete();
    }, 2900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#060504] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none select-none ${
        phase === 3 ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-2.5 h-2.5 rounded-full bg-brand-gold shadow-[0_0_30px_#FFB020] animate-ping" />
        <div className="absolute w-20 h-20 rounded-full border border-brand-ember/30 animate-spin" />
        <div className="absolute w-36 h-36 rounded-full border border-brand-gold/20 animate-reverse-spin" />
      </div>

      <div className="mt-8 text-center space-y-2 px-4">
        <div
          className={`text-xs sm:text-sm font-mono tracking-[0.3em] text-gray-400 transition-all duration-700 ${
            phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          ARYAN KATOCH
        </div>

        <div
          className={`text-sm sm:text-base font-mono tracking-[0.25em] text-brand-gold font-bold transition-all duration-700 delay-100 ${
            phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          DIRECTOR / STRATEGY / GROUND / GROWTH
        </div>
      </div>
    </div>
  );
};
