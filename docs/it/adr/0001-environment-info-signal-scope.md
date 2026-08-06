# 1. Perimetro dei segnali browser/device raccolti da `useEnvironmentInfo`

Data: 2026-07-29

## Stato

Accettata

## Contesto

Vogliamo un nuovo hook interno che centralizzi la lettura dei segnali ambientali
di browser/device non già catturati dagli hook esistenti (`useDevice`,
`useOrientation`, `useViewportHeight`, `useSafeArea`, `useUserActivity`). Una
sessione di ricerca ha catalogato circa 70 segnali recuperabili da un browser
via JavaScript, raggruppati per rischio:

1. Affidabili, basso rischio, nessun permesso richiesto (es. `navigator.language`,
   fuso orario/locale via `Intl`, `hardwareConcurrency`, `maxTouchPoints`,
   `devicePixelRatio`, dimensioni schermo, `prefers-color-scheme`/`prefers-reduced-motion`,
   `onLine`).
2. Utili ma parziali/solo Chromium (es. `userAgentData`, `deviceMemory`,
   `navigator.connection`, Generic Sensor API, `IdleDetector`, info adapter
   WebGPU, Window Management API).
3. Deprecate o in fase di rimozione dai browser (Battery Status API,
   `navigator.plugins`/`mimeTypes`, `navigator.doNotTrack`, `navigator.oscpu`,
   `performance.timing`/`performance.navigation`).
4. Tecniche fingerprinting-grade o sensibili al consenso (fingerprinting
   canvas/audio, `UNMASKED_RENDERER/VENDOR_WEBGL`, enumerazione font a forza
   bruta, leak IP locale via candidati ICE WebRTC, geolocalizzazione precisa,
   `IdleDetector`, sensori di moto/orientamento, `speechSynthesis.getVoices()`).

`thecore-auth` è una libreria npm pubblicata, usata da altre applicazioni.
Qualsiasi segnale raccolto di default da questa libreria viene ereditato
silenziosamente da ogni app consumer, che non può disattivarlo facilmente senza
forkare l'hook. Questo rende i criteri di raccolta una decisione a livello di
libreria, non della singola app.

## Decisione

`useEnvironmentInfo` (`src/hooks/environment/useEnvironmentInfo.jsx`) raccoglie
**solo segnali che non generano un prompt di permesso del browser**, presi dai
gruppi 1 e 2 sopra. All'interno di questo insieme, escludiamo comunque due
categorie aggiuntive anche se tecnicamente non richiedono un prompt:

- **API deprecate/rimosse** (gruppo 3) — costruirci sopra crea codice morto man
  mano che il supporto dei browser scompare.
- **Tecniche di fingerprinting attivo** (gruppo 4) — fingerprinting canvas/audio,
  renderer/vendor WebGL non mascherati, enumerazione font a forza bruta, leak IP
  via WebRTC e `speechSynthesis.getVoices()` non sono "informazioni ambientali",
  sono tecniche di identificazione avversariali che i produttori di browser
  combattono attivamente (Firefox/Safari aggiungono rumore o le bloccano del
  tutto). Includerle di default in una libreria comporterebbe implicazioni
  GDPR/di consenso che l'applicazione consumer non ha accettato.

L'hook restituisce anche flag di capacità (es. `'bluetooth' in navigator`,
`'wakeLock' in navigator`, `'share' in navigator`) insieme ai valori
informativi, dato che i controlli di presenza condividono la stessa proprietà
"nessun prompt".

All'interno dell'insieme raccolto, i campi sono divisi in due strategie di
aggiornamento:

- **Statici** — calcolati una volta e memoizzati (rispecchia il pattern già
  esistente in `useDevice`): `hardwareConcurrency`, `deviceMemory`,
  `maxTouchPoints`, dimensioni schermo, campi low-entropy di `userAgentData`,
  `cookieEnabled` e tutti i flag di capacità.
- **Dinamici** — riletti in base all'evento browser rilevante: `language`/`languages`
  (+ `Intl.Locale` derivato) su `languagechange`, `devicePixelRatio` su `resize`,
  `screen.orientation` sul proprio evento `change`, `navigator.connection` sul
  proprio evento `change`, `navigator.onLine` su `online`/`offline`, e ogni
  preferenza media (`prefers-color-scheme`, `prefers-reduced-motion`,
  `prefers-contrast`, `forced-colors`, `prefers-reduced-data`,
  `display-mode: standalone`) con un proprio listener `matchMedia` `change`.
- Due campi non hanno un evento di cambiamento nativo e sono gestiti come casi
  speciali: `Intl.DateTimeFormat().resolvedOptions().timeZone` è letto una volta
  e ricalcolato insieme a `language` su `languagechange`; `navigator.storage.estimate()`
  è letto una volta al mount ed esposto con una funzione di refresh manuale
  `refreshStorageEstimate()` invece di essere sottoposto a polling.

Per questa prima iterazione, l'hook non persiste nulla. Ogni singola lettura
logga il proprio risultato (`console.log('[useEnvironmentInfo] <campo>:', valore)`)
così la forma reale dei dati può essere ispezionata nell'uso reale prima di
progettare un meccanismo di persistenza. L'hook resta **interno** (non
esportato da `src/index.js`) finché non decideremo che è abbastanza stabile e
utile da entrare nell'API pubblica.

## Conseguenze

- I consumer di `thecore-auth` non sono esposti a nuovi prompt di permesso né a
  comportamenti di fingerprinting tramite questo hook.
- Alcuni segnali genuinamente utili (qualità di rete via `navigator.connection`,
  memoria del device) restano solo Chromium; i punti di utilizzo devono
  trattarli come best-effort/opzionali, non garantiti.
- Le tecniche fingerprinting-grade e le API a permesso (letture di
  geolocalizzazione, `mediaDevices.enumerateDevices()`, sensori di moto,
  `IdleDetector`) sono esplicitamente fuori perimetro per questo hook. Se in
  futuro una feature ne avesse davvero bisogno, dovrebbe essere un'aggiunta
  esplicita e opt-in con un proprio ADR e una storia di consenso documentata —
  non inglobata nell'output di default di questo hook.
- La persistenza (indexedDB / localStorage / sessionStorage, configurabile via
  `public/config.json`) è deliberatamente rimandata. Un ADR successivo coprirà
  dove salvare i dati, la loro retention, ed eventuali obblighi di disclosure
  verso i consumer, una volta disponibili dati d'uso reali da questa iterazione.
- Essendo l'hook interno, non è richiesto ancora un aggiornamento della
  documentazione pubblica (`README.md`, `DOCUMENTATION_IT.md`,
  `DOCUMENTATION_ES.md`); diventerà obbligatorio nel momento in cui verrà
  esportato da `src/index.js`.

## Aggiornamento — 2026-08-06

L'hook è ora esportato da `src/index.js` e documentato in `README.md` /
`DOCUMENTATION_IT.md` / `DOCUMENTATION_ES.md`. Le chiamate `console.log` per
singolo campo non sono più incondizionate: sono controllate da
`environmentInfoLog` in `public/config.json` (letto via `useConfig()`), con
default `false`. Una chiave assente si comporta come `false` — l'hook non
lancia mai un'eccezione per questo motivo. Questo non cambia la decisione sullo
scope dei segnali sopra descritta; cambia solo la visibilità dei log esistenti
e lo stato pubblico/interno dell'hook. La persistenza resta fuori perimetro,
invariata rispetto alla decisione originale.
