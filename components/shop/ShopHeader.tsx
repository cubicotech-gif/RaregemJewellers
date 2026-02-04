import { H2 } from '@/components/ui/typography'
import { Button } from '@/components/ui/button-luxury'
import { SlidersHorizontal } from 'lucide-react'

interface ShopHeaderProps {
  productCount: number
  sortBy: string
  setSortBy: (value: string) => void
  onToggleFilters: () => void
}

export function ShopHeader({ productCount, sortBy, setSortBy, onToggleFilters }: ShopHeaderProps) {
  return (
    <div className="bg-gradient-dark border-b border-brand-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          {/* Title Section */}
          <div>
            <H2 className="text-brand-gold mb-2">Rare Gems Collection</H2>
            <p className="text-brand-gray">
              {productCount} {productCount === 1 ? 'ring' : 'rings'} • Handcrafted for modern men
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              size="default"
              onClick={onToggleFilters}
              className="lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-sm text-brand-gray uppercase tracking-wider">
                Sort:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-brand-charcoal border border-brand-gold/20 text-brand-cream rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-gold transition-colors"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
