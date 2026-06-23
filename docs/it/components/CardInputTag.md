# CardInputTag

> [English](../../../docs/components/CardInputTag.md) | [Versión española](../../es/components/CardInputTag.md)

## Panoramica

`CardInputTag` è un componente card SPOT RFID che mostra i valori TID ed EPC di un singolo tag RFID. Renderizza due campi `InputGroup` in sola lettura e un pulsante di scrittura opzionale. La card si anima dal basso grazie a una transizione CSS controllata da `showTag`.

Il pulsante di scrittura viene disabilitato automaticamente quando sia `valueTID` che `valueEPC` sono vuoti, impedendo scritture prima che il lettore abbia restituito dati.

## Import

```jsx
import { CardInputTag } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `title` | `string` | — | ✅ | Testo del titolo della card (es. `'TAG A'`, `'TAG B'`). Usato anche nel testo del placeholder. Il valore `'TAG B'` applica un `delay-200` aggiuntivo all'animazione di ingresso. |
| `showTag` | `boolean` | — | ✅ | Controlla l'animazione di ingresso — `true` rende la card visibile, `false` la nasconde con offset verso il basso. |
| `value` | `object` | `undefined` | — | Oggetto con i dati del tag. Struttura: `{ valueTID: string, valueEPC: string }`. |
| `tag` | `string` | `undefined` | — | Suffisso aggiunto agli attributi `id` degli input (es. `'a'` → id diventano `tid-a`, `epc-a`). Omettere quando si renderizza una sola card. |
| `showButton` | `boolean` | — | ✅ | Quando `true`, il pulsante di scrittura è **nascosto**. Quando `false`, il pulsante è visibile. |
| `handleClick` | `function` | `undefined` | — | Callback invocata al click del pulsante di scrittura. |

## Variabili CSS

| Variabile | Default | Descrizione |
|---|---|---|
| `--color-write-button` | `#0284C7` | Colore di sfondo del pulsante di scrittura |

## Utilizzo

```jsx
import { useState } from 'react';
import { CardInputTag } from 'thecore-auth';

function TagPanel() {
  const [visible, setVisible] = useState(false);
  const [tagData, setTagData] = useState({ valueTID: '', valueEPC: '' });

  const handleWrite = () => {
    console.log('Writing tag:', tagData);
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Inizia lettura</button>

      <CardInputTag
        title="TAG A"
        showTag={visible}
        value={tagData}
        tag="a"
        showButton={false}
        handleClick={handleWrite}
      />

      {/* Second card with staggered animation delay */}
      <CardInputTag
        title="TAG B"
        showTag={visible}
        value={{ valueTID: 'E2003412AABBCCDD', valueEPC: '300833B2DDD9014000000000' }}
        tag="b"
        showButton={true}
        handleClick={() => {}}
      />
    </div>
  );
}
```

## Note

- Il pulsante di scrittura è disabilitato (non nascosto) quando sia `value?.valueTID` che `value?.valueEPC` sono falsy. Si abilita appena uno dei due campi è popolato.
- `showButton={true}` **nasconde** completamente il pulsante (la prop è invertita — controlla se nasconderlo, non se mostrarlo).
- Il controllo sul titolo `'TAG B'` è un delay hardcoded per layout a due card sfasate; per altri titoli non viene applicato alcun delay.
- `tag` serve a rendere univoci gli attributi `id` degli input quando più card appaiono sulla stessa pagina. Ometterlo solo con una sola card renderizzata.
