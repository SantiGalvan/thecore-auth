# InputStartEndDate

> **English:** [docs/components/InputStartEndDate.md](../../components/InputStartEndDate.md) | **Versione italiana:** [docs/it/components/InputStartEndDate.md](../it/components/InputStartEndDate.md)

## Overview

Un selector de rango de fechas que compone dos componentes `InputDate` lado a lado. El campo de fecha de fin puede ocultarse con `endDateShow={false}`, y una cadena de error de validación (`dateError`) se renderiza debajo del input de fecha de fin. Ambos campos comparten el mismo manejador `onChange`, `disabled`, `required` y `labelStyle`, mientras que cada campo puede recibir sus propios sobreescrituras de estilo de contenedor e input.

## Import

```js
import { InputStartEndDate } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `startId` | `string` | — | Yes | `id` del input de fecha de inicio. |
| `endId` | `string` | — | No | `id` del input de fecha de fin. |
| `startName` | `string` | — | No | `name` del input de fecha de inicio para el envío del formulario. |
| `endName` | `string` | — | No | `name` del input de fecha de fin para el envío del formulario. |
| `startValue` | `string` | — | No | Valor controlado de la fecha de inicio (`YYYY-MM-DD`). |
| `endValue` | `string` | — | No | Valor controlado de la fecha de fin (`YYYY-MM-DD`). |
| `onChange` | `(e: ChangeEvent) => void` | — | Yes | Manejador de `onChange` compartido para ambos campos. |
| `disabled` | `boolean` | — | No | Deshabilita ambos campos. |
| `required` | `boolean` | — | No | Hace que ambos campos sean obligatorios. |
| `dateError` | `string` | — | No | Mensaje de validación mostrado debajo del campo de fecha de fin en rojo. |
| `startTitle` | `string` | — | No | Texto de la etiqueta para el campo de fecha de inicio. |
| `endTitle` | `string` | — | No | Texto de la etiqueta para el campo de fecha de fin. |
| `containerStyle` | `string` | `'flex gap-4 mx-auto w-full mb-4'` | No | Cadena de clases para el contenedor exterior. |
| `startContainerStyle` | `string` | — | No | `containerStyle` reenviado al `InputDate` de inicio. |
| `endContainerStyle` | `string` | — | No | `containerStyle` reenviado al `InputDate` de fin. |
| `startStyle` | `string` | — | No | `inputStyle` reenviado al `InputDate` de inicio. |
| `endStyle` | `string` | — | No | `inputStyle` reenviado al `InputDate` de fin. |
| `labelStyle` | `string` | — | No | `labelStyle` reenviado a ambos componentes `InputDate`. |
| `endDateShow` | `boolean` | `true` | No | Establece `false` para renderizar únicamente el campo de fecha de inicio. |
| `children` | `ReactNode` | — | No | Contenido adicional añadido después de ambos campos de fecha dentro del contenedor. |

## CSS Variables

`InputStartEndDate` delega todo el renderizado a `InputDate` — consulta las [Variables CSS de InputDate](./InputDate.md#css-variables) para la lista completa.

## Usage

```jsx
import { useState } from 'react';
import { InputStartEndDate } from 'thecore-auth';

function VacationPicker() {
  const [dates, setDates] = useState({ start: '', end: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => {
      const next = { ...prev, [name]: value };

      // Validate: end must not precede start
      if (next.start && next.end && next.end < next.start) {
        setError('End date must be after start date.');
      } else {
        setError('');
      }

      return next;
    });
  };

  return (
    <InputStartEndDate
      startId="vacation-start"
      endId="vacation-end"
      startName="start"
      endName="end"
      startTitle="From"
      endTitle="To"
      startValue={dates.start}
      endValue={dates.end}
      onChange={handleChange}
      dateError={error}
      required
    />
  );
}
```

## Notes

- `onChange` recibe un `ChangeEvent` DOM estándar; usa `e.target.name` para distinguir entre los dos campos (emparejar con `startName` / `endName`).
- `dateError` se renderiza dentro del slot `children` del `InputDate` de fecha de fin como un `<p className="text-red-500 text-[13px] mt-1">`. Proporciona `null` u omite la prop para suprimirlo.
- Establece `endDateShow={false}` cuando necesites un selector de fecha única pero quieras mantener el mismo tamaño de campo y diseño que la variante de rango.
- `children` se añade después de ambos campos de fecha en el contenedor exterior — úsalo para acciones (p. ej., un botón "Limpiar") o mensajes complementarios.
- Ambas instancias de `InputDate` comparten el mismo `onChange`, `disabled`, `required` y `labelStyle` — no pueden configurarse de forma independiente para estas props.
