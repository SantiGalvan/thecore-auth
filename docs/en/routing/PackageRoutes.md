# PackageRoutes

> [Italiano](../../it/routing/PackageRoutes.md) | [Español](../../es/routing/PackageRoutes.md)

## Overview

`PackageRoutes` is the main entry point of the `thecore-auth` package. It mounts the complete routing tree — public routes, protected private routes, and the layout shell — in a single `<Routes>` tree. Internally it:

- reads injected public and private routes from `RouteContext`
- reads runtime config from `ConfigContext`
- sets the browser favicon via the `pathImg` prop
- sets the page `<title>` via `UsePageTitle`
- builds the layout layer (`DefaultLayout`, a custom element, or `null`)
- wraps private routes with `AuthPage` and optional extra providers

## Import

```js
import { PackageRoutes } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `logoImg` | `React.ComponentType` | built-in SVG | No | SVG logo rendered on the login page |
| `pathImg` | `string` | `'./src/assets/MyWarehouse.svg'` | No | Path written to `<link rel="icon">` on mount |
| `firstPrivateElement` | `ReactElement` | `<Dashboard />` | No | Component rendered at the first private route |
| `globalLayout` | `ReactElement \| 'none'` | `DefaultLayout` | No | Override the layout shell. Pass `'none'` to remove it entirely |
| `isMain` | `boolean` | `true` | No | Forwarded to `DefaultLayout`. Wraps the outlet in `<main>` when `true` |
| `headerComponent` | `ReactElement` | `null` | No | Header rendered above the outlet |
| `showHeaderOnLogin` | `boolean` | `false` | No | Show the header on the login page (`/`) |
| `headerExcludedRoutes` | `string[]` | `[]` | No | Route patterns where the header is hidden |
| `footerComponent` | `ReactElement` | `null` | No | Footer rendered below the outlet |
| `showFooterOnLogin` | `boolean` | `false` | No | Show the footer on the login page |
| `footerExcludedRoutes` | `string[]` | `[]` | No | Route patterns where the footer is hidden |
| `privateProvider` | `ReactElement` | `undefined` | No | Extra provider wrapping the private outlet (outermost layer) |
| `customProvider` | `ReactElement` | `undefined` | No | Extra provider wrapping `AuthPage` (inner layer) |
| `promptComponent` | `ReactElement` | `null` | No | PWA install-prompt component, rendered when `pwa.customPrompt` is enabled in config |

## Usage

```jsx
import { PackageRoutes } from 'thecore-auth';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import HomeDashboard from './pages/HomeDashboard';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      pathImg="/assets/logo.svg"
      firstPrivateElement={<HomeDashboard />}
      headerComponent={<AppHeader />}
      showHeaderOnLogin={false}
      headerExcludedRoutes={['/maintenance']}
      footerComponent={<AppFooter />}
      showFooterOnLogin={false}
    />
  );
}

export default App;
```

### With custom providers

```jsx
import { ThemeProvider } from './contexts/ThemeContext';
import { PermissionProvider } from './contexts/PermissionContext';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      privateProvider={<ThemeProvider />}
      customProvider={<PermissionProvider />}
      firstPrivateElement={<HomeDashboard />}
    />
  );
}
```

The nesting order for private routes is:
`privateProvider > customProvider > AuthPage > Outlet`

## Notes

- `PackageRoutes` must be rendered inside a React Router `<BrowserRouter>` (or equivalent) and inside the `thecore-auth` context stack (see `ConfigProvider`, `AuthProvider`, etc.).
- The public route tree is rooted at `"/"`. The private route tree is rooted at `firstPrivatePath` (from `ConfigContext`) with a trailing `:id` segment.
- To use `SmartLogin` instead of `Login` on the index route, swap the commented line inside the component source — or provide a custom public route via `RouteContext`.
- `globalLayout="none"` disables `Loading`, `Alert`, `Modal`, and `Toaster` unless you wire them up yourself.
