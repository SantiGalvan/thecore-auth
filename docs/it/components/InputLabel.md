# InputLabel

> **English:** [docs/components/InputLabel.md](../../components/InputLabel.md) | **Versión española:** [docs/es/components/InputLabel.md](../es/components/InputLabel.md)

## Overview

Un sottile wrapper attorno all'elemento HTML `<label>`. Applica tipografia e visibilità guidate dai design token e collega l'input associato tramite `htmlFor`. La visualizzazione predefinita (`block` o `none`) è controllata dalla variabile CSS `--label-display`, rendendo semplice nascondere le etichette globalmente nei layout compatti senza rimuoverle dal DOM (l'accessibilità viene preservata).

## Import

```js
import { InputLabel } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `label` | `string` | — | Yes | Contenuto testuale dell'etichetta. |
| `labelId` | `string` | — | Yes | Valore dell'attributo `htmlFor`; deve corrispondere all'`id` dell'input associato. |
| `labelStyle` | `string` | `''` | No | Classi Tailwind aggiuntive accodate alla stringa di classi predefinita. |
| `overrideStyle` | `string` | — | No | Sostituisce l'intera stringa di classi predefinita quando specificata. |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--label-display` | `block` | Controlla la visibilità dell'etichetta tramite `.show-label { display: var(--label-display) }` |
| `--text-input-label` | `14px` | Dimensione del font (`text-input-label`) |
| `--color-color-label` | `#111827` | Colore del testo (`text-color-label`) |

> Impostare `--label-display: none` su uno scope padre per nascondere tutte le etichette mantenendole nel DOM per i lettori di schermo.

## Usage

```jsx
import { Input, InputLabel } from 'thecore-auth';
import { useState } from 'react';

function SearchField() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col gap-1 w-full max-w-sm">
      <InputLabel
        label="Search"
        labelId="global-search"
        labelStyle="text-slate-600"
      />
      <Input
        inputType="search"
        inputId="global-search"
        inputName="q"
        inputPlaceholder="Type to search…"
        inputValue={query}
        inputChange={(e) => setQuery(e.target.value)}
        inputRequired={false}
      />
    </div>
  );
}
```

## Notes

- Associare sempre `labelId` con l'`id` dell'input corrispondente per soddisfare i requisiti di accessibilità.
- `overrideStyle` rimuove la classe `.show-label`, il che significa che `--label-display` non controlla più la visibilità — usare `labelStyle` per estendere invece.
- La classe di utilità `.show-label` è definita in `src/css/index.css` e legge `--label-display` dal tema.
