'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ShopFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/shop?${params.toString()}`)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">
            Category
          </label>
          <select
            value={searchParams.get('category') || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="womens">Women's Jewelry</option>
            <option value="mens">Men's Jewelry</option>
          </select>
        </div>

        {/* Gem Type Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">
            Gemstone
          </label>
          <select
            value={searchParams.get('gem') || ''}
            onChange={(e) => handleFilterChange('gem', e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">All Gemstones</option>
            <option value="Diamond">Diamond</option>
            <option value="Ruby">Ruby</option>
            <option value="Sapphire">Sapphire</option>
            <option value="Emerald">Emerald</option>
            <option value="Topaz">Topaz</option>
            <option value="Amethyst">Amethyst</option>
            <option value="Opal">Opal</option>
          </select>
        </div>

        {/* Sort Filter */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-neutral-700">
            Sort By
          </label>
          <select
            value={searchParams.get('sort') || ''}
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  )
}
