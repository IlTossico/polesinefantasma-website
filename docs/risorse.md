# Risorse e manutenzione tecnica

Il [README](../README.md) contiene panoramica e attività aperte. Qui sono raccolte le istruzioni di manutenzione. `public/`, `resources/` e `.local-preview/` sono output o strumenti locali ignorati da Git: non modificarli come sorgenti.

## Mappa dei sorgenti

| File o directory | Responsabilità |
| --- | --- |
| `hugo.toml` | Configurazione, lingua, funzionalità opzionali e output. |
| `.pages.yml` | Configurazione di Pages CMS: articoli, campi, immagini e conservazione dei metadati. |
| `layouts/baseof.html` | Head, metadati, CSS/JS minificati con fingerprint e struttura condivisa. |
| `layouts/home.html` | Home, mappa, Chi sono e Contatti. |
| `layouts/esplora/`, `layouts/partials/exploration.html` | Archivio, articoli, crediti e pulsante per tornare in alto. |
| `layouts/partials/exploration-pages.html`, `recent-posts.html`, `post-preview.html` | Selezione degli articoli, feed Home e anteprime condivise. |
| `layouts/partials/archive-sidebar.html`, `archive-option.html` | Filtri generati dai metadati. |
| `layouts/partials/header.html`, `footer.html`, `header-socials.html` | Navigazione, social e footer condivisi. |
| `layouts/partials/hero-image.html`, `hero-image-data.html`, `use-home-hero.html` | Foto, varianti responsive e selezione delle pagine con hero animata. |
| `layouts/_markup/render-image.html` | Immagini Markdown e didascalie. |
| `layouts/informational.html`, `coming-soon.html`, `404.html` | Informative, Galleria provvisoria ed errore 404. |
| `content/esplora/`, `archetypes/esplora.md` | Articoli Markdown e modello per nuove bozze. |
| `content/privacy.md`, `disclaimer.md`, `galleria.md` | Contenuti delle altre pagine. |
| `assets/css/main.css` | Stili responsive e animazioni. |
| `assets/js/main.js`, `archive.js` | Interazioni condivise e filtri dell’archivio. |
| `assets/images/`, `static/images/articoli/` | Risorse grafiche e fotografie degli articoli. |
| `static/images/hero-fallback.webp` | Foto di sicurezza della hero. |
| `layouts/partials/icon.html`, `static/icons.svg`, `static/favicon.svg` | Icone locali e favicon. |
| `static/fonts/` | Font WOFF2 e licenze. |
| `layouts/partials/history-corner.html` | Triangolo storico opzionale. |
| `static/_headers` | Header HTTP di Cloudflare Pages. |
| `.vscode/tasks.json`, `.gitignore` | Anteprima automatica ed esclusione degli output. |

I nomi di file abbreviati nella mappa condividono la directory del primo percorso della riga.

## Anteprima e build

Usare **Hugo 0.169.0 Extended**, senza npm:

```powershell
hugo server -D
hugo build
```

L’anteprima è normalmente su `http://localhost:1313/`; la build scrive in `public/` e non pubblica il sito. La task VS Code **Hugo: server di sviluppo** parte all’apertura della cartella se Hugo è nel PATH, la cartella è attendibile e le task automatiche sono abilitate. Evitare server duplicati; per fermarla o riavviarla usare **Tasks: Terminate Task** e **Tasks: Run Task**.

Se l’avvio automatico è disabilitato, usare **Tasks: Manage Automatic Tasks in Folder → Allow Automatic Tasks in Folder**. Un server avviato manualmente è indipendente dalla task; se la porta 1313 è occupata, controllare nel terminale quale porta usa Hugo. La prima elaborazione delle fotografie può richiedere più tempo; le build successive sfruttano la cache.

## Pagine e articoli

### Pagine condivise

