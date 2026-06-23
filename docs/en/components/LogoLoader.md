# LogoLoader

> [Versione italiana](../../docs/it/components/LogoLoader.md) | [Versión española](../../docs/es/components/LogoLoader.md)

## Overview

`LogoLoader` renders a circular SVG spinner ring around a logo image. It is used internally by `Loader`, but can be used standalone whenever a logo-plus-ring animation is needed. The ring rotates with a slow 2.2-second spin defined in `src/css/loader.css`.

## Import

```js
import { LogoLoader } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `sizeContainer` | `string` | `'h-60 w-60'` | No | Tailwind size classes for the outer container |
| `Logo` | `ComponentType` | `undefined` | No | React component (typically an SVG) rendered as the centered logo. Must accept a `className` prop |
| `spinnerColor` | `string` | `'#60A5FA'` | No | CSS color value for the SVG ring stroke |

## CSS Variables

`LogoLoader` does not consume CSS custom properties. The spin animation is defined in `src/css/loader.css`:

| Class | Animation |
|---|---|
| `animate-spin-slow` | 360° rotation, 2.2 s, linear, infinite |

## Usage

```jsx
import { LogoLoader } from 'thecore-auth';
import MyLogo from './assets/MyLogo.svg?react';

// Standalone usage with a custom size and color
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

### Default size with logo

```jsx
<LogoLoader Logo={MyLogo} />
```

### No logo (ring only)

```jsx
// Logo prop is optional — render just the spinning ring
<LogoLoader sizeContainer="h-20 w-20" spinnerColor="#f43f5e" />
```

## Notes

- The SVG ring uses `strokeDasharray="280"` and `strokeDashoffset="210"` to render an arc rather than a full circle.
- The `Logo` component is rendered inside a `<figure>` with `rounded-full overflow-hidden`, so rectangular logos will be cropped to a circle.
- Import `loader.css` (or ensure the host app imports `thecore-auth`'s CSS bundle) for the `animate-spin-slow` class to take effect.
- When used inside `Loader`, the `sizeContainer` is controlled by `Loader`'s `containerSize` prop.
