# Dashboard

> [English](../../pages/Dashboard.md) | [Español](../../es/pages/Dashboard.md)

## Panoramica

`Dashboard` è il placeholder integrato per la prima rotta privata. Viene usato come valore default di `firstPrivateElement` in `PackageRoutes` e funge da sandbox di sviluppo e demo live delle funzionalità principali del pacchetto:

- Visualizzazione email utente e logout
- Notifiche alert e toast (success, error, info, warning, basate su promise)
- Switch modalità notifica Desktop / Mobile tramite `SwitchRadio`
- Chiamata API autenticata (recupera la lista utenti tramite `usersEndpoint` dalla config)
- Esempio di integrazione calendario

**Questo componente non è destinato all'uso in produzione.** Sostituiscilo con la tua home page autenticata tramite la prop `firstPrivateElement` su `PackageRoutes`.

## Import

```js
import { Dashboard } from 'thecore-auth';
```

## Props

`Dashboard` non accetta props. Tutti i dati vengono letti dai contesti e hook del pacchetto.

## Utilizzo

### Sostituisci con la tua pagina (consigliato)

```jsx
import { PackageRoutes } from 'thecore-auth';
import HomeDashboard from './pages/HomeDashboard';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      firstPrivateElement={<HomeDashboard />}
    />
  );
}
```

### Mantieni per sviluppo / demo

```jsx
import { PackageRoutes } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

// firstPrivateElement ha default <Dashboard /> — nessuna prop necessaria
function App() {
  return <PackageRoutes logoImg={Logo} />;
}
```

### Hook mostrati all'interno di Dashboard

Il componente dimostra i seguenti hook e contesti del pacchetto:

```js
const { logout, createAxiosInstances } = useAuth();
const { usersEndpoint } = useConfig();
const { setIsLoading } = useLoading();
const { activeAlert } = useAlert();
const { token, user } = useAuthStorage();
const { success, error, info, warning, promise } = useToast();
```

## Note

- La funzione `fetchUsers` chiama `createAxiosInstances()` per ottenere un'istanza Axios autenticata ed esegue una richiesta `GET` su `usersEndpoint`.
- Il toast `promise` avvolge una chiamata Axios e mostra automaticamente gli stati loading / success / error tramite Sileo.
- `SwitchRadio` alterna tra alert desktop (`activeAlert`) e toast mobile (`useToast`).
- `Dashboard` legge `user.email` da `useAuthStorage` — la pagina andrà in crash se renderizzata fuori da una rotta autenticata (cioè senza un utente valido nello storage).
