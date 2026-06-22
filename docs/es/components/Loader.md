# Loader

> [English](../../../docs/components/Loader.md) | [Versione italiana](../../../docs/it/components/Loader.md)

## Descripción general

`Loader` es un overlay animado a pantalla completa mostrado durante la carga inicial de la app. Lee `isLoading` de `LoadingContext` y `customLoginTimeout` de `ConfigContext`. El overlay aparece con fade-in al inicio de la carga y desaparece con fade-out (300 ms) al finalizar. En cada montaje se elige un gradiente aleatorio de una paleta predefinida; la paleta puede reemplazarse o extenderse a través de props.

## Importación

```js
import { Loader } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|---|---|---|---|---|
| `gradients` | `string[]` | `undefined` | No | Reemplaza toda la lista de gradientes predefinida. Si se omite, se usa la paleta por defecto (más `moreGradients`) |
| `moreGradients` | `string[]` | `undefined` | No | Clases de gradiente Tailwind adicionales añadidas a la lista predefinida |
| `containerSize` | `string` | `'h-[420px] w-[420px]'` | No | Clases de tamaño Tailwind pasadas al contenedor interno de `LogoLoader` |
| `overlayStyle` | `string` | `undefined` | No | Reemplaza las clases de posicionamiento predeterminadas del overlay (`fixed top-0 … flex items-center justify-center z-999 transition-opacity duration-300`) |
| `NewLogoLoader` | `ComponentType` | `undefined` | No | Componente personalizado renderizado en lugar de `LogoLoader` |
| `Logo` | `ComponentType` | `undefined` | No | Componente SVG/imagen pasado a `LogoLoader` como logo central |
| `spinnerColor` | `string` | `'#60A5FA'` | No | Color del trazo del anillo SVG en `LogoLoader` |

## Variables CSS

`Loader` no usa variables CSS. La animación de fade se basa en las utilidades de opacidad de Tailwind y la animación del anillo SVG está definida en `src/css/loader.css`:

| Clase | Animación |
|---|---|
| `animate-spin-slow` | Rotación 360°, 2.2 s, lineal, infinita |

## Uso

```jsx
import { Loader } from 'thecore-auth';
import MyLogo from './assets/MyLogo.svg?react';

// Coloca una vez en la raíz de la app, dentro de LoadingProvider
function App({ children }) {
  return (
    <LoadingProvider>
      <Loader
        Logo={MyLogo}
        spinnerColor="#6366f1"
        containerSize="h-[300px] w-[300px]"
        moreGradients={[
          'bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-300',
        ]}
      />
      {children}
    </LoadingProvider>
  );
}
```

### Reemplazar toda el área del logo

```jsx
function CustomSpinner() {
  return <div className="h-20 w-20 rounded-full border-4 border-white animate-spin" />;
}

<Loader NewLogoLoader={CustomSpinner} />
```

### Extender la paleta de gradientes

```jsx
<Loader
  moreGradients={[
    'bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-200',
    'bg-gradient-to-br from-teal-300 via-cyan-400 to-sky-500',
  ]}
  Logo={MyLogo}
/>
```

## Notas

- El gradiente se elige aleatoriamente al montar usando `Math.random()` — cada recarga de página puede mostrar un gradiente diferente.
- La duración del fade-out (300 ms) está hardcoded; ajústala a través de `overlayStyle` si necesitas una transición diferente.
- `Loader` está diseñado para el flujo de carga inicial de autenticación/login. Para spinners en-página usa `Loading` o `LoadingComponent`.
- `customLoginTimeout` de `ConfigContext` está listado como dependencia del effect para permitir que la app host resetee el ciclo del loader; no controla directamente el timeout.
