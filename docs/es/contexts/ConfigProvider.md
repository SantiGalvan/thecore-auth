# ConfigProvider / useConfig

> 🇬🇧 [English](../../contexts/ConfigProvider.md) | 🇮🇹 [Italiano](../../it/contexts/ConfigProvider.md)

## Descripción general

`ConfigProvider` lee `public/config.json` en tiempo de ejecución y pone a disposición cada clave en toda la aplicación a través de `useConfig()`. También inyecta funciones de utilidad para acceso a IndexedDB, formateo de fechas y generación de claves de sesión. Si el archivo no puede recuperarse, renderiza una `ErrorPage` con una plantilla de configuración.

---

## Configuración

Colocar `ConfigProvider` en la raíz del árbol, envolviendo todos los demás providers.

```jsx
import { ConfigProvider } from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      {/* todos los demás providers y tu app */}
    </ConfigProvider>
  );
}
```

`public/config.json` debe existir. Ejemplo mínimo:

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
    "unauthorized": "Sesión expirada",
    "notFound": "Recurso no encontrado",
    "defaultMessage": "Se ha producido un error"
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

## API del hook

```js
const config = useConfig();
```

Todas las claves de `config.json` están disponibles directamente. Además, `ConfigProvider` inyecta:

| Valor | Tipo | Descripción |
|---|---|---|
| `version` | `string` | Versión del paquete leída desde `package.json` (o `/package.json` en producción) |
| `sessionKey` | `string \| null` | Clave de sesión única almacenada en `sessionStorage`; `null` si `hasSessionKey` es falsy |
| `activity` | `object` | Señales de actividad del usuario del hook interno `useUserActivity` |
| `setCurrentDate` | `() => string` | Devuelve fecha/hora actual en formato `"dd/mm/yyyy hh:mm:ss"` |
| `openIndexedDB` | `(dbName, storeName) => Promise<IDBDatabase>` | Abre (o crea) una base de datos IndexedDB |
| `getDataIndexedDB` | `(dbName, storeName, key) => Promise<any>` | Lee un registro por clave de un store IndexedDB |
| `setDataIndexedDB` | `(dbName, storeName, data) => Promise<void>` | Escribe un registro en un store IndexedDB (requiere `data.id`) |
| `generateUniqueId` | `(dbName, storeName) => Promise<number>` | Devuelve un ID numérico único no presente aún en el store |
| `setDataWithAutoId` | `(dbName, storeName, data) => Promise<void>` | Escribe un registro asignando un ID auto-generado si `data.id` falta |

---

## Uso

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
    await setDataWithAutoId('myApp', 'logs', { message: 'Acción realizada' });
    if (isDebug) console.log('[App]: registro guardado a las', setCurrentDate());
  };

  return (
    <div>
      <p>API base: {baseUri}</p>
      <p>Heartbeat: {heartbeatEndpoint}</p>
      <button onClick={saveRecord}>Guardar log</button>
    </div>
  );
}
```

---

## Notas

- `ConfigProvider` renderiza `ErrorPage` (no `null`) hasta que la configuración esté cargada. Los hijos nunca se montan con un objeto config vacío.
- `fetchConfig` está protegido por un flag `useRef` que garantiza que se ejecuta exactamente una vez, incluso en React Strict Mode.
- En desarrollo (`isDevelopment: true` en config), la versión se lee de `package.json` en tiempo de compilación. En producción se obtiene de `/package.json` en tiempo de ejecución.
- `hasSessionKey: true` + cadena `appKey` opcional genera un UUID con prefijo almacenado en `sessionStorage`. La clave persiste durante toda la vida útil de la pestaña del navegador.
