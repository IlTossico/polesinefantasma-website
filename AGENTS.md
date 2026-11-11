## Documentazione

Per ogni modifica al sito aggiornare sempre entrambi i documenti `README.md` e `docs/risorse.md`.

Mantenere nel README principale la panoramica del progetto, lo stato e le attività aperte.

Documenta le decisioni tecniche e le istruzioni necessarie alla manutenzione futura. Evita resoconti cronologici, dettagli dei test conclusi e ripetizioni tra documenti. Privilegia sempre la sintesi.

## Regole di modifica del progetto

- Privilegia sempre la soluzione più semplice che risolve il problema richiesto.
- Evita modifiche non strettamente necessarie e refactoring non richiesti.
- Non modificare layout, animazioni, testi o comportamento del sito senza esplicita richiesta.
- Non aggiungere dipendenze, nuovi file o livelli di astrazione se non portano un beneficio concreto.
- Mantieni l'architettura statica e il workflow GitHub → Cloudflare Pages.
- Se individui problemi non collegati alla richiesta, segnalali separatamente senza correggerli autonomamente.
- Non effettuare commit o deploy senza autorizzazione.

## Architettura e qualità del sito

- Utilizza Hugo come generatore statico, sfruttando template e contenuti Markdown dove necessario.
- Mantieni il progetto semplice, senza database, framework frontend o dipendenze non necessarie.
- Utilizza HTML, CSS e JavaScript vanilla. Evita JavaScript quando la stessa funzionalità può essere realizzata con HTML o CSS.
- Privilegia prestazioni elevate, tempi di caricamento ridotti e stabilità visiva.
- Evita layout shift, cambiamenti improvvisi dei font e animazioni indesiderate durante il caricamento.
- Ottimizza le immagini per il web, privilegiando WebP quando appropriato e mantenendo una buona qualità visiva. Conserva i PNG quando richiesto.
- Definisci dimensioni o proporzioni delle immagini per evitare spostamenti del layout.
- Utilizza preferibilmente SVG locali per le icone, senza librerie esterne non necessarie.
- Mantieni il sito responsive e accessibile, con HTML semantico e navigazione utilizzabile anche da tastiera.
- Non aggiungere animazioni decorative senza esplicita richiesta.
- Mantieni la compatibilità con Cloudflare Pages e verifica le modifiche tramite gli strumenti di Hugo.

## Resoconto obbligatorio dopo ogni intervento

Al termine di ogni modifica, fornisci:

1. **Cosa è cambiato:** spiegazione in linguaggio semplice.
2. **File modificati:** elenco dei file e motivo della modifica.
3. **Impatto visivo e funzionale:** cosa cambia per il visitatore e cosa rimane invariato.
4. **Possibili rischi:** incompatibilità, effetti collaterali e limitazioni note.
5. **Verifiche effettuate:** specifica quali test sono stati realmente eseguiti e quali no.

Evita di dichiarare una modifica completamente verificata quando sono stati eseguiti soltanto controlli locali.
