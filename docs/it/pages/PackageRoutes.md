# PackageRoutes

> [English](../../pages/PackageRoutes.md) | [Español](../../es/pages/PackageRoutes.md)

## Panoramica

`PackageRoutes` è il punto di ingresso principale del pacchetto `thecore-auth`. Monta l'intero albero di routing — rotte pubbliche, rotte private protette e lo shell di layout — in un unico `<Routes>`. Internamente:

- legge le rotte pubbliche e private iniettate da `RouteContext`
- legge la configurazione runtime da `ConfigContext`
- imposta il favicon del browser tramite la prop `pathImg`
- aggiorna il `<title>` della pagina tramite `UsePageTitle`
- costruisce il layer di layout (`DefaultLayout`, un elemento custom, o `null`)
- avvolge le rotte private con `AuthPage` e provider aggiuntivi opzionali

## Import

```js
import { PackageRoutes } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|------|------|---------|-----------|-------------|
| `logoImg` | `React.ComponentType` | SVG integrato | No | Logo SVG renderizzato nella pagina di login |
| `pathImg` | `string` | `'./src/assets/MyWarehouse.svg'` | No | Percorso scritto su `<link rel="icon">` al mount |
| `firstPrivateElement` | `ReactElement` | `<Dashboard />` | No | Componente renderizzato alla prima rotta privata |
| `globalLayout` | `ReactElement \| 'none'` | `DefaultLayout` | No | Override dello shell di layout. Passa `'none'` per rimuoverlo |
| `isMain` | `boolean` | `true` | No | Passato a `DefaultLayout`. Avvolge l'outlet in `<main>` se `true` |
| `headerComponent` | `ReactElement` | `null` | No | Header renderizzato sopra l'outlet |
| `showHeaderOnLogin` | `boolean` | `false` | No | Mostra l'header nella pagina di login (`/`) |
| `headerExcludedRoutes` | `string[]` | `[]` | No | Pattern di rotte in cui l'header viene nascosto |
| `footerComponent` | `ReactElement` | `null` | No | Footer renderizzato sotto l'outlet |
| `showFooterOnLogin` | `boolean` | `false` | No | Mostra il footer nella pagina di login |
| `footerExcludedRoutes` | `string[]` | `[]` | No | Pattern di rotte in cui il footer viene nascosto |
| `privateProvider` | `ReactElement` | `undefined` | No | Provider aggiuntivo che avvolge l'outlet privato (strato più esterno) |
| `customProvider` | `ReactElement` | `undefined` | No | Provider aggiuntivo che avvolge `AuthPage` (strato interno) |
| `promptComponent` | `ReactElement` | `null` | No | Componente prompt di installazione PWA, renderizzato quando `pwa.customPrompt` è abilitato nella config |

## Utilizzo

```jsx
import { PackageRoutes } from 'thecore-auth';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import HomeDashboard from './pages/HomeDashboard';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      pathImg="/assets/logo.svg"
      firstPrivateElement={<HomeDashboard />}
      headerComponent={<AppHeader />}
      showHeaderOnLogin={false}
      headerExcludedRoutes={['/maintenance']}
      footerComponent={<AppFooter />}
      showFooterOnLogin={false}
    />
  );
}

export default App;
```

### Con provider personalizzati

```jsx
import { ThemeProvider } from './contexts/ThemeContext';
import { PermissionProvider } from './contexts/PermissionContext';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      privateProvider={<ThemeProvider />}
      customProvider={<PermissionProvider />}
      firstPrivateElement={<HomeDashboard />}
    />
  );
}
```

L'ordine di annidamento per le rotte private è:
`privateProvider > customProvider > AuthPage > Outlet`

## Note

- `PackageRoutes` deve essere renderizzato all'interno di un `<BrowserRouter>` React Router (o equivalente) e all'interno dello stack di contesti di `thecore-auth` (vedi `ConfigProvider`, `AuthProvider`, ecc.).
- L'albero delle rotte pubbliche è radicato a `"/"`. Quello privato è radicato a `firstPrivatePath` (da `ConfigContext`) con il segmento `:id` finale.
- Per usare `SmartLogin` al posto di `Login` sulla rotta index, scambia la riga commentata nel sorgente del componente — oppure fornisci una rotta pubblica custom via `RouteContext`.
- `globalLayout="none"` disabilita `Loading`, `Alert`, `Modal` e `Toaster` a meno che non li cablii tu stesso.
