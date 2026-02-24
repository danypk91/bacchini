# Struttura e Pagine del Sito

> Mappa completa di tutte le pagine, sezioni, componenti e contenuti

---

## Architettura File Progetto

```
bacchini/
  public/
    fonts/
    images/
      team/                    (foto membri team)
      hero/                    (asset hero)
      logos/                   (KU Leuven, BIRA-IASB)
      fabio/                   (foto profilo Fabio)
      og/                      (Open Graph images)
    favicon.svg
    robots.txt

  src/
    layouts/
      BaseLayout.astro         (HTML shell + Head + Header + Footer)

    pages/
      index.astro              (Home)
      research.astro           (Research)
      publications.astro       (Publications)
      contact.astro            (Contact)

    components/
      global/
        Header.astro
        Footer.astro
        SEOHead.astro
        SectionHeading.astro
        Badge.astro
        Button.astro

      home/
        HeroSection.astro
        BioSection.astro
        PaperHighlights.astro
        LatestNews.astro
        QuoteSection.astro

      research/
        AboutMe.astro
        ResearchCard.astro
        TeamGrid.astro
        TeamCard.astro
        FormerMembers.astro

      publications/
        PublicationList.astro
        PublicationCard.astro
        YearDivider.astro

      contact/
        ContactInfo.astro
        LocationCard.astro

      interactive/              (Islands - React)
        HeroAnimation.tsx       (Three.js particle field)
        PublicationFilter.tsx   (filtro anno/tipo)

    content/
      config.ts

      publications/
        2015.yaml
        2016.yaml
        2017.yaml
        2018.yaml
        2019.yaml
        2020.yaml
        2021.yaml
        2022.yaml
        2023.yaml
        2024.yaml
        2025.yaml
        2026.yaml

      news/
        (un file .md per ogni news item)

      team/
        (un file .md per ogni membro)

      research/
        (un file .md per ogni progetto)

    styles/
      global.css               (variabili CSS, font-face, reset)

    utils/
      formatters.ts            (formattazione autori, DOI links, ecc.)

  astro.config.mjs
  tailwind.config.ts
  tsconfig.json
  package.json
```

---

## PAGINA 1: HOME (`/`)

La homepage e il biglietto da visita. Deve comunicare immediatamente chi e Fabio e l'impatto del suo lavoro, con un forte effetto visivo.

---

### Sezione 1.1: Hero

**Impatto visivo massimo — prima cosa che si vede**

```
Layout:
  [Background: animazione 3D particelle plasma (Three.js Island)]
  [Overlay: gradient scuro per leggibilita]

  [Centro-sinistra:]
    FABIO BACCHINI                              (h1, Space Grotesk 700, grande)
    Assistant Professor & Research Scientist     (h2, Inter 400, text-secondary)
    KU Leuven | BIRA-IASB                       (span, text-muted, con loghi piccoli)

    [CTA buttons:]
      [Explore Research ->]   (primary, accent-cyan)
      [Publications]          (ghost/outline)

  [Destra o sotto (responsive):]
    Foto Fabio con bordo glow circolare          (opzionale, valutare)
```

**Note design:**
- L'animazione 3D deve essere sottile, non distrarre dal testo
- Su mobile l'animazione si semplifica o diventa gradient statico
- Altezza hero: 100vh (o 90vh con hint di scroll)
- Scroll indicator animato in basso (freccia/chevron che pulsa)

#### Checklist Hero

- [ ] Layout HTML hero section
- [ ] Stile titolo + sottotitolo + affiliazioni
- [ ] Bottoni CTA con stili hover
- [ ] Scroll indicator animato
- [ ] Integrazione Three.js Island (animazione particelle)
- [ ] Fallback gradient per reduced-motion / mobile lento
- [ ] Responsive: adattamento mobile (stack verticale)
- [ ] Foto Fabio con glow effect (decidere se includerla)

---

### Sezione 1.2: Bio / Chi Sono

