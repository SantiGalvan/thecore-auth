# useOrientation

> [Versione italiana](../../it/hooks/useOrientation.md) | [Versión española](../../es/hooks/useOrientation.md)

## Overview

`useOrientation` returns the current screen orientation as a string and updates reactively whenever the window is resized. Orientation is determined by comparing `window.innerWidth` and `window.innerHeight`.

## Import

```js
import { useOrientation } from 'thecore-auth';
```

## Parameters

This hook accepts no parameters.

## Return value

| Type | Values | Description |
|------|--------|-------------|
| `string` | `"landscape"` \| `"portrait"` | Current orientation. `"landscape"` when width > height, `"portrait"` otherwise. |

## Usage

```jsx
import { useOrientation } from 'thecore-auth';

function OrientationBanner() {
  const orientation = useOrientation();

  if (orientation === 'portrait') {
    return (
      <div className="rotate-prompt">
        Please rotate your device to landscape mode.
      </div>
    );
  }

  return (
    <main>
      <p>Content displayed in landscape orientation.</p>
    </main>
  );
}
```

## Notes

- Orientation is derived from window dimensions, not from the `screen.orientation` API, so it reacts to any resize — including browser window resizing on desktop.
- The initial value is computed synchronously from `window.innerWidth` and `window.innerHeight` at the time the hook is first called.
- The event listener is attached to `resize` and cleaned up on unmount, so there are no memory leaks.
- On iOS Safari, orientation changes can fire a `resize` event with a slight delay. Consider debouncing if precision timing matters.
