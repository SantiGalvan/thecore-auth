# useEnvironmentInfo

> [English](../../../docs/en/hooks/useEnvironmentInfo.md) | [Versión española](../../es/hooks/useEnvironmentInfo.md)

## Panoramica

`useEnvironmentInfo` centralizza ogni segnale del browser/dispositivo che **non** richiede un prompt di permesso e non è una tecnica deprecata o di fingerprinting attivo — vedi [ADR 0001](../adr/0001-environment-info-signal-scope.md) per il razionale completo dello scope. Aggrega valori statici (calcolati una sola volta), valori dinamici (rilevati sull'evento browser pertinente) e una stima dello storage su richiesta.

Ogni singola lettura di campo viene loggata in console come `[useEnvironmentInfo] <campo>: <valore>`, controllata da `environmentInfoLog` in `public/config.json` (tramite `useConfig()`). Il flag parte di default a `false`; se manca del tutto da `config.json`, l'hook si comporta esattamente come se fosse `false` — non lancia mai un'eccezione e resta semplicemente silenzioso.

## Importazione

```js
import { useEnvironmentInfo } from 'thecore-auth';
```

## Configurazione

```json
{
  "environmentInfoLog": false
}
```

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `environmentInfoLog` | `boolean` | Quando `true`, ogni campo letto dall'hook viene loggato in console. Default `false`; la chiave assente si comporta come `false`. |

## Parametri

Questo hook non accetta parametri. Deve essere usato all'interno di un albero `ConfigProvider`, poiché legge `environmentInfoLog` tramite `useConfig()`.

## Valore restituito

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `hardwareConcurrency` | `number \| undefined` | `navigator.hardwareConcurrency`, statico. |
| `deviceMemory` | `number \| undefined` | `navigator.deviceMemory`, statico (solo Chromium). |
| `maxTouchPoints` | `number` | `navigator.maxTouchPoints`, statico. |
| `cookieEnabled` | `boolean` | `navigator.cookieEnabled`, statico. |
| `screen` | `object` | `{ width, height, availWidth, availHeight, colorDepth }`, statico. |
| `userAgentData` | `object \| undefined` | Campi a basso rischio di `navigator.userAgentData` (`platform`, `mobile`, `brands`), statico, `undefined` se non supportato. |
| `capabilities` | `object` | Flag di presenza (`'x' in navigator`), statico: `bluetooth`, `usb`, `serial`, `hid`, `wakeLock`, `share`, `clipboard`, `serviceWorker`, `gpu`, `gamepads`, `geolocation`, `permissions`, `xr`. |
| `language` | `string` | `navigator.language`, riletto su `languagechange`. |
| `languages` | `string[]` | `navigator.languages`, riletto su `languagechange`. |
| `timeZone` | `string` | `Intl.DateTimeFormat().resolvedOptions().timeZone`, ricalcolato insieme a `language`. |
| `locale` | `object` | `{ numberingSystem, calendar }` da `Intl.Locale(language).maximize()`, ricalcolato insieme a `language`. |
| `devicePixelRatio` | `number` | `window.devicePixelRatio`, riletto su `resize`. |
| `orientation` | `object` | `{ type, angle }` da `window.screen.orientation`, riletto sul suo evento `change`. |
| `isOnline` | `boolean` | `navigator.onLine`, riletto su `online`/`offline`. |
| `connection` | `object \| undefined` | `{ effectiveType, downlink, rtt, saveData, type }` da `navigator.connection`, riletto sul suo evento `change`; `undefined` se non supportato. |
| `prefersColorSchemeDark` | `boolean` | `matchMedia('(prefers-color-scheme: dark)')`, indipendentemente reattivo. |
| `prefersReducedMotion` | `boolean` | `matchMedia('(prefers-reduced-motion: reduce)')`, indipendentemente reattivo. |
| `prefersContrastMore` | `boolean` | `matchMedia('(prefers-contrast: more)')`, indipendentemente reattivo. |
| `forcedColorsActive` | `boolean` | `matchMedia('(forced-colors: active)')`, indipendentemente reattivo. |
| `prefersReducedData` | `boolean` | `matchMedia('(prefers-reduced-data: reduce)')`, indipendentemente reattivo. |
| `isStandalonePwa` | `boolean` | `matchMedia('(display-mode: standalone)')`, indipendentemente reattivo. |
| `storageUsage` | `number \| undefined` | `navigator.storage.estimate().usage`, letto una volta al mount. |
| `storageQuota` | `number \| undefined` | `navigator.storage.estimate().quota`, letto una volta al mount. |
| `refreshStorageEstimate` | `() => Promise<void>` | Rilegge manualmente la stima dello storage; nessun polling. |

## Utilizzo

```jsx
import { useEnvironmentInfo } from 'thecore-auth';

function DiagnosticsPanel() {
  const { hardwareConcurrency, isOnline, connection, capabilities, refreshStorageEstimate } = useEnvironmentInfo();

  return (
    <div>
      <p>CPU cores: {hardwareConcurrency ?? 'sconosciuto'}</p>
      <p>Online: {isOnline ? 'sì' : 'no'}</p>
      <p>Rete: {connection?.effectiveType ?? 'n/d'}</p>
      <p>Bluetooth disponibile: {capabilities.bluetooth ? 'sì' : 'no'}</p>
      <button onClick={refreshStorageEstimate}>Aggiorna stima storage</button>
    </div>
  );
}
```

Attiva il logging in `public/config.json` per ispezionare ogni campo individualmente durante l'integrazione dell'hook:

```json
{
  "environmentInfoLog": true
}
```

## Note

- Esplicitamente esclusi dai dati restituiti: tutto ciò che richiede un prompt di permesso (letture di geolocalizzazione, enumerazione `mediaDevices`, sensori di movimento, `IdleDetector`) e tecniche di fingerprinting attivo (fingerprinting canvas/audio, WebGL unmasked renderer/vendor, enumerazione font, WebRTC IP leak, `speechSynthesis.getVoices()`) — vedi [ADR 0001](../adr/0001-environment-info-signal-scope.md).
- I campi statici vengono calcolati una sola volta tramite `useMemo`; i campi dinamici vengono rilevati solo sul rispettivo evento browser, senza polling.
- `refreshStorageEstimate` è l'unico campo letto su richiesta invece che reattivamente — `navigator.storage.estimate()` non ha un evento di change.
- Il logging è opt-in e per singolo campo: non cambia mai i dati restituiti, solo se ogni lettura viene anche riflessa su `console.log`.
