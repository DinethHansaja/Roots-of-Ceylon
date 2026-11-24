import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useStore();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
      className={`relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-[var(--border-gold)] bg-[var(--bg-secondary)] p-1 transition-colors duration-300 hover:border-[var(--border-gold-strong)] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-gold)] ${className}`}
    >
      {/* Background Icons */}
      <span className="flex w-full items-center justify-between px-1 pointer-events-none">
        <Moon
          className={`h-3.5 w-3.5 transition-opacity duration-300 ${
            isLight ? 'text-[var(--text-secondary)] opacity-65' : 'opacity-0'
          }`}
        />
        <Sun
          className={`h-3.5 w-3.5 transition-opacity duration-300 ${
            isLight ? 'opacity-0' : 'text-[var(--text-secondary)] opacity-75'
          }`}
        />
      </span>

      {/* Animated Gold Thumb */}
      <span
        className={`absolute left-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent-gold)] text-[var(--accent-gold-contrast)] shadow-md transition-transform duration-300 ease-out ${
          isLight ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isLight ? (
          <Sun className="h-3.5 w-3.5" strokeWidth={2.2} />
        ) : (
          <Moon className="h-3.5 w-3.5" strokeWidth={2.2} />
        )}
      </span>
    </button>
  );
}
