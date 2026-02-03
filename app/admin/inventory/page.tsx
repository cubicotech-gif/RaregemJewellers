'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import { AdminProduct, StockHistory } from '@/lib/admin-types'
import { AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react'

export default function InventoryPage() {
  const [lowStockProducts, setLowStockProducts] = useState<AdminProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInventoryData()
  }, [])

  const loadInventoryData = async () => {
    setLoading(true)
    const products = await adminApi.getLowStockProducts(10)
    setLowStockProducts(products)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading inventory...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Inventory Management</h1>
        <p className="text-neutral-600 mt-1">Monitor stock levels and manage inventory</p>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h2 className="text-lg font-semibold text-orange-900">Low Stock Alert</h2>
        </div>

        {lowStockProducts.length > 0 ? (
          <div className="space-y-3">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-lg flex items-center justify-between">
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
                  <div>
                    <p className="font-medium text-neutral-900">{product.name}</p>
                    <p className="text-sm text-neutral-500">{product.gem_type} - {product.metal_type}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className={`text-2xl font-bold ${product.stock === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                    {product.stock}
                  </p>
                  <p className="text-sm text-neutral-500">in stock</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-orange-700">No low stock items. All products are well stocked!</p>
        )}
      </div>
    </div>
  )
}
