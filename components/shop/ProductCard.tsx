'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Heart } from 'lucide-react'

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
    <div
      className="bg-luxury-white border border-light-gray rounded-none shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer overflow-hidden group"
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
      <div className="relative aspect-square overflow-hidden bg-luxury-white">
        <Link href={`/product/${product.id}`}>
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Badges - Top Right */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <Badge variant="champagne">
            {product.gem_type}
          </Badge>
          {product.stock === 0 && (
            <Badge variant="sold-out">
              Sold Out
            </Badge>
          )}
          {product.stock > 0 && product.stock <= 3 && (
            <Badge variant="low-stock">
              Only {product.stock} Left
            </Badge>
          )}
          {product.featured && (
            <Badge variant="rose-gold">
              Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Button - Top Left */}
        <button
          onClick={(e) => {
            e.preventDefault()
            setIsWishlisted(!isWishlisted)
          }}
          className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-luxury-white/80 backdrop-blur-sm flex items-center justify-center transition-all hover:bg-luxury-white hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isWishlisted ? 'fill-rose-gold text-rose-gold' : 'text-luxury-black'
            }`}
          />
        </button>

        {/* Hover Overlay - Quick View */}
        <div
          className={`absolute inset-0 bg-luxury-white/90 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Link href={`/product/${product.id}`}>
            <Button variant="primary" size="sm">
              <Eye className="mr-2 h-4 w-4" />
              Quick View
            </Button>
          </Link>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-6 bg-luxury-white border-t border-light-gray">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-heading text-lg font-medium text-luxury-black uppercase tracking-wide mb-2 hover:text-champagne transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Description (optional) */}
        {product.description && (
          <p className="font-body text-sm text-warm-gray mb-3 line-clamp-1">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="mb-2">
          <span className="font-body text-2xl font-semibold text-champagne block">
            ${product.price.toLocaleString()}
          </span>
        </div>

        {/* Metal Type */}
        <div className="font-body text-xs text-warm-gray uppercase">
          {product.metal_type}
        </div>
      </div>
    </div>
  )
}
