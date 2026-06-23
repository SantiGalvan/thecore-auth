# CardInputRange

> [Versione italiana](../../docs/it/components/CardInputRange.md) | [Versión española](../../docs/es/components/CardInputRange.md)

## Overview

`CardInputRange` is a SPOT RFID card component for configuring RFID reader transmission power. It renders a styled range slider with a floating tooltip that tracks the current value, and a save button that commits the selected value.

The card animates in from below based on the `show` prop. The tooltip position is calculated as a percentage of the range so it always aligns with the slider thumb.

## Import

```jsx
import { CardInputRange } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `minReadingPower` | `number` | — | ✅ | Minimum value of the power range slider |
| `maxReadingPower` | `number` | — | ✅ | Maximum value of the power range slider |
| `stepRangePower` | `number` | — | ✅ | Step increment of the slider |
| `rangeValue` | `number` | — | ✅ | Current controlled value of the slider |
| `setRangeValue` | `function` | — | ✅ | State setter called with the new numeric value when the slider changes |
| `show` | `boolean` | — | ✅ | Controls the entrance animation — `true` makes the card visible, `false` hides it |
| `handleClick` | `function` | — | ✅ | Callback invoked with the current `rangeValue` when the save button is clicked |

## CSS Variables

| Variable | Default | Description |
|---|---|---|
| `--color-primary-accent` | `#f56907` | Accent color used for the slider thumb and track fill |
| `--color-save-button` | `#16A34A` | Background color of the save button |

## Usage

```jsx
import { useState } from 'react';
import { CardInputRange } from 'thecore-auth';

function PowerConfig() {
  const [power, setPower] = useState(20);
  const [visible, setVisible] = useState(false);

  const handleSave = (value) => {
    console.log('Saving power level:', value);
    // send to RFID reader API
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Configure power</button>

      <CardInputRange
        minReadingPower={0}
        maxReadingPower={30}
        stepRangePower={1}
        rangeValue={power}
        setRangeValue={setPower}
        show={visible}
        handleClick={handleSave}
      />
    </div>
  );
}
```

## Notes

- `setRangeValue` is called with a `Number` (via `Number(e.target.value)`) — the parent state must accept a number, not a string.
- `handleClick` receives the current `rangeValue` as its first argument; it does not receive the native event.
- The floating tooltip position can drift slightly at the extreme ends of the slider due to browser thumb width — this is a known cosmetic limitation of percentage-based tooltip positioning.
- The slider uses the `accent-primary-accent` Tailwind class which maps to `--color-primary-accent`; overriding this variable changes the thumb and filled-track color.
