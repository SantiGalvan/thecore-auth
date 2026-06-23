# AuthPage

> [Italiano](../../it/middlewares/AuthPage.md) | [Español](../../es/middlewares/AuthPage.md)

## Overview

`AuthPage` is a route guard middleware. It protects private routes by checking the authentication state from `AuthContext`:

- If the auth check is still pending (`isAuthenticated === null`), it renders nothing and waits.
- If the user is authenticated, it renders the nested outlet (`<Outlet />`).
- If the user is not authenticated, it redirects to `"/"` (login page) and shows a `danger` alert — unless auto-login is configured.

`AuthPage` takes no children; it relies on React Router's `<Outlet />` to render the matched child route.

## Import

`AuthPage` is wired automatically by `PackageRoutes`. Direct import is only needed for fully custom routing trees.

```js
import { AuthPage } from 'thecore-auth';
```

## Props

`AuthPage` accepts no props.

## Usage

### Default (via `PackageRoutes`)

`PackageRoutes` wraps all private routes with `AuthPage` automatically. No explicit configuration is required.

### Custom routing tree

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage } from 'thecore-auth';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Login from './pages/Login';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />

        {/* Protected — all nested routes require authentication */}
        <Route element={<AuthPage />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/settings/:id" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### With an extra provider

```jsx
<Route element={
  <MyAppProvider>
    <AuthPage />
  </MyAppProvider>
}>
  <Route path="/dashboard/:id" element={<Dashboard />} />
</Route>
```

`PackageRoutes` handles this automatically via the `privateProvider` and `customProvider` props.

## Notes

- The `isAuthenticated === null` guard prevents a redirect flash while the token is being validated asynchronously on page load.
- The `danger` alert on unauthorized access is suppressed when `autoLogin` is active in `ConfigContext`, because the auto-login flow handles its own error state.
- `AuthPage` does not check admin rights. Use `AuthAdmin` for role-based access control.
