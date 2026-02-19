'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';

const COLLECTIONS = [
  {
    id: 'sapphire',
    title: 'Sapphire',
    subtitle: 'Kashmir | Ceylon | Australian',
    description: 'The blue kings covet. From Himalayan peaks to Ceylon mines.',
    icon: '💎',
    gradient: 'from-blue-900/40 via-blue-800/20 to-black',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'emerald',
    title: 'Emerald',
    subtitle: 'Colombian | Zambian',
    description: 'Green with intent. Muzo mines to African depths.',
    icon: '💚',
    gradient: 'from-emerald-900/40 via-emerald-800/20 to-black',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
  },
  {
    id: 'tanzanite',
    title: 'Tanzanite',
    subtitle: 'AAA-Grade | Violet',
    description: '1000x rarer than diamond. Found in only 14km\u00B2 on Earth.',
    icon: '💜',
    gradient: 'from-purple-900/40 via-purple-800/20 to-black',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 'ruby',
    title: 'Ruby',
    subtitle: 'Pigeon Blood | Burmese',
    description: 'Blood and fire. Mogok Valley legends.',
    icon: '❤️',
    gradient: 'from-red-900/40 via-red-800/20 to-black',
    accentColor: 'text-red-400',
    borderColor: 'border-red-500/20',
  },
];

export default function CollectionsPreview() {
  return (
    <section className="relative bg-black py-20 lg:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                      bg-gold-royal/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gold-royal" />
            <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
              The Collections
            </span>
            <div className="w-16 h-px bg-gold-royal" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white font-playfair mb-4">
            Choose Your Legacy
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto font-cormorant italic">
            Four elements. Four paths to immortality. Each collection
            hand-curated for rarity, crafted for generations.
          </p>
        </div>

        {/* COLLECTIONS GRID - Frank Jewelry inspired opacity hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {COLLECTIONS.map((collection) => {
            const collectionProducts = getProductsByCategory(collection.id as 'sapphire' | 'emerald' | 'ruby' | 'tanzanite');
            const priceFrom = collectionProducts.length > 0
              ? Math.min(...collectionProducts.map(p => p.price))
              : 0;

            return (
              <Link
                key={collection.id}
                href={`/vault?category=${collection.id}`}
                className="group block"
              >
                {/* Image Area - Opacity transition on hover */}
                <div className={`
                  relative aspect-[3/4] bg-gradient-to-b ${collection.gradient}
                  border ${collection.borderColor} overflow-hidden mb-5
                  opacity-50 group-hover:opacity-100 transition-all duration-700
                `}>
                  {/* Background icon */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                text-[150px] opacity-20 group-hover:opacity-40
                                transition-all duration-700 group-hover:scale-110 select-none">
                    {collection.icon}
                  </div>

                  {/* Bottom gradient overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6
                                bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] text-white/40 tracking-[2px] uppercase mb-1">From</p>
                        <p className="text-xl font-bold text-white font-playfair">
                          ${priceFrom.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/40 tracking-[2px] uppercase mb-1">Pieces</p>
                        <p className="text-xl font-bold text-white font-playfair">
                          {collectionProducts.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Shimmer */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                                -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* Content - Clean minimal */}
                <div className="space-y-2">
                  <h3 className={`text-xl font-bold font-playfair ${collection.accentColor}
                               group-hover:text-gold-royal transition-colors duration-500`}>
                    {collection.title}
                  </h3>
                  <p className="text-[11px] text-white/40 tracking-wider">
                    {collection.subtitle}
                  </p>
                  <p className="text-sm text-white/50 font-cormorant italic">
                    {collection.description}
                  </p>

                  {/* Explore link */}
                  <div className="flex items-center gap-2 pt-2
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] tracking-[2px] uppercase text-gold-royal font-medium">
                      Explore Collection
                    </span>
                    <ArrowRight className="w-3 h-3 text-gold-royal group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-16 pt-16 border-t border-white/5">
          <p className="text-white/50 mb-6 font-cormorant italic text-lg">
            Can&apos;t decide? Each stone has a story. Let us help you find yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vault"
              className="group inline-flex items-center gap-3 px-10 py-4
                       bg-transparent border border-gold-royal
                       hover:bg-gold-royal transition-all duration-500"
            >
              <span className="text-[12px] font-bold tracking-[3px] uppercase text-gold-royal
                             group-hover:text-black transition-colors">
                View All Collections
              </span>
              <ArrowRight className="w-4 h-4 text-gold-royal group-hover:text-black group-hover:translate-x-1 transition-all" />
            </Link>

            <Link
              href="/contact"
              className="px-10 py-4 bg-transparent border border-white/20
                       hover:border-gold-royal/50 transition-all duration-300"
            >
              <span className="text-[12px] font-medium tracking-[2px] uppercase text-white/60
                             hover:text-gold-royal transition-colors">
                Book Consultation
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
