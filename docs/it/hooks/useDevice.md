# useDevice

> [English](../../../docs/en/hooks/useDevice.md) | [Versión española](../../es/hooks/useDevice.md)

## Panoramica

`useDevice` analizza la stringa User-Agent corrente tramite `ua-parser-js` e restituisce un oggetto stabile che descrive il tipo di dispositivo, OS, browser e flag booleani di convenienza. Il risultato viene calcolato una volta e memorizzato nella cache a livello di modulo, quindi le chiamate successive (anche tra componenti diversi) condividono lo stesso oggetto senza rieseguire il parsing.

## Importazione

```js
import { useDevice } from 'thecore-auth';
```

## Parametri

Questo hook non accetta parametri.

## Valore restituito

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `type` | `string` | Tipo di dispositivo: `"mobile"`, `"tablet"` o `"desktop"`. |
| `os` | `string | undefined` | Nome del sistema operativo (es. `"iOS"`, `"Android"`, `"Windows"`). |
| `browser` | `string | undefined` | Nome del browser (es. `"Chrome"`, `"Safari"`, `"Firefox"`). |
| `vendor` | `string | null` | Produttore del dispositivo (es. `"Apple"`, `"Samsung"`), o `null` se sconosciuto. |
| `model` | `string | null` | Modello del dispositivo (es. `"iPhone"`, `"iPad"`), o `null` se sconosciuto. |
| `isMobile` | `boolean` | `true` per i telefoni. |
| `isTablet` | `boolean` | `true` per i tablet, inclusi gli iPad mascherati da desktop da Safari. |
| `isDesktop` | `boolean` | `true` quando non è né mobile né tablet. |
| `isIPhone` | `boolean` | `true` quando il modello del dispositivo è `"iPhone"`. |
| `isIPad` | `boolean` | `true` per gli iPad, inclusi quelli in cui Safari riporta `MacIntel`. |
| `isAndroid` | `boolean` | `true` quando il sistema operativo è `"Android"`. |

## Utilizzo

```jsx
import { useDevice } from 'thecore-auth';

function AdaptiveLayout({ children }) {
  const { isMobile, isTablet, isDesktop, os } = useDevice();

  return (
    <div
      className={
        isMobile  ? 'layout-mobile'  :
        isTablet  ? 'layout-tablet'  :
                    'layout-desktop'
      }
    >
      {isDesktop && <Sidebar />}
      <main>{children}</main>
      {isMobile && os === 'iOS' && <IOSInstallBanner />}
    </div>
  );
}
```

## Note

- L'UA viene analizzato al massimo una volta per caricamento di pagina. Il risultato è memorizzato in una variabile a livello di modulo (`cachedDevice`), quindi chiamare `useDevice` in più componenti è gratuito dopo la prima chiamata.
- Il rilevamento dell'iPad include un fallback per Safari ≥ 13 su iPadOS, che riporta `MacIntel` come piattaforma. L'hook controlla `navigator.platform === "MacIntel" && "ontouchend" in document` per identificare questi dispositivi.
- Poiché il risultato è memorizzato nella cache, non cambia in modo reattivo. Se l'hook viene usato in un contesto di server-side rendering, `navigator` / `document` non saranno disponibili e l'hook lancerà un'eccezione.
- `useMemo` con un array di dipendenze vuoto è usato per garantire la stabilità referenziale; l'oggetto restituito è sempre lo stesso riferimento memorizzato nella cache.