**Breve introduzione personale con tono accademico ma accessibile**

```
Layout:
  [SectionHeading: "About"]

  [Grid 2 colonne (desktop) / stack (mobile):]

    [Colonna sinistra — Testo:]
      Paragrafo bio (quello attuale, leggermente rielaborato)
      "Since 2022, I am an Assistant Professor at the Centre for
       mathematical Plasma Astrophysics (CmPA) of KU Leuven..."

      Link inline a CmPA e BIRA-IASB

    [Colonna destra — Visual:]
      Foto Fabio (se non usata nell'hero)
      OPPURE
      Immagine/illustrazione di una simulazione plasma
      OPPURE
      Stats rapide animate:
        "80+ Publications"
        "15+ Team Members"
        "6+ PRL Papers"
```

**Animazione:** fade-in + slide-up al scroll (GSAP ScrollTrigger)

#### Checklist Bio

- [ ] Testo bio (confermare con Fabio o usare attuale)
- [ ] Layout 2 colonne responsive
- [ ] Elemento visivo colonna destra (foto o stats)
- [ ] Se stats: animazione contatore (count-up)
- [ ] Animazione scroll entrance
- [ ] Link a istituzioni con hover accent

---

### Sezione 1.3: Paper Highlights

**Vetrina dei paper piu importanti/recenti**

```
Layout:
  [SectionHeading: "Paper Highlights"]

  [Grid di 3-4 card (desktop) / scroll orizzontale (mobile):]

    Ogni card:
      [Badge: "2026" o "PRL Editor's Suggestion"]  (in alto)
      [Titolo paper troncato a 2 righe]             (h3, hover accent)
      [Autori abbreviati]                           (text-muted)
      [Journal + status]                            (Badge colorato)
      [Link: arXiv | DOI]                           (icon + text)

    Card style:
      bg-surface con bordo sottile
      hover: leggero glow accent-cyan + translate-y -2px
      transition smooth
```

**Animazione:** stagger fade-in delle card al scroll

#### Checklist Paper Highlights

- [ ] Componente `PublicationCard.astro`
- [ ] Layout grid responsive (3 col desktop, scroll mobile)
- [ ] Badge anno e highlight
- [ ] Link arXiv e DOI funzionanti
- [ ] Troncamento titolo con ellipsis
- [ ] Hover effects sulle card
- [ ] Stagger animation al scroll
- [ ] Selezione dei paper da mostrare (highlight: true nel content)

---

### Sezione 1.4: Latest News

**Timeline delle novita recenti**

```
Layout:
  [SectionHeading: "Latest News"]

  [Timeline verticale con linea decorativa a sinistra:]

    Ogni item:
      [Pallino sulla linea timeline]     (accent-cyan, glow)
      [Data: "February 2026"]            (text-muted, small)
      [Testo news]                       (text-primary)
      [Link esterno se presente]         (accent-cyan, freccia)

    La timeline ha un gradiente che sfuma verso il basso
    "View all news" link in fondo (opzionale)

    Mostrare solo le ultime 5-6 news in homepage
```

**Animazione:** ogni item appare con stagger al scroll, la linea "cresce" verso il basso

#### Checklist Latest News

- [ ] Componente `NewsItem.astro`
- [ ] Layout timeline con linea verticale decorativa
- [ ] Pallini animati sulla linea
- [ ] Data formattata coerentemente
- [ ] Link esterni dove presenti
- [ ] Limite a 5-6 items in homepage
- [ ] Gradiente fade-out in basso
- [ ] Animazione scroll stagger
- [ ] Link "View all" (opzionale, o scroll to load more)

---

### Sezione 1.5: Citazione / Quote

**Chiusura elegante con la citazione di Einstein**

```
Layout:
  [Sfondo leggermente diverso: bg-elevated o gradient sottile]
  [Citazione centrata, font italic, dimensione grande:]

    "The most beautiful experience we can have is the mysterious.
     It is the fundamental emotion that stands at the cradle
     of true art and true science."

    — Albert Einstein

  [Decorazione: virgolette grandi semitrasparenti come sfondo]
```

