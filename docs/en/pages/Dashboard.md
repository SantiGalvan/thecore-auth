# Dashboard

> [Italiano](../../it/pages/Dashboard.md) | [Español](../../es/pages/Dashboard.md)

## Overview

`Dashboard` is the built-in placeholder for the first private route. It is used as the default value of `firstPrivateElement` in `PackageRoutes` and serves as a development sandbox and live demo of the main package features:

- User email display and logout
- Alert and toast notifications (success, error, info, warning, promise-based)
- Desktop / mobile notification mode switch via `SwitchRadio`
- Authenticated API call (fetches the user list via `usersEndpoint` from config)
- Calendar integration example

**This component is not intended for production use.** Replace it with your own authenticated home page via the `firstPrivateElement` prop on `PackageRoutes`.

## Import

```js
import { Dashboard } from 'thecore-auth';
```

## Props

`Dashboard` accepts no props. All data is read from the package contexts and hooks.

## Usage

### Replace with your own page (recommended)

```jsx
import { PackageRoutes } from 'thecore-auth';
import HomeDashboard from './pages/HomeDashboard';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      firstPrivateElement={<HomeDashboard />}
    />
  );
}
```

### Keep for development / demo

```jsx
import { PackageRoutes } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

// firstPrivateElement defaults to <Dashboard /> — no prop needed
function App() {
  return <PackageRoutes logoImg={Logo} />;
}
```

### Hooks showcased inside Dashboard

The component demonstrates the following package hooks and contexts:

```js
const { logout, createAxiosInstances } = useAuth();
const { usersEndpoint } = useConfig();
const { setIsLoading } = useLoading();
const { activeAlert } = useAlert();
const { token, user } = useAuthStorage();
const { success, error, info, warning, promise } = useToast();
```

## Notes

- The `fetchUsers` function calls `createAxiosInstances()` to get an authenticated Axios instance and performs a `GET` request to `usersEndpoint`.
- The `promise` toast wraps an Axios call and shows loading / success / error states automatically via Sileo.
- `SwitchRadio` toggles between desktop alerts (`activeAlert`) and mobile toasts (`useToast`).
- `Dashboard` reads `user.email` from `useAuthStorage` — the page will crash if rendered outside an authenticated route (i.e., without a valid user in storage).
