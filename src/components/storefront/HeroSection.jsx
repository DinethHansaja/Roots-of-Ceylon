import React from 'react';
import { ArrowDownRight, Sparkles } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-[#E3B025]/20 bg-[#1A1919]">
      {/* Subtle radial luxury gold aura */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(227,176,37,0.45) 0%, rgba(36,35,35,0.1) 55%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#E3B025]/35 bg-[#242323]/80 px-4 py-1.5 text-xs font-medium tracking-[0.22em] text-[#E3B025] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Single-Origin Sri Lankan Reserve</span>
          </div>

          <div className="mb-8 flex justify-center">
            <BrandLogo showText={false} size="lg" />
          </div>

          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#F5F2EB] sm:text-6xl lg:text-7xl leading-[1.06]">
            Experience the{' '}
            <span className="italic font-normal text-[#E3B025]">Spice Legacy</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#B8B2A6] sm:text-lg">
            Harvested from ancient highland gardens and coastal spice estates across Ceylon.
            Unirradiated, single-origin botanicals sealed at peak essential-oil potency for the
            world’s finest kitchens.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-full bg-[#E3B025] px-8 py-3.5 text-xs font-bold tracking-[0.18em] text-[#1A1919] uppercase transition-all hover:bg-[#F2CC59] shadow-lg shadow-[#E3B025]/10"
            >
              <span>Explore Reserve Collection</span>
              <ArrowDownRight className="w-4 h-4" />
            </a>
            <a
              href="#heritage"
              className="inline-flex items-center gap-2 rounded-full border border-[#E3B025]/35 bg-[#242323]/70 px-8 py-3.5 text-xs font-semibold tracking-[0.18em] text-[#F5F2EB] uppercase transition-all hover:border-[#E3B025] hover:text-[#E3B025]"
            >
              <span>Our Heritage</span>
            </a>
          </div>

          {/* 5 Brand Pillars Strip */}
          <div
            id="values"
            className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-[#E3B025]/15 pt-8 text-xs font-medium tracking-[0.25em] text-[#E3B025]/90 uppercase"
          >
            <span>Natural</span>
            <span className="text-[#E3B025]/35">&bull;</span>
            <span>Healthy</span>
            <span className="text-[#E3B025]/35">&bull;</span>
            <span>Quality</span>
            <span className="text-[#E3B025]/35">&bull;</span>
            <span>Tropical</span>
            <span className="text-[#E3B025]/35">&bull;</span>
            <span>Handcrafted</span>
          </div>
        </div>
      </div>
    </section>
  );
}
