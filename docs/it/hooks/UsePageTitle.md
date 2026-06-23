# UsePageTitle

> [English](../../../docs/en/hooks/UsePageTitle.md) | [Versión española](../../es/hooks/UsePageTitle.md)

## Panoramica

`UsePageTitle` aggiorna automaticamente `document.title` in base alla rotta corrente. Confronta il percorso attivo con una lista di definizioni di rotte — inclusi segmenti dinamici come `/dashboard/:id` — e imposta di conseguenza il titolo del tab.

## Importazione

```js
import { UsePageTitle } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `routes` | `Array<{ path: string, title: string }>` | `[]` | Definizioni di rotte che associano un pattern di percorso a un titolo di pagina. Supporta i segmenti dinamici di React Router. |
| `defaultTitle` | `string` | `"SPOT"` | Titolo usato quando nessuna rotta corrisponde al percorso corrente. |

## Valore restituito

Questo hook non restituisce nulla (`void`). Opera solo come effetto collaterale.

## Utilizzo

```jsx
import { UsePageTitle } from 'thecore-auth';

const PAGE_TITLES = [
  { path: '/',               title: 'Login' },
  { path: '/dashboard',      title: 'Dashboard' },
  { path: '/dashboard/:id',  title: 'Task Detail' },
  { path: '/profile',        title: 'Il mio profilo' },
  { path: '/settings',       title: 'Impostazioni' },
];

function AppRoutes() {
  // Sets document.title on every navigation, falls back to "SPOT"
  UsePageTitle(PAGE_TITLES, 'SPOT');

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/:id" element={<TaskDetail />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
```

## Note

- Deve essere chiamato all'interno di un componente che è discendente di `<BrowserRouter>` (o equivalente), poiché dipende da `useLocation`.
- Usa `matchPath` con `end: true`, quindi `/dashboard` non corrisponde a `/dashboard/123`. Aggiungere voci esplicite per i segmenti dinamici quando necessario.
- L'aggiornamento avviene all'interno di `useLayoutEffect` per evitare un flash del titolo precedente durante la navigazione.
- L'hook è esportato con la `U` maiuscola (`UsePageTitle`) — ciò è intenzionale e corrisponde alla convenzione di denominazione del sorgente.
