# Note di rilascio

## [0.0.218] — 2026-08-06

### Aggiunte
- `useEnvironmentInfo` fa ora parte dell'API pubblica: un hook che legge segnali ambientali del
  browser/dispositivo (hardware, locale, connettività, preferenze media-query, stima dello storage)
  che non richiedono un prompt di permesso. Ogni campo letto può opzionalmente essere riflesso in
  console tramite la nuova chiave di config `environmentInfoLog`, che parte di default a `false` —
  e si comporta come `false` anche se manca del tutto da `config.json`. Vedi la
  [documentazione di useEnvironmentInfo](../hooks/useEnvironmentInfo.md).

### Corretti
- Corretta una race di logout per closure stantia nel listener `window` `load` di `AuthProvider`:
  su un hard reload, un login completato appena prima dell'evento `load` ritardato poteva essere
  silenziosamente annullato tornando allo stato disconnesso. `AuthProvider` ora legge il token da
  un ref sincronizzato ad ogni render invece che dal valore catturato quando il listener è stato
  registrato la prima volta.

### Dettagli
- [useEnvironmentInfo — creazione dell'hook](../changelog/2026-07-29-0.0.217-use-environment-info-hook.md)
- [useEnvironmentInfo — logging config-gated, export pubblico](../changelog/2026-08-06-0.0.217-use-environment-info-hook.md)
- [AuthProvider — fix della closure stantia](../changelog/2026-08-06-0.0.217-fix-auth-provider-stale-load-listener.md)
