'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft, ShoppingBag, Heart, Shield, Award, Clock,
  ChevronRight, Gem, Scale, Sparkles
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/products/ProductCard';

const CATEGORY_ICONS: Record<string, string> = {
  sapphire: '💎',
  emerald: '💚',
  ruby: '❤️',
  tanzanite: '💜',
  tourmaline: '⚡',
  diamond: '⚫',
  alexandrite: '🔮',
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-6 select-none">💎</p>
          <h1 className="text-3xl font-bold text-white font-playfair mb-4">
            Piece Not Found
          </h1>
          <p className="text-white/60 mb-8 font-cormorant italic">
            This legendary piece may have already been acquired.
          </p>
          <Link
            href="/vault"
            className="px-8 py-4 bg-transparent border-2 border-gold-royal
                     hover:bg-gold-royal transition-all duration-500 group inline-flex items-center gap-2"
          >
            <span className="text-[13px] font-bold tracking-[3px] uppercase text-gold-royal
                           group-hover:text-black transition-colors">
              Browse Vault
            </span>
          </Link>
        </div>
      </main>
    );
  }

  const related = getRelatedProducts(product.id, 3);
  const icon = CATEGORY_ICONS[product.category] || '💎';

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      quantity: 1,
      gem_type: product.gemstone.type,
      metal_type: product.metal.type,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <main className="min-h-screen bg-black">
      {/* BREADCRUMB */}
      <div className="bg-obsidian border-b border-white/5">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Link href="/" className="hover:text-gold-royal transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/vault" className="hover:text-gold-royal transition-colors">Vault</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold-royal">{product.name}</span>
          </div>
        </div>
      </div>

      {/* MAIN PRODUCT SECTION */}
      <section className="max-w-[1600px] mx-auto px-6 pt-8 pb-20">
        {/* Back Button */}
        <Link
          href="/vault"
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold-royal
                   transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vault
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* LEFT: PRODUCT IMAGE */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-steel via-obsidian to-black
                          border border-white/5 overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[200px] opacity-20 group-hover:opacity-30
                             group-hover:scale-110 transition-all duration-700 select-none">
                  {icon}
                </span>
              </div>

              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                {product.featured && (
                  <div className="bg-gold-royal px-4 py-1.5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span className="text-[10px] font-bold tracking-[2px] text-black uppercase">
                      Featured
                    </span>
                  </div>
                )}
                {product.quantity === 1 && (
                  <div className="bg-steel border border-gold-royal/30 px-4 py-1.5">
                    <span className="text-[10px] font-bold tracking-[2px] text-gold-royal uppercase">
                      Last Piece
                    </span>
                  </div>
                )}
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold-royal/5 to-transparent
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />
            </div>

            {/* Thumbnail row */}
            <div className="grid grid-cols-3 gap-4">
              {[0, 1, 2].map((i) => (
                <div key={i} className="aspect-square bg-gradient-to-br from-steel/50 to-obsidian
                                      border border-white/5 flex items-center justify-center
                                      hover:border-gold-royal/30 transition-all cursor-pointer">
                  <span className="text-4xl opacity-20 select-none">{icon}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="space-y-8">
            {/* Category & Collection */}
            <div className="flex items-center gap-4">
              <span className="text-[10px] tracking-[3px] uppercase text-gold-royal/70">
                {product.gemstone.type}
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[10px] tracking-[3px] uppercase text-white/40">
                {product.collection.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white font-playfair mb-3">
                {product.name}
              </h1>
              <p className="text-xl text-white/60 font-cormorant italic">
                {product.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-end gap-4">
              {product.originalPrice && (
                <p className="text-xl text-white/40 line-through">
                  ${product.originalPrice.toLocaleString()}
                </p>
              )}
              <p className="text-4xl font-bold text-gold-royal font-playfair">
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-white/70 leading-relaxed">
              {product.description}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 px-8 py-4 font-bold tracking-[2px] uppercase text-sm
                         transition-all duration-300 flex items-center justify-center gap-3
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${addedToCart
                           ? 'bg-emerald-600 border-2 border-emerald-600 text-white'
                           : 'bg-gold-royal border-2 border-gold-royal text-black hover:bg-gold-light'
                         }`}
              >
                <ShoppingBag className="w-5 h-5" />
                {addedToCart ? 'Added to Cart' : product.inStock ? 'Reserve This Piece' : 'Sold Out'}
              </button>

              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="w-14 h-14 border-2 border-white/20 hover:border-gold-royal/50
                         transition-all duration-300 flex items-center justify-center"
              >
                <Heart className={`w-5 h-5 transition-all ${
                  isWishlisted ? 'fill-blood-red text-blood-red' : 'text-white'
                }`} />
              </button>
            </div>

            {/* Trust Row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gold-royal" />
                <div>
                  <p className="text-xs text-white/80 font-medium">Insured</p>
                  <p className="text-[10px] text-white/40">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-gold-royal" />
                <div>
                  <p className="text-xs text-white/80 font-medium">Certified</p>
                  <p className="text-[10px] text-white/40">{product.specifications.certification}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold-royal" />
                <div>
                  <p className="text-xs text-white/80 font-medium">Craft Time</p>
                  <p className="text-[10px] text-white/40">{product.specifications.craftTime}</p>
                </div>
              </div>
            </div>

            {/* SPECIFICATIONS */}
            <div className="space-y-6 pt-4">
              {/* Gemstone Details */}
              <div className="border border-white/5 bg-obsidian p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gem className="w-5 h-5 text-gold-royal" />
                  <h3 className="text-sm font-bold tracking-[2px] uppercase text-gold-royal">
                    Gemstone Details
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Type', value: product.gemstone.type },
                    { label: 'Carat', value: `${product.gemstone.carat} ct` },
                    { label: 'Origin', value: product.gemstone.origin },
                    { label: 'Clarity', value: product.gemstone.clarity },
                    { label: 'Treatment', value: product.gemstone.treatment },
                  ].map(spec => (
                    <div key={spec.label}>
                      <p className="text-[10px] text-white/40 tracking-[2px] uppercase mb-1">{spec.label}</p>
                      <p className="text-sm text-white/90">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metal Details */}
              <div className="border border-white/5 bg-obsidian p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-5 h-5 text-gold-royal" />
                  <h3 className="text-sm font-bold tracking-[2px] uppercase text-gold-royal">
                    Metal & Setting
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Metal', value: product.metal.type },
                    { label: 'Purity', value: product.metal.purity },
                    { label: 'Weight', value: product.metal.weight },
                    { label: 'Setting', value: product.specifications.setting },
                  ].map(spec => (
                    <div key={spec.label}>
                      <p className="text-[10px] text-white/40 tracking-[2px] uppercase mb-1">{spec.label}</p>
                      <p className="text-sm text-white/90">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rarity */}
              {product.specifications.rarity && (
                <div className="border border-gold-royal/20 bg-gold-royal/5 p-6">
                  <p className="text-[10px] text-gold-royal tracking-[3px] uppercase mb-2 font-bold">
                    Rarity
                  </p>
                  <p className="text-lg text-white/90 font-cormorant italic">
                    {product.specifications.rarity}
                  </p>
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {product.tags.map(tag => (
                <span key={tag} className="px-3 py-1 border border-white/10 text-[10px]
                                         tracking-[2px] uppercase text-white/50">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {related.length > 0 && (
        <section className="bg-gradient-to-b from-obsidian to-black py-20 border-t border-white/5">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-px bg-gold-royal" />
                <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
                  You May Also Covet
                </span>
                <div className="w-16 h-px bg-gold-royal" />
              </div>
              <h2 className="text-3xl font-bold text-white font-playfair">
                Related Pieces
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
