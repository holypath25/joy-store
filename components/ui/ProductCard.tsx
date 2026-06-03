import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/types/product'
import Badge from './Badge'

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images[0]
  const variant = product.variants[0]

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square bg-surface-soft overflow-hidden">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-300">
            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-3 left-3">
            <Badge variant="brand">Best Seller</Badge>
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-3 left-3">
            <Badge variant="green">New</Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        {product.subcategory && (
          <p className="text-xs font-medium text-brand-500 uppercase tracking-wider mb-1">
            {product.subcategory}
          </p>
        )}
        <h3 className="font-semibold text-ink leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="mt-2 text-sm text-ink-muted line-clamp-2 flex-1">
            {product.shortDescription}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-ink-muted">
            MOQ:{' '}
            <span className="font-semibold text-ink">{product.moq} units</span>
          </span>
          {variant?.priceRange && (
            <span className="text-sm font-medium text-brand-600">
              From ${variant.priceRange}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
