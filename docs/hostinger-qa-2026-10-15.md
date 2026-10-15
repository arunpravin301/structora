# Hostinger migration QA — 15 October 2026

## Scope and status

Reviewed the two supplied migration documents against the local source. Preserved the static Hostinger architecture and new Sanity fields. No hosting changes, CMS mutations, deployments, or account changes were made in this pass.

The owner confirmed the earlier synthetic test arrived in both Formspree and email. This confirms that earlier delivery, not a new end-to-end test of the migrated static site.

## Fixes in this pass

- Adapted tests to the browser-to-Formspree implementation, retaining acceptance/rejection checks.
- Restored client validation and normalization, consent checks, and Formspree's named honeypot field.
- Prevented live project cards linking to detail routes absent from the build; retained gallery access.
- Corrected live project totals and allowed an empty CMS result to remove stale cards.
- Made repeated and non-Latin blog heading anchors distinct using Sanity block keys.
- Replaced untyped blog helpers and marked Studio explicitly noindex.
- Replaced the obsolete WordPress/Vercel README and environment example.
- Added checks for generated pages, metadata, Studio indexing, and sitemap file targets.

## Remaining launch checks

1. Rebuild/upload after CMS changes. Live cards do not regenerate HTML detail pages, article routes, metadata, or sitemap. No automatic publishing pipeline is installed.
2. Test the actual Hostinger upload: HTTPS, www-to-primary redirect, /journal redirects, direct deep links, a genuinely unknown URL returning HTTP 404, Studio nested URLs, and static asset cache headers. Local file checks cannot validate Apache behavior.
3. Repeat a labelled enquiry from the deployed domain and confirm dashboard plus inbox delivery. Browser validation can be bypassed; provider spam controls are essential.
4. Review the existing .htaccess: HTTPS currently preserves the request host rather than enforcing the final non-www domain; Studio nested routes lack an explicit SPA fallback; unchanged image filenames have long cache lifetimes. These host-dependent changes remain unverified.
5. Audit dependencies before launch. The fresh npm audit reports 24 advisory entries (12 high, 12 moderate, zero critical). This does not establish that all are exploitable in the deployed static site; dependency reachability and safe updates still need assessment.
6. Keep a recoverable backup before replacing hosting files. Remove obsolete HTML routes deliberately when content is unpublished; an overlay upload does not remove them.
7. Verify public business details, pricing, warranties, project permissions and privacy wording with the client.
8. Measure mobile performance and accessibility on the deployed site. No fresh Lighthouse/Core Web Vitals or full visual regression score is claimed.

## SEO / AI search assessment

Technical foundations exist: generated HTML, titles/descriptions, canonical URLs, sitemap, business entities for two offices, breadcrumbs and article markup. Indexing must be enabled at build time for the final domain.

The largest content opportunities are original project case studies, verified engineering expertise, specific location/service information, meaningful image captions, and useful cost/approval explanations. No numeric SEO score or AI visibility guarantee is justified by this code review.

The supplied documents incorrectly promise FAQ-rich-result/People Also Ask eligibility. Google reports FAQ rich results were retired in May 2026. Visible FAQs can still help readers; markup does not guarantee rankings or AI citations. Title/description character warnings are editorial guidance, not guaranteed display limits.

Sources:
- [Next.js static export limitations](https://nextjs.org/docs/app/guides/static-exports)
- [Google Search documentation updates](https://developers.google.com/search/updates)
- [Google AI optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

## Verification record

17 automated tests, lint, and the final production static build passed. Generated-file checks passed for eight public pages, canonical metadata, descriptions, two-office schema, Studio noindex, and sitemap file targets. Do not treat an older ZIP as containing these changes.

The export also emits HTML for disabled portal routes (admin/dashboard/login). A static host may return HTTP 200 for these not-found-looking files; configure explicit HTTP 404 behavior and verify it on Hostinger. This was not covered by the generated-file pass. No fresh full browser visual QA was performed in this migration pass.
