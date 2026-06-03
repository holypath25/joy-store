import type { Metadata } from 'next'
import QuoteRequestForm from '@/components/forms/QuoteRequestForm'

export const metadata: Metadata = {
  title: 'Request a Wholesale Quote',
  description:
    'Request wholesale pricing for Korean skincare from JOY. Fill out our quick quote form and receive a response within 24 hours.',
}

export default function QuoteRequestPage() {
  return (
    <div className="bg-white">
      <div className="bg-surface-soft border-b border-slate-100">
        <div className="container-page py-12">
          <p className="text-sm font-semibold text-brand-500 uppercase tracking-wider mb-2">B2B Wholesale</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-ink">Request a Quote</h1>
          <p className="mt-3 text-ink-muted max-w-lg">
            Tell us about your business and the products you need. We respond within 24 business hours with pricing and availability.
          </p>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <QuoteRequestForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-brand-50 rounded-2xl p-6">
              <h3 className="font-semibold text-ink mb-3">What happens next?</h3>
              <ol className="space-y-3">
                {[
                  'We review your request within 24 hours',
                  'Our team sends a custom price sheet',
                  'You confirm the order with a deposit',
                  'We ship directly from Korea',
                ].map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-ink-muted">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-200 text-brand-700 text-xs flex items-center justify-center font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-semibold text-ink mb-3">Prefer to chat?</h3>
              <p className="text-sm text-ink-muted mb-4">
                Reach us directly on WhatsApp for faster responses.
              </p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '821012345678'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Message us on WhatsApp
              </a>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="font-semibold text-ink mb-2">Wholesale Benefits</h3>
              <ul className="space-y-2 text-sm text-ink-muted">
                {[
                  'Tiered pricing by volume',
                  'Low minimum order quantities',
                  'OEM / white-label available',
                  'Export docs & customs support',
                  'Dedicated account manager',
                ].map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-brand-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
