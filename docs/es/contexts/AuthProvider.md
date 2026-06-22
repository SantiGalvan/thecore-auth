# AuthProvider / useAuth

> 🇬🇧 [English](../../contexts/AuthProvider.md) | 🇮🇹 [Italiano](../../it/contexts/AuthProvider.md)

## Descripción general

`AuthProvider` es el contexto central de autenticación de `thecore-auth`. Gestiona el ciclo de vida de la sesión JWT: login, logout, expiración del token, renovación mediante heartbeat y auto-login con un token de backend. Depende de `ConfigProvider`, `LoadingProvider` y `AlertProvider`.

---

## Configuración

Colocar `AuthProvider` dentro de `ConfigProvider`, `LoadingProvider` y `AlertProvider`, y dentro de un contexto de React Router (usa `useNavigate` internamente). Al usar `PackageRoutes`, el anidamiento correcto ya está gestionado.

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
              {/* tu app */}
            </AuthProvider>
          </LoadingProvider>
        </AlertProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

---

## API del hook

```js
const auth = useAuth();
```

| Valor | Tipo | Descripción |
|---|---|---|
| `isAuthenticated` | `boolean \| null` | `null` durante la comprobación inicial, `true` si autenticado, `false` en caso contrario |
| `setIsAuthenticated` | `(value: boolean) => void` | Establece el estado de autenticación directamente |
| `autoLoginError` | `Error \| null` | Se establece cuando el auto-login con `backendToken` falla |
| `login` | `(e?: Event, formData: object) => Promise<void>` | Envía credenciales; navega a `firstPrivatePath` en caso de éxito |
| `logout` | `() => void` | Limpia el almacenamiento y establece `isAuthenticated` a `false` |
| `createAxiosInstances` | `(onUnauthorized?, onNotFound?, onGenericError?) => Promise<AxiosInstance>` | Devuelve una instancia Axios configurada con interceptores de error |
| `fetchHeartbeat` | `() => Promise<void>` | Llama al endpoint heartbeat y renueva el token |
| `getTokenExpiry` | `(token?: string) => number \| undefined` | Decodifica el JWT y devuelve los milisegundos hasta la expiración menos `timeDeducted` |
| `checkTokenValidity` | `(token: string) => boolean` | Devuelve `true` si el token está presente y no ha expirado |
| `fetchUser` | `(token: string) => Promise<void>` | Obtiene datos del usuario con el token proporcionado (usado para auto-login) |
| `handleLoad` | `() => void` | Valida el token almacenado al recargar la página |

---

## Uso

```jsx
import { useAuth } from 'thecore-auth';

function Dashboard() {
  const { isAuthenticated, logout, createAxiosInstances } = useAuth();

  const fetchData = async () => {
    // createAxiosInstances devuelve una instancia Axios preconfigurada
    // con cabeceras de autorización e interceptores de error
    const axios = await createAxiosInstances();
    const res = await axios.get('/api/data');
    console.log(res.data);
  };

  if (isAuthenticated === null) return <p>Cargando...</p>;
  if (!isAuthenticated) return <p>No autenticado</p>;

  return (
    <div>
      <button onClick={fetchData}>Obtener datos</button>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
```

---

## Notas

- `isAuthenticated` comienza como `null` (no `false`) para distinguir "aún no comprobado" de "comprobado y no autenticado". Gestionar el caso `null` antes de renderizar UI protegida.
- El auto-login se activa cuando `autoLogin: true` en `config.json` e `isAuthenticated` es `false`. El `backendToken` debe estar configurado en config.
- Cuando `infiniteSession: true`, `fetchHeartbeat` se llama en intervalos antes de la expiración del token para obtener uno nuevo sin re-login.
- Cuando `autoLoginError` está establecido (auto-login fallido), el efecto de auto-login no reintentará — renderizar `DefaultAutoLoginFallback` o una página de fallback personalizada.
- `createAxiosInstances` acepta callbacks opcionales: `onUnauthorized` tiene como valor por defecto `logout`.
