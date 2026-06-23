# useViewportHeight

> [English](../../../docs/en/hooks/useViewportHeight.md) | [Versión española](../../es/hooks/useViewportHeight.md)

## Panoramica

`useViewportHeight` risolve il problema del "100vh" sui browser mobile dove la barra degli indirizzi si rimpicciolisce e cresce, causando salti di layout. Imposta la proprietà CSS custom `--vh` (uguale all'1% dell'altezza reale della viewport visibile) e opzionalmente restituisce i valori in pixel grezzi per l'uso in JavaScript.

## Importazione

```js
import { useViewportHeight } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `options` | `{ getValues?: boolean }` | `{ getValues: false }` | Quando `getValues` è `true`, l'hook traccia anche l'altezza della viewport nello stato React e restituisce valori numerici. |

## Valore restituito

Quando `options.getValues` è `false` (default):

| Tipo | Descrizione |
|------|-------------|
| `null` | Non restituisce nulla. Solo la proprietà CSS `--vh` viene aggiornata. |

Quando `options.getValues` è `true`:

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `height` | `number` | Altezza della viewport visibile corrente in pixel. |
| `vh` | `number` | `height * 0.01` — equivalente a `1vh` in pixel. |

## Utilizzo

```jsx
import { useViewportHeight } from 'thecore-auth';

// CSS-only usage — no JS values needed
function AppLayout({ children }) {
  useViewportHeight(); // sets --vh, returns null

  return (
    // Use calc(var(--vh) * 100) instead of 100vh in CSS
    <div style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      {children}
    </div>
  );
}

// JS values usage — e.g. for canvas sizing
function FullscreenCanvas() {
  const { height, vh } = useViewportHeight({ getValues: true });

  return (
    <canvas
      width={window.innerWidth}
      height={height}
      style={{ display: 'block' }}
    />
  );
}
```

## Note

- `--vh` è impostato su `document.documentElement`, quindi è disponibile globalmente nel CSS come `var(--vh)`. Usare `calc(var(--vh) * 100)` dove normalmente si scriverebbe `100vh`.
- L'hook usa `window.visualViewport.height` quando disponibile (browser moderni), con fallback a `window.innerHeight`. `visualViewport` esclude correttamente la tastiera su schermo su iOS e Android.
- I listener di eventi per `resize` e `orientationchange` vengono registrati al mount e rimossi all'unmount.
- Quando `getValues` è `false`, nessuno stato React viene aggiornato al resize, mantenendo i re-render a zero. Passare a `{ getValues: true }` solo quando si hanno genuinamente bisogno di valori numerici in JavaScript.
