# LoginFormProvider / useLoginForm

> 🇬🇧 [English](../../contexts/LoginFormProvider.md) | 🇪🇸 [Español](../../es/contexts/LoginFormProvider.md)

## Panoramica

`LoginFormProvider` gestisce lo stato del form di login: valori dei campi, label, placeholder, testo del pulsante, immagine del logo e stili della card/logo. Avvolge la funzione `login` di `AuthProvider` e, facoltativamente, resetta il form in caso di errore in base al flag `clearLoginFormOnError` nella config. Deve essere annidato dentro `AuthProvider` e `ConfigProvider`.

---

## Setup

Inserire `LoginFormProvider` all'interno di `AuthProvider` e `ConfigProvider`.

```jsx
import {
  ConfigProvider,
  AlertProvider,
  LoadingProvider,
  AuthProvider,
  LoginFormProvider,
} from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      <AlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <LoginFormProvider>
              {/* componenti della pagina di login */}
            </LoginFormProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </ConfigProvider>
  );
}
```

---

## API dell'hook

```js
const loginForm = useLoginForm();
```

| Valore | Tipo | Descrizione |
|---|---|---|
| `title` | `string` | Titolo della card (default: `'Accedi'`) |
| `setTitle` | `(value: string) => void` | Sovrascrive il titolo della card |
| `label` | `string` | Label dell'input (default: `'Email'`) |
| `setLabel` | `(value: string) => void` | Sovrascrive la label dell'input |
| `type` | `string` | Tipo dell'input (default: `'email'`) |
| `setType` | `(value: string) => void` | Sovrascrive il tipo di input (es. `'text'` per un campo username) |
| `placeholder` | `string` | Placeholder dell'input (default: `'example@example.it'`) |
| `setPlaceholder` | `(value: string) => void` | Sovrascrive il placeholder |
| `buttonText` | `string` | Label del pulsante di invio (default: `'Accedi'`) |
| `setButtonText` | `(value: string) => void` | Sovrascrive la label del pulsante |
| `formData` | `{ email: string, password: string }` | Valori controllati del form |
| `setFormData` | `(data: object) => void` | Sostituisce l'intero oggetto formData |
| `changeData` | `(key: string, value: string) => void` | Aggiorna un singolo campo in `formData` |
| `handleLogin` | `(e: FormEvent) => void` | Chiama `login(e, formData)` e facoltativamente resetta il form |
| `LogoImg` | `ReactElement \| undefined` | Componente logo renderizzato sopra la card del form |
| `setLogoImg` | `(component: ReactElement) => void` | Imposta l'immagine/componente logo |
| `styleCardForm` | `object \| undefined` | Override di stile per il contenitore della card del form |
| `setStyleCardForm` | `(style: object) => void` | Imposta gli stili della card del form |
| `styleContainerLogo` | `object \| undefined` | Override di stile per il contenitore del logo |
| `setStyleContainerLogo` | `(style: object) => void` | Imposta gli stili del contenitore del logo |
| `styleLogo` | `object \| undefined` | Override di stile per l'elemento logo |
| `setStyleLogo` | `(style: object) => void` | Imposta gli stili dell'elemento logo |
| `overrideStyle` | `object` | Oggetto di override globale degli stili (default: `{}`) |
| `setOverrideStyle` | `(style: object) => void` | Imposta gli override globali degli stili |
| `customVersion` | `string \| null` | Stringa di versione personalizzata visualizzata nella card (default: `null`, mostra la versione del pacchetto) |
| `setCustomVersion` | `(version: string \| null) => void` | Sovrascrive la stringa di versione visualizzata |

---

## Utilizzo

```jsx
import { useLoginForm } from 'thecore-auth';
import { useEffect } from 'react';
import MyLogo from './MyLogo';

function CustomLoginPage() {
  const {
    setTitle,
    setLabel,
    setPlaceholder,
    setButtonText,
    setLogoImg,
    handleLogin,
    formData,
    changeData,
  } = useLoginForm();

  useEffect(() => {
    // Personalizza l'aspetto del form di login al mount
    setTitle('Bentornato');
    setLabel('Username');
    setPlaceholder('tuo.username');
    setButtonText('Accedi');
    setLogoImg(<MyLogo />);
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <input
        value={formData.email}
        onChange={e => changeData('email', e.target.value)}
      />
      <input
        type="password"
        value={formData.password}
        onChange={e => changeData('password', e.target.value)}
      />
      <button type="submit">Accedi</button>
    </form>
  );
}
```

---

## Note

- `formData` usa la chiave `email` per il campo identificatore anche quando `type` è impostato a `'text'` — il nome della chiave non cambia.
- `handleLogin` chiama `clearLoginFormOnError ? setFormData(initialData) : undefined` dopo aver chiamato `login`. Il reset del form è incondizionale (avviene prima che il login si risolva).
- `LoginForm` (il componente UI) legge da questo contesto automaticamente — montarlo dentro `LoginFormProvider` è sufficiente per cablarlo senza props aggiuntive.
- `SmartLogin` include `LoginFormProvider` internamente; non è necessario aggiungerlo manualmente quando si usa `SmartLogin`.
