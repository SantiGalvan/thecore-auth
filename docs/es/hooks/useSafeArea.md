# useSafeArea

> [English](../../../docs/hooks/useSafeArea.md) | [Versione italiana](../../it/hooks/useSafeArea.md)

## Descripción general

`useSafeArea` gestiona la clase CSS `with-safe-area` en `document.body`. Cuando la ruta actual **no** está en la lista de exclusión, la clase se agrega para que se respeten los safe-area insets (p. ej. notch / barra de inicio del iPhone). La clase se elimina en las rutas excluidas (típicamente la página de inicio de sesión) donde se desean layouts a pantalla completa.

## Importación

```js
import { useSafeArea } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `excludedPaths` | `string[]` | `["/"]` | Array de pathnames exactos donde la clase safe-area **no** debe aplicarse. |

## Valor de retorno

Este hook no devuelve nada (`void`). Funciona únicamente como efecto secundario.

## Uso

```jsx
import { useSafeArea } from 'thecore-auth';

function App() {
  // Apply safe-area everywhere except the login and splash pages
  useSafeArea(['/', '/splash']);

  return (
    <Routes>
      <Route path="/"       element={<Login />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/app"    element={<Dashboard />} />
    </Routes>
  );
}
```

```css
/* In your global CSS, define what with-safe-area means */
.with-safe-area {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top:    env(safe-area-inset-top);
}
```

## Notas

- Debe llamarse dentro de un componente descendiente de `<BrowserRouter>` (o equivalente), ya que depende de `useLocation`.
- La coincidencia de rutas es una comparación exacta de cadenas (`includes`). Los segmentos dinámicos (p. ej. `/user/123`) **no** se comparan con un patrón como `/user/:id` — listar los paths literales que deben excluirse.
- La clase se elimina en el cleanup del efecto, por lo que navegar fuera de una ruta siempre comienza con un estado limpio antes de que se ejecute el nuevo efecto.
- Si la manipulación de la clase de `document.body` entra en conflicto con otras librerías, considerar el uso de una variable CSS o un enfoque con atributos data y adaptar el hook en consecuencia.
