const BASE_URL = `https://${process.env.SHOPIFY_STORE_DOMAIN ?? 'joykorea.kr'}`

export async function shopifyFetch<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch (err) {
    console.error('[Shopify]', path, err)
    return null
  }
}
