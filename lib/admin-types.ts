// Admin Panel Type Definitions

export interface AdminUser {
  id: string
  email: string
  full_name: string | null
  role: 'super_admin' | 'admin' | 'manager'
  last_login: string | null
  created_at: string
}

export interface DashboardStats {
  today_orders: number
  today_revenue: number
  pending_orders: number
  low_stock_count: number
  out_of_stock_count: number
  total_orders: number
  total_revenue: number
}

export interface StockHistory {
  id: string
  product_id: string
  previous_stock: number
  new_stock: number
  change_amount: number
  change_reason: string | null
  changed_by: string | null
  created_at: string
}

export interface PriceHistory {
  id: string
  product_id: string
  previous_price: number
  new_price: number
  changed_by: string | null
  created_at: string
}

export interface Expense {
  id: string
  category: string
  amount: number
  description: string | null
  expense_date: string
  created_by: string | null
  created_at: string
}

export interface CustomerAnalytics {
  id: string
  customer_email: string
  customer_name: string | null
  total_orders: number
  total_spent: number
  last_purchase_date: string | null
  customer_segment: 'new' | 'regular' | 'vip'
  created_at: string
}

export interface AbandonedCart {
  id: string
  user_email: string | null
  user_name: string | null
  cart_items: any[]
  total_amount: number
  recovered: boolean
  created_at: string
}

export interface OrderNote {
  id: string
  order_id: string
  note: string
  created_by: string | null
  is_internal: boolean
  created_at: string
}

export interface StoreSetting {
  id: string
  setting_key: string
  setting_value: any
  updated_at: string
}

export interface ActivityLog {
  id: string
  user_email: string
  action: string
  entity_type: string | null
  entity_id: string | null
  details: any
  ip_address: string | null
  created_at: string
}

export interface BestSellingProduct {
  id: string
  name: string
  price: number
  images: string[]
  order_count: number
  total_sold: number
}

export interface RevenueData {
  date: string
  revenue: number
  orders: number
}

export interface CategoryPerformance {
  category: string
  total_sales: number
  total_orders: number
  avg_order_value: number
}

// Extended Product type with admin fields
export interface AdminProduct extends Product {
  sku: string | null
  weight: number | null
  dimensions: string | null
  cost_price: number | null
  archived: boolean
  seo_title: string | null
  seo_description: string | null
  url_slug: string | null
}

// Extended Order type with admin fields
export interface AdminOrder extends Order {
  payment_status: 'pending' | 'paid' | 'refunded' | 'partial_refund'
  payment_method: string | null
  tracking_number: string | null
  refund_amount: number
  notes: string | null
}

// Import base types
import { Product, Order } from './supabase'
