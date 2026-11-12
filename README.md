# Polesine Fantasma

Progetto dedicato alle storie, alle immagini e ai luoghi del Polesine che resistono allo scorrere del tempo.

## Stato attuale del progetto

| Voce | Stato attuale |
| --- | --- |
| Versione | **v0.1.0** | Prima versione grafica Hugo. Homepage dimostrativa disponibile in locale. |
| Ultimo aggiornamento di questa panoramica | **12 novembre 2026**. |
| Sito | **Ci sto lavorando su, cazzo** Impostazione grafica della homepage realizzata; pagine interne, contenuti reali, gallerie e ricerca effettiva ancora da definire e implementare. |
| Ultimi interventi completati | Base Hugo, homepage responsive, menu mobile, interfaccia di ricerca, copia email e avvio automatico del server in VS Code. |
| Lingue | IT, **EN da valutare** |
| Pubblicazione definitiva | **Incompletata.** Versione Hugo su test.polesinefantasma.it; dominio definitivo attivo con pagina coming-soon.

## Tecnologie e struttura

| Ambito | Implementazione attuale |
| --- | --- |
| Pagina | HTML statico generato da template originale Hugo. |
| Presentazione | CSS responsive, hero fotografica, logo PNG originale e layout a due colonne su desktop e a colonna singola su smartphone. |
| Interazioni | JavaScript vanilla per menu mobile; voci del menu a 15,9 px con peso normale. |
| Risorse | Sfondo convertito WebP responsive, logo PNG non rielaborato, sprite SVG locale, Special Elite locale per i due titoli, Inter locale nel footer e Roboto locale per gli altri testi; nessuna libreria o font remoto. |
| Architettura | Hugo 0.169.0 Extended come generatore statico; nessun backend, database, framework frontend o pacchetto npm. Build in `public/`, predisposta per Cloudflare Pages. |

```text
polesinefantasma-website/
├── README.md               # Panoramica, stato, attività e idee
├── AGENTS.md               # Regole per gli interventi
├── hugo.toml               # Configurazione del sito Hugo
├── .gitignore              # Esclusione di output e cache generati
├── .vscode/tasks.json      # Avvio automatico del server Hugo
├── layouts/
│   ├── baseof.html         # Struttura HTML condivisa
│   ├── home.html           # Homepage e sidebar
│   └── partials/           # Header, footer, feed e icone
├── data/demo.toml          # Articoli dimostrativi
├── assets/
│   ├── css/main.css        # Stili responsive
│   ├── js/main.js          # Interazioni della homepage
│   └── images/
│       ├── background.jpg # Sorgente dello sfondo WebP
│       └── logo.png       # Logo PNG originale
├── static/
│   ├── icons.svg          # Sprite SVG locale
│   └── fonts/             # Special Elite, Roboto e Inter WOFF2 con licenze
├── public/                # Sito generato, ignorato da Git
├── resources/             # Cache delle risorse Hugo, ignorata da Git
└── docs/
    ├── risorse.md          # Risorse e istruzioni tecniche di manutenzione
    └── inspiration.md      # Riferimenti per il futuro sito
```

## Versione locale attuale — Hugo

La cartella locale contiene la prima versione grafica del nuovo sito, generata con **Hugo 0.169.0 Extended**, template originali, HTML, CSS e JavaScript vanilla. Nessuna dipendenza frontend, database, libreria di icone o font esterno. Questa versione non è stata pubblicata.

VS Code avvia `hugo server -D` all’apertura della cartella tramite `.vscode/tasks.json`. Lo stesso comando può essere eseguito manualmente; anteprima su `http://localhost:1313/`. La build si esegue con `hugo build`, con output in `public/`.

Configurazione in `hugo.toml`, template in `layouts/`, stili/script/immagini in `assets/` e sprite SVG in `static/`. I dettagli di manutenzione e la predisposizione per Cloudflare Pages sono in [docs/risorse.md](docs/risorse.md). 

## Idee struttura

| Ambito | Implementazione attuale |
| --- | --- |
| Homepage | Statica con foto/sfondo che prende metà della hero, con logo+nome e breve descrizione di PF. Sotto piccolo feed degli articoli più recenti o di nostra scelta |
| Galleria Fotografica | Pagina semplice e statica, a sinistra un menu che mostra e divide le foto su ogni progetto/categoria?/luogo e la pagina che le mostra ha tante miniature, abbastanza grandi, premendo la miniatura la foto diventa fullscreen(lightbox); PhotoSwipe, libreria JavaScript per la gestione di questa funzione. Il caricamento delle foto è gestito tramite CMS che auto adatta la pagina con le nuove miniature e si aggiorna automaticamente. |
| Articoli | Come nella galleria, a sinistra elenco con gli articoli publicati e quando premi ti mostra l'articoli; ordinabili per alfabetico o data di publicazione. Magari una pagina base prima di selezionare il singolo articolo, con spiegazione e feed articoli. Per le foto duplicate tra articoli e galleria, metetre un sistema che richiama nell'articolo la foto della galleria, cosi evitiamo doppi caricamenti.  |
| Framework | Hugo, più semplice da installare e usare, più rapido di Astro, adatto per siti stile blog. |
| CMS | Pages CMS, meno complicato di Decap CMS da usare e installare, sistema di autenticazione con GitHub integrato. Perfetto per la gestione di articoli e galleria fotografica. |
| --- | --- |

