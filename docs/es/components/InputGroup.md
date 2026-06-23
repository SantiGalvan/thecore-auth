# InputGroup

> [English](../../../docs/components/InputGroup.md) | [Versione italiana](../../it/components/InputGroup.md)

## Descripción general

`InputGroup` es un componente SPOT RFID compuesto que combina una etiqueta con un campo de texto. Opera en dos modos de diseño controlados por `isTag`:

- **Modo tag** (`isTag={true}`) — diseño horizontal compacto para campos RFID de solo lectura (TID, EPC). El input está deshabilitado.
- **Modo campo** (`isTag={false}`, por defecto) — diseño estándar con proporción etiqueta-input `1/3 + 2/3` y margen generoso, para campos de configuración editables.

Cuando se proporciona una cadena `error`, el borde del input y el anillo de foco se vuelven rojos y el mensaje de error aparece debajo del campo.

## Import

```jsx
import { InputGroup } from 'thecore-auth';
```

## Props

| Nombre | Tipo | Default | Requerido | Descripción |
|---|---|---|---|---|
| `label` | `string` | — | ✅ | Texto renderizado en la etiqueta |
| `id` | `string` | — | ✅ | HTML `id` compartido entre la etiqueta (`htmlFor`) y el input |
| `value` | `string` | `''` | — | Valor controlado del campo de texto |
| `placeholder` | `string` | `undefined` | — | Texto placeholder mostrado cuando el campo está vacío |
| `isTag` | `boolean` | `false` | — | Activa el modo tag (solo lectura, compacto) cuando es `true` |
| `onChange` | `function` | `undefined` | — | Handler para el cambio de valor. No se llama en modo tag (input deshabilitado). |
| `error` | `string \| null` | `null` | — | Mensaje de error de validación. Activa el borde rojo y muestra el mensaje debajo del input. |

## Variables CSS

| Variable | Default | Descripción |
|---|---|---|
| `--color-spot-rfid-input-border` | `#f56907` | Color del borde aplicado al input en foco |
| `--shadow-spot-rfid-input` | `0 0 0 4px var(--color-focus-ring)` | Box shadow en foco |
| `--color-focus-ring` | `#f5690780` | Color semi-transparente del anillo de foco |
| `--color-focus-error` | `rgba(255,0,0,0.5)` | Rojo semi-transparente para el anillo de foco en error |
| `--shadow-spot-rfid-error` | `0 0 0 4px var(--color-focus-error)` | Box shadow cuando `error` está definido |

## Uso

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
        label="Dirección IP"
        id="ip-address"
        value={address}
        placeholder="ej. 192.168.1.1"
        onChange={handleChange}
        error={addressError}
      />

      {/* Read-only tag field (tag mode) */}
      <InputGroup
        label="TID"
        id="tid-a"
        isTag={true}
        value="E2003412012345678901234A"
        placeholder="Leer TAG A"
      />
    </div>
  );
}
```

## Notas

- En modo tag (`isTag={true}`), el componente `Input` subyacente recibe `disabled={true}`, por lo que `onChange` nunca se invoca aunque se proporcione.
- La prop `error` solo afecta el estilo visual y el texto del mensaje — la lógica de validación debe implementarla el componente padre.
- `InputGroup` compone internamente los componentes `Input` e `InputLabel` de la librería. Sus variables CSS individuales (fondo, color de texto, border radius, padding) también se aplican aquí.
