# AuthAdmin

> [English](../../middlewares/AuthAdmin.md) | [Español](../../es/middlewares/AuthAdmin.md)

## Panoramica

`AuthAdmin` è un middleware guard per le pagine riservate agli amministratori. Legge l'oggetto `user` da `useAuthStorage` e verifica il flag `user.admin`:

- Se l'utente è assente o `user.admin` è falso, mostra un alert `warning` e reindirizza a `location.state?.from` (la pagina precedente) o a `"/"` (login).
- Se `user.admin` è truthy, renderizza i `children`.

A differenza di `AuthPage` (che usa `<Outlet />`), `AuthAdmin` è un componente wrapper — renderizza direttamente i `children`.

## Import

```js
import { AuthAdmin } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|------|------|---------|-----------|-------------|
| `children` | `ReactNode` | — | Sì | Il contenuto protetto da renderizzare quando l'utente ha i diritti di amministratore |

## Utilizzo

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage, AuthAdmin } from 'thecore-auth';
import AdminPanel from './pages/AdminPanel';
import UserSettings from './pages/UserSettings';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tutte le rotte private */}
        <Route element={<AuthPage />}>

          {/* Rotta solo admin */}
          <Route
            path="/admin/:id"
            element={
              <AuthAdmin>
                <AdminPanel />
              </AuthAdmin>
            }
          />

          {/* Rotta autenticata normale */}
          <Route path="/settings/:id" element={<UserSettings />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Sezione admin annidata

```jsx
<Route element={<AuthPage />}>
  <Route path="/dashboard/:id" element={<Dashboard />} />

  {/* Avvolge un intero gruppo di rotte con un singolo AuthAdmin */}
  <Route
    path="/admin"
    element={
      <AuthAdmin>
        <AdminLayout />
      </AuthAdmin>
    }
  >
    <Route path="users" element={<UserList />} />
    <Route path="reports" element={<Reports />} />
  </Route>
</Route>
```

## Note

- `AuthAdmin` dovrebbe sempre essere annidato all'interno di una rotta protetta da `AuthPage`. Non esegue il controllo di autenticazione di base da solo.
- Il target del redirect `location.state?.from` viene impostato da React Router quando si usa `<Navigate state={{ from: location.pathname }} />` prima del redirect. Se lo state è assente, l'utente viene inviato a `"/"`.
- L'alert `warning` si attiva a ogni render in cui `user.admin` è false — non solo al mount iniziale. È intenzionale: se il flag admin dell'utente viene revocato durante la sessione, viene reindirizzato immediatamente.
