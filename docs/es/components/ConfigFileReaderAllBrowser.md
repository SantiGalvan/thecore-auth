# ConfigFileReaderAllBrowser

> [English](../../../docs/en/components/ConfigFileReaderAllBrowser.md) | [Versione italiana](../../it/components/ConfigFileReaderAllBrowser.md)

## Descripción general

`ConfigFileReaderAllBrowser` es un componente SPOT RFID que proporciona un selector de archivos cross-browser para un archivo `config.json`. A diferencia de [`ConfigFileReader`](./ConfigFileReader.md), renderiza un `<input type="file" accept=".json">` oculto y usa un `ref` para activarlo programáticamente al hacer clic en el botón visible — haciéndolo compatible con navegadores de escritorio y móviles estándar sin requerir un bridge nativo.

En iOS (iPad/iPhone/iPod), un mensaje de instrucción adicional guía al usuario a guardar el archivo en la app Archivos de iOS antes de seleccionarlo, sorteando las restricciones de acceso a archivos de iOS.

Soporta una animación de entrada opcional controlada por `isConfigPage` y `show`.

## Import

```jsx
import { ConfigFileReaderAllBrowser } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Default | Requerido | Descripción |
|---|---|---|---|---|
| `handleFileChange` | `function` | — | ✅ | Handler `onChange` para el input file oculto. Recibe el `ChangeEvent` nativo. Usar `event.target.files[0]` para leer el archivo seleccionado. |
| `show` | `boolean` | — | — | Cuando `isConfigPage` es `true`, controla la animación de entrada: `true` → visible, `false` → oculto con desplazamiento hacia abajo. |
| `isConfigPage` | `boolean` | — | — | Habilita el comportamiento animado show/hide guiado por `show`. Cuando es `false`, el componente siempre es completamente visible sin animación. |

## Variables CSS

Este componente no usa variables CSS específicas de SPOT RFID. Se aplican las variables de layout generales de la aplicación anfitriona.

## Uso

```jsx
import { ConfigFileReaderAllBrowser } from 'thecore-auth';

function ConfigPage({ isReady }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);
        console.log('Loaded config:', config);
      } catch {
        console.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <ConfigFileReaderAllBrowser
        isConfigPage={true}
        show={isReady}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}
```

## Notas

- La detección de iOS (`/iPad|iPhone|iPod/.test(navigator.userAgent)`) se ejecuta en el momento de la evaluación del módulo, no dentro del componente — no es reactiva a cambios del user-agent durante la sesión.
- El `<input type="file">` oculto acepta solo archivos `.json` (`accept=".json"`). La restricción del tipo de archivo la aplica la UI del navegador; `handleFileChange` debería igualmente validar el contenido del archivo.
- Usar este componente en lugar de [`ConfigFileReader`](./ConfigFileReader.md) cuando no hay un bridge WebView nativo disponible.
- El comportamiento de la animación es idéntico a `ConfigFileReader`: activo solo cuando `isConfigPage={true}`.
- El texto de instrucción y el mensaje guía de iOS están fijos en italiano como requisito de producto.
