# Sanity Studio — Changes & Features Changelog

This document provides a comprehensive record of all changes, schema updates, field removals, and new features introduced in **Sanity Studio** and the **Sanity Dataset (`rhtfv6bc`)** for Structora India.

---

## 1. Organization & Project Structure

* **Organization Transfer:**  
  * The Sanity project was transferred from the developer's personal/agency organization to a newly created client organization named **"Structora India"**.
  * **Result:** Client invitations now only grant access to Structora India's content without exposing or linking agency workspaces.
* **Studio Deployment Model:**  
  * Dual-access support: The client can manage content via **Sanity Cloud** (`https://structora.sanity.studio` / `sanity.io/manage`) or directly through the static-exported studio route at `https://structoraindia.com/studio/`.

---

## 2. Project Schema Updates (`sanity/schemaTypes/projectType.ts`)

### A. Removed Features & Fields
1. **Removed `sitePhoto` (Before / After Option):**
   * **Why:** The client decided against split before/after sliders or dual-photo setups in favor of clean, standard architectural cards.
   * **Action Taken:** Removed the `sitePhoto` field from `projectType.ts`, updated queries in `queries.ts`, restored `coverImage` title to "Cover Image", and purged `sitePhoto` keys from all existing documents in the production dataset.
2. **Removed `crn` (Project Code):**
   * **Why:** Structora does not use internal project reference numbers (e.g., `CRN145310`), and displaying artificial numbers conflicted with the bespoke, anti-AI architectural branding.
   * **Action Taken:** Removed `crn` from `projectType.ts`, removed `{p.crn}` from the frontend card in `ProjectFilters.tsx`, removed `crn` from `projectsQuery`, and ran an automated mutation unsetting `crn` on all 7 project records in the Sanity dataset.

### B. Current Project Fields
| Field Name | Type | Purpose | Frontend Display |
| :--- | :--- | :--- | :--- |
| `title` | String | Project / Client Name (e.g. *Balaji Residence*) | Card title & Detail page header |
| `slug` | Slug | Auto-generated URL path from title | Route (`/projects/[slug]`) |
| `status` | String (Radio) | `ongoing` or `completed` | Refined architectural badge (no AI bubble pills) |
| `location` | String | City / District (e.g. *Kumbakonam*, *Kovilpatti*) | Location pin indicator |
| `client` | String | Optional client name | Project metadata |
| `coverImage` | Image (Hotspot) | Primary high-res thumbnail | 16:10 aspect ratio card thumbnail |
| `builtUp` | Number | Built-up area in square feet | Metric column 1 (*"Built-up"*) |
| `plotSize` | String | Plot dimensions or area (e.g. *40X60*) | Metric column 2 (*"Plot"*) |
| `projectValue` | Number | Project value in INR | Metric column 3 (*"Value"*) formatted in Lakhs/Crores |
| `gallery` | Array of Images | Full photo gallery with custom `alt` captions | Full-screen interactive modal & detail gallery |

---

## 3. Blog Schema & SEO Enhancements (`sanity/schemaTypes/blogType.ts`)

To empower the client with enterprise-grade on-page SEO capabilities directly inside Sanity Studio, the blog schema was upgraded with four new architectural fields:

### A. New Fields Added

#### 1. Category / Topic Tag (`category`)
* **Type:** String (Dropdown)
* **Pre-configured Options:**
  * `Cost & Budgeting`
  * `Planning & Approvals`
  * `Material Quality`
  * `Construction & Engineering Tips`
  * `Architecture & Design`
* **Purpose:** Organizes the journal by search intent and renders a topic badge on blog cards and article headers.

#### 2. Table of Contents Toggle (`showToc`)
* **Type:** Boolean (Default: `true`)
* **Purpose:** Controls whether the automatically extracted Table of Contents jump-link card is displayed on the article. For long technical guides, it remains enabled; for short announcements, the client can uncheck it.

#### 3. Estimated Read Time (`readTime`)
* **Type:** String (Optional)
* **Purpose:** Allows manual override (e.g., *"6 min read"*). If left blank, Next.js dynamically calculates the read time based on the body word count (200 words/min).

#### 4. Frequently Asked Questions Repeater (`faqs`)
* **Type:** Array of Objects (`question` [string] + `answer` [text])
* **Purpose:** 
  1. Renders an interactive collapsible FAQ accordion at the end of the blog post.
  2. Automatically generates **`schema.org/FAQPage`** JSON-LD structured data, helping the blog qualify for Google **"People Also Ask"** rich snippets in search results.

#### 5. SEO Meta Fields with Character Limits
* **`seoTitle` (Meta Title):** Character limit warning at 60 characters to prevent Google SERP truncation.
* **`seoDescription` (Meta Description):** Character limit warning at 160 characters to ensure optimal click-through rates.

---

## 4. GROQ Query Updates (`sanity/lib/queries.ts`)

All GROQ queries were updated to reflect the new data contracts:

```groq
// All Projects Query (Cleaned)
*[_type == "project"] | order(_createdAt asc) {
  _id,
  title,
  slug,
  status,
  location,
  client,
  coverImage,
  builtUp,
  plotSize,
  projectValue,
  gallery
}

// Blog Detail Query (With Full SEO & FAQs)
*[_type == "blog" && slug.current == $slug && defined(body) && publishedAt <= now()][0] {
  _id,
  _updatedAt,
  title,
  slug,
  publishedAt,
  mainImage,
  category,
  readTime,
  showToc,
  seoTitle,
  seoDescription,
  faqs,
  body
}
```

---

## 5. Summary of Benefits for the Client

1. **Simpler CMS Workflow:** The client no longer has to guess between uploading a "Site Photo" vs "Cover Image" or enter random project numbers.
2. **Built-in SEO Guardrails:** Real-time character warnings keep titles and descriptions within Google's optimal range.
3. **Zero-Effort Navigation:** Table of Contents is generated automatically from headings without the client typing anchor links.
4. **Instant SERP Visibility:** The FAQ repeater allows non-technical writers to produce structured data that search engines favor for rich cards.
