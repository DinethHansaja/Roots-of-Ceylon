import React from 'react';

export function BrandLogo({ showText = true, size = 'md', className = '' }) {
  const iconDimensions = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-16 h-16',
  }[size] || 'w-11 h-11';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Crowned Sri Lankan Lion holding a bowl of aromatic spice above tropical leaves */}
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconDimensions} shrink-0`}
        aria-label="Roots of Ceylon Emblem"
      >
        <defs>
          <linearGradient id="rocGold" x1="10" y1="8" x2="70" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F5D36C" />
            <stop offset="50%" stopColor="#E3B025" />
            <stop offset="100%" stopColor="#B88610" />
          </linearGradient>
        </defs>

        {/* Outer Crest Ring */}
        <circle cx="40" cy="40" r="37" stroke="url(#rocGold)" strokeWidth="1.4" strokeOpacity="0.85" />
        <circle cx="40" cy="40" r="33" stroke="url(#rocGold)" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 2.5" />

        {/* Crown above Lion */}
        <path
          d="M29 19L32 12L36.5 16L40 10.5L43.5 16L48 12L51 19H29Z"
          stroke="url(#rocGold)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          fill="url(#rocGold)"
          fillOpacity="0.18"
        />

        {/* Stylized Lion Silhouette & Mane */}
        <path
          d="M35 23C31 23 28 26 28 30.5C28 33.5 30 35.5 31.5 37C30 39 29.5 42 31 45C32.5 47.5 35.5 49 39 49C42.5 49 45.5 47.5 46.5 44.5C47.5 41.5 46 38.5 44 37C45.5 35.5 47 33.5 47 30.5C47 26 44 23 40 23H35Z"
          stroke="url(#rocGold)"
          strokeWidth="1.5"
          fill="url(#rocGold)"
          fillOpacity="0.14"
        />
        {/* Lion Facial Detail & Crowned Brow */}
        <circle cx="37" cy="29.5" r="1.1" fill="url(#rocGold)" />
        <circle cx="42.5" cy="29.5" r="1.1" fill="url(#rocGold)" />
        <path d="M38.5 33L40 34.5L41.5 33" stroke="url(#rocGold)" strokeWidth="1.2" strokeLinecap="round" />

        {/* Extended Forearms Holding Aromatic Spice Bowl */}
        <path
          d="M30 41C25 41 23 43 24 46C25 48 28 48.5 32 48"
          stroke="url(#rocGold)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d="M47 41C52 41 54 43 53 46C52 48 49 48.5 45 48"
          stroke="url(#rocGold)"
          strokeWidth="1.4"
          strokeLinecap="round"
        />

        {/* Bowl of Aromatic Spice */}
        <path
          d="M27 48.5H53C51.5 54 46.5 57.5 40 57.5C33.5 57.5 28.5 54 27 48.5Z"
          fill="url(#rocGold)"
          fillOpacity="0.25"
          stroke="url(#rocGold)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        {/* Rising Aroma Wisps */}
        <path d="M36 45.5C35.2 43.8 36.8 42.5 36 40.8" stroke="url(#rocGold)" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M40 45C39.2 43 40.8 41.5 40 39.5" stroke="url(#rocGold)" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M44 45.5C43.2 43.8 44.8 42.5 44 40.8" stroke="url(#rocGold)" strokeWidth="1.1" strokeLinecap="round" />

        {/* Tropical Ceylon Leaves Base */}
        <path
          d="M40 60C33 60 26 62.5 21 66.5C27 67.5 34 66 40 62.5C46 66 53 67.5 59 66.5C54 62.5 47 60 40 60Z"
          fill="url(#rocGold)"
          fillOpacity="0.22"
          stroke="url(#rocGold)"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <path d="M40 57.5V69" stroke="url(#rocGold)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-serif text-lg sm:text-xl font-semibold tracking-[0.14em] text-[#F5F2EB] uppercase">
            Roots of Ceylon
          </span>
          <span className="text-[10px] tracking-[0.26em] text-[#E3B025] uppercase mt-1">
            Experience the Spice Legacy
          </span>
        </div>
      )}
    </div>
  );
}
