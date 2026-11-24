import React from 'react';
import { Globe, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export function Footer() {
  return (
    <footer className="border-t border-[var(--border-gold)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="space-y-4">
            <BrandLogo size="md" />
            <p className="max-w-sm text-sm leading-relaxed text-[var(--text-secondary)]">
              Curating single-origin Sri Lankan spices and high-grown orthodox teas for
              discerning culinary houses, luxury hospitality, and private pantries worldwide.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-[var(--accent-gold)]">
              Export House &amp; Tasting Room
            </h3>
            <ul className="space-y-2.5 text-sm text-[var(--text-secondary)]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[var(--accent-gold)] shrink-0 mt-0.5" />
                <span>24 Horton Place, Cinnamon Gardens, Colombo 07, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span>concierge@rootsofceylon.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[var(--accent-gold)] shrink-0" />
                <span>Worldwide Air-Freight &amp; Express Export</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-serif text-lg font-semibold tracking-wide text-[var(--accent-gold)]">
              Export Standards
            </h3>
            <div className="rounded-xl border border-[var(--border-gold)] bg-[var(--bg-card)] p-4 space-y-2 transition-colors duration-300">
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)]">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Pure Ceylon Provenance</span>
              </div>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                Every lot is lab-tested for essential oil density, moisture, and purity—shipped
                hermetically sealed from harvest estates in Matale, Galle, Ampara, and Nuwara Eliya.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-8 text-xs text-[var(--text-secondary)] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Roots of Ceylon (Pvt) Ltd. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase text-[var(--accent-gold)]">
            Natural &bull; Healthy &bull; Quality &bull; Tropical &bull; Handcrafted
          </p>
        </div>
      </div>
    </footer>
  );
}
