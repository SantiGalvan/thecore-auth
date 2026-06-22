# MultiSelect

> **Versione italiana:** [docs/it/components/MultiSelect.md](../it/components/MultiSelect.md) | **Versión española:** [docs/es/components/MultiSelect.md](../es/components/MultiSelect.md)

## Overview

A searchable, multi-value dropdown. Selected items appear as removable tags inside the trigger. Clicking the trigger opens a dropdown with a search input and a scrollable list. Clicking an item toggles its selection; clicking outside closes the dropdown (`useClickOutside`).

Supports two selection modes:
- **Direct mode** — `updateFilter` receives the new `Array` of selected items directly.
- **Filter-key mode** — pass a `type` string and `updateFilter` receives a state-updater function that patches a keyed filter object.

## Import

```js
import { MultiSelect } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `items` | `object[]` | — | Yes | Full list of options to display. Each item must have a unique `idKey` property. |
| `value` | `object[]` | `[]` | No | Currently selected items. Must be a subset of `items`. |
| `label` | `string` | — | No | Header label rendered above the trigger. |
| `placeholder` | `string` | — | No | Placeholder text shown inside the trigger when nothing is selected. |
| `displayKey` | `string \| string[]` | — | No | Key(s) of each item used to build the display string. Accepts a single key or an array of keys joined by a space. Falls back to `code`, `name`, `label`, or `idKey` when omitted. |
| `valueKey` | `string` | — | No | Key used to render the tag label (overrides `displayKey` inside tags). |
| `idKey` | `string` | `'id'` | No | Key used as the unique identifier for each item. |
| `type` | `string` | — | No | When provided, activates filter-key mode: `updateFilter` is called with a state-updater that patches `prev[type]`. |
| `updateFilter` | `Function` | — | Yes | Selection change handler. In direct mode receives the new `object[]`; in filter-key mode receives a state-updater `(prev) => next`. |
| `searchPlaceholder` | `string` | `'Cerca...'` | No | Placeholder for the in-dropdown search input. |
| `noResultsText` | `string` | `'Nessun risultato'` | No | Text shown when the search query matches no items. |
| `classNames` | `object` | `{}` | No | Partial class name overrides merged with the defaults. See **Class Name Keys** below. |

### Class Name Keys

All keys are optional. Unspecified keys fall back to the defaults listed in the source.

| Key | Targets |
|---|---|
| `container` | Outermost `<div>` |
| `label` | Header label `<div>` |
| `trigger` | Clickable trigger `<div>` |
| `placeholder` | Placeholder `<span>` |
| `tag` | Each selected-item tag `<span>` |
| `tagButton` | Remove button inside each tag |
| `chevron` | Chevron icon |
| `dropdown` | Dropdown `<div>` |
| `searchInput` | Search `<input>` |
| `list` | `<ul>` |
| `listItem` | Each `<li>` |
| `listItemSelected` | Added to `<li>` when the item is selected |
| `noResults` | "No results" `<li>` |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Dropdown background (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Dropdown border (`border-input-border`) |
| `--text-input-label` | `14px` | Label font size (`text-input-label`) |
| `--color-color-label` | `#111827` | Label text color (`text-color-label`) |

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

- The search input is auto-focused when the dropdown opens.
- Clicking outside the component closes the dropdown via `useClickOutside` from `src/hooks/ui/useClickOutside`.
- The chevron icon rotates 180° when the dropdown is open (`rotate-180` Tailwind class).
- `EMPTY_ARRAY` is a module-level constant used as the default for `value` to preserve referential stability and avoid unnecessary re-renders.
- `displayKey` as an array merges multiple fields (`['firstName', 'lastName']` → `"John Doe"`); falsy field values are filtered out before joining.
- Default `searchPlaceholder` and `noResultsText` are in Italian — override them for other locales.
