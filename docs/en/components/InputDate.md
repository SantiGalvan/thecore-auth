# InputDate

> **Versione italiana:** [docs/it/components/InputDate.md](../../it/components/InputDate.md) | **Versión española:** [docs/es/components/InputDate.md](../../es/components/InputDate.md)

## Overview

A labelled `<input type="date">` wrapped in a flex column container. It applies the project's CSS-variable-driven design tokens (background, border, focus ring, padding, radius) and supports a disabled state with dedicated opacity/cursor styles. An optional `children` slot allows appending validation messages or helper text below the input.

## Import

```js
import { InputDate } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | `string` | — | Yes | `id` attribute of the input; also used as the label's `htmlFor`. |
| `name` | `string` | — | No | `name` attribute for form submission. |
| `value` | `string` | `''` | No | Controlled value in `YYYY-MM-DD` format. |
| `onChange` | `(e: ChangeEvent) => void` | — | Yes | `onChange` handler. |
| `disabled` | `boolean` | — | No | Disables the input; applies muted styling automatically. |
| `required` | `boolean` | — | No | Maps to the native `required` attribute. |
| `title` | `string` | — | No | Label text rendered above the input. |
| `containerStyle` | `string` | `'flex flex-col gap-1 mx-auto w-full'` | No | Class string for the wrapping `<div>`. |
| `labelStyle` | `string` | See below | No | Class string for the `<label>`. |
| `inputStyle` | `string` | See below | No | Class string for the `<input>`. |
| `children` | `ReactNode` | — | No | Content rendered below the input (e.g., validation error messages). |

**Default `labelStyle`:** `mb-1 text-input-label font-medium text-color-label`

**Default `inputStyle`:** `bg-input-bg border border-input-border rounded-lg text-input-text placeholder:text-input-placeholder rounded-input focus:ring focus:ring-primary focus:border-primary focus:outline-none focus:shadow-[var(--shadow-primary-input)] block w-full h-[43px] p-input disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60`

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Input background (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Border color (`border-input-border`) |
| `--color-input-text` | `#111827` | Text color (`text-input-text`) |
| `--text-input-label` | `14px` | Label font size (`text-input-label`) |
| `--color-color-label` | `#111827` | Label text color (`text-color-label`) |
| `--input-radius` | `8px` | Border radius (`rounded-input`) |
| `--padding-input` | `10px` | Internal padding (`p-input`) |
| `--color-primary` | `#f56907` | Focus ring and border color |
| `--shadow-primary-input` | `inset 0 1px 1px …` | Focus box-shadow |

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

- `value` defaults to an empty string `""` when `undefined` is passed, preventing React's uncontrolled-to-controlled warning.
- The disabled state applies `bg-gray-100`, `text-gray-400`, `cursor-not-allowed`, and `opacity-60` through the default `inputStyle` — no extra prop is needed.
- Override `containerStyle`, `labelStyle`, or `inputStyle` individually; all three default strings remain available for copy-paste as a baseline.
- `children` is rendered inside the end-date `InputDate` by `InputStartEndDate` to display date-range validation errors — see the `InputStartEndDate` reference for the composed pattern.
