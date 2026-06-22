# FileDropzone

> **English:** [docs/components/FileDropzone.md](../../components/FileDropzone.md) | **Versione italiana:** [docs/it/components/FileDropzone.md](../it/components/FileDropzone.md)

## Overview

Una zona de carga de archivos con arrastrar y soltar. Gestiona los eventos `dragenter`, `dragover`, `dragleave` y `drop`, y reenvía los archivos seleccionados — ya sea arrastrados o elegidos mediante el diálogo nativo de archivos — como un `Array<File>` al callback `onFilesSelect`. Aparece una superposición de borde animado mientras hay un arrastre en progreso. Todas las regiones visuales son personalizables mediante props de estilo dedicadas.

## Import

```js
import { FileDropzone } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `onFilesSelect` | `(files: File[]) => void` | — | Yes | Se llama con un `Array<File>` cada vez que el usuario suelta o selecciona archivos. |
| `id` | `string` | `'dropzone-file'` | No | Atributo `id` del `<input type="file">` oculto. |
| `containerStyle` | `string` | `'flex items-center justify-center w-full relative h-full'` | No | Cadena de clases para el `<div>` más externo. |
| `labelStyle` | `string` | Ver abajo | No | Cadena de clases para el `<label>` que envuelve el área visible de la zona. Incluye interpolación del estado de arrastre activo por defecto. |
| `dropzoneStyle` | `string` | `'flex flex-col items-center justify-center text-body px-6 text-center pt-5 pb-6 pointer-events-none'` | No | Cadena de clases para el bloque de contenido interno (icono + texto). |
| `dragActiveStyle` | `string` | `'absolute w-full h-full top-0 left-0 rounded-2xl border-2 border-primary-strong/70 animate-pulse'` | No | Cadena de clases para el `<div>` de superposición renderizado cuando hay un arrastre en progreso. |

**`labelStyle` predeterminado:**
```
flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all
duration-300 bg-slate-100/80 shadow-lg border border-slate-300 rounded-base
cursor-pointer hover:bg-slate-200/80 hover:border-slate-500 hover:shadow-xl
[drag-active: bg-slate-200/80 border-slate-600 shadow-xl shadow-primary-strong]
```

## CSS Variables

`FileDropzone` no utiliza propiedades CSS personalizadas de `src/css/index.css`. Todo el estilo se expresa mediante clases utilitarias de Tailwind en los valores predeterminados de las props.

## Usage

```jsx
import { useState } from 'react';
import { FileDropzone } from 'thecore-auth';

function UploadPanel() {
  const [files, setFiles] = useState([]);

  const handleFiles = (selected) => {
    setFiles((prev) => [...prev, ...selected]);
  };

  return (
    <div className="h-64 w-full max-w-lg mx-auto">
      <FileDropzone onFilesSelect={handleFiles} />

      {files.length > 0 && (
        <ul className="mt-4 text-sm text-slate-600 space-y-1">
          {files.map((f, i) => (
            <li key={i}>{f.name} — {(f.size / 1024).toFixed(1)} KB</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

## Notes

- El `<input type="file">` oculto tiene el atributo `multiple`, por lo que los usuarios siempre pueden seleccionar más de un archivo independientemente de la ruta de arrastrar y soltar.
- Los eventos de arrastre (`dragenter`, `dragover`, `dragleave`) se gestionan con `useCallback` para evitar recrear los manejadores en cada renderizado.
- La superposición de arrastre activo intercepta los eventos de puntero durante un arrastre para evitar que el cursor salga de los límites de la zona; se elimina inmediatamente en `drop` o `dragleave`.
- El icono de carga (`SlCloudUpload`) se importa desde `react-icons/sl` — asegúrate de que este paquete esté disponible en el proyecto consumidor.
- El texto de la interfaz dentro del componente está actualmente en italiano ("Clicca per caricare…"); sobrescribe `dropzoneStyle` o bifurca el componente si necesitas una configuración regional diferente.
