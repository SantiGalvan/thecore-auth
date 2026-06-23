# Login

> [English](../../pages/Login.md) | [Italiano](../../it/pages/Login.md)

## Descripción general

`Login` es la página de login estándar. Renderiza un layout de tarjeta con el logo en un lado y `LoginForm` en el otro. Gestiona automáticamente tres escenarios:

1. **Ya autenticado** — si hay un token válido e ID de usuario en el almacenamiento, el usuario es navegado inmediatamente a `firstPrivatePath + user.id`.
2. **Auto-login activo, esperando** — muestra un spinner `Loading` a pantalla completa mientras el flujo de auto-login se ejecuta.
3. **Auto-login fallido** — renderiza `AutoLoginFallback` (o el `DefaultAutoLoginFallback` integrado) con el error.

El formulario es gestionado por `LoginFormContext`. Los overrides de estilo también se leen desde `LoginFormContext`.

## Importación

```js
import { Login } from 'thecore-auth';
```

`Login` es renderizado automáticamente en la ruta `"/"` por `PackageRoutes`. La importación directa solo es necesaria para árboles de rutas personalizados.

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|--------|------|-------------|-----------|-------------|
| `Logo` | `React.ComponentType` | `undefined` | No | Componente SVG/imagen renderizado en el área del logo de la tarjeta |
| `AutoLoginFallback` | `React.ComponentType<{ error: unknown }>` | `DefaultAutoLoginFallback` | No | Componente mostrado cuando falla el auto-login; recibe el error como prop `error` |

## Uso

### Vía `PackageRoutes` (estándar)

```jsx
import { PackageRoutes } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      pathImg="/assets/logo.svg"
    />
  );
}
```

### Fallback de auto-login personalizado

Para proporcionar un fallback personalizado, usa `Login` directamente en un árbol de rutas personalizado:

```jsx
import { Login } from 'thecore-auth';
import Logo from './assets/logo.svg?react';
import MyAutoLoginError from './components/MyAutoLoginError';

<Route index element={<Login Logo={Logo} AutoLoginFallback={MyAutoLoginError} />} />
```

## Notas

- La insignia de versión (arriba a la izquierda) se muestra cuando `version` o `customVersion` está establecido en `LoginFormContext`.
- El layout y las clases de estilo pueden ser sobreescritas mediante `overrideStyle` de `LoginFormContext` (claves: `container`, `cardForm`, `containerLogo`, `logo`).
- `Login` llama a `useViewportHeight()` para corregir el problema `100vh` en navegadores móviles.
- `DefaultAutoLoginFallback` es un componente interno y no se exporta desde el paquete.
