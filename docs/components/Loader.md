# Loader

> [Versione italiana](../../docs/it/components/Loader.md) | [Versión española](../../docs/es/components/Loader.md)

## Overview

`Loader` is a full-screen animated overlay shown during initial app load. It reads `isLoading` from `LoadingContext` and `customLoginTimeout` from `ConfigContext`. The overlay fades in when loading starts and fades out (300 ms) when loading ends. A random gradient is picked from a built-in palette on each mount; the palette can be replaced or extended via props.

## Import

```js
import { Loader } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `gradients` | `string[]` | `undefined` | No | Replaces the entire built-in gradient list. If omitted, the default palette (plus `moreGradients`) is used |
| `moreGradients` | `string[]` | `undefined` | No | Additional Tailwind gradient classes appended to the built-in list |
| `containerSize` | `string` | `'h-[420px] w-[420px]'` | No | Tailwind size classes passed to the inner `LogoLoader` container |
| `overlayStyle` | `string` | `undefined` | No | Replaces the default overlay positioning classes (`fixed top-0 … flex items-center justify-center z-999 transition-opacity duration-300`) |
| `NewLogoLoader` | `ComponentType` | `undefined` | No | Custom component rendered instead of `LogoLoader` |
| `Logo` | `ComponentType` | `undefined` | No | SVG/image component passed to `LogoLoader` as the centered logo |
| `spinnerColor` | `string` | `'#60A5FA'` | No | Stroke color of the SVG ring in `LogoLoader` |

## CSS Variables

`Loader` itself does not use CSS variables. The fade animation relies on Tailwind opacity utilities and the SVG ring animation is defined in `src/css/loader.css`:

| Class | Animation |
|---|---|
| `animate-spin-slow` | 360° rotation, 2.2 s, linear, infinite |

## Usage

```jsx
import { Loader } from 'thecore-auth';
import MyLogo from './assets/MyLogo.svg?react';

// Place once at the root of your app, inside LoadingProvider
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

### Replace the entire logo area

```jsx
function CustomSpinner() {
  return <div className="h-20 w-20 rounded-full border-4 border-white animate-spin" />;
}

<Loader NewLogoLoader={CustomSpinner} />
```

### Extend the gradient palette

```jsx
<Loader
  moreGradients={[
    'bg-gradient-to-br from-rose-400 via-orange-300 to-yellow-200',
    'bg-gradient-to-br from-teal-300 via-cyan-400 to-sky-500',
  ]}
  Logo={MyLogo}
/>
```

## Notes

- The gradient is chosen randomly at mount time using `Math.random()` — each page refresh may display a different gradient.
- The fade-out duration (300 ms) is hardcoded; adjust via `overlayStyle` if you need a different transition length.
- `Loader` is designed for the initial authentication/login loading flow. For in-page spinners, use `Loading` or `LoadingComponent` instead.
- `customLoginTimeout` from `ConfigContext` is listed as an effect dependency to allow the host app to reset the loader cycle; it does not directly control the timeout.
