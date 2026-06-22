# Loader

> [English](../../../docs/components/Loader.md) | [Versión española](../../../docs/es/components/Loader.md)

## Panoramica

`Loader` è un overlay animato a schermo intero mostrato durante il caricamento iniziale dell'app. Legge `isLoading` da `LoadingContext` e `customLoginTimeout` da `ConfigContext`. L'overlay appare in fade-in all'inizio del caricamento e svanisce in fade-out (300 ms) al termine. Ad ogni mount viene scelto un gradiente casuale da una palette predefinita; la palette può essere sostituita o estesa tramite props.

## Import

```js
import { Loader } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `gradients` | `string[]` | `undefined` | No | Sostituisce l'intera lista di gradienti predefinita. Se omesso, viene usata la palette di default (più `moreGradients`) |
| `moreGradients` | `string[]` | `undefined` | No | Classi gradiente Tailwind aggiuntive aggiunte alla lista predefinita |
| `containerSize` | `string` | `'h-[420px] w-[420px]'` | No | Classi Tailwind di dimensione passate al container interno di `LogoLoader` |
| `overlayStyle` | `string` | `undefined` | No | Sostituisce le classi di posizionamento predefinite dell'overlay (`fixed top-0 … flex items-center justify-center z-999 transition-opacity duration-300`) |
| `NewLogoLoader` | `ComponentType` | `undefined` | No | Componente custom renderizzato al posto di `LogoLoader` |
| `Logo` | `ComponentType` | `undefined` | No | Componente SVG/immagine passato a `LogoLoader` come logo centrale |
| `spinnerColor` | `string` | `'#60A5FA'` | No | Colore del tratto dell'anello SVG in `LogoLoader` |

## Variabili CSS

`Loader` non usa variabili CSS. L'animazione fade si basa sulle utility Tailwind di opacità e l'animazione dell'anello SVG è definita in `src/css/loader.css`:

| Classe | Animazione |
|---|---|
| `animate-spin-slow` | Rotazione 360°, 2.2 s, lineare, infinita |

## Utilizzo

```jsx
import { Loader } from 'thecore-auth';
import MyLogo from './assets/MyLogo.svg?react';

// Posiziona una volta nella root dell'app, dentro LoadingProvider
function App({ children }) {
  return (
    <LoadingProvider>
      <Loader
        Logo={MyLogo}
        spinnerColor="#6366f1"
        containerSize="h-[300px] w-[300px]"
        moreGradients={[
          'bg-gradient-to-br from-indigo-500 via-purple-400 to-pink-300',
        ]}
      />
      {children}
    </LoadingProvider>
  );
}
```

### Sostituire l'intera area logo

```jsx
function CustomSpinner() {
  return <div className="h-20 w-20 rounded-full border-4 border-white animate-spin" />;
}

<Loader NewLogoLoader={CustomSpinner} />
```

### Estendere la palette dei gradienti

```jsx
<Loader
  moreGradients={[
    'bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-200',
    'bg-gradient-to-br from-teal-300 via-cyan-400 to-sky-500',
  ]}
  Logo={MyLogo}
/>
```

## Note

- Il gradiente viene scelto casualmente al mount tramite `Math.random()` — ogni ricarica della pagina può mostrare un gradiente diverso.
- La durata del fade-out (300 ms) è hardcoded; regolala tramite `overlayStyle` se hai bisogno di una transizione diversa.
- `Loader` è pensato per il flusso di caricamento iniziale di autenticazione/login. Per spinner in-page usa `Loading` o `LoadingComponent`.
- `customLoginTimeout` da `ConfigContext` è elencato come dipendenza dell'effect per permettere all'app host di resettare il ciclo del loader; non controlla direttamente il timeout.
