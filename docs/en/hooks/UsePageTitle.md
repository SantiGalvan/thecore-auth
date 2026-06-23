# UsePageTitle

> [Versione italiana](../../it/hooks/UsePageTitle.md) | [Versión española](../../es/hooks/UsePageTitle.md)

## Overview

`UsePageTitle` automatically updates `document.title` based on the current route. It matches the active path against a list of route definitions — including dynamic segments like `/dashboard/:id` — and sets the tab title accordingly.

## Import

```js
import { UsePageTitle } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `routes` | `Array<{ path: string, title: string }>` | `[]` | Route definitions mapping a path pattern to a page title. Supports React Router dynamic segments. |
| `defaultTitle` | `string` | `"SPOT"` | Title used when no route matches the current path. |

## Return value

This hook returns nothing (`void`). It operates as a side effect only.

## Usage

```jsx
import { UsePageTitle } from 'thecore-auth';

const PAGE_TITLES = [
  { path: '/',               title: 'Login' },
  { path: '/dashboard',      title: 'Dashboard' },
  { path: '/dashboard/:id',  title: 'Task Detail' },
  { path: '/profile',        title: 'My Profile' },
  { path: '/settings',       title: 'Settings' },
];

function AppRoutes() {
  // Sets document.title on every navigation, falls back to "SPOT"
  UsePageTitle(PAGE_TITLES, 'SPOT');

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<TaskDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
```

## Notes

- Must be called inside a component that is a descendant of `<BrowserRouter>` (or equivalent), because it relies on `useLocation`.
- Uses `matchPath` with `end: true`, so `/dashboard` does not match `/dashboard/123`. Add explicit dynamic-segment entries when needed.
- The update runs inside `useLayoutEffect` to avoid a flash of the previous title on navigation.
- The hook is exported with a capital `U` (`UsePageTitle`) — this is intentional and matches the source naming convention.
