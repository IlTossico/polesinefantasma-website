## Documentazione

Per ogni modifica al sito aggiornare sempre entrambi i documenti `README.md` e `docs/risorse.md`.

Mantenere nel README principale la panoramica del progetto, lo stato e le attività aperte.

Documenta le decisioni tecniche e le istruzioni necessarie alla manutenzione futura. Evita resoconti cronologici, dettagli dei test conclusi e ripetizioni tra documenti. Privilegia sempre la sintesi.

## Regole di modifica del progetto

- Privilegia sempre la soluzione più semplice che risolve il problema richiesto.
- Evita modifiche non strettamente necessarie e refactoring non richiesti.
- Non modificare layout, animazioni, testi o comportamento del sito senza esplicita richiesta.
- Non aggiungere dipendenze, nuovi file o livelli di astrazione se non portano un beneficio concreto.
- Mantieni l'architettura statica e il workflow GitHub → Cloudflare Pages con deploy manuale.
- Se individui problemi non collegati alla richiesta, segnalali separatamente senza correggerli autonomamente.
- Non effettuare commit o deploy senza autorizzazione.

### Resoconto obbligatorio dopo ogni intervento

Al termine di ogni modifica, fornisci:

1. **Cosa è cambiato:** spiegazione in linguaggio semplice.
2. **File modificati:** elenco dei file e motivo della modifica.
3. **Impatto visivo e funzionale:** cosa cambia per il visitatore e cosa rimane invariato.
4. **Possibili rischi:** incompatibilità, effetti collaterali e limitazioni note.
5. **Verifiche effettuate:** specifica quali test sono stati realmente eseguiti e quali no.

Evita di dichiarare una modifica completamente verificata quando sono stati eseguiti soltanto controlli locali.
