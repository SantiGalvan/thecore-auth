# useOrientation

> [English](../../../docs/hooks/useOrientation.md) | [Versión española](../../es/hooks/useOrientation.md)

## Panoramica

`useOrientation` restituisce l'orientamento corrente dello schermo come stringa e si aggiorna in modo reattivo ogni volta che la finestra viene ridimensionata. L'orientamento viene determinato confrontando `window.innerWidth` e `window.innerHeight`.

## Importazione

```js
import { useOrientation } from 'thecore-auth';
```

## Parametri

Questo hook non accetta parametri.

## Valore restituito

| Tipo | Valori | Descrizione |
|------|--------|-------------|
| `string` | `"landscape"` | `"portrait"` | Orientamento corrente. `"landscape"` quando larghezza > altezza, `"portrait"` altrimenti. |

## Utilizzo

```jsx
import { useOrientation } from 'thecore-auth';

function OrientationBanner() {
  const orientation = useOrientation();

  if (orientation === 'portrait') {
    return (
      <div className="rotate-prompt">
        Ruota il dispositivo in modalità orizzontale.
      </div>
    );
  }

  return (
    <main>
      <p>Contenuto visualizzato in orientamento orizzontale.</p>
    </main>
  );
}
```

## Note

- L'orientamento è derivato dalle dimensioni della finestra, non dall'API `screen.orientation`, quindi reagisce a qualsiasi ridimensionamento — incluso il ridimensionamento della finestra del browser sul desktop.
- Il valore iniziale viene calcolato in modo sincrono da `window.innerWidth` e `window.innerHeight` al momento della prima chiamata dell'hook.
- Il listener di eventi è collegato a `resize` e rimosso all'unmount, quindi non ci sono memory leak.
- Su iOS Safari, i cambi di orientamento possono innescare un evento `resize` con un leggero ritardo. Considerare il debouncing se la precisione temporale è importante.
