import React from 'react';

const VARIANT_CLASSES = {
  gold: 'border-[var(--border-gold-strong)] bg-[var(--accent-gold)]/12 text-[var(--accent-gold)]',
  subtle: 'border-[var(--border-gold)] bg-[var(--bg-secondary)] text-[var(--text-primary)]/85',
  emerald: 'border-emerald-600/35 bg-emerald-500/12 text-emerald-700 dark:text-emerald-300',
  amber: 'border-amber-600/35 bg-amber-500/12 text-amber-700 dark:text-amber-300',
  sky: 'border-sky-600/35 bg-sky-500/12 text-sky-700 dark:text-sky-300',
};

export function Badge({ children, variant = 'gold', className = '' }) {
  const styles = VARIANT_CLASSES[variant] || VARIANT_CLASSES.gold;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wider uppercase transition-colors duration-300 ${styles} ${className}`}
    >
      {children}
    </span>
  );
}
