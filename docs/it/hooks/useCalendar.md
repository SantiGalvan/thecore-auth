# useCalendar

> [English](../../../docs/en/hooks/useCalendar.md) | [Versión española](../../es/hooks/useCalendar.md)

## Panoramica

`useCalendar` fornisce dati sulle festività e funzioni di utilità del calendario per un dato anno e paese. Usa la libreria [`date-holidays`](https://github.com/commenthol/date-holidays) per caricare l'elenco delle festività, espone una Map per ricerche veloci e offre helper per generare settimane, mesi e intervalli di date arbitrari.

## Importazione

```js
import { useCalendar } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `year` | `number` | anno corrente | L'anno per cui vengono caricate le festività. |
| `country` | `string` | `"IT"` | Codice paese ISO 3166-1 alpha-2 usato da `date-holidays`. |

## Valore restituito

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `holidays` | `object[]` | Oggetti festività grezzi restituiti da `date-holidays` per l'anno configurato. |
| `holidayMap` | `Map<string, object>` | Map con chiave `"YYYY-MM-DD"` per ricerca O(1) delle festività. |
| `isTodayHoliday` | `() => boolean` | Restituisce `true` se oggi è una festività. |
| `isHoliday` | `(date: Date | string) => boolean` | Restituisce `true` se la data fornita è una festività. Accetta un oggetto `Date` o una stringa nel formato `"YYYY-MM-DD"` o `"DD/MM/YYYY"`. |
| `getWeekDays` | `(date: Date | string) => Date[]` | Restituisce un array di 7 oggetti `Date` per la settimana da lunedì a domenica contenente `date`. |
| `getWeeksInMonth` | `(month: number, year?: number) => Date[][]` | Restituisce un array di settimane, ciascuna un `Date[]` di 7 elementi, che coprono il mese dato (con indice 0). |
| `getDaysInMonth` | `(month: number, year?: number) => Date[]` | Restituisce tutti i giorni del mese dato come `Date[]`. |
| `getDaysInMonths` | `(startMonth: number, startYear?: number, numMonths?: number) => Date[]` | Restituisce tutti i giorni in `numMonths` mesi consecutivi a partire da `startMonth`. |
| `getDaysInYear` | `(year: number) => Date[]` | Restituisce tutti i 365/366 giorni dell'anno dato come `Date[]`. |

## Utilizzo

```jsx
import { useCalendar } from 'thecore-auth';

function MonthView({ month, year }) {
  const { getWeeksInMonth, isHoliday, isTodayHoliday } = useCalendar(year, 'IT');

  const weeks = getWeeksInMonth(month, year);
  const today = new Date().toDateString();

  return (
    <div>
      {isTodayHoliday() && <p>Oggi è un giorno festivo!</p>}
      {weeks.map((week, wi) => (
        <div key={wi} style={{ display: 'flex' }}>
          {week.map((day, di) => (
            <div
              key={di}
              style={{
                background: isHoliday(day) ? '#fdd' : day.toDateString() === today ? '#dfd' : '#fff',
                border: '1px solid #ccc',
                padding: '4px 8px',
                minWidth: 36,
                textAlign: 'center',
              }}
            >
              {day.getDate()}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
```

## Note

- Le festività vengono caricate in modo asincrono all'interno di un `useEffect`. L'array `holidays` e `holidayMap` sono vuoti al primo render e popolati una volta che l'effetto viene eseguito. Fare attenzione a questo se si esegue il rendering immediatamente al mount.
- `getDaysInMonths` gestisce il cambio di anno: partendo dal mese `10` con `numMonths = 6` si estende correttamente nell'anno successivo.
- `getWeeksInMonth` può includere giorni del mese precedente o successivo per completare le prime e ultime settimane della griglia. Controllare `day.getMonth() !== month` se si vogliono nascondere i giorni fuori dal mese.
- Le chiavi delle date in `holidayMap` sono derivate dall'ora locale (non UTC), quindi corrispondono correttamente indipendentemente dall'offset del fuso orario dell'utente.
