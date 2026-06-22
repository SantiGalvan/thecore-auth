# InputDate

> **English:** [docs/components/InputDate.md](../../components/InputDate.md) | **Versión española:** [docs/es/components/InputDate.md](../es/components/InputDate.md)

## Overview

Un `<input type="date">` con etichetta racchiuso in un contenitore flex column. Applica i design token del progetto guidati da variabili CSS (sfondo, bordo, focus ring, padding, raggio) e supporta uno stato disabilitato con stili dedicati di opacità e cursore. Uno slot opzionale `children` permette di aggiungere messaggi di validazione o testo di aiuto sotto l'input.

## Import

```js
import { InputDate } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `id` | `string` | — | Yes | Attributo `id` dell'input; usato anche come `htmlFor` dell'etichetta. |
| `name` | `string` | — | No | Attributo `name` per la sottomissione del form. |
| `value` | `string` | `''` | No | Valore controllato nel formato `YYYY-MM-DD`. |
| `onChange` | `(e: ChangeEvent) => void` | — | Yes | Handler `onChange`. |
| `disabled` | `boolean` | — | No | Disabilita l'input; applica automaticamente uno stile attenuato. |
| `required` | `boolean` | — | No | Corrisponde all'attributo nativo `required`. |
| `title` | `string` | — | No | Testo dell'etichetta renderizzato sopra l'input. |
| `containerStyle` | `string` | `'flex flex-col gap-1 mx-auto w-full'` | No | Stringa di classi per il `<div>` wrapper. |
| `labelStyle` | `string` | Vedi sotto | No | Stringa di classi per il `<label>`. |
| `inputStyle` | `string` | Vedi sotto | No | Stringa di classi per l'`<input>`. |
| `children` | `ReactNode` | — | No | Contenuto renderizzato sotto l'input (es. messaggi di errore di validazione). |

**`labelStyle` predefinito:** `mb-1 text-input-label font-medium text-color-label`

**`inputStyle` predefinito:** `bg-input-bg border border-input-border rounded-lg text-input-text placeholder:text-input-placeholder rounded-input focus:ring focus:ring-primary focus:border-primary focus:outline-none focus:shadow-[var(--shadow-primary-input)] block w-full h-[43px] p-input disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60`

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Sfondo dell'input (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Colore del bordo (`border-input-border`) |
| `--color-input-text` | `#111827` | Colore del testo (`text-input-text`) |
| `--text-input-label` | `14px` | Dimensione del font dell'etichetta (`text-input-label`) |
| `--color-color-label` | `#111827` | Colore del testo dell'etichetta (`text-color-label`) |
| `--input-radius` | `8px` | Raggio del bordo (`rounded-input`) |
| `--padding-input` | `10px` | Padding interno (`p-input`) |
| `--color-primary` | `#f56907` | Colore del focus ring e del bordo |
| `--shadow-primary-input` | `inset 0 1px 1px …` | Box-shadow al focus |

## Usage

```jsx
import { useState } from 'react';
import { InputDate } from 'thecore-auth';

function BookingForm() {
  const [checkIn, setCheckIn] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCheckIn(e.target.value);
    setError('');
  };

  const validate = () => {
    if (!checkIn) setError('Check-in date is required.');
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); validate(); }}>
      <InputDate
        id="check-in"
        name="checkIn"
        title="Check-in date"
        value={checkIn}
        onChange={handleChange}
        required
      >
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </InputDate>

      <button type="submit" className="mt-4 px-4 py-2 bg-primary text-white rounded">
        Book
      </button>
    </form>
  );
}
```

## Notes

- `value` ha come valore predefinito una stringa vuota `""` quando viene passato `undefined`, prevenendo l'avviso React di passaggio da componente non controllato a controllato.
- Lo stato disabilitato applica `bg-gray-100`, `text-gray-400`, `cursor-not-allowed` e `opacity-60` attraverso l'`inputStyle` predefinito — non è necessario alcun prop aggiuntivo.
- Sovrascrivere `containerStyle`, `labelStyle` o `inputStyle` singolarmente; tutte e tre le stringhe predefinite rimangono disponibili come riferimento di partenza.
- `children` viene renderizzato all'interno dello slot `children` dell'`InputDate` della data finale da `InputStartEndDate` per visualizzare gli errori di validazione dell'intervallo di date — vedere il riferimento di `InputStartEndDate` per il pattern composto.
