# CardInputRange

> [English](../../../docs/components/CardInputRange.md) | [Versión española](../../es/components/CardInputRange.md)

## Panoramica

`CardInputRange` è un componente card SPOT RFID per la configurazione della potenza di trasmissione del lettore RFID. Renderizza uno slider con un tooltip flottante che segue il valore corrente e un pulsante salva che conferma il valore selezionato.

La card si anima dal basso in base alla prop `show`. La posizione del tooltip è calcolata come percentuale del range in modo che si allinei sempre al cursore dello slider.

## Import

```jsx
import { CardInputRange } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `minReadingPower` | `number` | — | ✅ | Valore minimo dello slider di potenza |
| `maxReadingPower` | `number` | — | ✅ | Valore massimo dello slider di potenza |
| `stepRangePower` | `number` | — | ✅ | Incremento del passo dello slider |
| `rangeValue` | `number` | — | ✅ | Valore controllato corrente dello slider |
| `setRangeValue` | `function` | — | ✅ | Setter di stato chiamato con il nuovo valore numerico quando lo slider cambia |
| `show` | `boolean` | — | ✅ | Controlla l'animazione di ingresso — `true` rende la card visibile, `false` la nasconde |
| `handleClick` | `function` | — | ✅ | Callback invocata con il `rangeValue` corrente al click del pulsante salva |

## Variabili CSS

| Variabile | Default | Descrizione |
|---|---|---|
| `--color-primary-accent` | `#f56907` | Colore accent usato per il cursore e il tracciato dello slider |
| `--color-save-button` | `#16A34A` | Colore di sfondo del pulsante salva |

## Utilizzo

```jsx
import { useState } from 'react';
import { CardInputRange } from 'thecore-auth';

function PowerConfig() {
  const [power, setPower] = useState(20);
  const [visible, setVisible] = useState(false);

  const handleSave = (value) => {
    console.log('Saving power level:', value);
    // send to RFID reader API
  };

  return (
    <div>
      <button onClick={() => setVisible(true)}>Configura potenza</button>

      <CardInputRange
        minReadingPower={0}
        maxReadingPower={30}
        stepRangePower={1}
        rangeValue={power}
        setRangeValue={setPower}
        show={visible}
        handleClick={handleSave}
      />
    </div>
  );
}
```

## Note

- `setRangeValue` viene chiamato con un `Number` (tramite `Number(e.target.value)`) — lo stato padre deve accettare un numero, non una stringa.
- `handleClick` riceve il `rangeValue` corrente come primo argomento; non riceve l'evento nativo.
- La posizione del tooltip flottante può scartare leggermente agli estremi dello slider a causa della larghezza del cursore del browser — è una limitazione cosmetica nota del posizionamento percentuale.
- Lo slider usa la classe Tailwind `accent-primary-accent` che mappa su `--color-primary-accent`; sovrascrivere questa variabile cambia il colore del cursore e del tracciato riempito.
