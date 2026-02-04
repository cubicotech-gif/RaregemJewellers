import { ProductCard } from '@/components/shop/ProductCard'
import { PackageX } from 'lucide-react'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'mens' | 'womens'
  gem_type: string
  metal_type: string
  images: string[]
  stock: number
  featured: boolean
  created_at: string
}

interface ProductGridProps {
  products: Product[]
  loading: boolean
}

export function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-brand-charcoal aspect-square rounded-lg mb-4"></div>
            <div className="bg-brand-charcoal h-6 rounded mb-2"></div>
            <div className="bg-brand-charcoal h-4 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <PackageX className="w-16 h-16 text-brand-gold/30 mb-4" />
        <h3 className="text-2xl font-display font-bold text-brand-cream mb-2">
          No Rings Found
        </h3>
        <p className="text-brand-gray mb-6 max-w-md">
          We couldn't find any rings matching your criteria. Try adjusting your filters
          or browse our complete collection.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
