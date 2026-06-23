# ConfigFileReaderAllBrowser

> [Versione italiana](../../docs/it/components/ConfigFileReaderAllBrowser.md) | [Versión española](../../docs/es/components/ConfigFileReaderAllBrowser.md)

## Overview

`ConfigFileReaderAllBrowser` is a SPOT RFID component that provides a cross-browser file selector for a `config.json` file. Unlike [`ConfigFileReader`](./ConfigFileReader.md), it renders a hidden `<input type="file" accept=".json">` and uses a `ref` to trigger it programmatically when the visible button is clicked — making it compatible with standard desktop and mobile browsers without requiring a native bridge.

On iOS (iPad/iPhone/iPod), an additional instructional message guides the user to save the file to the iOS Files app before selecting it, working around the iOS file-access restrictions.

The component supports an optional entrance animation controlled by `isConfigPage` and `show`.

## Import

```jsx
import { ConfigFileReaderAllBrowser } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `handleFileChange` | `function` | — | ✅ | `onChange` handler for the hidden file input. Receives the native `ChangeEvent`. Use `event.target.files[0]` to read the selected file. |
| `show` | `boolean` | — | — | When `isConfigPage` is `true`, controls the entrance animation: `true` → visible, `false` → hidden with downward offset. |
| `isConfigPage` | `boolean` | — | — | Enables the animated show/hide behavior driven by `show`. When `false`, the component is always fully visible without animation. |

## CSS Variables

This component does not use SPOT RFID-specific CSS variables. General layout variables from the host application apply.

## Usage

```jsx
import { ConfigFileReaderAllBrowser } from 'thecore-auth';

function ConfigPage({ isReady }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);
        console.log('Loaded config:', config);
      } catch {
        console.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <ConfigFileReaderAllBrowser
        isConfigPage={true}
        show={isReady}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}
```

## Notes

- The iOS detection (`/iPad|iPhone|iPod/.test(navigator.userAgent)`) runs at module evaluation time, not inside the component — it is not reactive to user-agent changes during the session.
- The hidden `<input type="file">` accepts only `.json` files (`accept=".json"`). The file-type restriction is enforced by the browser UI; `handleFileChange` should still validate the file contents.
- Use this component instead of [`ConfigFileReader`](./ConfigFileReader.md) when no native WebView bridge is available.
- The animation behavior is identical to `ConfigFileReader`: active only when `isConfigPage={true}`.
- The instruction text and iOS guidance message are fixed in Italian as a product requirement.
