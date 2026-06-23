# useStorage

> [English](../../../docs/en/hooks/useStorage.md) | [Versione italiana](../../it/hooks/useStorage.md)

## Descripción general

`useStorage` es un hook compatible con `useState` que mantiene un valor sincronizado con `localStorage`. Al montarse lee el valor almacenado (o escribe el valor inicial si la clave está ausente). El setter devuelto persiste cada actualización automáticamente.

## Importación

```js
import { useStorage } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `initialValue` | `any` | — | Valor escrito en `localStorage` cuando la clave no existe todavía. |
| `itemKey` | `string` | — | Clave de `localStorage` bajo la cual se almacena el valor (serializado en JSON). |

## Valor de retorno

Devuelve una tupla de tres elementos:

| Índice | Valor | Tipo | Descripción |
|--------|-------|------|-------------|
| `0` | `state` | `any` | Valor actual, inicializado desde `localStorage`. |
| `1` | `changeState` | `(value | (prev) => value) => void` | Setter que actualiza tanto el estado de React como `localStorage`. Acepta un valor o una función actualizadora. |
| `2` | `remove` | `(clearAll?: boolean) => void` | Elimina la clave de `localStorage` y restablece el estado a `initialValue`. Pasar `true` para llamar a `localStorage.clear()`. |

## Uso

```jsx
import { useStorage } from 'thecore-auth';

function ThemeToggle() {
  const [theme, setTheme, removeTheme] = useStorage('light', 'app-theme');

  return (
    <div>
      <p>Tema actual: {theme}</p>

      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Cambiar tema
      </button>

      {/* Removes only the 'app-theme' key */}
      <button onClick={() => removeTheme()}>
        Restablecer tema
      </button>

      {/* Clears ALL localStorage — use with caution */}
      <button onClick={() => removeTheme(true)}>
        Limpiar todo el almacenamiento
      </button>
    </div>
  );
}
```

## Notas

- Los valores se serializan en JSON antes de almacenarse y se analizan al leerlos. Los valores no serializables (p. ej. funciones, `undefined`) no se conservarán correctamente.
- Si `localStorage` no está disponible (p. ej. navegación privada con almacenamiento bloqueado), el hook registra el error y recurre a `initialValue` sin lanzar excepciones.
- `changeState` acepta una función actualizadora `(prev) => newValue`, haciéndolo compatible con patrones que dependen del estado anterior.
- `remove(true)` llama a `localStorage.clear()`, que elimina **todas** las claves — no solo las gestionadas por este hook. Usar con precaución.
