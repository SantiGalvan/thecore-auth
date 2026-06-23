# useClickOutside

> [English](../../../docs/en/hooks/useClickOutside.md) | [Versión española](../../es/hooks/useClickOutside.md)

## Panoramica

`useClickOutside` chiama una callback ogni volta che l'utente clicca (o tocca) al di fuori di un elemento DOM referenziato. È il blocco di costruzione standard per chiudere dropdown, modali, popover e menu contestuali al click esterno.

## Importazione

```js
import { useClickOutside } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `ref` | `React.RefObject<HTMLElement>` | — | Ref collegato all'elemento che definisce l'area "interna". |
| `callback` | `() => void` | — | Funzione chiamata quando un evento `mousedown` si verifica al di fuori dell'elemento ref. |

## Valore restituito

Questo hook non restituisce nulla (`void`). Opera solo come effetto collaterale.

## Utilizzo

```jsx
import { useRef } from 'react';
import { useClickOutside } from 'thecore-auth';

function Dropdown({ isOpen, onClose, children }) {
  const ref = useRef(null);

  // Close the dropdown whenever the user clicks outside
  useClickOutside(ref, onClose);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="dropdown-panel">
      {children}
    </div>
  );
}

// Usage in a parent component
function NavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav>
      <button onClick={() => setOpen(o => !o)}>Menu</button>
      <Dropdown isOpen={open} onClose={() => setOpen(false)}>
        <a href="/profile">Profilo</a>
        <a href="/settings">Impostazioni</a>
        <a href="/logout">Disconnetti</a>
      </Dropdown>
    </nav>
  );
}
```

## Note

- L'hook ascolta `mousedown`, non `click`. Questo si attiva prima dell'evento click, il che impedisce al gestore `click` del pulsante trigger di riaprire un elemento appena chiuso.
- `callback` e `ref` sono elencati come dipendenze dell'effetto. Se `callback` non è memorizzata con `useCallback`, il listener verrà rimosso e riaggiunto ad ogni render. Racchiudere la callback in `useCallback` al punto di chiamata quando questo è rilevante.
- Il listener è collegato a `document`, quindi cattura gli eventi che risalgono fino in cima. Gli elementi che interrompono la propagazione con `e.stopPropagation()` in un gestore `mousedown` impediranno l'esecuzione della callback.
- Gli eventi touch non vengono gestiti esplicitamente; `mousedown` si attiva sui dispositivi touch attraverso il sistema di eventi sintetici, quindi l'hook funziona su mobile senza modifiche.
