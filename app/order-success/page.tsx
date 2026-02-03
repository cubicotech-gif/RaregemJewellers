'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-12 rounded-lg shadow-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="font-serif text-4xl font-bold mb-4 text-neutral-900">
            Order Placed Successfully!
          </h1>

          <p className="text-lg text-neutral-600 mb-6">
            Thank you for your purchase. We've received your order and will process it shortly.
          </p>

          {orderId && (
            <div className="bg-neutral-50 p-4 rounded-lg mb-8">
              <p className="text-sm text-neutral-600 mb-1">Order ID</p>
              <p className="font-mono text-lg font-semibold text-neutral-900">
                {orderId}
              </p>
            </div>
          )}

          <div className="space-y-4 mb-8">
            <p className="text-neutral-600">
              A confirmation email has been sent to your email address with order details.
            </p>
            <p className="text-neutral-600">
              We'll notify you when your order ships.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
