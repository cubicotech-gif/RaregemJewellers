import { supabase } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import ShopFilters from '@/components/ShopFilters'

interface SearchParams {
  category?: string
  gem?: string
  sort?: string
}

async function getProducts(searchParams: SearchParams) {
  let query = supabase.from('products').select('*')

  // Apply category filter
  if (searchParams.category) {
    query = query.eq('category', searchParams.category)
  }

  // Apply gem type filter
  if (searchParams.gem) {
    query = query.eq('gem_type', searchParams.gem)
  }

  // Apply sorting
  if (searchParams.sort === 'price-asc') {
    query = query.order('price', { ascending: true })
  } else if (searchParams.sort === 'price-desc') {
    query = query.order('price', { ascending: false })
  } else {
    query = query.order('created_at', { ascending: false })
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data || []
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const products = await getProducts(searchParams)

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-4 gradient-text">
            {searchParams.category === 'womens' && "Women's Collection"}
            {searchParams.category === 'mens' && "Men's Collection"}
            {!searchParams.category && "All Products"}
          </h1>
          <p className="text-neutral-600">
            Discover our exquisite collection of rare gemstone jewelry
          </p>
        </div>

        {/* Filters */}
        <ShopFilters />

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-600 text-lg mb-4">
              No products found matching your criteria.
            </p>
            <p className="text-neutral-500">
              Try adjusting your filters or browse all products.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
