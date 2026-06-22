# ConfigProvider / useConfig

> 🇬🇧 [English](../../contexts/ConfigProvider.md) | 🇪🇸 [Español](../../es/contexts/ConfigProvider.md)

## Panoramica

`ConfigProvider` legge `public/config.json` a runtime e rende disponibile ogni chiave nell'intera applicazione tramite `useConfig()`. Inietta inoltre funzioni di utilità per accesso a IndexedDB, formattazione delle date e generazione della chiave di sessione. Se il file non può essere recuperato, renderizza una `ErrorPage` con un template di configurazione.

---

## Setup

Inserire `ConfigProvider` alla radice dell'albero, avvolgendo tutti gli altri provider.

```jsx
import { ConfigProvider } from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      {/* tutti gli altri provider e la tua app */}
    </ConfigProvider>
  );
}
```

`public/config.json` deve esistere. Esempio minimo:

```json
{
  "baseUri": "https://api.example.com",
  "authenticatedEndpoint": "/auth/login",
  "usersEndpoint": "/users",
  "heartbeatEndpoint": "/auth/heartbeat",
  "firstPrivatePath": "/dashboard/",
  "firstPrivateTitle": "Dashboard",
  "infiniteSession": true,
  "timeDeducted": 30000,
  "alertTimeout": 5000,
  "axiosTimeout": 10000,
  "axiosErrors": {
    "unauthorized": "Sessione scaduta",
    "notFound": "Risorsa non trovata",
    "defaultMessage": "Si è verificato un errore"
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "",
  "isDebug": false,
  "showHeaderButton": true,
  "stopLoaderOnFinish": true
}
```

---

## API dell'hook

```js
const config = useConfig();
```

Tutte le chiavi di `config.json` sono disponibili direttamente. In aggiunta, `ConfigProvider` inietta:

| Valore | Tipo | Descrizione |
|---|---|---|
| `version` | `string` | Versione del pacchetto letta da `package.json` (o `/package.json` in produzione) |
| `sessionKey` | `string \| null` | Chiave di sessione univoca memorizzata in `sessionStorage`; `null` se `hasSessionKey` è falsy |
| `activity` | `object` | Segnali di attività utente dall'hook interno `useUserActivity` |
| `setCurrentDate` | `() => string` | Restituisce data/ora corrente nel formato `"dd/mm/yyyy hh:mm:ss"` |
| `openIndexedDB` | `(dbName, storeName) => Promise<IDBDatabase>` | Apre (o crea) un database IndexedDB |
| `getDataIndexedDB` | `(dbName, storeName, key) => Promise<any>` | Legge un record per chiave da uno store IndexedDB |
| `setDataIndexedDB` | `(dbName, storeName, data) => Promise<void>` | Scrive un record in uno store IndexedDB (richiede `data.id`) |
| `generateUniqueId` | `(dbName, storeName) => Promise<number>` | Restituisce un ID numerico univoco non ancora presente nello store |
| `setDataWithAutoId` | `(dbName, storeName, data) => Promise<void>` | Scrive un record assegnando un ID auto-generato se `data.id` è mancante |

---

## Utilizzo

```jsx
import { useConfig } from 'thecore-auth';

function ApiExample() {
  const {
    baseUri,
    heartbeatEndpoint,
    isDebug,
    setCurrentDate,
    getDataIndexedDB,
    setDataWithAutoId,
  } = useConfig();

  const saveRecord = async () => {
    await setDataWithAutoId('myApp', 'logs', { message: 'Azione eseguita' });
    if (isDebug) console.log('[App]: record salvato alle', setCurrentDate());
  };

  return (
    <div>
      <p>API base: {baseUri}</p>
      <p>Heartbeat: {heartbeatEndpoint}</p>
      <button onClick={saveRecord}>Salva log</button>
    </div>
  );
}
```

---

## Note

- `ConfigProvider` renderizza `ErrorPage` (non `null`) finché la configurazione non è caricata. I figli non vengono mai montati con un oggetto config vuoto.
- `fetchConfig` è protetto da un flag `useRef` che garantisce l'esecuzione esattamente una volta, anche in React Strict Mode.
- In sviluppo (`isDevelopment: true` nella config), la versione è letta da `package.json` a build time. In produzione viene recuperata da `/package.json` a runtime.
- `hasSessionKey: true` + stringa `appKey` opzionale genera un UUID prefissato memorizzato in `sessionStorage`. La chiave persiste per tutta la durata del tab del browser.
