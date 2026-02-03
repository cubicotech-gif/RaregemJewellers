'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import StatsCard from '@/components/admin/StatsCard'
import RevenueChart from '@/components/admin/RevenueChart'
import {
  DollarSign,
  ShoppingCart,
  AlertCircle,
  Package,
  TrendingUp,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { DashboardStats, RevenueData, BestSellingProduct, AdminOrder } from '@/lib/admin-types'

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [revenueData, setRevenueData] = useState<RevenueData[]>([])
  const [bestSellers, setBestSellers] = useState<BestSellingProduct[]>([])
  const [recentOrders, setRecentOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()

    // Auto-refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsData, revenue, products, orders] = await Promise.all([
        adminApi.getDashboardStats(),
        adminApi.getRevenueData(30),
        adminApi.getBestSellingProducts(5),
        adminApi.getRecentOrders(10)
      ])

      setStats(statsData)
      setRevenueData(revenue)
      setBestSellers(products)
      setRecentOrders(orders)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
        <p className="text-neutral-600">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Today's Revenue"
          value={`$${stats?.today_revenue.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="green"
        />
        <StatsCard
          title="Today's Orders"
          value={stats?.today_orders || 0}
          icon={ShoppingCart}
          color="blue"
        />
        <StatsCard
          title="Pending Orders"
          value={stats?.pending_orders || 0}
          icon={AlertCircle}
          color="orange"
        />
        <StatsCard
          title="Low Stock Items"
          value={stats?.low_stock_count || 0}
          icon={Package}
          color="red"
        />
      </div>

      {/* Revenue Chart */}
      <RevenueChart data={revenueData} />

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Best Selling Products */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Best Sellers</h3>
            <Link href="/admin/products" className="text-sm text-purple-600 hover:text-purple-700">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {bestSellers.length > 0 ? (
              bestSellers.map((product) => (
                <div key={product.id} className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg transition-colors">
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

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-900 truncate">{product.name}</p>
                    <p className="text-sm text-neutral-500">${product.price.toFixed(2)}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">{product.total_sold || 0}</p>
                    <p className="text-xs text-neutral-500">sold</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-neutral-500 py-8">No sales data yet</p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm text-purple-600 hover:text-purple-700">
              View all
            </Link>
          </div>

          <div className="space-y-3">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/orders/${order.id}`}
                  className="block p-3 hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-neutral-900">{order.user_name}</p>
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${order.status === 'delivered' ? 'bg-green-100 text-green-700' : ''}
                      ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                      ${order.status === 'processing' ? 'bg-blue-100 text-blue-700' : ''}
                      ${order.status === 'shipped' ? 'bg-purple-100 text-purple-700' : ''}
                      ${order.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-neutral-500">{order.user_email}</p>
                    <p className="font-semibold text-neutral-900">${order.total_amount.toFixed(2)}</p>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-center text-neutral-500 py-8">No orders yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats?.total_orders || 0}</p>
          <p className="text-purple-100">Total Orders</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">${stats?.total_revenue.toFixed(2) || '0.00'}</p>
          <p className="text-green-100">Total Revenue</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Package className="w-8 h-8 opacity-80" />
          </div>
          <p className="text-3xl font-bold mb-1">{stats?.out_of_stock_count || 0}</p>
          <p className="text-orange-100">Out of Stock</p>
        </div>
      </div>
    </div>
  )
}