- **Home:** testi, mappa e Contatti in `layouts/home.html`; anteprime condivise con Esplora.
- **Informative:** modificare i rispettivi Markdown mantenendo `layout = 'informational'`. Il campo `title` genera l’H1: non duplicarlo nel corpo.
- **Galleria:** `content/galleria.md` usa `layout = 'coming-soon'`.
- **Header e footer:** intervenire nei partial condivisi, senza duplicarne il markup nelle pagine.

### Creare un articolo

```powershell
hugo new content esplora/nome/index.md
```

Compilare l’archetipo, scrivere il contenuto e rimuovere `draft = true` per pubblicare. Mantenere il front matter **TOML delimitato da `+++`**, anche nel futuro CMS.

| Campo | Uso |
| --- | --- |
| `title`, `date`, `description`, `comune` | Titolo, anteprima, data e filtri per luogo/periodo. |
| `hero_image`, `hero_title`, `hero_subtitle` | Foto e testi della hero dell’articolo. |
| `thumbnail` | Anteprima facoltativa; ripiega su `hero_image`. |
| `hero_position`, `hero_position_mobile` | Inquadratura, ad esempio `'center 35%'`. |
| `tags` | Conservati per usi futuri; non partecipano ai filtri. |
| `photographers`, `authors` | Elenchi di nomi per fotografie e testo/ricerca. |
| `photo_date` | Periodo fotografico in italiano, ad esempio `'gennaio 2024'`. |
| `lastmod` | Aggiornamento in formato ISO, ad esempio `'2026-11-21'`. |

Il titolo del front matter resta accessibile tramite un H1 nascosto; il titolo visibile si scrive nel Markdown con `#`. Il sottotitolo usa `***grassetto e corsivo***`.

I crediti vengono generati dopo contenuto e fonti: © automatico, data di aggiornamento in italiano e voci vuote omesse. Non duplicarli nel Markdown. Per distinguere `lastmod` esplicito dal valore automatico di Hugo, il template legge il front matter TOML. Sotto 768 px le intestazioni dei crediti vanno a capo, con 10 px tra i blocchi.

Esempio di compilazione dei crediti nel front matter:

```toml
photographers = ['Nome fotografo', 'Altro fotografo']
photo_date = 'gennaio 2024'
authors = ['Nome autore']
lastmod = '2026-11-21'
```

Per ometterli usare elenchi vuoti (`[]`) e stringhe vuote (`''`). `photo_date` viene mostrato insieme ai fotografi, non come voce autonoma. Su desktop intestazione e contenuto restano sulla stessa riga quando lo spazio lo consente.

### Titoli, fonti e separatori

H1/H2/H3 mantengono parole intere e usano `text-wrap: balance`. L’H1 misura 30,685 px sotto 768 px; su desktop usa `clamp(34px, 3.5vw, 48px)`.

La barra H1 è fissa, spessa 5 px e larga quanto la riga più lunga. `main.js` misura il testo con `Range` e aggiorna `--heading-line-width` tramite `ResizeObserver`, resize e caricamento dei font. Senza JavaScript usa la larghezza del contenitore del titolo. H2/H3 condividono le barre del feed: 112 px a riposo, 224 px in hover/focus e spessore 3 px.

Le barre usano `#b58b20`, con il bordo inferiore posizionato a `bottom: -8px` rispetto al titolo. H2/H3 si estendono con `scaleX(.5)` → `scaleX(1)` in 220 ms, senza spostare il testo; H1 non ha animazioni. Le regole interessano il corpo `.exploration-story`, escludendo il titolo nascosto e la hero.

Aprire la sezione **finale** delle fonti con:

```markdown
## Fonti e riferimenti {.article-sources}
```

La classe esclude dalle barre quel titolo e tutti gli H2/H3 successivi. I separatori `---` diventano `<hr>` ocra, larghi quanto il testo, spessi 3 px e con margini verticali di 24 px.

### Immagini e didascalie

