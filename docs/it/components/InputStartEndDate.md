# InputStartEndDate

> **English:** [docs/components/InputStartEndDate.md](../../components/InputStartEndDate.md) | **Versión española:** [docs/es/components/InputStartEndDate.md](../es/components/InputStartEndDate.md)

## Overview

Un selettore di intervallo di date che compone due componenti `InputDate` affiancati. Il campo della data finale può essere nascosto con `endDateShow={false}`, e una stringa di errore di validazione (`dateError`) viene renderizzata sotto l'input della data finale. Entrambi i campi condividono lo stesso handler `onChange`, e i prop `disabled`, `required` e `labelStyle`, mentre ciascun campo può ricevere i propri override di stile per container e input.

## Import

```js
import { InputStartEndDate } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `startId` | `string` | — | Yes | `id` dell'input della data iniziale. |
| `endId` | `string` | — | No | `id` dell'input della data finale. |
| `startName` | `string` | — | No | `name` dell'input della data iniziale per la sottomissione del form. |
| `endName` | `string` | — | No | `name` dell'input della data finale per la sottomissione del form. |
| `startValue` | `string` | — | No | Valore controllato della data iniziale (`YYYY-MM-DD`). |
| `endValue` | `string` | — | No | Valore controllato della data finale (`YYYY-MM-DD`). |
| `onChange` | `(e: ChangeEvent) => void` | — | Yes | Handler `onChange` condiviso per entrambi i campi. |
| `disabled` | `boolean` | — | No | Disabilita entrambi i campi. |
| `required` | `boolean` | — | No | Rende entrambi i campi obbligatori. |
| `dateError` | `string` | — | No | Messaggio di validazione mostrato sotto il campo della data finale in rosso. |
| `startTitle` | `string` | — | No | Testo dell'etichetta per il campo della data iniziale. |
| `endTitle` | `string` | — | No | Testo dell'etichetta per il campo della data finale. |
| `containerStyle` | `string` | `'flex gap-4 mx-auto w-full mb-4'` | No | Stringa di classi per il wrapper esterno. |
| `startContainerStyle` | `string` | — | No | `containerStyle` inoltrato all'`InputDate` iniziale. |
| `endContainerStyle` | `string` | — | No | `containerStyle` inoltrato all'`InputDate` finale. |
| `startStyle` | `string` | — | No | `inputStyle` inoltrato all'`InputDate` iniziale. |
| `endStyle` | `string` | — | No | `inputStyle` inoltrato all'`InputDate` finale. |
| `labelStyle` | `string` | — | No | `labelStyle` inoltrato a entrambi i componenti `InputDate`. |
| `endDateShow` | `boolean` | `true` | No | Impostare a `false` per renderizzare solo il campo della data iniziale. |
| `children` | `ReactNode` | — | No | Contenuto aggiuntivo aggiunto dopo entrambi i campi data all'interno del wrapper. |

## CSS Variables

`InputStartEndDate` delega tutto il rendering a `InputDate` — vedere [InputDate CSS Variables](./InputDate.md#css-variables) per l'elenco completo.

## Usage

```jsx
import { useState } from 'react';
import { InputStartEndDate } from 'thecore-auth';

function VacationPicker() {
  const [dates, setDates] = useState({ start: '', end: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates((prev) => {
      const next = { ...prev, [name]: value };

      // Validate: end must not precede start
      if (next.start && next.end && next.end < next.start) {
        setError('End date must be after start date.');
      } else {
        setError('');
      }

      return next;
    });
  };

  return (
    <InputStartEndDate
      startId="vacation-start"
      endId="vacation-end"
      startName="start"
      endName="end"
      startTitle="From"
      endTitle="To"
      startValue={dates.start}
      endValue={dates.end}
      onChange={handleChange}
      dateError={error}
      required
    />
  );
}
```

## Notes

- `onChange` riceve un `ChangeEvent` DOM standard; usare `e.target.name` per distinguere tra i due campi (abbinare con `startName` / `endName`).
- `dateError` viene renderizzato all'interno dello slot `children` dell'`InputDate` della data finale come `<p className="text-red-500 text-[13px] mt-1">`. Fornire `null` o omettere il prop per sopprimerlo.
- Impostare `endDateShow={false}` quando si ha bisogno di un selettore a data singola ma si vuole mantenere le stesse dimensioni del campo e il layout della variante a intervallo.
- `children` viene aggiunto dopo entrambi i campi data nel wrapper esterno — usarlo per azioni (es. un pulsante "Cancella") o messaggi supplementari.
- Entrambe le istanze di `InputDate` condividono lo stesso `onChange`, `disabled`, `required` e `labelStyle` — non possono essere configurati in modo indipendente per questi prop.
