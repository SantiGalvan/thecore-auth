# MultiSelect

> **English:** [docs/components/MultiSelect.md](../../components/MultiSelect.md) | **Versione italiana:** [docs/it/components/MultiSelect.md](../it/components/MultiSelect.md)

## Overview

Un desplegable con búsqueda y selección múltiple. Los elementos seleccionados aparecen como etiquetas eliminables dentro del disparador. Al hacer clic en el disparador se abre un desplegable con un input de búsqueda y una lista con scroll. Hacer clic en un elemento alterna su selección; hacer clic fuera cierra el desplegable (`useClickOutside`).

Soporta dos modos de selección:
- **Modo directo** — `updateFilter` recibe el nuevo `Array` de elementos seleccionados directamente.
- **Modo filter-key** — pasa una cadena `type` y `updateFilter` recibe una función actualizadora de estado que parchea un objeto de filtro con clave.

## Import

```js
import { MultiSelect } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `object[]` | — | Yes | Lista completa de opciones a mostrar. Cada elemento debe tener una propiedad `idKey` única. |
| `value` | `object[]` | `[]` | No | Elementos actualmente seleccionados. Debe ser un subconjunto de `items`. |
| `label` | `string` | — | No | Etiqueta de cabecera renderizada encima del disparador. |
| `placeholder` | `string` | — | No | Texto de marcador de posición mostrado dentro del disparador cuando no hay nada seleccionado. |
| `displayKey` | `string \| string[]` | — | No | Clave(s) de cada elemento usadas para construir la cadena de visualización. Acepta una sola clave o un array de claves unidas por un espacio. Recurre a `code`, `name`, `label` o `idKey` cuando se omite. |
| `valueKey` | `string` | — | No | Clave usada para renderizar la etiqueta del tag (sobreescribe `displayKey` dentro de los tags). |
| `idKey` | `string` | `'id'` | No | Clave usada como identificador único para cada elemento. |
| `type` | `string` | — | No | Cuando se proporciona, activa el modo filter-key: `updateFilter` se llama con un actualizador de estado que parchea `prev[type]`. |
| `updateFilter` | `Function` | — | Yes | Manejador de cambio de selección. En modo directo recibe el nuevo `object[]`; en modo filter-key recibe un actualizador `(prev) => next`. |
| `searchPlaceholder` | `string` | `'Cerca...'` | No | Marcador de posición para el input de búsqueda dentro del desplegable. |
| `noResultsText` | `string` | `'Nessun risultato'` | No | Texto mostrado cuando la búsqueda no coincide con ningún elemento. |
| `classNames` | `object` | `{}` | No | Sobreescrituras parciales de nombres de clase fusionadas con los predeterminados. Ver **Claves de Class Name** abajo. |

### Claves de Class Name

Todas las claves son opcionales. Las claves no especificadas recurren a los predeterminados definidos en el código fuente.

| Key | Targets |
|---|---|
| `container` | `<div>` más externo |
| `label` | `<div>` de la etiqueta de cabecera |
| `trigger` | `<div>` del disparador al hacer clic |
| `placeholder` | `<span>` del marcador de posición |
| `tag` | `<span>` de cada tag de elemento seleccionado |
| `tagButton` | Botón de eliminación dentro de cada tag |
| `chevron` | Icono del chevron |
| `dropdown` | `<div>` del desplegable |
| `searchInput` | `<input>` de búsqueda |
| `list` | `<ul>` |
| `listItem` | Cada `<li>` |
| `listItemSelected` | Añadido al `<li>` cuando el elemento está seleccionado |
| `noResults` | `<li>` de "Sin resultados" |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Fondo del desplegable (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Borde del desplegable (`border-input-border`) |
| `--text-input-label` | `14px` | Tamaño de fuente de la etiqueta (`text-input-label`) |
| `--color-color-label` | `#111827` | Color del texto de la etiqueta (`text-color-label`) |

## Usage

```jsx
import { useState } from 'react';
import { MultiSelect } from 'thecore-auth';

const TAGS = [
  { id: 1, name: 'React' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Tailwind' },
  { id: 4, name: 'Vite' },
];

function TechStackPicker() {
  const [selected, setSelected] = useState([]);

  return (
    <div className="w-80">
      <MultiSelect
        label="Tech stack"
        items={TAGS}
        value={selected}
        placeholder="Select technologies…"
        displayKey="name"
        idKey="id"
        updateFilter={setSelected}
        searchPlaceholder="Search…"
        noResultsText="No technologies found"
      />
      <p className="text-xs text-slate-400">
        Selected: {selected.map((t) => t.name).join(', ') || 'none'}
      </p>
    </div>
  );
}
```

### Filter-key mode

```jsx
// Manage a composite filter object with multiple MultiSelect instances
const [filters, setFilters] = useState({ tags: [], categories: [] });

<MultiSelect
  items={TAGS}
  value={filters.tags}
  type="tags"
  updateFilter={setFilters}
  displayKey="name"
  idKey="id"
  placeholder="Filter by tag…"
/>
```

## Notes

- El input de búsqueda se enfoca automáticamente cuando se abre el desplegable.
- Hacer clic fuera del componente cierra el desplegable mediante `useClickOutside` de `src/hooks/ui/useClickOutside`.
- El icono del chevron rota 180° cuando el desplegable está abierto (clase Tailwind `rotate-180`).
- `EMPTY_ARRAY` es una constante a nivel de módulo usada como valor predeterminado para `value` para preservar la estabilidad referencial y evitar re-renderizados innecesarios.
- `displayKey` como array combina múltiples campos (`['firstName', 'lastName']` → `"John Doe"`); los valores de campo falsy se filtran antes de unirse.
- Los valores predeterminados de `searchPlaceholder` y `noResultsText` están en italiano — sobrescríbelos para otras configuraciones regionales.