## Checklist — Sviluppo e pubblicazione di Polesine Fantasma

Attività tecniche e operative per realizzare il sito. Le proposte di contenuto e funzionalità da valutare sono raccolte separatamente nelle idee.

### 1. Progettazione e sviluppo

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Ricerca di ispirazione | **Work in Progress** | Visitare altri siti e raccogliere riferimenti utili per grafica, organizzazione e navigazione. |
| Ricerca di ispirazione | **Work in Progress** | Siti/temi pre-assemblati da Hugo. |
| ~~Struttura Codice~~ | Completo | ~~Valutare come integrare CMS e Framework engine "Astro" o valuta altri modelli.~~ |
| **Fotografie Loadout** | **Da pianificare** | Non possiamo caricare foto su Git, e c'è un limite a Pages, Cloudflare R2 (object storage) potrebbe essere una soluzione ma va implementato. Però se evitiamo di caricare foto a massima risoluzione e usiamo versioni webP, per esempio, risolviamo il problema e non abbiamo più bisogno di una alternativa, dove Git andrebbe bene. Se webP, invece di 2 immagini, una max risoluzione e una miniatura, si puo usare una singola max e renderla più piccola con CSS per la miniatura, però significa più peso da caricare nella pagina. Google drive è una alternativa ma non può interagire direttamente con pages, per questo serve un sistema S3 simile e non un cloud. <u>Una soluzione valida sarebbe un sistema S3 tipo Minio sul mio NAS, collegato con Tunnel Cloudflare al Pages. Perche Nicolo acceda poi al mio archivio locale, ~~Seafile~~/ownCloud, interfaccia simile drive che interagisce con S3, collegato al tunnel e poi con Cloudflare Access, altrimenti Tailscale. Oppure tenere Drive e usare il mio NAS solo per le foto del sito.</u>  |
| ~~Framework~~ | Completo | ~~Decidere quale framework usare come base e iniziare a integrarlo col sito base.~~ |
| Definire la struttura del sito | **Work in Progress** | Stabilire pagine, sezioni e navigazione della prima versione. |
| Preparare contenuti e risorse | **Da pianificare** | Selezionare testi, fotografie e materiali, verificandone provenienza e diritti d'uso. |
| Definire la grafica definitiva | **Work in Progress** | Approvare il design desktop e mobile, coerente con l'identità di Polesine Fantasma. |
| Sviluppare il sito definitivo | **Work in Progress** | Realizzare le pagine concordate mantenendo l'architettura statica. |
| CMS | **Da pianificare**  | Aggiungere CMS Pages a Sito e blog completato? |

### 2. SEO e indicizzazione

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Metadati SEO | **Da verificare** | Ogni pagina dispone di title, description e canonical corretti, con URL definitivi. |
| Sitemap e robots.txt | **Da verificare** | Sitemap valida con tutte le pagine indicizzabili, robots.txt accessibile e correttamente configurato. |
| Dati strutturati JSON-LD | **Da verificare** | Dati strutturati pertinenti a Polesine Fantasma, sintatticamente validi e coerenti con i contenuti. |
| Anteprime social | **Da verificare** | Open Graph e Twitter Card configurati con titolo, descrizione e immagine corretti. |
| Favicon e identità browser | **Da verificare** | Favicon presente e funzionante sulle pagine e nei principali browser. |
| Google Search Console | **Da fare** | Dominio verificato, sitemap inviata e indicizzazione controllata. |

### 3. Cloudflare e infrastruttura

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Hosting e distribuzione | **Da verificare** | Cloudflare Pages collegato a GitHub, deploy funzionante e modalità di pubblicazione configurata. |
| Dominio, DNS e HTTPS | **Da verificare** | `polesinefantasma.it` funzionante in HTTPS, certificato valido e redirect permanente da www. |
| Sicurezza Cloudflare | **Da verificare** | WAF, protezione bot e header HTTP controllati, senza blocchi indesiderati o incompatibilità. |
| Cloudflare Web Analytics | **Da fare** | Analytics attivato, integrato e raccolta delle visite verificata. |
| Ambiente di test | **Da verificare** | Eventuali versioni di sviluppo escluse dall'indicizzazione e separate dal sito pubblico. |

