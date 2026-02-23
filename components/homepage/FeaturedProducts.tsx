'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button-luxury'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  gem_type: string
  images: string[]
  category: string
  tagline?: string
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(4)

      if (data && !error) {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-[120px] bg-kronos-black relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute inset-0 particle-bg opacity-30" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="diamond-ornament max-w-xs mx-auto mb-8">
            <span className="text-[11px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.35em] whitespace-nowrap">
              Curated Selection
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-display font-semibold text-kronos-white mb-5 tracking-tight">
            Statement Pieces
          </h2>
          <p className="text-lg text-kronos-muted max-w-xl mx-auto font-sans font-light leading-relaxed">
            Handcrafted rings featuring rare gems that command attention
            and honor your commitment.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="shimmer aspect-[3/4] mb-5" />
                <div className="shimmer h-4 w-3/4 mb-2" />
                <div className="shimmer h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-20">
          <Link href="/shop">
            <Button variant="gold" size="lg" className="group">
              View All Rings
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-kronos-brown mb-5 hover-gold-glow">
        <Image
          src={product.images?.[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'}
          alt={product.name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-105"
        />

        {/* Hover overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-kronos-black/60 via-kronos-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500" />
        <div className="absolute inset-0 bg-kronos-gold/0 group-hover:bg-kronos-gold/5 transition-all duration-700" />

        {/* Gem type badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.2em] glass-effect px-3 py-1.5">
            {product.gem_type}
          </span>
        </div>

        {/* Quick view on hover */}
        <div className={`absolute inset-x-4 bottom-4 transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="glass-gold px-4 py-2.5 text-center">
            <span className="text-[10px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.2em]">
              View Details
            </span>
          </div>
        </div>

        {/* Gold bottom line */}
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-kronos-gold/0 group-hover:bg-kronos-gold/50 transition-all duration-700" />
      </div>

      {/* Product Info */}
      <div>
        <h3 className="font-display text-lg font-medium text-kronos-white group-hover:text-kronos-gold transition-colors duration-400 mb-1 tracking-wide">
          {product.name}
        </h3>
        {product.tagline && (
          <p className="text-xs text-kronos-muted/70 font-sans mb-2 line-clamp-1">{product.tagline}</p>
        )}
        <span className="text-lg font-sans font-semibold text-kronos-gold">
          ${product.price.toLocaleString()}
        </span>
      </div>
    </Link>
  )
}
