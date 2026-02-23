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
        .eq('category', 'mens')
        .limit(4)

      if (data && !error) {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-[100px] bg-kronos-black">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-kronos-gold/30"></div>
            <span className="text-xs font-sans font-semibold text-kronos-gold uppercase tracking-[0.3em]">
              Curated Selection
            </span>
            <div className="w-16 h-px bg-kronos-gold/30"></div>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-kronos-white mb-5 tracking-tight">
            Statement Pieces
          </h2>
          <p className="text-lg text-kronos-muted max-w-xl mx-auto font-sans font-light leading-relaxed">
            Handcrafted rings featuring rare gems that command attention
            and honor your commitment.
          </p>
        </div>

        {/* Products Grid - 4 columns desktop */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <div className="shimmer aspect-[3/4] mb-5"></div>
                <div className="shimmer h-4 w-3/4 mb-2"></div>
                <div className="shimmer h-4 w-1/2"></div>
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
        <div className="text-center mt-16">
          <Link href="/shop">
            <Button variant="gold" size="lg" className="group">
              View All Rings
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.id}`} className="group block">
      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-kronos-brown mb-5">
        <Image
          src={product.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-kronos-black/0 group-hover:bg-kronos-black/20 transition-all duration-500"></div>

        {/* Gem type badge */}
        <div className="absolute top-4 left-4">
          <span className="text-[10px] font-sans font-semibold text-kronos-gold uppercase tracking-[0.2em] bg-kronos-black/70 backdrop-blur-sm px-3 py-1.5 border border-kronos-gold/20">
            {product.gem_type}
          </span>
        </div>

        {/* Gold glow on hover */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-kronos-gold/0 group-hover:bg-kronos-gold/40 transition-all duration-500"></div>
      </div>

      {/* Product Info */}
      <div>
        <h3 className="font-display text-lg font-medium text-kronos-white group-hover:text-kronos-gold transition-colors duration-300 mb-1 tracking-wide">
          {product.name}
        </h3>
        <span className="text-lg font-sans font-semibold text-kronos-gold">
          ${product.price.toLocaleString()}
        </span>
      </div>
    </Link>
  )
}