### 4. Privacy e conformità

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Privacy e cookie | **Da valutare** | Informative predisposte in base ai trattamenti effettivi e facilmente raggiungibili dal footer. Pagina Privacy e cookie dedicata. |
| Consenso e servizi esterni | **Da valutare** | Verificare analytics, font esterni e altre integrazioni; implementare un eventuale banner solo se necessario. |
| Pagina Disclaimer | **Da pianificare** | Discaimer riguardo il pericolo di visitare siti pericolosi, e noi non abbiamo responsabilita a riguardo. Prendi spunto: https://ascosilasciti.com/it/disclaimer-utilizzo-sito/ |

### 5. Qualità tecnica e prestazioni

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Responsive e compatibilità | **Da verificare** | Sito funzionante su smartphone, tablet e desktop, con test nei principali browser. |
| Accessibilità | **Da verificare** | HTML semantico, navigazione da tastiera, contrasto, etichette accessibili e gestione delle eventuali animazioni. |
| Immagini, font e risorse | **Da verificare** | Dimensioni, formati e caricamento ottimizzati; nessuna risorsa mancante o layout shift evitabile. |
| Preload dei font | **Da valutare** | Verificare se il preload dei font principali migliora il caricamento e riduce il FOUT, senza introdurre richieste inutili. |
| JavaScript, link e percorsi | **Da verificare** | Nessun errore rilevante in console, collegamento rotto o comportamento imprevisto. |
| Lighthouse e Core Web Vitals | **Da fare** | Test mobile e desktop eseguiti; LCP, CLS e INP valutati e criticità documentate. |
| Pagina 404 | **Da verificare** | Pagina personalizzata disponibile e risposta HTTP 404 effettiva per percorsi inesistenti. |
| Audit tecnico e sicurezza | **Da fare** | Revisione di codice, configurazioni, dipendenze e dati sensibili, con problemi prioritari risolti o documentati. |

### 6. Verifica finale

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| ~~Predisporre la coming soon~~ | Completa | ~~Pagina provvisoria con logo, sfondo, presentazione e annuncio di prossima apertura.~~ |
| Verifica finale in produzione | **Da fare** | Dominio, HTTPS, redirect, SEO, 404, link, risorse, mobile e anteprime social verificati sul sito pubblico. |

## Idee per il sito e funzionalità da valutare

Spunti iniziali da discutere, non requisiti approvati né attività già pianificate. Le idee confermate potranno diventare attività di sviluppo.
Vedi [Inspiration](docs/inspiration.md) per siti web si riferimento. 

| Idea | Possibile sviluppo |
| --- | --- |
| Menu Hero | Menu reportage/articoli con pagina coming soon |
| Hero | Blog nella hero main?? |
| --- | --- |
| Archivio dei luoghi | Schede dedicate ai luoghi del Polesine, con fotografie, descrizioni e memoria storica. |
| Racconti e testimonianze | Storie legate al territorio, ricordi e contributi delle persone. |
| Gallerie fotografiche | Percorsi visivi organizzati per luogo o tema. |
| Confronti tra passato e presente | Affiancare immagini storiche e fotografie attuali, quando disponibili e utilizzabili. |
| Esplorazione del territorio | Valutare una mappa dei luoghi o percorsi tematici, tenendo conto della semplicità di manutenzione. |
| Presentazione del progetto | Raccontare l'origine di Polesine Fantasma, le sue finalità e come contattarlo per proporre materiali. |

## Licenza e copyright

Il codice sorgente del sito web **Polesine Fantasma** è distribuito sotto [licenza MIT](LICENSE).

Le fotografie, le immagini, i testi originali, i loghi e gli elementi dell'identità visiva del progetto **sono esclusi dalla licenza MIT** e rimangono protetti dal diritto d'autore.

**Tutti i diritti riservati.** La riproduzione, la redistribuzione, la modifica o l'utilizzo di questi materiali richiedono la preventiva autorizzazione scritta dei rispettivi titolari dei diritti.

## Documentazione e manutenzione

- [README principale](README.md): panoramica corrente, stato, attività e idee.
- [Risorse e manutenzione tecnica](docs/risorse.md): responsabilità dei file, modifica delle risorse e workflow di manutenzione.
- [Inspiration](docs/inspiration.md): raccolta di riferimenti per grafica, contenuti e navigazione del futuro sito.
- [AGENTS.md](AGENTS.md): regole per gli interventi sul repository.

Mantenere aggiornati `README.md` e `docs/risorse.md` a ogni modifica al sito. Commit e deploy richiedono autorizzazione esplicita.
