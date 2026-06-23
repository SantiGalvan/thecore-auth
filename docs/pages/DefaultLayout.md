# DefaultLayout

> [Italiano](../it/pages/DefaultLayout.md) | [Español](../es/pages/DefaultLayout.md)

## Overview

`DefaultLayout` is the layout shell rendered around every route in `PackageRoutes`. It layers the following UI infrastructure above and below the route outlet:

- **PWA install prompt** — rendered when `pwa.customPrompt` is enabled in `ConfigContext`
- **Loading overlay** — full-screen spinner driven by `LoadingContext`
- **Alert banner** — driven by `AlertContext`
- **Sileo Toaster** — toast notifications configured via `sileoToastConfig` in `ConfigContext`
- **Modal** — managed by `ModalContext`
- **Optional header / footer** — shown or hidden per route via the exclusion props

## Import

```js
import { DefaultLayout } from 'thecore-auth';
```

`DefaultLayout` is used automatically by `PackageRoutes`. Importing it directly is only necessary when building a custom layout tree.

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `isMain` | `boolean` | `true` | No | When `true`, wraps the outlet in `<main>` and hides it while the loading overlay is active |
| `headerComponent` | `ReactElement` | `null` | No | Header element rendered above the outlet |
| `showHeaderOnLogin` | `boolean` | `false` | No | Show the header on the login route (`"/"`) |
| `headerExcludedRoutes` | `string[]` | `[]` | No | Route patterns (React Router `matchPath` format) where the header is suppressed |
| `footerComponent` | `ReactElement` | `null` | No | Footer element rendered below the outlet |
| `showFooterOnLogin` | `boolean` | `false` | No | Show the footer on the login route |
| `footerExcludedRoutes` | `string[]` | `[]` | No | Route patterns where the footer is suppressed |
| `promptComponent` | `ReactElement` | `null` | No | PWA install-prompt element, rendered only when `ConfigContext.pwa.customPrompt` is truthy |

## Usage

`DefaultLayout` is consumed by `PackageRoutes` automatically:

```jsx
<PackageRoutes
  headerComponent={<AppHeader />}
  showHeaderOnLogin={false}
  headerExcludedRoutes={['/settings/:id', '/print/*']}
  footerComponent={<AppFooter />}
  footerExcludedRoutes={['/settings/:id']}
  promptComponent={<PwaInstallBanner />}
/>
```

When building a custom layout shell, use it as the `globalLayout` override:

```jsx
const MyLayout = (
  <DefaultLayout
    isMain={false}
    headerComponent={<AdminHeader />}
    showHeaderOnLogin={false}
    footerComponent={<AdminFooter />}
  />
);

<PackageRoutes globalLayout={MyLayout} />
```

## Notes

- Route exclusion uses React Router's `matchPath` — patterns like `'/report/:id'` and `'/admin/*'` are both valid.
- When `isMain` is `false`, the outlet renders as a plain fragment (no `<main>` wrapper and no hidden-while-loading behavior). Use this for dashboards that manage their own loading state.
- The `Alert` component is rendered twice when `isMain` is `true`: once outside `<main>` (always visible) and once inside it. Only the outer one is shown during loading.
- Sileo toast position defaults to `"bottom-right"` if `sileoToastConfig.position` is not set in config.
