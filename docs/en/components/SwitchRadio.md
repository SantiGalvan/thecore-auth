# SwitchRadio

> **Versione italiana:** [docs/it/components/SwitchRadio.md](../../it/components/SwitchRadio.md) | **Versión española:** [docs/es/components/SwitchRadio.md](../../es/components/SwitchRadio.md)

## Overview

A toggle switch rendered as an accessible `<button>`. Supports both **controlled** and **uncontrolled** modes:

- **Controlled** — pass a `value` prop and manage state externally.
- **Uncontrolled** — omit `value`; the component holds state internally, seeded by `defaultValue`.

In both modes the `onChange` callback is fired on every toggle.

## Import

```js
import { SwitchRadio } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `boolean` | — | No | Controlled on/off state. When provided the component is in controlled mode. |
| `defaultValue` | `boolean` | `false` | No | Initial state for uncontrolled mode. Re-seeded whenever it changes (only in uncontrolled mode). |
| `onChange` | `(next: boolean) => void` | — | No | Called with the new boolean value after every toggle, in both controlled and uncontrolled modes. |

## CSS Variables

`SwitchRadio` does not use CSS custom properties from `src/css/index.css`. Colors and sizes are hardcoded Tailwind classes (`bg-blue-500`, `bg-gray-300`, `w-14`, `h-6`).

## Usage

### Controlled

```jsx
import { useState } from 'react';
import { SwitchRadio } from 'thecore-auth';

function NotificationSettings() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Email notifications</span>
      <SwitchRadio
        value={enabled}
        onChange={setEnabled}
      />
      <span className="text-sm text-slate-500">{enabled ? 'On' : 'Off'}</span>
    </div>
  );
}
```

### Uncontrolled

```jsx
import { SwitchRadio } from 'thecore-auth';

function FeatureFlag() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Beta features</span>
      <SwitchRadio
        defaultValue={true}
        onChange={(next) => console.log('beta:', next)}
      />
    </div>
  );
}
```

## Notes

- The button renders with `aria-pressed` reflecting the current on/off state, ensuring screen reader compatibility.
- In uncontrolled mode, if the parent changes `defaultValue` the internal state re-syncs (via `useEffect`). This is intentional for cases where the default is loaded asynchronously (e.g., from an API).
- In controlled mode the parent is solely responsible for updating `value`; the component itself never mutates the prop.
- The component does not expose a `name`/`value` pair compatible with native form serialization — wire `onChange` to a hidden input if form submission is required.
