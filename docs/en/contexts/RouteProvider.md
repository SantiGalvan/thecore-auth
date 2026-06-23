# RouteProvider / useRoutesInjection

> 🇮🇹 [Italiano](../../it/contexts/RouteProvider.md) | 🇪🇸 [Español](../../es/contexts/RouteProvider.md)

## Overview

`RouteProvider` injects the host application's public and private routes into the `thecore-auth` routing system. It is the bridge between the library's `PackageRoutes` component and your app-specific route definitions. It accepts no configuration other than the two route arrays.

---

## Setup

Wrap `PackageRoutes` (or any component that calls `useRoutesInjection`) with `RouteProvider` and pass your route arrays.

```jsx
import { RouteProvider, PackageRoutes } from 'thecore-auth';
import PublicHomePage from './pages/PublicHomePage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

const publicRoutes = [
  { path: '/', element: <PublicHomePage /> },
];

const privateRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/settings', element: <Settings /> },
];

function App() {
  return (
    <RouteProvider publicRoutes={publicRoutes} privateRoutes={privateRoutes}>
      <PackageRoutes />
    </RouteProvider>
  );
}
```

---

## Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `publicRoutes` | `RouteObject[]` | `[]` | Routes accessible without authentication |
| `privateRoutes` | `RouteObject[]` | `[]` | Routes protected by `AuthPage` middleware |

Each entry in the arrays follows the same shape as React Router `RouteObject`:

```js
{ path: '/example', element: <MyPage />, title: 'Example' }
```

---

## Hook API

```js
const { publicRoutes, privateRoutes } = useRoutesInjection();
```

| Value | Type | Description |
|---|---|---|
| `publicRoutes` | `RouteObject[]` | The public routes passed to `RouteProvider` |
| `privateRoutes` | `RouteObject[]` | The private routes passed to `RouteProvider` |

---

## Usage

```jsx
import { useRoutesInjection } from 'thecore-auth';

// Internal usage example (e.g. inside a custom router component)
function MyCustomRouter() {
  const { publicRoutes, privateRoutes } = useRoutesInjection();

  return (
    <Routes>
      {publicRoutes.map(r => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
      {privateRoutes.map(r => (
        <Route
          key={r.path}
          path={r.path}
          element={<AuthPage>{r.element}</AuthPage>}
        />
      ))}
    </Routes>
  );
}
```

---

## Notes

- `useRoutesInjection` throws a descriptive error if called outside `RouteProvider` — the error message includes the correct wrapping example.
- `RouteProvider` performs no authentication logic; it only passes the arrays down via context. All auth guarding happens inside `PackageRoutes` and the `AuthPage` middleware.
- Both `publicRoutes` and `privateRoutes` default to empty arrays so `PackageRoutes` renders safely even if one array is omitted.
