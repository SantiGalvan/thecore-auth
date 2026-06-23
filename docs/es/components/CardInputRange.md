# CardInputRange

> [English](../../../docs/components/CardInputRange.md) | [Versione italiana](../../it/components/CardInputRange.md)

## Descripción general

`CardInputRange` es un componente card SPOT RFID para configurar la potencia de transmisión del lector RFID. Renderiza un slider estilizado con un tooltip flotante que sigue el valor actual y un botón guardar que confirma el valor seleccionado.

La card se anima desde abajo en función de la prop `show`. La posición del tooltip se calcula como porcentaje del rango para que siempre se alinee con el cursor del slider.

## Import

```jsx
import { CardInputRange } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Default | Requerido | Descripción |
|---|---|---|---|---|
| `minReadingPower` | `number` | — | ✅ | Valor mínimo del slider de potencia |
| `maxReadingPower` | `number` | — | ✅ | Valor máximo del slider de potencia |
| `stepRangePower` | `number` | — | ✅ | Incremento del paso del slider |
| `rangeValue` | `number` | — | ✅ | Valor controlado actual del slider |
| `setRangeValue` | `function` | — | ✅ | Setter de estado llamado con el nuevo valor numérico cuando cambia el slider |
| `show` | `boolean` | — | ✅ | Controla la animación de entrada — `true` hace visible la card, `false` la oculta |
| `handleClick` | `function` | — | ✅ | Callback invocada con el `rangeValue` actual al hacer clic en el botón guardar |

## Variables CSS

| Variable | Default | Descripción |
|---|---|---|
| `--color-primary-accent` | `#f56907` | Color accent usado para el cursor y el track del slider |
| `--color-save-button` | `#16A34A` | Color de fondo del botón guardar |

## Uso

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
      <button onClick={() => setVisible(true)}>Configurar potencia</button>

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

## Notas

- `setRangeValue` se llama con un `Number` (vía `Number(e.target.value)`) — el estado padre debe aceptar un número, no una cadena.
- `handleClick` recibe el `rangeValue` actual como primer argumento; no recibe el evento nativo.
- La posición del tooltip flotante puede desviarse ligeramente en los extremos del slider debido al ancho del cursor del navegador — es una limitación cosmética conocida del posicionamiento porcentual.
- El slider usa la clase Tailwind `accent-primary-accent` que mapea a `--color-primary-accent`; sobrescribir esta variable cambia el color del cursor y el track relleno.
