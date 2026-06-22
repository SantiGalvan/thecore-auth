# SwitchRadio

> **English:** [docs/components/SwitchRadio.md](../../components/SwitchRadio.md) | **Versión española:** [docs/es/components/SwitchRadio.md](../es/components/SwitchRadio.md)

## Overview

Uno switch toggle renderizzato come `<button>` accessibile. Supporta sia la modalità **controllata** che quella **non controllata**:

- **Controllata** — passare un prop `value` e gestire lo stato esternamente.
- **Non controllata** — omettere `value`; il componente mantiene lo stato internamente, inizializzato da `defaultValue`.

In entrambe le modalità il callback `onChange` viene eseguito ad ogni toggle.

## Import

```js
import { SwitchRadio } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `value` | `boolean` | — | No | Stato on/off controllato. Quando fornito, il componente è in modalità controllata. |
| `defaultValue` | `boolean` | `false` | No | Stato iniziale per la modalità non controllata. Viene reinizializzato ogni volta che cambia (solo in modalità non controllata). |
| `onChange` | `(next: boolean) => void` | — | No | Chiamato con il nuovo valore booleano dopo ogni toggle, in entrambe le modalità controllata e non controllata. |

## CSS Variables

`SwitchRadio` non utilizza proprietà CSS personalizzate da `src/css/index.css`. I colori e le dimensioni sono classi Tailwind codificate (`bg-blue-500`, `bg-gray-300`, `w-14`, `h-6`).

## Usage

### Controlled

```jsx
import { useState } from 'react';
import { SwitchRadio } from 'thecore-auth';

function NotificationSettings() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Email notifications</span>
      <SwitchRadio
        value={enabled}
        onChange={setEnabled}
      />
      <span className="text-sm text-slate-500">{enabled ? 'On' : 'Off'}</span>
    </div>
  );
}
```

### Uncontrolled

```jsx
import { SwitchRadio } from 'thecore-auth';

function FeatureFlag() {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium">Beta features</span>
      <SwitchRadio
        defaultValue={true}
        onChange={(next) => console.log('beta:', next)}
      />
    </div>
  );
}
```

## Notes

- Il pulsante viene renderizzato con `aria-pressed` che riflette lo stato on/off corrente, garantendo la compatibilità con i lettori di schermo.
- In modalità non controllata, se il padre modifica `defaultValue` lo stato interno si risincronizza (tramite `useEffect`). Questo è intenzionale per i casi in cui il valore predefinito viene caricato in modo asincrono (es. da un'API).
- In modalità controllata il padre è l'unico responsabile dell'aggiornamento di `value`; il componente stesso non modifica mai il prop.
- Il componente non espone una coppia `name`/`value` compatibile con la serializzazione nativa dei form — collegare `onChange` a un input nascosto se è richiesta la sottomissione del form.
