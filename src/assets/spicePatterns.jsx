import React from 'react';

export function BotanicalDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#E3B025]/50" />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#E3B025]"
      >
        <path
          d="M14 3C16.5 7.5 16.5 12.5 14 17C11.5 12.5 11.5 7.5 14 3Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M14 17C18.5 14.5 22.5 15.5 25 18C21 20 17 19.5 14 17Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          d="M14 17C9.5 14.5 5.5 15.5 3 18C7 20 11 19.5 14 17Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <circle cx="14" cy="22" r="1.5" fill="currentColor" />
      </svg>
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#E3B025]/50" />
    </div>
  );
}

export function SpiceArtwork({ spiceKey, className = '' }) {
  const artworkMap = {
    pepper: (
      <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
        <circle cx="60" cy="60" r="52" stroke="#E3B025" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="40" fill="#1A1919" stroke="#E3B025" strokeOpacity="0.35" strokeWidth="1.2" />
        <circle cx="50" cy="52" r="7" fill="#2E2C2C" stroke="#E3B025" strokeWidth="1.2" />
        <circle cx="68" cy="48" r="6.5" fill="#2E2C2C" stroke="#E3B025" strokeWidth="1.2" />
        <circle cx="59" cy="66" r="7.5" fill="#2E2C2C" stroke="#E3B025" strokeWidth="1.2" />
        <circle cx="72" cy="64" r="5.5" fill="#2E2C2C" stroke="#E3B025" strokeWidth="1.2" />
        <circle cx="46" cy="67" r="5" fill="#2E2C2C" stroke="#E3B025" strokeWidth="1.2" />
        <path d="M40 82C50 76 70 76 80 82" stroke="#E3B025" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    turmeric: (
      <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
        <circle cx="60" cy="60" r="52" stroke="#E3B025" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="40" fill="#1A1919" stroke="#E3B025" strokeOpacity="0.35" strokeWidth="1.2" />
        <path
          d="M36 68C44 58 58 54 74 56C82 57 86 62 82 67C76 74 56 76 36 68Z"
          fill="#E3B025"
          fillOpacity="0.18"
          stroke="#E3B025"
          strokeWidth="1.3"
        />
        <path
          d="M44 55C50 45 62 40 72 44C75 45 74 50 68 53"
          stroke="#E3B025"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <circle cx="60" cy="78" r="2" fill="#E3B025" />
        <circle cx="67" cy="79" r="1.5" fill="#E3B025" fillOpacity="0.7" />
        <circle cx="53" cy="79" r="1.5" fill="#E3B025" fillOpacity="0.7" />
      </svg>
    ),
    cinnamon: (
      <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
        <circle cx="60" cy="60" r="52" stroke="#E3B025" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="40" fill="#1A1919" stroke="#E3B025" strokeOpacity="0.35" strokeWidth="1.2" />
        <rect x="44" y="34" width="10" height="52" rx="5" transform="rotate(14 44 34)" stroke="#E3B025" strokeWidth="1.3" fill="#E3B025" fillOpacity="0.1" />
        <rect x="60" y="32" width="10" height="54" rx="5" transform="rotate(14 60 32)" stroke="#E3B025" strokeWidth="1.3" fill="#E3B025" fillOpacity="0.14" />
        <circle cx="47" cy="39" r="2.2" stroke="#E3B025" strokeWidth="1" />
        <circle cx="63" cy="37" r="2.2" stroke="#E3B025" strokeWidth="1" />
      </svg>
    ),
    tea: (
      <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
        <circle cx="60" cy="60" r="52" stroke="#E3B025" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="40" fill="#1A1919" stroke="#E3B025" strokeOpacity="0.35" strokeWidth="1.2" />
        <path
          d="M60 34C71 45 73 61 60 74C47 61 49 45 60 34Z"
          fill="#E3B025"
          fillOpacity="0.14"
          stroke="#E3B025"
          strokeWidth="1.3"
        />
        <path d="M60 36V76" stroke="#E3B025" strokeWidth="1.1" />
        <path d="M60 52L67 46M60 60L53 54" stroke="#E3B025" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M42 81C52 77 68 77 78 81" stroke="#E3B025" strokeOpacity="0.6" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  };

  return artworkMap[spiceKey] || artworkMap.cinnamon;
}
