'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';

const COLLECTIONS = [
  { id: 'sapphire', title: 'Sapphire', subtitle: 'Kashmir | Ceylon', icon: '💎' },
  { id: 'emerald', title: 'Emerald', subtitle: 'Colombian | Zambian', icon: '💚' },
  { id: 'tanzanite', title: 'Tanzanite', subtitle: 'AAA-Grade', icon: '💜' },
  { id: 'ruby', title: 'Ruby', subtitle: 'Pigeon Blood', icon: '❤️' },
];

export default function CollectionsPreview() {
  return (
    <section className="relative bg-obsidian py-32 lg:py-40 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[600px] h-[600px] bg-gold-royal/[0.02] rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-xl mb-20">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-10 h-px bg-gold-royal/60" />
            <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">
              Collections
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-cormorant font-light text-ivory/90 leading-[1.1] mb-5">
            Choose Your <span className="font-semibold gradient-gold-text">Legacy</span>
          </h2>
          <p className="text-base text-ivory/35 font-sans font-light leading-relaxed">
            Four rare gemstone families. Each hand-curated for rarity, crafted for generations.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {COLLECTIONS.map((col) => {
            const items = getProductsByCategory(col.id as 'sapphire' | 'emerald' | 'ruby' | 'tanzanite');
            const from = items.length ? Math.min(...items.map(p => p.price)) : 0;

            return (
              <Link key={col.id} href={`/vault?category=${col.id}`} className="group block">
                <div className="relative aspect-[3/4] bg-steel overflow-hidden mb-5
                              opacity-50 group-hover:opacity-100 transition-all duration-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[120px] select-none opacity-15 group-hover:opacity-30
                                  group-hover:scale-105 transition-all duration-700">
                      {col.icon}
                    </span>
                  </div>
                  <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-obsidian/90 to-transparent">
                    <div className="flex items-end justify-between">
                      <span className="text-sm font-sans text-ivory/70">${from.toLocaleString()}</span>
                      <span className="text-[10px] font-sans text-ivory/30">{items.length} pieces</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-cormorant font-semibold text-ivory/60
                             group-hover:text-ivory transition-colors duration-500 mb-1">
                  {col.title}
                </h3>
                <p className="text-[10px] font-sans tracking-[2px] uppercase text-ivory/25">{col.subtitle}</p>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-20 flex items-center gap-8">
          <Link href="/vault"
            className="group glass-rose px-8 py-4 inline-flex items-center gap-4 hover:bg-gold-royal/10 transition-all duration-500">
            <span className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/80">View All</span>
            <ArrowRight className="w-4 h-4 text-gold-royal group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
          <Link href="/contact"
            className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/30 hover:text-gold-royal transition-colors duration-500">
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
