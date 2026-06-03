# MODOLS B2B Beauty Commerce — Implementation Plan

**Document owner:** project-orchestrator
**Last updated:** 2026-05-12
**Stack confirmed:** Next.js 14+ App Router · TypeScript · Tailwind CSS · Static product data (MVP) · Headless CMS (post-MVP)

---

## 1. Executive Summary

MODOLS requires a greenfield B2B beauty supplier website that positions the brand as a credible Korean skincare wholesale source and converts overseas distributors, beauty clinics, ecommerce resellers, and retail buyers into qualified leads. The build is organized into nine phases (Phase 0 through Phase 8) covering project scaffolding, strategy, design system, core pages, SEO, analytics, TikTok Shop readiness, backend/CRM automation, and launch QA. Every phase gate is tied to measurable acceptance criteria before the next phase begins.

---

## 2. Phase Table

| Phase | Name | Owner Agents | Key Deliverables | Estimated Effort |
|-------|------|-------------|-----------------|-----------------|
| 0 | Scaffolding & Project Setup | frontend-nextjs-engineer | Next.js scaffold, folder structure, config files, base layout, robots/sitemap stubs | 0.5 day |
| 1 | Strategy, IA & Copy | market-brand-strategist, site-architect-ux, conversion-copywriter | Positioning doc, sitemap, wireframe notes, copy brief | 2 days |
| 2 | Design System | ui-visual-designer | Tailwind tokens, component inventory, quote list UI pattern, responsive rules | 1.5 days |
| 3 | Core Build (MVP) | frontend-nextjs-engineer, product-data-catalog-manager | All 11 routes implemented, product data schema, quote list state | 4 days |
| 4 | SEO Implementation | seo-technical-content | Metadata, sitemap.ts, robots.ts, JSON-LD, canonical URLs, blog topic brief | 1.5 days |
| 5 | Analytics & Google Ads Readiness | analytics-gtm-ga4-engineer, google-ads-performance | dataLayer spec, GTM/GA4 setup, conversion mapping, enhanced conversions | 1.5 days |
| 6 | TikTok Shop Readiness | tiktok-shop-integration | Product feed fields, SKU mapping, eligibility checklist, content workflow | 0.5 day |
| 7 | Backend / CRM / Automation | backend-cms-crm-automation | Form handler, email notification, CRM webhook stub, WhatsApp deep link, rate limiting | 1.5 days |
| 8 | QA, Compliance & CRO | qa-compliance-risk, cro-growth-experimentation | Accessibility audit, claims review, performance baseline, CRO backlog | 1 day |

**Total estimated elapsed time (sequential): ~14 business days.** Phases 4, 5, and 6 may run partially in parallel after Phase 3 is complete.

---

## 3. Full Page Inventory

