'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button-luxury'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

export interface Product {
  id: string
  name: string
  price: number
  category: 'mens' | 'womens'
  gem_type: string
  metal_type: string
  stock: number
  featured: boolean
}

export interface Filters {
  categories: string[]
  gemTypes: string[]
  metalTypes: string[]
  priceRange: [number, number]
  inStock: boolean
  featured: boolean
}

interface FilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  products: Product[]
}

export function FilterSidebar({ filters, setFilters, products }: FilterSidebarProps) {
  const [uniqueGems, setUniqueGems] = useState<string[]>([])
  const [uniqueMetals, setUniqueMetals] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(50000)

  useEffect(() => {
    // Get unique gem types
    const gems = [...new Set(products.map(p => p.gem_type))].filter(Boolean)
    setUniqueGems(gems.sort())

    // Get unique metal types
    const metals = [...new Set(products.map(p => p.metal_type))].filter(Boolean)
    setUniqueMetals(metals.sort())

    // Get max price
    const max = Math.max(...products.map(p => p.price), 50000)
    setMaxPrice(Math.ceil(max / 1000) * 1000)
  }, [products])

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      categories: filters.categories.includes(category)
        ? filters.categories.filter(c => c !== category)
        : [...filters.categories, category]
    })
  }

  const handleGemChange = (gem: string) => {
    setFilters({
      ...filters,
      gemTypes: filters.gemTypes.includes(gem)
        ? filters.gemTypes.filter(g => g !== gem)
        : [...filters.gemTypes, gem]
    })
  }

  const handleMetalChange = (metal: string) => {
    setFilters({
      ...filters,
      metalTypes: filters.metalTypes.includes(metal)
        ? filters.metalTypes.filter(m => m !== metal)
        : [...filters.metalTypes, metal]
    })
  }

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      gemTypes: [],
      metalTypes: [],
      priceRange: [0, maxPrice],
      inStock: false,
      featured: false
    })
  }

  const activeFilterCount =
    filters.categories.length +
    filters.gemTypes.length +
    filters.metalTypes.length +
    (filters.inStock ? 1 : 0) +
    (filters.featured ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < maxPrice ? 1 : 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-bold text-brand-gold uppercase">
          Filters
        </h3>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear All ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-brand-cream uppercase tracking-wider">
          Category
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="mens"
              checked={filters.categories.includes('mens')}
              onCheckedChange={() => handleCategoryChange('mens')}
            />
            <Label
              htmlFor="mens"
              className="text-brand-cream cursor-pointer hover:text-brand-gold transition-colors"
            >
              Men's Rings
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="womens"
              checked={filters.categories.includes('womens')}
              onCheckedChange={() => handleCategoryChange('womens')}
            />
            <Label
              htmlFor="womens"
              className="text-brand-cream cursor-pointer hover:text-brand-gold transition-colors"
            >
              Women's Rings
            </Label>
          </div>
        </div>
      </div>

      {/* Gemstone Filter */}
      {uniqueGems.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-brand-cream uppercase tracking-wider">
            Gemstone
          </h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {uniqueGems.map((gem) => (
              <div key={gem} className="flex items-center gap-2">
                <Checkbox
                  id={`gem-${gem}`}
                  checked={filters.gemTypes.includes(gem)}
                  onCheckedChange={() => handleGemChange(gem)}
                />
                <Label
                  htmlFor={`gem-${gem}`}
                  className="text-brand-cream cursor-pointer hover:text-brand-gold transition-colors"
                >
                  {gem}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metal Type Filter */}
      {uniqueMetals.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-brand-cream uppercase tracking-wider">
            Metal
          </h4>
          <div className="space-y-3">
            {uniqueMetals.map((metal) => (
              <div key={metal} className="flex items-center gap-2">
                <Checkbox
                  id={`metal-${metal}`}
                  checked={filters.metalTypes.includes(metal)}
                  onCheckedChange={() => handleMetalChange(metal)}
                />
                <Label
                  htmlFor={`metal-${metal}`}
                  className="text-brand-cream cursor-pointer hover:text-brand-gold transition-colors"
                >
                  {metal}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-brand-cream uppercase tracking-wider">
          Price Range
        </h4>
        <div className="space-y-4">
          <Slider
            min={0}
            max={maxPrice}
            step={100}
            value={filters.priceRange}
            onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-brand-gold font-semibold">
              ${filters.priceRange[0].toLocaleString()}
            </span>
            <span className="text-brand-gray">to</span>
            <span className="text-brand-gold font-semibold">
              ${filters.priceRange[1].toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="space-y-4 pt-4 border-t border-brand-gold/20">
        <h4 className="text-sm font-semibold text-brand-cream uppercase tracking-wider">
          Quick Filters
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="instock"
              checked={filters.inStock}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, inStock: checked as boolean })
              }
            />
            <Label
              htmlFor="instock"
              className="text-brand-cream cursor-pointer hover:text-brand-gold transition-colors"
            >
              In Stock Only
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="featured"
              checked={filters.featured}
              onCheckedChange={(checked) =>
                setFilters({ ...filters, featured: checked as boolean })
              }
            />
            <Label
              htmlFor="featured"
              className="text-brand-cream cursor-pointer hover:text-brand-gold transition-colors"
            >
              Featured Only
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
