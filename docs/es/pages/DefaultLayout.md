# DefaultLayout

> [English](../../pages/DefaultLayout.md) | [Italiano](../../it/pages/DefaultLayout.md)

## Descripción general

`DefaultLayout` es el shell de layout renderizado alrededor de cada ruta en `PackageRoutes`. Incorpora la siguiente infraestructura de UI por encima y por debajo del outlet de ruta:

- **Prompt de instalación PWA** — renderizado cuando `pwa.customPrompt` está habilitado en `ConfigContext`
- **Overlay de carga** — spinner a pantalla completa gestionado por `LoadingContext`
- **Banner de alerta** — gestionado por `AlertContext`
- **Sileo Toaster** — notificaciones toast configuradas mediante `sileoToastConfig` en `ConfigContext`
- **Modal** — gestionada por `ModalContext`
- **Header / footer opcionales** — mostrados u ocultados por ruta mediante las props de exclusión

## Importación

```js
import { DefaultLayout } from 'thecore-auth';
```

`DefaultLayout` es utilizado automáticamente por `PackageRoutes`. La importación directa solo es necesaria cuando se construye un árbol de layout personalizado.

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|--------|------|-------------|-----------|-------------|
| `isMain` | `boolean` | `true` | No | Cuando es `true`, envuelve el outlet en `<main>` y lo oculta mientras el overlay de carga está activo |
| `headerComponent` | `ReactElement` | `null` | No | Elemento header renderizado encima del outlet |
| `showHeaderOnLogin` | `boolean` | `false` | No | Muestra el header en la ruta de login (`"/"`) |
| `headerExcludedRoutes` | `string[]` | `[]` | No | Patrones de ruta (formato `matchPath` de React Router) donde se suprime el header |
| `footerComponent` | `ReactElement` | `null` | No | Elemento footer renderizado debajo del outlet |
| `showFooterOnLogin` | `boolean` | `false` | No | Muestra el footer en la ruta de login |
| `footerExcludedRoutes` | `string[]` | `[]` | No | Patrones de ruta donde se suprime el footer |
| `promptComponent` | `ReactElement` | `null` | No | Elemento de prompt de instalación PWA, renderizado solo cuando `ConfigContext.pwa.customPrompt` es truthy |

## Uso

`DefaultLayout` es consumido automáticamente por `PackageRoutes`:

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

Para construir un shell de layout personalizado, úsalo como override `globalLayout`:

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

## Notas

- La exclusión de rutas usa `matchPath` de React Router — patrones como `'/report/:id'` y `'/admin/*'` son ambos válidos.
- Cuando `isMain` es `false`, el outlet se renderiza como un fragmento simple (sin wrapper `<main>` ni comportamiento hidden-during-loading). Úsalo para dashboards que gestionan su propio estado de carga.
- El componente `Alert` se renderiza dos veces cuando `isMain` es `true`: una fuera de `<main>` (siempre visible) y otra dentro. Solo el externo es visible durante la carga.
- La posición de los toasts de Sileo es `"bottom-right"` por defecto si `sileoToastConfig.position` no está establecido en la config.
