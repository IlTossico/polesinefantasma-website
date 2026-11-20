# Risorse e manutenzione tecnica

Il [README](../README.md) contiene panoramica, stato e attività aperte. Questo documento descrive i sorgenti e le operazioni di manutenzione. `public/`, `resources/` e `.local-preview/` sono output o strumenti locali ignorati da Git: non usarli come sorgenti del sito.

## Mappa dei file

| File o directory | Responsabilità |
| --- | --- |
| `hugo.toml` | Titolo, lingua, descrizione, funzionalità opzionali e tipi di output disabilitati. |
| `layouts/baseof.html` | Head condiviso, metadati, favicon, CSS/JS minificati con fingerprint, header/footer e inclusione condizionale del triangolo storico. |
| `layouts/home.html` | Homepage, mappa, testi di Chi sono/Contatti e collegamenti social. |
| `layouts/coming-soon.html` | Template unico per Esplora e Galleria, con URL distinti. |
| `layouts/informational.html` | Template delle informative: H1 dal front matter e contenuto Markdown. |
| `layouts/404.html` | Errore nativo Hugo, generato come `public/404.html`; nessun contenuto Markdown dedicato. |
| `content/esplora.md`, `content/galleria.md` | Pagine con `layout = 'coming-soon'`. |
| `content/privacy.md`, `content/disclaimer.md` | Testi provvisori con `layout = 'informational'`. |
| `layouts/partials/header.html`, `footer.html` | Componenti condivisi: navigazione, tema, social, copyright e link alle informative. |
| `layouts/partials/use-home-hero.html` | Seleziona la hero completa per homepage, Coming Soon e informative. La 404 usa un header compatto. |
| `layouts/partials/hero-image.html`, `hero-image-data.html` | Foto casuali, fallback, dimensioni e varianti responsive. |
| `layouts/partials/recent-posts.html`, `data/demo.toml` | Sei esempi ordinati per data decrescente; in home compaiono i primi tre. Non generano pagine articolo. |
| `layouts/partials/history-corner.html`, `assets/images/il-polesine.jpg` | Triangolo storico opzionale con immagine JPG e collegamento Wikipedia. |
| `assets/css/main.css`, `assets/js/main.js` | Stili e interazioni vanilla condivisi. Nessuna dipendenza frontend. |
| `assets/images/hero/`, `assets/images/mappa-polesine.svg`, `assets/images/logo.png` | Foto WebP, mappa illustrativa e logo PNG originale. |
| `static/images/hero-fallback.webp` | Fallback fotografico indipendente dalla cartella delle foto casuali. |
| `layouts/partials/icon.html`, `static/icons.svg` | Sprite SVG locale; URL versionato con hash del contenuto. |
| `static/favicon.svg` | SVG originale pubblicato in `/favicon.svg`, richiamato una volta nel head condiviso; nessun PNG/ICO aggiuntivo. |
| `static/fonts/` | Font WOFF2 e relative licenze, senza richieste a servizi esterni. |
| `static/_headers` | Header Cloudflare Pages, copiati in `public/_headers`; noindex HTTP limitato all’host di test. |
| `.vscode/tasks.json`, `.gitignore` | Avvio automatico di Hugo ed esclusione di output/cache/verifiche locali. |

## Font utilizzati

| Font | Impiego |
| --- | --- |
| Special Elite | Nome del sito nell’header, titolo della hero e messaggio principale della 404. Licenza Apache 2.0. |
| Source Sans 3 | Contenuti, titoli delle anteprime, sottotitoli delle informative e sottotitolo corsivo della hero. Variabile normale/corsivo, licenza SIL OFL. |
| Oswald | Menu, link all’archivio, titoli Chi sono/Contatti e informative, Coming Soon, numero 404, ritorno alla home nella 404 e scritta «La Storia». Variabile 200–700, licenza SIL OFL. |
| Inter | Footer. Variabile 100–900, licenza SIL OFL. |

