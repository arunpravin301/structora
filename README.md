# Structora India website

Next.js static export for Hostinger; Sanity manages projects and articles. The production domain is https://structoraindia.com.

## Local development and verification

- Install locked dependencies with `npm ci`.
- Use `npm run dev` for development.
- Run `npm test`, `npm run lint`, and `npm run build`.
- Run `node tests/static-export.smoke.mjs` after building.
- Upload only the contents of `out/`, including hidden `.htaccess`. Never upload source, .env files, node_modules, or api-backup.
- `next start` is not a static-export preview server. Preview `out/` using a static file server; Apache-specific behavior requires Hostinger testing.

## Publishing content

The project listing refreshes from Sanity in the browser. Newly published projects can appear with photographs, but their titles do not link until a detail page exists in the build. Deleted projects disappear from the refreshed list, but previously uploaded detail files remain until removed during a controlled deployment.

**Rebuild and upload after publishing, changing slugs, editing detail pages, or publishing articles.** Homepage content, article pages, project detail pages, metadata, and sitemap are build-time snapshots. A static export does not support ISR or the old revalidation API. Automated build/upload on publish is not configured.

## Forms

Forms submit directly to the approved Formspree endpoint. No private API key is needed in the browser. Browser validation is not a security boundary; maintain spam filtering and restrictions in the client-owned Formspree account.

The owner confirmed a previous QA enquiry reached both Formspree and email. Repeat one clearly labelled test from the deployed Hostinger domain to verify the migrated browser submission path.

## Search indexing

`PUBLIC_INDEXING_ENABLED=true` must be set **when building** a production upload. Otherwise pages are intentionally noindex. Environment changes in hPanel do not alter already generated HTML. Build preview copies with indexing disabled. Do not publish an indexable production artifact on a publicly accessible preview domain without host-level noindex controls.

See [Hostinger QA handover](docs/hostinger-qa-2026-10-15.md) for known limits and launch checks.
