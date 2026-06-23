# AuthPage

> [English](../../pages/AuthPage.md) | [Italiano](../../it/pages/AuthPage.md)

## Descripción general

`AuthPage` es un middleware guard de rutas. Protege las rutas privadas verificando el estado de autenticación desde `AuthContext`:

- Si la verificación de autenticación está pendiente (`isAuthenticated === null`), no renderiza nada y espera.
- Si el usuario está autenticado, renderiza el outlet anidado (`<Outlet />`).
- Si el usuario no está autenticado, redirige a `"/"` (página de login) y muestra una alerta `danger` — a menos que esté configurado el auto-login.

`AuthPage` no acepta hijos; se apoya en el `<Outlet />` de React Router para renderizar la ruta hija correspondiente.

## Importación

`AuthPage` es cableado automáticamente por `PackageRoutes`. La importación directa solo es necesaria para árboles de rutas completamente personalizados.

```js
import { AuthPage } from 'thecore-auth';
```

## Props

`AuthPage` no acepta props.

## Uso

### Por defecto (vía `PackageRoutes`)

`PackageRoutes` envuelve automáticamente todas las rutas privadas con `AuthPage`. No se requiere configuración explícita.

### Árbol de rutas personalizado

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
        {/* Públicas */}
        <Route path="/" element={<Login />} />

        {/* Protegidas — todas las rutas anidadas requieren autenticación */}
        <Route element={<AuthPage />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/settings/:id" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Con un proveedor adicional

```jsx
<Route element={
  <MyAppProvider>
    <AuthPage />
  </MyAppProvider>
}>
  <Route path="/dashboard/:id" element={<Dashboard />} />
</Route>
```

`PackageRoutes` gestiona esto automáticamente mediante las props `privateProvider` y `customProvider`.

## Notas

- La guardia `isAuthenticated === null` previene un flash de redirección mientras el token se valida de forma asíncrona al cargar la página.
- La alerta `danger` para acceso no autorizado se suprime cuando `autoLogin` está activo en `ConfigContext`, porque el flujo de auto-login gestiona su propio estado de error.
- `AuthPage` no verifica derechos de administrador. Usa `AuthAdmin` para el control de acceso basado en roles.
