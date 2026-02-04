'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { ShopHeader } from '@/components/shop/ShopHeader'
import { FilterSidebar, Filters } from '@/components/shop/FilterSidebar'
import { ProductGrid, Product } from '@/components/shop/ProductGrid'
import { ShopBreadcrumb } from '@/components/shop/ShopBreadcrumb'

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState<string>('featured')
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    gemTypes: [],
    metalTypes: [],
    priceRange: [0, 50000],
    inStock: false,
    featured: false
  })

  // Fetch all products
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (data && !error) {
        setProducts(data)
        setFilteredProducts(data)
      }
      setLoading(false)
    }

    fetchProducts()
  }, [])

  // Apply filters and sorting
  useEffect(() => {
    let result = [...products]

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    // Gem type filter
    if (filters.gemTypes.length > 0) {
      result = result.filter(p => filters.gemTypes.includes(p.gem_type))
    }

    // Metal type filter
    if (filters.metalTypes.length > 0) {
      result = result.filter(p => filters.metalTypes.includes(p.metal_type))
    }

    // Price range filter
    result = result.filter(p =>
      p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // In stock filter
    if (filters.inStock) {
      result = result.filter(p => p.stock > 0)
    }

    // Featured filter
    if (filters.featured) {
      result = result.filter(p => p.featured)
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(result)
  }, [filters, sortBy, products])

  return (
    <main className="min-h-screen bg-brand-black">
      {/* Breadcrumb */}
      <ShopBreadcrumb />

      {/* Header */}
      <ShopHeader
        productCount={filteredProducts.length}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onToggleFilters={() => setShowFilters(!showFilters)}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              products={products}
            />
          </aside>

          {/* Mobile Filter Drawer */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/80"
                onClick={() => setShowFilters(false)}
              />
              <div className="absolute inset-y-0 left-0 w-80 bg-brand-charcoal p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-display font-bold text-brand-gold uppercase">
                    Filters
                  </h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-brand-cream hover:text-brand-gold"
                  >
                    ✕
                  </button>
                </div>
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  products={products}
                />
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <ProductGrid
              products={filteredProducts}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
