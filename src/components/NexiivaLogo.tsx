import React from 'react';

interface NexiivaLogoProps {
  className?: string;
  height?: number | string;
  variant?: 'full' | 'mark';
}

export const NexiivaLogo: React.FC<NexiivaLogoProps> = ({
  className = '',
  height = 36,
}) => {
  return (
    <div className={`relative inline-flex items-center select-none group ${className}`}>
      {/* Subtle brand glow behind the logo */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/25 via-indigo-600/20 to-blue-600/25 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
      <img
        src="/assets/nexiiva_official_logo.png"
        alt="NEXIIVA - Process Operator Training Simulator"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className="w-auto object-contain relative z-10 brightness-110 contrast-105 filter drop-shadow-[0_2px_14px_rgba(142,66,254,0.4)]"
      />
    </div>
  );
};
