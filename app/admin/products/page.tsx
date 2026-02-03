'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import { AdminProduct } from '@/lib/admin-types'
import AddProductModal from '@/components/admin/AddProductModal'
import EditProductModal from '@/components/admin/EditProductModal'
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Archive,
  Star,
  AlertCircle,
  X,
  Save
} from 'lucide-react'
import toast from 'react-hot-toast'

export default function ProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([])
  const [filteredProducts, setFilteredProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [searchTerm, categoryFilter, products])

  const loadProducts = async () => {
    setLoading(true)
    const data = await adminApi.getAllProducts()
    setProducts(data)
    setLoading(false)
  }

  const filterProducts = () => {
    let filtered = products

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.gem_type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(p => p.category === categoryFilter)
    }

    setFilteredProducts(filtered)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    const result = await adminApi.deleteProduct(id)
    if (result.success) {
      toast.success('Product deleted successfully')
      loadProducts()
    } else {
      toast.error(result.error || 'Failed to delete product')
    }
  }

  const handleToggleFeatured = async (product: AdminProduct) => {
    const result = await adminApi.updateProduct(product.id, {
      featured: !product.featured
    })

    if (result.success) {
      toast.success(product.featured ? 'Removed from featured' : 'Added to featured')
      loadProducts()
    } else {
      toast.error('Failed to update product')
    }
  }

  const handleQuickEdit = async (product: AdminProduct, field: string, value: any) => {
    const result = await adminApi.updateProduct(product.id, {
      [field]: value
    })

    if (result.success) {
      toast.success('Updated successfully')
      loadProducts()
    } else {
      toast.error('Failed to update')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Products</h1>
          <p className="text-neutral-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-neutral-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="mens">Men's Jewelry</option>
              <option value="womens">Women's Jewelry</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Total Products</p>
          <p className="text-2xl font-bold text-neutral-900">{products.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Low Stock</p>
          <p className="text-2xl font-bold text-orange-600">
            {products.filter(p => p.stock < 10 && p.stock > 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Out of Stock</p>
          <p className="text-2xl font-bold text-red-600">
            {products.filter(p => p.stock === 0).length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Featured</p>
          <p className="text-2xl font-bold text-purple-600">
            {products.filter(p => p.featured).length}
          </p>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-neutral-50 transition-colors">
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-neutral-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-neutral-900 truncate">{product.name}</p>
                        <p className="text-sm text-neutral-500">{product.gem_type}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                      {product.category === 'mens' ? "Men's" : "Women's"}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => handleQuickEdit(product, 'price', Number(e.target.value))}
                      className="w-24 px-2 py-1 border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                      step="0.01"
                      min="0"
                    />
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={product.stock}
                        onChange={(e) => handleQuickEdit(product, 'stock', Number(e.target.value))}
                        className={`w-20 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                          product.stock === 0
                            ? 'border-red-300 text-red-700'
                            : product.stock < 10
                            ? 'border-orange-300 text-orange-700'
                            : 'border-neutral-300'
                        }`}
                        min="0"
                      />
                      {product.stock < 10 && product.stock > 0 && (
                        <AlertCircle className="w-4 h-4 text-orange-500" />
                      )}
                      {product.stock === 0 && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleFeatured(product)}
                      className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                        product.featured
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      <Star className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                      <span className="text-xs font-medium">
                        {product.featured ? 'Featured' : 'Not Featured'}
                      </span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No products found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadProducts}
      />

      {/* Edit Product Modal */}
      <EditProductModal
        isOpen={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        onSuccess={loadProducts}
        product={editingProduct}
      />
    </div>
  )
}
