# UsePageTitle

> [English](../../../docs/hooks/UsePageTitle.md) | [Versione italiana](../../it/hooks/UsePageTitle.md)

## Descripción general

`UsePageTitle` actualiza automáticamente `document.title` según la ruta actual. Compara la ruta activa con una lista de definiciones de rutas — incluyendo segmentos dinámicos como `/dashboard/:id` — y establece el título de la pestaña en consecuencia.

## Importación

```js
import { UsePageTitle } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `routes` | `Array<{ path: string, title: string }>` | `[]` | Definiciones de rutas que asocian un patrón de ruta a un título de página. Admite segmentos dinámicos de React Router. |
| `defaultTitle` | `string` | `"SPOT"` | Título usado cuando ninguna ruta coincide con la ruta actual. |

## Valor de retorno

Este hook no devuelve nada (`void`). Funciona únicamente como efecto secundario.

## Uso

```jsx
import { UsePageTitle } from 'thecore-auth';

const PAGE_TITLES = [
  { path: '/',               title: 'Inicio de sesión' },
  { path: '/dashboard',      title: 'Panel de control' },
  { path: '/dashboard/:id',  title: 'Detalle de tarea' },
  { path: '/profile',        title: 'Mi perfil' },
  { path: '/settings',       title: 'Configuración' },
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

## Notas

- Debe llamarse dentro de un componente descendiente de `<BrowserRouter>` (o equivalente), ya que depende de `useLocation`.
- Usa `matchPath` con `end: true`, por lo que `/dashboard` no coincide con `/dashboard/123`. Agregar entradas explícitas para los segmentos dinámicos cuando sea necesario.
- La actualización ocurre dentro de `useLayoutEffect` para evitar un destello del título anterior durante la navegación.
- El hook se exporta con `U` mayúscula (`UsePageTitle`) — esto es intencional y coincide con la convención de nomenclatura del código fuente.
