# ConfigFileReader

> [Versione italiana](../../docs/it/components/ConfigFileReader.md) | [Versión española](../../docs/es/components/ConfigFileReader.md)

## Overview

`ConfigFileReader` is a SPOT RFID component that presents a prompt and a button for selecting a `config.json` file. It is designed for environments where the native file-picker integration is provided externally (e.g. a WebView bridge or a custom file-system API) — the component itself only renders a button and delegates the actual file-open logic to `handleSelectFile`.

The component supports an optional entrance animation controlled by the combination of `isConfigPage` and `show`.

## Import

```jsx
import { ConfigFileReader } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `handleSelectFile` | `function` | — | ✅ | Called when the "Seleziona file" button is clicked. Responsible for opening a file picker or triggering a native bridge. |
| `show` | `boolean` | — | — | When `isConfigPage` is `true`, controls the entrance animation: `true` → visible, `false` → hidden with downward offset. |
| `isConfigPage` | `boolean` | — | — | Enables the animated show/hide behavior driven by `show`. When `false`, the component is always fully visible without animation. |

## CSS Variables

This component does not use SPOT RFID-specific CSS variables. General layout variables from the host application apply.

## Usage

```jsx
import { ConfigFileReader } from 'thecore-auth';

function ConfigPage({ isReady }) {
  const handleSelectFile = () => {
    // Trigger a WebView bridge call or a custom native file dialog
    window.NativeBridge?.openFilePicker('application/json');
  };

  return (
    <div>
      <ConfigFileReader
        isConfigPage={true}
        show={isReady}
        handleSelectFile={handleSelectFile}
      />
    </div>
  );
}
```

## Notes

- This component does **not** render a hidden `<input type="file">`. File selection is fully delegated to `handleSelectFile` — use [`ConfigFileReaderAllBrowser`](./ConfigFileReaderAllBrowser.md) for standard browser file-picker behavior.
- The animation is only active when `isConfigPage={true}`. When `isConfigPage` is `false` or omitted, `show` has no effect.
- The instruction text ("Seleziona il file **config.json**…") is fixed in Italian as a product requirement.
