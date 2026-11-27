# Polesine Fantasma

Progetto dedicato alle storie, alle immagini e ai luoghi del Polesine che resistono allo scorrere del tempo.

## Stato attuale del progetto

| Voce | Stato attuale |
| --- | --- |
| Versione | **v0.4.1** <br> Homepage, archivio Esplora e pagine articolo disponibili in locale. |
| Ultimo aggiornamento di questa panoramica | **26 novembre 2026**. |
| Sito | **In sviluppo.** <br>Sei articoli demo in Esplora, filtrabili per luogo e periodo; i tre più recenti compaiono in Home. Galleria in Coming Soon, informative da rivedere e 404 personalizzata. Da finalizzare i contenuti e sviluppare galleria, CMS e ricerca. |
| Ultimi interventi completati | Anteprime condivise tra Home ed Esplora, impaginazione centrata e filtri mobile richiudibili. Articoli con crediti dal front matter, titoli bilanciati e barre ocra, escluse nelle fonti. H1 ridotti e titoli hero adattivi su mobile. |
| Lingue | IT, **EN da valutare** |
| Pubblicazione definitiva | **Incompleta.** <br>Versione Hugo su test.polesinefantasma.it e dominio definitivo con coming-soon. |

## Tecnologie e struttura

| Ambito | Implementazione attuale |
| --- | --- |
| Pagina | HTML statico generato da Hugo, con articoli Markdown e front matter TOML. |
| Presentazione | CSS responsive e palette chiara. Hero completa per Home, Coming Soon e informative; compatta per Esplora e articoli. Sidebar affiancata da 768 px, filtri richiudibili su mobile e contenuti centrati. |
| Interazioni | JavaScript vanilla per foto casuali, titolo animato, menu mobile, filtri con conteggi e stato nell’URL, copia email e ritorno in alto. Adattamento dei titoli hero mobile e delle barre H1 negli articoli. |
| Risorse | Foto WebP responsive con fallback locale; mappa e icone SVG, logo PNG. Font locali: Oswald, Inter, Source Sans 3 e Special Elite. Nessuna libreria frontend esterna. |
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
│   ├── coming-soon.html    # Pagina provvisoria di Galleria
│   ├── esplora/           # Archivio e articoli con struttura condivisa
│   ├── _markup/           # Immagini Markdown responsive
│   ├── informational.html  # Template condiviso di Privacy Policy e Disclaimer
│   ├── 404.html            # Errore nativo Hugo, senza hero fotografica
│   └── partials/           # Header, foto hero, footer, feed, icone, history-corner.html e use-home-hero.html
├── content/esplora/        # _index.md e sei schede dimostrative demo-01.md–demo-06.md
├── content/galleria.md     # Pagina /galleria/ con layout coming-soon
├── content/privacy.md      # Testo provvisorio di /privacy/
├── content/disclaimer.md   # Testo provvisorio di /disclaimer/
├── archetypes/esplora.md   # Modello in bozza con titolo, sottotitolo, fonti e campi dei crediti
├── assets/
│   ├── css/main.css        # Stili responsive
│   ├── js/archive.js       # Filtri, conteggi e URL di Esplora
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
│   ├── images/articoli/    # Fotografie degli articoli, inclusa la scheda Fabbris
│   └── fonts/             # Font WOFF2 locali con licenze
├── public/                # Sito generato, ignorato da Git
├── resources/             # Cache delle risorse Hugo, ignorata da Git
└── docs/
    ├── risorse.md          # Risorse e istruzioni tecniche di manutenzione
    └── inspiration.md      # Riferimenti per il futuro sito
