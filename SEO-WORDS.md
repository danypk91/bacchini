# SEO Keywords — fabiobacchini.com

> Analisi del 15 marzo 2026

---

## Stato attuale dell'indicizzazione

### Keyword forti (ben coperte in title, H1, schema)

| Keyword | Dove appare |
|---|---|
| `Fabio Bacchini` | H1 homepage, title tutte le pagine, schema Person |
| `Fabio Bacchini astrophysicist` | Title homepage |
| `Fabio Bacchini KU Leuven` | Title homepage, schema worksFor |

Chi cerca il nome lo trova. Il sito funziona come biglietto da visita.

### Keyword deboli (presenti solo in description o body text, non in heading)

| Keyword | Dove appare |
|---|---|
| `plasma astrophysics` | Description pagina Research, title tag |
| `particle-in-cell simulations` | Description, testo bio |
| `astrophysical plasma simulations` | Description Research |
| `high-performance computing astrophysics` | Description, testo bio |
| `magnetohydrodynamics` | Solo nello schema knowsAbout |

Google le vede ma non le considera centrali perche non sono in posizioni forti (H1, H2, title).

### Keyword assenti (zero copertura)

| Keyword | Potenziale |
|---|---|
| `plasma physicist Belgium` | Alto — query locale, poca concorrenza |
| `astrophysics researcher KU Leuven` | Alto — query istituzionale |
| `PIC simulations astrophysics` | Medio — nicchia tecnica |
| `magnetic reconnection researcher` | Medio — tema di ricerca specifico |
| `magnetorotational instability simulation` | Basso volume ma altissima rilevanza |
| `black hole accretion plasma` | Medio — argomento di ricerca |
| `solar wind kinetic simulations` | Basso volume ma rilevante |

---

## Cosa fare per migliorare

### 1. Rafforzare keyword nei heading (H2) della pagina Research

I titoli delle sezioni sono generici ("About Me", "Current Research Projects"). Aggiungere keyword nei sottotitoli o negli H2:

| Attuale | Proposta |
|---|---|
| `About Me` | `About Me — Plasma Astrophysicist at KU Leuven` |
| `Current Research Projects` | `Research in Plasma Astrophysics & Simulations` |
| `Research Group` | `Research Group — CmPA, KU Leuven` |

### 2. Aggiungere sottotitoli keyword-rich nelle card dei progetti di ricerca

Ogni `ResearchCard` ha un titolo (es. "Solar and heliospheric plasma physics"). Questi sono gia buoni come keyword. Verificare che siano renderizzati come `<h3>` e non come `<div>` o `<span>`.

### 3. Aggiungere heading semantici per anno nella pagina Publications

Attualmente `YearDivider` potrebbe non renderizzare un vero `<h2>`. Se lo fa, bene — Google indicizza sezioni come "Publications 2025", "Publications 2024". Se non lo fa, cambiare il markup in:

```html
<h2>2025</h2>
```

### 4. Aggiungere una meta keyword description piu ricca sulla homepage

La description della homepage attualmente descrive il ruolo. Potrebbe includere le aree di ricerca:

```
Attuale:  "Personal website of Fabio Bacchini..."
Proposta: "Fabio Bacchini — astrophysicist at KU Leuven and BIRA-IASB. Research in plasma astrophysics, particle-in-cell simulations, magnetic reconnection, and high-performance computing."
```

### 5. Aggiungere testo introduttivo nella pagina Publications

La pagina Publications ha solo il filtro e la lista. Un paragrafo introduttivo (2-3 frasi) con keyword naturali aiuterebbe:

> "Peer-reviewed publications in astrophysical plasma physics, particle-in-cell simulations, magnetic reconnection, and black hole accretion. Papers span topics from magnetorotational instability in pair plasmas to solar wind kinetic modeling."

### 6. Creare una pagina /about dedicata (opzionale, lungo termine)

Una pagina About separata da Research permetterebbe di posizionarsi meglio per query biografiche ("Fabio Bacchini physicist", "Fabio Bacchini CV") senza diluire la pagina Research che dovrebbe puntare su keyword tecniche.

---

## Priorita

| Azione | Impatto | Effort |
|---|---|---|
| Keyword nei heading H2 di Research | Alto | 10 min |
| Heading semantici `<h2>` per anno in Publications | Alto | 5 min |
| Meta description homepage piu ricca | Medio | 5 min |
| Testo introduttivo in Publications | Medio | 15 min |
| Verificare che ResearchCard usi `<h3>` | Medio | 5 min |
| Pagina /about dedicata | Basso | 1+ ora |