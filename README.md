# Polesine Fantasma

Progetto dedicato alle storie, alle immagini e ai luoghi del Polesine che resistono allo scorrere del tempo.

## Stato attuale del progetto

| Voce | Stato attuale |
| --- | --- |
| Versione | **v0.2.0** <br> Homepage dimostrativa disponibile in locale. |
| Ultimo aggiornamento di questa panoramica | **18 novembre 2026**. |
| Sito | **Ci sto lavorando su, cazzo.** <br>Homepage dimostrativa, Coming Soon di Esplora/Galleria, Privacy Policy e Disclaimer provvisori e 404 personalizzata. Contenuti reali, archivio, galleria e ricerca effettiva ancora da implementare. |
| Ultimi interventi completati | Hero con foto casuali e titolo animato; tre anteprime con barre ocra, mappa indipendente e sezioni Chi sono/Contatti. Header e footer condivisi, link alle informative, favicon SVG e hover ocra. Triangolo Wikipedia conservato ma disattivato. Regola HTTP noindex per il solo sito test predisposta nei sorgenti, da verificare dopo il deploy. |
| Lingue | IT, **EN da valutare** |
| Pubblicazione definitiva | **Incompletata.** <br>Versione Hugo su test.polesinefantasma.it; dominio definitivo attivo con pagina coming-soon.

## Tecnologie e struttura

| Ambito | Implementazione attuale |
| --- | --- |
| Pagina | HTML statico generato da Hugo.|
| Presentazione | CSS responsive. Hero condivisa tra home, Coming Soon e informative; desktop tra circa 451 e 940 px. Feed e Chi sono/Contatti allineati a massimo 1180 px da 960 px; mappa indipendente da massimo 1600 px. |
| Interazioni | JavaScript vanilla per foto casuali, titolo animato, tema locale, coordinamento menu/ricerca e copia email. La ricerca è solo un’interfaccia provvisoria. Hover e barre ocra sono gestiti in CSS e rispettano il movimento ridotto. |
| Risorse | Foto WebP e fallback locale; mappe SVG/JPG, logo PNG originale, sprite SVG e favicon SVG. Oswald per menu, titoli Chi sono/Contatti, informative, Coming Soon e numero 404; Inter nel footer, Source Sans 3 per contenuti e sottotitolo, Special Elite per nome del sito e messaggio 404. Nessuna libreria o font remoto. |
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
│   ├── home.html           # Homepage
│   ├── coming-soon.html    # Template condiviso di Esplora e Galleria
│   ├── informational.html  # Template condiviso di Privacy Policy e Disclaimer
│   ├── 404.html            # Errore nativo Hugo, senza hero fotografica
│   └── partials/           # Header, foto hero, footer, feed, icone, history-corner.html e use-home-hero.html
├── content/esplora.md      # Pagina /esplora/ con layout coming-soon
├── content/galleria.md     # Pagina /galleria/ con lo stesso layout coming-soon
├── content/privacy.md      # Testo provvisorio di /privacy/
├── content/disclaimer.md   # Testo provvisorio di /disclaimer/
├── data/demo.toml          # Articoli dimostrativi
├── assets/
│   ├── css/main.css        # Stili responsive
│   ├── js/main.js          # Interazioni condivise tra le pagine
│   └── images/
│       ├── hero/          # Sette foto WebP, inclusa background.webp
│       ├── mappa-polesine.svg # Mappa illustrativa della home
│       ├── il-polesine.jpg # Foto originale della piega «La Storia»
│       └── logo.png       # Logo PNG originale
├── static/
│   ├── _headers           # Noindex HTTP limitato a test.polesinefantasma.it
│   ├── favicon.svg        # Favicon originale, pubblicata in /favicon.svg
│   ├── icons.svg          # Sprite SVG locale
│   ├── images/hero-fallback.webp # Foto di sicurezza se la cartella hero è vuota
│   └── fonts/             # Font WOFF2 locali con licenze
├── public/                # Sito generato, ignorato da Git
├── resources/             # Cache delle risorse Hugo, ignorata da Git
└── docs/
    ├── risorse.md          # Risorse e istruzioni tecniche di manutenzione
    └── inspiration.md      # Riferimenti per il futuro sito
```

## Versione locale attuale — Hugo

**Hugo 0.169.0 Extended**

La cartella locale contiene la prima versione grafica del nuovo sito, generata con Hugo 0.169.0 Extended, template originali, HTML, CSS e JavaScript vanilla. Nessuna dipendenza frontend, database, libreria di icone o font esterno. La pubblicazione definitiva resta incompleta.

VS Code avvia hugo server -D all’apertura della cartella tramite .vscode/tasks.json. Lo stesso comando può essere eseguito manualmente; anteprima su http://localhost:1313/. La build si esegue con hugo build, con output in public/.

### Noindex provvisorio — da rivedere prima della pubblicazione definitiva

Prima della pubblicazione definitiva controllare questi tre punti:

- **`static/_headers`:** aggiunge `X-Robots-Tag: noindex, nofollow` soltanto a `https://test.polesinefantasma.it/*`, escludendo dominio principale, www e `pages.dev`. È una regola provvisoria da rivedere: mantenerla se `test` resta un ambiente di sviluppo, modificarla o rimuoverla se cambia o viene dismesso.
- **`layouts/baseof.html`:** il metatag `noindex, nofollow` blocca ancora tutte le pagine HTML, su qualsiasi dominio. Rimuoverlo o renderlo condizionale sulle pagine definitive indicizzabili, conservando il noindex della 404 e la protezione del test.
- **`hugo.toml`:** rivalutare la sitemap ora disabilitata e impostare/passare l’URL assoluto corretto al posto di `baseURL = '/'`.

