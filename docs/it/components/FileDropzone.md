# FileDropzone

> **English:** [docs/components/FileDropzone.md](../../components/FileDropzone.md) | **Versión española:** [docs/es/components/FileDropzone.md](../es/components/FileDropzone.md)

## Overview

Una zona di caricamento file tramite drag-and-drop. Gestisce gli eventi `dragenter`, `dragover`, `dragleave` e `drop` e inoltra i file selezionati — trascinati o scelti tramite il dialogo nativo del file — come `Array<File>` al callback `onFilesSelect`. Un bordo animato appare durante un trascinamento attivo. Tutte le aree visive sono personalizzabili tramite appositi prop di stile.

## Import

```js
import { FileDropzone } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `onFilesSelect` | `(files: File[]) => void` | — | Yes | Chiamato con un `Array<File>` ogni volta che l'utente trascina o seleziona file. |
| `id` | `string` | `'dropzone-file'` | No | Attributo `id` dell'`<input type="file">` nascosto. |
| `containerStyle` | `string` | `'flex items-center justify-center w-full relative h-full'` | No | Stringa di classi per il `<div>` più esterno. |
| `labelStyle` | `string` | Vedi sotto | No | Stringa di classi per il `<label>` che racchiude l'area visibile della dropzone. Include per default l'interpolazione dello stato drag-active. |
| `dropzoneStyle` | `string` | `'flex flex-col items-center justify-center text-body px-6 text-center pt-5 pb-6 pointer-events-none'` | No | Stringa di classi per il blocco di contenuto interno (icona + testo). |
| `dragActiveStyle` | `string` | `'absolute w-full h-full top-0 left-0 rounded-2xl border-2 border-primary-strong/70 animate-pulse'` | No | Stringa di classi per il `<div>` overlay visualizzato durante un trascinamento attivo. |

**`labelStyle` predefinito:**
```
flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all
duration-300 bg-slate-100/80 shadow-lg border border-slate-300 rounded-base
cursor-pointer hover:bg-slate-200/80 hover:border-slate-500 hover:shadow-xl
[drag-active: bg-slate-200/80 border-slate-600 shadow-xl shadow-primary-strong]
```

## CSS Variables

`FileDropzone` non utilizza proprietà CSS personalizzate da `src/css/index.css`. Tutto lo stile è espresso tramite classi di utilità Tailwind nei valori predefiniti dei prop.

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

- L'`<input type="file">` nascosto ha l'attributo `multiple`, quindi gli utenti possono sempre selezionare più di un file indipendentemente dal percorso drag-and-drop.
- Gli eventi di trascinamento (`dragenter`, `dragover`, `dragleave`) sono gestiti con `useCallback` per evitare di ricreare gli handler ad ogni render.
- L'overlay drag-active intercetta gli eventi puntatore durante un trascinamento per impedire al cursore di uscire dai confini della dropzone; viene rimosso immediatamente su `drop` o `dragleave`.
- L'icona di caricamento (`SlCloudUpload`) è importata da `react-icons/sl` — assicurarsi che questo pacchetto sia disponibile nel progetto che consuma la libreria.
- Il testo dell'interfaccia all'interno del componente è attualmente in italiano ("Clicca per caricare…"); sovrascrivere `dropzoneStyle` o fare un fork del componente se si ha bisogno di una lingua diversa.
