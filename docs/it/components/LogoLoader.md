# LogoLoader

> [English](../../../docs/en/components/LogoLoader.md) | [Versión española](../../../docs/es/components/LogoLoader.md)

## Panoramica

`LogoLoader` renderizza un anello SVG circolare rotante attorno a un'immagine logo. Viene usato internamente da `Loader`, ma può essere usato in modo standalone ogni volta che serve un'animazione logo-con-anello. L'anello ruota con una rotazione lenta di 2.2 secondi definita in `src/css/loader.css`.

## Import

```js
import { LogoLoader } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `sizeContainer` | `string` | `'h-60 w-60'` | No | Classi Tailwind di dimensione per il container esterno |
| `Logo` | `ComponentType` | `undefined` | No | Componente React (tipicamente un SVG) renderizzato come logo centrale. Deve accettare una prop `className` |
| `spinnerColor` | `string` | `'#60A5FA'` | No | Valore CSS del colore per il tratto dell'anello SVG |

## Variabili CSS

`LogoLoader` non usa proprietà CSS custom. L'animazione di rotazione è definita in `src/css/loader.css`:

| Classe | Animazione |
|---|---|
| `animate-spin-slow` | Rotazione 360°, 2.2 s, lineare, infinita |

## Utilizzo

```jsx
import { LogoLoader } from 'thecore-auth';
import MyLogo from './assets/MyLogo.svg?react';

// Utilizzo standalone con dimensione e colore custom
function SplashScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-indigo-50">
      <LogoLoader
        Logo={MyLogo}
        sizeContainer="h-[200px] w-[200px]"
        spinnerColor="#6366f1"
      />
    </div>
  );
}
```

### Dimensione predefinita con logo

```jsx
<LogoLoader Logo={MyLogo} />
```

### Senza logo (solo anello)

```jsx
// La prop Logo è opzionale — renderizza solo l'anello rotante
<LogoLoader sizeContainer="h-20 w-20" spinnerColor="#f43f5e" />
```

## Note

- L'anello SVG usa `strokeDasharray="280"` e `strokeDashoffset="210"` per renderizzare un arco anziché un cerchio completo.
- Il componente `Logo` viene renderizzato all'interno di un `<figure>` con `rounded-full overflow-hidden`, quindi i logo rettangolari verranno ritagliati a cerchio.
- Importa `loader.css` (o assicurati che l'app host importi il bundle CSS di `thecore-auth`) affinché la classe `animate-spin-slow` abbia effetto.
- Quando usato all'interno di `Loader`, `sizeContainer` è controllato dalla prop `containerSize` di `Loader`.
