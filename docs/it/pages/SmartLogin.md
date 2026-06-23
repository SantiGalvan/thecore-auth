# SmartLogin

> [English](../../pages/SmartLogin.md) | [Español](../../es/pages/SmartLogin.md)

## Panoramica

`SmartLogin` è la pagina di login ottimizzata per PWA. Fornisce lo stesso flusso di autenticazione di `Login` ma con un insieme più ricco di controlli visivi:

- **Immagine di sfondo** con opacità e colore overlay configurabili
- **Tre varianti card**: `solid` (default), `glass`, `minimal`
- **Allineamento card**: `center`, `left`, o `right`
- **Posizione logo**: `left` (fianco a fianco su desktop) o `top` (sovrapposto)
- **Toggle password integrato** (mostra / nascondi)
- **Animazione di ingresso** al mount
- **Rilevamento orientamento responsive**: in modalità portrait il logo si sposta automaticamente sopra il form indipendentemente da `logoPosition`

`SmartLogin` gestisce il proprio stato del form e la submission — non usa internamente il componente `LoginForm` — ma legge comunque label, testo placeholder e override di stile da `LoginFormContext`.

## Import

```js
import { SmartLogin } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|------|------|---------|-----------|-------------|
| `Logo` | `React.ComponentType` | `undefined` | No | Componente SVG/immagine renderizzato come logo del brand |
| `backgroundSrc` | `string` | variabile CSS `--bg-image` | No | URL dell'immagine di sfondo. Se omesso, viene usata la variabile CSS `--bg-image` |
| `overlayOpacity` | `number` | `0.5` | No | Opacità dell'overlay colorato sopra lo sfondo (0.0–1.0) |
| `overlayColor` | `string` | `'#f1f1f1'` | No | Colore del layer overlay |
| `cardVariant` | `'solid' \| 'glass' \| 'minimal'` | `'solid'` | No | Stile visivo della card di login |
| `cardPosition` | `'center' \| 'left' \| 'right'` | `'center'` | No | Allineamento orizzontale della card nella viewport |
| `logoPosition` | `'left' \| 'top'` | `'left'` | No | Posizione del logo rispetto al form su landscape/desktop |
| `showPasswordToggle` | `boolean` | `true` | No | Mostra l'icona occhio per alternare la visibilità della password |
| `animateEntrance` | `boolean` | `true` | No | Anima lo slide-in della card al mount |

## Utilizzo

### Minimale

```jsx
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function LoginPage() {
  return <SmartLogin Logo={Logo} />;
}
```

### Personalizzazione completa

```jsx
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function LoginPage() {
  return (
    <SmartLogin
      Logo={Logo}
      backgroundSrc="/images/office-bg.jpg"
      overlayOpacity={0.6}
      overlayColor="#1a1a2e"
      cardVariant="glass"
      cardPosition="right"
      logoPosition="top"
      showPasswordToggle={true}
      animateEntrance={true}
    />
  );
}
```

### In un albero di routing personalizzato

```jsx
import { Routes, Route } from 'react-router-dom';
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

<Routes>
  <Route path="/" index element={<SmartLogin Logo={Logo} cardVariant="glass" />} />
</Routes>
```

## Note

- `SmartLogin` chiama `useViewportHeight()` per gestire il problema `100vh` dei browser mobile.
- In orientamento portrait (rilevato tramite `useOrientation`), `logoPosition` viene sovrascritto a `'top'` automaticamente.
- `clearLoginFormOnError` in `ConfigContext`: quando `true`, il campo password viene svuotato a ogni tentativo di login fallito.
- Gli override di stile (`overrideStyle` da `LoginFormContext`) si applicano a `cardForm`, `containerLogo`, `logo`, `form`, `title`, `containerEmail`, `containerPassword`, `containerButton` e `button`.
- Lo sfondo overlay e `backgroundSrc` sono renderizzati in un `div` separato (`.lp-bg`) per evitare il re-render del form durante scroll o aggiornamenti parallax.
- `SmartLogin` non supporta `autoLogin` né `AutoLoginFallback`. Usa `Login` quando è richiesto l'auto-login.
