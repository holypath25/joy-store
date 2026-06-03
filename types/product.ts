export type ProductCategory = 'skincare' | 'fragrance' | 'professional' | 'bundle'

export interface ProductImage {
  src: string
  alt: string
  width: number
  height: number
  isPrimary?: boolean
}

export interface ProductVariant {
  sku: string
  label: string
  moq: number
  priceRange?: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface TikTokShopFields {
  categoryId?: string
  brandName: string
  originCountry: string
  contentTags?: string[]
}

export interface Product {
  slug: string
  name: string
  category: ProductCategory
  subcategory?: string
  shortDescription: string
  fullDescription: string
  keyBenefits: string[]
  ingredients: string[]
  ingredientsNote?: string
  usage: string
  usageNote?: string
  moq: number
  variants: ProductVariant[]
  images: ProductImage[]
  tags: string[]
  isBestSeller?: boolean
  isNew?: boolean
  isFeatured?: boolean
  originCountry: string
  certifications?: string[]
  seoTitle: string
  seoDescription: string
  seoKeywords?: string[]
  jsonLd?: Record<string, unknown>
  tiktokShop?: TikTokShopFields
  createdAt: string
  updatedAt: string
}

export interface Category {
  slug: string
  name: string
  description: string
  heroImage?: ProductImage
  faq?: FAQItem[]
  seoTitle: string
  seoDescription: string
  displayOrder: number
}
