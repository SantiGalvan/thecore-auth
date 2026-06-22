# ConfigProvider / useConfig

> 🇮🇹 [Italiano](../it/contexts/ConfigProvider.md) | 🇪🇸 [Español](../es/contexts/ConfigProvider.md)

## Overview

`ConfigProvider` reads `public/config.json` at runtime and makes every key available throughout the app via `useConfig()`. It also injects utility functions for IndexedDB access, date formatting, and session-key generation. If the file cannot be fetched, it renders an `ErrorPage` with a configuration template.

---

## Setup

Place `ConfigProvider` at the root of your tree, wrapping all other providers.

```jsx
import { ConfigProvider } from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      {/* all other providers and your app go here */}
    </ConfigProvider>
  );
}
```

`public/config.json` must exist. Minimum example:

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
    "unauthorized": "Session expired",
    "notFound": "Resource not found",
    "defaultMessage": "An error occurred"
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

## Hook API

```js
const config = useConfig();
```

All keys from `config.json` are available directly. In addition, `ConfigProvider` injects:

| Value | Type | Description |
|---|---|---|
| `version` | `string` | Package version read from `package.json` (or `/package.json` in production) |
| `sessionKey` | `string \| null` | Unique session key stored in `sessionStorage`; `null` if `hasSessionKey` is falsy |
| `activity` | `object` | User-activity signals from `useUserActivity` (internal hook) |
| `setCurrentDate` | `() => string` | Returns current date/time formatted as `"dd/mm/yyyy hh:mm:ss"` |
| `openIndexedDB` | `(dbName, storeName) => Promise<IDBDatabase>` | Opens (or creates) an IndexedDB database |
| `getDataIndexedDB` | `(dbName, storeName, key) => Promise<any>` | Reads a record by key from an IndexedDB store |
| `setDataIndexedDB` | `(dbName, storeName, data) => Promise<void>` | Writes a record to an IndexedDB store (`data.id` required) |
| `generateUniqueId` | `(dbName, storeName) => Promise<number>` | Returns a unique numeric ID not already present in the store |
| `setDataWithAutoId` | `(dbName, storeName, data) => Promise<void>` | Writes a record, assigning an auto-generated ID if `data.id` is missing |

---

## Usage

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
    await setDataWithAutoId('myApp', 'logs', { message: 'Action taken' });
    if (isDebug) console.log('[App]: record saved at', setCurrentDate());
  };

  return (
    <div>
      <p>API base: {baseUri}</p>
      <p>Heartbeat: {heartbeatEndpoint}</p>
      <button onClick={saveRecord}>Save log</button>
    </div>
  );
}
```

---

## Notes

- `ConfigProvider` renders `ErrorPage` (not `null`) until the config is loaded. Children are never mounted with an empty config object.
- `fetchConfig` is guarded by a `useRef` flag so it fires exactly once even in React Strict Mode.
- In development (`isDevelopment: true` in config), the version is read from `package.json` at build time. In production it is fetched from `/package.json` at runtime.
- `hasSessionKey: true` + optional `appKey` string generates a prefixed UUID stored in `sessionStorage`. The key persists for the browser tab's lifetime.
