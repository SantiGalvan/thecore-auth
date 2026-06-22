# LoginForm

> [English](../../../docs/components/LoginForm.md) | [Versión española](../../../docs/es/components/LoginForm.md)

## Panoramica

`LoginForm` è il form per le credenziali renderizzato all'interno della card di login. Non accetta props: tutto il suo stato (titolo, etichette, tipo dei campi, placeholder, testo del bottone, override degli stili) viene letto da `LoginFormContext` tramite `useLoginForm()`. Per personalizzare il form, chiama i setter esposti dal context prima del render.

## Import

```js
import { LoginForm } from 'thecore-auth';
```

## Props

Questo componente **non accetta props**. Tutta la configurazione avviene tramite `LoginFormContext`.

| Valore del context | Tipo | Default | Descrizione |
|---|---|---|---|
| `title` | `string` | `'Accedi'` | Intestazione mostrata sopra il campo email |
| `label` | `string` | `'Email'` | Testo dell'etichetta per il campo email |
| `type` | `string` | `'email'` | Tipo dell'input per il campo email |
| `placeholder` | `string` | `'example@example.it'` | Placeholder dell'input email |
| `buttonText` | `string` | `'Accedi'` | Testo del bottone di submit |
| `overrideStyle` | `object` | `{}` | Override delle classi per slot (vedi Note) |

## Variabili CSS

Queste variabili, definite in `src/css/index.css`, controllano l'aspetto visivo del form:

| Variabile | Default | Descrizione |
|---|---|---|
| `--basis-form` | `50%` | Flex-basis dell'elemento form |
| `--input-form-width` | `70%` | Larghezza di ogni container input |
| `--text-form-title-size` | `2.25rem` | Dimensione del titolo del form |
| `--margin-form-title` | `32px 0` | Margine attorno al titolo del form |
| `--title-display` | `none` | Visibilità del titolo (`block` per mostrarlo) |
| `--title-position` | `center` | Allineamento del testo del titolo |
| `--justify-primary` | `center` | Justify-content della riga del bottone |
| `--padding-primary-button` | `8px 16px` | Padding del bottone di submit |
| `--radius-primary-button` | `calc(infinity * 1px)` | Border radius del bottone di submit |
| `--color-primary` | `#f56907` | Colore di sfondo del bottone |
| `--color-primary-hover` | `#f88b29` | Colore di sfondo del bottone al hover |
| `--color-primary-text` | `#fff` | Colore del testo del bottone |
| `--shadow-primary` | `…` | Box-shadow del bottone |
| `--shadow-primary-hover` | `…` | Box-shadow del bottone al hover |
| `--shadow-primary-active` | `…` | Box-shadow del bottone al press |
| `--padding-input` | `10px` | Padding verticale di ogni campo input |
| `--input-radius` | `8px` | Border radius di ogni campo input |

## Utilizzo

```jsx
import { LoginFormProvider, useLoginForm, LoginForm } from 'thecore-auth';

// Componente interno che configura il form prima del mount
function ConfiguredForm() {
  const { setTitle, setLabel, setButtonText, setOverrideStyle } = useLoginForm();

  useEffect(() => {
    setTitle('Accedi');
    setLabel('Email aziendale');
    setButtonText('Entra');
    // Override dello slot bottone con una classe Tailwind custom
    setOverrideStyle({
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full',
    });
  }, []);

  return <LoginForm />;
}

// Avvolgi il consumer con il provider
export default function LoginPage() {
  return (
    <LoginFormProvider>
      <ConfiguredForm />
    </LoginFormProvider>
  );
}
```

## Note

- `overrideStyle` accetta le seguenti chiavi slot: `form`, `title`, `containerEmail`, `containerPassword`, `containerButton`, `button`. Quando una chiave è impostata, l'intera stringa di classi predefinita per quello slot viene sostituita (non mergiata).
- Il componente è tipicamente usato all'interno delle pagine `Login` o `SmartLogin`, che già lo avvolgono in `LoginFormProvider`.
- Il campo password è sempre di tipo `password` e non è configurabile tramite context.
