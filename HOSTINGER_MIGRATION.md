# Structora India — Next.js Migration to Hostinger Single Hosting

This document details the architectural adaptations, code modifications, and configuration changes made to convert the **Structora India** Next.js 16 web application from a Node.js server runtime (e.g., Vercel) into a **pure Static Site Generation (SSG)** build tailored for **Hostinger Single Web Hosting**.

---

## 1. Executive Summary

| Environment Property | Original Architecture (Vercel / Node.js) | Hostinger Single Web Hosting |
| :--- | :--- | :--- |
| **Server Runtime** | Node.js Serverless Edge Runtime | Apache / LiteSpeed Web Server (Shared PHP/HTML) |
| **Execution Mode** | Server-Side Rendering (SSR) & Dynamic Routes | Static Site Generation (`output: 'export'`) |
| **CMS Data Fetching** | Build-time + On-Demand ISR (`/api/revalidate`) | Static Pre-rendering + Real-Time Client CDN Hydration |
| **Contact Form** | Next.js API Route (`/api/enquiry`) proxying Formspree | Direct Browser-to-Formspree API submission |
| **Routing & URL Rewriting** | Next.js Edge Middleware / `proxy.ts` | Apache `.htaccess` Rewrite Engine |
| **CMS Studio (`/studio`)** | Dynamic Node.js SSR Route | Embedded Static Single Page App (SPA) + Sanity Cloud |

---

## 2. Why Adaptations Were Required

### A. The Shared Hosting Limitation
Hostinger Single Hosting is a shared Linux hosting environment managed via hPanel. It runs an **Apache/LiteSpeed** web server capable of serving static files (HTML, CSS, JS, images) and executing PHP scripts. 

It **does not support long-running Node.js daemon processes** (`next start`, PM2, or background Express servers), which Next.js traditionally uses to serve dynamic pages on demand.

### B. The Challenge
If you attempt to upload a default Next.js build to Hostinger Single Hosting:
1. Next.js server components and API routes crash because there is no Node.js engine listening on port 3000.
2. Route transitions like `/projects`, `/about`, and `/pricing` return `404 Not Found` because Apache looks for files or directories that match the URL path.
3. Form submissions fail because `/api/enquiry` cannot execute server-side code.

---

## 3. What Was Changed & Why

### 1. Enabled Next.js Static Export (`next.config.mjs`)
* **What was changed:** Added `output: 'export'`, `trailingSlash: true`, and `images: { unoptimized: true }`.
* **Why:**  
  * `output: 'export'` tells Next.js to pre-render every page into clean `.html`, `.css`, and `.js` files in an `out/` directory.
  * `trailingSlash: true` ensures that routes generate folders with an `index.html` inside (e.g., `/pricing/index.html` instead of `/pricing.html`). This is essential for Apache web servers to serve clean URLs naturally.
  * `images: { unoptimized: true }` is required because the Next.js on-demand image optimization service runs only in Node.js. Structora's images already use Sanity's global CDN image pipeline (`urlForImage().width().auto('format')`), so images remain compressed and optimized in WebP format automatically.

### 2. Created Apache / LiteSpeed `.htaccess` (`public/.htaccess`)
* **What was changed:** Created a dedicated Apache configuration file in `public/` that gets bundled directly into `out/.htaccess`.
* **Why:**  
  * **HTTPS Enforcement:** Automatically redirects all HTTP traffic to secure `https://structoraindia.com`.
  * **Clean URL Resolution:** Resolves URLs like `/about/`, `/services/`, and `/projects/` to their respective `index.html` files without throwing 404 errors.
  * **Legacy Redirects:** Preserves 301 SEO redirects from `/journal/*` to `/blogs/*`.
  * **Browser Caching:** Sets aggressive 1-year caching on static assets (`.webp`, `.woff2`, `.css`, `.js`) to maximize Google PageSpeed scores on shared hosting.

