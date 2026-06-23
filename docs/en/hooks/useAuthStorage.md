# useAuthStorage

> [Versione italiana](../../it/hooks/useAuthStorage.md) | [Versión española](../../es/hooks/useAuthStorage.md)

## Overview

`useAuthStorage` manages the two authentication values stored in `localStorage` — the access token and the user object — through a unified interface. It is built on top of [`useStorage`](./useStorage.md) and is used internally by `AuthProvider`.

## Import

```js
import { useAuthStorage } from 'thecore-auth';
```

## Parameters

This hook accepts no parameters.

## Return value

| Key | Type | Description |
|-----|------|-------------|
| `token` | `string \| null` | JWT access token read from `localStorage` key `"accessToken"`. |
| `user` | `object \| null` | User object read from `localStorage` key `"user"`. |
| `setToken` | `(value) => void` | Persists a new access token to state and `localStorage`. |
| `setUser` | `(value) => void` | Persists a new user object to state and `localStorage`. |
| `storageLogout` | `() => void` | Removes both `"accessToken"` and `"user"` from `localStorage` and resets state to `null`. |

## Usage

```jsx
import { useAuthStorage } from 'thecore-auth';

function SessionPanel() {
  const { token, user, setToken, setUser, storageLogout } = useAuthStorage();

  const handleLogin = (authResponse) => {
    setToken(authResponse.accessToken);
    setUser(authResponse.user);
  };

  const handleLogout = () => {
    storageLogout(); // clears both token and user from localStorage
  };

  if (!token) {
    return <button onClick={() => handleLogin({ accessToken: 'abc', user: { name: 'Alice' } })}>Log in</button>;
  }

  return (
    <div>
      <p>Logged in as {user?.name}</p>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
```

## Notes

- `token` and `user` are initialised from `localStorage` on first render, so the session survives page refreshes.
- `storageLogout` calls `removeToken()` and `removeUser()` individually; it does **not** call `localStorage.clear()`, so unrelated keys are preserved.
- Prefer consuming auth state through `useAuth` (the `AuthContext` hook) rather than calling `useAuthStorage` directly — `AuthProvider` already manages these values for you.
