# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Academic portfolio website for Fabio Bacchini (astrophysicist, KU Leuven / BIRA-IASB). Dark-themed, space-inspired design with plasma particle animations.

## Commands

- `npm run dev` — start dev server at localhost:4321
- `npm run build` — build static site to `./dist/`
- `npm run preview` — preview production build locally

No test runner or linter is configured.

## Tech Stack

- **Astro 5.x** — static site generation with Islands Architecture
- **Tailwind CSS v4** — via Vite plugin (not the Astro integration)
- **React 19** — used only for interactive islands (Three.js hero, publication filter)
- **Three.js / React Three Fiber** — 3D particle animation in hero section
- **GSAP** — scroll-triggered animations across all pages
- **TypeScript** — strict mode, with path aliases (`@components/*`, `@layouts/*`, `@utils/*`, `@styles/*`, `@content/*`)

## Architecture

### Pages & Layout

All pages use `BaseLayout.astro` which provides the HTML shell, SEO head, global header/footer, scroll animations, and Vercel analytics. Four pages: Home (`/`), Research (`/research`), Publications (`/publications`), Contact (`/contact`).

### Component Organization

Components are grouped by page context under `src/components/`:
- `global/` — shared UI: Header, Footer, SEOHead, PageHero, SectionHeading, Badge, Button, QuoteSection, ScrollAnimations, Lightbox
- `home/` — HeroSection, BioSection, PaperHighlights, LatestNews
- `research/` — AboutMe, ResearchCard (accordion), TeamGrid, TeamCard, FormerMembers
- `publications/` — PublicationList, PublicationCard, YearDivider
- `contact/` — ContactInfo, LocationCard
- `interactive/` — React islands: `HeroAnimation.tsx` (Three.js particles), `PublicationFilter.tsx` (year/type filter)

### Content Collections

Structured content lives in `src/content/` with schemas defined in `src/content.config.ts`:
- `publications/` — YAML files, one per paper, numbered sequentially (e.g., `01-bacchini-2015-cme-shocks.yaml`)
- `news/` — Markdown files with frontmatter, named by date (e.g., `2025-08-summer-of-science.md`)
- `research/` — Markdown files, one per research project
- `team/` — Markdown files, one per team member

### Styling

- Global CSS variables and font-face declarations in `src/styles/global.css`
- Dark space theme with CSS custom properties (`--bg-deep`, `--accent-cyan`, `--accent-violet`, etc.)
- Fonts: Space Grotesk (headings), Inter (body) — self-hosted in `public/fonts/`
- Tailwind v4 configured as a Vite plugin in `astro.config.mjs`, not via `@astrojs/tailwind`

### Key Patterns

- Header is transparent on homepage hero, solid on scroll and on inner pages
- Mobile menu is a full-screen overlay with animated transitions
- GSAP ScrollTrigger animations are centralized in `ScrollAnimations.astro`
- The Three.js hero animation respects `prefers-reduced-motion` with a static gradient fallback
- "Bacchini" is bolded in publication author lists — see `src/utils/formatters.ts`
- View Transitions enabled for smooth page navigation

## Git Commits

- Never include `Co-Authored-By` or any mention of Claude/AI in commit messages

## Deployment

Hosted on Vercel. Production URL: https://fabiobacchini.com. Pushes to `main` trigger automatic deploys.

## Reference Docs

- STRUTTURA.md — detailed page-by-page content spec and implementation checklist
- TECNOLOGIE.md — design tokens, color palette, typography scale, and technical decisions
- SEO.md — SEO audit checklist and fix details
- SEO-WORDS.md — keyword analysis and optimization plan