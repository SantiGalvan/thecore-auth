# dateUtils

> [English](../../utils/dateUtils.md) | [Versione italiana](../../it/utils/dateUtils.md)

## Descripción general

`dateUtils` es una colección de funciones puras para dar formato, manipular y convertir objetos `Date`. Todas las funciones son no-mutantes: siempre devuelven un nuevo valor y dejan el `Date` original sin modificar.

## Importación

```js
import {
  toDatetimeLocalValue,
  setTime,
  subtractDays,
  parseUtcToLocal,
  toDateValue,
} from 'thecore-auth';
```

## Funciones

### `toDatetimeLocalValue(date)`

Convierte un objeto `Date` en una cadena compatible con `<input type="datetime-local">`.

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `date` | `Date` | La fecha a convertir. |

**Devuelve:** `string` — con el formato `"YYYY-MM-DDTHH:mm"`. Devuelve `''` si `date` no es una instancia de `Date`.

```js
const dt = new Date(2025, 5, 23, 14, 30); // 23 jun 2025, 14:30
toDatetimeLocalValue(dt); // "2025-06-23T14:30"
```

---

### `setTime(date, hours, minutes, seconds)`

Devuelve un nuevo `Date` con los componentes de hora especificados aplicados a la fecha dada.

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `date` | `Date` | La fecha base. |
| `hours` | `number` | Horas a establecer (0–23). |
| `minutes` | `number` | Minutos a establecer (0–59). Por defecto `0`. |
| `seconds` | `number` | Segundos a establecer (0–59). Por defecto `0`. |

**Devuelve:** `Date` — nueva fecha con la hora especificada. Devuelve `null` si `date` no es una instancia de `Date`.

```js
const base = new Date(2025, 5, 23);
setTime(base, 9, 30); // 2025-06-23 09:30:00
setTime(base, 17, 0, 0); // 2025-06-23 17:00:00
```

---

### `subtractDays(date, days)`

Devuelve un nuevo `Date` que precede en `days` días a la fecha dada.

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `date` | `Date` | La fecha de inicio. |
| `days` | `number` | Número de días a restar. |

**Devuelve:** `Date` — nueva fecha desplazada `days` días hacia atrás. Devuelve `null` si `date` no es una instancia de `Date`.

```js
const today = new Date(2025, 5, 23);
subtractDays(today, 7); // 2025-06-16
subtractDays(today, 1); // 2025-06-22
```

---

### `parseUtcToLocal(utcString)`

Analiza una cadena de fecha UTC y la convierte en un objeto `Date` en el huso horario local del navegador.

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `utcString` | `string` | Una cadena de fecha UTC (p. ej. `"2025-06-23T12:00:00Z"`). |

**Devuelve:** `Date` — el `Date` equivalente en hora local.

```js
// En una zona UTC+2:
parseUtcToLocal('2025-06-23T10:00:00Z'); // 2025-06-23T12:00:00 local
```

---

### `toDateValue(date)`

Convierte un objeto `Date` en una cadena compatible con `<input type="date">` usando los componentes UTC.

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `date` | `Date` | La fecha a convertir. |

**Devuelve:** `string` — con el formato `"YYYY-MM-DD"`. Devuelve `''` si `date` no es una instancia de `Date`.

```js
const d = new Date('2025-06-23T00:00:00Z');
toDateValue(d); // "2025-06-23"
```

---

## Uso

```jsx
import { toDatetimeLocalValue, setTime, subtractDays, parseUtcToLocal, toDateValue } from 'thecore-auth';

function ShiftScheduler({ shiftDate }) {
  // Restringe las reservas a los últimos 30 días
  const earliest = subtractDays(new Date(), 30);

  // Construye el valor datetime-local para el inicio del turno a las 08:00
  const shiftStart = setTime(shiftDate, 8, 0, 0);
  const shiftStartValue = toDatetimeLocalValue(shiftStart);

  // Construye el valor datetime-local para el fin a las 17:00
  const shiftEnd = setTime(shiftDate, 17, 0, 0);
  const shiftEndValue = toDatetimeLocalValue(shiftEnd);

  // Muestra la fecha del turno desde una cadena UTC recibida de la API
  const localShiftDate = parseUtcToLocal(shiftDate.toISOString());
  const dateInputValue = toDateValue(localShiftDate);

  return (
    <form>
      <input type="date" value={dateInputValue} min={toDateValue(earliest)} readOnly />
      <input type="datetime-local" value={shiftStartValue} readOnly />
      <input type="datetime-local" value={shiftEndValue} readOnly />
    </form>
  );
}
```

## Notas

- Todas las funciones son **puras**: nunca mutan el `Date` de entrada.
- `toDatetimeLocalValue` usa los componentes de la **hora local** (`getHours`, `getDate`, …), por lo que el resultado refleja el huso horario del usuario.
- `toDateValue` usa los **componentes UTC** (`getUTCFullYear`, `getUTCMonth`, `getUTCDate`), coherente con cómo `<input type="date">` gestiona los valores.
- `parseUtcToLocal` aplica manualmente `getTimezoneOffset()` para desplazar la hora. Es útil cuando el servidor devuelve un timestamp UTC que debe mostrarse en hora local sin depender de la conversión automática de JS.
- `setTime` pone a cero los milisegundos además de establecer las horas, minutos y segundos especificados.
