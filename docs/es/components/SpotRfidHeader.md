# SpotRfidHeader

> [English](../../../docs/en/components/SpotRfidHeader.md) | [Versione italiana](../../it/components/SpotRfidHeader.md)

> ⚠️ **Exportado como `Header`** desde `thecore-auth`. Importar con: `import { Header } from 'thecore-auth'`

## Descripción general

`SpotRfidHeader` es la barra de navegación superior para aplicaciones SPOT RFID. Muestra un área de logo, el título de la página actual y un botón contextual — logout (en la ruta home cuando el inicio de sesión automático está deshabilitado) o navegación hacia atrás (en rutas no-home cuando `showHeaderButton` está activado).

El header se oculta automáticamente mientras el estado de carga global está activo. El logo, el título y la visibilidad del botón están gestionados por los contextos internos de la librería.

## Import

```jsx
import { Header } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Default | Requerido | Descripción |
|---|---|---|---|---|
| `Logo` | `React component` | `undefined` | — | Componente SVG (función) renderizado como logo del header. Tiene prioridad sobre `logo`. |
| `logo` | `string` | `undefined` | — | URL de una imagen a renderizar como logo. Se usa cuando no se proporciona `Logo`. Si no se proporciona ninguno, se usa el SVG MyTrack predeterminado. |

## Variables CSS

| Variable | Default | Descripción |
|---|---|---|
| `--header-height` | `60px` | Altura de la barra del header |
| `--width-logo-size` | `48px` | Ancho del logo dentro del header |

## Uso

```jsx
import { Header } from 'thecore-auth';
import CompanyLogo from './assets/company-logo.svg?react';

// Option 1: SVG component (recommended — avoids extra HTTP request)
function App() {
  return (
    <div>
      <Header Logo={CompanyLogo} />
      <main>{/* contenido de la página */}</main>
    </div>
  );
}

// Option 2: image URL
function App() {
  return (
    <div>
      <Header logo="/assets/company-logo.png" />
      <main>{/* contenido de la página */}</main>
    </div>
  );
}

// Option 3: default logo (no props needed)
function App() {
  return (
    <div>
      <Header />
      <main>{/* contenido de la página */}</main>
    </div>
  );
}
```

## Notas

- El botón de logout aparece solo cuando `autoLogin` es `false` (desde `useConfig`) **y** la ruta actual coincide con `home/:id`.
- El botón de retroceso aparece solo cuando la ruta actual **no** coincide con `home/:id` y `showHeaderButton` es `true` (desde `useConfig`).
- El botón de retroceso llama a `navigate(-1)` de React Router — depende de que el historial del navegador esté disponible.
- El título central proviene de `configRoutes` (vía `useConfig`); si ninguna ruta coincide, se usa `firstPrivateTitle`.
- Requiere `AuthProvider`, `AlertProvider`, `ConfigProvider` y `LoadingProvider` en el árbol de componentes.
