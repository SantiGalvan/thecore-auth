# fetchAxiosConfig

> [Versione italiana](../../it/utils/fetchAxiosConfig.md) | [Versión española](../../es/utils/fetchAxiosConfig.md)

## Overview

`fetchAxiosConfig` is an async factory that creates and caches a pre-configured [Axios](https://axios-http.com/) instance. It reads `baseURL` and error messages from `/config.json`, automatically injects the JWT access token from `localStorage` into every request, and handles `401`, `404`, and generic HTTP errors through a unified response interceptor.

The instance is a singleton: calling `fetchAxiosConfig` multiple times always returns the same Axios instance without re-reading the config or re-registering interceptors.

## Import

```js
import { fetchAxiosConfig } from 'thecore-auth';
```

## Functions

### `fetchAxiosConfig(alert, onUnauthorized, onNotFound, onGenericError)`

Creates (or returns the cached) Axios instance configured for the current application.

| Name | Type | Description |
|------|------|-------------|
| `alert` | `(type: string, message: string) => void` \| `undefined` | Callback invoked to display an error notification. `type` is always `'danger'`. Typically the `alert` function from `useAlert`. |
| `onUnauthorized` | `() => void` \| `undefined` | Called when a `401` response is received. Use this to redirect the user to the login page. |
| `onNotFound` | `(error: AxiosError) => void` \| `undefined` | Called when a `404` response is received. |
| `onGenericError` | `(error: AxiosError) => void` \| `undefined` | Called for any other HTTP error status. |

**Returns:** `Promise<AxiosInstance>` — the configured singleton Axios instance.

**Config file shape** (`/config.json`):

```json
{
  "baseUri": "https://api.example.com",
  "axiosErrors": {
    "unauthorized": "Session expired. Please log in again.",
    "notFound": "The requested resource was not found.",
    "defaultMessage": "An error occurred."
  }
}
```

**Request interceptor behavior:**
- Reads `accessToken` from `localStorage` (stored as a JSON-encoded string).
- If a token exists, sets `Authorization: Bearer <token>` on the request.
- If no token exists and no `Authorization` header was already set, removes the header entirely.

**Response interceptor behavior:**

| Status | Action |
|--------|--------|
| `401` | Removes `accessToken` from `localStorage`, calls `alert('danger', unauthorized)`, calls `onUnauthorized()` |
| `404` | Calls `alert('danger', notFound)`, calls `onNotFound(error)` |
| Other errors | Calls `alert('danger', defaultMessage + status + data.error)`, calls `onGenericError(error)` |

All error cases re-reject the promise so the caller's `.catch()` / `try-catch` still runs.

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

## Usage

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
        () => navigate('/login'),   // redirect on 401
        (err) => console.warn('Not found:', err.response?.config?.url),
        (err) => console.error('Unexpected error:', err),
      );

      const { data } = await axios.get('/users/me');
      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </div>
  );
}
```

## Notes

- **Singleton pattern**: the instance is created only once per page load. If you need different base URLs or interceptors for different services, call `fetchAxiosConfig` in separate modules — but note the current implementation uses a single module-level variable, so all callers share the same instance.
- **Token source**: the token is read from `localStorage` on every request (inside the request interceptor), so token refreshes are reflected automatically without re-creating the instance.
- **Config errors**: if `/config.json` cannot be fetched or parsed, the factory logs the error to the console and returns `undefined`. Guard against this in callers by checking the return value before use.
- **All callback parameters are optional**: pass `undefined` for any handler you do not need. The interceptor uses optional chaining (`?.`) for all callbacks.
- The factory depends on `/config.json` being served at the root of the dev/prod server. In tests, mock `fetch` or provide a local config file accordingly.
