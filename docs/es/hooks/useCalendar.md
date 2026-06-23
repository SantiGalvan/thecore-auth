# useCalendar

> [English](../../../docs/en/hooks/useCalendar.md) | [Versione italiana](../../it/hooks/useCalendar.md)

## Descripción general

`useCalendar` proporciona datos de festivos y funciones de utilidad del calendario para un año y país determinados. Usa la librería [`date-holidays`](https://github.com/commenthol/date-holidays) para cargar la lista de festivos, expone un Map de búsqueda rápida y ofrece helpers para generar semanas, meses y rangos de fechas arbitrarios.

## Importación

```js
import { useCalendar } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `year` | `number` | año actual | El año para el que se cargan los festivos. |
| `country` | `string` | `"IT"` | Código de país ISO 3166-1 alpha-2 usado por `date-holidays`. |

## Valor de retorno

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `holidays` | `object[]` | Objetos de festivos sin procesar devueltos por `date-holidays` para el año configurado. |
| `holidayMap` | `Map<string, object>` | Map con clave `"YYYY-MM-DD"` para búsqueda O(1) de festivos. |
| `isTodayHoliday` | `() => boolean` | Devuelve `true` si hoy es un día festivo. |
| `isHoliday` | `(date: Date \| string) => boolean` | Devuelve `true` si la fecha proporcionada es un día festivo. Acepta un objeto `Date` o una cadena en formato `"YYYY-MM-DD"` o `"DD/MM/YYYY"`. |
| `getWeekDays` | `(date: Date \| string) => Date[]` | Devuelve un array de 7 objetos `Date` para la semana de lunes a domingo que contiene `date`. |
| `getWeeksInMonth` | `(month: number, year?: number) => Date[][]` | Devuelve un array de semanas, cada una un `Date[]` de 7 elementos, que cubren el mes dado (indexado en 0). |
| `getDaysInMonth` | `(month: number, year?: number) => Date[]` | Devuelve todos los días del mes dado como `Date[]`. |
| `getDaysInMonths` | `(startMonth: number, startYear?: number, numMonths?: number) => Date[]` | Devuelve todos los días en `numMonths` meses consecutivos a partir de `startMonth`. |
| `getDaysInYear` | `(year: number) => Date[]` | Devuelve los 365/366 días del año dado como `Date[]`. |

## Uso

```jsx
import { useCalendar } from 'thecore-auth';

function MonthView({ month, year }) {
  const { getWeeksInMonth, isHoliday, isTodayHoliday } = useCalendar(year, 'IT');

  const weeks = getWeeksInMonth(month, year);
  const today = new Date().toDateString();

  return (
    <div>
      {isTodayHoliday() && <p>¡Hoy es un día festivo!</p>}
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

## Notas

- Los festivos se cargan de forma asíncrona dentro de un `useEffect`. El array `holidays` y `holidayMap` están vacíos en el primer render y se llenan una vez que el efecto se ejecuta. Protegerse contra esto si se renderiza inmediatamente al montarse.
- `getDaysInMonths` maneja los cambios de año: comenzando desde el mes `10` con `numMonths = 6` se extiende correctamente al año siguiente.
- `getWeeksInMonth` puede incluir días del mes anterior o posterior para completar las primeras y últimas semanas de la cuadrícula. Comprobar `day.getMonth() !== month` si se necesita ocultar los días fuera del mes.
- Las claves de fecha en `holidayMap` se derivan de la hora local (no UTC), por lo que coinciden correctamente independientemente del desplazamiento de zona horaria del usuario.
