import React from 'react';
import { X, Zap } from 'lucide-react';
import { sound } from '../../audio/soundSystem';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative max-w-lg w-full p-8 rounded-3xl bg-gradient-to-b from-[#1a1008] to-[#090604] border border-brand-gold/50 shadow-[0_0_60px_rgba(255,176,32,0.3)] text-white">
        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-brand-gold mb-4">
          <Zap className="w-6 h-6 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase">
            EASTER EGG PROTOCOL UNLOCKED
          </span>
        </div>

        <h3 className="text-3xl font-display font-black tracking-tight text-white mb-2">
          ARVINEX VENTURE
        </h3>
        <p className="text-sm font-mono text-brand-gold mb-6">
          HYPERLOCAL MODE: ON
        </p>

        <div className="space-y-4 text-sm text-gray-300 leading-relaxed font-sans mb-6">
          <p>
            You found the secret. The valley is spinning at festival-season speed and every ember is out on the street.
          </p>
          <div className="p-4 rounded-xl bg-brand-ember/10 border border-brand-ember/30 font-mono text-xs text-brand-gold">
            "The best marketing in a small town still ends the same way: someone walks through your door and says, ‘I saw you.’"
          </div>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            onClose();
          }}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-ember to-brand-gold text-white font-mono font-bold tracking-wider hover:opacity-95 transition-opacity"
        >
          RESUME EXPERIENCE
        </button>
      </div>
    </div>
  );
};
