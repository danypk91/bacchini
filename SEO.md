# SEO Audit — bacchini.vercel.app

> Audit eseguito il 15 marzo 2026 — Score: **7.5/10**

Il sito ha basi solide (componente SEOHead, Open Graph, JSON-LD Person, sitemap, robots.txt). I problemi sono specifici e risolvibili.

---

## Checklist Fix

### Critici

- [x] **Allineare dominio** tra `astro.config.mjs` e `robots.txt`
- [x] **Aggiungere `sameAs`** allo schema Person (Google Scholar, ORCID, ResearchGate, LinkedIn)

### Importanti

- [x] **Migliorare title tag** di tutte le 4 pagine (aggiungere keyword)
- [x] **Creare OG image dedicate** per Research, Publications e Contact
- [x] **Aggiungere `og:site_name` e `og:locale`** in SEOHead
- [x] **Aggiungere schema `ItemList`/`ScholarlyArticle`** nella pagina Publications
- [x] **Aggiungere schema `BreadcrumbList`** nelle pagine interne
- [x] **Aggiungere `aria-label`** al tag `<nav>` in Header
- [x] **Migliorare meta description** della pagina Contact
- [ ] ~~**Passare prop `canonical`** da BaseLayout a SEOHead~~ — saltato, non necessario al momento

### Nice to have

- [x] **Aggiungere `theme-color`** meta tag
- [x] **Aggiungere `apple-touch-icon`** (180x180 PNG)
- [x] **Aggiungere `width`/`height`** all'immagine hero (fix CLS)
- [x] **Linkare il CV PDF** dalla pagina Contact

---

## Dettaglio problemi e proposte di fix

### 1. Mismatch dominio `astro.config.mjs` vs `robots.txt` (CRITICO)

**Problema:** `astro.config.mjs` usa `site: 'https://bacchini.vercel.app'` ma `robots.txt` punta a `https://fabiobacchini.com/sitemap-index.xml`. Google segue il puntatore in robots.txt e non trova la sitemap.

**Fix:** allineare entrambi allo stesso dominio finale.

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://fabiobacchini.com', // oppure bacchini.vercel.app se non c'e custom domain
  ...
});
```

```
# public/robots.txt
User-agent: *
Allow: /

Sitemap: https://fabiobacchini.com/sitemap-index.xml
```

---

### 2. Schema Person senza `sameAs` (CRITICO)

**Problema:** lo schema JSON-LD Person non include link ai profili accademici. Google usa `sameAs` per stabilire l'autorita dell'entita e generare Knowledge Panel.

**Fix:** aggiungere `sameAs`, `knowsAbout` e usare `worksFor` con tipi piu precisi in `SEOHead.astro`:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Fabio Bacchini",
  "url": "https://fabiobacchini.com",
  "image": "https://fabiobacchini.com/images/fabio-bacchini.jpg",
  "jobTitle": "Assistant Professor & Research Scientist",
  "worksFor": [
    {
      "@type": "CollegeOrUniversity",
      "name": "KU Leuven",
      "department": "Centre for mathematical Plasma Astrophysics (CmPA)",
      "url": "https://wis.kuleuven.be/CmPA",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Celestijnenlaan 200B",
        "addressLocality": "Leuven",
        "postalCode": "3001",
        "addressCountry": "BE"
      }
    },
    {
      "@type": "ResearchOrganization",
      "name": "Royal Belgian Institute for Space Aeronomy",
      "alternateName": "BIRA-IASB",
      "url": "https://www.aeronomie.be",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ringlaan 3",
        "addressLocality": "Brussels",
        "postalCode": "1180",
        "addressCountry": "BE"
      }
    }
  ],
  "email": ["fabio.bacchini@kuleuven.be", "fabio.bacchini@aeronomie.be"],
  "sameAs": [
    "https://scholar.google.com/citations?user=lVDg704AAAAJ",
    "https://orcid.org/0000-0002-7526-8154",
    "https://www.researchgate.net/profile/Fabio-Bacchini",
    "https://github.com/fbacchini",
    "https://www.linkedin.com/in/fabio-bacchini-484766163/"
  ],
  "knowsAbout": [
    "plasma astrophysics",
    "particle-in-cell simulations",
    "high-performance computing",
    "magnetohydrodynamics",
    "magnetic reconnection",
    "astrophysical accretion disks"
  ]
}
```

