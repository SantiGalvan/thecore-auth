# InputLabel

> **English:** [docs/components/InputLabel.md](../../components/InputLabel.md) | **Versione italiana:** [docs/it/components/InputLabel.md](../it/components/InputLabel.md)

## Overview

Un envoltorio delgado alrededor del elemento HTML `<label>`. Aplica tipografía y visibilidad basadas en tokens de diseño, y se vincula al input emparejado mediante `htmlFor`. La visualización predeterminada (`block` o `none`) está controlada por la variable CSS `--label-display`, lo que facilita ocultar etiquetas globalmente en diseños compactos sin eliminarlas del DOM (preservando la accesibilidad).

## Import

```js
import { InputLabel } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Contenido de texto de la etiqueta. |
| `labelId` | `string` | — | Yes | Valor del atributo `htmlFor`; debe coincidir con el `id` del input emparejado. |
| `labelStyle` | `string` | `''` | No | Clases Tailwind adicionales que se añaden a la cadena de clases predeterminada. |
| `overrideStyle` | `string` | — | No | Reemplaza toda la cadena de clases predeterminada cuando se proporciona. |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--label-display` | `block` | Controla la visibilidad de la etiqueta mediante `.show-label { display: var(--label-display) }` |
| `--text-input-label` | `14px` | Tamaño de fuente (`text-input-label`) |
| `--color-color-label` | `#111827` | Color del texto (`text-color-label`) |

> Establece `--label-display: none` en un ámbito padre para ocultar todas las etiquetas manteniendo su presencia en el DOM para lectores de pantalla.

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

- Siempre empareja `labelId` con el `id` del input correspondiente para cumplir los requisitos de accesibilidad.
- `overrideStyle` elimina la clase `.show-label`, lo que significa que `--label-display` ya no controla la visibilidad — usa `labelStyle` para extender en su lugar.
- La clase utilitaria `.show-label` está definida en `src/css/index.css` y lee `--label-display` desde el tema.
