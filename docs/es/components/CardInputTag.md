# CardInputTag

> [English](../../../docs/components/CardInputTag.md) | [Versione italiana](../../it/components/CardInputTag.md)

## Descripción general

`CardInputTag` es un componente card SPOT RFID que muestra los valores TID y EPC de un único tag RFID. Renderiza dos campos `InputGroup` de solo lectura y un botón de escritura opcional. La card se anima desde abajo mediante una transición CSS controlada por `showTag`.

El botón de escritura se deshabilita automáticamente cuando tanto `valueTID` como `valueEPC` están vacíos, evitando escrituras antes de que el lector haya devuelto datos.

## Import

```jsx
import { CardInputTag } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Default | Requerido | Descripción |
|---|---|---|---|---|
| `title` | `string` | — | ✅ | Texto del título de la card (ej. `'TAG A'`, `'TAG B'`). También se usa en el placeholder. El valor `'TAG B'` aplica un `delay-200` adicional a la animación de entrada. |
| `showTag` | `boolean` | — | ✅ | Controla la animación de entrada — `true` hace visible la card, `false` la oculta con desplazamiento hacia abajo. |
| `value` | `object` | `undefined` | — | Objeto con los datos del tag. Estructura: `{ valueTID: string, valueEPC: string }`. |
| `tag` | `string` | `undefined` | — | Sufijo añadido a los atributos `id` de los inputs (ej. `'a'` → ids se convierten en `tid-a`, `epc-a`). Omitir cuando se renderiza una sola card. |
| `showButton` | `boolean` | — | ✅ | Cuando es `true`, el botón de escritura está **oculto**. Cuando es `false`, el botón es visible. |
| `handleClick` | `function` | `undefined` | — | Callback invocada al hacer clic en el botón de escritura. |

## Variables CSS

| Variable | Default | Descripción |
|---|---|---|
| `--color-write-button` | `#0284C7` | Color de fondo del botón de escritura |

## Uso

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
      <button onClick={() => setVisible(true)}>Iniciar lectura</button>

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

## Notas

- El botón de escritura está deshabilitado (no oculto) cuando tanto `value?.valueTID` como `value?.valueEPC` son falsy. Se habilita en cuanto se llena uno de los campos.
- `showButton={true}` **oculta** completamente el botón (la prop está invertida — controla si ocultarlo, no si mostrarlo).
- La comprobación del título `'TAG B'` es un delay hardcoded para diseños de dos cards escalonadas; para otros títulos no se aplica ningún delay.
- `tag` sirve para hacer únicos los atributos `id` de los inputs cuando varias cards aparecen en la misma página. Omitirlo solo cuando se renderiza una sola card.
