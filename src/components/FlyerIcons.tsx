import React from 'react';

interface IconProps {
  className?: string;
  size?: number;
}

export const WebsiteIcon: React.FC<IconProps> = ({ className = 'w-10 h-10 text-blue-600', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export const MobileIcon: React.FC<IconProps> = ({ className = 'w-10 h-10 text-blue-600', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="14" height="20" x="5" y="2" rx="3" ry="3" />
    <path d="M11 18h2" />
  </svg>
);

export const SoftwareIcon: React.FC<IconProps> = ({ className = 'w-10 h-10 text-blue-600', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" y1="4" x2="10" y2="20" />
  </svg>
);

export const DatabaseIcon: React.FC<IconProps> = ({ className = 'w-10 h-10 text-blue-600', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v6c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    <path d="M3 11v6c0 1.66 4.03 3 9 3s9-1.34 9-3v-6" />
  </svg>
);

export const UIUXIcon: React.FC<IconProps> = ({ className = 'w-10 h-10 text-blue-600', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* Compass / drafting tool with hinge and crossbar exactly as shown on the flyer */}
    <circle cx="12" cy="5" r="2" />
    <path d="m11 7-6 13" />
    <path d="m13 7 6 13" />
    <path d="M7 14h10" />
    <circle cx="5" cy="20" r="1" fill="currentColor" />
    <circle cx="19" cy="20" r="1" fill="currentColor" />
  </svg>
);

export const ConsultingIcon: React.FC<IconProps> = ({ className = 'w-10 h-10 text-blue-600', size = 44 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {/* User profile with cogwheel gear as shown on the flyer */}
    <circle cx="9" cy="7" r="4" />
    <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2" />
    <circle cx="19" cy="11" r="2" />
    <path d="M19 7v2" />
    <path d="M19 13v2" />
    <path d="M16 11h2" />
    <path d="M20 11h2" />
    <path d="m17 9 1.5 1.5" />
    <path d="m19.5 11.5 1.5 1.5" />
    <path d="m21 9-1.5 1.5" />
    <path d="m18.5 11.5-1.5 1.5" />
  </svg>
);
