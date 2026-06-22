# RouteProvider / useRoutesInjection

> 🇬🇧 [English](../../contexts/RouteProvider.md) | 🇮🇹 [Italiano](../../it/contexts/RouteProvider.md)

## Descripción general

`RouteProvider` inyecta las rutas públicas y privadas de la aplicación host en el sistema de routing de `thecore-auth`. Es el puente entre el componente `PackageRoutes` de la librería y las definiciones de rutas específicas de la app. No acepta más configuración que los dos arrays de rutas.

---

## Configuración

Envolver `PackageRoutes` (o cualquier componente que llame a `useRoutesInjection`) con `RouteProvider` y pasar los arrays de rutas.

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

| Prop | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `publicRoutes` | `RouteObject[]` | `[]` | Rutas accesibles sin autenticación |
| `privateRoutes` | `RouteObject[]` | `[]` | Rutas protegidas por el middleware `AuthPage` |

Cada entrada en los arrays sigue la misma estructura que `RouteObject` de React Router:

```js
{ path: '/ejemplo', element: <MiPagina />, title: 'Ejemplo' }
```

---

## API del hook

```js
const { publicRoutes, privateRoutes } = useRoutesInjection();
```

| Valor | Tipo | Descripción |
|---|---|---|
| `publicRoutes` | `RouteObject[]` | Las rutas públicas pasadas a `RouteProvider` |
| `privateRoutes` | `RouteObject[]` | Las rutas privadas pasadas a `RouteProvider` |

---

## Uso

```jsx
import { useRoutesInjection } from 'thecore-auth';

// Ejemplo de uso interno (ej. dentro de un componente router personalizado)
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

## Notas

- `useRoutesInjection` lanza un error descriptivo si se llama fuera de `RouteProvider` — el mensaje incluye el ejemplo correcto de envoltura.
- `RouteProvider` no realiza ninguna lógica de autenticación; solo pasa los arrays a través del contexto. Toda la protección de auth ocurre dentro de `PackageRoutes` y el middleware `AuthPage`.
- Tanto `publicRoutes` como `privateRoutes` tienen arrays vacíos como valor por defecto, por lo que `PackageRoutes` renderiza sin errores incluso si se omite uno de los dos arrays.
