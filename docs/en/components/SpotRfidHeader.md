# SpotRfidHeader

> [Versione italiana](../../docs/it/components/SpotRfidHeader.md) | [Versión española](../../docs/es/components/SpotRfidHeader.md)

> ⚠️ **Exported as `Header`** from `thecore-auth`. Import with: `import { Header } from 'thecore-auth'`

## Overview

`SpotRfidHeader` is the top navigation bar for SPOT RFID applications. It renders a logo area, the current page title, and a context-aware action button — either a logout button (on the home route when auto-login is disabled) or a back-navigation button (on non-home routes when `showHeaderButton` is enabled).

The header hides itself automatically while the global loading state is active. Logo, page title, and button visibility are all driven by the library's internal contexts — no manual wiring is required beyond passing an optional logo.

## Import

```jsx
import { Header } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `Logo` | `React component` | `undefined` | — | SVG component (function) rendered as the header logo. Takes priority over `logo`. |
| `logo` | `string` | `undefined` | — | URL of an image to render as the header logo. Used when `Logo` is not provided. If neither is supplied, the default MyTrack SVG is used. |

## CSS Variables

| Variable | Default | Description |
|---|---|---|
| `--header-height` | `60px` | Height of the header bar |
| `--width-logo-size` | `48px` | Width of the logo rendered inside the header |

## Usage

```jsx
import { Header } from 'thecore-auth';
import CompanyLogo from './assets/company-logo.svg?react';

// Option 1: SVG component (recommended — avoids extra HTTP request)
function App() {
  return (
    <div>
      <Header Logo={CompanyLogo} />
      <main>{/* page content */}</main>
    </div>
  );
}

// Option 2: image URL
function App() {
  return (
    <div>
      <Header logo="/assets/company-logo.png" />
      <main>{/* page content */}</main>
    </div>
  );
}

// Option 3: default logo (no props needed)
function App() {
  return (
    <div>
      <Header />
      <main>{/* page content */}</main>
    </div>
  );
}
```

## Notes

- The logout button appears only when `autoLogin` is `false` (from `useConfig`) **and** the current route matches `home/:id`.
- The back button appears only when the current route does **not** match `home/:id` and `showHeaderButton` is `true` (from `useConfig`).
- The back button calls `navigate(-1)` from React Router — it relies on browser history being available.
- The page title displayed in the center is derived from `configRoutes` (from `useConfig`); it falls back to `firstPrivateTitle` when no route matches.
- Requires `AuthProvider`, `AlertProvider`, `ConfigProvider`, and `LoadingProvider` to be present in the tree.
