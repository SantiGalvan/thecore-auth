# useOrientation

> [English](../../../docs/hooks/useOrientation.md) | [Versione italiana](../../it/hooks/useOrientation.md)

## Descripción general

`useOrientation` devuelve la orientación actual de la pantalla como una cadena de texto y se actualiza reactivamente cada vez que se redimensiona la ventana. La orientación se determina comparando `window.innerWidth` y `window.innerHeight`.

## Importación

```js
import { useOrientation } from 'thecore-auth';
```

## Parámetros

Este hook no acepta parámetros.

## Valor de retorno

| Tipo | Valores | Descripción |
|------|---------|-------------|
| `string` | `"landscape"` | `"portrait"` | Orientación actual. `"landscape"` cuando el ancho > alto, `"portrait"` en caso contrario. |

## Uso

```jsx
import { useOrientation } from 'thecore-auth';

function OrientationBanner() {
  const orientation = useOrientation();

  if (orientation === 'portrait') {
    return (
      <div className="rotate-prompt">
        Por favor, gira tu dispositivo al modo horizontal.
      </div>
    );
  }

  return (
    <main>
      <p>Contenido mostrado en orientación horizontal.</p>
    </main>
  );
}
```

## Notas

- La orientación se deriva de las dimensiones de la ventana, no de la API `screen.orientation`, por lo que reacciona a cualquier redimensionamiento — incluyendo el redimensionamiento de la ventana del navegador en escritorio.
- El valor inicial se calcula de forma síncrona desde `window.innerWidth` y `window.innerHeight` en el momento en que se llama al hook por primera vez.
- El listener de eventos se adjunta a `resize` y se limpia al desmontar, por lo que no hay fugas de memoria.
- En iOS Safari, los cambios de orientación pueden disparar un evento `resize` con un ligero retraso. Considerar el debouncing si la precisión temporal es importante.
