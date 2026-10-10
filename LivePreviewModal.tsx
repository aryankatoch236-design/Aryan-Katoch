import React, { useState } from 'react';
import { X, ExternalLink, RefreshCw, Smartphone, Monitor, Tablet, ShieldCheck } from 'lucide-react';
import { sound } from '../../audio/soundSystem';

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  client: string;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  client
}) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [iframeKey, setIframeKey] = useState<number>(0);

  if (!isOpen) return null;

  const reloadIframe = () => {
    sound.playClick();
    setIframeKey((prev) => prev + 1);
  };

  const getDeviceWidth = () => {
    switch (deviceView) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      case 'desktop':
      default:
        return 'max-w-6xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-obsidian/95 backdrop-blur-3xl animate-fadeIn">
      <div
        className={`w-full ${getDeviceWidth()} h-[92vh] flex flex-col rounded-3xl bg-[#0d0906] border-2 border-brand-gold/50 shadow-[0_0_80px_rgba(255,176,32,0.35)] overflow-hidden transition-all duration-500`}
      >
        {/* Browser Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5 bg-[#090604] border-b border-white/10 select-none">
          {/* Traffic Lights */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 flex items-center justify-center transition-colors group"
            >
              <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/80" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500/80" />

            <div className="hidden sm:flex items-center space-x-2 ml-4">
              <span className="text-xs font-display font-bold text-white tracking-wider">
                {title}
              </span>
              <span className="text-xs text-gray-500 font-mono">•</span>
              <span className="text-[11px] font-mono text-brand-gold">
                {client}
              </span>
            </div>
          </div>

          {/* Device Viewport Switcher */}
          <div className="hidden md:flex items-center space-x-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => {
                sound.playClick();
                setDeviceView('desktop');
              }}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all ${
                deviceView === 'desktop'
                  ? 'bg-brand-ember text-white shadow-[0_0_10px_rgba(255,90,31,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setDeviceView('tablet');
              }}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all ${
                deviceView === 'tablet'
                  ? 'bg-brand-ember text-white shadow-[0_0_10px_rgba(255,90,31,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                sound.playClick();
                setDeviceView('mobile');
              }}
              className={`p-1.5 rounded-lg text-xs font-mono flex items-center space-x-1 transition-all ${
                deviceView === 'mobile'
                  ? 'bg-brand-ember text-white shadow-[0_0_10px_rgba(255,90,31,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Actions: Reload & External Link */}
          <div className="flex items-center space-x-2">
            <button
              onClick={reloadIframe}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
              title="Reload Preview"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.playWhoosh()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-brand-ember/20 hover:bg-brand-ember/40 border border-brand-gold/40 text-brand-gold text-xs font-mono font-semibold transition-all group"
            >
              <span>OPEN NEW TAB</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Interactivity Iframe */}
        <div className="flex-1 bg-white relative overflow-hidden">
          <iframe
            key={iframeKey}
            src={url}
            title={title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
};
