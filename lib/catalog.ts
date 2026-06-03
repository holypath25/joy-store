export type ProductCategory =
  | 'botulinum-toxin'
  | 'ha-filler'
  | 'skin-booster'
  | 'pdrn'
  | 'mesotherapy'

export interface CatalogProduct {
  id: string
  name: string
  brandKo: string
  manufacturer: string
  country: string
  category: ProductCategory
  categoryLabel: string
  description: string
  indications: string[]
  popular: boolean
  imageColor: string
}

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  'botulinum-toxin': 'Botulinum Toxin',
  'ha-filler': 'HA Filler',
  'skin-booster': 'Skin Booster',
  'pdrn': 'PDRN / Polynucleotide',
  'mesotherapy': 'Mesotherapy',
}

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'nabota',
    name: 'Nabota',
    brandKo: '나보타',
    manufacturer: 'Daewoong Pharma',
    country: 'Korea',
    category: 'botulinum-toxin',
    categoryLabel: 'Botulinum Toxin',
    description: 'Premium Korean botulinum toxin type A. FDA-approved (US), CE-marked, widely used in aesthetic clinics globally for wrinkle reduction and facial contouring.',
    indications: ['Glabellar lines', 'Crow\'s feet', 'Forehead lines', 'Jawline slimming', 'Hyperhidrosis'],
    popular: true,
    imageColor: '#1e3a5f',
  },
  {
    id: 'botulax',
    name: 'Botulax',
    brandKo: '보툴렉스',
    manufacturer: 'Hugel',
    country: 'Korea',
    category: 'botulinum-toxin',
    categoryLabel: 'Botulinum Toxin',
    description: 'One of Korea\'s top-selling botulinum toxins. Hugel\'s flagship product with strong clinical track record across Asia, Europe, and Latin America.',
    indications: ['Glabellar lines', 'Forehead lines', 'Neck bands', 'Calf reduction', 'Masseter hypertrophy'],
    popular: true,
    imageColor: '#1e3a5f',
  },
  {
    id: 'xeomin',
    name: 'Xeomin',
    brandKo: '제오민',
    manufacturer: 'Merz Aesthetics',
    country: 'Germany',
    category: 'botulinum-toxin',
    categoryLabel: 'Botulinum Toxin',
    description: 'Purified botulinum toxin without complexing proteins (incobotulinumtoxinA). Preferred by practitioners seeking a "naked" formulation with reduced antibody risk.',
    indications: ['Glabellar lines', 'Blepharospasm', 'Cervical dystonia', 'Upper limb spasticity'],
    popular: true,
    imageColor: '#2d4a6e',
  },
  {
    id: 'yvoire',
    name: 'Yvoire',
    brandKo: '이브아르',
    manufacturer: 'LG Chem',
    country: 'Korea',
    category: 'ha-filler',
    categoryLabel: 'HA Filler',
    description: 'Premium hyaluronic acid dermal filler by LG Chem. Multiple product lines (Classic, Volume, Contour, Shine) covering the full range of facial volumisation and contouring needs.',
    indications: ['Nasolabial folds', 'Lip augmentation', 'Cheek volumisation', 'Jawline contouring', 'Tear troughs'],
    popular: true,
    imageColor: '#008080',
  },
  {
    id: 'rejuran',
    name: 'Rejuran',
    brandKo: '리쥬란',
    manufacturer: 'On Cosmetics (PDRN)',
    country: 'Korea',
    category: 'pdrn',
    categoryLabel: 'PDRN / Polynucleotide',
    description: 'The original PDRN skin healer. Salmon-derived polynucleotide that stimulates tissue regeneration, improves skin elasticity, and reduces acne scarring. Standard in Korean clinics.',
    indications: ['Skin rejuvenation', 'Acne scar repair', 'Wound healing', 'Fine lines', 'Skin texture improvement'],
    popular: true,
    imageColor: '#b8952a',
  },
  {
    id: 'rituo',
    name: 'Lituaux',
    brandKo: '리투오',
    manufacturer: 'Medytox',
    country: 'Korea',
    category: 'ha-filler',
    categoryLabel: 'HA Filler',
    description: 'Next-generation cross-linked hyaluronic acid filler. Designed for long-lasting volumisation and natural feel. Popular for mid-face augmentation and deep wrinkle correction.',
    indications: ['Deep wrinkles', 'Mid-face volume', 'Lip enhancement', 'Chin contouring'],
    popular: false,
    imageColor: '#005f5f',
  },
]

export const CATEGORIES: { id: ProductCategory; label: string; desc: string; count: number }[] = [
  { id: 'botulinum-toxin', label: 'Botulinum Toxin', desc: '나보타 · 보툴렉스 · 제오민', count: 3 },
  { id: 'ha-filler', label: 'HA Filler', desc: '이브아르 · 리투오 외', count: 4 },
  { id: 'pdrn', label: 'PDRN / Polynucleotide', desc: '리쥬란 · 리쥬란힐러 외', count: 3 },
  { id: 'skin-booster', label: 'Skin Booster', desc: '스킨부스터 · 쥬비덤 외', count: 4 },
  { id: 'mesotherapy', label: 'Mesotherapy', desc: '앰플 · MTS 솔루션 외', count: 5 },
]
