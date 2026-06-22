# Alert

> [English](../../../docs/components/Alert.md) | [Versione italiana](../../../docs/it/components/Alert.md)

## Descripción general

`Alert` es un banner de notificación de posición fija estilo toast. Lee su estado de `AlertContext` y `ConfigContext`, por lo que no acepta props. El banner incluye una barra de progreso que se agota en `alertTimeout` milisegundos, después de lo cual se cierra automáticamente. En dispositivos móviles/tabletas con Sileo habilitado, el alert es reemplazado por un toast nativo (ver Notas).

## Importación

```js
import { Alert } from 'thecore-auth';
```

## Props

Este componente **no acepta props**. Actívalo llamando a `activeAlert` desde `useAlert()`.

| Valor de `useAlert()` | Tipo | Firma | Descripción |
|---|---|---|---|
| `activeAlert` | `function` | `(type, message, customType?)` | Mostrar el alert |
| `closeAlert` | `function` | `()` | Cerrar el alert inmediatamente |
| `showAlert` | `boolean` | — | Si el alert está actualmente visible |

**Tipos de alert** (argumento `type` de `activeAlert`):

| Valor | Significado |
|---|---|
| `'danger'` | Error / acción destructiva |
| `'info'` | Información neutral |
| `'success'` | Operación exitosa |
| `'warning'` | Advertencia no crítica |

## Variables CSS

| Variable | Por defecto | Descripción |
|---|---|---|
| `--color-danger` | `#FEE2E2` | Fondo danger |
| `--color-danger-text` | `#B91C1C` | Color de texto danger |
| `--color-danger-hover` | `#FECACA` | Hover botón cerrar danger |
| `--color-danger-progress` | `#F87171` | Barra de progreso danger |
| `--color-info` | `#EFF6FF` | Fondo info |
| `--color-info-text` | `#1D4ED8` | Color de texto info |
| `--color-info-hover` | `#BFDBFE` | Hover botón cerrar info |
| `--color-info-progress` | `#60A5FA` | Barra de progreso info |
| `--color-success` | `#ECFDF5` | Fondo success |
| `--color-success-text` | `#15803D` | Color de texto success |
| `--color-success-hover` | `#A7F3D0` | Hover botón cerrar success |
| `--color-success-progress` | `#34D399` | Barra de progreso success |
| `--color-warning` | `#F9FAEB` | Fondo warning |
| `--color-warning-text` | `#D97706` | Color de texto warning |
| `--color-warning-hover` | `#FDE047` | Hover botón cerrar warning |
| `--color-warning-progress` | `#FACC15` | Barra de progreso warning |

## Uso

```jsx
import { AlertProvider, useAlert, Alert } from 'thecore-auth';

// Coloca <Alert /> una vez en la raíz de la app
function App({ children }) {
  return (
    <AlertProvider>
      {children}
      <Alert />
    </AlertProvider>
  );
}

// Activa desde cualquier componente del árbol
function SaveButton() {
  const { activeAlert } = useAlert();

  async function handleSave() {
    try {
      await api.save();
      activeAlert('success', 'Registro guardado correctamente.');
    } catch (err) {
      activeAlert('danger', 'Error al guardar. Por favor, inténtalo de nuevo.');
    }
  }

  return <button onClick={handleSave}>Guardar</button>;
}
```

### Forzar alert web en móvil

```jsx
// Pasa un customType no nulo para omitir el toast Sileo incluso en móvil
activeAlert('warning', 'La sesión está a punto de expirar.', 'web');
```

## Notas

- La duración `alertTimeout` (en milisegundos) se configura en `ConfigContext` a través de `public/config.json`. La barra de progreso se agota linealmente durante esa duración.
- Cuando `sileoToastEnabled` es `true` en la configuración y el tipo de dispositivo es `mobile` o `tablet`, `activeAlert` delega a los toasts nativos de Sileo y `<Alert />` nunca se muestra. Pasa un argumento `customType` no nulo para forzar el banner web independientemente del dispositivo.
- Coloca `<Alert />` en la raíz del árbol de componentes para asegurar que el overlay fijo se superponga sobre todo el contenido.
- El componente usa `role="alert"` para la accesibilidad.
