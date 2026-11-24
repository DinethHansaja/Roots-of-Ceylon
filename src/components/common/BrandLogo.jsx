import React from 'react';

const SIZE_CLASSES = {
  sm: 'h-10 w-auto',
  md: 'h-12 w-auto',
  lg: 'h-56 sm:h-72 md:h-80 w-auto',
};

export function BrandLogo({ showText = true, size = 'md', className = '' }) {
  const imgClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src="/assets/images/roots-of-ceylon-logo.png"
        alt="Roots of Ceylon — Experience the Spice Legacy"
        className={`${imgClass} object-contain shrink-0 brand-logo-img`}
        decoding="async"
      />

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-serif text-base sm:text-xl font-semibold tracking-[0.14em] text-[var(--text-primary)] uppercase transition-colors duration-300">
            Roots of Ceylon
          </span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.24em] text-[var(--accent-gold)] uppercase mt-1 transition-colors duration-300">
            Experience the Spice Legacy
          </span>
        </div>
      )}
    </div>
  );
}
