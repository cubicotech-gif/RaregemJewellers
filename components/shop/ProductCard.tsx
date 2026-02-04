'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card-luxury'
import { Badge } from '@/components/ui/badge-luxury'
import { Button } from '@/components/ui/button-luxury'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Heart, ShoppingCart } from 'lucide-react'

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
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const displayImage = product.images[currentImageIndex] || product.images[0] || 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80'

  return (
    <Card
      className="group cursor-pointer overflow-hidden"
      onMouseEnter={() => {
        setIsHovered(true)
        if (product.images.length > 1) {
          setCurrentImageIndex(1)
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        setCurrentImageIndex(0)
      }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-brand-black">
        <Link href={`/product/${product.id}`}>
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Badge variant="gem">
            {product.gem_type}
          </Badge>
          {product.stock === 0 && (
            <Badge variant="burgundy">
              Sold Out
            </Badge>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <Badge variant="outline">
              Only {product.stock} Left
            </Badge>
          )}
          {product.featured && (
            <Badge variant="gold">
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-brand-black/50 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-brand-gold/20 hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted ? 'fill-brand-gold text-brand-gold' : 'text-brand-cream'
            }`}
          />
        </button>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-brand-black/80 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link href={`/product/${product.id}`}>
            <Button variant="gold" size="default">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-semibold text-brand-cream uppercase tracking-wide mb-2 group-hover:text-brand-gold transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-brand-gray mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Metal */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-brand-gold">
              ${product.price.toLocaleString()}
            </span>
          </div>
          <div className="text-xs text-brand-gray uppercase">
            {product.metal_type}
          </div>
        </div>

        {/* Quick Add to Cart (if in stock) */}
        {product.stock > 0 && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={(e) => {
              e.preventDefault()
              // Add to cart logic here
              console.log('Added to cart:', product.id)
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        )}
      </div>
    </Card>
  )
}
