'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import { products, categories, type Product } from '@/data/products';
import { SlidersHorizontal, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'rarest': return a.quantity - b.quantity;
      default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  return (
    <section className="relative bg-obsidian py-20 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-10 h-px bg-gold-royal/60" />
            <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">The Vault</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-cormorant font-light text-ivory/90 leading-[1.1] mb-4">
            Legends In <span className="font-semibold text-ivory/40">Stock</span>
          </h2>
          <p className="text-base text-ivory/35 font-sans font-light">
            Each piece hand-selected for rarity, each setting crafted for legacy.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full mb-6 glass px-6 py-4 flex items-center justify-between"
          >
            <span className="text-[11px] font-sans tracking-[2px] uppercase text-ivory/60 flex items-center gap-3">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </span>
            <span className="text-[10px] text-gold-royal/60">
              {selectedCategory === 'all' ? 'All' : categories.find(c => c.id === selectedCategory)?.name}
            </span>
          </button>

          <div className={`lg:flex items-center justify-between gap-8 ${showFilters ? 'block' : 'hidden lg:flex'}`}>
            <div className="flex flex-wrap gap-2 mb-6 lg:mb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2.5 text-[10px] font-sans tracking-[2px] uppercase transition-all duration-300
                  ${selectedCategory === 'all'
                    ? 'glass-rose text-ivory/80'
                    : 'glass text-ivory/35 hover:text-ivory/60'
                  }`}
              >
                All ({products.length})
              </button>
              {categories.map(cat => {
                const count = products.filter(p => p.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                    className={`px-5 py-2.5 text-[10px] font-sans tracking-[2px] uppercase transition-all duration-300
                      ${selectedCategory === cat.id
                        ? 'glass-rose text-ivory/80'
                        : 'glass text-ivory/35 hover:text-ivory/60'
                      }`}
                  >
                    {cat.name} ({count})
                  </button>
                );
              })}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none px-5 py-2.5 pr-10 glass text-[10px] font-sans tracking-[2px]
                       uppercase text-ivory/35 cursor-pointer focus:outline-none
                       bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(183%2C110%2C121%2C0.5)%22%20stroke-width%3D%222%22%3E%3Cpath%20d%3D%22M6%209l6%206%206-6%22%2F%3E%3C%2Fsvg%3E')]
                       bg-no-repeat bg-[right_12px_center]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low</option>
              <option value="price-high">Price: High</option>
              <option value="newest">Newest</option>
              <option value="rarest">Rarest</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {sortedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {sortedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} priority={index < 3} />
              ))}
            </div>
            <div className="text-center mt-16 pt-12 border-t border-white/[0.04]">
              <p className="text-[11px] text-ivory/25 font-sans tracking-wider">
                Showing {sortedProducts.length} pieces
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-ivory/35 font-cormorant italic">
              No products match your criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// FEATURED COLLECTION (homepage)
export function FeaturedCollection() {
  const featured = products.filter(p => p.featured).slice(0, 3);

  return (
    <section className="relative bg-obsidian py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="max-w-xl mb-20">
          <div className="flex items-center gap-5 mb-8">
            <div className="w-10 h-px bg-gold-royal/60" />
            <span className="text-[10px] font-sans font-medium tracking-[5px] uppercase text-gold-royal/80">Featured</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-cormorant font-light text-ivory/90 leading-[1.1] mb-5">
            The Pinnacle <span className="font-semibold text-ivory/40">Collection</span>
          </h2>
          <p className="text-base text-ivory/35 font-sans font-light">
            Museum-quality gemstones. Investment-grade rarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} priority />
          ))}
        </div>

        <div className="mt-20">
          <Link href="/vault"
            className="group glass-rose px-8 py-4 inline-flex items-center gap-4 hover:bg-gold-royal/10 transition-all duration-500">
            <span className="text-[11px] font-sans font-medium tracking-[3px] uppercase text-ivory/80">View Complete Vault</span>
            <ArrowRight className="w-4 h-4 text-gold-royal group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// CATEGORY SHOWCASE (homepage)
export function CategoryShowcase() {
  return (
    <section className="relative bg-obsidian py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        <div className="max-w-xl mb-20">
          <h2 className="text-4xl lg:text-5xl font-cormorant font-light text-ivory/90 leading-[1.1] mb-5">
            Explore by <span className="font-semibold text-ivory/40">Gemstone</span>
          </h2>
          <p className="text-base text-ivory/35 font-sans font-light">
            Each gemstone tells a different story. Which will be yours?
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map(cat => {
            const count = products.filter(p => p.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/vault?category=${cat.id}`}
                className="group relative aspect-square bg-steel overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-15 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 select-none">
                    {cat.icon}
                  </span>
                </div>
                <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative h-full flex flex-col justify-end p-5 bg-gradient-to-t from-obsidian/80 to-transparent">
                  <h3 className="text-lg font-cormorant font-semibold text-ivory/70 group-hover:text-ivory transition-colors duration-500 mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[10px] font-sans text-ivory/25">{count} pieces</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
