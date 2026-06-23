# AuthAdmin

> [English](../../pages/AuthAdmin.md) | [Italiano](../../it/pages/AuthAdmin.md)

## Descripción general

`AuthAdmin` es un middleware guard para páginas exclusivas de administradores. Lee el objeto `user` de `useAuthStorage` y verifica el flag `user.admin`:

- Si el usuario no existe o `user.admin` es falsy, muestra una alerta `warning` y redirige a `location.state?.from` (la página anterior) o a `"/"` (login).
- Si `user.admin` es truthy, renderiza los `children`.

A diferencia de `AuthPage` (que usa `<Outlet />`), `AuthAdmin` es un componente wrapper — renderiza `children` directamente.

## Importación

```js
import { AuthAdmin } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|--------|------|-------------|-----------|-------------|
| `children` | `ReactNode` | — | Sí | El contenido protegido a renderizar cuando el usuario tiene derechos de administrador |

## Uso

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage, AuthAdmin } from 'thecore-auth';
import AdminPanel from './pages/AdminPanel';
import UserSettings from './pages/UserSettings';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Todas las rutas privadas */}
        <Route element={<AuthPage />}>

          {/* Ruta solo para administradores */}
          <Route
            path="/admin/:id"
            element={
              <AuthAdmin>
                <AdminPanel />
              </AuthAdmin>
            }
          />

          {/* Ruta autenticada normal */}
          <Route path="/settings/:id" element={<UserSettings />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Sección admin anidada

```jsx
<Route element={<AuthPage />}>
  <Route path="/dashboard/:id" element={<Dashboard />} />

  {/* Envuelve todo un grupo de rutas con un único AuthAdmin */}
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

## Notas

- `AuthAdmin` siempre debe anidarse dentro de una ruta protegida por `AuthPage`. No realiza la verificación de autenticación básica por sí mismo.
- El destino de redirección `location.state?.from` es establecido por React Router cuando se usa `<Navigate state={{ from: location.pathname }} />` antes de la redirección. Si el estado no está presente, el usuario es enviado a `"/"`.
- La alerta `warning` se dispara en cada render donde `user.admin` es false — no solo en el mount inicial. Es intencional: si el flag admin del usuario es revocado durante la sesión, es redirigido inmediatamente.
