'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import { AdminOrder } from '@/lib/admin-types'
import {
  ShoppingCart,
  Search,
  Eye,
  Download,
  Filter,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [searchTerm, statusFilter, orders])

  const loadOrders = async () => {
    setLoading(true)
    const data = await adminApi.getAllOrders()
    setOrders(data)
    setLoading(false)
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(o =>
        o.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(o => o.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const result = await adminApi.updateOrderStatus(orderId, newStatus)
    if (result.success) {
      toast.success('Order status updated')
      loadOrders()
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
          <p className="text-neutral-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Orders</h1>
          <p className="text-neutral-600 mt-1">Manage customer orders and shipments</p>
        </div>
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
                placeholder="Search by customer name, email, or order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Total Orders</p>
          <p className="text-2xl font-bold text-neutral-900">{orders.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {orders.filter(o => o.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Processing</p>
          <p className="text-2xl font-bold text-blue-600">
            {orders.filter(o => o.status === 'processing').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Shipped</p>
          <p className="text-2xl font-bold text-purple-600">
            {orders.filter(o => o.status === 'shipped').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <p className="text-sm text-neutral-600">Delivered</p>
          <p className="text-2xl font-bold text-green-600">
            {orders.filter(o => o.status === 'delivered').length}
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Total
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
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  {/* Order ID */}
                  <td className="px-6 py-4">
                    <p className="font-mono text-sm text-neutral-900">
                      {order.id.substring(0, 8)}...
                    </p>
                  </td>

                  {/* Customer */}
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-neutral-900">{order.user_name}</p>
                      <p className="text-sm text-neutral-500">{order.user_email}</p>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-900">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(order.created_at).toLocaleTimeString()}
                    </p>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-900">
                      ${order.total_amount.toFixed(2)}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">View Details</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
