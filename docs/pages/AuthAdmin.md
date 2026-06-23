# AuthAdmin

> [Italiano](../it/pages/AuthAdmin.md) | [Español](../es/pages/AuthAdmin.md)

## Overview

`AuthAdmin` is a route guard middleware for admin-only pages. It reads the `user` object from `useAuthStorage` and checks the `user.admin` flag:

- If the user is missing or `user.admin` is falsy, it shows a `warning` alert and redirects to `location.state?.from` (the previous page) or `"/"` (login).
- If `user.admin` is truthy, it renders its `children`.

Unlike `AuthPage` (which uses `<Outlet />`), `AuthAdmin` is a wrapper component — it renders `children` directly.

## Import

```js
import { AuthAdmin } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `children` | `ReactNode` | — | Yes | The protected content to render when the user has admin rights |

## Usage

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage, AuthAdmin } from 'thecore-auth';
import AdminPanel from './pages/AdminPanel';
import UserSettings from './pages/UserSettings';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* All private routes */}
        <Route element={<AuthPage />}>

          {/* Admin-only route */}
          <Route
            path="/admin/:id"
            element={
              <AuthAdmin>
                <AdminPanel />
              </AuthAdmin>
            }
          />

          {/* Regular authenticated route */}
          <Route path="/settings/:id" element={<UserSettings />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Nested admin section

```jsx
<Route element={<AuthPage />}>
  <Route path="/dashboard/:id" element={<Dashboard />} />

  {/* Wrap a whole group of routes with a single AuthAdmin */}
  <Route
    path="/admin"
    element={
      <AuthAdmin>
        <AdminLayout />
      </AuthAdmin>
    }
  >
    <Route path="users" element={<UserList />} />
    <Route path="reports" element={<Reports />} />
  </Route>
</Route>
```

## Notes

- `AuthAdmin` should always be nested inside an `AuthPage`-protected route. It does not perform the basic authentication check itself.
- The redirect target `location.state?.from` is set by React Router when you use `<Navigate state={{ from: location.pathname }} />` before the redirect. If the state is absent, the user is sent to `"/"`.
- The `warning` alert fires on every render where `user.admin` is false — not just on the initial mount. This is intentional: if the user's admin flag is revoked mid-session, they are redirected immediately.
