import React from 'react';

interface NexiivaLogoProps {
  className?: string;
  height?: number | string;
}

export const NexiivaLogo: React.FC<NexiivaLogoProps> = ({
  className = '',
  height = 26,
}) => {
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      <img
        src="/assets/nexiiva_logo_dark.png"
        alt="NEXIIVA - Process Operator Training Simulator"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        className="w-auto object-contain"
      />
    </div>
  );
};
