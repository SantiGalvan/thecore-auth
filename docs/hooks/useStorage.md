# useStorage

> [Versione italiana](../../it/hooks/useStorage.md) | [Versión española](../../es/hooks/useStorage.md)

## Overview

`useStorage` is a `useState`-compatible hook that keeps a value in sync with `localStorage`. On mount it reads the stored value (or writes the initial value if the key is absent). The returned setter persists every update automatically.

## Import

```js
import { useStorage } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialValue` | `any` | — | Value written to `localStorage` when the key does not exist yet. |
| `itemKey` | `string` | — | `localStorage` key under which the value is stored (JSON-serialised). |

## Return value

Returns a tuple of three elements:

| Index | Value | Type | Description |
|-------|-------|------|-------------|
| `0` | `state` | `any` | Current value, initialised from `localStorage`. |
| `1` | `changeState` | `(value \| (prev) => value) => void` | Setter that updates both React state and `localStorage`. Accepts a value or an updater function. |
| `2` | `remove` | `(clearAll?: boolean) => void` | Removes the key from `localStorage` and resets state to `initialValue`. Pass `true` to call `localStorage.clear()` instead. |

## Usage

```jsx
import { useStorage } from 'thecore-auth';

function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useStorage('light', 'app-theme');

  return (
    <div>
      <p>Current theme: {theme}</p>

      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle theme
      </button>

      {/* Removes only the 'app-theme' key */}
      <button onClick={() => removeTheme()}>
        Reset theme
      </button>

      {/* Clears ALL localStorage — use with caution */}
      <button onClick={() => removeTheme(true)}>
        Clear all storage
      </button>
    </div>
  );
}
```

## Notes

- Values are JSON-serialised before storage and parsed on read. Non-serialisable values (e.g. functions, `undefined`) will not round-trip correctly.
- If `localStorage` is unavailable (e.g. private browsing with storage blocked), the hook logs the error and falls back to `initialValue` without throwing.
- `changeState` accepts an updater function `(prev) => newValue`, making it compatible with patterns that depend on the previous state.
- `remove(true)` calls `localStorage.clear()`, which removes **all** keys — not just those managed by this hook. Use with caution.
