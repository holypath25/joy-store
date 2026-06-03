import Link from 'next/link'
import type { Metadata } from 'next'
import Button from '@/components/ui/Button'
import { CATALOG_PRODUCTS, CATEGORIES } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'JOY — Korean Medical Aesthetic Products, Global Distribution',
  description:
    'B2B wholesale distribution of premium Korean & international medical aesthetic products — Nabota, Botulax, Xeomin, Yvoire, Rejuran and more. For licensed medical professionals.',
}

const HOW_TO_ORDER = [
  { step: '01', title: 'Submit Inquiry', desc: 'Fill out our quote request form with the products and quantities you need.' },
  { step: '02', title: 'Receive Price Sheet', desc: 'We respond within 24 hours with a custom wholesale price sheet and availability.' },
  { step: '03', title: 'Confirm & Pay', desc: 'Confirm your order with a deposit. We handle export documentation and shipping.' },
  { step: '04', title: 'Delivered to Your Clinic', desc: 'Direct delivery from Korean manufacturers — cold-chain where required.' },
]

export default function HomePage() {
  const featured = CATALOG_PRODUCTS.filter((p) => p.popular)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0f2340] text-white">
        <div className="container-page py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 border border-white/20 text-white/60 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              For Licensed Medical Professionals Only
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]">
              Korean Medical Aesthetics,{' '}
              <span className="text-[#4db8b8]">Direct to Your Clinic</span>
            </h1>
            <p className="mt-6 text-lg text-white/65 leading-relaxed max-w-xl">
              Wholesale distribution of premium medical aesthetic products — botulinum toxins, HA fillers, PDRN, and skin boosters. Sourced directly from Korean manufacturers and global brands.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/quote-request" size="lg" className="bg-[#4db8b8] hover:bg-[#3da8a8] border-0 text-white">
                Request a Quote
              </Button>
              <Button href="/products" variant="ghost" size="lg" className="text-white hover:bg-white/10 border border-white/30">
                Browse Catalog
              </Button>
            </div>
            <p className="mt-6 text-xs text-white/35">
              Products are for use by licensed physicians, nurses, and aesthetic practitioners only.
            </p>
          </div>
        </div>
      </section>

      {/* Category Bar */}
      <section className="bg-[#162d48] border-b border-white/10">
        <div className="container-page py-6">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="flex flex-col bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 transition-colors group min-w-0"
              >
                <span className="text-white text-sm font-semibold group-hover:text-[#4db8b8] transition-colors">{cat.label}</span>
                <span className="text-white/40 text-xs mt-0.5">{cat.desc}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider mb-2">Popular Products</p>
              <h2 className="text-3xl font-bold text-ink">Featured Brands</h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#008080] hover:text-[#006060] transition-colors"
            >
              View full catalog
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl border border-slate-100 hover:border-[#4db8b8] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                <div
                  className="h-32 flex items-end px-6 pb-5"
                  style={{ backgroundColor: product.imageColor }}
                >
                  <div>
                    <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">{product.categoryLabel}</p>
                    <p className="text-white text-2xl font-bold leading-tight">{product.name}</p>
                    <p className="text-white/60 text-xs">{product.brandKo} · {product.manufacturer}</p>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm text-ink-muted leading-relaxed flex-1">
                    {product.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Indications</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.indications.slice(0, 3).map((ind) => (
                        <span key={ind} className="text-xs bg-surface-muted text-ink-muted px-2.5 py-1 rounded-full">
                          {ind}
                        </span>
                      ))}
                      {product.indications.length > 3 && (
                        <span className="text-xs text-ink-faint px-1 py-1">+{product.indications.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-ink-faint">{product.country}</span>
                    <Link
                      href="/quote-request"
                      className="text-sm font-medium text-[#008080] hover:text-[#006060] transition-colors inline-flex items-center gap-1"
                    >
                      Inquire
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="section-pad bg-surface-soft">
        <div className="container-page">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider mb-2">B2B Process</p>
            <h2 className="text-3xl font-bold text-ink">How to Order</h2>
            <p className="mt-4 text-ink-muted">Simple 4-step process from inquiry to delivery. No unnecessary complexity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_TO_ORDER.map((step, i) => (
              <div key={step.step} className="relative">
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
                  <span className="text-4xl font-bold text-slate-100 leading-none block mb-4">{step.step}</span>
                  <h3 className="font-semibold text-ink mb-2">{step.title}</h3>
                  <p className="text-sm text-ink-muted leading-relaxed">{step.desc}</p>
                </div>
                {i < HOW_TO_ORDER.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center">
                    <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why JOY */}
      <section className="section-pad bg-white">
        <div className="container-page">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-[#008080] uppercase tracking-wider mb-3">Why JOY</p>
              <h2 className="text-3xl font-bold text-ink mb-6">
                Direct Source.<br />Verified Products.<br />Global Delivery.
              </h2>
              <div className="space-y-5">
                {[
                  { title: 'Direct from Manufacturers', desc: 'We source directly from Korean pharmaceutical and cosmetics manufacturers — no middlemen, better pricing.' },
                  { title: 'Medical-Grade Only', desc: 'Every product in our catalog is validated by our medical advisory team. GMP-certified manufacturers only.' },
                  { title: 'Export & Customs Handled', desc: 'We manage all export documentation, cold-chain logistics, and customs clearance to your country.' },
                  { title: 'OEM & White-Label Available', desc: 'Custom formulation, private labelling, and branded packaging available for qualified partners.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-5 h-5 rounded-full bg-[#4db8b8] flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-ink text-sm">{item.title}</p>
                      <p className="text-sm text-ink-muted mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '20+', label: 'Product SKUs' },
                { value: '5', label: 'Categories' },
                { value: '직배송', label: 'Direct from Korea' },
                { value: '24h', label: 'Quote Response' },
                { value: 'GMP', label: 'Certified Only' },
                { value: 'OEM', label: 'White-Label Available' },
              ].map((stat) => (
                <div key={stat.label} className="bg-surface-soft rounded-2xl p-6 text-center">
                  <p className="text-2xl font-bold text-[#1e3a5f]">{stat.value}</p>
                  <p className="text-xs text-ink-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-[#0f2340]">
        <div className="container-page text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ready to Stock Your Clinic?
          </h2>
          <p className="mt-4 text-white/55 text-lg max-w-xl mx-auto">
            Submit a wholesale inquiry and receive a custom price sheet within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/quote-request" size="lg" className="bg-[#4db8b8] hover:bg-[#3da8a8] border-0 text-white">
              Request a Quote
            </Button>
            <Button href="/catalog" variant="ghost" size="lg" className="text-white hover:bg-white/10 border border-white/30">
              Download Catalog
            </Button>
          </div>
          <p className="mt-6 text-xs text-white/30">
            For licensed medical professionals and authorized distributors only.
          </p>
        </div>
      </section>
    </>
  )
}
