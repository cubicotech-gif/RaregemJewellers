'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { adminAuth } from '@/lib/admin-auth'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  Boxes
} from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface NavItem {
  name: string
  href: string
  icon: React.ElementType
}

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Inventory', href: '/admin/inventory', icon: Boxes },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Finances', href: '/admin/finances', icon: DollarSign },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const user = adminAuth.getCurrentUser()

  const handleLogout = async () => {
    await adminAuth.logout()
    toast.success('Logged out successfully')
    router.push('/admin/login')
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-purple-600 text-white rounded-lg shadow-lg"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white shadow-2xl z-40 transition-transform duration-300
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-purple-700/50">
          <h1 className="font-serif text-2xl font-bold mb-1">Rare Gems</h1>
          <p className="text-purple-300 text-sm">Admin Panel</p>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-purple-700/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center">
              <span className="font-semibold text-lg">
                {user?.full_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.full_name || 'Admin'}</p>
              <p className="text-xs text-purple-300 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${
                    active
                      ? 'bg-white text-purple-900 shadow-lg'
                      : 'text-purple-100 hover:bg-purple-700/50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-purple-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-purple-100 hover:bg-purple-700/50 rounded-lg transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}
