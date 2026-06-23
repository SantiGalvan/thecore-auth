# AuthProvider / useAuth

> 🇮🇹 [Italiano](../../it/contexts/AuthProvider.md) | 🇪🇸 [Español](../../es/contexts/AuthProvider.md)

## Overview

`AuthProvider` is the central authentication context for `thecore-auth`. It manages the JWT session lifecycle: login, logout, token expiry, heartbeat renewal, and auto-login with a backend token. It depends on `ConfigProvider`, `LoadingProvider`, and `AlertProvider`.

---

## Setup

Place `AuthProvider` inside `ConfigProvider`, `LoadingProvider`, and `AlertProvider`, and inside a React Router context (it calls `useNavigate` internally). When you use `PackageRoutes`, the correct nesting is already handled for you.

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
              {/* your app */}
            </AuthProvider>
          </LoadingProvider>
        </AlertProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
```

---

## Hook API

```js
const auth = useAuth();
```

| Value | Type | Description |
|---|---|---|
| `isAuthenticated` | `boolean \| null` | `null` during initial check, `true` when authenticated, `false` otherwise |
| `setIsAuthenticated` | `(value: boolean) => void` | Override authentication state directly |
| `autoLoginError` | `Error \| null` | Set when auto-login with `backendToken` fails |
| `login` | `(e?: Event, formData: object) => Promise<void>` | Submit credentials; navigates to `firstPrivatePath` on success |
| `logout` | `() => void` | Clears storage and sets `isAuthenticated` to `false` |
| `createAxiosInstances` | `(onUnauthorized?, onNotFound?, onGenericError?) => Promise<AxiosInstance>` | Returns a configured Axios instance with error interceptors |
| `fetchHeartbeat` | `() => Promise<void>` | Calls the heartbeat endpoint and refreshes the token |
| `getTokenExpiry` | `(token?: string) => number \| undefined` | Decodes the JWT and returns milliseconds until expiry minus `timeDeducted` |
| `checkTokenValidity` | `(token: string) => boolean` | Returns `true` if the token is present and not expired |
| `fetchUser` | `(token: string) => Promise<void>` | Fetches user data with the provided token (used for auto-login) |
| `handleLoad` | `() => void` | Validates the stored token on page reload |

---

## Usage

```jsx
import { useAuth } from 'thecore-auth';

function Dashboard() {
  const { isAuthenticated, logout, createAxiosInstances } = useAuth();

  const fetchData = async () => {
    // createAxiosInstances returns an Axios instance pre-configured
    // with authorization headers and error interceptors
    const axios = await createAxiosInstances();
    const res = await axios.get('/api/data');
    console.log(res.data);
  };

  if (isAuthenticated === null) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>Not authenticated</p>;

  return (
    <div>
      <button onClick={fetchData}>Fetch data</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## Notes

- `isAuthenticated` starts as `null` (not `false`) to distinguish "not yet checked" from "checked and unauthenticated". Guard against `null` before rendering protected UI.
- Auto-login is triggered when `autoLogin: true` in `config.json` and `isAuthenticated` is `false`. The `backendToken` must be set in config.
- When `infiniteSession: true`, `fetchHeartbeat` is called on an interval before the token expires to obtain a fresh token without re-login.
- When `autoLoginError` is set (auto-login failed), the auto-login effect will not retry — render `DefaultAutoLoginFallback` or a custom fallback page.
- `createAxiosInstances` accepts optional callbacks: `onUnauthorized` defaults to `logout`.