#### Checklist Quote

- [ ] Componente `QuoteSection.astro`
- [ ] Stile tipografico citazione (italic, grande, centrato)
- [ ] Decorazione virgolette (pseudo-element o SVG)
- [ ] Sfondo differenziato dalla sezione precedente
- [ ] Animazione fade-in al scroll

---

## PAGINA 2: RESEARCH (`/research`)

Pagina dedicata al profilo accademico completo, progetti di ricerca e team.

---

### Sezione 2.1: About Me (dettagliato)

**Profilo accademico esteso con CV**

```
Layout:
  [Hero ridotto: titolo pagina con sfondo particelle sottili o gradient]

  [SectionHeading: "About Me"]

  [Testo esteso:]
    Il paragrafo completo dalla pagina Research attuale:
    "My work focuses on the development, implementation, and application
     of numerical methods for astrophysical plasma simulations..."

  [CTA:]
    [Download Full CV]  (Button primary, link a PDF)
    [Google Scholar]     (Button ghost)
    [ORCID]             (Button ghost)
```

#### Checklist About Me

- [ ] Hero ridotto pagina (titolo + sfondo)
- [ ] Testo bio esteso
- [ ] Bottone download CV (PDF in public/)
- [ ] Link Google Scholar e ORCID
- [ ] Layout responsive

---

### Sezione 2.2: Current Research Projects

**Progetti di ricerca con card espandibili (accordion)**

```
Layout:
  [SectionHeading: "Current Research Projects"]

  [Lista accordion — ogni progetto e una card espandibile:]

    Progetti:
      1. Solar and heliospheric plasma physics
      2. High-energy plasmas around compact objects
      3. Multiscale methods for plasma simulations
      4. String theory and black holes
      5. High-performance scientific computing

    Ogni card chiusa:
      [Icona tematica]  [Titolo progetto]  [Chevron expand ->]
      Bordo sinistro colorato (colore diverso per progetto)

    Ogni card aperta:
      [Descrizione progetto in markdown]
      [Immagini/figure se disponibili]
      [Paper correlati]

    Animazione: expand/collapse smooth con altezza animata
```

**Note:** i contenuti delle sezioni espandibili vanno estratti dal sito attuale (attualmente sono "expand" senza contenuto visibile nel testo incollato — da chiedere a Fabio)

#### Checklist Research Projects

- [ ] Componente `ResearchCard.astro` con accordion
- [ ] Contenuti dei 5 progetti (richiedere a Fabio se non disponibili)
- [ ] Icone tematiche per ogni progetto (Lucide icons o custom SVG)
- [ ] Bordo laterale colorato per distinguere progetti
- [ ] Animazione expand/collapse
- [ ] Layout responsive
- [ ] Immagini/figure per i progetti (opzionale, da valutare)

---

### Sezione 2.3: Research Group

**Griglia del team con foto e ruoli**

```
Layout:
  [SectionHeading: "Research Group"]

  [Grid 4 colonne (desktop) / 2 colonne (tablet) / 1 colonna (mobile):]

    Ogni membro:
      [Foto circolare con bordo sottile]       (aspect-ratio 1:1)
        hover: leggero glow + scale 1.05
      [Nome completo con titolo]               (h4, text-primary)
      [Ruolo]                                  (text-secondary)

    Ordine:
      1. Postdoc
      2. PhD students
      3. Co-supervised

    Membri attuali (dal sito):
      Dr. Daniel Groselj        — FWO Postdoctoral Fellow
      Dr. Nicolas Moens          — Postdoctoral Fellow
      Dr. Pranab Deka            — Postdoctoral Fellow
      Dr. Paul Els               — Postdoctoral Fellow
      Dr. Jesse Vos              — FWO Postdoctoral Fellow
      Dr. R.-Paul Wilhelm        — Postdoctoral Fellow
      Dr. Camille Lorfing        — Postdoctoral Fellow
      Luca Pezzini              — FWO PhD student
      Clarissa Mora             — FWO PhD student
      Silvia Ferro              — FWO PhD student
      K.-Xanthos Argyropoulos  — PhD student
      Nadja Reisinger           — FWO PhD student
      Maximilien Peters de Bonhome — PhD student
      Saksham Pande             — PhD student
      Daniela Maci              — PhD student (co-supervision)
      Olaf Willocx              — PhD student (co-supervision)
```

