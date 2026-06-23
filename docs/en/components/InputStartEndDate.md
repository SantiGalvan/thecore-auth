# InputStartEndDate

> **Versione italiana:** [docs/it/components/InputStartEndDate.md](../../it/components/InputStartEndDate.md) | **Versión española:** [docs/es/components/InputStartEndDate.md](../../es/components/InputStartEndDate.md)

## Overview

A date-range picker that composes two `InputDate` components side by side. The end-date field can be hidden with `endDateShow={false}`, and a validation error string (`dateError`) is rendered below the end-date input. Both fields share the same `onChange` handler, `disabled`, `required`, and `labelStyle` props, while each field can receive its own container and input style overrides.

## Import

```js
import { InputStartEndDate } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `startId` | `string` | — | Yes | `id` of the start-date input. |
| `endId` | `string` | — | No | `id` of the end-date input. |
| `startName` | `string` | — | No | `name` of the start-date input for form submission. |
| `endName` | `string` | — | No | `name` of the end-date input for form submission. |
| `startValue` | `string` | — | No | Controlled value of the start date (`YYYY-MM-DD`). |
| `endValue` | `string` | — | No | Controlled value of the end date (`YYYY-MM-DD`). |
| `onChange` | `(e: ChangeEvent) => void` | — | Yes | Shared `onChange` handler for both fields. |
| `disabled` | `boolean` | — | No | Disables both fields. |
| `required` | `boolean` | — | No | Makes both fields required. |
| `dateError` | `string` | — | No | Validation message shown below the end-date field in red. |
| `startTitle` | `string` | — | No | Label text for the start-date field. |
| `endTitle` | `string` | — | No | Label text for the end-date field. |
| `containerStyle` | `string` | `'flex gap-4 mx-auto w-full mb-4'` | No | Class string for the outer wrapper. |
| `startContainerStyle` | `string` | — | No | `containerStyle` forwarded to the start `InputDate`. |
| `endContainerStyle` | `string` | — | No | `containerStyle` forwarded to the end `InputDate`. |
| `startStyle` | `string` | — | No | `inputStyle` forwarded to the start `InputDate`. |
| `endStyle` | `string` | — | No | `inputStyle` forwarded to the end `InputDate`. |
| `labelStyle` | `string` | — | No | `labelStyle` forwarded to both `InputDate` components. |
| `endDateShow` | `boolean` | `true` | No | Set to `false` to render only the start-date field. |
| `children` | `ReactNode` | — | No | Extra content appended after both date fields inside the wrapper. |

## CSS Variables

`InputStartEndDate` delegates all rendering to `InputDate` — see [InputDate CSS Variables](./InputDate.md#css-variables) for the full list.

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

- `onChange` receives a standard DOM `ChangeEvent`; use `e.target.name` to distinguish between the two fields (pair with `startName` / `endName`).
- `dateError` is rendered inside the end-date `InputDate`'s `children` slot as a `<p className="text-red-500 text-[13px] mt-1">`. Provide `null` or omit the prop to suppress it.
- Set `endDateShow={false}` when you need a single-date picker but want to keep the same field-sizing and layout as the range variant.
- `children` is appended after both date fields in the outer wrapper — use it for actions (e.g., a "Clear" button) or supplementary messages.
- Both `InputDate` instances share the same `onChange`, `disabled`, `required`, and `labelStyle` — they cannot be configured independently for these props.
