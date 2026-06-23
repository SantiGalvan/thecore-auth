# LogoLoader

> [English](../../../docs/en/components/LogoLoader.md) | [Versione italiana](../../../docs/it/components/LogoLoader.md)

## Descripción general

`LogoLoader` renderiza un anillo SVG circular giratorio alrededor de una imagen de logo. Se usa internamente por `Loader`, pero puede usarse de forma independiente cuando se necesita una animación de logo-con-anillo. El anillo gira con una rotación lenta de 2.2 segundos definida en `src/css/loader.css`.

## Importación

```js
import { LogoLoader } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|---|---|---|---|---|
| `sizeContainer` | `string` | `'h-60 w-60'` | No | Clases de tamaño Tailwind para el contenedor exterior |
| `Logo` | `ComponentType` | `undefined` | No | Componente React (típicamente un SVG) renderizado como logo central. Debe aceptar una prop `className` |
| `spinnerColor` | `string` | `'#60A5FA'` | No | Valor CSS del color para el trazo del anillo SVG |

## Variables CSS

`LogoLoader` no usa propiedades CSS personalizadas. La animación de rotación está definida en `src/css/loader.css`:

| Clase | Animación |
|---|---|
| `animate-spin-slow` | Rotación 360°, 2.2 s, lineal, infinita |

## Uso

```jsx
import { LogoLoader } from 'thecore-auth';
import MyLogo from './assets/MyLogo.svg?react';

// Uso independiente con tamaño y color personalizados
function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-indigo-50">
      <LogoLoader
        Logo={MyLogo}
        sizeContainer="h-[200px] w-[200px]"
        spinnerColor="#6366f1"
      />
    </div>
  );
}
```

### Tamaño predeterminado con logo

```jsx
<LogoLoader Logo={MyLogo} />
```

### Sin logo (solo anillo)

```jsx
// La prop Logo es opcional — renderiza solo el anillo giratorio
<LogoLoader sizeContainer="h-20 w-20" spinnerColor="#f43f5e" />
```

## Notas

- El anillo SVG usa `strokeDasharray="280"` y `strokeDashoffset="210"` para renderizar un arco en lugar de un círculo completo.
- El componente `Logo` se renderiza dentro de un `<figure>` con `rounded-full overflow-hidden`, por lo que los logos rectangulares serán recortados en forma circular.
- Importa `loader.css` (o asegúrate de que la app host importe el bundle CSS de `thecore-auth`) para que la clase `animate-spin-slow` tenga efecto.
- Cuando se usa dentro de `Loader`, `sizeContainer` está controlado por la prop `containerSize` de `Loader`.
