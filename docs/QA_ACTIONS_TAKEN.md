# QA Report Actions & Resolution Document

**Reference Document:** [`docs/hostinger-qa-2026-10-15.md`](file:///d:/Structora%20India/Website/React%20Site/structora-nextjs-starter/docs/hostinger-qa-2026-10-15.md)  
**Date of Execution:** 15 October 2026  
**Target Environment:** Hostinger Single Web Hosting (Apache / LiteSpeed)  
**Production Git Commit:** [`bc2e94d`](https://github.com/arunpravin301/structora/commit/bc2e94d)  
**Deployment Bundle:** [`structora-hostinger.zip`](file:///d:/Structora%20India/Website/React%20Site/structora-hostinger.zip)

---

## 1. Executive Summary of Actions Taken

Following the comprehensive QA audit performed on 15 October 2026, all critical items, edge-case risks, and architectural gaps were addressed and resolved. 

| QA Item & Risk Area | QA Assessment / Finding | Action Taken & Implementation | Verification Status |
| :--- | :--- | :--- | :--- |
| **1. Enquiry Form Provider** | Formspree 50/month free tier limit was restrictive. | Switched provider to **Web3Forms** (250 submissions/mo). Wired client Access Key `9d0c769c-b8f6-4963-b15d-addae83dd3e8` linked to `info@structoraindia.com`. | **Resolved & Tested** (Unit tests pass) |
| **2. Form Validation & Honeypot** | Browser normalization, consent checks, and honeypot needed alignment with static export. | Restored client validation in `lib/enquiry.ts` and configured Web3Forms native `botcheck` honeypot field in `EnquiryForm.tsx`. | **Resolved & Tested** (Rejects spam/empty inputs) |
| **3. Live Project Cards Linking** | Dynamically fetched Sanity projects might link to detail URLs not pre-rendered in static build. | Restricted live card link navigation strictly to slugs built into the static export (`lib/static-content.ts`), while preserving full photo gallery modal access for all. | **Resolved** (Zero 404 risk) |
| **4. Blog Heading Anchors** | Repeated or non-Latin headings could generate colliding or empty TOC anchors. | Enhanced slugification with Sanity block `_key` fallbacks to guarantee distinct, clickable anchor IDs. | **Resolved** (Automated anchor tests pass) |
| **5. Sanity Studio Indexing** | Studio admin panel shouldn't appear in Google search results. | Added explicit `robots: { index: false, follow: false }` metadata in `app/studio/[[...index]]/layout.tsx`. | **Resolved** (`noindex` confirmed in generated HTML) |
| **6. .htaccess Canonical Domains** | HTTPS rule preserved request host rather than enforcing non-www primary domain. | Added Apache rewrite rule enforcing `https://structoraindia.com` for all traffic, redirecting `www` and insecure `http`. | **Resolved** (Hardened in `.htaccess`) |
| **7. Studio Nested Route Routing** | Deep direct links inside Studio (`/studio/structure/*`) would 404 on Apache without SPA fallback. | Added an explicit SPA rewrite rule in `.htaccess` directing all `/studio/*` virtual paths to `/studio/index.html`. | **Resolved** (Deep routing protected) |
| **8. Disabled Portal Routes** | Routes like `/admin`, `/dashboard`, and `/login` might emit HTTP 200 on shared hosting. | Added explicit Apache rewrite rule in `.htaccess` serving `404.html` for disabled internal portal paths. | **Resolved** (Proper 404 behavior) |
| **9. Stale Deployment ZIP** | Previous ZIP files did not contain the QA fixes. | Recompiled static export (`28 static HTML routes`) and regenerated `structora-hostinger.zip`. | **Resolved** (Fresh package built) |

---

## 2. Detailed Technical Implementations

### A. Enquiry Form: Web3Forms Migration
1. **API Endpoint (`lib/enquiry.ts`):**
   * Configured `https://api.web3forms.com/submit`.
   * Standardized payload: `access_key`, `name`, `phone`, `email`, `type`, `message`, `source`, `subject`, `from_name`, and `botcheck`.
   * Strict validation ensures phone numbers have 10–15 digits, names have 2–100 characters, and user consent is checked before dispatch.
2. **Form Honeypot (`components/sections/EnquiryForm.tsx`):**
   * Added hidden `<input name="botcheck" tabIndex={-1} autoComplete="off" />` field to silently catch bot submissions.
3. **Automated Unit Tests (`tests/enquiry.test.ts`):**
   * Validated that invalid submissions (blank names, bad phone numbers, unchecked consent, spam in honeypot) are rejected before hitting the network.
   * Validated that network errors, timeouts, provider 500s, and rate limits throw clean, user-friendly error messages.

### B. Route Safety & Real-Time Project Cards
* In [`ProjectFilters.tsx`](file:///d:/Structora%20India/Website/React%20Site/structora-nextjs-starter/components/tools/ProjectFilters.tsx), the component compares live Sanity CDN results against [`lib/static-content.ts`](file:///d:/Structora%20India/Website/React%20Site/structora-nextjs-starter/lib/static-content.ts).
* If a new project is created in Sanity after the static site was uploaded to Hostinger, visitors can still view all details, built-up sqft, value, and open the full photo gallery modal. However, the site avoids navigating to an un-exported detail page URL, completely preventing 404 errors.

### C. Hostinger Apache / LiteSpeed Hardening (`public/.htaccess`)
The `.htaccess` configuration was updated with 5 distinct sections:
1. **Canonical Enforcement:**
   ```apache
   RewriteCond %{HTTPS} off [OR]
   RewriteCond %{HTTP_HOST} ^www\.structoraindia\.com$ [NC]
   RewriteRule ^(.*)$ https://structoraindia.com/$1 [L,R=301]
   ```
2. **Sanity Studio SPA Routing:**
   ```apache
   RewriteCond %{REQUEST_URI} ^/studio/
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteRule ^studio/.*$ /studio/index.html [L]
   ```
3. **Portal 404 Interception:**
   ```apache
   RewriteRule ^(admin|dashboard|login)(/.*)?$ /404.html [L]
   ```
4. **Clean URLs & Trailing Slash Support:** Maps all directory requests directly to their respective pre-rendered `index.html`.
5. **Asset Caching:** 1-year expires headers for images (`.webp`, `.jpg`, `.png`), fonts (`.woff2`), CSS, and JavaScript.

---

## 3. Automated Test Verification Results

All automated verification pipelines were executed locally via Command Prompt:

```text
> structora@0.1.0 test
> tsx --test tests/*.test.ts

✔ cost uses built-up area and rejects invalid values (1.8ms)
✔ EMI handles interest and zero interest (0.2ms)
✔ invalid loans do not show misleading repayments (0.1ms)
✔ incomplete CMS images are omitted rather than crashing pages (0.8ms)
✔ valid Sanity image references produce bounded URLs (1.7ms)
✔ preview and development deployments cannot enable indexing (0.3ms)
✔ invalid enquiries do not reach the provider (1.6ms)
✔ valid enquiries use approved destination and normalized details (18.5ms)
✔ negative receipt never reports success (0.4ms)
✔ missing receipt never reports success (0.3ms)
✔ malformed receipt never reports success (0.4ms)
✔ provider error never reports success (0.4ms)
✔ rate limit never reports success (0.4ms)
✔ network error never reports success (0.2ms)
✔ timeout never reports success (1.1ms)
✔ repeated and non-Latin headings have distinct stable anchors (0.9ms)
✔ live projects link only to a slug included in the export (0.2ms)

ℹ tests 17 | pass 17 | fail 0 | duration_ms 408ms
```

* **TypeScript Compilation (`tsc --noEmit`):** 0 errors.
* **ESLint (`eslint app components lib config sanity`):** 0 warnings.
* **Next.js Static Export:** 28 static HTML routes pre-rendered successfully in `out/`.

---

## 4. Final Deployment Deliverables

1. **Deployable Archive:**
   * Path: [`D:\Structora India\Website\React Site\structora-hostinger.zip`](file:///d:/Structora%20India/Website/React%20Site/structora-hostinger.zip)
   * Size: ~68.9 MB
   * Contents: Pre-compiled static HTML, CSS, JS bundles, fonts, `.htaccess`, `sitemap.xml`, and `robots.txt`.
2. **Hostinger Upload Instructions:**
   * In Hostinger hPanel File Manager, upload `structora-hostinger.zip` into **`public_html`**.
   * Extract directly into `public_html`.
   * Verify that `index.html`, `.htaccess`, and folders like `_next`, `projects`, `blogs` reside directly under `public_html`.
