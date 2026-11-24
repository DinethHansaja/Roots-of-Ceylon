import React from 'react';

const SIZE_CLASSES = {
  sm: 'h-10 w-auto',
  md: 'h-12 w-auto',
  lg: 'h-52 sm:h-64 w-auto',
};

export function BrandLogo({ showText = true, size = 'md', className = '' }) {
  const imgClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src="/assets/images/roots-of-ceylon-logo.png"
        alt="Roots of Ceylon — Experience the Spice Legacy"
        className={`${imgClass} object-contain shrink-0 drop-shadow-[0_2px_12px_rgba(227,176,37,0.15)]`}
        decoding="async"
      />

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
