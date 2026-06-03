import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getProductBySlug, getAllProducts } from '@/lib/products'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'

export async function generateStaticParams() {
  const products = await getAllProducts()
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return {
    title: product.seoTitle,
    description: product.seoDescription,
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0]
  const additionalImages = product.images.filter((_, i) => i > 0)

  const quoteMessage = encodeURIComponent(
    `Hello, I'm interested in wholesale pricing for: ${product.name} (MOQ: ${product.moq} units)`
  )
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '821012345678'

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="container-page pt-6 pb-0">
        <nav className="flex items-center gap-2 text-sm text-ink-faint">
          <a href="/" className="hover:text-ink-muted transition-colors">Home</a>
          <span>/</span>
          <a href="/products" className="hover:text-ink-muted transition-colors">Products</a>
          <span>/</span>
          <span className="text-ink-muted">{product.name}</span>
        </nav>
      </div>

      <div className="container-page py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Images */}
          <div className="space-y-4">
            {primaryImage && (
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-soft">
                <Image
                  src={primaryImage.src}
                  alt={primaryImage.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
            {additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {additionalImages.slice(0, 4).map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-surface-soft">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {product.subcategory && (
                <Badge variant="brand">{product.subcategory}</Badge>
              )}
              {product.isBestSeller && <Badge variant="amber">Best Seller</Badge>}
              {product.isNew && <Badge variant="green">New</Badge>}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-ink leading-tight">
              {product.name}
            </h1>

            {product.shortDescription && (
              <p className="mt-4 text-ink-muted leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Wholesale details */}
            <div className="mt-8 bg-surface-soft rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-ink text-sm uppercase tracking-wider">Wholesale Details</h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-xs text-ink-faint mb-1">Minimum Order Qty</dt>
                  <dd className="font-semibold text-ink">{product.moq} units</dd>
                </div>
                {product.variants[0]?.priceRange && (
                  <div>
                    <dt className="text-xs text-ink-faint mb-1">Unit Price (from)</dt>
                    <dd className="font-semibold text-ink">${product.variants[0].priceRange}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-xs text-ink-faint mb-1">Origin</dt>
                  <dd className="font-semibold text-ink">{product.originCountry}</dd>
                </div>
                {product.variants.length > 1 && (
                  <div>
                    <dt className="text-xs text-ink-faint mb-1">Variants</dt>
                    <dd className="font-semibold text-ink">{product.variants.length} options</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mt-6">
                <p className="text-sm font-medium text-ink mb-3">Available Options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <div key={v.sku} className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-ink-muted">
                      {v.label}
                      {v.priceRange && <span className="ml-2 text-brand-600 font-medium">${v.priceRange}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button href="/quote-request" size="lg" className="flex-1">
                Request a Quote
              </Button>
              <Button
                href={`https://wa.me/${whatsappNumber}?text=${quoteMessage}`}
                variant="secondary"
                size="lg"
                className="flex-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </Button>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="slate">{tag}</Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {product.fullDescription && (
          <div className="mt-16 max-w-2xl">
            <h2 className="text-xl font-bold text-ink mb-4">Product Description</h2>
            <div className="prose prose-slate text-ink-muted leading-relaxed">
              <p>{product.fullDescription}</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-slate-100 bg-surface-soft">
        <div className="container-page py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold text-ink">Ready to order wholesale?</p>
            <p className="text-sm text-ink-muted">Get a custom quote within 24 hours.</p>
          </div>
          <Button href="/quote-request" size="lg">
            Request a Quote
          </Button>
        </div>
      </div>
    </div>
  )
}
