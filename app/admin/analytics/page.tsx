'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import RevenueChart from '@/components/admin/RevenueChart'
import { RevenueData } from '@/lib/admin-types'
import { BarChart3, TrendingUp, Calendar } from 'lucide-react'

export default function AnalyticsPage() {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [loading, setLoading] = useState(true)
  const [days, setDays] = useState(30)

  useEffect(() => {
    loadAnalytics()
  }, [days])

  const loadAnalytics = async () => {
    setLoading(true)
    const data = await adminApi.getRevenueData(days)
    setRevenueData(data)
    setLoading(false)
  }

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = revenueData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Analytics</h1>
          <p className="text-neutral-600 mt-1">Track sales performance and trends</p>
        </div>

        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">${totalRevenue.toFixed(2)}</p>
          <p className="text-green-100">Total Revenue</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{totalOrders}</p>
          <p className="text-blue-100">Total Orders</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">${avgOrderValue.toFixed(2)}</p>
          <p className="text-purple-100">Avg Order Value</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={revenueData} />
    </div>
  )
}
