# InputGroup

> [Versione italiana](../../docs/it/components/InputGroup.md) | [Versión española](../../docs/es/components/InputGroup.md)

## Overview

`InputGroup` is a SPOT RFID compound input component that pairs a label with a text input field. It operates in two layout modes controlled by `isTag`:

- **Tag mode** (`isTag={true}`) — compact horizontal layout for read-only RFID tag fields (TID, EPC). The input is disabled.
- **Field mode** (`isTag={false}`, default) — standard layout with a `1/3 + 2/3` label-to-input ratio and generous margin, intended for editable configuration fields.

When an `error` string is provided the input border and focus ring switch to red and the error message appears below the field.

## Import

```jsx
import { InputGroup } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | ✅ | Text rendered in the label element |
| `id` | `string` | — | ✅ | HTML `id` shared between the label (`htmlFor`) and the input |
| `value` | `string` | `''` | — | Controlled value of the text input |
| `placeholder` | `string` | `undefined` | — | Placeholder text shown when the input is empty |
| `isTag` | `boolean` | `false` | — | Enables tag (read-only, compact) mode when `true` |
| `onChange` | `function` | `undefined` | — | Change handler for the input. Not called in tag mode (input is disabled). |
| `error` | `string \| null` | `null` | — | Validation error message. Triggers red border and displays the message below the input. |

## CSS Variables

| Variable | Default | Description |
|---|---|---|
| `--color-spot-rfid-input-border` | `#f56907` | Border color applied to the input on focus |
| `--shadow-spot-rfid-input` | `0 0 0 4px var(--color-focus-ring)` | Box shadow applied on focus |
| `--color-focus-ring` | `#f5690780` | Semi-transparent accent used in the focus shadow |
| `--color-focus-error` | `rgba(255,0,0,0.5)` | Semi-transparent red used in the error focus shadow |
| `--shadow-spot-rfid-error` | `0 0 0 4px var(--color-focus-error)` | Box shadow applied when `error` is set |

## Usage

```jsx
import { useState } from 'react';
import { InputGroup } from 'thecore-auth';

function ConfigPanel() {
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(null);

  const handleChange = (e) => {
    setAddress(e.target.value);
    setAddressError(e.target.value ? null : 'Address is required');
  };

  return (
    <div>
      {/* Editable field */}
      <InputGroup
        label="IP Address"
        id="ip-address"
        value={address}
        placeholder="e.g. 192.168.1.1"
        onChange={handleChange}
        error={addressError}
      />

      {/* Read-only tag field (tag mode) */}
      <InputGroup
        label="TID"
        id="tid-a"
        isTag={true}
        value="E2003412012345678901234A"
        placeholder="Read TAG A"
      />
    </div>
  );
}
```

## Notes

- In tag mode (`isTag={true}`) the underlying `Input` component receives `disabled={true}`, so `onChange` is never invoked even if provided.
- The `error` prop only affects visual styling and the message text — form validation logic must be implemented by the parent.
- `InputGroup` internally composes the library's `Input` and `InputLabel` components. Their individual CSS variables (input background, text color, border radius, padding) also apply here.
