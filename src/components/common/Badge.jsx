import React from 'react';

const VARIANT_CLASSES = {
  gold: 'border-[#E3B025]/40 bg-[#E3B025]/10 text-[#E3B025]',
  subtle: 'border-[#E3B025]/20 bg-[#1A1919]/80 text-[#F5F2EB]/80',
  emerald: 'border-emerald-500/35 bg-emerald-500/10 text-emerald-300',
  amber: 'border-amber-400/35 bg-amber-400/10 text-amber-300',
  sky: 'border-sky-400/35 bg-sky-400/10 text-sky-300',
};

export function Badge({ children, variant = 'gold', className = '' }) {
  const styles = VARIANT_CLASSES[variant] || VARIANT_CLASSES.gold;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wider uppercase ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
