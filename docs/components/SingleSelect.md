# SingleSelect

> **Versione italiana:** [docs/it/components/SingleSelect.md](../it/components/SingleSelect.md) | **Versión española:** [docs/es/components/SingleSelect.md](../es/components/SingleSelect.md)

## Overview

A fully controlled single-value selector rendered as a vertical stack of buttons. Each option is displayed as an uppercase pill; the active option is highlighted in blue. Intended for small, enumerable option sets where all choices should be visible at a glance (e.g., filter panels, configuration pickers).

## Import

```js
import { SingleSelect } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `options` | `string[]` | `[]` | No | Array of string values to render as selectable buttons. |
| `value` | `string` | — | Yes | The currently selected option. Must match one of the strings in `options`. |
| `onChange` | `(selected: string) => void` | — | Yes | Called with the clicked option string when the user selects a new value. |

## CSS Variables

`SingleSelect` does not use CSS custom properties from `src/css/index.css`. Active and inactive styles are hardcoded Tailwind classes (`bg-blue-500`, `bg-white`, `border-blue-500`, `border-slate-100`).

## Usage

```jsx
import { useState } from 'react';
import { SingleSelect } from 'thecore-auth';

const ROLES = ['Admin', 'Editor', 'Viewer'];

function RolePicker() {
  const [role, setRole] = useState('Viewer');

  return (
    <div className="w-48">
      <p className="mb-2 text-sm font-medium text-slate-600">Select role</p>
      <SingleSelect
        options={ROLES}
        value={role}
        onChange={setRole}
      />
      <p className="mt-3 text-xs text-slate-400">Selected: {role}</p>
    </div>
  );
}
```

## Notes

- All buttons render with `type="button"` to avoid accidental form submission.
- The active state check is a strict equality comparison (`value === option`) — values must be unique within `options`.
- Labels are rendered in uppercase via `uppercase tracking-tighter` — the display is always the raw string from `options`; there is no separate `label`/`value` mapping. If you need to separate display labels from internal values, derive `options` from a mapped array and convert on `onChange`.
- No scroll container is applied — for large option sets consider `MultiSelect` instead.