| # | Route | Page Name | Data Needs | SEO Priority | Notes |
|---|-------|-----------|-----------|-------------|-------|
| 1 | `/` | Homepage | Featured products, categories, brand copy | P0 — Organization + WebSite schema | Hero, CategoryTiles, BestSellers, HowItWorks, BrandStrip, WhatsAppCTA |
| 2 | `/products` | Product Catalog | All products, filter options | P0 — Product listing | Server-rendered grid; filter can be client-side progressive enhancement |
| 3 | `/products/[slug]` | Product Detail | Single product record | P0 — Product schema, BreadcrumbList | Static generation (generateStaticParams); unique OG image per product |
| 4 | `/categories` | Categories Index | All categories | P1 | Redirects or embeds in homepage; can be a standalone page |
| 5 | `/categories/[slug]` | Category Landing | Category record + products in category | P0 — BreadcrumbList, FAQPage | SEO intro paragraph, product grid, FAQ section |
| 6 | `/quote-request` | Quote Request Form | Quote list state (client), buyer form fields | P0 — conversion page | Quote list drawn from localStorage/context; form submits to API route |
| 7 | `/bulk-order` | Bulk Order Request | Bulk order form fields | P0 — conversion page | Simpler form: product interest, quantity ranges, contact info |
| 8 | `/catalog` | Catalog Download Gate | PDF asset URL (env var) | P1 | Email capture before download link is revealed |
| 9 | `/about` | About MODOLS | Brand copy, certifications teaser | P1 — Organization schema | Korean origin, export readiness, team/facility teaser |
| 10 | `/contact` | Contact & Inquiry | Contact copy, WhatsApp number | P0 | WhatsApp deep link, email, inquiry form |
| 11 | `/blog` | Blog Index | All blog post metadata | P1 — Article schema index | Server-rendered list; stubs acceptable for launch |
| 12 | `/blog/[slug]` | Blog Article | Single post (MDX or CMS) | P1 — Article + BreadcrumbList schema | Target informational B2B keywords |
| 13 | `/privacy-policy` | Privacy Policy | Static copy | P1 | Required for form consent links and GDPR readiness |
| 14 | `/404` | Not Found | Static copy | — | Custom 404 with navigation and quote CTA |
| — | `error.tsx` | Error Boundary | — | — | App Router error boundary |

---

## 4. Product Data Model

```typescript
// types/product.ts

export type ProductCategory =
  | 'skincare'
  | 'fragrance'
  | 'professional'
  | 'bundle';

export interface ProductImage {
  src: string;           // path under /public/images/products/ or CDN URL
  alt: string;
  width: number;
  height: number;
  isPrimary?: boolean;
}

export interface ProductVariant {
  sku: string;           // e.g. "MDL-SK-001-50ML"
  label: string;         // e.g. "50ml"
  moq: number;           // minimum order quantity for this variant
  priceRange?: string;   // e.g. "USD 8–12 / unit" — range not fixed price
}

export interface Product {
  slug: string;                     // URL-safe identifier, e.g. "deep-cleanser"
  name: string;                     // Display name, e.g. "MODOLS Deep Cleanser"
  category: ProductCategory;
  subcategory?: string;
  shortDescription: string;         // 1–2 sentences, claims-safe
  fullDescription: string;          // Full product copy, claims-safe
  keyBenefits: string[];            // 3–5 bullet points, claims-safe
  ingredients: string[];            // INCI list or key ingredient highlights
  ingredientsNote?: string;         // e.g. "Full INCI available upon request"
  usage: string;                    // How to use / application guidance
  usageNote?: string;               // Professional use disclaimer if needed
  moq: number;                      // Default MOQ
  variants: ProductVariant[];
  images: ProductImage[];
  tags: string[];                   // For filtering and TikTok content tagging
  isBestSeller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  originCountry: string;            // "Republic of Korea"
  certifications?: string[];        // Only list verified certs
  seoTitle: string;                 // <60 chars
  seoDescription: string;          // <160 chars
  seoKeywords?: string[];
  jsonLd?: Record<string, unknown>; // Overrides for Product schema if needed
  tiktokShop?: TikTokShopFields;    // See Section 6
  createdAt: string;                // ISO date string
  updatedAt: string;                // ISO date string
}

export interface Category {
  slug: string;
  name: string;
  description: string;              // SEO intro paragraph
  heroImage?: ProductImage;
  faq?: FAQItem[];
  seoTitle: string;
  seoDescription: string;
  displayOrder: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
```

**Initial product slugs:**
- `deep-cleanser`
- `skin-booster`
- `essence-cream`
- `tone-up-ampoule`

**Initial category slugs:**
- `skincare`
- `fragrance` (placeholder for future)
- `professional` (placeholder for future)

---

## 5. dataLayer Event Specification

All events push to `window.dataLayer` as an array of objects. GTM reads this array. Initialize `window.dataLayer = window.dataLayer || []` in `app/layout.tsx` before the GTM script.

### 5.1 Event Schemas

