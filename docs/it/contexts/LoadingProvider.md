# LoadingProvider / useLoading

> 🇬🇧 [English](../../contexts/LoadingProvider.md) | 🇪🇸 [Español](../../es/contexts/LoadingProvider.md)

## Panoramica

`LoadingProvider` gestisce un overlay di caricamento globale. Espone un flag booleano e helper per mostrare il loader immediatamente o per una durata fissa. Il componente renderizzato come overlay può essere sostituito a runtime tramite `setLoadingComponent`.

---

## Setup

Inserire `LoadingProvider` all'interno di `ConfigProvider`. Passare il proprio componente di caricamento personalizzato come `defaultComponent` per sovrascrivere il loader predefinito.

```jsx
import { ConfigProvider, LoadingProvider } from 'thecore-auth';
import MySpinner from './MySpinner';

function App() {
  return (
    <ConfigProvider>
      <LoadingProvider defaultComponent={<MySpinner />}>
        {/* la tua app */}
      </LoadingProvider>
    </ConfigProvider>
  );
}
```

Se `defaultComponent` è omesso, viene usato il loader integrato nella libreria.

---

## API dell'hook

```js
const loading = useLoading();
```

| Valore | Tipo | Descrizione |
|---|---|---|
| `isLoading` | `boolean` | Se l'overlay di caricamento è attualmente attivo |
| `setIsLoading` | `(value: boolean) => void` | Imposta direttamente lo stato di caricamento |
| `loadingProps` | `object` | Props passate al componente di caricamento corrente |
| `setLoadingProps` | `(props: object) => void` | Aggiorna le props del componente di caricamento |
| `loadingComponent` | `ReactElement \| undefined` | Il componente attualmente renderizzato come loader |
| `setLoadingComponent` | `(component: ReactElement) => void` | Sostituisce il componente loader a runtime |
| `showLoadingFor` | `(duration?: number, props?: object) => void` | Mostra il loader per `duration` ms (default: 2000), poi lo nasconde automaticamente |

---

## Utilizzo

```jsx
import { useLoading } from 'thecore-auth';

function SaveButton({ onSave }) {
  const { isLoading, setIsLoading, showLoadingFor } = useLoading();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave();
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = () => {
    // Mostra il loader per esattamente 1.5 secondi
    showLoadingFor(1500);
    performQuickAction();
  };

  return (
    <>
      <button onClick={handleSave} disabled={isLoading}>Salva</button>
      <button onClick={handleQuickAction}>Azione rapida</button>
    </>
  );
}
```

---

## Note

- `showLoadingFor` usa `setTimeout` internamente: dopo `duration` ms, `setIsLoading(false)` viene chiamato incondizionatamente. Se si chiama `setIsLoading(false)` manualmente prima che il timer scada, il timer si attiverà comunque ma senza effetti visibili.
- `loadingProps` viene azzerato a `{}` ad ogni chiamata di `showLoadingFor` (o impostato all'argomento `props` se fornito).
- `LoadingProvider` accetta `children` e `defaultComponent` come props. `defaultComponent` imposta il valore iniziale dello stato `loadingComponent`.
