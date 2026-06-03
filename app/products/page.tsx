import type { Metadata } from 'next'
import Link from 'next/link'
import { CATALOG_PRODUCTS, CATEGORIES, CATEGORY_LABELS, type ProductCategory } from '@/lib/catalog'
import { getAllProducts } from '@/lib/products'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Medical Aesthetic Products Catalog',
  description:
    'Wholesale catalog of premium Korean medical aesthetic products — Nabota, Botulax, Xeomin, Yvoire, Rejuran, and more. B2B distribution for licensed clinics and practitioners.',
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const activeCategory = category as ProductCategory | undefined

  const catalogProducts = activeCategory
    ? CATALOG_PRODUCTS.filter((p) => p.category === activeCategory)
    : CATALOG_PRODUCTS

  // Shopify products (PDRN skincare) as supplementary
  const shopifyProducts = await getAllProducts()

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#0f2340] text-white">
        <div className="container-page py-12">
          <div className="inline-flex items-center gap-2 border border-white/15 text-white/50 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            For Licensed Medical Professionals Only
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold">Product Catalog</h1>
          <p className="mt-3 text-white/55 max-w-xl">
            Premium botulinum toxins, HA fillers, PDRN, and skin boosters. Sourced directly from certified Korean and international manufacturers.
          </p>
        </div>
      </div>

      <div className="container-page py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <a
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? 'bg-[#1e3a5f] text-white'
                : 'bg-surface-muted text-ink-muted hover:bg-[#e8f5f5] hover:text-[#008080]'
            }`}
          >
            All Products
          </a>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/products?category=${cat.id}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#1e3a5f] text-white'
                  : 'bg-surface-muted text-ink-muted hover:bg-[#e8f5f5] hover:text-[#008080]'
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Catalog grid */}
        {activeCategory && (
          <p className="text-sm text-ink-faint mb-6">
            {catalogProducts.length} product{catalogProducts.length !== 1 ? 's' : ''} in {CATEGORY_LABELS[activeCategory]}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {catalogProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-100 hover:border-[#4db8b8] hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="h-32 flex items-end px-6 pb-5" style={{ backgroundColor: product.imageColor }}>
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider">{product.categoryLabel}</p>
                  <p className="text-white text-2xl font-bold leading-tight">{product.name}</p>
                  <p className="text-white/60 text-xs">{product.brandKo} · {product.manufacturer}</p>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-ink-muted leading-relaxed flex-1">{product.description}</p>
                <div className="mt-4">
                  <p className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Indications</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.indications.slice(0, 4).map((ind) => (
                      <span key={ind} className="text-xs bg-surface-muted text-ink-muted px-2.5 py-1 rounded-full">{ind}</span>
                    ))}
                  </div>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-ink-faint">{product.country}</span>
                  <Button href="/quote-request" size="sm" className="bg-[#1e3a5f] hover:bg-[#162d48] border-0 text-white text-xs px-4 py-2">
                    Inquire
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PDRN Skincare from Shopify */}
        {(!activeCategory || activeCategory === 'pdrn') && shopifyProducts.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-slate-100" />
              <span className="text-sm font-semibold text-ink-muted uppercase tracking-wider px-2">PDRN Skincare Line</span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>
            <p className="text-sm text-ink-muted mb-6">Professional PDRN-based topical skincare for clinic retail and post-procedure care.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {shopifyProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/products/${p.slug}`}
                  className="group bg-white rounded-2xl border border-slate-100 hover:border-[#4db8b8] hover:shadow-md transition-all overflow-hidden"
                >
                  {p.images[0] && (
                    <div className="aspect-square bg-surface-soft overflow-hidden">
                      <img
                        src={p.images[0].src}
                        alt={p.images[0].alt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs text-[#008080] font-medium mb-1">{p.subcategory}</p>
                    <p className="font-semibold text-ink text-sm leading-snug group-hover:text-[#1e3a5f] transition-colors line-clamp-2">
                      {p.name}
                    </p>
                    <p className="mt-2 text-xs text-ink-faint">MOQ: {p.moq} units</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-surface-soft border-t border-slate-100">
        <div className="container-page py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink">Don't see what you need?</p>
            <p className="text-sm text-ink-muted mt-0.5">We source additional products on request. Contact us with your requirements.</p>
          </div>
          <Button href="/quote-request" size="lg" className="bg-[#1e3a5f] hover:bg-[#162d48] border-0 text-white flex-shrink-0">
            Request a Quote
          </Button>
        </div>
      </div>
    </div>
  )
}