```typescript
// lib/analytics/events.ts

// Shared product reference (lightweight — not the full Product type)
interface DLProduct {
  item_id: string;       // SKU of the first/primary variant
  item_name: string;     // Product name
  item_category: string; // Product category slug
  quantity?: number;
}

// product_view — fired on /products/[slug] mount
interface ProductViewEvent {
  event: 'product_view';
  product: DLProduct;
  page_path: string;
}

// category_view — fired on /categories/[slug] mount
interface CategoryViewEvent {
  event: 'category_view';
  category_name: string;
  page_path: string;
}

// add_to_quote — fired when user clicks "Add to Quote" on any product card or detail page
interface AddToQuoteEvent {
  event: 'add_to_quote';
  product: DLProduct;
  quote_list_size: number;  // total items in quote list after addition
}

// remove_from_quote — fired when user removes item from quote drawer
interface RemoveFromQuoteEvent {
  event: 'remove_from_quote';
  product: DLProduct;
  quote_list_size: number;  // total items remaining after removal
}

// quote_request_start — fired when user opens /quote-request page
interface QuoteRequestStartEvent {
  event: 'quote_request_start';
  quote_list_size: number;
  page_path: string;
}

// quote_request_submit — fired on successful form submission (after API 200)
interface QuoteRequestSubmitEvent {
  event: 'quote_request_submit';
  quote_list_size: number;
  buyer_type: string;             // "distributor" | "clinic" | "reseller" | "retail" | "other"
  inquiry_type: string;           // "quote" | "sample" | "distributor_proposal"
  hashed_email?: string;          // SHA-256 hashed, for enhanced conversions
}

// bulk_order_request_submit — fired on successful bulk order form submission
interface BulkOrderRequestSubmitEvent {
  event: 'bulk_order_request_submit';
  product_interest: string;       // free-text or slug
  quantity_range: string;         // e.g. "100–499 units"
  hashed_email?: string;
}

// whatsapp_click — fired on any WhatsApp CTA click
interface WhatsAppClickEvent {
  event: 'whatsapp_click';
  click_location: string;         // e.g. "header_cta" | "footer" | "contact_page" | "product_detail"
}

// catalog_download — fired when catalog download email gate is submitted and link is revealed
interface CatalogDownloadEvent {
  event: 'catalog_download';
  hashed_email?: string;
}

// contact_email_click — fired on mailto: or email copy clicks
interface ContactEmailClickEvent {
  event: 'contact_email_click';
  click_location: string;
}

// blog_article_view — fired on /blog/[slug] mount
interface BlogArticleViewEvent {
  event: 'blog_article_view';
  article_slug: string;
  article_title: string;
}
```

### 5.2 Implementation Pattern

Push events using a thin wrapper:

```typescript
// lib/analytics/push.ts
export function pushEvent(event: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
```

Never push PII in plain text. Hash emails client-side with Web Crypto API before pushing.

---

## 6. TikTok Shop Product Field Mapping

TikTok Shop requires a product catalog feed. Map MODOLS product data fields as follows:

| TikTok Shop Field | Source in Product Type | Notes |
|------------------|----------------------|-------|
| `title` | `product.name` | Max 255 chars; no promotional language |
| `description` | `product.fullDescription` | Strip HTML; claims must pass TikTok policy |
| `brand` | `"MODOLS"` | Constant |
| `origin_country` | `product.originCountry` | "KR" (ISO 3166-1 alpha-2) |
| `category_id` | Mapped from `product.category` | Use TikTok's Beauty & Personal Care taxonomy |
| `sku_id` | `variant.sku` | Unique per variant |
| `price` | `variant.priceRange` | Must be a fixed price for listing; use wholesale floor |
| `quantity` | Managed in TikTok Seller Center | Not stored in product data model |
| `main_image` | First `ProductImage` where `isPrimary: true` | Min 800×800px, 1:1 ratio, white/neutral background |
| `additional_images` | Remaining `product.images[]` | Up to 8 additional images |
| `tags` | `product.tags[]` | Map to TikTok hashtag strategy |
| `certifications` | `product.certifications[]` | Upload certificates separately in Seller Center |

