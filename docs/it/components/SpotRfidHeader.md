# SpotRfidHeader

> [English](../../../docs/en/components/SpotRfidHeader.md) | [Versión española](../../es/components/SpotRfidHeader.md)

> ⚠️ **Esportato come `Header`** da `thecore-auth`. Importare con: `import { Header } from 'thecore-auth'`

## Panoramica

`SpotRfidHeader` è la barra di navigazione superiore per le applicazioni SPOT RFID. Mostra un'area logo, il titolo della pagina corrente e un pulsante contestuale — logout (sulla route home quando il login automatico è disabilitato) o navigazione indietro (sulle route non-home quando `showHeaderButton` è attivo).

L'header si nasconde automaticamente durante il caricamento globale. Logo, titolo e visibilità del pulsante sono gestiti dai context interni della libreria.

## Import

```jsx
import { Header } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `Logo` | `React component` | `undefined` | — | Componente SVG (funzione) renderizzato come logo dell'header. Ha priorità su `logo`. |
| `logo` | `string` | `undefined` | — | URL di un'immagine da renderizzare come logo. Usato quando `Logo` non è fornito. Se nessuno dei due è presente, viene usato il logo MyTrack predefinito. |

## Variabili CSS

| Variabile | Default | Descrizione |
|---|---|---|
| `--header-height` | `60px` | Altezza della barra header |
| `--width-logo-size` | `48px` | Larghezza del logo nell'header |

## Utilizzo

```jsx
import { Header } from 'thecore-auth';
import CompanyLogo from './assets/company-logo.svg?react';

// Option 1: SVG component (recommended — avoids extra HTTP request)
function App() {
  return (
    <div>
      <Header Logo={CompanyLogo} />
      <main>{/* contenuto pagina */}</main>
    </div>
  );
}

// Option 2: image URL
function App() {
  return (
    <div>
      <Header logo="/assets/company-logo.png" />
      <main>{/* contenuto pagina */}</main>
    </div>
  );
}

// Option 3: default logo (no props needed)
function App() {
  return (
    <div>
      <Header />
      <main>{/* contenuto pagina */}</main>
    </div>
  );
}
```

## Note

- Il pulsante logout appare solo quando `autoLogin` è `false` (da `useConfig`) **e** la route corrente corrisponde a `home/:id`.
- Il pulsante indietro appare solo quando la route corrente **non** corrisponde a `home/:id` e `showHeaderButton` è `true` (da `useConfig`).
- Il pulsante indietro chiama `navigate(-1)` di React Router — dipende dalla disponibilità della cronologia del browser.
- Il titolo centrale proviene da `configRoutes` (via `useConfig`); se nessuna route corrisponde, viene usato `firstPrivateTitle`.
- Richiede `AuthProvider`, `AlertProvider`, `ConfigProvider` e `LoadingProvider` nell'albero dei componenti.
