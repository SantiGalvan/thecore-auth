# SmartLogin

> [English](../../pages/SmartLogin.md) | [Italiano](../../it/pages/SmartLogin.md)

## Descripción general

`SmartLogin` es la página de login optimizada para PWA. Proporciona el mismo flujo de autenticación que `Login` pero con un conjunto más rico de controles visuales:

- **Imagen de fondo** con opacidad y color de overlay configurables
- **Tres variantes de tarjeta**: `solid` (por defecto), `glass`, `minimal`
- **Alineación de tarjeta**: `center`, `left`, o `right`
- **Posición del logo**: `left` (lado a lado en escritorio) o `top` (apilado)
- **Toggle de contraseña integrado** (mostrar / ocultar)
- **Animación de entrada** al montar
- **Detección de orientación responsive**: en modo portrait el logo se mueve automáticamente encima del formulario independientemente de `logoPosition`

`SmartLogin` gestiona su propio estado del formulario y el envío — no usa el componente `LoginForm` internamente — pero sigue leyendo etiquetas, texto placeholder y overrides de estilo desde `LoginFormContext`.

## Importación

```js
import { SmartLogin } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|--------|------|-------------|-----------|-------------|
| `Logo` | `React.ComponentType` | `undefined` | No | Componente SVG/imagen renderizado como logo de la marca |
| `backgroundSrc` | `string` | variable CSS `--bg-image` | No | URL de la imagen de fondo. Si se omite, se usa la variable CSS `--bg-image` |
| `overlayOpacity` | `number` | `0.5` | No | Opacidad del overlay de color sobre el fondo (0.0–1.0) |
| `overlayColor` | `string` | `'#f1f1f1'` | No | Color de la capa de overlay |
| `cardVariant` | `'solid' \| 'glass' \| 'minimal'` | `'solid'` | No | Estilo visual de la tarjeta de login |
| `cardPosition` | `'center' \| 'left' \| 'right'` | `'center'` | No | Alineación horizontal de la tarjeta en el viewport |
| `logoPosition` | `'left' \| 'top'` | `'left'` | No | Posición del logo relativa al formulario en landscape/escritorio |
| `showPasswordToggle` | `boolean` | `true` | No | Muestra el icono de ojo para alternar la visibilidad de la contraseña |
| `animateEntrance` | `boolean` | `true` | No | Anima el slide-in de la tarjeta al montar |

## Uso

### Mínimo

```jsx
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function LoginPage() {
  return <SmartLogin Logo={Logo} />;
}
```

### Personalización completa

```jsx
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function LoginPage() {
  return (
    <SmartLogin
      Logo={Logo}
      backgroundSrc="/images/office-bg.jpg"
      overlayOpacity={0.6}
      overlayColor="#1a1a2e"
      cardVariant="glass"
      cardPosition="right"
      logoPosition="top"
      showPasswordToggle={true}
      animateEntrance={true}
    />
  );
}
```

### En un árbol de rutas personalizado

```jsx
import { Routes, Route } from 'react-router-dom';
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

<Routes>
  <Route path="/" index element={<SmartLogin Logo={Logo} cardVariant="glass" />} />
</Routes>
```

## Notas

- `SmartLogin` llama a `useViewportHeight()` para gestionar el problema `100vh` de los navegadores móviles.
- En orientación portrait (detectada mediante `useOrientation`), `logoPosition` se sobreescribe a `'top'` automáticamente.
- `clearLoginFormOnError` en `ConfigContext`: cuando es `true`, el campo de contraseña se vacía en cada intento de login fallido.
- Los overrides de estilo (`overrideStyle` de `LoginFormContext`) se aplican a `cardForm`, `containerLogo`, `logo`, `form`, `title`, `containerEmail`, `containerPassword`, `containerButton` y `button`.
- El overlay de fondo y `backgroundSrc` se renderizan en un `div` separado (`.lp-bg`) para evitar re-renders del formulario durante el scroll o actualizaciones de paralaje.
- `SmartLogin` no soporta `autoLogin` ni `AutoLoginFallback`. Usa `Login` cuando se requiere auto-login.