**Image requirements:**
- Primary: 800×800px minimum, 1:1 aspect ratio, no watermarks, white or neutral background
- Additional: same resolution; lifestyle/usage shots acceptable
- File format: JPG or PNG, under 5MB each

**SKU naming convention:**
```
MDL-[CATEGORY_CODE]-[PRODUCT_CODE]-[VARIANT_CODE]
Examples:
  MDL-SK-001-50ML   (Skincare, product 001, 50ml variant)
  MDL-SK-002-100ML  (Skincare, product 002, 100ml variant)
```

**Eligibility prerequisites (verify before activation):**
- Confirm TikTok Shop seller account country availability for Korea-origin export
- Cosmetics/skincare category may require ingredient list upload and safety documentation
- Verify platform-level claims policy: avoid treatment/efficacy language in titles and descriptions
- Confirm cross-border or local fulfillment model before listing goes live

---

## 7. Agent Dispatch Order

### Sprint 0 (Days 1–2): Foundation — Sequential

```
1. frontend-nextjs-engineer
   → Phase 0: Scaffold Next.js project, folder structure, config, base layout, stubs
   → Blocking: all other agents need the repo to exist
```

### Sprint 1 (Days 2–5): Strategy + Design — Can run in parallel after scaffold exists

```
2a. market-brand-strategist       [PARALLEL]
    → Positioning statement, buyer persona refinement, B2B messaging pillars

2b. site-architect-ux             [PARALLEL]
    → Full page list confirmation, navigation structure, conversion funnel diagram,
      quote request user flow (text/wireframe notes)

2c. conversion-copywriter         [PARALLEL — blocked on 2a output]
    → Homepage hero copy, CTA copy variants, category copy, product microcopy brief
    → compliance pre-check on all copy

3.  ui-visual-designer            [STARTS AFTER 2a + 2b COMPLETE]
    → Tailwind design tokens, color palette, typography scale, spacing system
    → Component inventory and visual spec for each component
    → Quote list drawer UI pattern
    → Mobile-first responsive rules
```

### Sprint 2 (Days 5–10): Core Build — Sequential with parallel data work

```
4a. product-data-catalog-manager  [PARALLEL with 4b]
    → Finalize TypeScript product types (using Section 4 as base)
    → Author initial 4 product JSON/data files
    → Author initial 3 category data files
    → Define image naming and path conventions

4b. frontend-nextjs-engineer      [PARALLEL — can start layout/components while 4a runs]
    → Implement design tokens and global styles
    → Build shared components: Navbar, Footer, Breadcrumb, QuoteButton, QuoteListDrawer
    → Build Homepage sections
    → Build /products catalog page
    → Build /products/[slug] detail page
    → Build /categories/[slug] page
    → Build /quote-request, /bulk-order, /catalog pages
    → Build /about, /contact, /blog, /blog/[slug] stubs
    → Build /privacy-policy static page
    → Build /404 and error.tsx
    → Wire quote list state (React Context + localStorage persistence)
```

### Sprint 3 (Days 10–12): SEO + Analytics — Can run in parallel

```
5a. seo-technical-content         [PARALLEL]
    → metadata per page, canonical URLs, OG/Twitter cards
    → sitemap.ts (all routes including dynamic product/category/blog)
    → robots.ts
    → JSON-LD: Organization, WebSite, Product, BreadcrumbList, FAQPage, Article
    → Blog topic brief (5 articles)

5b. analytics-gtm-ga4-engineer    [PARALLEL]
    → GTM snippet via NEXT_PUBLIC_GTM_ID env var
    → dataLayer initialization in layout.tsx
    → Implement pushEvent calls per Section 5 spec
    → GA4 config tag plan
    → Consent mode documentation

5c. google-ads-performance        [PARALLEL — after 5b GTM is wired]
    → 4 conversion action definitions
    → Enhanced conversions readiness check (hashed email field)
    → UTM parameter passthrough to form hidden fields
    → Landing page final URL map
```

