'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/admin-api'
import { Expense } from '@/lib/admin-types'
import { DollarSign, Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FinancesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: '',
    amount: '',
    description: '',
    expense_date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    setLoading(true)
    const data = await adminApi.getExpenses()
    setExpenses(data)
    setLoading(false)
  }

  const handleAddExpense = async () => {
    if (!newExpense.category || !newExpense.amount) {
      toast.error('Please fill in required fields')
      return
    }

    const result = await adminApi.addExpense({
      category: newExpense.category,
      amount: Number(newExpense.amount),
      description: newExpense.description || null,
      expense_date: newExpense.expense_date
    })

    if (result.success) {
      toast.success('Expense added successfully')
      setShowAddExpense(false)
      setNewExpense({
        category: '',
        amount: '',
        description: '',
        expense_date: new Date().toISOString().split('T')[0]
      })
      loadExpenses()
    } else {
      toast.error('Failed to add expense')
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-600">Loading finances...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Finances</h1>
          <p className="text-neutral-600 mt-1">Track revenue and expenses</p>
        </div>

        <button
          onClick={() => setShowAddExpense(!showAddExpense)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Expense
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">Total Expenses</p>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-3xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">Total Categories</p>
            <Wallet className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">
            {Array.from(new Set(expenses.map(e => e.category))).length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-neutral-200">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-neutral-600">This Month</p>
            <DollarSign className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-600">
            ${expenses
              .filter(e => new Date(e.expense_date).getMonth() === new Date().getMonth())
              .reduce((sum, e) => sum + Number(e.amount), 0)
              .toFixed(2)}
          </p>
        </div>
      </div>

      {/* Add Expense Form */}
      {showAddExpense && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Add New Expense</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
              <input
                type="text"
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Shipping, Materials"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Amount</label>
              <input
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="0.00"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Date</label>
              <input
                type="date"
                value={newExpense.expense_date}
                onChange={(e) => setNewExpense({ ...newExpense, expense_date: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
              <input
                type="text"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAddExpense}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Expense
            </button>
            <button
              onClick={() => setShowAddExpense(false)}
              className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-lg hover:bg-neutral-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Expenses List */}
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900">Recent Expenses</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-neutral-50 border-b border-neutral-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-900">
                      {new Date(expense.expense_date).toLocaleDateString()}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-sm">
                      {expense.category}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-neutral-600">{expense.description || '-'}</p>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <p className="font-semibold text-red-600">${Number(expense.amount).toFixed(2)}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {expenses.length === 0 && (
            <div className="text-center py-12">
              <Wallet className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <p className="text-neutral-600">No expenses recorded yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
