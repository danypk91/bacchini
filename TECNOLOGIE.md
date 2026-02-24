# Tecnologie, Stili e Architettura

> Sito portfolio accademico per Fabio Bacchini — Astrofisico, KU Leuven / BIRA-IASB

---

## 1. Framework e Build

### Astro.js (v5.x)

- **Perché**: Static Site Generation (SSG) con performance eccellenti, View Transitions native, Islands Architecture per interattività selettiva
- **Rendering**: output 100% statico dove possibile, idratazione solo per componenti interattivi (Three.js, filtri pubblicazioni)
- **Content Collections**: per gestire pubblicazioni, news, membri del team in modo strutturato (markdown + frontmatter YAML)
- **View Transitions**: navigazione fluida tra pagine senza reload, con animazioni di transizione personalizzate

### Checklist Setup

- [ ] Inizializzare progetto con `npm create astro@latest`
- [ ] Configurare `astro.config.mjs` con `output: 'static'`
- [ ] Abilitare View Transitions (`astro:transitions`)
- [ ] Configurare Content Collections in `src/content/`
- [ ] Configurare path aliases in `tsconfig.json` (`@components`, `@layouts`, ecc.)
- [ ] Setup TypeScript strict mode

---

## 2. Styling

### Tailwind CSS v4

- **Perché**: utility-first, design system consistente, ottimo supporto dark theme, purging automatico per bundle minimale
- **Configurazione**: tema custom con palette astrofisica

### Design Tokens / Palette Colori

```
Colori primari (dark space theme):
  --bg-deep:        #0a0a0f      (sfondo principale, quasi nero)
  --bg-surface:     #12121a      (card, sezioni alternate)
  --bg-elevated:    #1a1a2e      (elementi in rilievo)

Colori accento (plasma/nebula):
  --accent-cyan:    #00d4ff      (link, highlight primario)
  --accent-violet:  #7c3aed      (badge, accenti secondari)
  --accent-orange:  #ff6b35      (CTA, elementi importanti)
  --accent-pink:    #ec4899      (hover states, gradienti)

Colori testo:
  --text-primary:   #e2e8f0      (testo principale, alta leggibilita)
  --text-secondary: #94a3b8      (testo secondario, descrizioni)
  --text-muted:     #64748b      (metadati, date)

Gradienti:
  --gradient-hero:   linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)
  --gradient-accent:  linear-gradient(90deg, #00d4ff, #7c3aed)
  --gradient-card:   linear-gradient(180deg, #12121a 0%, #1a1a2e 100%)
  --gradient-glow:   radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)
```

### Tipografia

```
Font heading:  "Space Grotesk" (Google Fonts)
  - Geometrico, moderno, richiama il tema spaziale nel nome e nello stile
  - Pesi: 500 (subheading), 700 (heading)

Font body:     "Inter" (Google Fonts)
  - Eccellente leggibilita su schermo, pulito e professionale
  - Pesi: 400 (body), 500 (emphasis), 600 (bold)

Font mono:     "JetBrains Mono" (per eventuale codice/formule)

Scale tipografica (desktop):
  h1:  3.5rem / 1.1   (hero title)
  h2:  2.25rem / 1.2   (section title)
  h3:  1.5rem / 1.3    (card title)
  h4:  1.125rem / 1.4  (subtitle)
  body: 1rem / 1.7     (testo)
  small: 0.875rem / 1.5 (caption, metadata)
```

### Spacing e Layout

```
Max width contenuto:  1200px (centrato)
Padding sezioni:      py-24 (6rem) desktop, py-16 mobile
Gap griglia team:     gap-8
Border radius:        rounded-xl (card), rounded-2xl (hero elements)
```

### Checklist Styling

- [ ] Installare e configurare Tailwind CSS v4
- [ ] Definire palette custom nel config
- [ ] Importare font da Google Fonts (Space Grotesk, Inter)
- [ ] Creare CSS custom properties per i colori
- [ ] Definire componenti base riutilizzabili (card, badge, button)
- [ ] Testare contrasto colori (WCAG AA minimo)
- [ ] Setup responsive breakpoints (mobile-first)

---

## 3. Animazioni e Interattivita

### Three.js (hero background)

- **Cosa**: scena 3D con particelle che simulano un campo di plasma/magnetico
- **Implementazione**: Island React/Preact caricato solo nell'hero della homepage
- **Performance**: `requestAnimationFrame` con throttle, rispetto `prefers-reduced-motion`, lazy loading
- **Fallback**: gradient statico per dispositivi lenti o reduced-motion

#### Concept Hero Animation

```
Opzione A — "Particle Field"
  Migliaia di particelle che si muovono lungo linee di campo magnetico
  Colori: gradiente cyan -> viola
  Interazione: le particelle reagiscono leggermente al mouse
  Effetto: simula visivamente una simulazione PIC (Particle-in-Cell)

Opzione B — "Plasma Vortex"
  Struttura a vortice con particelle che spiraleggiano
  Richiama la turbolenza magnetorotationale (tema centrale della ricerca)
  Piu cinematico ma piu pesante

Opzione C — "Star Field + Magnetic Lines"
  Campo stellare con parallax + linee di forza magnetica animate
  Piu leggero, elegante, meno CPU-intensive

Raccomandazione: Opzione A (Particle Field) — bilancio perfetto tra impatto visivo,
pertinenza scientifica e performance
```

