# ErrorPage

> [English](../../pages/ErrorPage.md) | [Italiano](../../it/pages/ErrorPage.md)

## Descripción general

`ErrorPage` es un componente mínimo para mostrar errores. Muestra un encabezado "Errore" a pantalla completa y un bloque `<pre>` con el mensaje de error. Toda la sección se oculta con la clase CSS `hidden` cuando `errorShow` es `false`, haciéndolo adecuado para renderizado condicional sin desmontar el componente.

## Importación

```js
import { ErrorPage } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|--------|------|-------------|-----------|-------------|
| `errorMessage` | `string` | `undefined` | No | El texto del error mostrado dentro de un elemento `<pre>` |
| `errorShow` | `boolean` | `undefined` | No | Controla la visibilidad. Cuando es `false`, la sección recibe la clase `hidden` |

## Uso

### Como error boundary de React Router

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

// En la configuración del router:
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
  },
]);
```

### Visibilidad condicional

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
      <button onClick={load}>Cargar</button>
      <ErrorPage
        errorMessage={error}
        errorShow={Boolean(error)}
      />
    </>
  );
}
```

## Notas

- El texto del encabezado ("Errore") está hardcoded. Si necesitas un encabezado localizado o personalizado, usa `ErrorPage` como referencia y construye el tuyo.
- `errorShow` oculta mediante la clase utility `hidden` de Tailwind — el componente permanece montado y el nodo DOM permanece en el árbol.
- `errorMessage` se renderiza dentro de `<pre>`, por lo que los stack traces y cadenas multilínea se preservan tal cual.
