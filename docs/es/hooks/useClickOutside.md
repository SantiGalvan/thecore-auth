# useClickOutside

> [English](../../../docs/en/hooks/useClickOutside.md) | [Versione italiana](../../it/hooks/useClickOutside.md)

## Descripción general

`useClickOutside` llama a una callback cada vez que el usuario hace clic (o toca) fuera de un elemento DOM referenciado. Es el bloque de construcción estándar para cerrar menús desplegables, modales, popovers y menús contextuales al hacer clic fuera.

## Importación

```js
import { useClickOutside } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `ref` | `React.RefObject<HTMLElement>` | — | Ref adjunto al elemento que define el área "interior". |
| `callback` | `() => void` | — | Función llamada cuando un evento `mousedown` ocurre fuera del elemento ref. |

## Valor de retorno

Este hook no devuelve nada (`void`). Funciona únicamente como efecto secundario.

## Uso

```jsx
import { useRef } from 'react';
import { useClickOutside } from 'thecore-auth';

function Dropdown({ isOpen, onClose, children }) {
  const ref = useRef(null);

  // Close the dropdown whenever the user clicks outside
  useClickOutside(ref, onClose);

  if (!isOpen) return null;

  return (
    <div ref={ref} className="dropdown-panel">
      {children}
    </div>
  );
}

// Usage in a parent component
function NavBar() {
  const [open, setOpen] = React.useState(false);

  return (
    <nav>
      <button onClick={() => setOpen(o => !o)}>Menú</button>
      <Dropdown isOpen={open} onClose={() => setOpen(false)}>
        <a href="/profile">Perfil</a>
        <a href="/settings">Configuración</a>
        <a href="/logout">Cerrar sesión</a>
      </Dropdown>
    </nav>
  );
}
```

## Notas

- El hook escucha `mousedown`, no `click`. Esto se dispara antes del evento click, lo que evita que el manejador `click` del botón trigger reabra un elemento recién cerrado.
- `callback` y `ref` se listan como dependencias del efecto. Si `callback` no está memoizada con `useCallback`, el listener se eliminará y volverá a añadirse en cada render. Envolver la callback en `useCallback` en el sitio de llamada cuando esto importe.
- El listener se adjunta a `document`, por lo que captura eventos que se propagan hasta arriba. Los elementos que detienen la propagación con `e.stopPropagation()` en un manejador `mousedown` impedirán que se ejecute la callback.
- Los eventos táctiles no se gestionan explícitamente; `mousedown` se dispara en dispositivos táctiles a través del sistema de eventos sintéticos, por lo que el hook funciona en móvil sin modificaciones.
