# Login

> [Italiano](../it/pages/Login.md) | [Español](../es/pages/Login.md)

## Overview

`Login` is the standard login page. It renders a card layout with a logo on one side and `LoginForm` on the other. It handles three scenarios automatically:

1. **Already authenticated** — if a valid token and user ID are present in storage, the user is immediately navigated to `firstPrivatePath + user.id`.
2. **Auto-login active, waiting** — shows a full-screen `Loading` spinner while the auto-login flow runs.
3. **Auto-login failed** — renders `AutoLoginFallback` (or the built-in `DefaultAutoLoginFallback`) with the error.

The form itself is managed by `LoginFormContext`. Style overrides are also pulled from `LoginFormContext`.

## Import

```js
import { Login } from 'thecore-auth';
```

`Login` is rendered automatically on the `"/"` route by `PackageRoutes`. Direct import is only needed when building a custom routing tree.

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `Logo` | `React.ComponentType` | `undefined` | No | SVG/image component rendered in the logo area of the card |
| `AutoLoginFallback` | `React.ComponentType<{ error: unknown }>` | `DefaultAutoLoginFallback` | No | Component shown when auto-login fails; receives the error as the `error` prop |

## Usage

### Via `PackageRoutes` (standard)

```jsx
import { PackageRoutes } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      pathImg="/assets/logo.svg"
    />
  );
}
```

### Custom auto-login fallback

```jsx
import { PackageRoutes } from 'thecore-auth';
import Logo from './assets/logo.svg?react';
import AutoLoginError from './components/AutoLoginError';

// AutoLoginError receives { error } as a prop
function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      firstPrivateElement={<HomeDashboard />}
    />
  );
}
```

To supply a custom fallback, use `Login` directly in a custom routing tree:

```jsx
import { Login } from 'thecore-auth';
import Logo from './assets/logo.svg?react';
import MyAutoLoginError from './components/MyAutoLoginError';

<Route index element={<Login Logo={Logo} AutoLoginFallback={MyAutoLoginError} />} />
```

## Notes

- The version badge (top-left) is shown when `version` or `customVersion` is set in `LoginFormContext`.
- Layout and style classes can be overridden via `overrideStyle` from `LoginFormContext` (keys: `container`, `cardForm`, `containerLogo`, `logo`).
- `Login` calls `useViewportHeight()` to fix the `100vh` issue on mobile browsers.
- `DefaultAutoLoginFallback` is an internal component and is not exported from the package.
