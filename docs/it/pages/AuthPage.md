# AuthPage

> [English](../../pages/AuthPage.md) | [Español](../../es/pages/AuthPage.md)

## Panoramica

`AuthPage` è un middleware guard per le rotte. Protegge le rotte private verificando lo stato di autenticazione da `AuthContext`:

- Se il controllo di autenticazione è ancora in corso (`isAuthenticated === null`), non renderizza nulla e attende.
- Se l'utente è autenticato, renderizza l'outlet annidato (`<Outlet />`).
- Se l'utente non è autenticato, reindirizza a `"/"` (pagina di login) e mostra un alert `danger` — a meno che non sia configurato l'auto-login.

`AuthPage` non accetta figli; si affida a `<Outlet />` di React Router per renderizzare la rotta figlia corrispondente.

## Import

`AuthPage` viene cablato automaticamente da `PackageRoutes`. L'import diretto è necessario solo per alberi di routing completamente personalizzati.

```js
import { AuthPage } from 'thecore-auth';
```

## Props

`AuthPage` non accetta props.

## Utilizzo

### Default (via `PackageRoutes`)

`PackageRoutes` avvolge automaticamente tutte le rotte private con `AuthPage`. Non è necessaria alcuna configurazione esplicita.

### Albero di routing personalizzato

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthPage } from 'thecore-auth';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Login from './pages/Login';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pubbliche */}
        <Route path="/" element={<Login />} />

        {/* Protette — tutte le rotte annidate richiedono autenticazione */}
        <Route element={<AuthPage />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/settings/:id" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

### Con un provider aggiuntivo

```jsx
<Route element={
  <MyAppProvider>
    <AuthPage />
  </MyAppProvider>
}>
  <Route path="/dashboard/:id" element={<Dashboard />} />
</Route>
```

`PackageRoutes` gestisce questo automaticamente tramite le props `privateProvider` e `customProvider`.

## Note

- La guardia `isAuthenticated === null` previene un flash di redirect mentre il token viene validato in modo asincrono al caricamento della pagina.
- L'alert `danger` per accesso non autorizzato viene soppresso quando `autoLogin` è attivo in `ConfigContext`, perché il flusso di auto-login gestisce il proprio stato di errore.
- `AuthPage` non verifica i diritti di amministratore. Usa `AuthAdmin` per il controllo degli accessi basato su ruolo.
