# useAuthStorage

> [English](../../../docs/hooks/useAuthStorage.md) | [Versión española](../../es/hooks/useAuthStorage.md)

## Panoramica

`useAuthStorage` gestisce i due valori di autenticazione memorizzati in `localStorage` — il token di accesso e l'oggetto utente — attraverso un'interfaccia unificata. È costruito sopra [`useStorage`](./useStorage.md) ed è usato internamente da `AuthProvider`.

## Importazione

```js
import { useAuthStorage } from 'thecore-auth';
```

## Parametri

Questo hook non accetta parametri.

## Valore restituito

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `token` | `string | null` | Token JWT di accesso letto dalla chiave `localStorage` `"accessToken"`. |
| `user` | `object | null` | Oggetto utente letto dalla chiave `localStorage` `"user"`. |
| `setToken` | `(value) => void` | Persiste un nuovo token di accesso nello stato e in `localStorage`. |
| `setUser` | `(value) => void` | Persiste un nuovo oggetto utente nello stato e in `localStorage`. |
| `storageLogout` | `() => void` | Rimuove sia `"accessToken"` che `"user"` da `localStorage` e reimposta lo stato a `null`. |

## Utilizzo

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
    return <button onClick={() => handleLogin({ accessToken: 'abc', user: { name: 'Alice' } })}>Accedi</button>;
  }

  return (
    <div>
      <p>Connesso come {user?.name}</p>
      <button onClick={handleLogout}>Disconnetti</button>
    </div>
  );
}
```

## Note

- `token` e `user` vengono inizializzati da `localStorage` al primo render, quindi la sessione sopravvive ai refresh di pagina.
- `storageLogout` chiama `removeToken()` e `removeUser()` individualmente; **non** chiama `localStorage.clear()`, quindi le chiavi non correlate vengono preservate.
- Preferire il consumo dello stato di autenticazione tramite `useAuth` (l'hook `AuthContext`) piuttosto che chiamare direttamente `useAuthStorage` — `AuthProvider` gestisce già questi valori per te.
