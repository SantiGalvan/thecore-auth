# useCalendar

> [Versione italiana](../../it/hooks/useCalendar.md) | [Versión española](../../es/hooks/useCalendar.md)

## Overview

`useCalendar` provides holiday data and calendar utility functions for a given year and country. It uses the [`date-holidays`](https://github.com/commenthol/date-holidays) library to load the holiday list, exposes a fast lookup Map, and offers helpers to generate weeks, months, and arbitrary date ranges.

## Import

```js
import { useCalendar } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `year` | `number` | current year | The year for which holidays are loaded. |
| `country` | `string` | `"IT"` | ISO 3166-1 alpha-2 country code used by `date-holidays`. |

## Return value

| Key | Type | Description |
|-----|------|-------------|
| `holidays` | `object[]` | Raw holiday objects returned by `date-holidays` for the configured year. |
| `holidayMap` | `Map<string, object>` | Map keyed by `"YYYY-MM-DD"` for O(1) holiday lookup. |
| `isTodayHoliday` | `() => boolean` | Returns `true` if today is a holiday. |
| `isHoliday` | `(date: Date \| string) => boolean` | Returns `true` if the given date is a holiday. Accepts a `Date` object or a string in `"YYYY-MM-DD"` or `"DD/MM/YYYY"` format. |
| `getWeekDays` | `(date: Date \| string) => Date[]` | Returns an array of 7 `Date` objects for the Monday-to-Sunday week containing `date`. |
| `getWeeksInMonth` | `(month: number, year?: number) => Date[][]` | Returns an array of weeks, each a 7-element `Date[]`, covering the given month (0-indexed). |
| `getDaysInMonth` | `(month: number, year?: number) => Date[]` | Returns all days in the given month as `Date[]`. |
| `getDaysInMonths` | `(startMonth: number, startYear?: number, numMonths?: number) => Date[]` | Returns all days across `numMonths` consecutive months starting from `startMonth`. |
| `getDaysInYear` | `(year: number) => Date[]` | Returns all 365/366 days in the given year as `Date[]`. |

## Usage

```jsx
import { useCalendar } from 'thecore-auth';

function MonthView({ month, year }) {
  const { getWeeksInMonth, isHoliday, isTodayHoliday } = useCalendar(year, 'IT');

  const weeks = getWeeksInMonth(month, year);
  const today = new Date().toDateString();

  return (
    <div>
      {isTodayHoliday() && <p>Today is a public holiday!</p>}
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

## Notes

- Holidays are loaded asynchronously inside a `useEffect`. The `holidays` array and `holidayMap` are empty on the first render and populated once the effect runs. Guard against this if you render immediately on mount.
- `getDaysInMonths` handles year roll-overs: starting from month `10` with `numMonths = 6` correctly spans into the following year.
- `getWeeksInMonth` may include days from the preceding or following month to complete the first and last weeks of the grid. Check `day.getMonth() !== month` if you need to hide out-of-month days.
- Date keys in `holidayMap` are derived from local time (not UTC), so they match correctly regardless of the user's timezone offset.
