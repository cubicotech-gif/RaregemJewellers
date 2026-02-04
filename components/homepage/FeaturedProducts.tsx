'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card } from '@/components/ui/card-luxury'
import { Badge } from '@/components/ui/badge-luxury'
import { Button } from '@/components/ui/button-luxury'
import { H2, Lead } from '@/components/ui/typography'
import Image from 'next/image'
import Link from 'next/link'
import { Eye } from 'lucide-react'

interface Product {
  id: string
  name: string
  price: number
  gem_type: string
  images: string[]
  category: string
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
        .limit(6)

      if (data && !error) {
        setProducts(data)
      }
      setLoading(false)
    }

    fetchFeaturedProducts()
  }, [])

  return (
    <section className="py-24 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <H2 className="text-brand-gold mb-4">
            Statement Pieces For The Modern Man
          </H2>
          <Lead className="max-w-2xl mx-auto">
            Each ring tells a story. Handcrafted with rare gems that command attention
            and respect your commitment.
          </Lead>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-brand-charcoal h-80 rounded-lg"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline" size="lg">
              View All Rings
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
    <Link href={`/product/${product.id}`}>
      <Card
        className="group cursor-pointer overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-brand-black">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gem Badge */}
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="gem">
              {product.gem_type}
            </Badge>
          </div>

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-brand-black/80 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Button variant="gold" size="lg">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h3 className="font-display text-xl font-semibold text-brand-cream uppercase tracking-wide mb-2 group-hover:text-brand-gold transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-brand-gold">
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
