'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ShopBreadcrumb } from '@/components/shop/ShopBreadcrumb'
import { ProductGrid, Product } from '@/components/shop/ProductGrid'
import { H2, Lead } from '@/components/ui/typography'

export default function MensRingsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMensProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', 'mens')
        .order('featured', { ascending: false })

      if (data && !error) {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchMensProducts()
  }, [])

  return (
    <main className="min-h-screen bg-brand-black">
      <ShopBreadcrumb />

      {/* Header */}
      <div className="bg-gradient-dark border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <H2 className="text-brand-gold mb-4">Men's Engagement Rings</H2>
          <Lead className="max-w-3xl">
            Bold, rare, unforgettable. Discover engagement rings designed for modern men
            who dare to be different. Each piece features rare gemstones that tell your unique story.
          </Lead>
          <p className="text-brand-gray mt-4">
            {products.length} rings • Handcrafted with rare gems
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid products={products} loading={loading} />
      </div>
    </main>
  )
}
