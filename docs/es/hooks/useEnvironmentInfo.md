# useEnvironmentInfo

> [English](../../../docs/en/hooks/useEnvironmentInfo.md) | [Versione italiana](../../it/hooks/useEnvironmentInfo.md)

## Descripción general

`useEnvironmentInfo` centraliza cada señal del navegador/dispositivo que **no** requiere un aviso de permiso y no es una técnica obsoleta o de fingerprinting activo — ver [ADR 0001](../adr/0001-environment-info-signal-scope.md) para el razonamiento completo del alcance. Agrega valores estáticos (calculados una vez), valores dinámicos (releídos en el evento de navegador correspondiente) y una estimación de almacenamiento a demanda.

Cada lectura individual de campo se registra en consola como `[useEnvironmentInfo] <campo>: <valor>`, controlada por `environmentInfoLog` en `public/config.json` (vía `useConfig()`). El flag es `false` por defecto; si falta por completo en `config.json`, el hook se comporta exactamente como si fuera `false` — nunca lanza una excepción y simplemente permanece en silencio.

## Importación

```js
import { useEnvironmentInfo } from 'thecore-auth';
```

## Configuración

```json
{
  "environmentInfoLog": false
}
```

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `environmentInfoLog` | `boolean` | Cuando es `true`, cada campo leído por el hook se registra en consola. Por defecto `false`; la clave ausente se comporta igual que `false`. |

## Parámetros

Este hook no acepta parámetros. Debe usarse dentro de un árbol `ConfigProvider`, ya que lee `environmentInfoLog` mediante `useConfig()`.

## Valor de retorno

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `hardwareConcurrency` | `number \| undefined` | `navigator.hardwareConcurrency`, estático. |
| `deviceMemory` | `number \| undefined` | `navigator.deviceMemory`, estático (solo Chromium). |
| `maxTouchPoints` | `number` | `navigator.maxTouchPoints`, estático. |
| `cookieEnabled` | `boolean` | `navigator.cookieEnabled`, estático. |
| `screen` | `object` | `{ width, height, availWidth, availHeight, colorDepth }`, estático. |
| `userAgentData` | `object \| undefined` | Campos de baja entropía de `navigator.userAgentData` (`platform`, `mobile`, `brands`), estático, `undefined` si no se soporta. |
| `capabilities` | `object` | Flags de presencia (`'x' in navigator`), estático: `bluetooth`, `usb`, `serial`, `hid`, `wakeLock`, `share`, `clipboard`, `serviceWorker`, `gpu`, `gamepads`, `geolocation`, `permissions`, `xr`. |
| `language` | `string` | `navigator.language`, releído en `languagechange`. |
| `languages` | `string[]` | `navigator.languages`, releído en `languagechange`. |
| `timeZone` | `string` | `Intl.DateTimeFormat().resolvedOptions().timeZone`, recalculado junto con `language`. |
| `locale` | `object` | `{ numberingSystem, calendar }` de `Intl.Locale(language).maximize()`, recalculado junto con `language`. |
| `devicePixelRatio` | `number` | `window.devicePixelRatio`, releído en `resize`. |
| `orientation` | `object` | `{ type, angle }` de `window.screen.orientation`, releído en su evento `change`. |
| `isOnline` | `boolean` | `navigator.onLine`, releído en `online`/`offline`. |
| `connection` | `object \| undefined` | `{ effectiveType, downlink, rtt, saveData, type }` de `navigator.connection`, releído en su evento `change`; `undefined` si no se soporta. |
| `prefersColorSchemeDark` | `boolean` | `matchMedia('(prefers-color-scheme: dark)')`, reactivo de forma independiente. |
| `prefersReducedMotion` | `boolean` | `matchMedia('(prefers-reduced-motion: reduce)')`, reactivo de forma independiente. |
| `prefersContrastMore` | `boolean` | `matchMedia('(prefers-contrast: more)')`, reactivo de forma independiente. |
| `forcedColorsActive` | `boolean` | `matchMedia('(forced-colors: active)')`, reactivo de forma independiente. |
| `prefersReducedData` | `boolean` | `matchMedia('(prefers-reduced-data: reduce)')`, reactivo de forma independiente. |
| `isStandalonePwa` | `boolean` | `matchMedia('(display-mode: standalone)')`, reactivo de forma independiente. |
| `storageUsage` | `number \| undefined` | `navigator.storage.estimate().usage`, leído una vez al montar. |
| `storageQuota` | `number \| undefined` | `navigator.storage.estimate().quota`, leído una vez al montar. |
| `refreshStorageEstimate` | `() => Promise<void>` | Relee manualmente la estimación de almacenamiento; sin polling. |

## Uso

```jsx
import { useEnvironmentInfo } from 'thecore-auth';

function DiagnosticsPanel() {
  const { hardwareConcurrency, isOnline, connection, capabilities, refreshStorageEstimate } = useEnvironmentInfo();

  return (
    <div>
      <p>Núcleos de CPU: {hardwareConcurrency ?? 'desconocido'}</p>
      <p>En línea: {isOnline ? 'sí' : 'no'}</p>
      <p>Red: {connection?.effectiveType ?? 'n/d'}</p>
      <p>Bluetooth disponible: {capabilities.bluetooth ? 'sí' : 'no'}</p>
      <button onClick={refreshStorageEstimate}>Actualizar estimación de almacenamiento</button>
    </div>
  );
}
```

Activa el registro en `public/config.json` para inspeccionar cada campo individualmente al integrar el hook:

```json
{
  "environmentInfoLog": true
}
```

## Notas

- Excluidos explícitamente de los datos devueltos: cualquier cosa que requiera un aviso de permiso (lecturas de geolocalización, enumeración de `mediaDevices`, sensores de movimiento, `IdleDetector`) y técnicas de fingerprinting activo (fingerprinting de canvas/audio, WebGL unmasked renderer/vendor, enumeración de fuentes, fuga de IP por WebRTC, `speechSynthesis.getVoices()`) — ver [ADR 0001](../adr/0001-environment-info-signal-scope.md).
- Los campos estáticos se calculan una sola vez mediante `useMemo`; los campos dinámicos solo se releen en su evento de navegador correspondiente, sin polling.
- `refreshStorageEstimate` es el único campo leído a demanda en lugar de reactivamente — `navigator.storage.estimate()` no tiene un evento de cambio.
- El registro es opcional y por campo: nunca cambia los datos devueltos, solo si cada lectura también se refleja en `console.log`.