#### Checklist Team Grid

- [ ] Componente `TeamCard.astro`
- [ ] Componente `TeamGrid.astro` (container grid)
- [ ] Foto team ottimizzate (WebP, crop quadrato, ~300x300px)
- [ ] Layout grid responsive (4/2/1 colonne)
- [ ] Hover effect sulle card
- [ ] Raggruppamento per ruolo (postdoc / PhD / co-supervised)
- [ ] Lazy loading foto
- [ ] Animazione stagger al scroll

---

### Sezione 2.4: Former Group Members

**Sezione compatta per ex-membri**

```
Layout:
  [SectionHeading: "Former Group Members"]

  [Lista semplice o card piccole:]
    Dr. Evgeny Gorbunov    — now at UMD
    Dr. Camille Granier    — now at UMD / CITA
```

#### Checklist Former Members

- [ ] Componente `FormerMembers.astro`
- [ ] Lista con nome + posizione attuale
- [ ] Stile differenziato (piu discreto del team attuale)

---

## PAGINA 3: PUBLICATIONS (`/publications`)

Pagina con lista completa delle pubblicazioni, organizzata per anno.

---

### Sezione 3.1: Header e Filtri

```
Layout:
  [Hero ridotto: "Publications" + conteggio totale]

  [Barra filtri (sticky sotto header):]
    [Filtro per anno: All | 2026 | 2025 | 2024 | ... ]    (pills/tabs)
    [Filtro per tipo: All | First Author | PRL | Highlighted ]  (opzionale)
    [Search box]                                             (opzionale, valutare)

    Nota: il filtro e un Island React/Preact per interattivita
```

#### Checklist Filtri

- [ ] Componente `PublicationFilter.tsx` (Island React)
- [ ] Filtro per anno (pills cliccabili)
- [ ] Filtro per tipo/highlight (opzionale)
- [ ] Sticky positioning sotto header
- [ ] Stato filtro nell'URL (query params) per condivisibilita
- [ ] Conteggio risultati
- [ ] Animazione transizione filtro (fade)

---

### Sezione 3.2: Lista Pubblicazioni

```
Layout:
  [Per ogni anno (dal piu recente):]

    [YearDivider: "2026" con linea decorativa e conteggio paper]

    [Lista card pubblicazioni:]
      Ogni card:
        [Badge anno + status]                              (sinistra)
        [Titolo completo]                                  (h3, hover accent)
        [Lista autori completa]
          Fabio evidenziato in grassetto quando presente
        [Journal, Volume, Pagine]                          (text-secondary)
        [DOI link | arXiv link | Note]                    (inline, icone)

        Se highlight:
          [Badge speciale: "PRL Editor's Suggestion" o "Highlighted in AAS NOVA"]
          Card con bordo accent-violet o accent-orange

      Card style:
        Compatta ma leggibile
        Separatore sottile tra card
        hover: sfondo leggermente piu chiaro

  [Fine lista: link back to top]
```

**Note per i dati:**
- Tutte le pubblicazioni dal 2015 al 2026 sono nel testo incollato
- Totale: ~60+ pubblicazioni
- Evidenziare il nome "Bacchini" in ogni lista autori

#### Checklist Lista Pubblicazioni

