# Input

> **English:** [docs/components/Input.md](../../components/Input.md) | **Versión española:** [docs/es/components/Input.md](../es/components/Input.md)

## Overview

Un input di testo controllato che racchiude l'elemento nativo `<input>`. Limita il `type` a un elenco sicuro di valori consentiti e applica i design token definiti tramite variabili CSS del progetto. Qualsiasi classe può essere sostituita tramite `overrideStyle` o estesa tramite `inputStyle`.

## Import

```js
import { Input } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `inputType` | `'text' \| 'email' \| 'password' \| 'search' \| 'tel' \| 'url'` | `'text'` | No | Tipo nativo dell'input. Ritorna a `'text'` se viene fornito un valore non valido. |
| `inputId` | `string` | — | No | Attributo `id`; associare con un `InputLabel` per l'accessibilità. |
| `inputName` | `string` | — | No | Attributo `name` per la sottomissione del form. |
| `inputValue` | `string` | — | Yes | Valore controllato. |
| `inputChange` | `(e: ChangeEvent) => void` | — | Yes | Handler `onChange`. |
| `inputPlaceholder` | `string` | — | No | Testo segnaposto. |
| `inputRequired` | `boolean` | `true` | No | Corrisponde all'attributo nativo `required`. |
| `autoFocus` | `boolean` | — | No | Mette a fuoco automaticamente il campo al montaggio. |
| `inputStyle` | `string` | `''` | No | Classi Tailwind aggiuntive accodate alla stringa di classi predefinita. |
| `overrideStyle` | `string` | — | No | Sostituisce l'intera stringa di classi predefinita quando specificata. |
| `disabled` | `boolean` | — | No | Disabilita l'input. |

## CSS Variables

| Variable | Default | Effect |
|---|---|---|
| `--color-input-bg` | `#f9fafb` | Sfondo dell'input (`bg-input-bg`) |
| `--color-input-border` | `#d1d5db` | Colore del bordo (`border-input-border`) |
| `--color-input-text` | `#111827` | Colore del testo (`text-input-text`) |
| `--text-input-placeholder` | `14px` | Dimensione del font del segnaposto (`text-input-placeholder`) |
| `--input-radius` | `8px` | Raggio del bordo (`.input-rounded`) |
| `--padding-input` | `10px` | Padding interno (`p-input`) |
| `--color-primary` | `#f56907` | Colore del focus ring e del bordo |
| `--shadow-primary-input` | `inset 0 1px 1px …` | Box-shadow al focus |

> Sovrascrivere qualsiasi variabile in `:root` o in un selettore padre si propaga automaticamente a tutte le istanze di `Input` in quell'ambito.

## Usage

```jsx
import { useState } from 'react';
import { Input, InputLabel } from 'thecore-auth';

function LoginFields() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-1 mb-4">
        <InputLabel label="Email" labelId="email" />
        <Input
          inputType="email"
          inputId="email"
          inputName="email"
          inputPlaceholder="you@example.com"
          inputValue={email}
          inputChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <InputLabel label="Password" labelId="password" />
        <Input
          inputType="password"
          inputId="password"
          inputName="password"
          inputPlaceholder="••••••••"
          inputValue={password}
          inputChange={(e) => setPassword(e.target.value)}
          inputStyle="font-mono tracking-widest"
        />
      </div>
    </form>
  );
}
```

## Notes

- `inputType` viene validato rispetto a `['text', 'email', 'password', 'search', 'tel', 'url']`. Qualsiasi valore non supportato torna silenziosamente a `'text'`.
- `inputRequired` ha valore predefinito `true` — passare `inputRequired={false}` esplicitamente per i campi opzionali.
- Usare `overrideStyle` per sostituire completamente la stringa di classi predefinita quando i design token non si applicano.
- Usare `inputStyle` per aggiungere classi senza perdere lo stile predefinito basato sui token.
