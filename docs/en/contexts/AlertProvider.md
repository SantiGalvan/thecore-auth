# AlertProvider / useAlert

> 🇮🇹 [Italiano](../../it/contexts/AlertProvider.md) | 🇪🇸 [Español](../../es/contexts/AlertProvider.md)

## Overview

`AlertProvider` manages in-app notifications. On desktop it renders a banner alert component; on mobile/tablet it uses Sileo toast notifications (when `sileoToastEnabled: true` in config). Four severity types are supported: `danger`, `info`, `success`, `warning`.

---

## Setup

Place `AlertProvider` inside `ConfigProvider` (it reads `sileoToastEnabled` and `customDeviceType` from config).

```jsx
import { ConfigProvider, AlertProvider } from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      <AlertProvider>
        {/* your app */}
      </AlertProvider>
    </ConfigProvider>
  );
}
```

To display the alert banner, render the `Alert` component (from `thecore-auth`) somewhere in your layout — typically at the top level inside `AlertProvider`.

---

## Hook API

```js
const alert = useAlert();
```

| Value | Type | Description |
|---|---|---|
| `showAlert` | `boolean` | Whether the alert banner is currently visible |
| `setShowAlert` | `(value: boolean) => void` | Manually show or hide the alert banner |
| `typeAlert` | `'danger' \| 'info' \| 'success' \| 'warning'` | Current alert severity |
| `setTypeAlert` | `(type: string) => void` | Override the alert type directly |
| `messageAlert` | `string` | Current alert message text |
| `setMessageAlert` | `(message: string) => void` | Override the message directly |
| `alertConfig` | `Record<string, object>` | Tailwind class maps for each alert type (colors, hover, ring, progress) |
| `getIcon` | `(type: string) => ReactElement` | Returns the icon component for the given alert type |
| `closeAlert` | `() => void` | Toggles `showAlert` to close the banner |
| `activeAlert` | `(type, message, customType?) => void` | Triggers an alert — uses Sileo toast on mobile/tablet, banner on desktop |

### `activeAlert` parameters

| Parameter | Type | Description |
|---|---|---|
| `type` | `'danger' \| 'info' \| 'success' \| 'warning'` | Alert severity |
| `message` | `string` | The text to display |
| `customType` | `any` (optional) | When truthy, forces the banner even on mobile (bypasses Sileo) |

---

## Usage

```jsx
import { useAlert } from 'thecore-auth';

function DeleteButton({ onDelete }) {
  const { activeAlert } = useAlert();

  const handleDelete = async () => {
    try {
      await onDelete();
      activeAlert('success', 'Item deleted successfully');
    } catch {
      activeAlert('danger', 'Could not delete the item');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

---

## Notes

- On mobile and tablet, when `sileoToastEnabled: true`, `activeAlert` dispatches a Sileo toast and returns immediately — `showAlert` is never set to `true` in this path.
- `customDeviceType` in config overrides the automatically detected device type. Useful for forcing desktop behavior in hybrid environments.
- `activeAlert` resets `showAlert` to `false` before setting the new alert (via a 50 ms `setTimeout`) to force a re-render even when the same message is triggered twice in a row.
- `closeAlert` toggles the value (does not unconditionally set to `false`) — avoid calling it when `showAlert` is already `false`.
