# Loading

> [English](../../../docs/components/Loading.md) | [Versión española](../../../docs/es/components/Loading.md)

## Panoramica

`Loading` è uno spinner overlay a schermo intero che appare ogni volta che `isLoading` è `true` in `LoadingContext`. Non accetta props; tutta la configurazione proviene da `loadingProps` e `loadingComponent` esposti da `useLoading()`. Quando `loadingComponent` è impostato, viene renderizzato al posto dello spinner predefinito.

## Import

```js
import { Loading } from 'thecore-auth';
```

## Props

Questo componente **non accetta props**. Tutta la configurazione avviene tramite `LoadingContext`.

| Valore del context | Tipo | Default | Descrizione |
|---|---|---|---|
| `loadingProps.spinner` | `boolean` | `true` | Se renderizzare l'icona spinner |
| `loadingProps.spinnerStyle` | `string` | `undefined` | Classi Tailwind aggiuntive aggiunte allo spinner |
| `loadingProps.text` | `string` | `'Loading...'` | Testo mostrato al centro dell'overlay |
| `loadingProps.textStyle` | `string` | `undefined` | Classi Tailwind aggiuntive aggiunte all'elemento testo |
| `loadingProps.children` | `ReactNode` | `undefined` | Nodo custom renderizzato al posto del testo |
| `loadingProps.containerStyle` | `string` | `undefined` | Classi Tailwind aggiuntive aggiunte al container overlay |
| `loadingProps.overrideStyle` | `object` | `{}` | Override delle classi per slot: `container`, `spinner`, `text` |
| `loadingComponent` | `ReactNode` | `undefined` | Se impostato, sostituisce l'intera UI predefinita |

## Variabili CSS

| Variabile | Default | Descrizione |
|---|---|---|
| `--color-loading-bg` | `#4B556366` | Colore di sfondo dell'overlay a schermo intero |
| `--color-spinner` | `#fff` | Colore dell'icona spinner |

## Utilizzo

```jsx
import { LoadingProvider, useLoading, Loading } from 'thecore-auth';

// <Loading /> è posizionato a livello root così copre tutto
function App({ children }) {
  return (
    <LoadingProvider>
      <AppContent>{children}</AppContent>
      <Loading />
    </LoadingProvider>
  );
}

// Attiva il loading da qualsiasi componente nell'albero
function DataFetcher() {
  const { setIsLoading, setLoadingProps } = useLoading();

  async function fetchData() {
    setLoadingProps({ text: 'Recupero dati…', spinner: true });
    setIsLoading(true);
    await api.getData();
    setIsLoading(false);
  }

  return <button onClick={fetchData}>Carica</button>;
}
```

## Note

- Le chiavi slot di `overrideStyle` sono: `container`, `spinner`, `text`. Quando una chiave è impostata, l'intera stringa di classi predefinita viene sostituita.
- Le classi extra passate tramite `spinnerStyle`, `textStyle` e `containerStyle` vengono **aggiunte** ai default, mentre `overrideStyle` li **sostituisce**.
- `loadingComponent` ha precedenza su tutta la configurazione: quando è un ReactNode non null, spinner e testo non vengono mai renderizzati.
- Posiziona `<Loading />` nella root del tuo albero di componenti per garantire che l'overlay fisso copra l'intero viewport.
