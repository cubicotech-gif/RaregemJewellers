'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import { CustomerAnalytics } from '@/lib/admin-types'
import { Users, Mail, DollarSign, ShoppingBag } from 'lucide-react'

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerAnalytics[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCustomers()
  }, [])

  const loadCustomers = async () => {
    setLoading(true)
    const data = await adminApi.getCustomerAnalytics()
    setCustomers(data)
    setLoading(false)
  }

  const getSegmentColor = (segment: string) => {
    const colors: Record<string, string> = {
      vip: 'bg-purple-100 text-purple-700',
      regular: 'bg-blue-100 text-blue-700',
      new: 'bg-green-100 text-green-700'
    }
    return colors[segment] || 'bg-gray-100 text-gray-700'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading customers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Customers</h1>
        <p className="text-neutral-600 mt-1">Manage customer relationships and analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">Total Customers</p>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-neutral-900">{customers.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">VIP Customers</p>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {customers.filter(c => c.customer_segment === 'vip').length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">Total Orders</p>
            <ShoppingBag className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {customers.reduce((sum, c) => sum + c.total_orders, 0)}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            ${customers.reduce((sum, c) => sum + c.total_spent, 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Last Purchase
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-neutral-900">{customer.customer_name || 'Unknown'}</p>
                      <p className="text-sm text-neutral-500">{customer.customer_email}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSegmentColor(customer.customer_segment)}`}>
                      {customer.customer_segment.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-900">{customer.total_orders}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="font-semibold text-green-600">${customer.total_spent.toFixed(2)}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-900">
                      {customer.last_purchase_date
                        ? new Date(customer.last_purchase_date).toLocaleDateString()
                        : 'Never'}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {customers.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No customers yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
