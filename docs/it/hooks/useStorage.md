# useStorage

> [English](../../../docs/hooks/useStorage.md) | [Versión española](../../es/hooks/useStorage.md)

## Panoramica

`useStorage` è un hook compatibile con `useState` che mantiene un valore sincronizzato con `localStorage`. Al mount legge il valore memorizzato (o scrive il valore iniziale se la chiave è assente). Il setter restituito persiste ogni aggiornamento automaticamente.

## Importazione

```js
import { useStorage } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `initialValue` | `any` | — | Valore scritto su `localStorage` quando la chiave non esiste ancora. |
| `itemKey` | `string` | — | Chiave `localStorage` sotto cui viene memorizzato il valore (serializzato in JSON). |

## Valore restituito

Restituisce una tupla di tre elementi:

| Indice | Valore | Tipo | Descrizione |
|--------|--------|------|-------------|
| `0` | `state` | `any` | Valore corrente, inizializzato da `localStorage`. |
| `1` | `changeState` | `(value | (prev) => value) => void` | Setter che aggiorna sia lo stato React che `localStorage`. Accetta un valore o una funzione updater. |
| `2` | `remove` | `(clearAll?: boolean) => void` | Rimuove la chiave da `localStorage` e reimposta lo stato a `initialValue`. Passare `true` per chiamare `localStorage.clear()`. |

## Utilizzo

```jsx
import { useStorage } from 'thecore-auth';

function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useStorage('light', 'app-theme');

  return (
    <div>
      <p>Tema corrente: {theme}</p>

      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Cambia tema
      </button>

      {/* Removes only the 'app-theme' key */}
      <button onClick={() => removeTheme()}>
        Reimposta tema
      </button>

      {/* Clears ALL localStorage — use with caution */}
      <button onClick={() => removeTheme(true)}>
        Svuota tutto lo storage
      </button>
    </div>
  );
}
```

## Note

- I valori vengono serializzati in JSON prima della memorizzazione e analizzati alla lettura. I valori non serializzabili (es. funzioni, `undefined`) non si preserveranno correttamente.
- Se `localStorage` non è disponibile (es. navigazione privata con storage bloccato), l'hook registra l'errore e torna a `initialValue` senza lanciare eccezioni.
- `changeState` accetta una funzione updater `(prev) => newValue`, rendendolo compatibile con pattern che dipendono dallo stato precedente.
- `remove(true)` chiama `localStorage.clear()`, che rimuove **tutte** le chiavi — non solo quelle gestite da questo hook. Usare con cautela.
