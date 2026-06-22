# Input

> **English:** [docs/components/Input.md](../../components/Input.md) | **Versione italiana:** [docs/it/components/Input.md](../it/components/Input.md)

## Overview

Un input de texto controlado que envuelve el elemento nativo `<input>`. Restringe `type` a una lista de valores permitidos seguros y aplica los tokens de diseño basados en variables CSS del proyecto por defecto. Cualquier clase puede ser reemplazada con `overrideStyle` o extendida con `inputStyle`.

## Import

```js
import { Input } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `inputType` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url'` | `'text'` | No | Tipo nativo del input. Vuelve a `'text'` si se proporciona un valor no válido. |
| `inputId` | `string` | — | No | Atributo `id`; emparejar con un `InputLabel` para accesibilidad. |
| `inputName` | `string` | — | No | Atributo `name` para el envío del formulario. |
| `inputValue` | `string` | — | Yes | Valor controlado. |
| `inputChange` | `(e: ChangeEvent) => void` | — | Yes | Manejador de `onChange`. |
| `inputPlaceholder` | `string` | — | No | Texto de marcador de posición. |
| `inputRequired` | `boolean` | `true` | No | Se corresponde con el atributo nativo `required`. |
| `autoFocus` | `boolean` | — | No | Enfoca automáticamente el campo al montar. |
| `inputStyle` | `string` | `''` | No | Clases Tailwind adicionales que se añaden a la cadena de clases predeterminada. |
| `overrideStyle` | `string` | — | No | Reemplaza toda la cadena de clases predeterminada cuando se proporciona. |
| `disabled` | `boolean` | — | No | Deshabilita el input. |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Fondo del input (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Color del borde (`border-input-border`) |
| `--color-input-text` | `#111827` | Color del texto (`text-input-text`) |
| `--text-input-placeholder` | `14px` | Tamaño de fuente del marcador de posición (`text-input-placeholder`) |
| `--input-radius` | `8px` | Radio del borde (`.input-rounded`) |
| `--padding-input` | `10px` | Relleno interno (`p-input`) |
| `--color-primary` | `#f56907` | Color del anillo de enfoque y del borde |
| `--shadow-primary-input` | `inset 0 1px 1px …` | Box-shadow al enfocar |

> Sobrescribir cualquier variable en `:root` o en un selector padre se propaga automáticamente a todas las instancias de `Input` dentro de ese ámbito.

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

- `inputType` se valida contra `['text', 'email', 'password', 'search', 'tel', 'url']`. Cualquier valor no soportado regresa silenciosamente a `'text'`.
- `inputRequired` tiene como valor predeterminado `true` — pasa `inputRequired={false}` explícitamente para campos opcionales.
- Usa `overrideStyle` para reemplazar completamente la cadena de clases predeterminada cuando los tokens de diseño no aplican.
- Usa `inputStyle` para añadir clases sin perder el estilo predeterminado basado en tokens.
