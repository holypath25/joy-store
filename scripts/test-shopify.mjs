// Usage: node scripts/test-shopify.mjs
// Tests the public Shopify JSON API (no token required)

const DOMAIN = 'joykorea.kr'

async function test(path) {
  const url = `https://${DOMAIN}${path}`
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return res.json()
}

console.log(`Testing: https://${DOMAIN}/products.json\n`)

const { products } = await test('/products.json?limit=250')
console.log(`✅ Products (${products.length}):`)
products.forEach(p => {
  const price = p.variants[0]?.price ?? '?'
  console.log(` - [${p.product_type}] ${p.title} | ₩${price} | ${p.images.length} images`)
})

console.log('\nTesting: /collections.json\n')
const { collections } = await test('/collections.json')
console.log(`✅ Collections (${collections.length}):`)
collections.forEach(c => console.log(` - ${c.title} (${c.handle})`))