### Sprint 4 (Days 12–13): TikTok Shop + Backend — Can run in parallel

```
6a. tiktok-shop-integration       [PARALLEL]
    → Verify TikTok Shop eligibility
    → Complete field mapping (Section 6 as starting point)
    → Content-to-product tagging workflow
    → Operational risk documentation

6b. backend-cms-crm-automation    [PARALLEL]
    → API route: /api/quote-request (form handler → email notification → CRM webhook)
    → API route: /api/bulk-order
    → API route: /api/catalog-download (email capture → return PDF URL)
    → WhatsApp deep link generator utility
    → Admin notification email template (Resend or Nodemailer)
    → Rate limiting + honeypot fields on all forms
    → .env.example with all required keys documented
```

### Sprint 5 (Days 13–14): QA + CRO — Final gate

```
7a. qa-compliance-risk            [SEQUENTIAL — after all above complete]
    → WCAG 2.1 AA accessibility audit
    → Claims compliance review (every page)
    → Mobile QA (375px, 390px, 430px viewports)
    → Privacy review (forms, consent copy, privacy policy link)
    → Performance baseline (LCP, CLS, FID targets)
    → P0 blocker list

7b. cro-growth-experimentation    [PARALLEL with 7a]
    → CTA copy test backlog (quote button variants)
    → Quote form UX improvement suggestions
    → Hero section A/B ideas
    → Trust signal placement recommendations
```

---

## 8. Folder Structure

```
/
├── app/
│   ├── layout.tsx                    # Root layout, GTM, metadata base
│   ├── page.tsx                      # Homepage
│   ├── sitemap.ts                    # Dynamic sitemap
│   ├── robots.ts                     # robots.txt rules
│   ├── not-found.tsx                 # Custom 404
│   ├── error.tsx                     # Error boundary
│   ├── products/
│   │   ├── page.tsx                  # /products catalog
│   │   └── [slug]/
│   │       └── page.tsx              # /products/[slug] detail
│   ├── categories/
│   │   ├── page.tsx                  # /categories index (optional)
│   │   └── [slug]/
│   │       └── page.tsx              # /categories/[slug]
│   ├── quote-request/
│   │   └── page.tsx
│   ├── bulk-order/
│   │   └── page.tsx
│   ├── catalog/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── blog/
│   │   ├── page.tsx                  # Blog index
│   │   └── [slug]/
│   │       └── page.tsx              # Blog article
│   ├── privacy-policy/
│   │   └── page.tsx
│   └── api/
│       ├── quote-request/
│       │   └── route.ts
│       ├── bulk-order/
│       │   └── route.ts
│       └── catalog-download/
│           └── route.ts
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── CategoryTiles.tsx
│   │   ├── BestSellers.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── BrandStrip.tsx
│   │   └── WhatsAppCTA.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductDetail.tsx
│   │   └── ProductFilter.tsx
│   ├── quote/
│   │   ├── QuoteButton.tsx
│   │   ├── QuoteListDrawer.tsx
│   │   └── QuoteRequestForm.tsx
│   ├── forms/
│   │   ├── BulkOrderForm.tsx
│   │   ├── CatalogDownloadForm.tsx
│   │   └── ContactForm.tsx
│   ├── seo/
│   │   └── JsonLd.tsx               # Renders JSON-LD script tags
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Badge.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── analytics/
│   │   ├── events.ts                 # Event type definitions
│   │   └── push.ts                  # pushEvent utility
│   ├── products.ts                  # Data access functions (getProduct, getProducts, etc.)
│   ├── categories.ts
│   ├── blog.ts
│   ├── whatsapp.ts                  # WhatsApp deep link generator
│   ├── hash.ts                      # Client-side SHA-256 for enhanced conversions
│   └── constants.ts                 # Site-wide constants (brand name, contact info, etc.)
├── data/
│   ├── products/
│   │   ├── deep-cleanser.ts
│   │   ├── skin-booster.ts
│   │   ├── essence-cream.ts
│   │   └── tone-up-ampoule.ts
│   ├── categories/
│   │   ├── skincare.ts
│   │   ├── fragrance.ts
│   │   └── professional.ts
│   └── blog/                        # MDX files or TS data for blog stubs
├── types/
│   ├── product.ts                   # Product, Category, FAQItem interfaces
│   ├── analytics.ts                 # dataLayer event interfaces
│   └── tiktok.ts                    # TikTok Shop field interfaces
├── public/
│   ├── images/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brand/
│   │   └── og/                      # Open Graph images
│   ├── catalog/                     # Password-gated or signed PDF
│   └── favicon.ico
├── styles/
│   └── globals.css                  # Tailwind base + custom properties
├── .env.local                       # Not committed
├── .env.example                     # Committed — placeholders only
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 9. Environment Variables

Document in `.env.example` — all values are placeholders:

```bash
# Analytics
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Email (choose one: Resend recommended for Next.js)
RESEND_API_KEY=re_xxxxxxxxxxxx
NOTIFICATION_EMAIL_TO=hello@modols.com
NOTIFICATION_EMAIL_FROM=noreply@modols.com

