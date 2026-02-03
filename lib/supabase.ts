import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (update after creating tables)
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: 'mens' | 'womens'
  gem_type: string
  metal_type: string
  images: string[]
  stock: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_email: string
  user_name: string
  user_phone: string
  shipping_address: string
  total_amount: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  created_at: string
  updated_at: string
}

export interface OrderItem {
  product_id: string
  quantity: number
  price: number
  product_name: string
}
