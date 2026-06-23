# ErrorPage

> [English](../../pages/ErrorPage.md) | [Español](../../es/pages/ErrorPage.md)

## Panoramica

`ErrorPage` è un componente minimale per la visualizzazione degli errori. Mostra un heading "Errore" a schermo intero e un blocco `<pre>` con il messaggio di errore. L'intera sezione viene nascosta con la classe CSS `hidden` quando `errorShow` è `false`, rendendolo adatto al rendering condizionale senza smontare il componente.

## Import

```js
import { ErrorPage } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|------|------|---------|-----------|-------------|
| `errorMessage` | `string` | `undefined` | No | Il testo dell'errore visualizzato all'interno di un elemento `<pre>` |
| `errorShow` | `boolean` | `undefined` | No | Controlla la visibilità. Quando `false`, la sezione riceve la classe `hidden` |

## Utilizzo

### Come error boundary di React Router

```jsx
import { useRouteError } from 'react-router-dom';
import { ErrorPage } from 'thecore-auth';

function RouteErrorBoundary() {
  const error = useRouteError();
  const message = error instanceof Error
    ? error.message
    : String(error);

  return <ErrorPage errorMessage={message} errorShow={true} />;
}

// Nella configurazione del router:
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
  },
]);
```

### Visibilità condizionale

```jsx
import { useState } from 'react';
import { ErrorPage } from 'thecore-auth';

function DataLoader() {
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <button onClick={load}>Carica</button>
      <ErrorPage
        errorMessage={error}
        errorShow={Boolean(error)}
      />
    </>
  );
}
```

## Note

- Il testo dell'heading ("Errore") è hardcoded. Se hai bisogno di un heading localizzato o personalizzato, usa `ErrorPage` come riferimento e costruisci il tuo.
- `errorShow` nasconde tramite la classe utility `hidden` di Tailwind — il componente rimane montato e il nodo DOM rimane nell'albero.
- `errorMessage` viene renderizzato all'interno di `<pre>`, quindi i stack trace e le stringhe multiriga vengono preservati così come sono.
