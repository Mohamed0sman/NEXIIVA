import React from 'react';

interface NexiivaLogoProps {
  className?: string;
  height?: number | string;
}

export const NexiivaLogo: React.FC<NexiivaLogoProps> = ({
  className = '',
  height = 28,
}) => {
  const numericHeight = typeof height === 'number' ? height : parseInt(String(height)) || 28;
  const aspectRatio = 180 / 36;
  const width = numericHeight * aspectRatio;

  return (
    <div
      className={`relative inline-flex items-center select-none ${className}`}
      style={{ height: numericHeight }}
    >
      <svg
        width={width}
        height={numericHeight}
        viewBox="0 0 190 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        aria-label="NEXIIVA Logo"
      >
        <defs>
          {/* Metallic Silver-White Gradient for Typography */}
          <linearGradient id="metallicSilver" x1="0" y1="0" x2="0" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Electric Violet to Indigo Gradient for Chevron Left Wing */}
          <linearGradient id="violetChevron" x1="42" y1="8" x2="54" y2="28" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8E42FE" />
            <stop offset="60%" stopColor="#7B3CFC" />
            <stop offset="100%" stopColor="#491ACB" />
          </linearGradient>

          {/* Electric Violet Top-Right Wing */}
          <linearGradient id="violetWing" x1="56" y1="8" x2="68" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#8E42FE" />
          </linearGradient>

          {/* Electric Cobalt Blue Bottom-Right Wing */}
          <linearGradient id="cobaltWing" x1="56" y1="20" x2="68" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#3361FC" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* N */}
        <path
          d="M6 30V8H11.5L20 22V8H24.5V30H19.5L10.5 15.5V30H6Z"
          fill="url(#metallicSilver)"
        />

        {/* E */}
        <path
          d="M29 30V8H43V12.2H34V16.8H41.5V20.8H34V25.8H43.5V30H29Z"
          fill="url(#metallicSilver)"
        />

        {/* 3-PART GEOMETRIC X */}
        {/* Part 1: Left-pointing Chevron (>) */}
        <path
          d="M55 8L44 19L55 30H50L39 19L50 8H55Z"
          fill="url(#violetChevron)"
          filter="url(#logoGlow)"
        />

        {/* Part 2: Detached Top-Right Wing (/) */}
        <path
          d="M58 8L69 19H64L53 8H58Z"
          fill="url(#violetWing)"
          filter="url(#logoGlow)"
        />

        {/* Part 3: Detached Bottom-Right Wing (\) */}
        <path
          d="M53 30L64 19H69L58 30H53Z"
          fill="url(#cobaltWing)"
          filter="url(#logoGlow)"
        />

        {/* I (First) */}
        <path
          d="M76 30V8H80.5V30H76Z"
          fill="url(#metallicSilver)"
        />

        {/* I (Second) */}
        <path
          d="M86 30V8H90.5V30H86Z"
          fill="url(#metallicSilver)"
        />

        {/* V */}
        <path
          d="M96 8H100.8L106 23.5L111.2 8H116L108.5 30H103.5L96 8Z"
          fill="url(#metallicSilver)"
        />

        {/* A (Crossbar-free apex chevron /\) */}
        <path
          d="M121 30L130 8H134.5L143.5 30H138.5L132.2 14.5L126 30H121Z"
          fill="url(#metallicSilver)"
        />
      </svg>
    </div>
  );
};
