# CardInputTag

> [Versione italiana](../../docs/it/components/CardInputTag.md) | [Versión española](../../docs/es/components/CardInputTag.md)

## Overview

`CardInputTag` is a SPOT RFID card component that displays the TID and EPC values of a single RFID tag. It renders two read-only `InputGroup` fields and an optional write button. The card animates in from below using a CSS transition driven by the `showTag` prop.

The write button is disabled automatically when both `valueTID` and `valueEPC` are empty, preventing writes before the reader has returned data.

## Import

```jsx
import { CardInputTag } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `title` | `string` | — | ✅ | Card heading text (e.g. `'TAG A'`, `'TAG B'`). Also used in placeholder text. The value `'TAG B'` applies an extra `delay-200` to the entrance animation. |
| `showTag` | `boolean` | — | ✅ | Controls the entrance animation — `true` makes the card fully visible, `false` hides it with a downward offset. |
| `value` | `object` | `undefined` | — | Object containing the tag data. Shape: `{ valueTID: string, valueEPC: string }`. |
| `tag` | `string` | `undefined` | — | Suffix appended to the input `id` attributes (e.g. `'a'` → ids become `tid-a`, `epc-a`). Omit when rendering a single card. |
| `showButton` | `boolean` | — | ✅ | When `true`, the write button is **hidden**. When `false`, the write button is visible. |
| `handleClick` | `function` | `undefined` | — | Callback invoked when the write button is clicked. |

## CSS Variables

| Variable | Default | Description |
|---|---|---|
| `--color-write-button` | `#0284C7` | Background color of the write button |

## Usage

```jsx
import { useState } from 'react';
import { CardInputTag } from 'thecore-auth';

function TagPanel() {
  const [visible, setVisible] = useState(false);
  const [tagData, setTagData] = useState({ valueTID: '', valueEPC: '' });

  const handleWrite = () => {
    console.log('Writing tag:', tagData);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Start reading</button>

      <CardInputTag
        title="TAG A"
        showTag={visible}
        value={tagData}
        tag="a"
        showButton={false}
        handleClick={handleWrite}
      />

      {/* Second card with staggered animation delay */}
      <CardInputTag
        title="TAG B"
        showTag={visible}
        value={{ valueTID: 'E2003412AABBCCDD', valueEPC: '300833B2DDD9014000000000' }}
        tag="b"
        showButton={true}
        handleClick={() => {}}
      />
    </div>
  );
}
```

## Notes

- The write button is disabled (not hidden) when `value?.valueTID` and `value?.valueEPC` are both falsy. It becomes enabled as soon as either field is populated.
- `showButton={true}` hides the button entirely (the prop name is inverted — it controls whether to hide, not show).
- The `'TAG B'` title check is a hardcoded delay for staggered two-card layouts; for other title strings no delay is applied.
- `tag` is used to make input `id` attributes unique when multiple cards appear on the same page. Omit it only when a single card is rendered.
