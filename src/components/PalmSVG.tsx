import React from "react";

const PalmSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 64 64"
    width="64"
    height="64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g>
      <ellipse cx="32" cy="60" rx="18" ry="4" fill="#b2a16b"/>
      <rect x="28" y="32" width="8" height="28" rx="4" fill="#8d6748"/>
      <path d="M32 36C28 24 12 24 8 32C16 32 24 36 32 36Z" fill="#43e97b"/>
      <path d="M32 36C36 24 52 24 56 32C48 32 40 36 32 36Z" fill="#38f9d7"/>
      <path d="M32 36C30 20 44 12 52 20C44 24 36 32 32 36Z" fill="#43e97b"/>
      <path d="M32 36C34 20 20 12 12 20C20 24 28 32 32 36Z" fill="#38f9d7"/>
      <ellipse cx="32" cy="36" rx="6" ry="4" fill="#fbbf24"/>
    </g>
  </svg>
);

export default PalmSVG;
