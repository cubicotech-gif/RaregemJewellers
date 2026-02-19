// components/CollectionsPreview.tsx
'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';

const COLLECTIONS = [
  {
    id: 'sapphire',
    title: 'SAPPHIRE',
    subtitle: 'Kashmir • Ceylon • Australian',
    description: 'The blue kings covet. From Himalayan peaks to Ceylon mines.',
    icon: '💎',
    gradient: 'from-blue-900/20 via-blue-800/10 to-transparent',
    accentColor: 'text-blue-400',
    borderColor: 'border-blue-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(59,130,246,0.3)]'
  },
  {
    id: 'emerald',
    title: 'EMERALD',
    subtitle: 'Colombian • Zambian',
    description: 'Green with intent. Muzo mines to African depths.',
    icon: '💚',
    gradient: 'from-emerald-900/20 via-emerald-800/10 to-transparent',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(16,185,129,0.3)]'
  },
  {
    id: 'tanzanite',
    title: 'TANZANITE',
    subtitle: 'AAA-Grade • Violet',
    description: '1000x rarer than diamond. Found in only 14km² on Earth.',
    icon: '💜',
    gradient: 'from-purple-900/20 via-purple-800/10 to-transparent',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(168,85,247,0.3)]'
  },
  {
    id: 'ruby',
    title: 'RUBY',
    subtitle: 'Pigeon Blood • Burmese',
    description: 'Blood and fire. Mogok Valley legends.',
    icon: '❤️',
    gradient: 'from-red-900/20 via-red-800/10 to-transparent',
    accentColor: 'text-red-400',
    borderColor: 'border-red-500/30',
    hoverGlow: 'hover:shadow-[0_0_60px_rgba(239,68,68,0.3)]'
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
            <div className="w-16 h-[1px] bg-gold-royal" />
            <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
              THE COLLECTIONS
            </span>
            <div className="w-16 h-[1px] bg-gold-royal" />
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
            const products = getProductsByCategory(collection.id as any);
            const priceFrom = products.length > 0 
              ? Math.min(...products.map(p => p.price))
              : 0;

            return (
              <Link
                key={collection.id}
                href={`/collections/${collection.id}`}
                className={`
                  group relative aspect-[3/4] bg-gradient-to-b ${collection.gradient}
                  border ${collection.borderColor} overflow-hidden
                  transition-all duration-700 hover:-translate-y-3
                  ${collection.hoverGlow}
                `}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
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
                              transition-all duration-700 group-hover:scale-110">
                  {collection.icon}
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8">
                  
                  {/* Top Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{collection.icon}</span>
                      {index === 0 && (
                        <div className="bg-gold-royal px-2 py-1 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-black" />
                          <span className="text-[9px] font-bold tracking-[2px] text-black">
                            FEATURED
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
                    
                    <p className="text-sm text-white/50 tracking-wider mb-4 font-spacemono">
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
                          FROM
                        </p>
                        <p className="text-2xl font-bold text-gold-royal font-playfair">
                          ${priceFrom.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-white/40 tracking-[2px] uppercase mb-1">
                          IN STOCK
                        </p>
                        <p className="text-xl font-bold text-white">
                          {products.length}
                        </p>
                      </div>
                    </div>

                    <div className={`
                      flex items-center justify-between px-4 py-3
                      border ${collection.borderColor} bg-black/30 backdrop-blur-sm
                      group-hover:bg-black/50 transition-all duration-300
                    `}>
                      <span className="text-[11px] font-bold tracking-[2px] uppercase text-white/90">
                        EXPLORE
                      </span>
                      <ArrowRight className={`
                        w-4 h-4 ${collection.accentColor}
                        group-hover:translate-x-1 transition-transform duration-300
                      `} />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className={`
                  absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500
                `} />

                {/* Shimmer Effect */}
                <div className={`
                  absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                  -translate-x-full group-hover:translate-x-full transition-transform duration-1000
                `} />
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center mt-16 pt-16 border-t border-white/5">
          <p className="text-white/60 mb-6 font-cormorant italic text-lg">
            Can't decide? Each stone has a story. Let us help you find yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vault"
              className="px-8 py-4 bg-transparent border-2 border-gold-royal
                       hover:bg-gold-royal transition-all duration-500 group"
            >
              <span className="text-[13px] font-bold tracking-[3px] uppercase text-gold-royal 
                             group-hover:text-black transition-colors inline-flex items-center gap-2">
                VIEW ALL COLLECTIONS
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
                BOOK CONSULTATION
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════
// ALTERNATIVE: HORIZONTAL SCROLL VERSION (More Dramatic)
// ═══════════════════════════════════════════════════════════

export function CollectionsHorizontalScroll() {
  return (
    <section className="relative bg-gradient-to-b from-black via-obsidian to-black py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16 px-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-[1px] bg-gold-royal" />
            <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
              THE VAULT
            </span>
            <div className="w-16 h-[1px] bg-gold-royal" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white font-playfair mb-4">
            Rarity. Verified. Vaulted.
          </h2>
        </div>

        {/* HORIZONTAL SCROLL */}
        <div className="overflow-x-auto scrollbar-hide px-6 pb-8 -mx-6">
          <div className="flex gap-6 lg:gap-8" style={{ width: 'max-content' }}>
            {COLLECTIONS.map((collection, index) => {
              const products = getProductsByCategory(collection.id as any);
              const priceFrom = products.length > 0 
                ? Math.min(...products.map(p => p.price))
                : 0;

              return (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.id}`}
                  className={`
                    group relative w-[300px] lg:w-[360px] aspect-[3/4]
                    bg-gradient-to-b ${collection.gradient}
                    border ${collection.borderColor} overflow-hidden
                    transition-all duration-700 hover:-translate-y-3
                    ${collection.hoverGlow}
                  `}
                >
                  {/* Same content as grid version */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                text-[200px] opacity-10 group-hover:opacity-20 
                                transition-all duration-700">
                    {collection.icon}
                  </div>

                  <div className="relative h-full flex flex-col justify-between p-8">
                    <div>
                      <span className="text-5xl mb-4 block">{collection.icon}</span>
                      <h3 className={`text-3xl font-bold font-playfair mb-2 ${collection.accentColor}`}>
                        {collection.title}
                      </h3>
                      <p className="text-sm text-white/50 tracking-wider mb-4">
                        {collection.subtitle}
                      </p>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {collection.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-end justify-between mb-4">
                        <div>
                          <p className="text-[10px] text-white/40 uppercase mb-1">FROM</p>
                          <p className="text-2xl font-bold text-gold-royal">
                            ${priceFrom.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-white/40 uppercase mb-1">PIECES</p>
                          <p className="text-xl font-bold text-white">{products.length}</p>
                        </div>
                      </div>

                      <div className={`flex items-center justify-between px-4 py-3 border ${collection.borderColor}`}>
                        <span className="text-[11px] font-bold tracking-[2px] uppercase text-white/90">
                          EXPLORE
                        </span>
                        <ArrowRight className={`w-4 h-4 ${collection.accentColor}`} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="text-center mt-8 px-6">
          <p className="text-xs text-white/40 tracking-[2px] uppercase">
            ← Scroll to explore all collections →
          </p>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
