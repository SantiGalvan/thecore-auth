# useDevice

> [English](../../../docs/en/hooks/useDevice.md) | [Versione italiana](../../it/hooks/useDevice.md)

## Descripción general

`useDevice` analiza la cadena User-Agent actual mediante `ua-parser-js` y devuelve un objeto estable que describe el tipo de dispositivo, SO, navegador y flags booleanos de conveniencia. El resultado se calcula una vez y se almacena en caché a nivel de módulo, por lo que las llamadas posteriores (incluso entre diferentes componentes) comparten el mismo objeto sin volver a analizar.

## Importación

```js
import { useDevice } from 'thecore-auth';
```

## Parámetros

Este hook no acepta parámetros.

## Valor de retorno

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `type` | `string` | Tipo de dispositivo: `"mobile"`, `"tablet"` o `"desktop"`. |
| `os` | `string | undefined` | Nombre del sistema operativo (p. ej. `"iOS"`, `"Android"`, `"Windows"`). |
| `browser` | `string | undefined` | Nombre del navegador (p. ej. `"Chrome"`, `"Safari"`, `"Firefox"`). |
| `vendor` | `string | null` | Fabricante del dispositivo (p. ej. `"Apple"`, `"Samsung"`), o `null` si se desconoce. |
| `model` | `string | null` | Modelo del dispositivo (p. ej. `"iPhone"`, `"iPad"`), o `null` si se desconoce. |
| `isMobile` | `boolean` | `true` para teléfonos. |
| `isTablet` | `boolean` | `true` para tablets, incluyendo iPads enmascarados como escritorio por Safari. |
| `isDesktop` | `boolean` | `true` cuando no es ni móvil ni tablet. |
| `isIPhone` | `boolean` | `true` cuando el modelo del dispositivo es `"iPhone"`. |
| `isIPad` | `boolean` | `true` para iPads, incluyendo aquellos en los que Safari reporta `MacIntel`. |
| `isAndroid` | `boolean` | `true` cuando el SO es `"Android"`. |

## Uso

```jsx
import { useDevice } from 'thecore-auth';

function AdaptiveLayout({ children }) {
  const { isMobile, isTablet, isDesktop, os } = useDevice();

  return (
    <div
      className={
        isMobile  ? 'layout-mobile'  :
        isTablet  ? 'layout-tablet'  :
                    'layout-desktop'
      }
    >
      {isDesktop && <Sidebar />}
      <main>{children}</main>
      {isMobile && os === 'iOS' && <IOSInstallBanner />}
    </div>
  );
}
```

## Notas

- El UA se analiza como máximo una vez por carga de página. El resultado se almacena en una variable a nivel de módulo (`cachedDevice`), por lo que llamar a `useDevice` en múltiples componentes es gratuito después de la primera llamada.
- La detección de iPad incluye un fallback para Safari ≥ 13 en iPadOS, que reporta `MacIntel` como plataforma. El hook comprueba `navigator.platform === "MacIntel" && "ontouchend" in document` para identificar estos dispositivos.
- Dado que el resultado está en caché, no cambia de forma reactiva. Si el hook se usa en un contexto de renderizado del lado del servidor, `navigator` / `document` no estarán disponibles y el hook lanzará una excepción.
- `useMemo` con un array de dependencias vacío se usa para garantizar la estabilidad referencial; el objeto devuelto es siempre la misma referencia en caché.
