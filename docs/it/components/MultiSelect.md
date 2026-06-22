# MultiSelect

> **English:** [docs/components/MultiSelect.md](../../components/MultiSelect.md) | **Versión española:** [docs/es/components/MultiSelect.md](../es/components/MultiSelect.md)

## Overview

Un dropdown con ricerca e selezione multipla. Gli elementi selezionati appaiono come tag rimovibili all'interno del trigger. Cliccando il trigger si apre un dropdown con un input di ricerca e un elenco scorrevole. Cliccando un elemento si attiva/disattiva la sua selezione; cliccando fuori si chiude il dropdown (`useClickOutside`).

Supporta due modalità di selezione:
- **Modalità diretta** — `updateFilter` riceve direttamente il nuovo `Array` di elementi selezionati.
- **Modalità filter-key** — passare una stringa `type` e `updateFilter` riceve una funzione state-updater che aggiorna un oggetto filtro con chiave.

## Import

```js
import { MultiSelect } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `object[]` | — | Yes | Elenco completo delle opzioni da visualizzare. Ogni elemento deve avere una proprietà `idKey` univoca. |
| `value` | `object[]` | `[]` | No | Elementi attualmente selezionati. Deve essere un sottoinsieme di `items`. |
| `label` | `string` | — | No | Etichetta intestazione renderizzata sopra il trigger. |
| `placeholder` | `string` | — | No | Testo segnaposto mostrato all'interno del trigger quando nulla è selezionato. |
| `displayKey` | `string \| string[]` | — | No | Chiave/i di ogni elemento usata per costruire la stringa di visualizzazione. Accetta una singola chiave o un array di chiavi unite da uno spazio. Torna a `code`, `name`, `label` o `idKey` se omesso. |
| `valueKey` | `string` | — | No | Chiave usata per renderizzare l'etichetta del tag (sovrascrive `displayKey` all'interno dei tag). |
| `idKey` | `string` | `'id'` | No | Chiave usata come identificatore univoco per ogni elemento. |
| `type` | `string` | — | No | Quando fornito, attiva la modalità filter-key: `updateFilter` viene chiamato con uno state-updater che aggiorna `prev[type]`. |
| `updateFilter` | `Function` | — | Yes | Handler del cambio di selezione. In modalità diretta riceve il nuovo `object[]`; in modalità filter-key riceve uno state-updater `(prev) => next`. |
| `searchPlaceholder` | `string` | `'Cerca...'` | No | Segnaposto per l'input di ricerca nel dropdown. |
| `noResultsText` | `string` | `'Nessun risultato'` | No | Testo mostrato quando la query di ricerca non corrisponde ad alcun elemento. |
| `classNames` | `object` | `{}` | No | Override parziali dei nomi di classe uniti ai valori predefiniti. Vedere **Class Name Keys** di seguito. |

### Class Name Keys

Tutte le chiavi sono opzionali. Le chiavi non specificate tornano ai valori predefiniti elencati nel sorgente.

| Key | Targets |
|---|---|
| `container` | `<div>` più esterno |
| `label` | `<div>` dell'etichetta intestazione |
| `trigger` | `<div>` trigger cliccabile |
| `placeholder` | `<span>` del segnaposto |
| `tag` | Ogni `<span>` del tag dell'elemento selezionato |
| `tagButton` | Pulsante di rimozione all'interno di ogni tag |
| `chevron` | Icona chevron |
| `dropdown` | `<div>` del dropdown |
| `searchInput` | `<input>` di ricerca |
| `list` | `<ul>` |
| `listItem` | Ogni `<li>` |
| `listItemSelected` | Aggiunto al `<li>` quando l'elemento è selezionato |
| `noResults` | `<li>` "Nessun risultato" |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Sfondo del dropdown (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Bordo del dropdown (`border-input-border`) |
| `--text-input-label` | `14px` | Dimensione del font dell'etichetta (`text-input-label`) |
| `--color-color-label` | `#111827` | Colore del testo dell'etichetta (`text-color-label`) |

## Usage

```jsx
import { useState } from 'react';
import { MultiSelect } from 'thecore-auth';

const TAGS = [
  { id: 1, name: 'React' },
  { id: 2, name: 'TypeScript' },
  { id: 3, name: 'Tailwind' },
  { id: 4, name: 'Vite' },
];

function TechStackPicker() {
  const [selected, setSelected] = useState([]);

  return (
    <div className="w-80">
      <MultiSelect
        label="Tech stack"
        items={TAGS}
        value={selected}
        placeholder="Select technologies…"
        displayKey="name"
        idKey="id"
        updateFilter={setSelected}
        searchPlaceholder="Search…"
        noResultsText="No technologies found"
      />
      <p className="text-xs text-slate-400">
        Selected: {selected.map((t) => t.name).join(', ') || 'none'}
      </p>
    </div>
  );
}
```

### Filter-key mode

```jsx
// Manage a composite filter object with multiple MultiSelect instances
const [filters, setFilters] = useState({ tags: [], categories: [] });

<MultiSelect
  items={TAGS}
  value={filters.tags}
  type="tags"
  updateFilter={setFilters}
  displayKey="name"
  idKey="id"
  placeholder="Filter by tag…"
/>
```

## Notes

- L'input di ricerca viene messo a fuoco automaticamente all'apertura del dropdown.
- Cliccando fuori dal componente si chiude il dropdown tramite `useClickOutside` da `src/hooks/ui/useClickOutside`.
- L'icona chevron ruota di 180° quando il dropdown è aperto (classe Tailwind `rotate-180`).
- `EMPTY_ARRAY` è una costante a livello di modulo usata come valore predefinito per `value` per preservare la stabilità referenziale ed evitare re-render non necessari.
- `displayKey` come array unisce più campi (`['firstName', 'lastName']` → `"John Doe"`); i valori di campo falsy vengono filtrati prima dell'unione.
- I valori predefiniti di `searchPlaceholder` e `noResultsText` sono in italiano — sovrascriverli per altre lingue.