> Nota: `worksFor` e semanticamente piu corretto di `affiliation` per impiego attivo. `CollegeOrUniversity` e `ResearchOrganization` sono sottotipi piu precisi di `Organization`.

---

### 3. Title tag deboli (IMPORTANTE)

**Problema:** tutti i titoli sono sotto i 35 caratteri e non sfruttano lo spazio disponibile (~60 chars) per keyword rilevanti.

**Fix proposto:**

| Pagina | Attuale | Proposta |
|---|---|---|
| Home | `Fabio Bacchini — Astrophysicist` (33 chars) | `Fabio Bacchini — Astrophysicist at KU Leuven` (45 chars) |
| Research | `Research — Fabio Bacchini` (26 chars) | `Plasma Astrophysics Research — Fabio Bacchini` (46 chars) |
| Publications | `Publications — Fabio Bacchini` (30 chars) | `Publications — Fabio Bacchini, Astrophysicist` (45 chars) |
| Contact | `Contact — Fabio Bacchini` (25 chars) | `Contact — Fabio Bacchini | KU Leuven & BIRA-IASB` (48 chars) |

Modificare il prop `title` passato a `<BaseLayout>` in ogni file pagina.

---

### 4. OG image unica per tutte le pagine (IMPORTANTE)

**Problema:** tutte le pagine usano `/images/og/default.png`. Quando qualcuno condivide Research o Publications su LinkedIn/Twitter, appaiono identiche.

**Fix:** creare OG image dedicate (1200x630 px) e passarle esplicitamente:

```astro
<!-- src/pages/research.astro -->
<BaseLayout title="..." description="..." ogImage="/images/og/research.png">

<!-- src/pages/publications.astro -->
<BaseLayout title="..." description="..." ogImage="/images/og/publications.png">
```

Si puo usare lo script `scripts/generate-og.mjs` gia presente nel progetto per generarle.

---

### 5. Meta tag Open Graph mancanti (IMPORTANTE)

**Problema:** mancano `og:site_name` e `og:locale` nel componente SEOHead.

**Fix:** aggiungere in `src/components/global/SEOHead.astro`:

```html
<meta property="og:site_name" content="Fabio Bacchini" />
<meta property="og:locale" content="en_US" />
```

---

### 6. Schema `ItemList`/`ScholarlyArticle` mancante su Publications (IMPORTANTE)

**Problema:** 46+ paper peer-reviewed senza dati strutturati. Google Scholar e Google Search non vedono i paper come entita strutturate.

**Fix:** aggiungere in `src/pages/publications.astro`:

