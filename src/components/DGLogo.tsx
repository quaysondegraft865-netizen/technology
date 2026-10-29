import React from 'react';

interface DGLogoProps {
  className?: string;
  size?: number;
}

export const DGLogo: React.FC<DGLogoProps> = ({ className = '', size = 48 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={(size * 42) / 48}
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="De-Graft Technologies Logo"
      >
        {/* Crisp white 'D' */}
        <path
          d="M15 15 H52 C74 15 88 28 88 50 C88 72 74 85 52 85 H15 V15 Z M32 30 V70 H52 C65 70 71 62 71 50 C71 38 65 30 52 30 H32 Z"
          fill="#FFFFFF"
        />

        {/* Dynamic bright cyan/electric blue 'G' swoosh */}
        <path
          d="M58 48 H95 V62 H74 C74 68 79 72 87 72 C93 72 97 68 98 64 L108 70 C104 80 96 85 86 85 C69 85 60 74 60 56 C60 52 61 48 63 45 L58 48 Z"
          fill="#0099FF"
        />
        {/* Accent corner notch */}
        <polygon points="95,48 108,35 108,48" fill="#00C4FF" />
      </svg>
    </div>
  );
};

export const BrandLockup: React.FC<{ light?: boolean }> = ({ light = true }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <span className={`text-xl sm:text-2xl font-black tracking-tight uppercase ${light ? 'text-white' : 'text-[#0B1E38]'}`}>
          DE-GRAFT
        </span>
        <span className="text-xl sm:text-2xl font-black tracking-tight uppercase text-[#0099FF]">
          TECHNOLOGIES
        </span>
      </div>
      <div className={`text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase ${light ? 'text-slate-300' : 'text-slate-600'}`}>
        INNOVATION <span className="text-[#0099FF]">|</span> SOLUTIONS <span className="text-[#0099FF]">|</span> IMPACT
      </div>
    </div>
  );
};
