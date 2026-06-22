# SingleSelect

> **English:** [docs/components/SingleSelect.md](../../components/SingleSelect.md) | **Versión española:** [docs/es/components/SingleSelect.md](../es/components/SingleSelect.md)

## Overview

Un selettore a valore singolo completamente controllato, renderizzato come una pila verticale di pulsanti. Ogni opzione viene visualizzata come una pill in maiuscolo; l'opzione attiva è evidenziata in blu. Pensato per insiemi di opzioni piccoli ed enumerabili in cui tutte le scelte devono essere visibili a colpo d'occhio (es. pannelli di filtro, selettori di configurazione).

## Import

```js
import { SingleSelect } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `options` | `string[]` | `[]` | No | Array di valori stringa da renderizzare come pulsanti selezionabili. |
| `value` | `string` | — | Yes | L'opzione attualmente selezionata. Deve corrispondere a una delle stringhe in `options`. |
| `onChange` | `(selected: string) => void` | — | Yes | Chiamato con la stringa dell'opzione cliccata quando l'utente seleziona un nuovo valore. |

## CSS Variables

`SingleSelect` non utilizza proprietà CSS personalizzate da `src/css/index.css`. Gli stili attivo e inattivo sono classi Tailwind codificate (`bg-blue-500`, `bg-white`, `border-blue-500`, `border-slate-100`).

## Usage

```jsx
import { useState } from 'react';
import { SingleSelect } from 'thecore-auth';

const ROLES = ['Admin', 'Editor', 'Viewer'];

function RolePicker() {
  const [role, setRole] = useState('Viewer');

  return (
    <div className="w-48">
      <p className="mb-2 text-sm font-medium text-slate-600">Select role</p>
      <SingleSelect
        options={ROLES}
        value={role}
        onChange={setRole}
      />
      <p className="mt-3 text-xs text-slate-400">Selected: {role}</p>
    </div>
  );
}
```

## Notes

- Tutti i pulsanti vengono renderizzati con `type="button"` per evitare la sottomissione accidentale del form.
- Il controllo dello stato attivo è un confronto di uguaglianza stretta (`value === option`) — i valori devono essere univoci all'interno di `options`.
- Le etichette vengono renderizzate in maiuscolo tramite `uppercase tracking-tighter` — la visualizzazione è sempre la stringa grezza da `options`; non esiste una mappatura separata `label`/`value`. Se è necessario separare le etichette di visualizzazione dai valori interni, derivare `options` da un array mappato e convertire in `onChange`.
- Non viene applicato alcun contenitore di scorrimento — per insiemi di opzioni grandi considerare `MultiSelect`.
