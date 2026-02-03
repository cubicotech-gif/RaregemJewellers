'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/lib/supabase'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder-product.jpg',
      quantity: 1,
      gem_type: product.gem_type,
      metal_type: product.metal_type,
    })
  }

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
        {/* Product Image */}
        <div className="relative h-64 bg-neutral-100 overflow-hidden">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-neutral-400">
              <span className="text-sm">No image</span>
            </div>
          )}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-gold-500 text-white text-xs px-2 py-1 rounded">
              Featured
            </div>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Low Stock
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-purple-600 font-semibold uppercase">
              {product.gem_type}
            </span>
          </div>
          <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-neutral-900">
              ${product.price.toLocaleString()}
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
          {product.stock === 0 && (
            <p className="text-red-600 text-sm mt-2 font-semibold">Out of Stock</p>
          )}
        </div>
      </div>
    </Link>
  )
}
