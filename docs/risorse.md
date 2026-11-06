# Risorse e manutenzione tecnica

Questo documento descrive come mantenere la coming soon e la base tecnica del progetto. Stato, attività e idee sono nel [README principale](../README.md).

I riferimenti per la progettazione del futuro sito sono raccolti in [Inspiration](inspiration.md).

## File e risorse

| File | Responsabilità e indicazioni |
| --- | --- |
| `index.html` | Testi, metadati, collegamenti social, icone SVG inline e struttura della pagina. Il titolo e la descrizione attuali si riferiscono alla coming soon. |
| `style.css` | Colori, tipografia, sfondo, maschera del logo, layout, adattamenti per viewport e preferenza di movimento ridotto. |
| `script.js` | Copia dell'email, notifica temporanea e gestione degli errori. L'indirizzo è definito nello script e richiamato anche negli attributi accessibili del pulsante HTML: mantenerli coerenti. |
| `assets/background.jpg` | Sfondo della hero, richiamato dal CSS. Desaturazione e sovrapposizioni cromatiche sono applicate dagli stili. |
| `assets/logo.png` | Maschera del logo, colorata dal CSS. Se cambia il formato dell'immagine, controllare anche la proprietà `aspect-ratio` di `.logo`. |

I font **Special Elite** e **Inter** sono richiesti a Google Fonts da `index.html`: non sono conservati localmente. Le icone social sono incluse nell'HTML e non richiedono librerie esterne.

## Lavorare in locale

Non sono necessari installazione di pacchetti o build. Per una prima anteprima aprire `index.html` nel browser; per verifiche più rappresentative usare un server statico locale già disponibile.

La Clipboard API richiede un contesto sicuro e il consenso del browser quando previsto. Lo script include un tentativo alternativo con `execCommand('copy')` e, in caso di errore, una finestra per copiare manualmente l'indirizzo. Verificarne il comportamento anche nell'ambiente di pubblicazione.

Prima di pubblicare modifiche alla pagina, controllare dimensioni desktop e mobile, collegamenti social, copia email e navigazione da tastiera. Distinguere sempre i controlli locali dalle verifiche sul sito pubblico.

## Vincoli e pubblicazione

- Conservare l'architettura statica e introdurre strumenti o dipendenze solo per esigenze concrete approvate.
- Mantenere il workflow GitHub → Cloudflare Pages con deploy manuale. La directory da servire è la radice del progetto; non è previsto un comando di build.
- Confermare la configurazione effettiva di Cloudflare Pages e il dominio prima della pubblicazione: questi dettagli non sono documentati nei file attuali.
- Non modificare aspetto, testi, animazioni o comportamento senza richiesta esplicita.
- Aggiornare questo documento per le decisioni tecniche e il README principale per stato e attività, evitando duplicazioni e resoconti cronologici.
- Non effettuare commit o deploy senza autorizzazione.
