// components/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';
import type { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      className="group relative bg-obsidian border border-white/5 overflow-hidden
                 transition-all duration-500 hover:border-gold-royal/50 hover:-translate-y-2
                 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(212,175,55,0.15)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-square bg-black overflow-hidden">
        {/* Main Image */}
        <Link href={`/products/${product.slug}`}>
          <div className="relative w-full h-full">
            {/* Placeholder for product image */}
            <div className={`
              absolute inset-0 transition-all duration-700
              ${isHovered ? 'scale-110 opacity-0' : 'scale-100 opacity-100'}
            `}>
              <div className="w-full h-full bg-gradient-to-br from-steel via-obsidian to-black
                            flex items-center justify-center">
                <span className="text-gold-royal/20 text-6xl">
                  {product.category === 'sapphire' && '💎'}
                  {product.category === 'emerald' && '💚'}
                  {product.category === 'ruby' && '❤️'}
                  {product.category === 'tanzanite' && '💜'}
                  {product.category === 'tourmaline' && '⚡'}
                  {product.category === 'diamond' && '⚫'}
                  {product.category === 'alexandrite' && '🔮'}
                </span>
              </div>
            </div>

            {/* Hover Image (Alternative Angle) */}
            {product.images.length > 1 && (
              <div className={`
                absolute inset-0 transition-all duration-700
                ${isHovered ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}
              `}>
                <div className="w-full h-full bg-gradient-to-br from-obsidian via-steel to-black
                              flex items-center justify-center">
                  <span className="text-gold-royal/30 text-7xl animate-pulse">
                    {product.category === 'sapphire' && '💎'}
                    {product.category === 'emerald' && '💚'}
                    {product.category === 'ruby' && '❤️'}
                    {product.category === 'tanzanite' && '💜'}
                    {product.category === 'tourmaline' && '⚡'}
                    {product.category === 'diamond' && '⚫'}
                    {product.category === 'alexandrite' && '🔮'}
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
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.featured && (
            <div className="bg-gold-royal px-3 py-1 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-bold tracking-[2px] text-black">
                FEATURED
              </span>
            </div>
          )}
          
          {discount > 0 && (
            <div className="bg-blood-red px-3 py-1">
              <span className="text-[10px] font-bold tracking-[2px] text-white">
                SAVE {discount}%
              </span>
            </div>
          )}

          {product.quantity === 1 && (
            <div className="bg-steel border border-gold-royal/30 px-3 py-1">
              <span className="text-[10px] font-bold tracking-[2px] text-gold-royal">
                LAST PIECE
              </span>
            </div>
          )}
        </div>

        {/* QUICK ACTIONS */}
        <div className={`
          absolute top-4 right-4 flex flex-col gap-2 transition-all duration-300
          ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
        `}>
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
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
            border border-gold-royal/20 transition-all duration-500
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
              SOLD OUT
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
          <span>•</span>
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
                  RESERVE
                </>
              ) : (
                'SOLD OUT'
              )}
            </span>
          </button>
        </div>

        {/* TRUST BADGES */}
        <div className="flex items-center gap-3 pt-3 text-[10px] text-white/40 tracking-wide">
          <span>✓ GIA Certified</span>
          <span>•</span>
          <span>✓ Insured</span>
          <span>•</span>
          <span>✓ {product.specifications.craftTime}</span>
        </div>
      </div>
    </div>
  );
}
