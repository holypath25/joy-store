import type { Product } from '@/types/product'
import { fetchAllProducts, fetchProductByHandle } from './shopify'

export async function getAllProducts(): Promise<Product[]> {
  return fetchAllProducts()
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const product = await fetchProductByHandle(slug)
  return product ?? undefined
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const all = await fetchAllProducts()
  return all.filter((p) => p.category === category)
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await fetchAllProducts()
  return all.filter((p) => p.isFeatured)
}

export async function getBestSellerProducts(): Promise<Product[]> {
  const all = await fetchAllProducts()
  return all.filter((p) => p.isBestSeller)
}