```

## Versione locale attuale — Hugo

**Hugo 0.169.0 Extended**

La versione locale usa template originali, HTML, CSS e JavaScript vanilla. 

Con cartella attendibile, task automatiche abilitate e Hugo nel PATH, VS Code avvia `hugo server -D` all’apertura tramite `.vscode/tasks.json`. Lo stesso comando può essere eseguito manualmente; anteprima su http://localhost:1313/. La build si esegue con `hugo build`, con output in `public/`; nessun comando locale esegue un deploy.

### Noindex provvisorio — da rivedere prima della pubblicazione definitiva

Prima della pubblicazione definitiva controllare questi tre punti:

- **`static/_headers`:** applica `X-Robots-Tag: noindex, nofollow` solo a `https://test.polesinefantasma.it/*`. Mantenere o aggiornare la regola secondo il futuro utilizzo dell’ambiente di test.
- **`layouts/baseof.html`:** il metatag noindex riguarda tutte le pagine HTML. Rimuoverlo o limitarlo per la produzione, preservando la 404 e la protezione del test.
- **`hugo.toml`:** rivalutare la sitemap ora disabilitata e impostare/passare l’URL assoluto corretto al posto di `baseURL = '/'`.

## Feature flags

Interruttori booleani nativi di Hugo; l’unico disponibile è il triangolo Wikipedia con scritta «La Storia». 

