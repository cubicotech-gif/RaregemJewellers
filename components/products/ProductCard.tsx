'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/data/products';

const CATEGORY_ICONS: Record<string, string> = {
  sapphire: '💎',
  emerald: '💚',
  ruby: '❤️',
  tanzanite: '💜',
  tourmaline: '⚡',
  diamond: '⚫',
  alexandrite: '🔮',
};

const CATEGORY_GRADIENTS: Record<string, string> = {
  sapphire: 'from-blue-900/30 via-blue-800/10 to-obsidian',
  emerald: 'from-emerald-900/30 via-emerald-800/10 to-obsidian',
  ruby: 'from-red-900/30 via-red-800/10 to-obsidian',
  tanzanite: 'from-purple-900/30 via-purple-800/10 to-obsidian',
  tourmaline: 'from-cyan-900/30 via-cyan-800/10 to-obsidian',
  diamond: 'from-gray-800/30 via-gray-700/10 to-obsidian',
  alexandrite: 'from-violet-900/30 via-violet-800/10 to-obsidian',
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const icon = CATEGORY_ICONS[product.category] || '💎';
  const gradient = CATEGORY_GRADIENTS[product.category] || CATEGORY_GRADIENTS.sapphire;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      quantity: 1,
      gem_type: product.gemstone.type,
      metal_type: product.metal.type,
    });
  };

  return (
    <div
      className="group relative bg-obsidian border border-white/5 overflow-hidden
                 transition-all duration-500 hover:border-gold-royal/40 hover:-translate-y-2
                 hover:shadow-luxury-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-square bg-black overflow-hidden">
        <Link href={`/products/${product.slug}`}>
          <div className="relative w-full h-full">
            {/* Main Image - Gradient placeholder with gemstone icon */}
            <div className={`
              absolute inset-0 transition-all duration-700
              ${isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}
            `}>
              <div className={`w-full h-full bg-gradient-to-br ${gradient}
                            flex items-center justify-center`}>
                <span className="text-6xl opacity-30 select-none">
                  {icon}
                </span>
              </div>
            </div>

            {/* Hover Image */}
            {product.images.length > 1 && (
              <div className={`
                absolute inset-0 transition-all duration-700
                ${isHovered ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
              `}>
                <div className={`w-full h-full bg-gradient-to-tl ${gradient}
                              flex items-center justify-center`}>
                  <span className="text-7xl opacity-40 animate-pulse select-none">
                    {icon}
                  </span>
                </div>
              </div>
            )}

            {/* Shimmer Overlay on Hover */}
            <div className={`
              absolute inset-0 bg-gradient-to-r from-transparent via-gold-royal/10 to-transparent
              -translate-x-full transition-transform duration-1000
              ${isHovered ? 'translate-x-full' : ''}
            `} />
          </div>
        </Link>

        {/* BADGES */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.featured && (
            <div className="bg-gold-royal px-3 py-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-black" />
              <span className="text-[10px] font-bold tracking-[2px] text-black uppercase">
                Featured
              </span>
            </div>
          )}

          {discount > 0 && (
            <div className="bg-blood-red px-3 py-1">
              <span className="text-[10px] font-bold tracking-[2px] text-white uppercase">
                Save {discount}%
              </span>
            </div>
          )}

          {product.quantity === 1 && (
            <div className="bg-steel border border-gold-royal/30 px-3 py-1">
              <span className="text-[10px] font-bold tracking-[2px] text-gold-royal uppercase">
                Last Piece
              </span>
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className={`
          absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300 z-10
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsWishlisted(!isWishlisted);
            }}
            className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-white/10
                     hover:bg-gold-royal hover:border-gold-royal transition-all duration-300
                     flex items-center justify-center group/btn"
          >
            <Heart className={`w-4 h-4 transition-all ${
              isWishlisted
                ? 'fill-blood-red text-blood-red'
                : 'text-white group-hover/btn:text-black'
            }`} />
          </button>

          <Link
            href={`/products/${product.slug}`}
            className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-white/10
                     hover:bg-gold-royal hover:border-gold-royal transition-all duration-300
                     flex items-center justify-center group/btn"
          >
            <Eye className="w-4 h-4 text-white group-hover/btn:text-black transition-colors" />
          </Link>
        </div>

        {/* RARITY INDICATOR */}
        {product.specifications.rarity && (
          <div className={`
            absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-md px-4 py-2
            border border-gold-royal/20 transition-all duration-500 z-10
            ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            <p className="text-[10px] tracking-[2px] uppercase text-gold-royal font-medium">
              {product.specifications.rarity}
            </p>
          </div>
        )}
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6 space-y-4">

        {/* CATEGORY TAG */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[3px] uppercase text-gold-royal/70">
            {product.gemstone.type}
          </span>
          {!product.inStock && (
            <span className="text-[10px] tracking-[2px] uppercase text-blood-red font-bold">
              Sold Out
            </span>
          )}
        </div>

        {/* TITLE & TAGLINE */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-xl font-bold text-white font-playfair
                       group-hover:text-gold-royal transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-sm text-white/60 italic font-cormorant mt-1">
            {product.tagline}
          </p>
        </Link>

        {/* SPECIFICATIONS */}
        <div className="flex items-center gap-4 text-[11px] text-white/50 tracking-wide">
          <span>{product.gemstone.carat} CT</span>
          <span className="text-gold-royal/30">|</span>
          <span>{product.metal.type}</span>
        </div>

        {/* PRICE & CTA */}
        <div className="flex items-end justify-between pt-4 border-t border-white/5">
          <div>
            {product.originalPrice && (
              <p className="text-sm text-white/40 line-through mb-1">
                ${product.originalPrice.toLocaleString()}
              </p>
            )}
            <p className="text-2xl font-bold text-gold-royal font-playfair">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="group/cta relative px-5 py-2.5 bg-transparent border border-gold-royal/30
                     hover:bg-gold-royal hover:border-gold-royal transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            disabled={!product.inStock}
          >
            <span className="relative z-10 text-[11px] font-bold tracking-[2px] uppercase
                           text-gold-royal group-hover/cta:text-black transition-colors
                           flex items-center gap-2">
              {product.inStock ? (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Reserve
                </>
              ) : (
                'Sold Out'
              )}
            </span>
          </button>
        </div>

        {/* TRUST BADGES */}
        <div className="flex items-center gap-3 pt-3 text-[10px] text-white/40 tracking-wide">
          <span>GIA Certified</span>
          <span className="text-gold-royal/30">|</span>
          <span>Insured</span>
          <span className="text-gold-royal/30">|</span>
          <span>{product.specifications.craftTime}</span>
        </div>
      </div>
    </div>
  );
}
