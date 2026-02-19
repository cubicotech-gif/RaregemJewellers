'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart, Plus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/data/products';

const ICONS: Record<string, string> = {
  sapphire: '💎', emerald: '💚', ruby: '❤️', tanzanite: '💜',
  tourmaline: '⚡', diamond: '⚫', alexandrite: '🔮',
};

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem({
      id: product.id, name: product.name, price: product.price,
      image: product.images[0] || '', quantity: 1,
      gem_type: product.gemstone.type, metal_type: product.metal.type,
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-[3/4] bg-steel overflow-hidden mb-6">
        <div className="absolute inset-0 flex items-center justify-center
                      bg-gradient-to-b from-steel via-obsidian to-steel
                      opacity-60 group-hover:opacity-100 transition-opacity duration-700">
          <span className="text-[90px] select-none opacity-25 group-hover:opacity-50
                        group-hover:scale-110 transition-all duration-700">
            {ICONS[product.category] || '💎'}
          </span>
        </div>

        {/* Glass hover overlay */}
        <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {product.featured && (
          <div className="absolute top-5 left-5 z-10">
            <span className="text-[9px] font-sans font-medium tracking-[2px] uppercase
                          text-gold-royal bg-obsidian/80 px-3 py-1.5 glass">Featured</span>
          </div>
        )}

        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlisted(!wishlisted); }}
          className="absolute top-5 right-5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500"
        >
          <Heart className={`w-4 h-4 transition-colors ${
            wishlisted ? 'fill-gold-royal text-gold-royal' : 'text-ivory/40 hover:text-gold-royal'
          }`} />
        </button>

        <div className="absolute bottom-5 right-5 z-10
                      opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0
                      transition-all duration-500">
          <button
            onClick={handleAdd}
            disabled={!product.inStock}
            className="w-10 h-10 glass-rose flex items-center justify-center
                     hover:bg-gold-royal/20 transition-colors duration-300
                     disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 text-ivory/80" />
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-obsidian/70 flex items-center justify-center">
            <span className="text-[10px] font-sans tracking-[3px] uppercase text-ivory/40">Sold Out</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="space-y-2">
        <p className="text-[9px] font-sans tracking-[3px] uppercase text-ivory/25">
          {product.gemstone.type} &middot; {product.gemstone.carat}ct
        </p>
        <h3 className="text-sm font-cormorant font-semibold text-ivory/70
                     group-hover:text-ivory transition-colors duration-500">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm font-sans font-medium text-ivory/60">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-ivory/20 line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
