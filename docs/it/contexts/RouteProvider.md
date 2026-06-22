# RouteProvider / useRoutesInjection

> 🇬🇧 [English](../../contexts/RouteProvider.md) | 🇪🇸 [Español](../../es/contexts/RouteProvider.md)

## Panoramica

`RouteProvider` inietta le route pubbliche e private dell'applicazione host nel sistema di routing di `thecore-auth`. È il ponte tra il componente `PackageRoutes` della libreria e le definizioni di route specifiche dell'app. Non accetta altra configurazione oltre ai due array di route.

---

## Setup

Avvolgere `PackageRoutes` (o qualsiasi componente che chiama `useRoutesInjection`) con `RouteProvider` e passare gli array di route.

```jsx
import { RouteProvider, PackageRoutes } from 'thecore-auth';
import PublicHomePage from './pages/PublicHomePage';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

const publicRoutes = [
  { path: '/', element: <PublicHomePage /> },
];

const privateRoutes = [
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/settings', element: <Settings /> },
];

function App() {
  return (
    <RouteProvider publicRoutes={publicRoutes} privateRoutes={privateRoutes}>
      <PackageRoutes />
    </RouteProvider>
  );
}
```

---

## Props

| Prop | Tipo | Default | Descrizione |
|---|---|---|---|
| `publicRoutes` | `RouteObject[]` | `[]` | Route accessibili senza autenticazione |
| `privateRoutes` | `RouteObject[]` | `[]` | Route protette dal middleware `AuthPage` |

Ogni elemento degli array segue la stessa struttura di `RouteObject` di React Router:

```js
{ path: '/esempio', element: <MiaPagina />, title: 'Esempio' }
```

---

## API dell'hook

```js
const { publicRoutes, privateRoutes } = useRoutesInjection();
```

| Valore | Tipo | Descrizione |
|---|---|---|
| `publicRoutes` | `RouteObject[]` | Le route pubbliche passate a `RouteProvider` |
| `privateRoutes` | `RouteObject[]` | Le route private passate a `RouteProvider` |

---

## Utilizzo

```jsx
import { useRoutesInjection } from 'thecore-auth';

// Esempio di utilizzo interno (es. dentro un componente router personalizzato)
function MyCustomRouter() {
  const { publicRoutes, privateRoutes } = useRoutesInjection();

  return (
    <Routes>
      {publicRoutes.map(r => (
        <Route key={r.path} path={r.path} element={r.element} />
      ))}
      {privateRoutes.map(r => (
        <Route
          key={r.path}
          path={r.path}
          element={<AuthPage>{r.element}</AuthPage>}
        />
      ))}
    </Routes>
  );
}
```

---

## Note

- `useRoutesInjection` lancia un errore descrittivo se chiamato fuori da `RouteProvider` — il messaggio include l'esempio corretto di wrapping.
- `RouteProvider` non esegue alcuna logica di autenticazione; si limita a passare gli array tramite contesto. Tutta la protezione auth avviene dentro `PackageRoutes` e il middleware `AuthPage`.
- Sia `publicRoutes` che `privateRoutes` hanno come default array vuoti, quindi `PackageRoutes` renderizza senza errori anche se uno dei due array viene omesso.