I file Roboto presenti in `static/fonts/` non sono richiamati dal CSS attuale. Non aggiungere font remoti per sostituire quelli locali.

## Feature flags

Interruttori booleani della configurazione nativa Hugo, valutati durante la build. L’unica funzionalità opzionale è il triangolo Wikipedia con scritta «La Storia».

File: [hugo.toml](../hugo.toml), cioè `C:\Users\Phil\Desktop\polesinefantasma-website\hugo.toml`. La chiave completa è `params.features.wikipediaTriangle`, attualmente alla **riga 11**: il numero è un riferimento attuale, quindi cercare il nome della chiave.

```toml
[params.features]
  wikipediaTriangle = false
```

`wikipediaTriangle = false` disabilita la funzionalità, `wikipediaTriangle = true` la abilita; usare booleani senza virgolette. Con `false`, triangolo, scritta e tooltip non sono generati nell’HTML. Partial, JPG e CSS restano disponibili. La 404 lo esclude sempre.

Il server rileva il salvataggio di `hugo.toml` e ricompila senza riavvio manuale. Per rendere la modifica visibile online sono necessari una nuova build e un deploy.

## Anteprima automatica in VS Code

La task **Hugo: server di sviluppo** esegue `hugo server -D` dalla radice del workspace, con `runOn: folderOpen` e una sola istanza della task consentita.

Servono Hugo nel PATH, cartella attendibile e autorizzazione alle task automatiche. Se necessario usare **Tasks: Manage Automatic Tasks in Folder → Allow Automatic Tasks in Folder**. Per fermare/riavviare la task usare **Tasks: Terminate Task** e **Tasks: Run Task**; un server manuale è indipendente dalla task. Non avviarne due sulla porta 1313: Hugo può scegliere un’altra porta, indicata nel terminale.

La build si esegue con `hugo build`; le prime elaborazioni fotografiche sono più lente, le successive usano la cache. Nessun comando Hugo locale pubblica automaticamente il sito.

## Modifiche comuni

### Pagine e testi

- **Homepage:** cambiare i testi di Chi sono/Contatti e i social in `layouts/home.html`. Le voci del menu puntano alle ancore della home anche dalle altre pagine.
- **Anteprime:** modificare titoli, estratti e date in `data/demo.toml`; `date` usa `AAAA-MM-GG`, `displayDate` è l’etichetta visibile. Per gli articoli reali sostituire la sorgente del partial e aggiungere i template delle pagine; non collegare titoli a URL inesistenti.
- **Esplora e Galleria:** cambiare il solo `layout` e contenuto della pagina da sostituire. Il template Coming Soon lascia un messaggio Oswald su fondo bianco in entrambi i temi e mantiene il footer a fondo viewport quando il contenuto è breve.
- **Privacy Policy e Disclaimer:** sostituire i segnaposto dopo il front matter `+++`, mantenendo `layout = 'informational'`; `title` genera l’H1 e `##` genera gli H2. La colonna massima è 760 px, il fondo segue il tema e il footer resta nel flusso con testi lunghi. Non inserire un secondo H1 nel Markdown.

Le pagine informative usano un paragrafo per il titolo del sito nella hero e un H1 nel contenuto. La classe `.hero-heading` e il selettore `.hero .title-ink` mantengono stile e animazione condivisi senza dipendere dal tag del titolo.

### Hero e fotografie

La hero completa è condivisa da home, Coming Soon e informative. Da 960 px `.hero--home` usa `calc(clamp(480px, calc(100vh - 440px), 1000px) * .94)`: circa 451–940 px; a 1080 e 1440 px di altezza del viewport misura rispettivamente circa 602 e 940 px. Non impone la visibilità di due articoli completi. Sotto 960 px conserva le regole da 390 px di altezza; sotto 640 px usa 340 px.

