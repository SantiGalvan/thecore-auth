# LoadingProvider / useLoading

> 🇮🇹 [Italiano](../it/contexts/LoadingProvider.md) | 🇪🇸 [Español](../es/contexts/LoadingProvider.md)

## Overview

`LoadingProvider` manages a global loading overlay. It exposes a boolean flag and helpers to show the loader immediately or for a fixed duration. The component rendered as the overlay can be replaced at runtime via `setLoadingComponent`.

---

## Setup

Place `LoadingProvider` inside `ConfigProvider`. Pass your custom loading component as `defaultComponent` if you want to override the default loader.

```jsx
import { ConfigProvider, LoadingProvider } from 'thecore-auth';
import MySpinner from './MySpinner';

function App() {
  return (
    <ConfigProvider>
      <LoadingProvider defaultComponent={<MySpinner />}>
        {/* your app */}
      </LoadingProvider>
    </ConfigProvider>
  );
}
```

If `defaultComponent` is omitted, the library's built-in loader is used.

---

## Hook API

```js
const loading = useLoading();
```

| Value | Type | Description |
|---|---|---|
| `isLoading` | `boolean` | Whether the loading overlay is currently active |
| `setIsLoading` | `(value: boolean) => void` | Directly set the loading state |
| `loadingProps` | `object` | Props passed to the current loading component |
| `setLoadingProps` | `(props: object) => void` | Update the loading component's props |
| `loadingComponent` | `ReactElement \| undefined` | The component currently rendered as the loader |
| `setLoadingComponent` | `(component: ReactElement) => void` | Replace the loader component at runtime |
| `showLoadingFor` | `(duration?: number, props?: object) => void` | Show the loader for `duration` ms (default: 2000), then hide automatically |

---

## Usage

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
    // Show loader for exactly 1.5 seconds regardless of when the action finishes
    showLoadingFor(1500);
    performQuickAction();
  };

  return (
    <>
      <button onClick={handleSave} disabled={isLoading}>Save</button>
      <button onClick={handleQuickAction}>Quick action</button>
    </>
  );
}
```

---

## Notes

- `showLoadingFor` uses `setTimeout` internally: after `duration` ms, `setIsLoading(false)` is called unconditionally. If you also call `setIsLoading(false)` manually before the timer fires, the timer will still fire but has no visible effect.
- `loadingProps` is reset to `{}` on each `showLoadingFor` call (or to the `props` argument if provided).
- The `LoadingProvider` accepts `children` and `defaultComponent` as props. `defaultComponent` sets the initial value of `loadingComponent` state.
