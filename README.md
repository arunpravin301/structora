# Structora India Constructions — Website

Next.js (App Router) + Tailwind + GSAP. Headless WordPress for content.
Supabase reserved for the Phase 2 client portal. Deploy on Vercel.

## Run locally
```bash
npm install
cp .env.local.example .env.local   # fill in values (WordPress optional to start)
npm run dev                         # http://localhost:3000
```
The site runs with no configuration. The Journal shows placeholder posts until
you set WORDPRESS_API_URL; then it loads real posts automatically.

## Structure
- `app/(marketing)/` — public site (Phase 1): home, services, projects, about, journal, contact
- `app/(app)/` — protected client portal (Phase 2, scaffolded empty)
- `components/` — ui, sections, marketing, tools (estimator, EMI, before/after, filters)
- `lib/wordpress.ts` — content from headless WordPress
- `lib/supabase/` — Phase 2 auth/data (stub)
- `config/site.ts` — nav, services, sample estimator rates
- `middleware.ts` — protects portal routes (inert until Phase 2)

## Content (headless WordPress)
The marketing team edits in WordPress. Point `WORDPRESS_API_URL` at
`https://<cms-domain>/wp-json/wp/v2`. Add a webhook to POST
`/api/revalidate?secret=...` on publish so pages refresh without a redeploy.
Use an SEO plugin (Yoast or RankMath) so the team controls meta titles/descriptions.

## What is real vs placeholder
- Real & working: full design system, all pages, cost estimator, EMI calculator,
  project filters, before/after slider, GSAP motion, SEO metadata, sitemap/robots,
  contact form posting to `/api/enquiry`.
- Placeholder (awaiting client): photography (art-directed plates), real numbers,
  package prices, district rates (in `config/site.ts`), testimonials, addresses,
  blog content.

## Deploy
- Front end: Vercel. Point `structoraindia.com` at it.
- WordPress: client's Hostinger, backend only, e.g. `cms.structoraindia.com`.
- Phase 2: add Supabase, activate `middleware.ts`, build out `app/(app)/`.

## To finish before launch
1. Drop real district rates into `config/site.ts`.
2. Wire `/api/enquiry` to email or WhatsApp.
3. Connect WordPress and add project + service content types.
4. Replace plates with real photography.
