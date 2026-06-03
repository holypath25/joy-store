'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

const PRODUCT_OPTIONS = [
  'Nabota (나보타) — Botulinum Toxin',
  'Botulax (보툴렉스) — Botulinum Toxin',
  'Xeomin (제오민) — Botulinum Toxin',
  'Yvoire (이브아르) — HA Filler',
  'Lituaux (리투오) — HA Filler',
  'Rejuran (리쥬란) — PDRN Skin Booster',
  'PDRN Skincare Line (Topical)',
  'Hair Loss Ampoule',
  'Other / Custom Request',
]

const BUSINESS_TYPES = [
  'Distributor',
  'Clinic / Medical Spa',
  'Beauty Salon / Spa',
  'Ecommerce / Online Retailer',
  'Brick & Mortar Retailer',
  'Other',
]

export default function QuoteRequestForm() {
  const [state, setState] = useState<FormState>('idle')
  const [selected, setSelected] = useState<string[]>([])

  function toggleProduct(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    )
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('submitting')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    try {
      const res = await fetch('/api/quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, products: selected }),
      })
      if (res.ok) {
        setState('success')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="text-center py-16 px-6">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-ink mb-3">Quote Request Received!</h2>
        <p className="text-ink-muted max-w-sm mx-auto">
          Our team will review your request and get back to you within 24 hours with pricing and availability.
        </p>
        <div className="mt-8">
          <Button href="/products" variant="secondary">
            Browse More Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Contact info */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-5">Your Contact Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-ink mb-1.5">
              First Name <span className="text-brand-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              placeholder="Jane"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-ink mb-1.5">
              Last Name <span className="text-brand-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              placeholder="Smith"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
              Business Email <span className="text-brand-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              placeholder="jane@company.com"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
              Phone / WhatsApp
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              placeholder="+1 555 000 0000"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="company" className="block text-sm font-medium text-ink mb-1.5">
              Company Name <span className="text-brand-500">*</span>
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              placeholder="Your Company Ltd."
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-ink mb-1.5">
              Country <span className="text-brand-500">*</span>
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              placeholder="United States"
            />
          </div>
          <div>
            <label htmlFor="businessType" className="block text-sm font-medium text-ink mb-1.5">
              Business Type <span className="text-brand-500">*</span>
            </label>
            <select
              id="businessType"
              name="businessType"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition bg-white"
            >
              <option value="">Select type…</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-1">Products of Interest</h2>
        <p className="text-sm text-ink-muted mb-4">Select all that apply</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRODUCT_OPTIONS.map((name) => {
            const checked = selected.includes(name)
            return (
              <label
                key={name}
                className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  checked
                    ? 'border-brand-400 bg-brand-50'
                    : 'border-slate-200 hover:border-brand-200 hover:bg-brand-50/50'
                }`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleProduct(name)}
                />
                <span className={`w-5 h-5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                  checked ? 'bg-brand-500 border-brand-500' : 'border-slate-300'
                }`}>
                  {checked && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </span>
                <span className="text-sm text-ink">{name}</span>
              </label>
            )
          })}
        </div>
      </div>

      {/* Order details */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-5">Order Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-ink mb-1.5">
              Estimated Monthly Quantity
            </label>
            <select
              id="quantity"
              name="quantity"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition bg-white"
            >
              <option value="">Select range…</option>
              <option>Under 100 units</option>
              <option>100 – 500 units</option>
              <option>500 – 1,000 units</option>
              <option>1,000 – 5,000 units</option>
              <option>5,000+ units</option>
            </select>
          </div>
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-ink mb-1.5">
              First Order Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition bg-white"
            >
              <option value="">Select timeline…</option>
              <option>As soon as possible</option>
              <option>Within 1 month</option>
              <option>1 – 3 months</option>
              <option>3+ months</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
              Additional Notes
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-ink placeholder:text-ink-faint focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition resize-none"
              placeholder="Tell us about your business, specific requirements, or any questions…"
            />
          </div>
        </div>
      </div>

      {state === 'error' && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          Something went wrong. Please try again or contact us via WhatsApp.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={state === 'submitting'}
        className="w-full sm:w-auto"
      >
        {state === 'submitting' ? 'Sending…' : 'Submit Quote Request'}
      </Button>

      <p className="text-xs text-ink-faint">
        By submitting, you agree to our{' '}
        <a href="/privacy-policy" className="underline hover:text-ink-muted">Privacy Policy</a>.
        We respond within 24 business hours.
      </p>
    </form>
  )
}
