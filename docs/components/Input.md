# Input

> **Versione italiana:** [docs/it/components/Input.md](../it/components/Input.md) | **Versión española:** [docs/es/components/Input.md](../es/components/Input.md)

## Overview

A controlled text input that wraps the native `<input>` element. It constrains `type` to a safe allow-list and applies the project's CSS-variable-driven design tokens by default. Any class can be replaced via `overrideStyle` or extended via `inputStyle`.

## Import

```js
import { Input } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `inputType` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url'` | `'text'` | No | Native input type. Falls back to `'text'` if an invalid value is supplied. |
| `inputId` | `string` | — | No | `id` attribute; pair with an `InputLabel` for accessibility. |
| `inputName` | `string` | — | No | `name` attribute for form submission. |
| `inputValue` | `string` | — | Yes | Controlled value. |
| `inputChange` | `(e: ChangeEvent) => void` | — | Yes | `onChange` handler. |
| `inputPlaceholder` | `string` | — | No | Placeholder text. |
| `inputRequired` | `boolean` | `true` | No | Maps to the native `required` attribute. |
| `autoFocus` | `boolean` | — | No | Auto-focuses the field on mount. |
| `inputStyle` | `string` | `''` | No | Extra Tailwind classes appended to the default class string. |
| `overrideStyle` | `string` | — | No | Replaces the entire default class string when provided. |
| `disabled` | `boolean` | — | No | Disables the input. |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Input background (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Border color (`border-input-border`) |
| `--color-input-text` | `#111827` | Text color (`text-input-text`) |
| `--text-input-placeholder` | `14px` | Placeholder font size (`text-input-placeholder`) |
| `--input-radius` | `8px` | Border radius (`.input-rounded`) |
| `--padding-input` | `10px` | Internal padding (`p-input`) |
| `--color-primary` | `#f56907` | Focus ring and border color |
| `--shadow-primary-input` | `inset 0 1px 1px …` | Focus box-shadow |

> Overriding any variable in `:root` or a parent selector propagates automatically to all `Input` instances inside that scope.

## Usage

```jsx
import { useState } from 'react';
import { Input, InputLabel } from 'thecore-auth';

function LoginFields() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1 mb-4">
        <InputLabel label="Email" labelId="email" />
        <Input
          inputType="email"
          inputId="email"
          inputName="email"
          inputPlaceholder="you@example.com"
          inputValue={email}
          inputChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel label="Password" labelId="password" />
        <Input
          inputType="password"
          inputId="password"
          inputName="password"
          inputPlaceholder="••••••••"
          inputValue={password}
          inputChange={(e) => setPassword(e.target.value)}
          inputStyle="font-mono tracking-widest"
        />
      </div>
    </form>
  );
}
```

## Notes

- `inputType` is validated against `['text', 'email', 'password', 'search', 'tel', 'url']`. Any unsupported value silently falls back to `'text'`.
- `inputRequired` defaults to `true` — pass `inputRequired={false}` explicitly for optional fields.
- Use `overrideStyle` to completely replace the default class string when design tokens do not apply.
- Use `inputStyle` to append classes without losing the default token-based styling.
