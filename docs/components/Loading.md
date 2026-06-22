# Loading

> [Versione italiana](../../docs/it/components/Loading.md) | [Versión española](../../docs/es/components/Loading.md)

## Overview

`Loading` is a full-screen overlay spinner that appears whenever `isLoading` is `true` in `LoadingContext`. It accepts no props; all configuration comes from `loadingProps` and `loadingComponent` exposed by `useLoading()`. When `loadingComponent` is set, it is rendered instead of the default spinner.

## Import

```js
import { Loading } from 'thecore-auth';
```

## Props

This component accepts **no props**. All configuration is provided through `LoadingContext`.

| Context value | Type | Default | Description |
|---|---|---|---|
| `loadingProps.spinner` | `boolean` | `true` | Whether to render the spinner icon |
| `loadingProps.spinnerStyle` | `string` | `undefined` | Extra Tailwind classes appended to the spinner |
| `loadingProps.text` | `string` | `'Loading...'` | Text shown in the center of the overlay |
| `loadingProps.textStyle` | `string` | `undefined` | Extra Tailwind classes appended to the text element |
| `loadingProps.children` | `ReactNode` | `undefined` | Custom node rendered instead of the text |
| `loadingProps.containerStyle` | `string` | `undefined` | Extra Tailwind classes appended to the overlay container |
| `loadingProps.overrideStyle` | `object` | `{}` | Per-slot class overrides: `container`, `spinner`, `text` |
| `loadingComponent` | `ReactNode` | `undefined` | When set, replaces the entire default UI |

## CSS Variables

| Variable | Default | Description |
|---|---|---|
| `--color-loading-bg` | `#4B556366` | Background color of the fullscreen overlay |
| `--color-spinner` | `#fff` | Color of the spinner icon |

## Usage

```jsx
import { LoadingProvider, useLoading, Loading } from 'thecore-auth';

function App({ children }) {
  return (
    <LoadingProvider>
      <AppContent>{children}</AppContent>
      {/* Loading overlay sits at root level so it covers everything */}
      <Loading />
    </LoadingProvider>
  );
}

// Trigger loading from anywhere inside the tree
function DataFetcher() {
  const { setIsLoading, setLoadingProps } = useLoading();

  async function fetchData() {
    setLoadingProps({ text: 'Fetching data…', spinner: true });
    setIsLoading(true);
    await api.getData();
    setIsLoading(false);
  }

  return <button onClick={fetchData}>Load</button>;
}
```

## Notes

- `overrideStyle` slot keys: `container`, `spinner`, `text`. When a key is set, the entire default class string for that slot is replaced.
- Extra classes passed via `spinnerStyle`, `textStyle`, and `containerStyle` are **appended** to the defaults, whereas `overrideStyle` **replaces** them.
- `loadingComponent` takes precedence over all other configuration: when it is a non-null ReactNode, the spinner and text are never rendered.
- Place `<Loading />` at the root of your component tree so the fixed overlay covers the full viewport.
