# AuthProvider / useAuth

> 🇬🇧 [English](../../contexts/AuthProvider.md) | 🇪🇸 [Español](../../es/contexts/AuthProvider.md)

## Panoramica

`AuthProvider` è il contesto di autenticazione centrale di `thecore-auth`. Gestisce il ciclo di vita della sessione JWT: login, logout, scadenza del token, rinnovo tramite heartbeat e auto-login con un backend token. Dipende da `ConfigProvider`, `LoadingProvider` e `AlertProvider`.

---

## Setup

Inserire `AuthProvider` all'interno di `ConfigProvider`, `LoadingProvider` e `AlertProvider`, e dentro un contesto React Router (usa `useNavigate` internamente). Usando `PackageRoutes`, l'annidamento corretto è già gestito.

```jsx
import { BrowserRouter } from 'react-router-dom';
import {
  ConfigProvider,
  AlertProvider,
  LoadingProvider,
  AuthProvider,
} from 'thecore-auth';

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <AlertProvider>
          <LoadingProvider>
            <AuthProvider>
              {/* la tua app */}
            </AuthProvider>
          </LoadingProvider>
        </AlertProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

---

## API dell'hook

```js
const auth = useAuth();
```

| Valore | Tipo | Descrizione |
|---|---|---|
| `isAuthenticated` | `boolean \| null` | `null` durante il controllo iniziale, `true` se autenticato, `false` altrimenti |
| `setIsAuthenticated` | `(value: boolean) => void` | Imposta direttamente lo stato di autenticazione |
| `autoLoginError` | `Error \| null` | Valorizzato quando l'auto-login con `backendToken` fallisce |
| `login` | `(e?: Event, formData: object) => Promise<void>` | Invia le credenziali; in caso di successo naviga verso `firstPrivatePath` |
| `logout` | `() => void` | Svuota lo storage e imposta `isAuthenticated` a `false` |
| `createAxiosInstances` | `(onUnauthorized?, onNotFound?, onGenericError?) => Promise<AxiosInstance>` | Restituisce un'istanza Axios configurata con interceptor sugli errori |
| `fetchHeartbeat` | `() => Promise<void>` | Chiama l'endpoint heartbeat e aggiorna il token |
| `getTokenExpiry` | `(token?: string) => number \| undefined` | Decodifica il JWT e restituisce i millisecondi alla scadenza meno `timeDeducted` |
| `checkTokenValidity` | `(token: string) => boolean` | Restituisce `true` se il token è presente e non scaduto |
| `fetchUser` | `(token: string) => Promise<void>` | Recupera i dati utente con il token fornito (usato per l'auto-login) |
| `handleLoad` | `() => void` | Valida il token memorizzato al ricaricamento della pagina |

---

## Utilizzo

```jsx
import { useAuth } from 'thecore-auth';

function Dashboard() {
  const { isAuthenticated, logout, createAxiosInstances } = useAuth();

  const fetchData = async () => {
    // createAxiosInstances restituisce un'istanza Axios preconfigurata
    // con header di autorizzazione e interceptor sugli errori
    const axios = await createAxiosInstances();
    const res = await axios.get('/api/data');
    console.log(res.data);
  };

  if (isAuthenticated === null) return <p>Caricamento...</p>;
  if (!isAuthenticated) return <p>Non autenticato</p>;

  return (
    <div>
      <button onClick={fetchData}>Recupera dati</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Note

- `isAuthenticated` parte come `null` (non `false`) per distinguere "non ancora verificato" da "verificato e non autenticato". Gestire il caso `null` prima di mostrare UI protette.
- L'auto-login viene attivato quando `autoLogin: true` in `config.json` e `isAuthenticated` è `false`. Il `backendToken` deve essere impostato nella config.
- Quando `infiniteSession: true`, `fetchHeartbeat` viene chiamato a intervalli prima della scadenza del token per ottenerne uno nuovo senza re-login.
- Quando `autoLoginError` è valorizzato (auto-login fallito), l'effetto di auto-login non ritenta — renderizzare `DefaultAutoLoginFallback` o una pagina di fallback personalizzata.
- `createAxiosInstances` accetta callback opzionali: `onUnauthorized` ha come default `logout`.