Le immagini elaborabili da Hugo possono stare in `assets/` o nel bundle accanto a `index.md`; le immagini pubblicate direttamente possono stare in `static/images/articoli/`.

```markdown
![Testo alternativo](/images/articoli/fabbris/f1.webp "Didascalia della foto")
```

Il render hook aggiunge dimensioni e varianti responsive quando disponibili. La didascalia usa il titolo tra virgolette, oppure il testo alternativo; se entrambi mancano, è omessa.

Le didascalie riprendono la tipografia della data iniziale: 16 px, interlinea 1,7 e colore attenuato. Conservare dimensioni o proporzioni delle immagini per evitare spostamenti del layout; i file in `static/` vengono pubblicati direttamente, senza la pipeline delle risorse Hugo.

### Archivio e filtri

`exploration-pages.html` esclude bozze, articoli futuri e scaduti, ordinando per data decrescente. La Home mostra i primi tre; il feed RSS degli articoli è `/esplora/index.xml`. Per eliminare le demo rimuovere i relativi Markdown e rigenerare il sito.

`archive.js` combina luogo e periodo, aggiorna conteggi e URL, ad esempio `/esplora/?luogo=Adria&periodo=2025-11`. Negli articoli i filtri rimandano all’archivio; senza JavaScript resta l’elenco completo. Sotto 768 px il pannello è inizialmente chiuso; senza JavaScript i filtri restano espansi.

Nell’archivio mobile la selezione aggiorna i risultati senza chiudere il pannello, che si richiude dalla barra dei filtri. I vecchi parametri URL `tag` vengono rimossi. Archivio e articoli condividono la griglia di `exploration.html`: da 1200 px lo spazio a destra compensa la sidebar per centrare la colonna del testo.

## Pages CMS

La configurazione `.pages.yml`, nella radice, espone solo gli articoli di `content/esplora/`, comprese le demo e gli eventuali bundle. `_index.md` è escluso; informative e altre pagine non sono gestite dal CMS. Sono configurati tutti i campi attuali, inclusi crediti, etichette e inquadrature. `demo` è in sola lettura e non controlla la pubblicazione. `settings.content.merge: true` conserva anche i campi non inclusi nello schema; il salvataggio può comunque riformattare il TOML.

### Collegamento e accessi

