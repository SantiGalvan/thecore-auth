# SingleSelect

> **English:** [docs/components/SingleSelect.md](../../components/SingleSelect.md) | **Versione italiana:** [docs/it/components/SingleSelect.md](../it/components/SingleSelect.md)

## Overview

Un selector de valor único completamente controlado, renderizado como una pila vertical de botones. Cada opción se muestra como una pastilla en mayúsculas; la opción activa se resalta en azul. Diseñado para conjuntos de opciones pequeños y enumerables donde todas las opciones deben ser visibles de un vistazo (p. ej., paneles de filtros, selectores de configuración).

## Import

```js
import { SingleSelect } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `options` | `string[]` | `[]` | No | Array de cadenas de texto a renderizar como botones seleccionables. |
| `value` | `string` | — | Yes | La opción actualmente seleccionada. Debe coincidir con una de las cadenas en `options`. |
| `onChange` | `(selected: string) => void` | — | Yes | Se llama con la cadena de la opción pulsada cuando el usuario selecciona un nuevo valor. |

## CSS Variables

`SingleSelect` no utiliza propiedades CSS personalizadas de `src/css/index.css`. Los estilos activo e inactivo son clases Tailwind codificadas directamente (`bg-blue-500`, `bg-white`, `border-blue-500`, `border-slate-100`).

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

- Todos los botones se renderizan con `type="button"` para evitar el envío accidental del formulario.
- La comprobación del estado activo es una comparación de igualdad estricta (`value === option`) — los valores deben ser únicos dentro de `options`.
- Las etiquetas se renderizan en mayúsculas mediante `uppercase tracking-tighter` — la visualización siempre es la cadena sin procesar de `options`; no existe una asignación separada de `label`/`value`. Si necesitas separar las etiquetas de visualización de los valores internos, deriva `options` de un array mapeado y convierte en `onChange`.
- No se aplica ningún contenedor de desplazamiento — para conjuntos de opciones grandes considera usar `MultiSelect` en su lugar.
