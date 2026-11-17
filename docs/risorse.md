# Risorse e manutenzione tecnica

Stato del progetto e attività aperte sono nel [README](../README.md). Lavorare sui sorgenti Hugo; `public/` e `resources/` sono generati, ignorati da Git e non vanno modificati manualmente.

## Mappa dei file

| File | Responsabilità |
| --- | --- |
| `hugo.toml` | Titolo, lingua, descrizione e feature flags in `[params.features]`. `baseURL = '/'` serve all’anteprima; usare l’URL reale per la pubblicazione. |
| `layouts/baseof.html` | Documento HTML, metadati, CSS/JS minificati con fingerprint, inclusione di header/footer e inclusione condizionale del triangolo Wikipedia. |
| `layouts/home.html` | Homepage con feed, link all’archivio e fascia Chi sono/Contatti; testi provvisori e collegamenti social modificabili qui. |
| `content/esplora.md`, `layouts/esplora.html` | Pagina coming soon di Esplora, destinazione comune del menu e del link all’archivio. |
| `layouts/partials/header.html` | Hero con sottotitolo, immagini responsive, navigazione, selettore tema e interfaccia di ricerca. |
| `layouts/partials/hero-image.html`, `layouts/partials/hero-image-data.html` | Elenco automatico delle foto hero, URL responsive e scelta immediata nel browser con esclusione dell’ultima foto. |
| `layouts/partials/recent-posts.html` | Feed e miniature dimostrative; unico punto in cui collegare in futuro gli articoli Markdown. |
| `data/demo.toml` | Titoli, estratti e date dei sei esempi; la home mostra i tre più recenti ordinati per `date` decrescente. Non genera pagine articolo. |
| `layouts/partials/footer.html` | Footer con copyright, crediti e collegamenti di servizio. |
| `layouts/partials/icon.html`, `static/icons.svg` | SVG locali condivisi attraverso uno sprite; URL versionato con hash del contenuto per aggiornare la cache quando cambiano i simboli. Niente librerie o richieste esterne. |
| `static/fonts/` | Special Elite (licenza Apache 2.0), Source Sans 3 variabile normale/corsivo, Oswald variabile normale (200-700) e Inter variabile normale (licenza SIL OFL), in WOFF2 latino. Font e licenze conservati localmente, senza richieste a Google durante la visita. |
| `assets/css/main.css` | Layout, colori, font locali, breakpoint, focus e animazione della ricerca. |
| `assets/js/main.js` | Comparsa del titolo, selettore tema, apertura/chiusura della ricerca, coordinamento del menu mobile e copia dell’email negli appunti. |
| `assets/images/hero/*.webp` | Foto casuali della home: aggiungere o rimuovere WebP direttamente nella cartella e ricostruire il sito. |
| `assets/images/hero/background.webp` | Foto precedente, inclusa nell’estrazione e usata normalmente come fallback, sfondo delle altre pagine e sorgente delle miniature dimostrative. |
| `static/images/hero-fallback.webp` | Copia di sicurezza indipendente dalla cartella hero: mantiene il fallback anche rimuovendo tutte le foto, compresa `background.webp`. |
| `assets/images/logo.png` | Logo originale, 2300 × 2103, servito direttamente senza ridimensionamento o conversione Hugo. Le dimensioni visualizzate sono definite dal CSS dell’header. |
| `.gitignore` | Esclude output Hugo e cartella temporanea delle verifiche locali. |

## Font utilizzati

| Font | Dove viene usato |
| --- | --- |
| Special Elite | Nome del sito accanto al logo e titolo principale nell’hero. |
| Source Sans 3 | Testi generali, titoli, estratti e date del feed, campo di ricerca e sottotitolo dell’hero (in corsivo). |
| Oswald | Voci di navigazione e pulsante Menu sui dispositivi mobili. |
| Inter | Tutti i testi e i collegamenti del footer. |

### Feature flags