- [ ] Componente `PublicationCard.astro`
- [ ] Componente `YearDivider.astro`
- [ ] Componente `PublicationList.astro`
- [ ] Migrazione completa pubblicazioni in YAML (2015-2026)
- [ ] Nome "Bacchini" evidenziato in grassetto
- [ ] Badge per paper con highlight
- [ ] Link DOI funzionanti (https://doi.org/...)
- [ ] Link arXiv funzionanti (https://arxiv.org/abs/...)
- [ ] Status badge (submitted/accepted/published)
- [ ] Responsive: card si adattano su mobile
- [ ] Back-to-top button
- [ ] Animazione entrance (fade-in sottile)

---

## PAGINA 4: CONTACT (`/contact`)

Pagina contatto minimal ed elegante.

---

### Sezione 4.1: Informazioni di Contatto

```
Layout:
  [Hero ridotto: "Contact"]

  [Grid 2 colonne (desktop):]

    [Colonna 1 — KU Leuven:]
      [Icona universita]
      [Nome istituzione]
        Centre for mathematical Plasma Astrophysics (CmPA)
        KU Leuven
      [Indirizzo]
        Department of Mathematics
        Celestijnenlaan 200B
        3001 Leuven, Belgium
      [Email con link mailto:]
        fabio.bacchini@kuleuven.be
      [Link Google Maps / embed mappa]

    [Colonna 2 — BIRA-IASB:]
      [Icona istituto]
      [Nome istituzione]
        Royal Belgian Institute for Space Aeronomy
        (BIRA-IASB)
      [Indirizzo]
        Ringlaan 3
        1180 Brussels, Belgium
      [Email con link mailto:]
        fabio.bacchini@aeronomie.be
      [Link Google Maps / embed mappa]

  Card style:
    bg-surface con bordo sottile
    Icona location accent-cyan
    hover: glow sottile
```

#### Checklist Contatto

- [ ] Componente `ContactInfo.astro`
- [ ] Componente `LocationCard.astro`
- [ ] Layout 2 colonne responsive
- [ ] Loghi istituzioni (KU Leuven + BIRA-IASB)
- [ ] Indirizzi completi
- [ ] Email cliccabili (mailto:)
- [ ] Mappa (embed Google Maps o immagine statica — valutare privacy/peso)
- [ ] Link a Google Scholar, ORCID, ResearchGate (social accademici)

---

### Sezione 4.2: Social Accademici (opzionale)

```
Layout:
  [Riga icone centrate:]
    [Google Scholar]  [ORCID]  [ResearchGate]  [GitHub]  [LinkedIn]

  Icone con hover glow accent
  Link a profili esterni
```

#### Checklist Social

- [ ] Raccogliere link profili accademici di Fabio
- [ ] Icone social (Lucide o Simple Icons)
- [ ] Hover effects
- [ ] `target="_blank" rel="noopener noreferrer"` su tutti i link esterni

---

## COMPONENTI GLOBALI

### Header / Navbar

```
Comportamento:
  - Fixed in alto
  - Trasparente su hero (homepage), si solidifica su scroll
  - Solid (bg-deep) su tutte le altre pagine
  - Hamburger menu su mobile (slide-in da destra)

Layout desktop:
  [Logo/Nome: "Fabio Bacchini"]  ................  [Home] [Research] [Publications] [Contact]

Layout mobile:
  [Logo/Nome]  ................  [Hamburger icon]

  Menu aperto:
    [Overlay scuro]
    [Panel da destra con link full-height]
    [Animazione slide-in]

Dettagli:
  - Link attivo evidenziato con underline accent-cyan
  - Transizione smooth trasparente -> solid
  - Loghi KU Leuven e BIRA-IASB piccoli accanto al nome (opzionale)
  - z-index alto per stare sopra tutto
```

#### Checklist Header

- [ ] Componente `Header.astro`
- [ ] Stile trasparente -> solid su scroll (JS)
- [ ] Link attivo evidenziato
- [ ] Hamburger menu mobile
- [ ] Slide-in panel mobile con overlay
- [ ] Transizioni smooth
- [ ] Accessibilita: focus states, aria-expanded
- [ ] z-index corretto

---

### Footer

```
Layout:
  [Sfondo: bg-elevated o gradient sottile]

  [3 colonne (desktop) / stack (mobile):]

    [Colonna 1 — Branding:]
      "Fabio Bacchini"
      "Assistant Professor"
      Loghi KU Leuven + BIRA-IASB (piccoli, monocromatici)

    [Colonna 2 — Links:]
      Home
      Research
      Publications
      Contact

    [Colonna 3 — Contatti rapidi:]
      Email KU Leuven
      Email BIRA-IASB

  [Sotto: linea separatrice]
  [Copyright: "(c) 2026 Fabio Bacchini. All rights reserved."]

  [Citazione Einstein in piccolo, opzionale se gia in homepage]
```

#### Checklist Footer

- [ ] Componente `Footer.astro`
- [ ] Layout 3 colonne responsive
- [ ] Loghi istituzioni
- [ ] Link navigazione
- [ ] Email contatto
- [ ] Copyright con anno dinamico
- [ ] Stile coerente con il tema

---

## VIEW TRANSITIONS

### Transizioni tra Pagine

```
Transizioni Astro native (View Transitions API):

  Pagina -> Pagina:
    - Contenuto: fade out/in (300ms)
    - Header: persiste (no transizione)
    - Footer: persiste (no transizione)

  Home -> Research:
    - Hero si riduce e transiziona nel mini-hero della pagina

  Qualsiasi -> Publications:
    - Fade elegante con leggero slide-up

  Elementi condivisi (transition:name):
    - Header (transition:persist)
    - Titolo sezione se presente in entrambe le pagine
```

#### Checklist View Transitions

- [ ] Abilitare `<ViewTransitions />` nel layout base
- [ ] Configurare `transition:persist` per Header
- [ ] Definire animazioni di transizione custom
- [ ] Testare su tutti i browser supportati
- [ ] Fallback per browser senza View Transitions API
- [ ] Verificare che Three.js non si re-inizializzi a ogni navigazione

---

## PIANO DI LAVORO — ORDINE DI IMPLEMENTAZIONE

### Fase 1: Fondamenta
- [ ] Setup progetto Astro + Tailwind + TypeScript
- [ ] Configurare struttura cartelle
- [ ] Creare `BaseLayout.astro` con head, meta, font
- [ ] Creare `Header.astro` (desktop + mobile)
- [ ] Creare `Footer.astro`
- [ ] Definire stili globali (colori, tipografia, spacing)
- [ ] Abilitare View Transitions

### Fase 2: Homepage
- [ ] Hero section (senza Three.js, con gradient statico)
- [ ] Bio section
- [ ] Paper Highlights section
- [ ] Latest News section
- [ ] Quote section
- [ ] Responsive check completo

### Fase 3: Pagine interne
- [ ] Research: About Me + CV download
- [ ] Research: Research Projects (accordion)
- [ ] Research: Team Grid
- [ ] Publications: lista completa con divisori anno
- [ ] Contact: info + mappe
- [ ] Responsive check completo

### Fase 4: Contenuti
- [ ] Migrare pubblicazioni in Content Collections YAML
- [ ] Migrare news in markdown
- [ ] Migrare team in markdown
- [ ] Raccogliere e ottimizzare tutte le immagini
- [ ] Raccogliere CV PDF aggiornato

### Fase 5: Interattivita
- [ ] Hero animation Three.js (particle field)
- [ ] GSAP scroll animations su tutte le sezioni
- [ ] Publication filter (Island React)
- [ ] Accordion research projects
- [ ] View Transitions polish

### Fase 6: Polish e Deploy
- [ ] SEO: meta tags, Open Graph, Schema.org
- [ ] Accessibilita: audit completo
- [ ] Performance: Lighthouse audit
- [ ] Cross-browser testing
- [ ] Deploy su Netlify/Vercel
- [ ] Custom domain (se disponibile)
- [ ] Walkthrough finale con Fabio