Con `false` il componente non viene generato; i sorgenti restano disponibili. Le modifiche online richiedono build e deploy. Dettagli in [Risorse](docs/risorse.md#feature-flags).

## Idee struttura

Proposte per le funzionalità definitive

| Ambito | Proposta |
| --- | --- |
| Homepage | Hero fotografica e feed degli ultimi tre articoli già presenti; valutare in futuro eventuali selezioni editoriali. |
| Galleria Fotografica | Pagina semplice e statica, a sinistra un menu che mostra e divide le foto su ogni progetto/categoria?/luogo e la pagina che le mostra ha tante miniature, abbastanza grandi, premendo la miniatura la foto diventa fullscreen(lightbox); PhotoSwipe, libreria JavaScript per la gestione di questa funzione. Il caricamento delle foto è gestito tramite CMS che auto adatta la pagina con le nuove miniature e si aggiorna automaticamente. |
| Articoli | Come nella galleria, a sinistra elenco con gli articoli publicati e quando premi ti mostra l'articoli; ordinabili per alfabetico o data di publicazione. Magari una pagina base prima di selezionare il singolo articolo, con spiegazione e feed articoli. Per le foto duplicate tra articoli e galleria, metetre un sistema che richiama nell'articolo la foto della galleria, cosi evitiamo doppi caricamenti. |
| Framework | Hugo già adottato; mantenere generazione statica, template originali e dipendenze limitate. |
| CMS | Pages CMS, meno complicato di Decap CMS da usare e installare, sistema di autenticazione con GitHub integrato. Perfetto per la gestione di articoli e galleria fotografica. |
| Contatti | Aggiungere modulo email a pagina dedicata? |
| Ricerca | Implementare futuro motore di ricerca, con icona (che apre barra bianca) (vedi screenshot) su header e sezione ricerca sulla sidebar di esplora? |

## Checklist — Sviluppo e pubblicazione di Polesine Fantasma

Attività tecniche e operative per realizzare il sito. Le proposte di contenuto e funzionalità da valutare sono raccolte separatamente nelle idee.

### 1. Progettazione e sviluppo

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Home | **Implementati** | Migliorare la mappa e rendila dinamica. Aggiungi didascalia sulla hero, vedi [Ispirazioni](docs/inspiration.md). |
| Feed e pagina Esplora | **Implementati** | Completare la revisione editoriale e la verifica nei principali browser di archivio, filtri e articoli. |
| CMS | **Work in Progress**  | Implementato Pages CMS, risultato non soddisfacence, alla ricerca di alternativa. Inizialmente le immagini saranno tutte locali al sito. Caricare solo immagini necessarie all'articolo in WebP, Hugo gestisce le anteprime e resto. |
| Articoli di prova | **Implementati** | Sei demo, inclusa Fabbris con fonti e crediti. Verificare o sostituire i dati di prova prima della pubblicazione; tag conservati per usi futuri. |
| Galleria e NAS | **Da pianificare** | Quando la struttura funzionerà, configureremo la gestione condivisa delle fotografie su Unraid e l'accesso pubblico alle versioni grandi. Poi collegheremo la lightbox sia agli articoli sia alla galleria. |
| Preparare contenuti e risorse | **Work in Progress** | Selezionare testi, fotografie e materiali, verificandone provenienza e diritti d'uso. |
| ~~Email~~ | Completo | ~~Collegare Gmail a Alias Cloudflare per miglior sicurezza, abilita "Email Address Obfuscation" di Cloudflare.~~ |
| RSS | **Da finalizzare** | Feed generale in `/index.xml`, comprendente anche le informative, e feed degli articoli in `/esplora/index.xml`. Definire il collegamento definitivo e verificare gli URL sul dominio di produzione. |

### 2. SEO e indicizzazione

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Metadati SEO | **Parziale** | Title presente e description globale condivisa; predisporre descrizioni per pagina, canonical e URL definitivi, **togliendo o limitando il noindex globale prima della pubblicazione.** |
| Sitemap e robots.txt | **Da verificare** | Sitemap ora disabilitata; rivalutarla per la produzione. Controllare anche il robots.txt gestito da Cloudflare, senza bloccare la lettura del noindex sul test. |
| Dati strutturati JSON-LD | **Da implementare** | Nessun JSON-LD nel template attuale; definire dati pertinenti e coerenti con i contenuti. |
| Anteprime social | **Da implementare** | Aggiungere Open Graph e Twitter Card con titolo, descrizione e immagine corretti. |
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
| Consenso e servizi esterni | **Da verificare** | Allineare la Privacy ai servizi effettivamente attivi e rivalutare il consenso per nuove integrazioni. |
| Pagina Disclaimer | **Check finale** | `/disclaimer/` e collegamento nel footer presenti; verificare il testo prima della pubblicazione. |

### 5. Qualità tecnica e prestazioni

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| Responsive e compatibilità | **Verifiche locali parziali** | Completare i controlli locali Edge con test nei principali browser e su dispositivi fisici. |
| Accessibilità | **Da verificare** | HTML semantico, navigazione da tastiera, contrasto, etichette accessibili e gestione delle eventuali animazioni. |
| Immagini, font e risorse | **Da verificare** | Dimensioni, formati e caricamento ottimizzati; nessuna risorsa mancante o layout shift evitabile. |
| Preload dei font | **Implementato** | Special Elite e Source Sans 3 precaricati nel head condiviso; valutare prestazioni e stabilità visiva su caricamento reale. |
| JavaScript, link e percorsi | **Da verificare** | Nessun errore rilevante in console, collegamento rotto o comportamento imprevisto. |
| Lighthouse e Core Web Vitals | **Da pianificare** | Test mobile e desktop eseguiti; LCP, CLS e INP valutati e criticità documentate. |
| Pagina 404 | **Implementato** | Template nativo `layouts/404.html`, senza hero fotografica; da verificare a deploy effettivo. |
| Audit tecnico e sicurezza | **Da pianificare** | Revisione di codice, configurazioni, dipendenze e dati sensibili, con problemi prioritari risolti o documentati. |
| Logo BIMI | **Incompleto** | Verificare il problema DMARC segnalato e i requisiti del servizio prima di intervenire. |

### 6. Verifica finale

| Attività | Stato | Criterio di completamento |
| --- | --- | --- |
| ~~Predisporre la coming soon~~ | Completa | ~~Pagina provvisoria con logo, sfondo, presentazione e annuncio di prossima apertura.~~ |
| Verifica finale in produzione | **Da pianificare** | Dominio, HTTPS, redirect, SEO, 404, link, risorse, mobile e anteprime social verificati sul sito pubblico. |

## Idee per il sito e funzionalità da valutare

Spunti iniziali da discutere, non requisiti approvati né attività già pianificate. Le idee confermate potranno diventare attività di sviluppo.
Vedi [Inspiration](docs/inspiration.md) per siti web di riferimento.

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