1. Dopo aver approvato e pubblicato manualmente la configurazione su GitHub, accedere a [Pages CMS](https://app.pagescms.org/) con GitHub.
2. Installare/autorizzare la GitHub App sul repository `IlTossico/polesinefantasma-website`, selezionando il branch da modificare. La configurazione è letta per branch.
3. Invitare il collaboratore via email dalle impostazioni dei collaboratori del CMS, oppure usare un account GitHub autorizzato al repository. L’invito va effettuato nell’app, non in `.pages.yml`.

Non servono modifiche all’integrazione Cloudflare Pages. I salvataggi CMS scrivono commit su GitHub: sul branch collegato a Cloudflare possono quindi attivare il deploy automatico già esistente. Eventuali protezioni del branch vanno verificate prima dell’uso.

### Creazione, bozze e Markdown

I nuovi articoli usano `{primary}.md`; il nome del file si sceglie alla creazione. La rinomina dal CMS è disabilitata per preservare gli URL esistenti. Il CMS propone un testo iniziale coerente con l’archetipo, ma non esegue `hugo new`: se si aggiorna il modello, mantenere allineato anche il valore iniziale di `body` in `.pages.yml`.

Attivare **Bozza** prima di salvare un articolo incompleto. Il controllo corrisponde a `draft` di Hugo; è inizialmente `false` per non trasformare in bozze gli articoli esistenti privi del campo. Per pubblicare, disattivarlo e impostare una data non futura. Non è una programmazione automatica: una data futura richiede una nuova build dopo la scadenza. Anche salvare una bozza o caricare una foto può produrre un commit e una build, ma l’articolo in bozza resta escluso dal sito.

L’editor offre modalità visuale e **Source**. Per sintassi specifica di Hugo, come `{.article-sources}`, usare Source e controllare il risultato prima del salvataggio: la normalizzazione dell’editor visuale non garantisce la conservazione delle estensioni Markdown. Per aggiungere immagini si può usare il selettore visuale oppure caricarle nella libreria CMS e inserire il percorso in Source. Il front matter resta TOML con delimitatori `+++`, necessario anche ai crediti.

### Fotografie

La libreria punta a `assets/images/`, con caricamenti predefiniti in `assets/images/articoli/` e percorsi salvati come `/images/articoli/nome.webp`. Sono ammessi WebP, JPEG e PNG; i nomi caricati sono normalizzati. La cartella contiene `.gitkeep` solo per renderla disponibile nel repository prima del primo upload.

Caricare un solo originale e riutilizzarlo per copertina, miniatura e corpo: i template esistenti risolvono già queste risorse e Hugo genera automaticamente anteprime e varianti responsive. Il CMS non ridimensiona preventivamente le foto: preferire originali già ragionevoli per il web. Non eliminare immagini ancora referenziate da altri articoli.

Le vecchie foto in `static/images/articoli/` restano al loro posto e continuano a funzionare sul sito, senza nuove elaborazioni. Non fanno parte della nuova libreria `assets/`: la loro anteprima nell’editor va verificata nell’app collegata. Nessuna migrazione automatica o archiviazione esterna è configurata.

Riferimenti ufficiali: [configurazione delle raccolte](https://pagescms.org/docs/configuration/content/), [media](https://pagescms.org/docs/configuration/media/), [conservazione dei campi](https://pagescms.org/docs/configuration/settings/), [editor Markdown](https://pagescms.org/docs/configuration/fields/rich-text/) e [collaboratori](https://pagescms.org/docs/configuration/collaborators/).

## Hero e interazioni

### Foto e titoli hero

Aggiungere le foto WebP in `assets/images/hero/` e ricompilare. Hugo genera varianti responsive senza ingrandire gli originali. La selezione casuale evita, quando possibile, l’ultima foto salvata in `sessionStorage` (`polesine-hero-last`). Conservare `hero/background.webp` e `static/images/hero-fallback.webp` come fallback.

Le varianti della hero sono larghe 768, 1440 e 2560 px, con qualità WebP 84; `width`, `height` e `srcset` sono ricavati dalle immagini. Un `<template>` evita il download della foto non scelta. Senza JavaScript si usa il fallback; senza storage la scelta resta casuale ma può ripetersi.

Home, Coming Soon e informative usano la hero completa; Esplora e articoli quella compatta. Negli articoli `data-fit-title` abilita sotto 768 px parole intere, righe bilanciate e riduzione del font solo se necessaria. Il calcolo richiede JavaScript, si aggiorna dopo i font e al resize e non modifica il sottotitolo o il desktop.

Da 960 px `.hero--home` usa `calc(clamp(480px, calc(100vh - 440px), 1000px) * .94)`; sotto 960 px l’altezza è 390 px, sotto 640 px è 340 px. La hero compatta desktop usa `clamp(310px, 40vh, 510px)`; su mobile l’altezza si adatta al contenuto. Titolo e sottotitolo desktop condividono `--hero-text-scale`, con fallback per browser che non supportano il relativo calcolo CSS.

L’animazione del titolo usa `data-typewriter="pending"` e `.title-ink`: non estenderla ai titoli del corpo articolo, delle informative o della 404.

### Ritorno in alto e navigazione

Il pulsante `.back-to-top` esiste solo in Esplora e articoli. `IntersectionObserver` lo mostra dopo la hero; il clic riporta in alto e sposta il focus al logo. Quando nascosto è `inert`. La posizione desktop dipende dalle misure di colonna e sidebar: aggiornarla se cambia il layout.

| Finestra | Dimensione SVG | Posizione orizzontale | Spessore SVG |
| --- | --- | --- | --- |
| Da 1200 px | 60 × 60 px | 24 px dopo il limite del testo | `1.28` |
| 768–1199 px | 30 × 30 px | 24 px dal bordo destro | `1.6` |
| Sotto 768 px | 35 × 35 px | 10 px dal bordo destro | `2` |

Il controllo è fisso al 65% dell’altezza della finestra, senza sfondo né bordo, con area cliccabile minima di 44 × 44 px. La dissolvenza dura 200 ms; alla comparsa lo chevron sale di 5 px due volte e poi resta fermo. Con movimento ridotto compaiono subito icona e posizione finale e il ritorno in alto è immediato.

Il menu usa `details/summary`; JavaScript gestisce Escape, clic esterno, selezione dei link e cambio di breakpoint. La busta nei Contatti copia l’email con Clipboard API su HTTPS/localhost; senza supporto resta il link `mailto:`.

Il menu diventa espandibile sotto 1200 px. La copia email mostra «Copiato!» o «Copia non riuscita» per due secondi. Le ancore di sezione usano `scroll-margin-top: 24px`.

Animazioni e scorrimento fluido rispettano `prefers-reduced-motion`. Preservare focus visibile, etichette accessibili e aree cliccabili di almeno 44 × 44 px.

## Risorse grafiche

### Font utilizzati

| Font | Impiego | Licenza |
| --- | --- | --- |
| Special Elite | Nome del sito, titolo della hero e messaggio principale della 404. | Apache 2.0 |
| Source Sans 3 | Contenuti, titoli delle anteprime, H2/H3 degli articoli e sottotitolo corsivo della hero. | SIL OFL |
| Oswald | Menu, H1 degli articoli, titoli dell’archivio e della sidebar, Chi sono/Contatti, informative, Coming Soon, numero e link Home della 404, scritta «La Storia». | SIL OFL |
| Inter | Footer. | SIL OFL |

Usare i file locali in `static/fonts/` e conservarne le licenze. Roboto è presente nella cartella ma non utilizzato dal CSS.

### Immagini e icone

- **Logo:** mantenere il PNG trasparente. `.brand-logo` usa una maschera CSS per colorarlo insieme al nome; dimensionarlo dal CSS.
- **Icone e favicon:** mantenere SVG locali; la favicon è richiamata come `/favicon.svg`, anche su URL annidati.
- **Mappa:** conservare proporzioni e scorrimento nel solo `.map-scroll`, utilizzabile da tastiera.
- **Palette:** `main.css` imposta lo schema chiaro; ocra delle barre `#b58b20`, hover condiviso `--menu-hover`. Verificare il contrasto quando si cambiano colori o sfondi.

### Riferimenti di layout

| Componente | Indicazioni di manutenzione |
| --- | --- |
| Feed Home e Chi sono/Contatti | Da 960 px condividono `.content-layout--home`, massimo 1180 px e margini di almeno 32 px. |
| Anteprime | Da 960 px foto 260 × 173 px e titoli 30 px; sotto 960 px foto larghe 190 px; sotto 640 px foto da 100 px e titoli 25 px. Mantenere le regole responsive separate. |
| Mappa | SVG 2400 × 921, massimo 1600 px. Su mobile conserva una larghezza minima di 1128 px e scorre solo dentro `.map-scroll`. |
| Logo e icone | PNG originale usato come maschera; senza supporto resta visibile il logo bianco. Icone header 25 × 25 px dentro controlli 44 × 44 px. |
| Footer | Tre colonne desktop; sotto 640 px ritorno alla Home sopra copyright e informative. Link condivisi a Privacy, Disclaimer e credito autore. |

`--menu-hover: #f2ca68` governa hover/focus condivisi; il menu aperto su bianco usa `#8a6516`.

## Feature flags

In `hugo.toml`:

```toml
[params.features]
  wikipediaTriangle = false
```

`true` abilita il triangolo Wikipedia; `false` ne omette l’HTML. La 404 lo esclude sempre. Il componente usa `history-corner.html`, `assets/images/il-polesine.jpg` e lo sticky CSS dentro `.page-surface`, fermandosi sopra il footer. Il flag non modifica la mappa.

Usare booleani senza virgolette. Il server Hugo rileva il salvataggio della configurazione; per vedere il cambiamento online servono build e deploy. Il ritaglio della foto, tooltip e focus del componente sono gestiti in CSS.

## Cloudflare Pages e pubblicazione

Configurazione di riferimento, da confermare nel pannello Pages:

| Impostazione | Valore |
| --- | --- |
| Directory progetto | Radice del repository |
| Build di test | `hugo build --baseURL "$CF_PAGES_URL/"` |
| Output | `public` |
| Ambiente | `HUGO_VERSION=0.169.0` |

Per la produzione usare il dominio assoluto corretto con `--baseURL` o in `hugo.toml`: anche i link RSS dipendono da questo valore. Il feed generale `/index.xml` include le informative; per i soli articoli usare quello di Esplora. Il push sul branch collegato pubblica solo se i deploy automatici sono attivi.

### Pagina 404

`layouts/404.html` genera `public/404.html`, senza hero fotografica. In locale aprire `/404.html` per l’anteprima. Dopo il deploy controllare anche un URL inesistente annidato:

```powershell
curl.exe -I https://DOMINIO-DEL-SITO/percorso/inesistente/
```

Deve rispondere HTTP 404 senza redirect; verificare nel browser che le risorse si carichino. Aprire direttamente `/404.html` non verifica lo stato HTTP degli URL inesistenti.

La pagina riusa header e footer, ma esclude foto, testi della hero e triangolo storico. Il metatag noindex dipende da `.Kind == "404"`. Non sono previste regole `_redirects` o fallback SPA: verificare il comportamento effettivo sul deploy.

### Indicizzazione provvisoria

**Da rivedere prima della pubblicazione definitiva:**

| Sorgente | Stato e intervento |
| --- | --- |
| `layouts/baseof.html` | Noindex HTML globale: rimuoverlo o limitarlo sulle pagine definitive, preservando 404 e sviluppo. |
| `static/_headers` | `X-Robots-Tag: noindex, nofollow` solo su `https://test.polesinefantasma.it/*`; mantenerlo o aggiornarlo secondo l’uso del test, senza estenderlo alla produzione. |
| `hugo.toml` | Sitemap disabilitata e `baseURL = '/'`: rivalutare la sitemap e impostare l’URL assoluto. |

`_headers` viene copiato nella build ma applicato da Pages, non da `hugo server`. Dopo il deploy verificare gli header di Home e informative sul test e la loro assenza sui domini principali. Controllare separatamente gli URL effettivi `pages.dev`, senza presumerne la protezione.

Non aggiungere un blocco generale `Disallow: /` sul test: impedirebbe ai crawler di leggere il noindex. Non esiste un `robots.txt` nei sorgenti; controllare anche eventuali regole gestite da Cloudflare. I controlli locali non dimostrano che le impostazioni siano già attive online.

Comandi di controllo dopo il deploy:

```powershell
curl.exe -I https://test.polesinefantasma.it/
curl.exe -I https://test.polesinefantasma.it/privacy/
curl.exe -I https://polesinefantasma.it/
curl.exe -I https://www.polesinefantasma.it/
```

Le prime due risposte devono includere `X-Robots-Tag: noindex, nofollow`; i domini principali non devono riceverlo dalla regola del test. Il metatag HTML globale resta comunque indipendente dagli header HTTP: verificarli entrambi. Per gli URL `pages.dev` controllare separatamente preview e dominio di produzione del progetto.
