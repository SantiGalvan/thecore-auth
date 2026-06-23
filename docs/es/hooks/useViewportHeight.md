# useViewportHeight

> [English](../../../docs/en/hooks/useViewportHeight.md) | [Versione italiana](../../it/hooks/useViewportHeight.md)

## Descripción general

`useViewportHeight` resuelve el "problema del 100vh" en los navegadores móviles donde la barra de direcciones se encoge y crece, causando saltos en el layout. Establece la propiedad CSS personalizada `--vh` (igual al 1% de la altura real del viewport visible) y opcionalmente devuelve los valores en píxeles para su uso en JavaScript.

## Importación

```js
import { useViewportHeight } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `options` | `{ getValues?: boolean }` | `{ getValues: false }` | Cuando `getValues` es `true`, el hook también rastrea la altura del viewport en el estado de React y devuelve valores numéricos. |

## Valor de retorno

Cuando `options.getValues` es `false` (por defecto):

| Tipo | Descripción |
|------|-------------|
| `null` | No devuelve nada. Solo se actualiza la propiedad CSS `--vh`. |

Cuando `options.getValues` es `true`:

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `height` | `number` | Altura actual del viewport visible en píxeles. |
| `vh` | `number` | `height * 0.01` — equivalente a `1vh` en píxeles. |

## Uso

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

## Notas

- `--vh` se establece en `document.documentElement`, por lo que está disponible globalmente en tu CSS como `var(--vh)`. Usar `calc(var(--vh) * 100)` donde normalmente se escribiría `100vh`.
- El hook usa `window.visualViewport.height` cuando está disponible (navegadores modernos), con fallback a `window.innerHeight`. `visualViewport` excluye correctamente el teclado en pantalla en iOS y Android.
- Los listeners de eventos para `resize` y `orientationchange` se registran al montarse y se eliminan al desmontarse.
- Cuando `getValues` es `false`, no se actualiza ningún estado de React en el resize, manteniendo los re-renders a cero. Solo cambiar a `{ getValues: true }` cuando genuinamente se necesiten valores numéricos en JavaScript.
