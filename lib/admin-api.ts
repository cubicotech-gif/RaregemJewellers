import { supabase } from './supabase'
import {
  DashboardStats,
  StockHistory,
  Expense,
  CustomerAnalytics,
  BestSellingProduct,
  RevenueData,
  AdminProduct,
  AdminOrder
} from './admin-types'

export const adminApi = {
  // Dashboard
  async getDashboardStats(): Promise<DashboardStats | null> {
    const { data, error } = await supabase
      .from('dashboard_stats')
      .select('*')
      .single()

    if (error) {
      console.error('Error fetching dashboard stats:', error)
      return null
    }

    return data
  },

  async getRevenueData(days: number = 30): Promise<RevenueData[]> {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const { data, error } = await supabase
      .from('orders')
      .select('created_at, total_amount')
      .gte('created_at', startDate.toISOString())
      .neq('status', 'cancelled')

    if (error || !data) return []

    // Group by date
    const revenueByDate = data.reduce((acc: any, order) => {
      const date = new Date(order.created_at).toISOString().split('T')[0]
      if (!acc[date]) {
        acc[date] = { revenue: 0, orders: 0 }
      }
      acc[date].revenue += Number(order.total_amount)
      acc[date].orders += 1
      return acc
    }, {})

    return Object.entries(revenueByDate).map(([date, data]: [string, any]) => ({
      date,
      revenue: data.revenue,
      orders: data.orders
    }))
  },

  async getBestSellingProducts(limit: number = 10): Promise<BestSellingProduct[]> {
    const { data, error } = await supabase
      .from('best_selling_products')
      .select('*')
      .limit(limit)

    if (error || !data) return []
    return data
  },

  async getRecentOrders(limit: number = 10): Promise<AdminOrder[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error || !data) return []
    return data as AdminOrder[]
  },

  // Products
  async getAllProducts(): Promise<AdminProduct[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('archived', false)
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data as AdminProduct[]
  },

  async getProduct(id: string): Promise<AdminProduct | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return data as AdminProduct
  },

  async createProduct(product: Partial<AdminProduct>): Promise<{ success: boolean; error?: string; data?: AdminProduct }> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) return { success: false, error: error.message }

    return { success: true, data: data as AdminProduct }
  },

  async updateProduct(id: string, updates: Partial<AdminProduct>): Promise<{ success: boolean; error?: string }> {
    // Check for price changes
    if (updates.price) {
      const current = await this.getProduct(id)
      if (current && current.price !== updates.price) {
        await supabase.from('price_history').insert({
          product_id: id,
          previous_price: current.price,
          new_price: updates.price,
          changed_by: 'Admin'
        })
      }
    }

    // Check for stock changes
    if (updates.stock !== undefined) {
      const current = await this.getProduct(id)
      if (current && current.stock !== updates.stock) {
        await supabase.from('stock_history').insert({
          product_id: id,
          previous_stock: current.stock,
          new_stock: updates.stock,
          change_amount: updates.stock - current.stock,
          change_reason: 'Manual update',
          changed_by: 'Admin'
        })
      }
    }

    const { error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)

    if (error) return { success: false, error: error.message }

    return { success: true }
  },

  async deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }

    return { success: true }
  },

  async archiveProduct(id: string): Promise<{ success: boolean; error?: string }> {
    return this.updateProduct(id, { archived: true })
  },

  // Orders
  async getAllOrders(): Promise<AdminOrder[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data as AdminOrder[]
  },

  async getOrder(id: string): Promise<AdminOrder | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) return null
    return data as AdminOrder
  },

  async updateOrderStatus(id: string, status: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)

    if (error) return { success: false, error: error.message }

    return { success: true }
  },

  async addOrderNote(orderId: string, note: string, isInternal: boolean = true): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('order_notes')
      .insert({
        order_id: orderId,
        note,
        is_internal: isInternal,
        created_by: 'Admin'
      })

    if (error) return { success: false, error: error.message }

    return { success: true }
  },

  // Inventory
  async getLowStockProducts(threshold: number = 10): Promise<AdminProduct[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .lte('stock', threshold)
      .gt('stock', 0)
      .eq('archived', false)
      .order('stock', { ascending: true })

    if (error || !data) return []
    return data as AdminProduct[]
  },

  async getStockHistory(productId: string): Promise<StockHistory[]> {
    const { data, error } = await supabase
      .from('stock_history')
      .select('*')
      .eq('product_id', productId)
      .order('created_at', { ascending: false })

    if (error || !data) return []
    return data
  },

  // Expenses
  async getExpenses(startDate?: string, endDate?: string): Promise<Expense[]> {
    let query = supabase
      .from('expenses')
      .select('*')
      .order('expense_date', { ascending: false })

    if (startDate) {
      query = query.gte('expense_date', startDate)
    }
    if (endDate) {
      query = query.lte('expense_date', endDate)
    }

    const { data, error } = await query

    if (error || !data) return []
    return data
  },

  async addExpense(expense: Omit<Expense, 'id' | 'created_at' | 'created_by'>): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('expenses')
      .insert({
        ...expense,
        created_by: 'Admin'
      })

    if (error) return { success: false, error: error.message }

    return { success: true }
  },

  // Customers
  async getCustomerAnalytics(): Promise<CustomerAnalytics[]> {
    const { data, error } = await supabase
      .from('customer_analytics')
      .select('*')
      .order('total_spent', { ascending: false })

    if (error || !data) return []
    return data
  },

  async updateCustomerSegments() {
    // Auto-segment customers based on spending
    const { data: customers } = await supabase
      .from('customer_analytics')
      .select('*')

    if (!customers) return

    for (const customer of customers) {
      let segment: 'new' | 'regular' | 'vip' = 'new'

      if (customer.total_spent > 10000) {
        segment = 'vip'
      } else if (customer.total_orders > 3) {
        segment = 'regular'
      }

      if (customer.customer_segment !== segment) {
        await supabase
          .from('customer_analytics')
          .update({ customer_segment: segment })
          .eq('id', customer.id)
      }
    }
  },

  // Settings
  async getSetting(key: string): Promise<any> {
    const { data, error } = await supabase
      .from('store_settings')
      .select('setting_value')
      .eq('setting_key', key)
      .single()

    if (error || !data) return null
    return data.setting_value
  },

  async updateSetting(key: string, value: any): Promise<{ success: boolean; error?: string }> {
    const { error } = await supabase
      .from('store_settings')
      .upsert({
        setting_key: key,
        setting_value: value
      })

    if (error) return { success: false, error: error.message }

    return { success: true }
  }
}
