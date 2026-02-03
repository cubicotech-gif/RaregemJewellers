'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import { Settings as SettingsIcon, Save, Database } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    store_name: 'Rare Gems Jewelry',
    store_email: 'contact@raregems.com',
    store_phone: '+1 234 567 8900',
    currency: 'USD',
    tax_rate: '0.08',
    low_stock_threshold: '10'
  })
  const [loading, setLoading] = useState(false)

  const handleSaveSettings = async () => {
    setLoading(true)

    try {
      await Promise.all([
        adminApi.updateSetting('store_name', settings.store_name),
        adminApi.updateSetting('store_email', settings.store_email),
        adminApi.updateSetting('store_phone', settings.store_phone),
        adminApi.updateSetting('currency', settings.currency),
        adminApi.updateSetting('tax_rate', Number(settings.tax_rate)),
        adminApi.updateSetting('low_stock_threshold', Number(settings.low_stock_threshold))
      ])

      toast.success('Settings saved successfully')
    } catch (error) {
      toast.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
          <p className="text-neutral-600 mt-1">Configure your store settings</p>
        </div>
      </div>

      {/* Store Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Store Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Store Name</label>
            <input
              type="text"
              value={settings.store_name}
              onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
              <input
                type="email"
                value={settings.store_email}
                onChange={(e) => setSettings({ ...settings, store_email: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Phone</label>
              <input
                type="tel"
                value={settings.store_phone}
                onChange={(e) => setSettings({ ...settings, store_phone: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Business Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Tax Rate (%)</label>
            <input
              type="number"
              value={settings.tax_rate}
              onChange={(e) => setSettings({ ...settings, tax_rate: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              step="0.01"
              min="0"
              max="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Low Stock Threshold
            </label>
            <input
              type="number"
              value={settings.low_stock_threshold}
              onChange={(e) => setSettings({ ...settings, low_stock_threshold: e.target.value })}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Database Info */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Database className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-purple-900">Database Connection</h3>
        </div>
        <p className="text-sm text-purple-700">
          Connected to Supabase at: <code className="font-mono">{process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oaoohgbyzaazwsnldsab.supabase.co'}</code>
        </p>
        <p className="text-xs text-purple-600 mt-2">
          Run the SQL schema from supabase-schema.sql in your Supabase SQL Editor to set up all tables.
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSaveSettings}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  )
}
