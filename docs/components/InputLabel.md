# InputLabel

> **Versione italiana:** [docs/it/components/InputLabel.md](../it/components/InputLabel.md) | **Versión española:** [docs/es/components/InputLabel.md](../es/components/InputLabel.md)

## Overview

A thin wrapper around the HTML `<label>` element. It applies design-token-driven typography and visibility, and links to its paired input via `htmlFor`. The default display (`block` or `none`) is controlled by the `--label-display` CSS variable, making it easy to hide labels globally in compact layouts without removing them from the DOM (accessibility is preserved).

## Import

```js
import { InputLabel } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Text content of the label. |
| `labelId` | `string` | — | Yes | Value of the `htmlFor` attribute; must match the paired input's `id`. |
| `labelStyle` | `string` | `''` | No | Extra Tailwind classes appended to the default class string. |
| `overrideStyle` | `string` | — | No | Replaces the entire default class string when provided. |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--label-display` | `block` | Controls label visibility via `.show-label { display: var(--label-display) }` |
| `--text-input-label` | `14px` | Font size (`text-input-label`) |
| `--color-color-label` | `#111827` | Text color (`text-color-label`) |

> Set `--label-display: none` on a parent scope to hide all labels while keeping them in the DOM for screen readers.

## Usage

```jsx
import { Input, InputLabel } from 'thecore-auth';
import { useState } from 'react';

function SearchField() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col gap-1 w-full max-w-sm">
      <InputLabel
        label="Search"
        labelId="global-search"
        labelStyle="text-slate-600"
      />
      <Input
        inputType="search"
        inputId="global-search"
        inputName="q"
        inputPlaceholder="Type to search…"
        inputValue={query}
        inputChange={(e) => setQuery(e.target.value)}
        inputRequired={false}
      />
    </div>
  );
}
```

## Notes

- Always pair `labelId` with the corresponding input's `id` to satisfy accessibility requirements.
- `overrideStyle` removes the `.show-label` class, which means `--label-display` no longer controls visibility — use `labelStyle` to extend instead.
- The `.show-label` utility class is defined in `src/css/index.css` and reads `--label-display` from the theme.
