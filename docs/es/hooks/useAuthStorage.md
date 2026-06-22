# useAuthStorage

> [English](../../../docs/hooks/useAuthStorage.md) | [Versione italiana](../../it/hooks/useAuthStorage.md)

## Descripción general

`useAuthStorage` gestiona los dos valores de autenticación almacenados en `localStorage` — el token de acceso y el objeto de usuario — a través de una interfaz unificada. Está construido sobre [`useStorage`](./useStorage.md) y es utilizado internamente por `AuthProvider`.

## Importación

```js
import { useAuthStorage } from 'thecore-auth';
```

## Parámetros

Este hook no acepta parámetros.

## Valor de retorno

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `token` | `string | null` | Token JWT de acceso leído de la clave `localStorage` `"accessToken"`. |
| `user` | `object | null` | Objeto de usuario leído de la clave `localStorage` `"user"`. |
| `setToken` | `(value) => void` | Persiste un nuevo token de acceso en el estado y en `localStorage`. |
| `setUser` | `(value) => void` | Persiste un nuevo objeto de usuario en el estado y en `localStorage`. |
| `storageLogout` | `() => void` | Elimina tanto `"accessToken"` como `"user"` de `localStorage` y restablece el estado a `null`. |

## Uso

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
    return <button onClick={() => handleLogin({ accessToken: 'abc', user: { name: 'Alice' } })}>Iniciar sesión</button>;
  }

  return (
    <div>
      <p>Conectado como {user?.name}</p>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
}
```

## Notas

- `token` y `user` se inicializan desde `localStorage` en el primer render, por lo que la sesión sobrevive a los refrescos de página.
- `storageLogout` llama a `removeToken()` y `removeUser()` individualmente; **no** llama a `localStorage.clear()`, por lo que las claves no relacionadas se conservan.
- Preferir consumir el estado de autenticación a través de `useAuth` (el hook `AuthContext`) en lugar de llamar directamente a `useAuthStorage` — `AuthProvider` ya gestiona estos valores por ti.
