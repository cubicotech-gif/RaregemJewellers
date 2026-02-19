'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories, type Product } from '@/data/products';
import { SlidersHorizontal } from 'lucide-react';

type CategoryFilter = Product['category'] | 'all';
type SortOption = 'featured' | 'price-low' | 'price-high' | 'newest' | 'rarest';

export default function ProductsGrid() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rarest':
        return a.quantity - b.quantity;
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <section className="relative bg-black py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gold-royal" />
            <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
              The Vault
            </span>
            <div className="w-16 h-px bg-gold-royal" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white font-playfair mb-4">
            Legends in Stock
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto font-cormorant italic">
            Each piece hand-selected for rarity, each setting crafted for legacy.
            Availability changes as quickly as legends are made.
          </p>
        </div>

        {/* FILTERS & SORT */}
        <div className="mb-12">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full mb-6 px-6 py-4 bg-steel border border-white/10
                     hover:border-gold-royal/50 transition-all duration-300 flex items-center justify-between"
          >
            <span className="text-sm font-medium tracking-[2px] uppercase text-white flex items-center gap-3">
              <SlidersHorizontal className="w-5 h-5" />
              Filters & Sort
            </span>
            <span className="text-xs text-gold-royal">
              {selectedCategory === 'all' ? 'All' : categories.find(c => c.id === selectedCategory)?.name}
            </span>
          </button>

          {/* Desktop Filters */}
          <div className={`
            lg:flex items-center justify-between gap-8
            ${showFilters ? 'block' : 'hidden lg:flex'}
          `}>

            {/* CATEGORY FILTERS */}
            <div className="flex flex-wrap gap-3 mb-6 lg:mb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 text-[11px] font-bold tracking-[2px] uppercase
                         transition-all duration-300 border
                         ${selectedCategory === 'all'
                           ? 'bg-gold-royal border-gold-royal text-black'
                           : 'bg-transparent border-white/20 text-white hover:border-gold-royal/50'
                         }`}
              >
                All ({products.length})
              </button>

              {categories.map(category => {
                const count = products.filter(p => p.category === category.id).length;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as CategoryFilter)}
                    className={`px-5 py-3 text-[11px] font-bold tracking-[2px] uppercase
                             transition-all duration-300 border
                             ${selectedCategory === category.id
                               ? 'bg-gold-royal border-gold-royal text-black'
                               : 'bg-transparent border-white/20 text-white hover:border-gold-royal/50'
                             }`}
                  >
                    {category.icon} {category.name} ({count})
                  </button>
                );
              })}
            </div>

            {/* SORT DROPDOWN */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none px-6 py-3 pr-12 bg-steel border border-white/20
                         hover:border-gold-royal/50 transition-all duration-300
                         text-[11px] font-medium tracking-[2px] uppercase text-white
                         cursor-pointer focus:outline-none focus:border-gold-royal"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
                <option value="rarest">Rarest First</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-gold-royal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {sortedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index < 3}
                />
              ))}
            </div>

            {/* RESULTS COUNT */}
            <div className="text-center mt-16 pt-16 border-t border-white/5">
              <p className="text-sm text-white/60 tracking-wide">
                Showing <span className="text-gold-royal font-bold">{sortedProducts.length}</span> pieces of legacy
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-white/60 font-cormorant italic">
              No products match your criteria. Expanding your search may reveal hidden gems.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// FEATURED COLLECTION SECTION (for homepage)
export function FeaturedCollection() {
  const featuredProducts = products.filter(p => p.featured).slice(0, 3);

  return (
    <section className="relative bg-gradient-to-b from-black via-obsidian to-black py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gold-royal" />
            <span className="text-[11px] font-medium tracking-[4px] uppercase text-gold-royal">
              Alpha Stones
            </span>
            <div className="w-16 h-px bg-gold-royal" />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white font-playfair mb-4">
            The Pinnacle Collection
          </h2>

          <p className="text-lg text-white/60 max-w-2xl mx-auto font-cormorant italic">
            Museum-quality gemstones. Investment-grade rarity. Legacy-defining craft.
          </p>
        </div>

        {/* FEATURED PRODUCTS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={true}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a
            href="/vault"
            className="inline-flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-gold-royal
                     hover:bg-gold-royal transition-all duration-500 group"
          >
            <span className="text-[13px] font-bold tracking-[3px] uppercase text-gold-royal
                           group-hover:text-black transition-colors">
              View Complete Vault
            </span>
            <svg className="w-5 h-5 text-gold-royal group-hover:text-black group-hover:translate-x-1 transition-all"
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

// CATEGORY SHOWCASE SECTION (for homepage)
export function CategoryShowcase() {
  return (
    <section className="relative bg-black py-20 lg:py-32">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white font-playfair mb-4">
            Explore by Gemstone
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto font-cormorant italic">
            Each gemstone tells a different story. Which will be yours?
          </p>
        </div>

        {/* CATEGORIES GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map(category => {
            const count = products.filter(p => p.category === category.id).length;
            const categoryProducts = products.filter(p => p.category === category.id);
            const priceRange = categoryProducts.length > 0
              ? `$${Math.min(...categoryProducts.map(p => p.price)).toLocaleString()} - $${Math.max(...categoryProducts.map(p => p.price)).toLocaleString()}`
              : 'N/A';

            return (
              <a
                key={category.id}
                href={`/vault?category=${category.id}`}
                className="group relative aspect-square bg-gradient-to-br from-steel to-obsidian
                         border border-white/10 hover:border-gold-royal/50 transition-all duration-500
                         overflow-hidden hover:-translate-y-2 hover:shadow-luxury"
              >
                {/* Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-7xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500 select-none">
                    {category.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white font-playfair mb-2 group-hover:text-gold-royal transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/60 mb-3">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gold-royal/70">
                    <span>{count} pieces</span>
                    <span className="text-[10px]">{priceRange}</span>
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-royal/0 via-gold-royal/5 to-gold-royal/10
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