Titolo e sottotitolo condividono `--hero-text-scale`: 1 a 1080 px, 1,10 a 1440 px e 1,25 da 2160 px. La scala richiede il supporto CSS alle divisioni tra lunghezze; il fallback mantiene le misure di base. Le immagini usano `object-fit: cover`, senza deformazioni.

Il velo `.hero::before` è un gradiente a 180° di `rgb(15 24 24)`, con opacità 68% in alto, 40% alla posizione 40% e 35% in basso. È condiviso dai due temi.

Aggiungere o rimuovere foto `.webp` in `assets/images/hero/` e ricompilare. Hugo genera varianti a 768, 1440 e 2560 px in qualità 84, senza ingrandire, includendo il sorgente quando ha una larghezza diversa. Dimensioni e `srcset` sono ricavati dalle immagini. La selezione avviene subito nell’header: un `<template>` inerte evita di scaricare anche una foto non scelta.

`sessionStorage` conserva l’ultima foto in `polesine-hero-last`, esclusa dalla scelta se ce ne sono almeno due. Senza storage la casualità resta, ma le ripetizioni sono possibili. Con una sola foto la scelta è fissa; senza foto o senza JavaScript si usa il fallback. `hero/background.webp` è il fallback preferito e la sorgente delle miniature; conservare `static/images/hero-fallback.webp` come sicurezza se manca anche quel file.

### Feed, mappa e Contatti

| Elemento | Regole attuali |
| --- | --- |
| Feed e Chi sono/Contatti | Da 960 px condividono `.content-layout--home`: massimo 1180 px e margini laterali di almeno 32 px. Il contenitore della mappa rimane separato. |
| Anteprime desktop | Foto 260×173 px, titoli 30 px, descrizioni 16 px con interlinea 28 px, metadati 16 px. Spazio dopo titolo 18 px, dopo descrizione 16 px, padding verticale 32 px; sopra il primo articolo 0. |
| Anteprime responsive | Sotto 960 px foto larghe 190 px; sotto 640 px foto da 100 px e titoli da 25 px. Conservare le regole mobile separate. |
| Barre ocra | `h2::after`, colore `#b58b20`, altezza 3 px: larghezza visibile 56 px a riposo e 112 px in hover/focus interno, con `transform: scaleX(.5)` → `scaleX(1)`. Transizione 220 ms senza spostamenti del layout. |
| Mappa | SVG 2400×921, massimo 1600 px; margini di almeno 32 px desktop e 20 px sotto 960 px. Su mobile il disegno mantiene una larghezza minima di 1128 px, con scorrimento nel solo `.map-scroll`, accessibile da tastiera. |
| Contatti | Titoli Chi sono/Contatti in Oswald; cinque icone, su mobile fino a tre nella prima riga e due nella seconda, centrate, entro 240 px. Cerchi 80 px desktop/64 px mobile; simboli 38/32 px. |

La mappa è illustrativa: conservare dimensioni e proporzioni nel template. Fondo mappa `--section-bg`: `#f6f4ef` chiaro e `#3d4142` scuro; sagoma SVG `#bfbcb3`. La fascia Chi sono/Contatti usa fondo `#e8e5de` e testo `#383838` in chiaro, fondo `#454a4b` e testo bianco in scuro.

### Logo, icone, hover e footer

Mantenere il logo in PNG e preservarne la trasparenza. L’header usa il sorgente originale 2300×2103 senza conversione Hugo; `.brand-logo` ne usa l’alfa come maschera CSS per colorare logo e nome insieme. Senza supporto alle maschere rimane visibile il PNG bianco. Le dimensioni sono definite dal CSS; non modificare il sorgente per adattare il logo al layout.

Le icone SVG dell’header sono 25×25 px dentro controlli da 44×44 px. Il menu è in Oswald a 15,9 px, oppure 17 px da 1920 px di larghezza CSS. Sotto 1200 px passa al menu espandibile.

