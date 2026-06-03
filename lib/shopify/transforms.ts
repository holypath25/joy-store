import type { Product, Category, ProductImage, ProductVariant, ProductCategory } from '@/types/product'
import type { ShopifyPublicProduct, ShopifyPublicCollection } from './types'

const PRODUCT_TYPE_MAP: Record<string, ProductCategory> = {
  'mask pack': 'skincare',
  'mask': 'skincare',
  'cream': 'skincare',
  'serum': 'skincare',
  'ampoule': 'skincare',
  'sunscreen': 'skincare',
  'eye care': 'skincare',
  'toner': 'skincare',
  'cleanser': 'skincare',
  'fragrance': 'fragrance',
  'perfume': 'fragrance',
  'professional': 'professional',
  'clinic': 'professional',
  'bundle': 'bundle',
  'set': 'bundle',
}

function mapCategory(productType: string): ProductCategory {
  const key = productType.toLowerCase().trim()
  return PRODUCT_TYPE_MAP[key] ?? 'skincare'
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

export function transformProduct(p: ShopifyPublicProduct): Product {
  const tags = Array.isArray(p.tags)
    ? p.tags
    : p.tags ? p.tags.split(',').map((t) => t.trim()).filter(Boolean) : []
  const fullDescription = stripHtml(p.body_html)
  const shortDescription = fullDescription.slice(0, 200)

  const images: ProductImage[] = p.images.map((img, i) => ({
    src: img.src,
    alt: img.alt ?? p.title,
    width: img.width,
    height: img.height,
    isPrimary: i === 0,
  }))

  const variants: ProductVariant[] = p.variants.map((v) => ({
    sku: v.sku ?? `${p.handle}-${v.title.toLowerCase().replace(/\s+/g, '-')}`,
    label: v.title === 'Default Title' ? p.title : v.title,
    moq: v.quantity_rule?.min ?? 1,
    priceRange: v.price && parseFloat(v.price) > 0 ? v.price : undefined,
  }))

  const moq = p.variants[0]?.quantity_rule?.min ?? 1

  return {
    slug: p.handle,
    name: p.title,
    category: mapCategory(p.product_type),
    subcategory: p.product_type || undefined,
    shortDescription,
    fullDescription,
    keyBenefits: [],
    ingredients: [],
    usage: '',
    moq,
    variants,
    images,
    tags,
    isBestSeller: tags.includes('best-seller') || tags.includes('bestseller'),
    isNew: tags.includes('new'),
    isFeatured: tags.includes('featured'),
    originCountry: 'Republic of Korea',
    seoTitle: p.title.slice(0, 60),
    seoDescription: shortDescription.slice(0, 160),
    createdAt: p.created_at,
    updatedAt: p.updated_at,
  }
}

export function transformCollection(c: ShopifyPublicCollection): Category {
  return {
    slug: c.handle,
    name: c.title,
    description: c.description ?? '',
    heroImage: c.image
      ? {
          src: c.image.src,
          alt: c.image.alt ?? c.title,
          width: c.image.width ?? 1200,
          height: c.image.height ?? 600,
        }
      : undefined,
    seoTitle: c.title.slice(0, 60),
    seoDescription: (c.description ?? '').slice(0, 160),
    displayOrder: 0,
  }
}