# CRM Webhook (HubSpot or Airtable)
CRM_WEBHOOK_URL=https://hooks.airtable.com/...

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=821012345678
NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE=Hello, I am interested in wholesale inquiry for MODOLS products.

# Catalog
CATALOG_PDF_URL=https://...

# Site
NEXT_PUBLIC_SITE_URL=https://www.modols.com
NEXT_PUBLIC_SITE_NAME=MODOLS

# Security
FORM_RATE_LIMIT_WINDOW_MS=60000
FORM_RATE_LIMIT_MAX_REQUESTS=5
```

---

## 10. SEO Strategy Summary

### Primary keyword targets (B2B intent)

| Priority | Keyword Theme | Target Page |
|----------|--------------|-------------|
| P0 | Korean skincare supplier wholesale | Homepage, /products |
| P0 | K-beauty wholesale distributor | Homepage, /categories/skincare |
| P0 | Korean skin booster supplier | /products/skin-booster |
| P0 | Korean beauty bulk order | /bulk-order |
| P1 | Korean cosmetics export B2B | /about, /contact |
| P1 | deep cleanser wholesale | /products/deep-cleanser |
| P1 | essence cream supplier Korea | /products/essence-cream |
| P1 | tone up ampoule wholesale | /products/tone-up-ampoule |
| P2 | how to buy Korean skincare wholesale | /blog/ (informational) |

### Initial blog article topics

1. "How to Source Korean Skincare for Your Spa or Clinic" — clinic/spa buyer intent
2. "K-Beauty Distributor Guide: MOQ, Margins, and Export Process" — distributor intent
3. "Understanding MOQs When Buying Korean Beauty Products in Bulk" — MOQ explainer
4. "Key Ingredients in Korean Skincare: A Buyer's Glossary" — informational / ingredient terms
5. "How to Stock Your TikTok Shop with K-Beauty Products" — reseller intent

---

## 11. Google Ads Conversion Action Mapping

| Conversion Action Name | Trigger Event | Value | Category |
|-----------------------|--------------|-------|----------|
| Quote Request Submit | `quote_request_submit` | Dynamic (inquiry type) | Lead |
| Bulk Order Request Submit | `bulk_order_request_submit` | Fixed (e.g. 50 USD proxy) | Lead |
| WhatsApp CTA Click | `whatsapp_click` | Fixed (e.g. 10 USD proxy) | Lead |
| Catalog Download | `catalog_download` | Fixed (e.g. 5 USD proxy) | Lead |

Enhanced conversions: hash `email` field from all lead forms with SHA-256 before pushing to dataLayer. Map `hashed_email` in GTM enhanced conversions tag.

UTM passthrough: read `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from URL query params on page load and store in hidden form fields for submission alongside lead data.

