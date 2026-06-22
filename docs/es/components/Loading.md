# Loading

> [English](../../../docs/components/Loading.md) | [Versione italiana](../../../docs/it/components/Loading.md)

## Descripción general

`Loading` es un overlay spinner a pantalla completa que aparece cada vez que `isLoading` es `true` en `LoadingContext`. No acepta props; toda la configuración proviene de `loadingProps` y `loadingComponent` expuestos por `useLoading()`. Cuando `loadingComponent` está definido, se renderiza en lugar del spinner predeterminado.

## Importación

```js
import { Loading } from 'thecore-auth';
```

## Props

Este componente **no acepta props**. Toda la configuración se gestiona a través de `LoadingContext`.

| Valor del context | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `loadingProps.spinner` | `boolean` | `true` | Si renderizar el ícono spinner |
| `loadingProps.spinnerStyle` | `string` | `undefined` | Clases Tailwind adicionales añadidas al spinner |
| `loadingProps.text` | `string` | `'Loading...'` | Texto mostrado en el centro del overlay |
| `loadingProps.textStyle` | `string` | `undefined` | Clases Tailwind adicionales añadidas al elemento texto |
| `loadingProps.children` | `ReactNode` | `undefined` | Nodo personalizado renderizado en lugar del texto |
| `loadingProps.containerStyle` | `string` | `undefined` | Clases Tailwind adicionales añadidas al contenedor overlay |
| `loadingProps.overrideStyle` | `object` | `{}` | Anulaciones de clases por slot: `container`, `spinner`, `text` |
| `loadingComponent` | `ReactNode` | `undefined` | Cuando está definido, reemplaza toda la UI predeterminada |

## Variables CSS

| Variable | Por defecto | Descripción |
|---|---|---|
| `--color-loading-bg` | `#4B556366` | Color de fondo del overlay a pantalla completa |
| `--color-spinner` | `#fff` | Color del ícono spinner |

## Uso

```jsx
import { LoadingProvider, useLoading, Loading } from 'thecore-auth';

// <Loading /> se coloca a nivel raíz para cubrir todo
function App({ children }) {
  return (
    <LoadingProvider>
      <AppContent>{children}</AppContent>
      <Loading />
    </LoadingProvider>
  );
}

// Activa el loading desde cualquier componente del árbol
function DataFetcher() {
  const { setIsLoading, setLoadingProps } = useLoading();

  async function fetchData() {
    setLoadingProps({ text: 'Obteniendo datos…', spinner: true });
    setIsLoading(true);
    await api.getData();
    setIsLoading(false);
  }

  return <button onClick={fetchData}>Cargar</button>;
}
```

## Notas

- Las claves de slot de `overrideStyle` son: `container`, `spinner`, `text`. Cuando se establece una clave, se reemplaza toda la cadena de clases predeterminada para ese slot.
- Las clases extra pasadas a través de `spinnerStyle`, `textStyle` y `containerStyle` se **añaden** a los valores predeterminados, mientras que `overrideStyle` los **reemplaza**.
- `loadingComponent` tiene precedencia sobre toda la configuración: cuando es un ReactNode no nulo, el spinner y el texto nunca se renderizan.
- Coloca `<Loading />` en la raíz del árbol de componentes para garantizar que el overlay fijo cubra todo el viewport.
