import { shopifyFetch } from './client'
import { transformProduct, transformCollection } from './transforms'
import type { ShopifyPublicProduct, ShopifyPublicCollection } from './types'
import type { Product, Category } from '@/types/product'

export async function fetchAllProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{ products: ShopifyPublicProduct[] }>('/products.json?limit=250')
  return (data?.products ?? []).map(transformProduct)
}

export async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: ShopifyPublicProduct }>(`/products/${handle}.json`)
  return data?.product ? transformProduct(data.product) : null
}

export async function fetchAllCollections(): Promise<Category[]> {
  const data = await shopifyFetch<{ collections: ShopifyPublicCollection[] }>('/collections.json')
  return (data?.collections ?? [])
    .filter((c) => c.handle !== 'frontpage')
    .map(transformCollection)
}

export async function fetchCollectionByHandle(
  handle: string
): Promise<{ category: Category; products: Product[] } | null> {
  const [colData, prodData] = await Promise.all([
    shopifyFetch<{ collection: ShopifyPublicCollection }>(`/collections/${handle}.json`),
    shopifyFetch<{ products: ShopifyPublicProduct[] }>(`/collections/${handle}/products.json?limit=250`),
  ])
  if (!colData?.collection) return null
  return {
    category: transformCollection(colData.collection),
    products: (prodData?.products ?? []).map(transformProduct),
  }
}