`--menu-hover: #f2ca68` governa hover/focus di menu desktop, nome/logo, icone dell’header, link «Tutte le esplorazioni», credito autore e link Privacy/Disclaimer del footer. Il menu espanso su fondo bianco usa `#8a6516`. La transizione del colore dura 250 ms con `ease-in-out`; non cambia font, dimensioni o posizioni. Il colore chiaro può avere contrasto ridotto su bianco o fotografie chiare: rivederlo nell’audit di accessibilità.

Il footer condiviso contiene Privacy → `/privacy/`, Disclaimer → `/disclaimer/` e il credito a `https://lostman.cc`, aperto in nuova scheda. Usa Inter, testo principale da 13 px e crediti da 11 px. Desktop: tre colonne, con «TORNA ALLA HOME» centrato. Sotto 640 px: ritorno alla home sulla prima riga, copyright a sinistra e informazioni legali a destra; «Polesine Fantasma» resta unito sotto gli anni. Non duplicare il markup del footer nelle singole pagine.

La favicon originale rimane SVG e viene copiata senza trasformazioni. Il riferimento `/favicon.svg` nel head condiviso funziona anche sulla 404 servita da URL annidati.

### Angolo storico

Il triangolo Wikipedia resta in `history-corner.html`, con JPG ritagliato solo via CSS. `.page-surface` racchiude i contenuti e `.history-rail` consente allo sticky di fermarsi sopra il footer senza JavaScript. La piega misura 112 px, oppure 76 px sotto 640 px; tooltip e focus sono in CSS. L’apertura di Wikipedia avviene in nuova scheda. Il flag non influenza la mappa SVG e la 404 esclude sempre il triangolo.

## Interazioni e accessibilità

Il tema iniziale è chiaro; `localStorage` conserva la scelta in `polesine-theme`. Le informative seguono il tema; Coming Soon e 404 mantengono il rispettivo fondo chiaro anche in modalità scura. Il pulsante tema resta nascosto senza JavaScript.

Il titolo della hero viene animato da `main.js` solo se `data-typewriter` è `pending`; rispetta il movimento ridotto. Anche transizioni ocra, barre, scorrimento fluido e piega storica rispettano `prefers-reduced-motion`. Non applicare l’animazione della hero ai titoli delle informative o al contenuto 404.

Il menu mobile usa `details/summary` e funziona anche senza JavaScript. JavaScript gestisce la chiusura tramite Escape, clic esterno o selezione di un link e sincronizza lo stato al cambio di breakpoint.

La busta dei Contatti copia `info@polesinefantasma.it` con Clipboard API, disponibile su HTTPS o localhost. Mostra «Copiato!» per due secondi dopo il successo o «Copia non riuscita» in caso di errore. Senza JavaScript/API rimane il link `mailto:`. Le ancore di sezione hanno `scroll-margin-top: 24px`; focus, nomi accessibili e dimensioni delle immagini sono gestiti nei template/CSS.

## Build e Cloudflare Pages

Usare Hugo **0.169.0 Extended**, senza installazioni npm. Le impostazioni seguenti sono il riferimento del repository; verificare nell’account Pages versione disponibile, branch collegato e deploy automatici.

| Impostazione Pages | Valore |
| --- | --- |
| Directory del progetto | Radice del repository |
| Comando di build | `hugo build --baseURL "$CF_PAGES_URL/"` per l’ambiente di test |
| Output | `public` |
| Variabile di ambiente | `HUGO_VERSION=0.169.0` |

In produzione passare il dominio assoluto corretto con `--baseURL` o aggiornare `hugo.toml`. I link del feed RSS dipendono dall’URL di build. Il feed nativo include attualmente le pagine Markdown, non gli esempi in `data/demo.toml`: va definito il feed degli articoli reali.

Il push sul branch collegato a Pages avvia il deploy se l’integrazione automatica è attiva; modifiche locali e build non pubblicano nulla. 

### Pagina 404