Le feature flags sono interruttori booleani nella configurazione nativa di Hugo: permettono di includere o escludere funzionalità durante la compilazione. L’unica disponibile è il triangolo con collegamento a Wikipedia e scritta «La Storia».

Modificare [hugo.toml](hugo.toml), nella radice del progetto (`C:\Users\Phil\Desktop\polesinefantasma-website\hugo.toml`): cercare la chiave `wikipediaTriangle` nella sezione `[params.features]`, cioè `params.features.wikipediaTriangle`, attualmente alla **riga 11**. Il numero è un riferimento attuale: se cambia, cercare il nome della chiave.

```toml
[params.features]
  wikipediaTriangle = false
```

Usare `wikipediaTriangle = false` per disabilitarlo (valore iniziale) oppure `wikipediaTriangle = true` per abilitarlo, senza virgolette. Con `false`, triangolo, scritta e tooltip non vengono generati nell’HTML; il codice resta disponibile per riattivarli. Per rendere la modifica visibile online servono una nuova compilazione e un deploy.

### Avvio e riavvio del server locale Hugo

In PowerShell, avviare dalla radice del progetto:

```powershell
Set-Location 'C:\Users\Phil\Desktop\polesinefantasma-website'
hugo server -D
```

Anteprima su `http://localhost:1313/`. VS Code avvia già lo stesso comando all’apertura della cartella tramite `.vscode/tasks.json`: non avviare un secondo server sulla stessa porta. Per arrestare quello manuale usare `Ctrl+C`, poi rieseguire `hugo server -D` per riavviarlo. Per la task VS Code usare **Tasks: Terminate Task**, quindi **Tasks: Run Task → Hugo: server di sviluppo**.

Il server Hugo rileva automaticamente il salvataggio di `hugo.toml` e ricompila anche quando cambia il feature flag: **non serve un riavvio manuale**. La build locale senza server si esegue dalla stessa directory con `hugo build`, con output in `public/`; non pubblica il sito.

### Pubblicazione tramite GitHub e Cloudflare Pages

Le modifiche locali non vengono pubblicate automaticamente. Nel workflow con integrazione GitHub e deploy automatici abilitati su Cloudflare Pages, occorre creare un commit e fare push sul branch collegato: il push avvia automaticamente compilazione e deploy. Non serve avviare manualmente un deploy da Cloudflare, salvo problemi particolari.

Il repository locale usa `main`, che segue `origin/main`. L’esempio seguente, dalla radice del progetto, usa Conventional Commits e presuppone che `main` sia il branch collegato a Pages; il collegamento e i deploy automatici vanno verificati nelle impostazioni Cloudflare, non sono definiti nel repository.

```powershell
git add hugo.toml layouts/baseof.html README.md docs/risorse.md
git commit -m "feat(history): add Wikipedia triangle feature flag"
git push origin main
```

## Anteprima automatica in VS Code

La cartella deve essere considerata attendibile e le task automatiche devono essere consentite. Se VS Code le blocca, usare **Tasks: Manage Automatic Tasks in Folder → Allow Automatic Tasks in Folder**, quindi riaprire la cartella. Hugo deve essere disponibile nel PATH di VS Code. Un server avviato manualmente è indipendente dalla task: fermarlo prima di aprire il progetto per evitare conflitti sulla porta 1313. Per arrestare la task senza chiudere VS Code usare **Tasks: Terminate Task**.

## Modifiche comuni

