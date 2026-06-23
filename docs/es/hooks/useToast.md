# useToast

> [English](../../../docs/en/hooks/useToast.md) | [Versione italiana](../../it/hooks/useToast.md)

## Descripción general

`useToast` proporciona una interfaz tipada alrededor de la librería de notificaciones [Sileo](https://github.com/sileo-js/sileo). Expone una función por cada variante de toast — `success`, `error`, `info`, `warning` y `promise` — para que los componentes puedan mostrar mensajes de feedback sin importar Sileo directamente.

## Importación

```js
import { useToast } from 'thecore-auth';
```

## Parámetros

Este hook no acepta parámetros.

## Valor de retorno

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `success` | `(title: string, description?: string) => void` | Muestra un toast verde de éxito. |
| `error` | `(title: string, description?: string) => void` | Muestra un toast rojo de error. |
| `info` | `(title: string, description?: string) => void` | Muestra un toast azul informativo. |
| `warning` | `(title: string, description?: string) => void` | Muestra un toast naranja de advertencia. |
| `promise` | `(promise: Promise, messages: SileoPromiseMessages) => void` | Muestra un toast de carga que transiciona a éxito o error según el resultado de la promise. |

## Uso

```jsx
import { useToast } from 'thecore-auth';

function SaveButton({ onSave }) {
  const toast = useToast();

  const handleClick = async () => {
    try {
      await toast.promise(
        onSave(),
        {
          loading: 'Guardando...',
          success: { title: 'Guardado', description: 'Los cambios se guardaron correctamente.' },
          error:   { title: 'Error',    description: 'No se pudo guardar. Inténtalo de nuevo.' },
        }
      );
    } catch {
      toast.error('Error inesperado', 'Por favor contacta con soporte.');
    }
  };

  return <button onClick={handleClick}>Guardar</button>;
}

// Simple feedback example
function DeleteButton({ onDelete }) {
  const { success, error } = useToast();

  const handleDelete = async () => {
    try {
      await onDelete();
      success('Eliminado', 'El elemento se eliminó correctamente.');
    } catch {
      error('Error al eliminar', 'El elemento no pudo eliminarse.');
    }
  };

  return <button onClick={handleDelete}>Eliminar</button>;
}
```

## Notas

- Sileo debe estar configurado en la raíz de la aplicación (p. ej. `<SileoProvider />`) para que los toasts se rendericen. `useToast` solo envuelve la API imperativa — no monta el contenedor.
- El método `promise` refleja la firma de `sileo.promise`. Consultar la documentación de Sileo para la forma exacta del argumento `messages`.
- Todas las funciones devueltas se recrean en cada render (sin `useCallback`). Si se pasan como props o se usan en dependencias de `useEffect`, memoizar en el sitio de llamada si es necesario.