### GSAP (ScrollTrigger)

- **Cosa**: animazioni al scroll per far apparire sezioni, card, timeline
- **Perché GSAP vs Framer Motion**: piu leggero, non richiede React ovunque, ScrollTrigger e il gold standard per scroll animations
- **Pattern**: fade-in + slide-up per sezioni, stagger per liste/grid

### tsParticles (alternativa leggera a Three.js)

- **Valutare come alternativa** se Three.js risulta troppo pesante
- Meno flessibile ma significativamente piu leggero
- Buono per background particellare semplice

### Checklist Animazioni

- [ ] Scegliere tra Three.js e tsParticles per hero (prototipare entrambi)
- [ ] Creare componente hero animation come Astro Island
- [ ] Implementare lazy loading per il componente 3D
- [ ] Installare GSAP + ScrollTrigger
- [ ] Definire animazioni scroll per sezioni (fade-in, slide-up)
- [ ] Definire animazioni stagger per grid (team, publications)
- [ ] Implementare rispetto `prefers-reduced-motion`
- [ ] Testare performance su mobile (target: 60fps o graceful degradation)
- [ ] Aggiungere View Transitions tra le pagine

---

## 4. Gestione Contenuti

### Content Collections di Astro

```
src/content/
  config.ts                  (schema Zod per validazione)

  publications/
    2026.yaml                (una entry per paper)
    2025.yaml
    2024.yaml
    ...

  news/
    2026-02-eurocc.md        (una entry per news)
    2025-10-fwo-phd.md
    ...

  team/
    daniel-groselj.md        (bio + foto + ruolo)
    nicolas-moens.md
    ...

  research/
    solar-heliospheric.md    (descrizione progetto)
    compact-objects.md
    ...
```

#### Schema Pubblicazione (esempio)

```yaml
# src/content/publications/2026.yaml
- title: "Particle-in-Cell Methods for Simulations of Sheared, Expanding, or Escaping Astrophysical Plasma"
  authors: "Bacchini, F., Gorbunov, E.A., ..."
  year: 2026
  journal: "PPCF"
  status: "submitted"           # submitted | accepted | published
  doi: null
  arxiv: "2602.15939"
  highlight: false              # true per PRL Editor's Suggestion ecc.
  highlight_label: null         # "PRL Editor's Suggestion" | "Highlighted in AAS NOVA"
  fabio_position: "first"       # first | co-first | contributing
```

#### Schema Team Member (esempio)

```yaml
---
name: "Daniel Groselj"
title: "Dr."
role: "FWO Postdoctoral Fellow"
photo: "daniel-groselj.jpg"
status: "current"               # current | former
former_info: null               # "now at UMD"
order: 1
---
Breve bio opzionale in markdown.
```

### Checklist Contenuti

- [ ] Definire schema Zod per publications
- [ ] Definire schema Zod per news
- [ ] Definire schema Zod per team members
- [ ] Definire schema Zod per research projects
- [ ] Migrare tutte le pubblicazioni in YAML (per anno)
- [ ] Migrare tutte le news in markdown
- [ ] Migrare tutti i membri del team in markdown
- [ ] Migrare descrizioni progetti di ricerca
- [ ] Raccogliere/ottimizzare foto team (WebP, dimensioni consistenti)
- [ ] Raccogliere foto profilo Fabio (hero + about)

---

## 5. Componenti UI Chiave

### Componenti Astro (statici)

| Componente | Descrizione |
|---|---|
| `Header.astro` | Navbar fixed, trasparente su hero, solid su scroll. Logo + nav links + hamburger mobile |
| `Footer.astro` | Loghi KU Leuven + BIRA, citazione Einstein, link rapidi |
| `HeroSection.astro` | Container per hero con overlay gradient + titolo + CTA |
| `SectionHeading.astro` | Titolo sezione con linea decorativa accent |
| `PublicationCard.astro` | Card pubblicazione: titolo, autori, journal, badge, link DOI/arXiv |
| `NewsItem.astro` | Item timeline con data, titolo, descrizione |
| `TeamCard.astro` | Card membro team: foto circolare, nome, ruolo |
| `ResearchCard.astro` | Card progetto di ricerca espandibile (accordion) |
| `ContactInfo.astro` | Blocco info contatto con icone |
| `Badge.astro` | Badge riutilizzabile (status pubblicazione, highlight) |
| `Button.astro` | Bottone con varianti (primary, secondary, ghost) |

### Componenti Interattivi (Islands)

| Componente | Framework | Descrizione |
|---|---|---|
| `HeroAnimation` | React + Three.js | Scena 3D particelle nell'hero |
| `PublicationFilter` | React/Preact | Filtro pubblicazioni per anno/tipo |

### Checklist Componenti

