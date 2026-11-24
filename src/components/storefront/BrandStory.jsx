import React from 'react';
import { Leaf, HeartHandshake, Award, Sun, Sparkles } from 'lucide-react';
import { BotanicalDivider } from '../../assets/spicePatterns';

const VALUES = [
  {
    icon: Leaf,
    title: 'Natural',
    description:
      'Grown in mineral-rich tropical soils without synthetic pesticides, artificial dyes, or irradiation.',
  },
  {
    icon: HeartHandshake,
    title: 'Healthy',
    description:
      'Ultra-low coumarin Alba cinnamon and 6.2% curcumin turmeric—preserved for pure functional potency.',
  },
  {
    icon: Award,
    title: 'Quality',
    description:
      'Export-grade single-estate lots inspected for essential-oil density, aroma, and crisp moisture balance.',
  },
  {
    icon: Sun,
    title: 'Tropical',
    description:
      'Nurtured by Sri Lanka’s monsoon rains, coastal sea breezes, and misty central highland altitudes.',
  },
  {
    icon: Sparkles,
    title: 'Handcrafted',
    description:
      'Peeled, rolled, sun-cured, and orthodox-withered by generational artisans who honor centuries-old craft.',
  },
];

export function BrandStory() {
  return (
    <section
      id="heritage"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] py-20 transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.24em] text-[var(--accent-gold)] uppercase">
            The Ceylon Promise
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            From Mist-Kissed Estates to Your Table
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            For centuries, merchants sailed the Indian Ocean seeking the true spices of Serendib.
            Roots of Ceylon preserves that heritage—partnering directly with family estates to
            deliver unblended, small-batch harvests.
          </p>
          <BotanicalDivider className="mt-8" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="luxury-card gold-border-hover rounded-2xl p-6"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-gold)] bg-[var(--accent-gold)]/12 text-[var(--accent-gold)]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