Il [template nativo Hugo](https://gohugo.io/templates/404/) genera `public/404.html`. L’header compatto riusa logo, menu e icone, ma non foto, titolo/sottotitolo della hero o triangolo storico. Il contenuto è centrato su `#f6f4ef` nei due temi, con numero Oswald, messaggio Special Elite e footer a fondo viewport quando il contenuto è breve. Titolo HTML e `noindex` sono specifici per `.Kind == "404"`.

In locale avviare `hugo server -D` dalla radice e aprire `http://localhost:1313/404.html` per l’anteprima, oppure un URL inesistente come `/percorso/inesistente/` per controllare la risposta di errore. Cloudflare Pages utilizza il `404.html` nella radice dell’output per le richieste non trovate, senza fallback SPA: vedere [Serving Pages](https://developers.cloudflare.com/pages/configuration/serving-pages/#not-found-behavior). Non sono previste regole `_redirects` o configurazioni aggiuntive. Dopo il deploy verificare un percorso inesistente annidato con `curl.exe -I https://DOMINIO-DEL-SITO/percorso/inesistente/`: deve rispondere HTTP 404, senza redirect; aprirlo anche nel browser per controllare pagina e risorse. L’accesso diretto a `/404.html` non dimostra lo stato HTTP di un URL inesistente. 

### Indicizzazione provvisoria

**Da rivedere prima della pubblicazione definitiva.** Il blocco globale HTML e quello HTTP del solo test sono indipendenti:

| Sorgente | Ambito | Intervento prima della pubblicazione |
| --- | --- | --- |
| `layouts/baseof.html` | `noindex, nofollow` su tutte le pagine, `noindex` sulla 404, anche se la build viene servita dal dominio definitivo. | Togliere o rendere condizionale il blocco sulle pagine da indicizzare; conservare `noindex` sulla 404 e una protezione per lo sviluppo. |
| `static/_headers` | Pattern `https://test.polesinefantasma.it/*`, con `X-Robots-Tag: noindex, nofollow`; nessuna regola per dominio principale, www o `pages.dev`. | Mantenere se il test resta attivo; modificare/rimuovere se il suo host cambia o viene dismesso. Non allargare la regola alla produzione. |
| `hugo.toml` | Sitemap disabilitata in `disableKinds`, `baseURL = '/'`. | Rivalutare la sitemap e usare l’URL assoluto della destinazione. |

Il file `static/_headers` viene copiato in `public/_headers` senza trasformazioni; è interpretato da [Cloudflare Pages](https://developers.cloudflare.com/pages/configuration/headers/), non da `hugo server`. Non contiene regole globali `/*`: il vincolo è sul solo host test. Le restrizioni nei metatag restano invece globali finché non vengono modificate esplicitamente.

Non aggiungere `Disallow: /` al gruppo generale dei crawler sul test: impedirebbe la lettura del noindex. Non c’è un robots.txt nei sorgenti; verificare anche quello eventualmente gestito da Cloudflare e le regole impostate nel pannello.

Dopo il deploy eseguire:

```powershell
curl.exe -I https://test.polesinefantasma.it/
curl.exe -I https://test.polesinefantasma.it/privacy/
curl.exe -I https://polesinefantasma.it/
curl.exe -I https://www.polesinefantasma.it/
```

Le prime due risposte devono contenere `X-Robots-Tag: noindex, nofollow`; i domini principali non devono riceverlo da questa regola. Verificare anche il robots.txt e un errore 404 sul test. La presenza di `public/_headers` nella build non prova che l’intestazione sia già applicata online.

Identificare nel pannello Pages gli URL effettivi `pages.dev` e controllarli separatamente con `curl.exe -I`. Le [preview includono normalmente `X-Robots-Tag: noindex`](https://developers.cloudflare.com/pages/configuration/preview-deployments/#preview-indexing-by-search-engines); non presumere la stessa protezione per `<progetto>.pages.dev`, che può essere l’URL di produzione del progetto. Nessuna loro regola viene modificata automaticamente.
