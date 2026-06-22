# useClickOutside

> [Versione italiana](../../it/hooks/useClickOutside.md) | [Versión española](../../es/hooks/useClickOutside.md)

## Overview

`useClickOutside` calls a callback whenever the user clicks (or taps) outside a referenced DOM element. It is the standard building block for closing dropdowns, modals, popovers, and context menus on an outside click.

## Import

```js
import { useClickOutside } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ref` | `React.RefObject<HTMLElement>` | — | Ref attached to the element that defines the "inside" area. |
| `callback` | `() => void` | — | Function called when a `mousedown` event fires outside the ref element. |

## Return value

This hook returns nothing (`void`). It operates as a side effect only.

## Usage

```jsx
import { useRef } from 'react';
import { useClickOutside } from 'thecore-auth';

function Dropdown({ isOpen, onClose, children }) {
  const ref = useRef(null);

  // Close the dropdown whenever the user clicks outside
  useClickOutside(ref, onClose);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="dropdown-panel">
      {children}
    </div>
  );
}

// Usage in a parent component
function NavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav>
      <button onClick={() => setOpen(o => !o)}>Menu</button>
      <Dropdown isOpen={open} onClose={() => setOpen(false)}>
        <a href="/profile">Profile</a>
        <a href="/settings">Settings</a>
        <a href="/logout">Logout</a>
      </Dropdown>
    </nav>
  );
}
```

## Notes

- The hook listens on `mousedown`, not `click`. This fires before the click event, which prevents the trigger button's `click` handler from reopening a just-closed element.
- `callback` and `ref` are listed as effect dependencies. If `callback` is not memoised with `useCallback`, the listener will be removed and re-added on every render. Wrap the callback in `useCallback` at the call site when this matters.
- The listener is attached to `document`, so it captures events that bubble all the way up. Elements that stop propagation with `e.stopPropagation()` in a `mousedown` handler will prevent the callback from firing.
- Touch events are not explicitly handled; `mousedown` fires on touch devices through the synthetic event system, so the hook works on mobile without modification.
