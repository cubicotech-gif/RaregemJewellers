'use client'

import { useState, useEffect } from 'react'
import { adminApi } from '@/lib/admin-api'
import { AdminProduct } from '@/lib/admin-types'
import MediaUploader from './MediaUploader'
import { X, Save } from 'lucide-react'
import toast from 'react-hot-toast'

interface EditProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  product: AdminProduct | null
}

export default function EditProductModal({ isOpen, onClose, onSuccess, product }: EditProductModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'womens' as 'mens' | 'womens',
    gem_type: '',
    metal_type: '',
    stock: '',
    featured: false,
    sku: '',
    cost_price: '',
    images: [] as string[]
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        category: product.category || 'womens',
        gem_type: product.gem_type || '',
        metal_type: product.metal_type || '',
        stock: product.stock?.toString() || '',
        featured: product.featured || false,
        sku: product.sku || '',
        cost_price: product.cost_price?.toString() || '',
        images: product.images || []
      })
    }
  }, [product])

  if (!isOpen || !product) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Start with required fields
      const productData: any = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: formData.category,
        gem_type: formData.gem_type,
        metal_type: formData.metal_type,
        stock: Number(formData.stock),
        featured: formData.featured,
        images: formData.images
      }

      // Add optional fields only if they have values
      if (formData.sku) {
        productData.sku = formData.sku
      }
      if (formData.cost_price) {
        productData.cost_price = Number(formData.cost_price)
      }

      const result = await adminApi.updateProduct(product.id, productData)

      if (result.success) {
        toast.success('Product updated successfully!')
        onSuccess()
        onClose()
      } else {
        toast.error(result.error || 'Failed to update product')
      }
    } catch (error) {
      console.error('Update error:', error)
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-neutral-900">Edit Product</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Media Upload */}
          <MediaUploader
            productId={product.id}
            existingMedia={formData.images}
            onMediaUpdate={(urls) => setFormData({ ...formData, images: urls })}
          />

          <div className="border-t border-neutral-200 pt-6">
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={3}
              />
            </div>

            {/* Price & Cost */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Selling Price * ($)
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Cost Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.cost_price}
                  onChange={(e) => setFormData({ ...formData, cost_price: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'mens' | 'womens' })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="womens">Women's Jewelry</option>
                <option value="mens">Men's Jewelry</option>
              </select>
            </div>

            {/* Gem Type & Metal Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Gemstone Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.gem_type}
                  onChange={(e) => setFormData({ ...formData, gem_type: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Metal Type *
                </label>
                <input
                  type="text"
                  required
                  value={formData.metal_type}
                  onChange={(e) => setFormData({ ...formData, metal_type: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Stock & SKU */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  SKU (Optional)
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                id="featured-edit"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="featured-edit" className="text-sm font-medium text-neutral-700">
                Mark as Featured Product
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-neutral-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Product</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
