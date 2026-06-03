# MODOLS B2B Website — Sprint Backlog

**Sprint scope:** Phase 0 (Scaffolding) + Phase 1 (Strategy, IA, Copy)
**Sprint goal:** Establish a runnable Next.js project and produce the strategy, architecture, and copy brief documents that all subsequent build work depends on.
**Date created:** 2026-05-12
**Document owner:** project-orchestrator

---

## Sprint 0 — Project Scaffolding

---

### STORY-001 — Next.js Project Scaffold

**Epic**
- Name: Project Foundation
- Owner Agent: frontend-nextjs-engineer
- Business Goal: Establish the codebase foundation so all agents can begin building in a consistent, lint-clean environment.
- Success Metric: `npm run dev` starts without errors; `npm run build` produces zero TypeScript or lint errors.
- Priority: P0

**User Story**
As the development team, I want a fully configured Next.js 14+ App Router project with TypeScript and Tailwind CSS so that all agents can build on a consistent, production-ready foundation from day one.

**Acceptance Criteria**
- [ ] `npx create-next-app@latest` or equivalent used with App Router, TypeScript, and Tailwind CSS flags
- [ ] `npm run dev` starts on localhost:3000 without errors
- [ ] `npm run build` completes with zero TypeScript errors and zero lint errors
- [ ] `npm run lint` passes with the configured ESLint rules
- [ ] Prettier is configured and formats consistently with ESLint (no conflicts)
- [ ] `.env.example` exists with all required env var keys as placeholders (no real values)
- [ ] `.env.local` is listed in `.gitignore` and is never committed
- [ ] `README.md` is updated with setup instructions (`npm install`, `cp .env.example .env.local`, `npm run dev`)
- [ ] Works on mobile viewport (dev tools check sufficient at this stage)
- [ ] No secrets committed
- [ ] Accessibility basics pass: labels, contrast, keyboard navigation (baseline only at scaffold stage)
- [ ] Loading state: N/A at scaffold stage
- [ ] Error state: N/A at scaffold stage

**Implementation Notes**
- Routes: All routes are stubs at this stage — `app/page.tsx` renders placeholder content
- Components: None required yet; folder structure must exist
- Data model: `types/` folder created; no data files required yet
- Tracking events: None at scaffold stage
- SEO/schema: `app/layout.tsx` must include `metadataBase` pointing to `NEXT_PUBLIC_SITE_URL`
- Dependencies:
  - `next@14+`
  - `react@18+`
  - `typescript`
  - `tailwindcss`
  - `eslint` + `eslint-config-next`
  - `prettier`

