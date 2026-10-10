import React from 'react';
import { CONTACT_INFO } from '../../data/portfolioData';
import { sound } from '../../audio/soundSystem';
import { MessageCircle } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        href={CONTACT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sound.playClick()}
        onMouseEnter={() => sound.playHover(1050)}
        className="group relative flex items-center justify-center p-3.5 sm:p-4 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_40px_rgba(16,185,129,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
        title={`Chat on WhatsApp with Aryan Katoch (${CONTACT_INFO.phone})`}
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-300 animate-ping" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-obsidian" />

        <MessageCircle className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />

        <div className="absolute right-full mr-3 hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[#120c07]/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-mono font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all pointer-events-none shadow-[0_5px_20px_rgba(0,0,0,0.8)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CHAT WITH ARYAN ({CONTACT_INFO.phone})</span>
        </div>
      </a>
    </aside>
  );
};
