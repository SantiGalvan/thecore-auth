# Alert

> [Versione italiana](../../docs/it/components/Alert.md) | [Versión española](../../docs/es/components/Alert.md)

## Overview

`Alert` is a fixed-position toast-style notification banner. It reads its state from `AlertContext` and `ConfigContext`, so it accepts no props. The banner includes a progress bar that drains over `alertTimeout` milliseconds, after which it auto-dismisses. On mobile/tablet devices with Sileo enabled, the alert is replaced by a native toast (see Notes).

## Import

```js
import { Alert } from 'thecore-auth';
```

## Props

This component accepts **no props**. Trigger it by calling `activeAlert` from `useAlert()`.

| `useAlert()` value | Type | Signature | Description |
|---|---|---|---|
| `activeAlert` | `function` | `(type, message, customType?)` | Show the alert |
| `closeAlert` | `function` | `()` | Dismiss the alert immediately |
| `showAlert` | `boolean` | — | Whether the alert is currently visible |

**Alert types** (`type` argument of `activeAlert`):

| Value | Meaning |
|---|---|
| `'danger'` | Error / destructive action |
| `'info'` | Neutral information |
| `'success'` | Successful operation |
| `'warning'` | Non-critical warning |

## CSS Variables

| Variable | Default | Description |
|---|---|---|
| `--color-danger` | `#FEE2E2` | Danger background |
| `--color-danger-text` | `#B91C1C` | Danger text color |
| `--color-danger-hover` | `#FECACA` | Danger close-button hover |
| `--color-danger-progress` | `#F87171` | Danger progress bar |
| `--color-info` | `#EFF6FF` | Info background |
| `--color-info-text` | `#1D4ED8` | Info text color |
| `--color-info-hover` | `#BFDBFE` | Info close-button hover |
| `--color-info-progress` | `#60A5FA` | Info progress bar |
| `--color-success` | `#ECFDF5` | Success background |
| `--color-success-text` | `#15803D` | Success text color |
| `--color-success-hover` | `#A7F3D0` | Success close-button hover |
| `--color-success-progress` | `#34D399` | Success progress bar |
| `--color-warning` | `#F9FAEB` | Warning background |
| `--color-warning-text` | `#D97706` | Warning text color |
| `--color-warning-hover` | `#FDE047` | Warning close-button hover |
| `--color-warning-progress` | `#FACC15` | Warning progress bar |

## Usage

```jsx
import { AlertProvider, useAlert, Alert } from 'thecore-auth';

// Place <Alert /> once at the root of your app
function App({ children }) {
  return (
    <AlertProvider>
      {children}
      <Alert />
    </AlertProvider>
  );
}

// Trigger from any component inside the tree
function SaveButton() {
  const { activeAlert } = useAlert();

  async function handleSave() {
    try {
      await api.save();
      activeAlert('success', 'Record saved successfully.');
    } catch (err) {
      activeAlert('danger', 'Save failed. Please try again.');
    }
  }

  return <button onClick={handleSave}>Save</button>;
}
```

### Force web alert on mobile

```jsx
// Pass a non-null customType to bypass the Sileo toast even on mobile
activeAlert('warning', 'Session expiring soon.', 'web');
```

## Notes

- The `alertTimeout` duration (milliseconds) is configured in `ConfigContext` via `public/config.json`. The progress bar drains linearly over that duration.
- When `sileoToastEnabled` is `true` in config and the device type is `mobile` or `tablet`, `activeAlert` delegates to Sileo native toasts and `<Alert />` is never shown. Pass a non-null `customType` argument to force the web banner regardless.
- Place `<Alert />` at the root of your component tree to ensure the fixed overlay stacks above all other content.
- The component uses `role="alert"` for accessibility.
