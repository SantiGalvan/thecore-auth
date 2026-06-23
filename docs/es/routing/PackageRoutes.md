# PackageRoutes

> [English](../../routing/PackageRoutes.md) | [Italiano](../../it/routing/PackageRoutes.md)

## Descripción general

`PackageRoutes` es el punto de entrada principal del paquete `thecore-auth`. Monta el árbol de rutas completo — rutas públicas, rutas privadas protegidas y la capa de layout — en un único `<Routes>`. Internamente:

- lee las rutas públicas y privadas inyectadas desde `RouteContext`
- lee la configuración en tiempo de ejecución desde `ConfigContext`
- establece el favicon del navegador mediante la prop `pathImg`
- actualiza el `<title>` de la página mediante `UsePageTitle`
- construye la capa de layout (`DefaultLayout`, un elemento personalizado o `null`)
- envuelve las rutas privadas con `AuthPage` y proveedores opcionales adicionales

## Importación

```js
import { PackageRoutes } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|--------|------|-------------|-----------|-------------|
| `logoImg` | `React.ComponentType` | SVG integrado | No | Logo SVG renderizado en la página de login |
| `pathImg` | `string` | `'./src/assets/MyWarehouse.svg'` | No | Ruta escrita en `<link rel="icon">` al montar |
| `firstPrivateElement` | `ReactElement` | `<Dashboard />` | No | Componente renderizado en la primera ruta privada |
| `globalLayout` | `ReactElement \| 'none'` | `DefaultLayout` | No | Override del shell de layout. Pasa `'none'` para eliminarlo |
| `isMain` | `boolean` | `true` | No | Reenviado a `DefaultLayout`. Envuelve el outlet en `<main>` cuando es `true` |
| `headerComponent` | `ReactElement` | `null` | No | Header renderizado encima del outlet |
| `showHeaderOnLogin` | `boolean` | `false` | No | Muestra el header en la página de login (`/`) |
| `headerExcludedRoutes` | `string[]` | `[]` | No | Patrones de ruta donde se oculta el header |
| `footerComponent` | `ReactElement` | `null` | No | Footer renderizado debajo del outlet |
| `showFooterOnLogin` | `boolean` | `false` | No | Muestra el footer en la página de login |
| `footerExcludedRoutes` | `string[]` | `[]` | No | Patrones de ruta donde se oculta el footer |
| `privateProvider` | `ReactElement` | `undefined` | No | Proveedor adicional que envuelve el outlet privado (capa más externa) |
| `customProvider` | `ReactElement` | `undefined` | No | Proveedor adicional que envuelve `AuthPage` (capa interna) |
| `promptComponent` | `ReactElement` | `null` | No | Componente de prompt de instalación PWA, renderizado cuando `pwa.customPrompt` está habilitado en la config |

## Uso

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

### Con proveedores personalizados

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

El orden de anidamiento para las rutas privadas es:
`privateProvider > customProvider > AuthPage > Outlet`

## Notas

- `PackageRoutes` debe renderizarse dentro de un `<BrowserRouter>` de React Router (o equivalente) y dentro del stack de contextos de `thecore-auth` (ver `ConfigProvider`, `AuthProvider`, etc.).
- El árbol de rutas públicas está enraizado en `"/"`. El de rutas privadas está enraizado en `firstPrivatePath` (de `ConfigContext`) con el segmento `:id` final.
- Para usar `SmartLogin` en lugar de `Login` en la ruta índice, intercambia la línea comentada en el fuente del componente — o proporciona una ruta pública personalizada via `RouteContext`.
- `globalLayout="none"` deshabilita `Loading`, `Alert`, `Modal` y `Toaster` a menos que los cablee manualmente.
