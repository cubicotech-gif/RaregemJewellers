'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { adminApi } from '@/lib/admin-api'
import { AdminOrder } from '@/lib/admin-types'
import { ArrowLeft, Package, User, MapPin, CreditCard, Truck } from 'lucide-react'
import toast from 'react-hot-toast'

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<AdminOrder | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOrder()
  }, [params.id])

  const loadOrder = async () => {
    setLoading(true)
    const data = await adminApi.getOrder(params.id as string)
    setOrder(data)
    setLoading(false)
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!order) return

    const result = await adminApi.updateOrderStatus(order.id, newStatus)
    if (result.success) {
      toast.success('Order status updated')
      loadOrder()
    } else {
      toast.error('Failed to update status')
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      processing: 'bg-blue-100 text-blue-700',
      shipped: 'bg-purple-100 text-purple-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading order...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-600">Order not found</p>
        <button
          onClick={() => router.push('/admin/orders')}
          className="mt-4 text-purple-600 hover:text-purple-700"
        >
          ← Back to Orders
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/orders')}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Order Details</h1>
            <p className="text-neutral-600 mt-1">Order #{order.id.substring(0, 8)}</p>
          </div>
        </div>

        <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      {/* Order Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Customer Information</h2>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-600">Name</p>
              <p className="font-medium text-neutral-900">{order.user_name}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600">Email</p>
              <p className="font-medium text-neutral-900">{order.user_email}</p>
            </div>
            <div>
              <p className="text-sm text-neutral-600">Phone</p>
              <p className="font-medium text-neutral-900">{order.user_phone}</p>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Shipping Address</h2>
          </div>

          <p className="text-neutral-900 whitespace-pre-line">{order.shipping_address}</p>
        </div>

        {/* Payment Info */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <CreditCard className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Payment Details</h2>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm text-neutral-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">${order.total_amount.toFixed(2)}</p>
            </div>
            {order.payment_method && (
              <div>
                <p className="text-sm text-neutral-600">Payment Method</p>
                <p className="font-medium text-neutral-900">{order.payment_method}</p>
              </div>
            )}
            {order.payment_status && (
              <div>
                <p className="text-sm text-neutral-600">Payment Status</p>
                <p className="font-medium text-neutral-900 capitalize">{order.payment_status}</p>
              </div>
            )}
          </div>
        </div>

        {/* Order Status Management */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center gap-3 mb-4">
            <Truck className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Update Status</h2>
          </div>

          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {order.tracking_number && (
            <div className="mt-4">
              <p className="text-sm text-neutral-600">Tracking Number</p>
              <p className="font-mono font-medium text-neutral-900">{order.tracking_number}</p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-xs text-neutral-500">
              Created: {new Date(order.created_at).toLocaleString()}
            </p>
            <p className="text-xs text-neutral-500">
              Updated: {new Date(order.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-neutral-900">Order Items</h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-center text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {order.items && Array.isArray(order.items) && order.items.map((item: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-900">{item.product_name}</p>
                    {item.product_id && (
                      <p className="text-xs text-neutral-500">ID: {item.product_id.substring(0, 8)}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-medium text-neutral-900">${Number(item.price).toFixed(2)}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <p className="font-medium text-neutral-900">{item.quantity}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-neutral-900">
                      ${(Number(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-neutral-50 border-t border-neutral-200">
              <tr>
                <td colSpan={3} className="px-6 py-4 text-right font-semibold text-neutral-900">
                  Total:
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-xl font-bold text-green-600">${order.total_amount.toFixed(2)}</p>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}
