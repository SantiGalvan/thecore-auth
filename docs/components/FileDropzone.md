# FileDropzone

> **Versione italiana:** [docs/it/components/FileDropzone.md](../it/components/FileDropzone.md) | **Versión española:** [docs/es/components/FileDropzone.md](../es/components/FileDropzone.md)

## Overview

A drag-and-drop file upload zone. It handles `dragenter`, `dragover`, `dragleave`, and `drop` events and forwards selected files — whether dragged or picked via the native file dialog — as an `Array<File>` to the `onFilesSelect` callback. An animated border overlay appears while a drag is in progress. All visual regions are customizable through dedicated style props.

## Import

```js
import { FileDropzone } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `onFilesSelect` | `(files: File[]) => void` | — | Yes | Called with an `Array<File>` whenever the user drops or selects files. |
| `id` | `string` | `'dropzone-file'` | No | `id` attribute of the hidden `<input type="file">`. |
| `containerStyle` | `string` | `'flex items-center justify-center w-full relative h-full'` | No | Class string for the outermost `<div>`. |
| `labelStyle` | `string` | See below | No | Class string for the `<label>` that wraps the visible dropzone area. Includes drag-active state interpolation by default. |
| `dropzoneStyle` | `string` | `'flex flex-col items-center justify-center text-body px-6 text-center pt-5 pb-6 pointer-events-none'` | No | Class string for the inner content block (icon + text). |
| `dragActiveStyle` | `string` | `'absolute w-full h-full top-0 left-0 rounded-2xl border-2 border-primary-strong/70 animate-pulse'` | No | Class string for the overlay `<div>` rendered when a drag is in progress. |

**Default `labelStyle`:**
```
flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all
duration-300 bg-slate-100/80 shadow-lg border border-slate-300 rounded-base
cursor-pointer hover:bg-slate-200/80 hover:border-slate-500 hover:shadow-xl
[drag-active: bg-slate-200/80 border-slate-600 shadow-xl shadow-primary-strong]
```

## CSS Variables

`FileDropzone` does not use CSS custom properties from `src/css/index.css`. All styling is expressed through Tailwind utility classes in the default prop values.

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

- The hidden `<input type="file">` has the `multiple` attribute, so users can always select more than one file regardless of the drag-and-drop path.
- Drag events (`dragenter`, `dragover`, `dragleave`) are managed with `useCallback` to avoid re-creating handlers on each render.
- The drag-active overlay intercepts pointer events during a drag to prevent the cursor from leaving the dropzone boundaries; it is removed immediately on `drop` or `dragleave`.
- The upload icon (`SlCloudUpload`) is imported from `react-icons/sl` — ensure this package is available in the consuming project.
- UI text inside the component is currently in Italian ("Clicca per caricare…"); override `dropzoneStyle` or fork the component if you need a different locale.
