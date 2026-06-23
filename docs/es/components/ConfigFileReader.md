# ConfigFileReader

> [English](../../../docs/components/ConfigFileReader.md) | [Versione italiana](../../it/components/ConfigFileReader.md)

## Descripción general

`ConfigFileReader` es un componente SPOT RFID que muestra un texto guía y un botón para seleccionar un archivo `config.json`. Está diseñado para entornos donde la integración nativa del file-picker se proporciona externamente (ej. un bridge WebView o una API de sistema de archivos personalizada) — el componente solo renderiza el botón y delega la apertura efectiva del archivo a `handleSelectFile`.

Soporta una animación de entrada opcional controlada por la combinación de `isConfigPage` y `show`.

## Import

```jsx
import { ConfigFileReader } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Default | Requerido | Descripción |
|---|---|---|---|---|
| `handleSelectFile` | `function` | — | ✅ | Llamada al hacer clic en el botón "Seleziona file". Responsable de abrir el file picker o activar el bridge nativo. |
| `show` | `boolean` | — | — | Cuando `isConfigPage` es `true`, controla la animación de entrada: `true` → visible, `false` → oculto con desplazamiento hacia abajo. |
| `isConfigPage` | `boolean` | — | — | Habilita el comportamiento animado show/hide guiado por `show`. Cuando es `false`, el componente siempre es completamente visible sin animación. |

## Variables CSS

Este componente no usa variables CSS específicas de SPOT RFID. Se aplican las variables de layout generales de la aplicación anfitriona.

## Uso

```jsx
import { ConfigFileReader } from 'thecore-auth';

function ConfigPage({ isReady }) {
  const handleSelectFile = () => {
    // Trigger a WebView bridge call or a custom native file dialog
    window.NativeBridge?.openFilePicker('application/json');
  };

  return (
    <div>
      <ConfigFileReader
        isConfigPage={true}
        show={isReady}
        handleSelectFile={handleSelectFile}
      />
    </div>
  );
}
```

## Notas

- Este componente **no** renderiza un `<input type="file">` oculto. La selección de archivo está completamente delegada a `handleSelectFile` — usar [`ConfigFileReaderAllBrowser`](./ConfigFileReaderAllBrowser.md) para el comportamiento estándar del file-picker del navegador.
- La animación solo está activa cuando `isConfigPage={true}`. Cuando `isConfigPage` es `false` u omitido, `show` no tiene efecto.
- El texto de instrucción ("Seleziona il file **config.json**…") está fijo en italiano como requisito de producto.