- L’angolo storico è in `layouts/partials/history-corner.html` e usa il JPG originale `assets/images/il-polesine.jpg`, ritagliato solo via CSS. Il wrapper `.page-surface` in `baseof.html` racchiude header e contenuti; la guida assoluta `.history-rail` permette allo sticky di fermarsi a filo del bordo superiore del footer senza JavaScript. Il triangolo misura 112 px (76 px sotto 640 px), si solleva al mouse e collega Wikipedia in una nuova scheda. Tooltip e focus sono gestiti via CSS; la transizione è disattivata con movimento ridotto. La mappa SVG della home è indipendente.
- La fascia della mappa in `layouts/home.html` precede Chi sono e usa `assets/images/mappa-polesine.svg`, servito con fingerprint. Il fondo usa `--section-bg`: `#F6F4EF` nel tema chiaro e `#3D4142` nello scuro; Chi sono/Contatti hanno fondo `#E8E5DE` e testo `#383838` nel tema chiaro, fondo `#454A4B` e testo bianco nello scuro. La sagoma della copia SVG usa `#BFBCB3`. La mappa è illustrativa, larga al massimo 1600 px; sotto 960 px mantiene una larghezza minima di 1128 px per le etichette, con scorrimento orizzontale nel solo contenitore, accessibile anche da tastiera. Conservare proporzioni e dimensioni dell’immagine nel template se si sostituisce l’SVG.
- Il **velo della hero** è definito da `.hero::before` in `assets/css/main.css`: gradiente verticale a 180°, colore `rgb(15 24 24)` (scuro con lieve tonalità verde), opacità 68% in alto (posizione 0%), 40% alla posizione 40% e 35% in basso (100%). Si applica a tutte le foto in entrambi i temi e migliora la leggibilità di menu, titolo e sottotitolo.
- Modificare `data/demo.toml` per sostituire gli esempi del feed. `date` usa `AAAA-MM-GG`; `displayDate` è l’etichetta italiana visibile. Da 960 px, il contenitore del feed condivide con Chi sono/Contatti la classe `.content-layout--home`, con larghezza massima 1180 px, foto da 260×173 px, titoli da 30 px, descrizioni da 16 px con interlinea 28 px e metadati da 16 px. Restano 18 px dopo il titolo, 16 px dopo la descrizione e 32 px di padding verticale (sopra il primo articolo: 0); le misure mobile e gli altri contenitori restano separati. Le barre sotto i titoli sono pseudo-elementi `h2::after` in ocra `#b58b20`: si estendono con `transform` al passaggio del mouse o al focus interno, senza cambiare l’ingombro. La transizione dura 220 ms ed è attiva solo senza preferenza per il movimento ridotto; non richiede JavaScript.
- Nella home da 960 px di larghezza, `.hero--home` usa `calc(clamp(480px, calc(100vh - 440px), 1000px) * .94)`: riduce del 6% l’altezza desktop precedente, senza imporre la visibilità di due articoli completi. Titolo e sottotitolo condividono `--hero-text-scale`, interpolata sull’altezza CSS del viewport: 1 a 1080 px, 1,10 a 1440 px, 1,25 da 2160 px; senza supporto alle divisioni tra lunghezze in `calc()` conservano le dimensioni precedenti. Sotto 960 px resta il layout mobile.
- Non collegare i titoli a URL inesistenti. Quando saranno approvati i contenuti reali, sostituire la sorgente del partial del feed con le pagine Markdown e aggiungere il template articolo.
- Email e icone social di Contatti sono in `layouts/home.html`; i collegamenti social dell’header restano nel relativo partial. La busta copia l’indirizzo negli appunti con Clipboard API (HTTPS o localhost), mostrando «Copiato!» per due secondi solo dopo il successo; un errore mostra «Copia non riuscita». Senza JavaScript o API disponibile resta il link `mailto:info@polesinefantasma.it`. La fascia comune usa i colori definiti in `assets/css/main.css`. Da 960 px il suo contenitore `.content-layout--home` è allineato al feed: larghezza massima 1180 px e margini laterali di almeno 32 px. Le regole sotto 960 px restano quelle di `.content-layout`; il contenitore della mappa rimane indipendente, con massimo 1600 px.
- Le foto casuali vanno in `assets/images/hero/` in formato `.webp`: Hugo genera l’elenco e le varianti a 768, 1440 e 2560 px (qualità 84, senza ingrandimenti), includendo il sorgente quando ha una larghezza diversa. Le sette foto iniziali sono state convertite in WebP qualità 86, larghezza massima 3840 px, senza conservare JPG/PNG fotografici nel progetto. Dimensioni e `srcset` seguono automaticamente la foto. Conservare `static/images/hero-fallback.webp` come copia di sicurezza: viene usata se manca `hero/background.webp`, anche per le miniature dimostrative. Mantenere il logo in PNG e preservarne la trasparenza.

