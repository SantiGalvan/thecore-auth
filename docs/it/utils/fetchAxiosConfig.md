# fetchAxiosConfig

> [English](../../utils/fetchAxiosConfig.md) | [Versión española](../../es/utils/fetchAxiosConfig.md)

## Panoramica

`fetchAxiosConfig` è una factory asincrona che crea e memorizza nella cache un'istanza [Axios](https://axios-http.com/) preconfigurata. Legge `baseURL` e i messaggi di errore da `/config.json`, inietta automaticamente il token JWT di accesso da `localStorage` in ogni richiesta e gestisce gli errori HTTP `401`, `404` e generici tramite un unico response interceptor.

L'istanza è un singleton: chiamare `fetchAxiosConfig` più volte restituisce sempre la stessa istanza Axios senza rileggere la configurazione né registrare nuovamente gli interceptor.

## Import

```js
import { fetchAxiosConfig } from 'thecore-auth';
```

## Funzioni

### `fetchAxiosConfig(alert, onUnauthorized, onNotFound, onGenericError)`

Crea (o restituisce dalla cache) l'istanza Axios configurata per l'applicazione corrente.

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `alert` | `(type: string, message: string) => void` \| `undefined` | Callback invocato per mostrare una notifica di errore. `type` è sempre `'danger'`. Tipicamente la funzione `alert` di `useAlert`. |
| `onUnauthorized` | `() => void` \| `undefined` | Chiamato quando si riceve una risposta `401`. Usalo per reindirizzare l'utente alla pagina di login. |
| `onNotFound` | `(error: AxiosError) => void` \| `undefined` | Chiamato quando si riceve una risposta `404`. |
| `onGenericError` | `(error: AxiosError) => void` \| `undefined` | Chiamato per qualsiasi altro stato di errore HTTP. |

**Restituisce:** `Promise<AxiosInstance>` — l'istanza Axios singleton configurata.

**Struttura del file di config** (`/config.json`):

```json
{
  "baseUri": "https://api.example.com",
  "axiosErrors": {
    "unauthorized": "Sessione scaduta. Effettua nuovamente il login.",
    "notFound": "La risorsa richiesta non è stata trovata.",
    "defaultMessage": "Si è verificato un errore."
  }
}
```

**Comportamento del request interceptor:**
- Legge `accessToken` da `localStorage` (memorizzato come stringa JSON).
- Se il token esiste, imposta `Authorization: Bearer <token>` sulla richiesta.
- Se non esiste alcun token e non è già presente un header `Authorization`, lo rimuove completamente.

**Comportamento del response interceptor:**

| Stato | Azione |
|-------|--------|
| `401` | Rimuove `accessToken` da `localStorage`, chiama `alert('danger', unauthorized)`, chiama `onUnauthorized()` |
| `404` | Chiama `alert('danger', notFound)`, chiama `onNotFound(error)` |
| Altri errori | Chiama `alert('danger', defaultMessage + status + data.error)`, chiama `onGenericError(error)` |

Tutti i casi di errore rigettano nuovamente la promise, così il `.catch()` / `try-catch` del chiamante viene comunque eseguito.

```js
const axios = await fetchAxiosConfig(
  (type, msg) => showToast(type, msg),
  () => navigate('/login'),
  (err) => console.warn('Not found', err),
  (err) => console.error('Server error', err),
);

const { data } = await axios.get('/users/me');
```

---

## Utilizzo

```jsx
import { fetchAxiosConfig, useAlert, useAuth } from 'thecore-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserProfile() {
  const { alert } = useAlert();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const axios = await fetchAxiosConfig(
        alert,
        () => navigate('/login'),   // redirect al login su 401
        (err) => console.warn('Not found:', err.response?.config?.url),
        (err) => console.error('Errore inatteso:', err),
      );

      const { data } = await axios.get('/users/me');
      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) return <p>Caricamento...</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </div>
  );
}
```

## Note

- **Pattern singleton**: l'istanza viene creata una sola volta per caricamento della pagina. Se hai bisogno di `baseURL` o interceptor diversi per servizi differenti, tieni presente che l'implementazione attuale usa una singola variabile a livello di modulo: tutti i chiamanti condividono la stessa istanza.
- **Sorgente del token**: il token viene letto da `localStorage` ad ogni richiesta (dentro il request interceptor), quindi i refresh del token si riflettono automaticamente senza ricreare l'istanza.
- **Errori di configurazione**: se `/config.json` non può essere recuperato o analizzato, la factory registra l'errore in console e restituisce `undefined`. Nei chiamanti, verifica il valore restituito prima di usarlo.
- **Tutti i parametri callback sono opzionali**: passa `undefined` per i gestori non necessari. L'interceptor usa l'optional chaining (`?.`) per tutte le callback.
- La factory dipende da `/config.json` servito alla radice del server dev/prod. Nei test, mocka `fetch` o fornisci un file di config locale.