- [ ] Creare componente `BaseLayout.astro` con Head, Header, Footer
- [ ] Creare `Header.astro` con navigazione responsive
- [ ] Creare `Footer.astro`
- [ ] Creare `HeroSection.astro`
- [ ] Creare `SectionHeading.astro`
- [ ] Creare `PublicationCard.astro`
- [ ] Creare `NewsItem.astro`
- [ ] Creare `TeamCard.astro`
- [ ] Creare `ResearchCard.astro`
- [ ] Creare `ContactInfo.astro`
- [ ] Creare `Badge.astro` e `Button.astro`
- [ ] Creare `HeroAnimation` (Island Three.js/React)
- [ ] Creare `PublicationFilter` (Island React/Preact)

---

## 6. Performance e Ottimizzazione

### Target

```
Lighthouse Score Target:
  Performance:    95+
  Accessibility:  95+
  Best Practices: 100
  SEO:            100

Core Web Vitals:
  LCP:  < 1.5s
  FID:  < 50ms
  CLS:  < 0.05
```

### Strategie

- **Immagini**: formato WebP/AVIF, lazy loading nativo, `astro:assets` per ottimizzazione automatica, responsive `srcset`
- **Font**: `font-display: swap`, preload per font critici, subset solo caratteri usati
- **Three.js**: dynamic import, solo su homepage, intersection observer per attivare/disattivare
- **CSS**: Tailwind purge automatico, critical CSS inline
- **JS**: bundle splitting automatico di Astro, zero JS dove non serve

### Checklist Performance

- [ ] Configurare `astro:assets` per ottimizzazione immagini
- [ ] Implementare lazy loading immagini team
- [ ] Ottimizzare caricamento font (preload + swap)
- [ ] Verificare bundle size Three.js (tree-shaking)
- [ ] Testare Lighthouse su tutte le pagine
- [ ] Testare su connessione 3G simulata
- [ ] Verificare CLS (nessun layout shift)

---

## 7. SEO e Meta

### Strategia

- **Meta tags**: titolo, descrizione, Open Graph, Twitter Card per ogni pagina
- **Schema.org**: JSON-LD per `Person` (Fabio), `ScholarlyArticle` (pubblicazioni)
- **Sitemap**: generato automaticamente da `@astrojs/sitemap`
- **robots.txt**: permetti tutto

### Checklist SEO

- [ ] Installare `@astrojs/sitemap`
- [ ] Creare componente `SEOHead.astro` con meta dinamici
- [ ] Aggiungere Schema.org JSON-LD per Person
- [ ] Aggiungere Open Graph image (design coerente con il sito)
- [ ] Configurare `robots.txt`
- [ ] Verificare rendering meta su social preview

---

## 8. Hosting e Deploy

### Opzione raccomandata: Netlify (o Vercel)

- **Gratuito** per siti statici
- Deploy automatico da GitHub (push su main = deploy)
- Preview deploy per branch/PR
- HTTPS automatico
- Custom domain facile da configurare

### Alternativa: GitHub Pages

- Completamente gratuito
- Meno features (no preview deploy, no functions)
- Sufficiente per un sito statico puro

### Checklist Deploy

- [ ] Creare repository GitHub
- [ ] Collegare a Netlify/Vercel
- [ ] Configurare build command (`astro build`)
- [ ] Configurare custom domain (se disponibile)
- [ ] Verificare HTTPS
- [ ] Testare deploy pipeline (push -> build -> live)

---

## 9. Accessibilita (a11y)

### Standard

- WCAG 2.1 AA minimo
- Navigazione completa da tastiera
- Screen reader friendly
- Contrasto colori verificato (specialmente su dark theme)
- `prefers-reduced-motion` rispettato ovunque
- `prefers-color-scheme` — solo dark? O anche light mode?

### Checklist Accessibilita

- [ ] Verificare contrasto testo su tutti gli sfondi
- [ ] Testare navigazione da tastiera
- [ ] Aggiungere `aria-label` dove necessario
- [ ] Verificare alt text su tutte le immagini
- [ ] Testare con screen reader (VoiceOver)
- [ ] Implementare skip-to-content link
- [ ] Verificare focus states visibili

---

## 10. Dipendenze Principali

```json
{
  "dependencies": {
    "astro": "^5.x",
    "@astrojs/tailwind": "^5.x",
    "@astrojs/react": "^4.x",
    "@astrojs/sitemap": "^3.x",
    "react": "^19.x",
    "react-dom": "^19.x",
    "three": "^0.172.x",
    "@react-three/fiber": "^9.x",
    "@react-three/drei": "^10.x",
    "gsap": "^3.12.x"
  },
  "devDependencies": {
    "tailwindcss": "^4.x",
    "typescript": "^5.x",
    "@types/three": "^0.172.x",
    "prettier": "^3.x",
    "prettier-plugin-astro": "^0.x"
  }
}
```

### Checklist Dipendenze

- [ ] Installare tutte le dipendenze
- [ ] Verificare compatibilita versioni
- [ ] Configurare prettier + plugin astro
- [ ] Configurare `.gitignore` appropriato
