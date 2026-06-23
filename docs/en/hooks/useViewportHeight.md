# useViewportHeight

> [Versione italiana](../../it/hooks/useViewportHeight.md) | [Versión española](../../es/hooks/useViewportHeight.md)

## Overview

`useViewportHeight` solves the "100vh problem" on mobile browsers where the address bar shrinks and grows, causing layout jumps. It sets the CSS custom property `--vh` (equal to 1% of the actual visible viewport height) and optionally returns the raw pixel values for use in JavaScript.

## Import

```js
import { useViewportHeight } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `{ getValues?: boolean }` | `{ getValues: false }` | When `getValues` is `true`, the hook also tracks the viewport height in React state and returns numeric values. |

## Return value

When `options.getValues` is `false` (default):

| Type | Description |
|------|-------------|
| `null` | Returns nothing. Only the `--vh` CSS property is updated. |

When `options.getValues` is `true`:

| Key | Type | Description |
|-----|------|-------------|
| `height` | `number` | Current visible viewport height in pixels. |
| `vh` | `number` | `height * 0.01` — equivalent to `1vh` in pixels. |

## Usage

```jsx
import { useViewportHeight } from 'thecore-auth';

// CSS-only usage — no JS values needed
function AppLayout({ children }) {
  useViewportHeight(); // sets --vh, returns null

  return (
    // Use calc(var(--vh) * 100) instead of 100vh in CSS
    <div style={{ height: 'calc(var(--vh, 1vh) * 100)' }}>
      {children}
    </div>
  );
}

// JS values usage — e.g. for canvas sizing
function FullscreenCanvas() {
  const { height, vh } = useViewportHeight({ getValues: true });

  return (
    <canvas
      width={window.innerWidth}
      height={height}
      style={{ display: 'block' }}
    />
  );
}
```

## Notes

- `--vh` is set on `document.documentElement`, so it is available globally in your CSS as `var(--vh)`. Use `calc(var(--vh) * 100)` where you would normally write `100vh`.
- The hook uses `window.visualViewport.height` when available (modern browsers), falling back to `window.innerHeight`. `visualViewport` correctly excludes the on-screen keyboard on iOS and Android.
- Event listeners for `resize` and `orientationchange` are registered on mount and removed on unmount.
- When `getValues` is `false`, no React state is updated on resize, keeping re-renders to zero. Only switch to `{ getValues: true }` when you genuinely need numeric values in JavaScript.
