# dateUtils

> [Versione italiana](../../it/utils/dateUtils.md) | [Versión española](../../es/utils/dateUtils.md)

## Overview

`dateUtils` is a collection of pure date utility functions for formatting, manipulating, and converting `Date` objects. All functions are non-mutating: they always return a new value and leave the original `Date` unchanged.

## Import

```js
import {
  toDatetimeLocalValue,
  setTime,
  subtractDays,
  parseUtcToLocal,
  toDateValue,
} from 'thecore-auth';
```

## Functions

### `toDatetimeLocalValue(date)`

Converts a `Date` object to a string compatible with `<input type="datetime-local">`.

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date` | The date to convert. |

**Returns:** `string` — formatted as `"YYYY-MM-DDTHH:mm"`. Returns `''` if `date` is not a `Date` instance.

```js
const dt = new Date(2025, 5, 23, 14, 30); // 23 Jun 2025, 14:30
toDatetimeLocalValue(dt); // "2025-06-23T14:30"
```

---

### `setTime(date, hours, minutes, seconds)`

Returns a new `Date` with the specified time components applied to the given date.

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date` | The base date. |
| `hours` | `number` | Hours to set (0–23). |
| `minutes` | `number` | Minutes to set (0–59). Defaults to `0`. |
| `seconds` | `number` | Seconds to set (0–59). Defaults to `0`. |

**Returns:** `Date` — new date with the given time. Returns `null` if `date` is not a `Date` instance.

```js
const base = new Date(2025, 5, 23);
setTime(base, 9, 30); // 2025-06-23 09:30:00
setTime(base, 17, 0, 0); // 2025-06-23 17:00:00
```

---

### `subtractDays(date, days)`

Returns a new `Date` that is `days` days before the given date.

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date` | The starting date. |
| `days` | `number` | Number of days to subtract. |

**Returns:** `Date` — new date shifted back by `days` days. Returns `null` if `date` is not a `Date` instance.

```js
const today = new Date(2025, 5, 23);
subtractDays(today, 7); // 2025-06-16
subtractDays(today, 1); // 2025-06-22
```

---

### `parseUtcToLocal(utcString)`

Parses a UTC date string and converts it to a `Date` object in the browser's local timezone.

| Name | Type | Description |
|------|------|-------------|
| `utcString` | `string` | A UTC date string (e.g. `"2025-06-23T12:00:00Z"`). |

**Returns:** `Date` — the equivalent local-time `Date`.

```js
// In a UTC+2 timezone:
parseUtcToLocal('2025-06-23T10:00:00Z'); // 2025-06-23T12:00:00 local
```

---

### `toDateValue(date)`

Converts a `Date` object to a string compatible with `<input type="date">` using UTC components.

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date` | The date to convert. |

**Returns:** `string` — formatted as `"YYYY-MM-DD"`. Returns `''` if `date` is not a `Date` instance.

```js
const d = new Date('2025-06-23T00:00:00Z');
toDateValue(d); // "2025-06-23"
```

---

## Usage

```jsx
import { toDatetimeLocalValue, setTime, subtractDays, parseUtcToLocal, toDateValue } from 'thecore-auth';

function ShiftScheduler({ shiftDate }) {
  // Restrict bookings to the past 30 days
  const earliest = subtractDays(new Date(), 30);

  // Build a datetime-local value for the start of the shift day at 08:00
  const shiftStart = setTime(shiftDate, 8, 0, 0);
  const shiftStartValue = toDatetimeLocalValue(shiftStart);

  // Build a datetime-local value for the end at 17:00
  const shiftEnd = setTime(shiftDate, 17, 0, 0);
  const shiftEndValue = toDatetimeLocalValue(shiftEnd);

  // Display the shift date from a UTC string coming from the API
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

## Notes

- All functions are **pure**: they never mutate the input `Date`.
- `toDatetimeLocalValue` uses **local time** components (`getHours`, `getDate`, …), so the output reflects the user's timezone.
- `toDateValue` uses **UTC components** (`getUTCFullYear`, `getUTCMonth`, `getUTCDate`), which is consistent with how `<input type="date">` handles values.
- `parseUtcToLocal` manually applies `getTimezoneOffset()` to shift the time. This is useful when a server returns a UTC timestamp that needs to be displayed as local time without relying on automatic JS timezone conversion.
- `setTime` resets milliseconds to `0` in addition to the specified hours, minutes, and seconds.
