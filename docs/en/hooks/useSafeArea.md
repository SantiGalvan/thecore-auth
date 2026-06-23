# useSafeArea

> [Versione italiana](../../it/hooks/useSafeArea.md) | [Versión española](../../es/hooks/useSafeArea.md)

## Overview

`useSafeArea` manages the `with-safe-area` CSS class on `document.body`. When the current route is **not** in the exclusion list, the class is added so that safe-area insets (e.g. iPhone notch / home bar) are respected. The class is removed on excluded routes (typically the login page) where full-bleed layouts are desired.

## Import

```js
import { useSafeArea } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `excludedPaths` | `string[]` | `["/"]` | Array of exact pathnames where the safe-area class should **not** be applied. |

## Return value

This hook returns nothing (`void`). It operates as a side effect only.

## Usage

```jsx
import { useSafeArea } from 'thecore-auth';

function App() {
  // Apply safe-area everywhere except the login and splash pages
  useSafeArea(['/', '/splash']);

  return (
    <Routes>
      <Route path="/"       element={<Login />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/app"    element={<Dashboard />} />
    </Routes>
  );
}
```

```css
/* In your global CSS, define what with-safe-area means */
.with-safe-area {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top:    env(safe-area-inset-top);
}
```

## Notes

- Must be called inside a component that is a descendant of `<BrowserRouter>` (or equivalent), because it relies on `useLocation`.
- Path matching is an exact string comparison (`includes`). Dynamic segments (e.g. `/user/123`) are **not** matched by a pattern like `/user/:id` — list the literal paths that should be excluded.
- The class is removed in the effect cleanup, so navigating away from a route always starts with a clean state before the new effect runs.
- If `document.body` class manipulation conflicts with other libraries, consider using a CSS variable or data attribute approach instead and adapting the hook.
