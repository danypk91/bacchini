# Guida: aggiungere pubblicazioni e filtri


## 1. Aggiungere una pubblicazione

Ogni paper è un file `.yaml` nella cartella:

    src/content/publications/

Nome del file: `NN-primoautore-anno-parole-chiave.yaml`, dove `NN` è il
numero progressivo successivo all'ultimo presente. Esempio:

    61-bacchini-2026-pair-plasma.yaml

Contenuto:

    title: "Titolo completo del paper"
    authors: "Bacchini, F., Rossi, M., Smith, J."
    year: 2026
    journal: "The Astrophysical Journal"
    status: published
    doi: "10.3847/1538-4357/ae9600"
    arxiv: "2604.10431"
    fabio_position: first
    highlight: false
    tags:
      - Reconnection


## 2. Significato dei campi

Obbligatori:

- `title`
    Titolo del paper.

- `authors`
    Elenco autori. Scrivere esattamente `Bacchini, F.` perché venga
    messo in grassetto.

- `year`
    Anno (numero). Decide sotto quale anno compare il paper e il filtro
    per anno.

Facoltativi:

- `journal`
    Rivista, mostrata in corsivo sulla card.

- `status`
    Valori: `published`, `accepted`, `submitted`, `preprint`.
    Determina il badge sulla card e la categoria (vedi punto 3).
    Se manca vale `published`.

- `doi`
    Crea il link "DOI". Solo il codice, senza `https://doi.org/`.
    Esempio: "10.3847/1538-4357/ae9600"

- `arxiv`
    Crea il link "arXiv". Solo il numero, senza `arXiv:` davanti.
    Esempio: "2604.10431"

- `fabio_position`
    Valori: `first`, `co-main`, `contributing`.
    `first` e `co-main` mostrano il badge e rientrano nel filtro
    "First Author". Se manca vale `contributing`.

- `highlight`
    Valori: `true`, `false`.
    `true` evidenzia la card e la include nel filtro "Highlights".

- `highlight_label`
    Etichetta arancione con la stella, es. "PRL Editor's Suggestion".
    Si vede solo con `highlight: true`.

- `tags`
    Elenco di argomenti. Ogni tag nuovo crea da solo un filtro in fondo
    alla barra.

Nota: i paper in evidenza in homepage non si aggiornano da questi file,
sono scritti a mano in `src/components/home/PaperHighlights.astro`.


## 3. Assegnare un paper alla categoria "Preprints"

La categoria dipende solo dal campo `status`. Rientrano in "Preprints"
i paper con:

- `status: submitted`   inviato alla rivista, senza ancora un link
- `status: preprint`    disponibile come preprint (es. su arXiv)
- `status: accepted`    accettato ma non ancora uscito

`doi` e `arxiv` si possono omettere finché non esistono.

Il filtro "Preprints" compare nella barra (subito dopo "All") solo se
c'è almeno un paper in uno di questi stati. Quando il paper esce, basta
cambiare in `status: published` e aggiungere il `doi`.


## 4. Aggiungere un nuovo filtro

Filtro per argomento: non serve toccare il codice. Basta aggiungere un
`tag` a uno o più paper e il filtro compare da solo.

Filtro per stato (come "Preprints"): aprire

    src/utils/publicationCategories.ts

e aggiungere una riga all'elenco `publicationCategories`:

    { id: 'in-press', label: 'In press', statuses: ['accepted'] },

- `id`         nome interno, senza spazi, diverso dagli altri
- `label`      testo che compare sul pulsante
- `statuses`   quali valori di `status` ne fanno parte

Per usare un valore di `status` che non esiste ancora, aggiungerlo anche
all'elenco `PUBLICATION_STATUSES` nello stesso file e dargli
un'etichetta in `statusStyles` dentro
`src/components/publications/PublicationCard.astro`.


## 5. Pubblicare

Salvare, fare commit e push su `main`: il sito si aggiorna da solo in un
paio di minuti. Se un campo ha un valore non ammesso (es. uno `status`
scritto male) la pubblicazione fallisce e il sito resta alla versione
precedente.
