import React from 'react';

const RealPalmSVG: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 360"
    width="360"
    height="360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g>
      <ellipse cx="100" cy="350" rx="60" ry="10" fill="#b2a16b" />
      <rect x="85" y="120" width="30" height="230" rx="15" fill="#8d6748" />
      <path d="M100 120C80 60 10 60 0 120C40 120 70 120 100 120Z" fill="#43e97b" />
      <path d="M100 120C120 60 190 60 200 120C160 120 130 120 100 120Z" fill="#38f9d7" />
      <path d="M100 120C90 30 170 0 190 40C160 70 120 100 100 120Z" fill="#43e97b" />
      <path d="M100 120C110 30 30 0 10 40C40 70 80 100 100 120Z" fill="#38f9d7" />
      <ellipse cx="100" cy="120" rx="20" ry="10" fill="#fbbf24" />
      <ellipse cx="100" cy="135" rx="7" ry="7" fill="#8d6748" />
      <ellipse cx="110" cy="137" rx="6" ry="6" fill="#b2a16b" />
      <ellipse cx="90" cy="137" rx="6" ry="6" fill="#b2a16b" />
    </g>
  </svg>
);

export default RealPalmSVG;
