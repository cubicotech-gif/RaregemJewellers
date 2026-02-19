'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { products, categories, collections, type Product } from '@/data/products';
import { SlidersHorizontal, X, ArrowUpDown } from 'lucide-react';

type CategoryFilter = Product['category'] | 'all';
type CollectionFilter = Product['collection'] | 'all';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rarest';

export default function VaultPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedCollection, setSelectedCollection] = useState<CollectionFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 60000]);

  // Apply URL category param on load
  useEffect(() => {
    if (categoryParam && categories.some(c => c.id === categoryParam)) {
      setSelectedCategory(categoryParam as CategoryFilter);
    }
  }, [categoryParam]);

  // Filter products
  let filteredProducts = [...products];

  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  if (selectedCollection !== 'all') {
    filteredProducts = filteredProducts.filter(p => p.collection === selectedCollection);
  }
  filteredProducts = filteredProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rarest': return a.quantity - b.quantity;
      case 'featured':
      default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedCollection('all');
    setPriceRange([0, 60000]);
    setSortBy('featured');
  };

  const hasActiveFilters = selectedCategory !== 'all' || selectedCollection !== 'all' ||
    priceRange[0] > 0 || priceRange[1] < 60000;

  return (
    <main className="min-h-screen bg-black">
      {/* HERO HEADER */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-obsidian to-black overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
                        bg-gold-royal/5 rounded-full blur-[200px]" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-px bg-gold-royal" />
            <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
              Rare Legacy
            </span>
            <div className="w-20 h-px bg-gold-royal" />
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white font-playfair mb-6">
            The Vault
          </h1>

          <p className="text-xl text-white/60 max-w-3xl mx-auto font-cormorant italic mb-8">
            {products.length} investment-grade gemstone rings. Each one hand-selected,
            GIA certified, and crafted for legacy. Total inventory value exceeds $400,000.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="text-center">
              <p className="text-2xl font-bold text-gold-royal font-playfair">{products.length}</p>
              <p className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Pieces</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gold-royal font-playfair">7</p>
              <p className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Gemstones</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gold-royal font-playfair">4</p>
              <p className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Collections</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gold-royal font-playfair">
                ${Math.min(...products.map(p => p.price)).toLocaleString()}
              </p>
              <p className="text-white/40 text-xs tracking-[2px] uppercase mt-1">Starting</p>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="flex gap-8">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-8">

              {/* Active Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-3 border border-gold-royal/30 text-gold-royal text-[11px]
                           tracking-[2px] uppercase font-bold hover:bg-gold-royal hover:text-black
                           transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear All Filters
                </button>
              )}

              {/* Category Filter */}
              <div>
                <h3 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-4">
                  Gemstone
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-300 border
                      ${selectedCategory === 'all'
                        ? 'bg-gold-royal/10 border-gold-royal/30 text-gold-royal'
                        : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    All Gemstones ({products.length})
                  </button>
                  {categories.map(cat => {
                    const count = products.filter(p => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-300 border
                          ${selectedCategory === cat.id
                            ? 'bg-gold-royal/10 border-gold-royal/30 text-gold-royal'
                            : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                      >
                        <span className="mr-2">{cat.icon}</span>
                        {cat.name} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Collection Filter */}
              <div>
                <h3 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-4">
                  Collection
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCollection('all')}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-300 border
                      ${selectedCollection === 'all'
                        ? 'bg-gold-royal/10 border-gold-royal/30 text-gold-royal'
                        : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    All Collections
                  </button>
                  {collections.map(col => (
                    <button
                      key={col.id}
                      onClick={() => setSelectedCollection(col.id as CollectionFilter)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-300 border
                        ${selectedCollection === col.id
                          ? 'bg-gold-royal/10 border-gold-royal/30 text-gold-royal'
                          : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      {col.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-4">
                  Price Range
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'All Prices', range: [0, 60000] as [number, number] },
                    { label: 'Under $20,000', range: [0, 20000] as [number, number] },
                    { label: '$20,000 - $35,000', range: [20000, 35000] as [number, number] },
                    { label: '$35,000 - $50,000', range: [35000, 50000] as [number, number] },
                    { label: 'Over $50,000', range: [50000, 60000] as [number, number] },
                  ].map(option => (
                    <button
                      key={option.label}
                      onClick={() => setPriceRange(option.range)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all duration-300 border
                        ${priceRange[0] === option.range[0] && priceRange[1] === option.range[1]
                          ? 'bg-gold-royal/10 border-gold-royal/30 text-gold-royal'
                          : 'border-transparent text-white/60 hover:text-white hover:bg-white/5'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN GRID AREA */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-white/20
                         text-white text-sm hover:border-gold-royal/50 transition-all"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-gold-royal" />
                )}
              </button>

              <p className="text-sm text-white/50 hidden lg:block">
                <span className="text-gold-royal font-bold">{sortedProducts.length}</span> pieces
              </p>

              {/* Sort */}
              <div className="flex items-center gap-3">
                <ArrowUpDown className="w-4 h-4 text-white/40" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none px-4 py-2.5 pr-10 bg-steel border border-white/20
                           hover:border-gold-royal/50 transition-all duration-300
                           text-[11px] font-medium tracking-[2px] uppercase text-white
                           cursor-pointer focus:outline-none focus:border-gold-royal"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rarest">Rarest First</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index < 3}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-6xl mb-6 select-none">💎</p>
                <p className="text-xl text-white/60 font-cormorant italic mb-4">
                  No pieces match your criteria.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-3 border border-gold-royal/30 text-gold-royal text-sm
                           tracking-wider uppercase hover:bg-gold-royal hover:text-black transition-all"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Results Count */}
            {sortedProducts.length > 0 && (
              <div className="text-center mt-16 pt-16 border-t border-white/5">
                <p className="text-sm text-white/60 tracking-wide">
                  Showing <span className="text-gold-royal font-bold">{sortedProducts.length}</span> of{' '}
                  <span className="text-gold-royal font-bold">{products.length}</span> pieces
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 w-80 bg-obsidian border-r border-white/10 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-gold-royal font-playfair">Filters</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-8 h-8 flex items-center justify-center border border-white/20
                         hover:border-gold-royal/50 transition-all"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-8">
              <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-4">
                Gemstone
              </h4>
              <div className="space-y-2">
                {[{ id: 'all', name: 'All Gemstones', icon: '' }, ...categories].map(cat => {
                  const count = cat.id === 'all' ? products.length : products.filter(p => p.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-all border
                        ${selectedCategory === cat.id
                          ? 'bg-gold-royal/10 border-gold-royal/30 text-gold-royal'
                          : 'border-transparent text-white/60'}`}
                    >
                      {cat.icon && <span className="mr-2">{cat.icon}</span>}
                      {cat.name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Collection Filter */}
            <div className="mb-8">
              <h4 className="text-[11px] font-bold tracking-[3px] uppercase text-gold-royal mb-4">
                Collection
              </h4>
              <div className="space-y-2">
                {[{ id: 'all', name: 'All Collections' }, ...collections].map(col => (
                  <button
                    key={col.id}
                    onClick={() => setSelectedCollection(col.id as CollectionFilter)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-all border
                      ${selectedCollection === col.id
                        ? 'bg-gold-royal/10 border-gold-royal/30 text-gold-royal'
                        : 'border-transparent text-white/60'}`}
                  >
                    {col.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Apply & Close */}
            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full px-6 py-3 bg-gold-royal text-black text-sm font-bold
                       tracking-[2px] uppercase hover:bg-gold-light transition-all"
            >
              Apply Filters ({sortedProducts.length} results)
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
