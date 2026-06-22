# InputDate

> **English:** [docs/components/InputDate.md](../../components/InputDate.md) | **Versione italiana:** [docs/it/components/InputDate.md](../it/components/InputDate.md)

## Overview

Un `<input type="date">` con etiqueta envuelto en un contenedor flex en columna. Aplica los tokens de diseño basados en variables CSS del proyecto (fondo, borde, anillo de enfoque, relleno, radio) y soporta un estado deshabilitado con estilos de opacidad y cursor dedicados. Un slot `children` opcional permite añadir mensajes de validación o texto de ayuda debajo del input.

## Import

```js
import { InputDate } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | `string` | — | Yes | Atributo `id` del input; también se usa como `htmlFor` de la etiqueta. |
| `name` | `string` | — | No | Atributo `name` para el envío del formulario. |
| `value` | `string` | `''` | No | Valor controlado en formato `YYYY-MM-DD`. |
| `onChange` | `(e: ChangeEvent) => void` | — | Yes | Manejador de `onChange`. |
| `disabled` | `boolean` | — | No | Deshabilita el input; aplica estilos atenuados automáticamente. |
| `required` | `boolean` | — | No | Se corresponde con el atributo nativo `required`. |
| `title` | `string` | — | No | Texto de la etiqueta renderizado encima del input. |
| `containerStyle` | `string` | `'flex flex-col gap-1 mx-auto w-full'` | No | Cadena de clases para el `<div>` envolvente. |
| `labelStyle` | `string` | Ver abajo | No | Cadena de clases para el `<label>`. |
| `inputStyle` | `string` | Ver abajo | No | Cadena de clases para el `<input>`. |
| `children` | `ReactNode` | — | No | Contenido renderizado debajo del input (p. ej., mensajes de error de validación). |

**`labelStyle` predeterminado:** `mb-1 text-input-label font-medium text-color-label`

**`inputStyle` predeterminado:** `bg-input-bg border border-input-border rounded-lg text-input-text placeholder:text-input-placeholder rounded-input focus:ring focus:ring-primary focus:border-primary focus:outline-none focus:shadow-[var(--shadow-primary-input)] block w-full h-[43px] p-input disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60`

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Fondo del input (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Color del borde (`border-input-border`) |
| `--color-input-text` | `#111827` | Color del texto (`text-input-text`) |
| `--text-input-label` | `14px` | Tamaño de fuente de la etiqueta (`text-input-label`) |
| `--color-color-label` | `#111827` | Color del texto de la etiqueta (`text-color-label`) |
| `--input-radius` | `8px` | Radio del borde (`rounded-input`) |
| `--padding-input` | `10px` | Relleno interno (`p-input`) |
| `--color-primary` | `#f56907` | Color del anillo de enfoque y del borde |
| `--shadow-primary-input` | `inset 0 1px 1px …` | Box-shadow al enfocar |

## Usage

```jsx
import { useState } from 'react';
import { InputDate } from 'thecore-auth';

function BookingForm() {
  const [checkIn, setCheckIn] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCheckIn(e.target.value);
    setError('');
  };

  const validate = () => {
    if (!checkIn) setError('Check-in date is required.');
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); validate(); }}>
      <InputDate
        id="check-in"
        name="checkIn"
        title="Check-in date"
        value={checkIn}
        onChange={handleChange}
        required
      >
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </InputDate>

      <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Book
      </button>
    </form>
  );
}
```

## Notes

- `value` tiene como valor predeterminado una cadena vacía `""` cuando se pasa `undefined`, evitando la advertencia de React sobre pasar de componente no controlado a controlado.
- El estado deshabilitado aplica `bg-gray-100`, `text-gray-400`, `cursor-not-allowed` y `opacity-60` a través del `inputStyle` predeterminado — no se necesita ninguna prop adicional.
- Sobrescribe `containerStyle`, `labelStyle` o `inputStyle` individualmente; las tres cadenas predeterminadas siguen disponibles como punto de partida para copiar y pegar.
- `children` se renderiza dentro del slot `children` del `InputDate` de fecha de fin por `InputStartEndDate` para mostrar errores de validación de rango de fechas — consulta la referencia de `InputStartEndDate` para ver el patrón compuesto.
