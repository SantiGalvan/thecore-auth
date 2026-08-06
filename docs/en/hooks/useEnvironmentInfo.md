# useEnvironmentInfo

> [Versione italiana](../../it/hooks/useEnvironmentInfo.md) | [Versión española](../../es/hooks/useEnvironmentInfo.md)

## Overview

`useEnvironmentInfo` centralizes every browser/device signal that does **not** require a permission prompt and is not a deprecated or active fingerprinting technique — see [ADR 0001](../adr/0001-environment-info-signal-scope.md) for the full scope rationale. It aggregates static values (computed once), dynamic values (re-read on the relevant browser event), and an on-demand storage estimate.

Each individual field read is logged to the console as `[useEnvironmentInfo] <field>: <value>`, gated by `environmentInfoLog` in `public/config.json` (via `useConfig()`). The flag defaults to `false`; if it is missing from `config.json` entirely, the hook behaves exactly as if it were `false` — it never throws and simply stays silent.

## Import

```js
import { useEnvironmentInfo } from 'thecore-auth';
```

## Configuration

```json
{
  "environmentInfoLog": false
}
```

| Key | Type | Description |
|-----|------|-------------|
| `environmentInfoLog` | `boolean` | When `true`, every field read by the hook is logged to the console. Defaults to `false`; missing key behaves the same as `false`. |

## Parameters

This hook accepts no parameters. It must be used inside a `ConfigProvider` tree, since it reads `environmentInfoLog` via `useConfig()`.

## Return value

| Key | Type | Description |
|-----|------|-------------|
| `hardwareConcurrency` | `number \| undefined` | `navigator.hardwareConcurrency`, static. |
| `deviceMemory` | `number \| undefined` | `navigator.deviceMemory`, static (Chromium-only). |
| `maxTouchPoints` | `number` | `navigator.maxTouchPoints`, static. |
| `cookieEnabled` | `boolean` | `navigator.cookieEnabled`, static. |
| `screen` | `object` | `{ width, height, availWidth, availHeight, colorDepth }`, static. |
| `userAgentData` | `object \| undefined` | Low-entropy `navigator.userAgentData` fields (`platform`, `mobile`, `brands`), static, `undefined` if unsupported. |
| `capabilities` | `object` | Presence flags (`'x' in navigator`), static: `bluetooth`, `usb`, `serial`, `hid`, `wakeLock`, `share`, `clipboard`, `serviceWorker`, `gpu`, `gamepads`, `geolocation`, `permissions`, `xr`. |
| `language` | `string` | `navigator.language`, re-read on `languagechange`. |
| `languages` | `string[]` | `navigator.languages`, re-read on `languagechange`. |
| `timeZone` | `string` | `Intl.DateTimeFormat().resolvedOptions().timeZone`, recomputed alongside `language`. |
| `locale` | `object` | `{ numberingSystem, calendar }` from `Intl.Locale(language).maximize()`, recomputed alongside `language`. |
| `devicePixelRatio` | `number` | `window.devicePixelRatio`, re-read on `resize`. |
| `orientation` | `object` | `{ type, angle }` from `window.screen.orientation`, re-read on its `change` event. |
| `isOnline` | `boolean` | `navigator.onLine`, re-read on `online`/`offline`. |
| `connection` | `object \| undefined` | `{ effectiveType, downlink, rtt, saveData, type }` from `navigator.connection`, re-read on its `change` event; `undefined` if unsupported. |
| `prefersColorSchemeDark` | `boolean` | `matchMedia('(prefers-color-scheme: dark)')`, independently reactive. |
| `prefersReducedMotion` | `boolean` | `matchMedia('(prefers-reduced-motion: reduce)')`, independently reactive. |
| `prefersContrastMore` | `boolean` | `matchMedia('(prefers-contrast: more)')`, independently reactive. |
| `forcedColorsActive` | `boolean` | `matchMedia('(forced-colors: active)')`, independently reactive. |
| `prefersReducedData` | `boolean` | `matchMedia('(prefers-reduced-data: reduce)')`, independently reactive. |
| `isStandalonePwa` | `boolean` | `matchMedia('(display-mode: standalone)')`, independently reactive. |
| `storageUsage` | `number \| undefined` | `navigator.storage.estimate().usage`, read once at mount. |
| `storageQuota` | `number \| undefined` | `navigator.storage.estimate().quota`, read once at mount. |
| `refreshStorageEstimate` | `() => Promise<void>` | Manually re-reads the storage estimate; no polling. |

## Usage

```jsx
import { useEnvironmentInfo } from 'thecore-auth';

function DiagnosticsPanel() {
  const { hardwareConcurrency, isOnline, connection, capabilities, refreshStorageEstimate } = useEnvironmentInfo();

  return (
    <div>
      <p>CPU cores: {hardwareConcurrency ?? 'unknown'}</p>
      <p>Online: {isOnline ? 'yes' : 'no'}</p>
      <p>Network: {connection?.effectiveType ?? 'n/a'}</p>
      <p>Bluetooth available: {capabilities.bluetooth ? 'yes' : 'no'}</p>
      <button onClick={refreshStorageEstimate}>Refresh storage estimate</button>
    </div>
  );
}
```

Enable logging in `public/config.json` to inspect every field individually while integrating the hook:

```json
{
  "environmentInfoLog": true
}
```

## Notes

- Explicitly excluded from the returned data: anything requiring a permission prompt (geolocation reads, `mediaDevices` enumeration, motion sensors, `IdleDetector`) and active fingerprinting techniques (canvas/audio fingerprinting, WebGL unmasked renderer/vendor, font enumeration, WebRTC IP leak, `speechSynthesis.getVoices()`) — see [ADR 0001](../adr/0001-environment-info-signal-scope.md).
- Static fields are computed once via `useMemo`; dynamic fields are re-read only on their corresponding browser event, not polled.
- `refreshStorageEstimate` is the only field read on demand rather than reactively — `navigator.storage.estimate()` has no change event.
- Logging is opt-in and per-field: it never changes the returned data, only whether each read is also mirrored to `console.log`.
