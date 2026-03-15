---
name: bacchini-portfolio-project
description: SEO audit for Fabio Bacchini academic portfolio (astrophysics). Astro/Vercel site, 4 pages: /, /research, /publications, /contact.
type: project
---

Academic portfolio for Fabio Bacchini, Assistant Professor at KU Leuven (CmPA) and Research Scientist at BIRA-IASB.

**Why:** SEO audit requested March 2026.
**How to apply:** When making SEO changes to this project, reference the issues found in the audit: domain mismatch (site config says bacchini.vercel.app but robots.txt references fabiobacchini.com), missing per-page OG images, no page-specific structured data for Research/Publications/Contact, Person schema lacks sameAs array of academic profiles.

Key findings:
- `astro.config.mjs` `site` field = `https://bacchini.vercel.app` (needs updating to final domain, likely fabiobacchini.com)
- `robots.txt` Sitemap line references `https://fabiobacchini.com/sitemap-index.xml` — domain mismatch with site config
- `@astrojs/sitemap` is installed and configured — sitemap IS auto-generated at build time
- All 4 pages have title + description + OG tags — but all pages share the same default OG image (`/images/og/default.png`)
- Person schema in SEOHead.astro does not include `sameAs` for Google Scholar, ORCID, ResearchGate
- No ScholarlyArticle or WebPage structured data on Publications or Research pages
- Hero section logo image has empty alt="" (decorative — acceptable) but hero background image also has empty alt (correct, decorative)
- `<nav>` in Header.astro lacks `aria-label` attribute
- BaseLayout does not pass `canonical` to SEOHead — canonical URL always falls back to Astro.url.href (fine, but explicit control not exposed)
- All meta descriptions are within acceptable character limits
- Title tag logic correctly differentiates Home vs inner pages