**QA Notes**
- Devices: Desktop browser (Chrome/Edge) sufficient at scaffold stage
- Browsers: Chrome
- Known risks: ESLint and Prettier version conflicts — pin compatible versions
- Open questions: Font selection (see Open Question #12 in IMPLEMENTATION_PLAN.md); use `Inter` as default until decided

---

### STORY-002 — Folder Structure and Base Layout

**Epic**
- Name: Project Foundation
- Owner Agent: frontend-nextjs-engineer
- Business Goal: Ensure every agent knows exactly where to place files and that the root layout is SEO-ready from the start.
- Success Metric: All folders from IMPLEMENTATION_PLAN.md Section 8 exist; `app/layout.tsx` passes TypeScript with correct metadata structure.
- Priority: P0

**User Story**
As a specialized agent, I want a pre-defined folder structure and a configured root layout so that I can place my files in the correct location without creating structural conflicts with other agents.

**Acceptance Criteria**
- [ ] All directories from IMPLEMENTATION_PLAN.md Section 8 exist (may be empty with `.gitkeep` files)
- [ ] `app/layout.tsx` exports correct `Metadata` object with `metadataBase`, `title.template`, `description`, `openGraph`, and `twitter` fields
- [ ] `app/layout.tsx` includes root HTML structure with `lang="en"` on `<html>`
- [ ] `styles/globals.css` imports Tailwind base, components, and utilities
- [ ] `tailwind.config.ts` has `content` paths covering `app/**`, `components/**`, and `lib/**`
- [ ] `tsconfig.json` includes `@/` path alias pointing to project root
- [ ] `next.config.ts` has `images.domains` or `remotePatterns` stubbed for future CDN use
- [ ] User can complete action on mobile: N/A (layout only)
- [ ] Page has unique SEO metadata: layout.tsx metadata is the baseline; per-page metadata will override
- [ ] Main content is server-rendered: layout.tsx is a server component
- [ ] CTA event pushed to dataLayer: N/A at layout stage
- [ ] No unsupported claims: N/A at layout stage
- [ ] Works without exposing secrets: verified — no secrets in layout

**Implementation Notes**
- Routes: Root layout wraps all routes
- Components: No components built yet; `components/` folder structure created
- Data model: `types/product.ts`, `types/analytics.ts`, `types/tiktok.ts` created with interfaces from IMPLEMENTATION_PLAN.md Section 4 and 5 (full interface text, not just stubs)
- Tracking events: `window.dataLayer` initialization script placed in layout before GTM script tag; GTM script reads `NEXT_PUBLIC_GTM_ID` env var — if undefined, GTM is not loaded
- SEO/schema: `metadataBase` configured
- Dependencies: None beyond STORY-001

**QA Notes**
- Devices: Desktop
- Browsers: Chrome
- Known risks: Path alias `@/` must be consistent across all agent work — enforce via tsconfig
- Open questions: Should `app/layout.tsx` include a `<noscript>` GTM iframe? Yes — include it per Google's GTM implementation guide.

---

### STORY-003 — robots.ts and sitemap.ts Stubs

**Epic**
- Name: Project Foundation
- Owner Agent: frontend-nextjs-engineer (stub); seo-technical-content (full implementation in Phase 4)
- Business Goal: Ensure Google can find and crawl the site from launch day; prevent accidental crawl of draft pages.
- Success Metric: `GET /robots.txt` returns valid robots content; `GET /sitemap.xml` returns valid XML with at least the homepage URL.
- Priority: P0

**User Story**
As a search engine crawler, I want a robots.txt and sitemap.xml available from day one so that the site is indexable and no private routes are accidentally crawled.

**Acceptance Criteria**
- [ ] `app/robots.ts` exports a `robots()` function that allows crawling of all public pages and disallows `/api/`
- [ ] `app/sitemap.ts` exports a `sitemap()` function that returns at minimum the homepage URL
- [ ] Both files use the `NEXT_PUBLIC_SITE_URL` env var for the base URL — no hardcoded domains
- [ ] `GET /sitemap.xml` in development returns valid XML without 404
- [ ] `GET /robots.txt` in development returns valid text without 404
- [ ] User can complete action on mobile: N/A
- [ ] Page has unique SEO metadata: N/A (not a page)
- [ ] Main content is server-rendered: robots and sitemap are server-rendered by Next.js
- [ ] No unsupported claims: N/A
- [ ] Works without exposing secrets: verified

**Implementation Notes**
- Routes: `app/robots.ts`, `app/sitemap.ts`
- Components: None
- Data model: Sitemap stub does not need real product data yet; Phase 4 will expand it
- Tracking events: None
- SEO/schema: This IS the SEO foundation
- Dependencies: STORY-001, STORY-002

**QA Notes**
- Devices: N/A
- Browsers: N/A
- Known risks: Forgetting to update `sitemap.ts` when new routes are added — Phase 4 will own the complete version
- Open questions: Disallow list for robots — `/api/`, `/catalog/` (download gate), any admin routes

---

### STORY-004 — Environment Variable Setup and .env.example

**Epic**
- Name: Project Foundation
- Owner Agent: frontend-nextjs-engineer
- Business Goal: Ensure no secrets are ever committed and every new developer or agent knows exactly which environment variables are required.
- Success Metric: `.env.example` contains all keys from IMPLEMENTATION_PLAN.md Section 9 with placeholder values; `.env.local` is gitignored.
- Priority: P0

**User Story**
As any team member or agent, I want a documented `.env.example` file so that I can set up the project locally without guessing which variables are needed, and without accidentally committing real credentials.

**Acceptance Criteria**
- [ ] `.env.example` exists at project root with all keys from IMPLEMENTATION_PLAN.md Section 9
- [ ] All values in `.env.example` are clearly labelled placeholders (e.g. `GTM-XXXXXXX`, `your_resend_api_key_here`)
- [ ] `.env.local` is in `.gitignore`
- [ ] `README.md` includes a setup step: `cp .env.example .env.local` then fill in values
- [ ] `NEXT_PUBLIC_SITE_URL` defaults to `http://localhost:3000` for local development
- [ ] Application loads and renders without error when `NEXT_PUBLIC_GTM_ID` is not set (GTM simply does not load)
- [ ] User can complete action on mobile: N/A
- [ ] No unsupported claims: N/A
- [ ] Works without exposing secrets: this story exists specifically to enforce that

**Implementation Notes**
- Routes: N/A
- Components: N/A
- Data model: N/A
- Tracking events: GTM conditional load based on env var presence
- SEO/schema: `metadataBase` depends on `NEXT_PUBLIC_SITE_URL`
- Dependencies: STORY-001

**QA Notes**
- Devices: N/A
- Browsers: N/A
- Known risks: Developer accidentally commits `.env.local` — verify `.gitignore` includes it
- Open questions: Will a `.env.staging` be needed? Defer to post-MVP.

---

### STORY-005 — ESLint, Prettier, and TypeScript Strict Mode Config

**Epic**
- Name: Project Foundation
- Owner Agent: frontend-nextjs-engineer
- Business Goal: Catch bugs early and enforce consistent code style across all agents contributing to the codebase.
- Success Metric: `npm run lint` passes; `npm run typecheck` (or `tsc --noEmit`) passes; `npx prettier --check .` passes on all files.
- Priority: P0

**User Story**
As any agent writing code, I want a configured linter, formatter, and TypeScript strict mode so that type errors and style inconsistencies are caught before they cause bugs in production.

**Acceptance Criteria**
- [ ] `.eslintrc.json` extends `next/core-web-vitals` and optionally `plugin:@typescript-eslint/recommended`
- [ ] `.prettierrc` defines consistent rules: single quotes, trailing commas, 2-space indent, 100 char print width
- [ ] `tsconfig.json` has `"strict": true`
- [ ] `package.json` includes a `typecheck` script: `"typecheck": "tsc --noEmit"`
- [ ] `npm run lint` produces zero errors on the fresh scaffold
- [ ] `npm run typecheck` produces zero errors on the fresh scaffold
- [ ] User can complete action on mobile: N/A
- [ ] No unsupported claims: N/A
- [ ] Works without exposing secrets: N/A

**Implementation Notes**
- Routes: N/A
- Components: N/A
- Data model: N/A
- Tracking events: N/A
- SEO/schema: N/A
- Dependencies: STORY-001

**QA Notes**
- Devices: N/A
- Browsers: N/A
- Known risks: `@typescript-eslint` version must match the installed TypeScript version
- Open questions: Should Husky pre-commit hooks be set up? Recommended but defer to STORY-005b if needed.

---

## Sprint 1 — Strategy, Information Architecture & Copy

---

### STORY-006 — Brand Positioning and B2B Messaging Pillars

**Epic**
- Name: Strategy Foundation
- Owner Agent: market-brand-strategist
- Business Goal: Give every agent (copy, design, SEO, ads) a single source of truth for how MODOLS positions itself and what message each buyer persona receives.
- Success Metric: Positioning document approved by project-orchestrator; conversion-copywriter confirms it is sufficient to write homepage hero copy.
- Priority: P0

**User Story**
As the conversion-copywriter and ui-visual-designer, I want a clear brand positioning statement and B2B messaging pillars so that every piece of copy and design decision reflects a consistent, credible, and conversion-oriented brand voice.

**Acceptance Criteria**
- [ ] Single positioning statement produced (one sentence: "For [target buyer], MODOLS is the [category] that [key differentiator] because [reason to believe]")
- [ ] Messaging pillars defined for each of the 4 buyer personas (Overseas Distributor, Beauty Clinic/Spa, Ecommerce Reseller, Retail Buyer) — 3 bullet points per persona
- [ ] Korean origin / K-beauty credibility angle articulated
- [ ] Export readiness signals identified (what makes MODOLS trustworthy to an international buyer)
- [ ] Brand voice described: tone, vocabulary to use, vocabulary to avoid
- [ ] User can complete intended action on mobile: N/A (strategy doc)
- [ ] No unsupported medical/safety claims in the positioning doc
- [ ] Works without exposing secrets: N/A

**Implementation Notes**
- Routes: N/A — this is a strategy document to be saved to `docs/BRAND_POSITIONING.md`
- Components: N/A
- Data model: N/A
- Tracking events: N/A
- SEO/schema: Keyword research input — identify 5 primary B2B search terms this positioning should support
- Dependencies: CLAUDE.md (already read)

**QA Notes**
- Devices: N/A
- Browsers: N/A
- Known risks: Over-claiming on K-beauty credentials without verified certifications — must stay at aspirational but factual level
- Open questions: Does MODOLS have any verified third-party certifications (KFDA notification number, CPSR, ISO)? Affects credibility claims.

---

### STORY-007 — Buyer Persona Refinement Documents

**Epic**
- Name: Strategy Foundation
- Owner Agent: market-brand-strategist
- Business Goal: Ensure the site architecture, copy, and conversion flow are optimized for the actual buyer behavior of each persona.
- Success Metric: 4 persona cards produced; site-architect-ux confirms they are sufficient to design the navigation and conversion funnel.
- Priority: P0

**User Story**
As the site-architect-ux, I want detailed buyer persona profiles so that I can design a navigation structure and conversion funnel that matches how each buyer type actually researches and makes purchase decisions.

**Acceptance Criteria**
- [ ] 4 persona cards produced (Overseas Distributor, Beauty Clinic/Spa, Ecommerce Reseller, Retail Buyer)
- [ ] Each card includes: goals, pain points, key questions before contacting supplier, preferred contact method, trust signals they look for, primary pages they will visit
- [ ] Funnel stage mapping: which personas are awareness vs. consideration vs. decision stage at first visit
- [ ] Priority ranking: which persona is the highest-value lead and should receive the most prominent conversion path
- [ ] User can complete intended action on mobile: N/A
- [ ] No unsupported claims: N/A

**Implementation Notes**
- Routes: N/A — saved to `docs/BUYER_PERSONAS.md`
- Components: N/A
- Data model: N/A — but persona tags may inform `product.tags[]` values
- Tracking events: `buyer_type` field in `quote_request_submit` event should match persona labels defined here
- SEO/schema: Persona research informs blog topic prioritization
- Dependencies: STORY-006

**QA Notes**
- Devices: N/A
- Browsers: N/A
- Known risks: Making assumptions about buyer behavior without market data — flag assumptions explicitly
- Open questions: Does MODOLS have existing customers who can be interviewed or whose inquiries can be reviewed?

---

### STORY-008 — Site Information Architecture and Navigation Structure

**Epic**
- Name: Information Architecture
- Owner Agent: site-architect-ux
- Business Goal: Define the complete navigation system and page hierarchy so frontend-nextjs-engineer can implement routing without ambiguity.
- Success Metric: IA document covers all 14 routes; navigation structure is reviewed and approved by project-orchestrator; no orphan pages.
- Priority: P0

**User Story**
As an overseas distributor visiting the site, I want intuitive navigation that leads me from product discovery to quote request in three clicks or fewer so that I can quickly assess whether MODOLS is a viable supplier.

**Acceptance Criteria**
- [ ] Full page list matches or extends IMPLEMENTATION_PLAN.md Section 3 (all 14 routes accounted for)
- [ ] Primary navigation items defined (max 6 items in main nav)
- [ ] Secondary navigation (footer columns) defined
- [ ] Mobile navigation pattern defined (hamburger menu or bottom nav)
- [ ] Breadcrumb structure defined for product, category, and blog pages
- [ ] Quote list drawer trigger location(s) defined (header badge icon)
- [ ] User can complete intended action on mobile: verified — quote flow tested through IA diagram
- [ ] No unsupported claims: N/A
- [ ] Accessibility basics: keyboard navigation path through main nav must be described

**Implementation Notes**
- Routes: All routes from IMPLEMENTATION_PLAN.md Section 3 confirmed or modified
- Components: Navigation component requirements described (Navbar, Footer, Breadcrumb, QuoteListDrawer trigger)
- Data model: N/A
- Tracking events: Navigation events not in current spec — note if any nav clicks should be tracked
- SEO/schema: Internal link structure defined — which pages link to which (critical for SEO)
- Dependencies: STORY-006, STORY-007

**QA Notes**
- Devices: Mobile (375px), tablet (768px), desktop (1280px)
- Browsers: Chrome, Safari
- Known risks: Over-engineering the nav for a product line of 4 SKUs — keep it simple, expandable
- Open questions: Will there be a "Samples" or "Starter Kit" section separate from /quote-request?

---

### STORY-009 — Quote Request Conversion Flow Design

**Epic**
- Name: Information Architecture
- Owner Agent: site-architect-ux
- Business Goal: Design the end-to-end quote request flow — the primary conversion action — so it is frictionless, trust-building, and completable on mobile.
- Success Metric: Flow diagram covers all states (empty quote list, adding product, viewing drawer, submitting form, success/error states); frontend-nextjs-engineer confirms it is implementable.
- Priority: P0

**User Story**
As a beauty clinic buyer, I want to add multiple products to a quote list and submit a single inquiry with all my requirements so that I don't have to contact the supplier separately for each product.

**Acceptance Criteria**
- [ ] Flow diagram or text spec covers: product card "Add to Quote" action, quote list drawer open/close, remove item from list, navigate to /quote-request, form fields listed, form submission, success state, error state
- [ ] Empty state defined: what the user sees on /quote-request if they arrive with an empty quote list
- [ ] Quote list persistence strategy defined: localStorage (client-side, no login required for MVP)
- [ ] Maximum items in quote list defined (suggest 10 — configurable constant)
- [ ] Form fields specified: company name, buyer name, email, phone, country, buyer type (dropdown), inquiry type (dropdown), quantity range, product list (pre-populated from quote list), message, privacy consent checkbox
- [ ] User can complete intended action on mobile: explicitly verified in flow diagram
- [ ] CTA event is pushed to dataLayer: `add_to_quote`, `quote_request_start`, `quote_request_submit` events defined
- [ ] Loading state: form submitting state defined
- [ ] Error state: form error and API error states defined

**Implementation Notes**
- Routes: `/quote-request`, interaction with all product pages and catalog page
- Components: `QuoteButton`, `QuoteListDrawer`, `QuoteRequestForm`
- Data model: Quote list item = `{ productSlug: string, productName: string, sku: string, quantity?: number }`
- Tracking events: `add_to_quote`, `remove_from_quote`, `quote_request_start`, `quote_request_submit`
- SEO/schema: `/quote-request` page does not need Product schema; needs basic page metadata
- Dependencies: STORY-007, STORY-008

**QA Notes**
- Devices: Mobile (375px iPhone SE, 390px iPhone 15), desktop
- Browsers: Chrome, Safari, Firefox
- Known risks: Quote list in localStorage is lost when user clears cache — acceptable for MVP; note for V1
- Open questions: Should the quote list persist across sessions (localStorage) or only within the session (sessionStorage)? Recommend localStorage for better UX.

---

### STORY-010 — Homepage Hero and CTA Copy Brief

**Epic**
- Name: Copy Foundation
- Owner Agent: conversion-copywriter
- Business Goal: Produce claims-safe, conversion-oriented homepage copy that immediately communicates B2B supplier positioning and drives the primary CTA.
- Success Metric: Copy brief approved by project-orchestrator; no P0 compliance violations flagged by qa-compliance-risk; copy is ready for frontend-nextjs-engineer to implement.
- Priority: P0

**User Story**
As an overseas distributor landing on the MODOLS homepage for the first time, I want to immediately understand what MODOLS offers, who it is for, and how to get a quote so that I can decide in under 10 seconds whether to stay on the site.

**Acceptance Criteria**
- [ ] Hero headline: 6–10 words, B2B positioning, no medical claims
- [ ] Hero subheadline: 1–2 sentences expanding on the headline
- [ ] Primary CTA button copy: 3–5 words (e.g. "Request a Quote", "Get Wholesale Pricing")
- [ ] Secondary CTA copy: WhatsApp or catalog download alternative
- [ ] Category section headline and 3–4 category tile copy variants
- [ ] "How it works" section: 3-step process copy (step titles + 1-sentence descriptions)
- [ ] WhatsApp CTA section: headline + supporting copy + button text
- [ ] All copy is compliant with CLAUDE.md content rules (no disease claims, no absolute safety claims, no unsubstantiated superlatives)
- [ ] User can complete intended action on mobile: copy fits within mobile hero viewport (length constraint)
- [ ] Main content is server-rendered: copy must be static strings, not fetched client-side
- [ ] No unsupported medical/safety claims: explicit compliance check noted in copy brief
- [ ] Accessibility basics: heading hierarchy specified (H1 for hero headline only)

**Implementation Notes**
- Routes: `/` (homepage)
- Components: `Hero`, `CategoryTiles`, `HowItWorks`, `WhatsAppCTA`
- Data model: N/A — copy is static strings baked into components
- Tracking events: `whatsapp_click` on WhatsApp CTA; no tracking event needed for hero impression
- SEO/schema: H1 must include primary B2B keyword; copy brief should note this
- Dependencies: STORY-006 (positioning), STORY-007 (personas)

**QA Notes**
- Devices: Mobile — ensure hero headline does not exceed 2 lines on 375px width
- Browsers: N/A (copy review)
- Known risks: Over-promising on "Korean beauty" without specifying what makes MODOLS's products distinctive
- Open questions: Should the homepage address all 4 buyer personas or focus on the highest-value persona? Recommend leading with distributor/clinic, with persona-specific CTAs lower on the page.

---

### STORY-011 — Product Microcopy and Category Copy Brief

**Epic**
- Name: Copy Foundation
- Owner Agent: conversion-copywriter
- Business Goal: Produce claims-safe product-level copy that drives product exploration and quote list additions.
- Success Metric: Copy for all 4 initial products and 3 initial categories is complete; compliance review notes attached; ready for product-data-catalog-manager to incorporate into data files.
- Priority: P0

**User Story**
As a beauty clinic buyer browsing the product catalog, I want to read clear, professional product descriptions that explain benefits without making treatment claims so that I can confidently add products to my quote list.

**Acceptance Criteria**
- [ ] Short description (1–2 sentences) for each of the 4 products: Deep Cleanser, Skin Booster, Essence Cream, Tone Up Ampoule
- [ ] 3–5 key benefits per product (bullet points, claims-safe)
- [ ] Usage guidance per product (how to use, professional use note if applicable)
- [ ] Category SEO intro paragraph for "Skincare" category page (100–150 words, includes primary keyword)
- [ ] SEO title and meta description for each product page and each category page
- [ ] All copy verified against CLAUDE.md content rules
- [ ] Compliance notes documented alongside copy (what was changed and why)
- [ ] User can complete intended action on mobile: short descriptions are under 120 chars for card display
- [ ] No unsupported claims: documented in compliance notes

**Implementation Notes**
- Routes: `/products/[slug]`, `/categories/[slug]`
- Components: `ProductCard` (uses shortDescription), `ProductDetail` (uses fullDescription + keyBenefits)
- Data model: Copy feeds directly into `data/products/*.ts` files
- Tracking events: N/A (copy only)
- SEO/schema: `seoTitle` and `seoDescription` fields in Product data model
- Dependencies: STORY-006, STORY-007

**QA Notes**
- Devices: N/A (copy review)
- Browsers: N/A
- Known risks: "Skin Booster" term may have clinical connotations in some markets (e.g., injectable boosters) — copy must clearly position as a topical cosmetic product
- Open questions: Are "before and after" style benefit descriptions permissible? Recommend against absolute before/after claims; use "may help the appearance of" framing.

---

### STORY-012 — Wireframe Notes and Component Specification

**Epic**
- Name: Design Specification
- Owner Agent: site-architect-ux (wireframes) + ui-visual-designer (component spec)
- Business Goal: Give frontend-nextjs-engineer unambiguous component specifications so that implementation does not require design back-and-forth.
- Success Metric: All 20+ components from IMPLEMENTATION_PLAN.md Section 2 have a written spec (layout, states, content slots, responsive behavior) before Phase 3 begins.
- Priority: P0

**User Story**
As the frontend-nextjs-engineer, I want detailed wireframe notes and component specifications so that I can implement each component correctly on the first attempt without waiting for design clarification.

**Acceptance Criteria**
- [ ] Wireframe notes (text descriptions or ASCII diagrams acceptable) for: Homepage (all sections), /products grid, /products/[slug], /categories/[slug], /quote-request, /bulk-order
- [ ] Component spec for each component in IMPLEMENTATION_PLAN.md Section 2: props list, content slots, states (default, hover, loading, error, empty), responsive breakpoint behavior
- [ ] Quote list drawer spec: trigger, open/close animation description, empty state, item list, remove action, "Go to Quote Form" button, count badge on trigger
- [ ] ProductCard spec: image, name, category, short description, "Add to Quote" button, badge variants (Best Seller, New)
- [ ] Mobile-first responsive rules documented: which components collapse, which stack, which hide at each breakpoint
- [ ] User can complete intended action on mobile: every interactive component has a mobile spec
- [ ] Accessibility basics: focus states, ARIA roles, and label requirements noted per component
- [ ] Loading state and error state: defined for ProductGrid, QuoteRequestForm, BulkOrderForm

**Implementation Notes**
- Routes: All core routes
- Components: All 20+ components from IMPLEMENTATION_PLAN.md Section 2
- Data model: Props types should reference TypeScript interfaces from `types/product.ts`
- Tracking events: Which user interaction on each component triggers which dataLayer event
- SEO/schema: Note which components render H1/H2/H3 to enforce heading hierarchy
- Dependencies: STORY-006 through STORY-011

**QA Notes**
- Devices: 375px (mobile), 768px (tablet), 1280px (desktop), 1920px (wide desktop)
- Browsers: N/A (spec document)
- Known risks: Scope creep into detailed visual design — wireframe notes should describe layout and behavior, not pixel-perfect visual decisions (those belong to ui-visual-designer)
- Open questions: Will shadcn/ui be used for base UI primitives (Button, Input, Select) or will all components be built from scratch with Tailwind? Recommend shadcn/ui for accessible primitives; custom design layer on top.

---

## Backlog Items Identified for Future Sprints

The following items are scoped but not yet broken into stories. They will be prioritized in Sprint 2 planning:

**Phase 2 — Design System**
- STORY-013: Tailwind design token definition (colors, typography, spacing, radius, shadows)
- STORY-014: Component visual design specifications (all components from STORY-012)

**Phase 3 — Core Build**
- STORY-015: Product data schema finalization and 4 initial product data files
- STORY-016: Homepage implementation
- STORY-017: /products catalog page implementation
- STORY-018: /products/[slug] detail page implementation
- STORY-019: /categories/[slug] category page implementation
- STORY-020: Quote list state management (Context + localStorage)
- STORY-021: /quote-request page and form implementation
- STORY-022: /bulk-order page and form implementation
- STORY-023: /catalog download gate page implementation
- STORY-024: /about, /contact, /blog, /blog/[slug] stub pages
- STORY-025: /privacy-policy static page
- STORY-026: /404 and error.tsx

**Phase 4 — SEO**
- STORY-027: Per-page metadata and canonical URLs
- STORY-028: Complete sitemap.ts with all dynamic routes
- STORY-029: JSON-LD schema implementation (all types)
- STORY-030: Blog topic brief (5 articles)

**Phase 5 — Analytics**
- STORY-031: GTM/GA4 implementation
- STORY-032: dataLayer event implementation
- STORY-033: Google Ads conversion action setup

**Phase 6 — TikTok Shop**
- STORY-034: TikTok Shop eligibility and field mapping

**Phase 7 — Backend**
- STORY-035: Quote request API route and email notification
- STORY-036: Bulk order API route
- STORY-037: Catalog download gate API route

**Phase 8 — QA & CRO**
- STORY-038: Accessibility and compliance audit
- STORY-039: Performance audit and optimization
- STORY-040: CRO backlog and A/B test planning

---

*This backlog is the working task list for Sprint 0 and Sprint 1. Stories are listed in priority order within each sprint. Mark stories complete by checking all acceptance criteria before moving to the next story.*