La prima build elabora le fotografie; le successive riutilizzano la cache Hugo. Il logo resta il PNG originale: il segno è bianco su fondo trasparente e va osservato su fondo scuro. Eventuali vecchi `logo_hu_*.png` nelle directory generate sono derivati in cache, non il sorgente da modificare; l’header non li richiama più. Non occorre un convertitore esterno.

Il footer usa Inter locale, richiesto quando utilizzato, e padding verticale di 10 px. La griglia ha colonne laterali simmetriche per centrare esattamente, in orizzontale e verticale, TORNA ALLA HOME: il link `#home` riporta all’inizio della pagina e condivide font e dimensione di Privacy / Disclaimer (13 px). Il credito a 11 px è centrato sotto il copyright e apre `https://lostman.cc` in una nuova scheda; Legal Information usa lo stesso stile sotto le informative. Sui display stretti le tre colonne consentono al testo di andare a capo senza sovrapposizioni.

## Interazioni e accessibilità

Il tema iniziale è chiaro, indipendentemente dalle preferenze di sistema. La chiave `polesine-theme` in `localStorage` conserva la scelta. Senza JavaScript il pulsante resta nascosto. 

La home sceglie la foto con uno script inline nell’header, prima di assegnare `src`/`srcset`: un `<template>` inerte evita di scaricare anche il fallback. `sessionStorage` conserva l’ultima foto nella chiave `polesine-hero-last`, esclusa prima dell’estrazione se ci sono almeno due WebP. Con una foto la scelta è fissa; con cartella vuota o JavaScript disattivato compare il fallback. Se il browser blocca `sessionStorage`, la scelta casuale funziona ma non può garantire l’assenza di ripetizioni tra refresh.

Il menu mobile usa `details/summary`, con righe ampie e apertura nativa anche senza JavaScript. Menu e ricerca non si sovrappongono quando JavaScript è attivo. Chi sono e Contatti puntano alle ancore della home anche dalle altre pagine; l’header non è fisso e le sezioni hanno `scroll-margin-top: 24px`. Lo scorrimento fluido è attivo solo senza preferenza per il movimento ridotto. Senza JavaScript la ricerca è nascosta e l’email resta un collegamento `mailto:`.

## Build e Cloudflare Pages

Usare Hugo **0.169.0 Extended** anche in Cloudflare Pages per mantenere coerenti template e pipeline delle immagini. Non occorrono installazioni npm.

| Impostazione Pages | Valore |
| --- | --- |
| Directory del progetto | Radice del repository |
| Comando di build | `hugo build --baseURL "$CF_PAGES_URL/"` per l’ambiente di test |
| Output | `public` |
| Variabile di ambiente | `HUGO_VERSION=0.169.0` |

Per il dominio definitivo passare il suo URL assoluto con `--baseURL` oppure aggiornare `hugo.toml`. L’URL assoluto serve anche ai collegamenti del feed RSS. Verificare la disponibilità della versione Hugo scelta nell’ambiente Pages prima del primo deploy. Questa configurazione è predisposta, non applicata a un account Cloudflare.

L’anteprima grafica include `noindex, nofollow` in `layouts/baseof.html` e disabilita la sitemap in `hugo.toml`: rivalutare entrambi prima della pubblicazione definitiva. Le informative e le sezioni future restano testo segnaposto; il feed RSS nativo non contiene gli esempi di `data/demo.toml`.
