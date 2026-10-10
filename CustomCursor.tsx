import React, { useEffect, useState } from 'react';

interface CustomCursorProps {
  cursorText?: string;
  cursorVariant?: 'default' | 'pointer' | 'drag' | 'view' | 'talk' | 'egg';
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  cursorText = '',
  cursorVariant = 'default'
}) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isExpanded = !!cursorText || cursorVariant !== 'default';

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        className={`rounded-full transition-all duration-300 ${
          isExpanded
            ? 'w-16 h-16 bg-brand-gold/15 border border-brand-gold/60 backdrop-blur-sm'
            : 'w-3 h-3 bg-brand-gold shadow-[0_0_15px_#FFB020]'
        } flex items-center justify-center`}
      >
        {cursorText && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-brand-gold uppercase select-none px-1 text-center leading-none animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
