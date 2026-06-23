# dateUtils

> [English](../../utils/dateUtils.md) | [Versión española](../../es/utils/dateUtils.md)

## Panoramica

`dateUtils` è una raccolta di funzioni pure per la formattazione, la manipolazione e la conversione di oggetti `Date`. Tutte le funzioni sono non-mutanti: restituiscono sempre un nuovo valore e lasciano la `Date` originale invariata.

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

## Funzioni

### `toDatetimeLocalValue(date)`

Converte un oggetto `Date` in una stringa compatibile con `<input type="datetime-local">`.

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `date` | `Date` | La data da convertire. |

**Restituisce:** `string` — nel formato `"YYYY-MM-DDTHH:mm"`. Restituisce `''` se `date` non è un'istanza di `Date`.

```js
const dt = new Date(2025, 5, 23, 14, 30); // 23 giu 2025, 14:30
toDatetimeLocalValue(dt); // "2025-06-23T14:30"
```

---

### `setTime(date, hours, minutes, seconds)`

Restituisce una nuova `Date` con le componenti orarie specificate applicate alla data fornita.

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `date` | `Date` | La data base. |
| `hours` | `number` | Ore da impostare (0–23). |
| `minutes` | `number` | Minuti da impostare (0–59). Default `0`. |
| `seconds` | `number` | Secondi da impostare (0–59). Default `0`. |

**Restituisce:** `Date` — nuova data con l'orario specificato. Restituisce `null` se `date` non è un'istanza di `Date`.

```js
const base = new Date(2025, 5, 23);
setTime(base, 9, 30); // 2025-06-23 09:30:00
setTime(base, 17, 0, 0); // 2025-06-23 17:00:00
```

---

### `subtractDays(date, days)`

Restituisce una nuova `Date` che precede di `days` giorni la data fornita.

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `date` | `Date` | La data di partenza. |
| `days` | `number` | Numero di giorni da sottrarre. |

**Restituisce:** `Date` — nuova data spostata indietro di `days` giorni. Restituisce `null` se `date` non è un'istanza di `Date`.

```js
const today = new Date(2025, 5, 23);
subtractDays(today, 7); // 2025-06-16
subtractDays(today, 1); // 2025-06-22
```

---

### `parseUtcToLocal(utcString)`

Analizza una stringa di data UTC e la converte in un oggetto `Date` nel fuso orario locale del browser.

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `utcString` | `string` | Una stringa di data UTC (es. `"2025-06-23T12:00:00Z"`). |

**Restituisce:** `Date` — la `Date` equivalente nell'ora locale.

```js
// In un fuso UTC+2:
parseUtcToLocal('2025-06-23T10:00:00Z'); // 2025-06-23T12:00:00 locale
```

---

### `toDateValue(date)`

Converte un oggetto `Date` in una stringa compatibile con `<input type="date">` usando le componenti UTC.

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `date` | `Date` | La data da convertire. |

**Restituisce:** `string` — nel formato `"YYYY-MM-DD"`. Restituisce `''` se `date` non è un'istanza di `Date`.

```js
const d = new Date('2025-06-23T00:00:00Z');
toDateValue(d); // "2025-06-23"
```

---

## Utilizzo

```jsx
import { toDatetimeLocalValue, setTime, subtractDays, parseUtcToLocal, toDateValue } from 'thecore-auth';

function ShiftScheduler({ shiftDate }) {
  // Limita le prenotazioni agli ultimi 30 giorni
  const earliest = subtractDays(new Date(), 30);

  // Costruisce il valore datetime-local per l'inizio del turno alle 08:00
  const shiftStart = setTime(shiftDate, 8, 0, 0);
  const shiftStartValue = toDatetimeLocalValue(shiftStart);

  // Costruisce il valore datetime-local per la fine alle 17:00
  const shiftEnd = setTime(shiftDate, 17, 0, 0);
  const shiftEndValue = toDatetimeLocalValue(shiftEnd);

  // Mostra la data del turno da una stringa UTC ricevuta dall'API
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

## Note

- Tutte le funzioni sono **pure**: non modificano mai la `Date` di input.
- `toDatetimeLocalValue` usa le componenti dell'**ora locale** (`getHours`, `getDate`, …), quindi il risultato riflette il fuso orario dell'utente.
- `toDateValue` usa le **componenti UTC** (`getUTCFullYear`, `getUTCMonth`, `getUTCDate`), coerente con il modo in cui `<input type="date">` gestisce i valori.
- `parseUtcToLocal` applica manualmente `getTimezoneOffset()` per traslare il tempo. È utile quando il server restituisce un timestamp UTC che deve essere mostrato nell'ora locale senza affidarsi alla conversione automatica di JS.
- `setTime` azzera i millisecondi oltre a impostare ore, minuti e secondi specificati.