---

## 12. Open Questions and Decisions Needed Before Build Starts

| # | Question | Owner | Blocking |
|---|----------|-------|---------|
| 1 | What is the final production domain for MODOLS? | Client / project-orchestrator | SEO metadataBase, canonical URLs, sitemap |
| 2 | Which email provider will be used for form notifications — Resend, Nodemailer/SMTP, or other? | backend-cms-crm-automation + client | Phase 7 API routes |
| 3 | Which CRM will receive lead data — HubSpot, Airtable, Notion, or none for MVP? | client | Phase 7 CRM webhook; can stub for MVP |
| 4 | Are product certifications (KFDA, CPSR, MSDS) available to be listed? | client | SEO credibility claims, product data |
| 5 | Are finalized product images (white background, 800×800+) available? | client / product-data-catalog-manager | Phase 3 ProductCard, Phase 6 TikTok Shop |
| 6 | Is a PDF catalog available, or does it need to be created? | client | /catalog page and download gate |
| 7 | Will the site support multiple languages at launch (EN + KO)? | client / project-orchestrator | Routing strategy (i18n), copy agent scope |
| 8 | What is the WhatsApp business number for the CTA? | client | WhatsApp deep link, Phase 0 constants |
| 9 | What is MODOLS's actual MOQ per product? | client / product-data-catalog-manager | Product data files, quote form, buyer trust |
| 10 | Is TikTok Shop activation in scope for MVP or post-MVP? | client | Phase 6 effort allocation |
| 11 | Are there regulated markets (EU, Canada, Australia) requiring specific claims wording? | qa-compliance-risk | Copy brief, claims review |
| 12 | What font(s) should be used — Google Fonts (free) or licensed fonts? | ui-visual-designer + client | Phase 0 fonts setup |

---

## 13. Launch Definition of Done

The site is ready to launch when all of the following are confirmed:

### Pages
- [ ] All 14 routes exist and render without errors on mobile and desktop
- [ ] /quote-request flow completes end-to-end (list build → form submit → confirmation)
- [ ] /bulk-order flow completes end-to-end
- [ ] /catalog email gate captures email and delivers download link
- [ ] /privacy-policy is live and linked from all forms

### SEO
- [ ] All items in `docs/SEO_CHECKLIST.md` are checked
- [ ] Sitemap submitted to Google Search Console
- [ ] robots.ts allows crawl of all public pages
- [ ] No duplicate title or description across pages

### Analytics & Ads
- [ ] All items in `docs/INTEGRATION_CHECKLIST.md` are checked
- [ ] GTM container fires on all pages
- [ ] All 10 dataLayer events fire correctly in GTM Preview
- [ ] 4 Google Ads conversion actions are verified in test
- [ ] No API keys committed to git

### Compliance & QA
- [ ] qa-compliance-risk has reviewed all copy — no P0 claims violations
- [ ] WCAG 2.1 AA: no P0 accessibility issues
- [ ] LCP < 2.5s on mobile (3G throttled)
- [ ] CLS < 0.1 on all key pages
- [ ] No fake certifications, fake reviews, or unsupported absolute claims anywhere on site
- [ ] Privacy policy linked from every form
- [ ] Consent-mode GTM configuration documented

### TikTok Shop
- [ ] Product data model includes all required TikTok fields
- [ ] Product images meet TikTok Shop minimum specifications
- [ ] Eligibility checklist complete (even if activation is post-MVP)

---

*This document is the authoritative implementation plan. Update it when scope decisions are made. All agents should read their relevant sections before beginning work.*
