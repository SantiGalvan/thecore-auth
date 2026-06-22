# LoadingComponent

> [English](../../../docs/components/LoadingComponent.md) | [Versione italiana](../../../docs/it/components/LoadingComponent.md)

## Descripción general

`LoadingComponent` es un spinner inline autónomo. A diferencia de `Loading`, **no** está conectado a ningún context — recibe toda su configuración a través de props y se adapta a cualquier contenedor. Úsalo para indicar el estado de carga de una sección específica de la página, en lugar de todo el viewport.

## Importación

```js
import { LoadingComponent } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|---|---|---|---|---|
| `spinner` | `boolean` | `true` | No | Si renderizar el ícono spinner |
| `spinnerStyle` | `string` | `undefined` | No | Clases Tailwind adicionales añadidas al spinner |
| `text` | `string` | `'Loading...'` | No | Texto mostrado sobre el spinner |
| `textStyle` | `string` | `undefined` | No | Clases Tailwind adicionales añadidas al elemento texto |
| `children` | `ReactNode` | `undefined` | No | Nodo personalizado renderizado en lugar del texto predeterminado |
| `containerStyle` | `string` | `undefined` | No | Clases Tailwind adicionales añadidas al div contenedor |
| `overrideStyle` | `object` | `{}` | No | Anulaciones de clases por slot: `container`, `spinner`, `text` |

## Variables CSS

`LoadingComponent` no usa propiedades CSS personalizadas. Sus valores predeterminados son clases Tailwind hardcoded (`text-black`, `animate-spin`).

## Uso

```jsx
import { LoadingComponent } from 'thecore-auth';

function UserCard({ isLoading, user }) {
  if (isLoading) {
    return (
      // El componente rellena su padre, así que dale una dimensión conocida al padre
      <div className="h-40 w-full">
        <LoadingComponent
          text="Cargando perfil…"
          textStyle="text-sm text-gray-500"
          spinnerStyle="text-indigo-500"
        />
      </div>
    );
  }

  return <p>{user.name}</p>;
}
```

### Contenido personalizado vía `children`

```jsx
<LoadingComponent spinner={false}>
  <span className="text-xs text-gray-400 italic">Por favor, espere…</span>
</LoadingComponent>
```

### Anulación completa

```jsx
<LoadingComponent
  overrideStyle={{
    container: 'flex flex-col items-center gap-2 p-4',
    spinner: 'text-4xl text-blue-600 animate-spin',
    text: 'text-blue-600 text-sm mt-1',
  }}
  text="Sincronizando…"
/>
```

## Notas

- El contenedor es `w-full h-full relative`, por lo que su tamaño está determinado enteramente por el elemento padre.
- `overrideStyle` reemplaza toda la cadena de clases predeterminada para un slot; `spinnerStyle`, `textStyle` y `containerStyle` se añaden a los valores predeterminados.
- Cuando se proporciona `children`, reemplaza el elemento texto `<p>`, pero el spinner sigue renderizándose a menos que `spinner={false}`.
