# SwitchRadio

> **English:** [docs/components/SwitchRadio.md](../../components/SwitchRadio.md) | **Versione italiana:** [docs/it/components/SwitchRadio.md](../it/components/SwitchRadio.md)

## Overview

Un interruptor de palanca renderizado como un `<button>` accesible. Soporta los modos **controlado** y **no controlado**:

- **Controlado** — pasa una prop `value` y gestiona el estado externamente.
- **No controlado** — omite `value`; el componente mantiene el estado internamente, inicializado con `defaultValue`.

En ambos modos, el callback `onChange` se dispara en cada cambio.

## Import

```js
import { SwitchRadio } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `boolean` | — | No | Estado encendido/apagado controlado. Cuando se proporciona, el componente está en modo controlado. |
| `defaultValue` | `boolean` | `false` | No | Estado inicial para el modo no controlado. Se reinicializa cuando cambia (solo en modo no controlado). |
| `onChange` | `(next: boolean) => void` | — | No | Se llama con el nuevo valor booleano tras cada cambio, tanto en modo controlado como no controlado. |

## CSS Variables

`SwitchRadio` no utiliza propiedades CSS personalizadas de `src/css/index.css`. Los colores y tamaños son clases Tailwind codificadas directamente (`bg-blue-500`, `bg-gray-300`, `w-14`, `h-6`).

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

- El botón se renderiza con `aria-pressed` reflejando el estado encendido/apagado actual, garantizando la compatibilidad con lectores de pantalla.
- En modo no controlado, si el padre cambia `defaultValue`, el estado interno se resincroniza (mediante `useEffect`). Esto es intencional para casos donde el valor predeterminado se carga de forma asíncrona (p. ej., desde una API).
- En modo controlado, el padre es el único responsable de actualizar `value`; el componente nunca muta la prop.
- El componente no expone un par `name`/`value` compatible con la serialización nativa de formularios — conecta `onChange` a un input oculto si se requiere el envío del formulario.
