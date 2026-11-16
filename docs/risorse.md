# Risorse e manutenzione tecnica

Stato del progetto e attività aperte sono nel [README](../README.md). Lavorare sui sorgenti Hugo; `public/` e `resources/` sono generati, ignorati da Git e non vanno modificati manualmente.

## Mappa dei file

| File | Responsabilità |
| --- | --- |
| `hugo.toml` | Titolo, lingua e descrizione. `baseURL = '/'` serve all’anteprima; usare l’URL reale per la pubblicazione. |
| `layouts/baseof.html` | Documento HTML, metadati, CSS/JS minificati con fingerprint e inclusione di header/footer. |
| `layouts/home.html` | Homepage con feed a tutta larghezza, senza sidebar. |
| `layouts/partials/header.html` | Hero con sottotitolo, immagini responsive, navigazione, selettore tema e interfaccia di ricerca. |
| `layouts/partials/recent-posts.html` | Feed e miniature dimostrative; unico punto in cui collegare in futuro gli articoli Markdown. |
| `data/demo.toml` | Titoli, estratti e date dei sei esempi, mostrati nell’ordine del file. Non genera pagine articolo. |
| `layouts/partials/footer.html` | Social, conferma email dimostrativa e footer. |
| `layouts/partials/icon.html`, `static/icons.svg` | SVG locali condivisi attraverso uno sprite; URL versionato con hash del contenuto per aggiornare la cache quando cambiano i simboli. Niente librerie o richieste esterne. |
| `static/fonts/` | Special Elite (licenza Apache 2.0), Source Sans 3 variabile normale/corsivo, Oswald variabile normale (200-700) e Inter variabile normale (licenza SIL OFL), in WOFF2 latino. Font e licenze conservati localmente, senza richieste a Google durante la visita. |
| `assets/css/main.css` | Layout, colori, font locali, breakpoint, focus e animazione della ricerca. |
| `assets/js/main.js` | Selettore tema, apertura/chiusura della ricerca, coordinamento del menu mobile e conferma email dimostrativa. |
| `assets/images/background.jpg` | Fotografia originale fornita, 2560 × 1608; Hugo pubblica solo le versioni WebP richiamate. |
| `assets/images/logo.png` | Logo originale, 2300 × 2103, servito direttamente senza ridimensionamento o conversione Hugo. Le dimensioni visualizzate sono definite dal CSS dell’header. |
| `.gitignore` | Esclude output Hugo e cartella temporanea delle verifiche locali. |

## Font utilizzati

| Font | Dove viene usato |
| --- | --- |
| Special Elite | Nome del sito accanto al logo e titolo principale nell’hero. |
| Source Sans 3 | Testi generali, titoli, estratti e date del feed, campo di ricerca e sottotitolo dell’hero (in corsivo). |
| Oswald | Voci di navigazione e pulsante Menu sui dispositivi mobili. |
| Inter | Tutti i testi e i collegamenti del footer. |

## Anteprima automatica in VS Code

La cartella deve essere considerata attendibile e le task automatiche devono essere consentite. Se VS Code le blocca, usare **Tasks: Manage Automatic Tasks in Folder → Allow Automatic Tasks in Folder**, quindi riaprire la cartella. Hugo deve essere disponibile nel PATH di VS Code. Un server avviato manualmente è indipendente dalla task: fermarlo prima di aprire il progetto per evitare conflitti sulla porta 1313. Per arrestare la task senza chiudere VS Code usare **Tasks: Terminate Task**.

## Modifiche comuni

- Modificare `data/demo.toml` per sostituire gli esempi del feed. `date` usa `AAAA-MM-GG`; `displayDate` è l’etichetta italiana visibile.
- Nella home da 960 px di larghezza, `.hero--home` usa `max(480px, calc(100vh - 440px))`: i 440 px riservano spazio a due anteprime, padding iniziale e separatore inclusi. Rivalutare questa misura se cambia l’ingombro del feed; sotto 960 px restano le altezze mobile.
- Non collegare i titoli a URL inesistenti. Quando saranno approvati i contenuti reali, sostituire la sorgente del partial del feed con le pagine Markdown e aggiungere il template articolo.
- Modificare l’email una sola volta in `hugo.toml`: etichetta, link di fallback e JavaScript la ricavano dal template. I link social sono nei partial header e footer.
- Sostituire le immagini mantenendo i nomi oppure aggiornare `resources.Get` nell’header. Lo sfondo viene convertito in WebP a 768, 1440 e 2560 px, qualità 82/84; `srcset` sceglie la risorsa in base allo schermo. Se cambia il rapporto del sorgente aggiornare anche `width` e `height` dell’immagine hero. Mantenere il logo in PNG e preservarne la trasparenza.

La prima build elabora lo sfondo; le successive riutilizzano la cache Hugo. Il logo resta il PNG originale: il segno è bianco su fondo trasparente e va osservato su fondo scuro. Eventuali vecchi `logo_hu_*.png` nelle directory generate sono derivati in cache, non il sorgente da modificare; l’header non li richiama più. Non occorre un convertitore esterno.

Il footer usa Inter locale, richiesto quando utilizzato, e padding verticale di 10 px. La griglia ha colonne laterali simmetriche per centrare esattamente, in orizzontale e verticale, TORNA ALLA HOME: il link `#home` riporta all’inizio della pagina e condivide font e dimensione di Privacy / Disclaimer (13 px). Il credito a 11 px è centrato sotto il copyright e apre `https://lostman.cc` in una nuova scheda; Legal Information usa lo stesso stile sotto le informative. Sui display stretti le tre colonne consentono al testo di andare a capo senza sovrapposizioni.

## Interazioni e accessibilità

Il tema iniziale è chiaro, indipendentemente dalle preferenze di sistema. La chiave `polesine-theme` in `localStorage` conserva la scelta. Senza JavaScript il pulsante resta nascosto. 

Il menu mobile usa `details/summary`, con righe ampie e apertura nativa anche senza JavaScript. Menu e ricerca non si sovrappongono quando JavaScript è attivo. Senza JavaScript la ricerca è nascosta e l’email resta un collegamento `mailto:`.

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
