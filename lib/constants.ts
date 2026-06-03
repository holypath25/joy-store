export const SITE_NAME = 'JOY'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ''
export const WHATSAPP_DEFAULT_MESSAGE =
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE ??
  'Hello, I am interested in a wholesale inquiry for JOY products.'

export const PRODUCT_SLUGS = [
  'deep-cleanser',
  'skin-booster',
  'essence-cream',
  'tone-up-ampoule',
] as const

export const CATEGORY_SLUGS = ['skincare', 'fragrance', 'professional'] as const
