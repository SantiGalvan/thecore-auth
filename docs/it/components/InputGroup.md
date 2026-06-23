# InputGroup

> [English](../../../docs/components/InputGroup.md) | [Versión española](../../es/components/InputGroup.md)

## Panoramica

`InputGroup` è un componente SPOT RFID che abbina un'etichetta a un campo di testo. Opera in due modalità di layout controllate da `isTag`:

- **Modalità tag** (`isTag={true}`) — layout orizzontale compatto per campi RFID in sola lettura (TID, EPC). L'input è disabilitato.
- **Modalità campo** (`isTag={false}`, default) — layout standard con rapporto etichetta-input `1/3 + 2/3` e margine generoso, per campi di configurazione editabili.

Quando è fornita una stringa `error`, il bordo dell'input e l'anello di focus diventano rossi e il messaggio di errore appare sotto il campo.

## Import

```jsx
import { InputGroup } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `label` | `string` | — | ✅ | Testo renderizzato nell'etichetta |
| `id` | `string` | — | ✅ | HTML `id` condiviso tra etichetta (`htmlFor`) e input |
| `value` | `string` | `''` | — | Valore controllato del campo di testo |
| `placeholder` | `string` | `undefined` | — | Testo placeholder mostrato quando il campo è vuoto |
| `isTag` | `boolean` | `false` | — | Attiva la modalità tag (sola lettura, compatta) quando `true` |
| `onChange` | `function` | `undefined` | — | Handler per il cambio valore. Non viene chiamato in modalità tag (input disabilitato). |
| `error` | `string \| null` | `null` | — | Messaggio di errore di validazione. Attiva il bordo rosso e mostra il messaggio sotto l'input. |

## Variabili CSS

| Variabile | Default | Descrizione |
|---|---|---|
| `--color-spot-rfid-input-border` | `#f56907` | Colore del bordo applicato all'input in focus |
| `--shadow-spot-rfid-input` | `0 0 0 4px var(--color-focus-ring)` | Box shadow in focus |
| `--color-focus-ring` | `#f5690780` | Colore semi-trasparente dell'anello di focus |
| `--color-focus-error` | `rgba(255,0,0,0.5)` | Rosso semi-trasparente per l'anello di focus in errore |
| `--shadow-spot-rfid-error` | `0 0 0 4px var(--color-focus-error)` | Box shadow quando `error` è impostato |

## Utilizzo

```jsx
import { useState } from 'react';
import { InputGroup } from 'thecore-auth';

function ConfigPanel() {
  const [address, setAddress] = useState('');
  const [addressError, setAddressError] = useState(null);

  const handleChange = (e) => {
    setAddress(e.target.value);
    setAddressError(e.target.value ? null : 'Address is required');
  };

  return (
    <div>
      {/* Editable field */}
      <InputGroup
        label="Indirizzo IP"
        id="ip-address"
        value={address}
        placeholder="es. 192.168.1.1"
        onChange={handleChange}
        error={addressError}
      />

      {/* Read-only tag field (tag mode) */}
      <InputGroup
        label="TID"
        id="tid-a"
        isTag={true}
        value="E2003412012345678901234A"
        placeholder="Leggi TAG A"
      />
    </div>
  );
}
```

## Note

- In modalità tag (`isTag={true}`), il componente `Input` sottostante riceve `disabled={true}`, quindi `onChange` non viene mai chiamato anche se fornito.
- La prop `error` influenza solo lo stile visivo e il testo del messaggio — la logica di validazione deve essere implementata dal componente padre.
- `InputGroup` compone internamente i componenti `Input` e `InputLabel` della libreria. Le loro variabili CSS individuali (sfondo, colore testo, border radius, padding) si applicano anche qui.
