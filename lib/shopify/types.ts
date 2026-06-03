export interface ShopifyPublicVariant {
  id: number
  title: string
  price: string
  compare_at_price: string | null
  sku: string | null
  quantity_rule: { min: number; max: number | null; increment: number }
  weight: number
  weight_unit: string
}

export interface ShopifyPublicImage {
  id: number
  src: string
  alt: string | null
  width: number
  height: number
  position: number
}

export interface ShopifyPublicProduct {
  id: number
  title: string
  handle: string
  body_html: string
  vendor: string
  product_type: string
  tags: string | string[]
  created_at: string
  updated_at: string
  published_at: string | null
  variants: ShopifyPublicVariant[]
  images: ShopifyPublicImage[]
  image: ShopifyPublicImage | null
}

export interface ShopifyPublicCollection {
  id: number
  handle: string
  title: string
  description: string
  image: { src: string; alt: string | null; width: number; height: number } | null
}
