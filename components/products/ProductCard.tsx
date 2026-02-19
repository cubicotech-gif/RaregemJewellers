'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
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
    <Link
      href={`/products/${product.slug}`}
      className="group block"
    >
      {/* IMAGE SECTION - Frank Jewelry inspired opacity effect */}
      <div className="relative aspect-[3/4] bg-black overflow-hidden mb-5">
        {/* Main Visual */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}
                        flex items-center justify-center
                        opacity-40 group-hover:opacity-100 transition-opacity duration-700`}>
          <span className="text-[100px] select-none opacity-60 group-hover:scale-110 transition-transform duration-700">
            {icon}
          </span>
        </div>

        {/* Shimmer on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent
                      -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

        {/* Badges - Top Left */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.featured && (
            <div className="bg-gold-royal px-3 py-1">
              <span className="text-[9px] font-bold tracking-[2px] text-black uppercase">
                Featured
              </span>
            </div>
          )}
          {discount > 0 && (
            <div className="bg-white px-3 py-1">
              <span className="text-[9px] font-bold tracking-[2px] text-black uppercase">
                -{discount}%
              </span>
            </div>
          )}
          {product.quantity === 1 && (
            <div className="bg-black/80 border border-gold-royal/30 px-3 py-1">
              <span className="text-[9px] font-bold tracking-[2px] text-gold-royal uppercase">
                Last Piece
              </span>
            </div>
          )}
        </div>

        {/* Wishlist - Top Right */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10
                   flex items-center justify-center
                   opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Heart className={`w-5 h-5 transition-all ${
            isWishlisted
              ? 'fill-gold-royal text-gold-royal'
              : 'text-white hover:text-gold-royal'
          }`} />
        </button>

        {/* Quick Add - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10
                      translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 bg-gold-royal hover:bg-gold-light
                     transition-colors duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!product.inStock}
          >
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-black
                           flex items-center justify-center gap-2">
              {product.inStock ? (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  Add To Cart
                </>
              ) : (
                'Sold Out'
              )}
            </span>
          </button>
        </div>

        {/* Not in stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-5">
            <span className="text-[11px] font-bold tracking-[3px] uppercase text-white/80">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* CONTENT - Minimal, clean like Anamika */}
      <div className="space-y-2">
        {/* Category */}
        <p className="text-[10px] tracking-[3px] uppercase text-gold-royal/60">
          {product.gemstone.type} &middot; {product.gemstone.carat} CT
        </p>

        {/* Title */}
        <h3 className="text-base font-playfair font-bold text-white
                     group-hover:text-gold-royal transition-colors duration-300">
          {product.name}
        </h3>

        {/* Tagline */}
        <p className="text-sm text-white/40 font-cormorant italic line-clamp-1">
          {product.tagline}
        </p>

        {/* Price */}
        <div className="flex items-center gap-3 pt-2">
          <span className="text-lg font-playfair font-bold text-white">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-white/30 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Explore link */}
        <div className="flex items-center gap-2 pt-1
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="text-[10px] tracking-[2px] uppercase text-gold-royal font-medium">
            View Details
          </span>
          <ArrowRight className="w-3 h-3 text-gold-royal" />
        </div>
      </div>
    </Link>
  );
}
