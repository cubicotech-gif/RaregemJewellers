'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';

const COLLECTIONS = [
  {
    id: 'sapphire',
    title: 'Sapphire',
    subtitle: 'Kashmir | Ceylon | Australian',
    description: 'The blue kings covet. From Himalayan peaks to Ceylon mines.',
    icon: '💎',
    gradient: 'from-blue-900/20 via-blue-800/10 to-transparent',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(59,130,246,0.15)]',
  },
  {
    id: 'emerald',
    title: 'Emerald',
    subtitle: 'Colombian | Zambian',
    description: 'Green with intent. Muzo mines to African depths.',
    icon: '💚',
    gradient: 'from-emerald-900/20 via-emerald-800/10 to-transparent',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(16,185,129,0.15)]',
  },
  {
    id: 'tanzanite',
    title: 'Tanzanite',
    subtitle: 'AAA-Grade | Violet',
    description: '1000x rarer than diamond. Found in only 14km\u00B2 on Earth.',
    icon: '💜',
    gradient: 'from-purple-900/20 via-purple-800/10 to-transparent',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(168,85,247,0.15)]',
  },
  {
    id: 'ruby',
    title: 'Ruby',
    subtitle: 'Pigeon Blood | Burmese',
    description: 'Blood and fire. Mogok Valley legends.',
    icon: '❤️',
    gradient: 'from-red-900/20 via-red-800/10 to-transparent',
    accentColor: 'text-red-400',
    borderColor: 'border-red-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(239,68,68,0.15)]',
  },
];

export default function CollectionsPreview() {
  return (
    <section className="relative bg-black py-20 lg:py-32 overflow-hidden">
      {/* Background gradient accent */}
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

          <p className="text-lg text-white/60 max-w-2xl mx-auto font-cormorant italic">
            Four elements. Four paths to immortality. Each collection
            hand-curated for rarity, crafted for generations.
          </p>
        </div>

        {/* COLLECTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {COLLECTIONS.map((collection, index) => {
            const collectionProducts = getProductsByCategory(collection.id as 'sapphire' | 'emerald' | 'ruby' | 'tanzanite');
            const priceFrom = collectionProducts.length > 0
              ? Math.min(...collectionProducts.map(p => p.price))
              : 0;

            return (
              <Link
                key={collection.id}
                href={`/vault?category=${collection.id}`}
                className={`
                  group relative aspect-[3/4] bg-gradient-to-b ${collection.gradient}
                  border ${collection.borderColor} overflow-hidden
                  transition-all duration-700 hover:-translate-y-3
                  ${collection.hoverGlow}
                `}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0"
                       style={{
                         backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
                       }}
                  />
                </div>

                {/* Icon - Large Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                              text-[180px] opacity-10 group-hover:opacity-20
                              transition-all duration-700 group-hover:scale-110 select-none">
                  {collection.icon}
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">

                  {/* Top Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl select-none">{collection.icon}</span>
                      {index === 0 && (
                        <div className="bg-gold-royal px-2 py-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-black" />
                          <span className="text-[9px] font-bold tracking-[2px] text-black uppercase">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    <h3 className={`
                      text-3xl font-bold font-playfair mb-2
                      ${collection.accentColor} group-hover:text-gold-royal transition-colors duration-500
                    `}>
                      {collection.title}
                    </h3>

                    <p className="text-sm text-white/50 tracking-wider mb-4">
                      {collection.subtitle}
                    </p>

                    <p className="text-sm text-white/70 leading-relaxed font-cormorant">
                      {collection.description}
                    </p>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <p className="text-[10px] text-white/40 tracking-[2px] uppercase mb-1">
                          From
                        </p>
                        <p className="text-2xl font-bold text-gold-royal font-playfair">
                          ${priceFrom.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/40 tracking-[2px] uppercase mb-1">
                          In Stock
                        </p>
                        <p className="text-xl font-bold text-white">
                          {collectionProducts.length}
                        </p>
                      </div>
                    </div>

                    <div className={`
                      flex items-center justify-between px-4 py-3
                      border ${collection.borderColor} bg-black/30 backdrop-blur-sm
                      group-hover:bg-black/50 transition-all duration-300
                    `}>
                      <span className="text-[11px] font-bold tracking-[2px] uppercase text-white/90">
                        Explore
                      </span>
                      <ArrowRight className={`
                        w-4 h-4 ${collection.accentColor}
                        group-hover:translate-x-1 transition-transform duration-300
                      `} />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                  -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-16 pt-16 border-t border-white/5">
          <p className="text-white/60 mb-6 font-cormorant italic text-lg">
            Can&apos;t decide? Each stone has a story. Let us help you find yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vault"
              className="px-8 py-4 bg-transparent border-2 border-gold-royal
                       hover:bg-gold-royal transition-all duration-500 group"
            >
              <span className="text-[13px] font-bold tracking-[3px] uppercase text-gold-royal
                             group-hover:text-black transition-colors inline-flex items-center gap-2">
                View All Collections
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/contact"
              className="px-8 py-4 bg-transparent border border-white/20
                       hover:border-gold-royal/50 transition-all duration-300"
            >
              <span className="text-[13px] font-medium tracking-[2px] uppercase text-white/80
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