### 3. Solved Real-Time Sanity CMS Updates on a Static Site
* **The Problem:** In a pure static export, pages are compiled once. If a client publishes a new project or modifies details in Sanity Studio, a traditional static website would not reflect those changes until a developer re-compiles and re-uploads the website.
* **The Solution (`components/tools/ProjectFilters.tsx`):**  
  We implemented **Two-Layer Hydration**:
  1. *Build Layer (SEO & Instant Speed):* The existing projects are pre-rendered into HTML at build time for instant first-paint and complete Googlebot indexing.
  2. *Live Client Layer (Real-time updates):* When a user visits `structoraindia.com/projects`, a lightweight `useEffect` query hits the Sanity CDN in the background. If the client just published or edited a project, the project cards update in real time on the screen without re-uploading the site.

### 4. Direct Formspree Integration (`components/sections/EnquiryForm.tsx`)
* **What was changed:** Migrated form submissions from `/api/enquiry` directly to `https://formspree.io/f/xyeknvjl`.
* **Why:** Hostinger Single Hosting cannot run Next.js API routes (`app/api/`). Formspree is designed specifically for direct front-end static forms, providing email delivery, spam filtering, and instant submission without needing a server-side proxy.

### 5. Configured Dynamic Catch-All Routes
* **Dynamic Slugs (`app/(marketing)/projects/[slug]/page.tsx` and `app/(marketing)/blogs/[slug]/page.tsx`):**  
  Added `generateStaticParams()` to pre-render static HTML pages for all published projects and blogs, including a graceful fallback route when no blogs exist.
* **Sanity Studio (`app/studio/[[...index]]`):**  
  Split the studio into a Server Component with `dynamic = 'force-static'` and a Client Component (`Studio.tsx`). This allows the Sanity Studio to compile into `/studio/index.html`, giving your client the option to access the CMS directly at `https://structoraindia.com/studio/` on Hostinger.

### 6. Blog SEO & Table of Contents Architecture
* **Auto-generated Table of Contents:** Automatically extracts `H2` and `H3` blocks from Sanity Portable Text body content, generating anchor IDs and an interactive navigation card.
* **Sanity Field Additions (`blogType.ts`):** Added `category`, `readTime`, `showToc` toggle, and an `faqs` repeater array.
* **Google FAQ Schema (`schema.org/FAQPage`):** When FAQs are populated in a blog post, Next.js injects structured FAQPage JSON-LD into the HTML, qualifying the blog for Google **"People Also Ask"** rich snippets.

---

## 4. How to Deploy to Hostinger (Step-by-Step)

The production static build has been generated and compressed into:
`D:\Structora India\Website\React Site\structora-hostinger.zip`

### Deployment Steps:
1. Log in to your **Hostinger Control Panel (hPanel)**.
2. Navigate to **Websites** → click **Manage** next to `structoraindia.com`.
3. Open **File Manager** (Files → File Manager → access files of your domain).
4. Enter the **`public_html`** directory.
   *(If there is a default `default.php` or placeholder file from Hostinger, delete it).*
5. Click **Upload** (top right icon) → select `structora-hostinger.zip`.
6. Right-click `structora-hostinger.zip` in File Manager and click **Extract**.
   - Make sure files extract directly into `public_html`.
   - Your `public_html` should contain `index.html`, `404.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, and directories like `_next`, `projects`, `blogs`, `services`, `pricing`, `about`, `contact`, and `studio`.
7. Test the live site at `https://structoraindia.com`.

---

## 5. Workflow for Future Updates

Whenever you make code or design updates in the codebase:

```powershell
# 1. Compile the static export
npm run build

# 2. Package the out folder into a zip
powershell -Command "Compress-Archive -Path 'out\*' -DestinationPath '..\structora-hostinger.zip' -Force"

# 3. Upload and extract structora-hostinger.zip into public_html in Hostinger File Manager
```

> [!NOTE]
> **Client Content Updates (No Re-upload Needed):**  
> When the client adds photos, updates project details, or creates new projects in Sanity Studio, the client-side hydration automatically queries Sanity CDN and updates the project cards live for all website visitors.
