import React from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-gold)] bg-[var(--bg-secondary)] transition-colors duration-300">
      {/* Subtle radial luxury gold aura */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(227,176,37,0.45) 0%, rgba(200,150,30,0.08) 55%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)] px-4 py-1.5 text-xs font-medium tracking-[0.22em] text-[var(--accent-gold)] uppercase transition-colors duration-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Single-Origin Sri Lankan Reserve</span>
          </div>

          <div className="mb-8 flex justify-center">
            <BrandLogo showText={false} size="lg" />
          </div>

          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-7xl leading-[1.06] transition-colors duration-300">
            Experience the{' '}
            <span className="italic font-normal text-[var(--accent-gold)]">Spice Legacy</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg transition-colors duration-300">
            Harvested from ancient highland gardens and coastal spice estates across Ceylon.
            Unirradiated, single-origin botanicals sealed at peak essential-oil potency for the
            world’s finest kitchens.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-gold)] px-8 py-3.5 text-xs font-bold tracking-[0.18em] text-[var(--accent-gold-contrast)] uppercase transition-all hover:bg-[var(--accent-gold-hover)] shadow-lg shadow-[#E3B025]/15"
            >
              <span>Explore Reserve Collection</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
            <a
              href="#heritage"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-gold)] bg-[var(--bg-card)] px-8 py-3.5 text-xs font-semibold tracking-[0.18em] text-[var(--text-primary)] uppercase transition-all hover:border-[var(--accent-gold)] hover:text-[var(--accent-gold)]"
            >
              <span>Our Heritage</span>
            </a>
          </div>

          {/* 5 Brand Pillars Strip */}
          <div
            id="values"
            className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[var(--border-subtle)] pt-8 text-xs font-medium tracking-[0.25em] text-[var(--accent-gold)] uppercase"
          >
            <span>Natural</span>
            <span className="opacity-40">&bull;</span>
            <span>Healthy</span>
            <span className="opacity-40">&bull;</span>
            <span>Quality</span>
            <span className="opacity-40">&bull;</span>
            <span>Tropical</span>
            <span className="opacity-40">&bull;</span>
            <span>Handcrafted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