## Feature flags

Interruttori booleani nativi di Hugo; l’unico disponibile è il triangolo Wikipedia con scritta «La Storia». 

Con `false`, triangolo, scritta e tooltip non vengono generati nell’HTML; il codice resta disponibile. Il server rileva il salvataggio senza riavvio manuale, ma online servono una nuova build e un deploy. Dettagli in [Risorse](docs/risorse.md#feature-flags).

## Idee struttura

Proposte per le funzionalità definitive

| Ambito | Proposta |
| --- | --- |
| Homepage | Statica con foto/sfondo che prende metà della hero, con logo+nome e breve descrizione di PF. Sotto piccolo feed degli articoli più recenti o di nostra scelta |
| Galleria Fotografica | Pagina semplice e statica, a sinistra un menu che mostra e divide le foto su ogni progetto/categoria?/luogo e la pagina che le mostra ha tante miniature, abbastanza grandi, premendo la miniatura la foto diventa fullscreen(lightbox); PhotoSwipe, libreria JavaScript per la gestione di questa funzione. Il caricamento delle foto è gestito tramite CMS che auto adatta la pagina con le nuove miniature e si aggiorna automaticamente. |
| Articoli | Come nella galleria, a sinistra elenco con gli articoli publicati e quando premi ti mostra l'articoli; ordinabili per alfabetico o data di publicazione. Magari una pagina base prima di selezionare il singolo articolo, con spiegazione e feed articoli. Per le foto duplicate tra articoli e galleria, metetre un sistema che richiama nell'articolo la foto della galleria, cosi evitiamo doppi caricamenti.  |
| Framework | Hugo, più semplice da installare e usare, più rapido di Astro, adatto per siti stile blog. |
| CMS | Pages CMS, meno complicato di Decap CMS da usare e installare, sistema di autenticazione con GitHub integrato. Perfetto per la gestione di articoli e galleria fotografica. |
| Contatti | Aggiungere modulo email a pagina dedicata? |

## Checklist — Sviluppo e pubblicazione di Polesine Fantasma

Attività tecniche e operative per realizzare il sito. Le proposte di contenuto e funzionalità da valutare sono raccolte separatamente nelle idee.

### 1. Progettazione e sviluppo

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Feed e pagina Esplora | **Work in Progress** | Realizzare la struttura degli articoli Hugo: ultimi articoli in homepage, archivio completo in Esplora e pagine dei singoli articoli. |
| CMS | **Da pianificare**  | Configurare il sistema per creare articoli, inserire fotografie nel testo, gestire titoli, descrizioni e pubblicazione. Inizialmente le immagini saranno tutte locali al sito. Caricare solo immagini necessarie all'articolo in WebP, Hugo gestisce le anteprime e resto. |
| Articoli di prova | **Da pianificare** | Scrivere qualche articolo reale o di prova, con immagini WebP su GitHub. Questo ci permetterà anche di capire quali dimensioni e qualità usare. |
| Galleria e NAS | **Da pianificare** | Quando la struttura funzionerà, configureremo la gestione condivisa delle fotografie su Unraid e l'accesso pubblico alle versioni grandi. Poi collegheremo la lightbox sia agli articoli sia alla galleria.  |
| Preparare contenuti e risorse | **Work in Progress** | Selezionare testi, fotografie e materiali, verificandone provenienza e diritti d'uso. |
| ~~Email~~ | Completo | ~~Collegare Gmail a Alias Cloudflare per miglior sicurezza, abilita "Email Address Obfuscation" di Cloudflare.~~ |
| RSS | **Da pianificare** | Definire il feed degli articoli reali: icona e RSS nativo esistono, ma il feed include le pagine Markdown e non le anteprime dimostrative. |

### 2. SEO e indicizzazione

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Metadati SEO | **Parziale** | Title e description presenti; rivedere titoli, canonical e URL definitivi, **togliendo o limitando il noindex globale prima della pubblicazione.** |
| Sitemap e robots.txt | **Da verificare** | Sitemap ora disabilitata; rivalutarla per la produzione. Controllare anche il robots.txt gestito da Cloudflare, senza bloccare la lettura del noindex sul test. |
| Dati strutturati JSON-LD | **Da verificare** | Dati strutturati pertinenti a Polesine Fantasma, sintatticamente validi e coerenti con i contenuti. |
| Anteprime social | **Da verificare** | Open Graph e Twitter Card configurati con titolo, descrizione e immagine corretti. |
| Favicon e identità browser | **Implementato** | SVG originale in `static/favicon.svg`, incluso nel head condiviso. Da valutare. |
| Google Search Console | **Da verificare** | Dominio verificato, sitemap inviata e indicizzazione controllata. |

### 3. Cloudflare e infrastruttura

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Hosting e distribuzione | **Da verificare** | Cloudflare Pages collegato a GitHub, deploy funzionante e modalità di pubblicazione configurata. |
| Dominio, DNS e HTTPS | **Da verificare** | `polesinefantasma.it` funzionante in HTTPS, certificato valido e redirect permanente da www. |
| Sicurezza Cloudflare | **Da verificare** | WAF, protezione bot e header HTTP controllati, senza blocchi indesiderati o incompatibilità. |
| Cloudflare Web Analytics | **Da verificare** | Analytics attivato, integrato e raccolta delle visite verificata. |
| Ambiente di test | **Implementato** | Noindex HTTP limitato a `test.polesinefantasma.it` in `static/_headers`. |

### 4. Privacy e conformità

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Privacy e cookie | **Check finale** | `/privacy/` e collegamento nel footer presenti; verificare il testo prima della pubblicazione. |
| Consenso e servizi esterni | **Da pianificare** | Da implementare su pagina `privacy`. |
| Pagina Disclaimer | **Check finale** | `/disclaimer/` e collegamento nel footer presenti; verificare il testo prima della pubblicazione. |

### 5. Qualità tecnica e prestazioni

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Responsive e compatibilità | **Da verificare** | Sito funzionante su smartphone, tablet e desktop, con test nei principali browser. |
| Accessibilità | **Da verificare** | HTML semantico, navigazione da tastiera, contrasto, etichette accessibili e gestione delle eventuali animazioni. |
| Immagini, font e risorse | **Da verificare** | Dimensioni, formati e caricamento ottimizzati; nessuna risorsa mancante o layout shift evitabile. |
| Preload dei font | **Da valutare** | Verificare se il preload dei font principali migliora il caricamento e riduce il FOUT, senza introdurre richieste inutili. |
| JavaScript, link e percorsi | **Da verificare** | Nessun errore rilevante in console, collegamento rotto o comportamento imprevisto. |
| Lighthouse e Core Web Vitals | **Da pianificare** | Test mobile e desktop eseguiti; LCP, CLS e INP valutati e criticità documentate. |
| Pagina 404 | **Implementato** | Template nativo `layouts/404.html`, senza hero fotografica; da verificare a deploy effettivo. |
| Audit tecnico e sicurezza | **Da pianificare** | Revisione di codice, configurazioni, dipendenze e dati sensibili, con problemi prioritari risolti o documentati. |
| Logo BIMI | **Non cocmpleto** | Aggiunto ma fallisce controllo DMARC, servirebbe nuovo server SMTP in uscita, ma comunque mancherebbe verifica per essere visto da Gmail. |

### 6. Verifica finale

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| ~~Predisporre la coming soon~~ | Completa | ~~Pagina provvisoria con logo, sfondo, presentazione e annuncio di prossima apertura.~~ |
| Verifica finale in produzione | **Da pianificare** | Dominio, HTTPS, redirect, SEO, 404, link, risorse, mobile e anteprime social verificati sul sito pubblico. |

## Idee per il sito e funzionalità da valutare

Spunti iniziali da discutere, non requisiti approvati né attività già pianificate. Le idee confermate potranno diventare attività di sviluppo.
Vedi [Inspiration](docs/inspiration.md) per siti web si riferimento. 

| Idea | Possibile sviluppo |
| --- | --- |
| Archivio dei luoghi | Schede dedicate ai luoghi del Polesine, con fotografie, descrizioni e memoria storica. |
| Racconti e testimonianze | Storie legate al territorio, ricordi e contributi delle persone. |
| Confronti tra passato e presente | Affiancare immagini storiche e fotografie attuali, quando disponibili e utilizzabili. |
| Esplorazione del territorio | Valutare una mappa dei luoghi o percorsi tematici, tenendo conto della semplicità di manutenzione. |
| Collaborazione | Pagina per proposte collaborative? |
| Storia | Riferimenti storici al Polesine come zona geografica. - pagina storia sul Polesine |

## Licenza e copyright

Il codice sorgente del sito web **Polesine Fantasma** è distribuito sotto [licenza MIT](LICENSE).

Le fotografie, le immagini, i testi originali, i loghi e gli elementi dell'identità visiva del progetto **sono esclusi dalla licenza MIT** e rimangono protetti dal diritto d'autore.

**Tutti i diritti riservati.** La riproduzione, la redistribuzione, la modifica o l'utilizzo di questi materiali richiedono la preventiva autorizzazione scritta dei rispettivi titolari dei diritti.

## Documentazione e manutenzione

- [README principale](README.md): panoramica corrente, stato, attività e idee.
- [Risorse e manutenzione tecnica](docs/risorse.md): responsabilità dei file, modifica delle risorse e workflow di manutenzione.
- [Inspiration](docs/inspiration.md): raccolta di riferimenti per grafica, contenuti e navigazione del futuro sito.
- [AGENTS.md](AGENTS.md): regole per gli interventi sul repository.
