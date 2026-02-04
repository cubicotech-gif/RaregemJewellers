'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { ProductCard, Product } from '@/components/shop/ProductCard'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

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
        .limit(6)

      if (data && !error) {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-30 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl font-bold text-luxury-black uppercase mb-4">
            Statement Pieces For The Modern Man
          </h2>
          <p className="font-body text-lg text-warm-gray max-w-2xl mx-auto">
            Each ring tells a story. Handcrafted with rare gems that command attention
            and respect your commitment.
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-luxury-beige h-96 rounded-none"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="secondary" size="lg">
              View All Rings
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
