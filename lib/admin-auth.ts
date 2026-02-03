import { supabase } from './supabase'
import bcrypt from 'bcryptjs'
import { AdminUser } from './admin-types'

// Admin session management
const ADMIN_SESSION_KEY = 'admin_session'

export interface AdminSession {
  user: AdminUser
  token: string
  expiresAt: number
}

export const adminAuth = {
  // Login admin user
  async login(email: string, password: string): Promise<{ success: boolean; user?: AdminUser; error?: string }> {
    try {
      // Fetch admin user
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single()

      if (error || !adminUser) {
        return { success: false, error: 'Invalid credentials' }
      }

      // Verify password (Note: In production, password hashing should be done server-side)
      const isValidPassword = await bcrypt.compare(password, adminUser.password_hash)

      if (!isValidPassword) {
        return { success: false, error: 'Invalid credentials' }
      }

      // Update last login
      await supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', adminUser.id)

      // Create session
      const session: AdminSession = {
        user: adminUser,
        token: this.generateToken(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      }

      // Store session
      if (typeof window !== 'undefined') {
        localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
      }

      // Log activity
      await this.logActivity(adminUser.email, 'login', null, null, {})

      return { success: true, user: adminUser }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Login failed' }
    }
  },

  // Logout admin user
  async logout() {
    const session = this.getSession()
    if (session) {
      await this.logActivity(session.user.email, 'logout', null, null, {})
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem(ADMIN_SESSION_KEY)
    }
  },

  // Get current session
  getSession(): AdminSession | null {
    if (typeof window === 'undefined') return null

    const sessionData = localStorage.getItem(ADMIN_SESSION_KEY)
    if (!sessionData) return null

    try {
      const session: AdminSession = JSON.parse(sessionData)

      // Check if session is expired
      if (session.expiresAt < Date.now()) {
        this.logout()
        return null
      }

      return session
    } catch {
      return null
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getSession() !== null
  },

  // Get current user
  getCurrentUser(): AdminUser | null {
    const session = this.getSession()
    return session?.user || null
  },

  // Generate session token
  generateToken(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36)
  },

  // Register new admin (super admin only)
  async registerAdmin(email: string, password: string, fullName: string, role: string): Promise<{ success: boolean; error?: string }> {
    try {
      const currentUser = this.getCurrentUser()

      if (!currentUser || currentUser.role !== 'super_admin') {
        return { success: false, error: 'Unauthorized' }
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, 10)

      // Insert admin user
      const { error } = await supabase
        .from('admin_users')
        .insert({
          email,
          password_hash: passwordHash,
          full_name: fullName,
          role
        })

      if (error) {
        return { success: false, error: error.message }
      }

      await this.logActivity(currentUser.email, 'create_admin', 'admin_users', null, { email, role })

      return { success: true }
    } catch (error) {
      console.error('Register error:', error)
      return { success: false, error: 'Registration failed' }
    }
  },

  // Log admin activity
  async logActivity(
    userEmail: string,
    action: string,
    entityType: string | null,
    entityId: string | null,
    details: any
  ) {
    try {
      await supabase.from('activity_log').insert({
        user_email: userEmail,
        action,
        entity_type: entityType,
        entity_id: entityId,
        details,
        ip_address: null // Can be populated from request in API routes
      })
    } catch (error) {
      console.error('Activity logging error:', error)
    }
  }
}

// Middleware helper for protected routes
export function requireAdmin() {
  if (typeof window !== 'undefined') {
    const session = adminAuth.getSession()
    if (!session) {
      window.location.href = '/admin/login'
      return false
    }
    return true
  }
  return false
}
