import Link from 'next/link'
import { ArrowRight, Sparkles, Award, Shield } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { supabase } from '@/lib/supabase'

async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .limit(4)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-700 to-gold-600 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Discover Rare Gems
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Exquisite jewelry crafted with the world's most precious gemstones. 
              Timeless elegance for discerning collectors.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary flex items-center space-x-2">
                <span>Shop Collection</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/about" className="btn-secondary bg-white/10 border-white text-white hover:bg-white hover:text-purple-900">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Rare & Authentic</h3>
              <p className="text-neutral-600">
                Every gem is certified and sourced from trusted suppliers worldwide
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
                <Award className="h-8 w-8 text-gold-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Master Craftsmanship</h3>
              <p className="text-neutral-600">
                Handcrafted by skilled artisans with decades of experience
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">Lifetime Guarantee</h3>
              <p className="text-neutral-600">
                We stand behind every piece with our comprehensive warranty
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl font-bold mb-4 gradient-text">
              Featured Collection
            </h2>
            <p className="text-neutral-600 text-lg">
              Handpicked pieces showcasing the finest gemstones
            </p>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-neutral-600">
                Featured products will appear here once added to the database.
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/shop" className="btn-primary inline-flex items-center space-x-2">
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/shop?category=womens" className="group relative overflow-hidden rounded-lg h-80 card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-500">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
              </div>
              <div className="relative h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="font-serif text-4xl font-bold mb-2">Women's Collection</h3>
                  <p className="text-lg">Elegant & Timeless</p>
                </div>
              </div>
            </Link>

            <Link href="/shop?category=mens" className="group relative overflow-hidden rounded-lg h-80 card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-600">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all"></div>
              </div>
              <div className="relative h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="font-serif text-4xl font-bold mb-2">Men's Collection</h3>
                  <p className="text-lg">Bold & Distinguished</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
