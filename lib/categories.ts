import type { Category } from '@/types/product'
import { fetchAllCollections, fetchCollectionByHandle } from './shopify'

export async function getAllCategories(): Promise<Category[]> {
  return fetchAllCollections()
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const result = await fetchCollectionByHandle(slug)
  return result?.category
}
