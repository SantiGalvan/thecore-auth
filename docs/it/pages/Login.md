# Login

> [English](../../pages/Login.md) | [Español](../../es/pages/Login.md)

## Panoramica

`Login` è la pagina di login standard. Renderizza un layout a card con il logo su un lato e `LoginForm` sull'altro. Gestisce automaticamente tre scenari:

1. **Già autenticato** — se token valido e ID utente sono presenti nello storage, l'utente viene navigato immediatamente a `firstPrivatePath + user.id`.
2. **Auto-login attivo, in attesa** — mostra uno spinner `Loading` a schermo intero mentre il flusso di auto-login è in esecuzione.
3. **Auto-login fallito** — renderizza `AutoLoginFallback` (o il `DefaultAutoLoginFallback` integrato) con l'errore.

Il form è gestito da `LoginFormContext`. Gli override di stile vengono anch'essi letti da `LoginFormContext`.

## Import

```js
import { Login } from 'thecore-auth';
```

`Login` viene renderizzato automaticamente sulla rotta `"/"` da `PackageRoutes`. L'import diretto è necessario solo per alberi di routing personalizzati.

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|------|------|---------|-----------|-------------|
| `Logo` | `React.ComponentType` | `undefined` | No | Componente SVG/immagine renderizzato nell'area logo della card |
| `AutoLoginFallback` | `React.ComponentType<{ error: unknown }>` | `DefaultAutoLoginFallback` | No | Componente mostrato quando l'auto-login fallisce; riceve l'errore come prop `error` |

## Utilizzo

### Via `PackageRoutes` (standard)

```jsx
import { PackageRoutes } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      pathImg="/assets/logo.svg"
    />
  );
}
```

### Fallback auto-login personalizzato

Per fornire un fallback custom, usa `Login` direttamente in un albero di routing personalizzato:

```jsx
import { Login } from 'thecore-auth';
import Logo from './assets/logo.svg?react';
import MyAutoLoginError from './components/MyAutoLoginError';

<Route index element={<Login Logo={Logo} AutoLoginFallback={MyAutoLoginError} />} />
```

## Note

- Il badge versione (in alto a sinistra) viene mostrato quando `version` o `customVersion` è impostato in `LoginFormContext`.
- Layout e classi di stile possono essere sovrascritti tramite `overrideStyle` di `LoginFormContext` (chiavi: `container`, `cardForm`, `containerLogo`, `logo`).
- `Login` chiama `useViewportHeight()` per correggere il problema `100vh` sui browser mobile.
- `DefaultAutoLoginFallback` è un componente interno e non viene esportato dal pacchetto.
