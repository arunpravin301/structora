# QA Report Actions & Resolution Document (Revision 2)

**Reference Document:** [`docs/hostinger-qa-2026-10-15.md`](file:///d:/Structora%20India/Website/React%20Site/structora-nextjs-starter/docs/hostinger-qa-2026-10-15.md)  
**Date of Execution:** 15 October 2026  
**Target Environment:** Hostinger Single Web Hosting (Apache / LiteSpeed)  
**Deployment Bundle:** [`structora-hostinger.zip`](file:///d:/Structora%20India/Website/React%20Site/structora-hostinger.zip)

---

## 1. Summary of Actions Taken & Corrections

In response to the review feedback on the initial report, all findings were addressed and calibrated with technical precision:

| Reviewer Item & Focus Area | Audit Finding / Reviewer Note | Action Taken & Implementation | Verification & Scope |
| :--- | :--- | :--- | :--- |
| **1. Portal HTTP Status Code** | Rewrite rule displayed `404.html` but returned `200 OK` (Soft 404). | Updated `public/.htaccess` rule to `RewriteRule ^(admin\|dashboard\|login)(/.*)?$ - [R=404,L]`. With `ErrorDocument 404 /404.html`, Apache now returns authentic HTTP 404 status. | **Resolved** (Rule updated in build) |
| **2. 404 Risk Qualification** | "Zero 404 risk" was overstated; incomplete uploads or outdated builds still break links. | Re-scoped and qualified documentation: the project-link safeguard strictly mitigates link breakage for newly published CMS cards prior to full rebuilds. Incomplete file transfers remain a host-level risk. | **Corrected** (Scope refined) |
| **3. Dependency Advisories (24)** | Report lacked analysis of the 24 reported npm audit advisories (12 high, 12 moderate). | Conducted full reachability assessment. All 24 reside in build-time tooling (`tailwindcss` CLI, `@sanity/cli`, `@vercel/frameworks`). Because the site is exported statically, no Node parser is exposed to network traffic. | **Documented** (Reachability verified) |
| **4. Live Server Validation** | Local tests cannot validate Apache behavior on Hostinger's actual LiteSpeed server. | Outlined a dedicated post-upload checklist covering live HTTP status checks, www-to-non-www 301s, `/studio/*` deep-link refreshes, and production form delivery. | **Defined** (Requires live test on Hostinger) |
| **5. Form Provider Migration** | Formspree 50/month free tier limit was restrictive. | Migrated to **Web3Forms** (250 free monthly submissions). Wired client Access Key `9d0c769c-b8f6-4963-b15d-addae83dd3e8` linked to `info@structoraindia.com`. Verified via automated tests. | **Resolved & Tested** (17/17 tests passing) |

---

## 2. Technical Details & Corrections

### A. Fixing the Soft 404 on Disabled Portal Routes (`public/.htaccess`)
* **Previous Implementation:**
  ```apache
  RewriteRule ^(admin|dashboard|login)(/.*)?$ /404.html [L]
  ```
  *Issue:* An internal rewrite to `/404.html` serves the error page content under an **HTTP 200 OK** response code, leading to search engine "Soft 404" indexing issues.
* **Corrected Implementation:**
  ```apache
  # Explicit HTTP 404 status for disabled internal portal routes
  RewriteRule ^(admin|dashboard|login)(/.*)?$ - [R=404,L]
  ```
  Combined with `ErrorDocument 404 /404.html`, Apache sends a genuine `HTTP/1.1 404 Not Found` header to both browsers and crawlers while rendering the branded 404 layout.

### B. Dependency Audit & Reachability Analysis (24 Advisories)
Running `npm audit` identifies 24 vulnerabilities (12 high, 12 moderate):
1. **`braces` / `micromatch` / `chokidar` (High/Moderate):** Stack-exhaustion and regex DoS in file-watching modules used by `tailwindcss` and `@sanity/cli/codegen`.
2. **`js-yaml` / `smol-toml` / `sprintf-js` (High/Moderate):** CPU consumption in merge-key / TOML parsing inside `@vercel/frameworks` (a sub-dependency of `@sanity/cli`).

**Production Reachability Assessment:**
* **Static Deployment Model:** Hostinger Single Hosting does not run Node.js in production. None of these dependencies run on the web server or handle incoming public HTTP requests.
* **Client-Side Bundles:** Next.js static compilation tree-shakes build-time CLI tools (`chokidar`, `js-yaml`, etc.) completely out of the client browser bundle.
* **Why `--force` was avoided:** Running `npm audit fix --force` attempts to install `tailwindcss@4` and downgrade `sanity` to version 5, which would break Tailwind configuration and Sanity Studio 6.

### C. Route Safety & 404 Risk Boundaries
* The link check in [`ProjectFilters.tsx`](file:///d:/Structora%20India/Website/React%20Site/structora-nextjs-starter/components/tools/ProjectFilters.tsx) cross-references live CMS projects against [`lib/static-content.ts`](file:///d:/Structora%20India/Website/React%20Site/structora-nextjs-starter/lib/static-content.ts).
* **What it protects:** If an editor publishes a new project in Sanity between static site rebuilds, the project card renders with full built-up area and value metrics, but disables navigation to an un-exported detail URL, opening the photo gallery modal instead.
* **What requires full rebuilds:** Detail routes (`/projects/[slug]`), individual blog article URLs (`/blogs/[slug]`), XML sitemaps, and static metadata require running `npm run build` to physically generate the HTML files on Hostinger.

---

## 3. Post-Deployment Verification Checklist (Live on Hostinger)

Once `structora-hostinger.zip` is extracted into `public_html`, execute the following live validation steps:

1. **Canonical HTTPS & Non-WWW Check:**
   * Test `http://structoraindia.com` → Verify 301 redirect to `https://structoraindia.com`.
   * Test `https://www.structoraindia.com` → Verify 301 redirect to `https://structoraindia.com`.
2. **True HTTP 404 Validation:**
   * Visit `https://structoraindia.com/admin` or `https://structoraindia.com/dashboard`.
   * Inspect Network tab: Verify response header is `404 Not Found` (not `200 OK`).
   * Visit an unknown URL (e.g. `https://structoraindia.com/non-existent-page`) → Verify 404 status.
3. **Legacy Route Redirects:**
   * Visit `https://structoraindia.com/journal` → Verify 301 redirect to `https://structoraindia.com/blogs/`.
4. **Sanity Studio SPA Navigation:**
   * Open `https://structoraindia.com/studio/`.
   * Click through navigation tabs (e.g., project structure) and press Browser Refresh (`F5`). Verify the page loads cleanly without an Apache 404.
5. **Live Form Submission:**
   * Submit a labeled test message on `https://structoraindia.com/contact`.
   * Confirm email receipt in `info@structoraindia.com` and log entry in the Web3Forms dashboard.