```astro
---
const highlightedPubs = allPubs
  .filter(p => p.data.fabio_position === 'first')
  .sort((a, b) => b.data.year - a.data.year)
  .slice(0, 10);
---

<script type="application/ld+json" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Publications by Fabio Bacchini",
  "description": "Peer-reviewed publications in astrophysics, plasma physics, and computational methods",
  "numberOfItems": totalCount,
  "itemListElement": highlightedPubs.map((pub, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "item": {
      "@type": "ScholarlyArticle",
      "name": pub.data.title,
      "author": pub.data.authors,
      "datePublished": String(pub.data.year),
      "isPartOf": {
        "@type": "Periodical",
        "name": pub.data.journal
      },
      ...(pub.data.doi ? { "identifier": `https://doi.org/${pub.data.doi}` } : {}),
      ...(pub.data.arxiv ? { "url": `https://arxiv.org/abs/${pub.data.arxiv}` } : {})
    }
  }))
})} />
```

---

### 7. Schema `BreadcrumbList` mancante su pagine interne (IMPORTANTE)

**Problema:** le pagine interne non hanno breadcrumb strutturati. Google li usa per mostrare percorsi di navigazione nei risultati.

**Fix:** esporre uno slot `head` in `BaseLayout.astro` e aggiungere il JSON-LD in ogni pagina interna:

```astro
<!-- src/layouts/BaseLayout.astro — dentro <head>, dopo <SEOHead /> -->
<slot name="head" />
```

```astro
<!-- Esempio per src/pages/research.astro -->
<script type="application/ld+json" slot="head" set:html={JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://fabiobacchini.com/" },
    { "@type": "ListItem", "position": 2, "name": "Research", "item": "https://fabiobacchini.com/research/" }
  ]
})} />
```

Ripetere per `/publications` e `/contact`.

---

### 8. `<nav>` senza `aria-label` (IMPORTANTE)

**Problema:** il tag `<nav>` in Header.astro non ha `aria-label`. Penalizza accessibilita e crawling semantico.

**Fix:** in `src/components/global/Header.astro`:

```astro
<nav aria-label="Main navigation" class="...">
```

---

### 9. Meta description debole su Contact (IMPORTANTE)

**Problema:** troppo corta e senza keyword rilevanti.

**Fix:**

```
Attuale:  "Contact Fabio Bacchini — KU Leuven and BIRA-IASB office addresses, email, and academic profiles."
Proposta: "Contact Fabio Bacchini, astrophysicist at KU Leuven and BIRA-IASB. Office addresses in Leuven and Brussels, email, Google Scholar, ORCID, and ResearchGate profiles."
```

---

### 10. Prop `canonical` non esposta da BaseLayout (IMPORTANTE)

**Problema:** SEOHead supporta `canonical` ma BaseLayout non lo inoltra. Utile per contenuti sindacati.

**Fix:** in `src/layouts/BaseLayout.astro`:

```astro
interface Props {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;  // aggiungere
}

const { title, description, ogImage, canonical } = Astro.props;

<SEOHead title={title} description={description} ogImage={ogImage} canonical={canonical} />
```

---

### 11. `theme-color` mancante (NICE TO HAVE)

**Fix:** aggiungere in SEOHead:

```html
<meta name="theme-color" content="#0a0a0f" />
```

---

### 12. `apple-touch-icon` mancante (NICE TO HAVE)

**Fix:** creare `public/apple-touch-icon.png` (180x180) e aggiungere:

```html
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

---

### 13. Immagine hero senza `width`/`height` (NICE TO HAVE)

**Problema:** causa CLS (Cumulative Layout Shift) prima del caricamento.

**Fix:** in `src/components/home/HeroSection.astro`:

```astro
<img
  src="/images/hero-simulation.png"
  alt=""
  width="1920"
  height="1080"
  class="h-full w-full object-cover"
  loading="eager"
  fetchpriority="high"
/>
```

---

### 14. CV PDF non linkato da Contact (NICE TO HAVE)

**Fix:** aggiungere link esplicito in `src/pages/contact.astro`:

```html
<a href="/cv-bacchini.pdf" target="_blank" rel="noopener">
  Download Curriculum Vitae (PDF)
</a>
```

---

## Keyword target principali

| Query target | Copertura attuale |
|---|---|
| `Fabio Bacchini astrophysicist` | Buona (H1 + schema) |
| `plasma astrophysics KU Leuven` | Debole — aggiungere in heading o sottotitolo di Research |
| `particle-in-cell plasma simulations` | Solo in descrizioni, non in heading |
| `astrophysical plasma simulation researcher Belgium` | Zero copertura |

---

## Note tecniche

- Verificare che il contenuto dentro `ResearchCard` (accordion) sia renderizzato nel DOM server-side e non nascosto solo via JS. Il contenuto deve esistere nell'HTML statico per essere indicizzato.
- Verificare che `SectionHeading` renda un vero `<h2>` e non un `<div>`, per la gerarchia heading.
- Le pubblicazioni sulla pagina Publications beneficerebbero di heading semantici per anno (`<h2>2025</h2>`, `<h2>2024</h2>`) per indicizzazione a sezioni.