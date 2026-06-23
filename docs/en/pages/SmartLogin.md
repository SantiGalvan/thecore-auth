# SmartLogin

> [Italiano](../../it/pages/SmartLogin.md) | [Español](../../es/pages/SmartLogin.md)

## Overview

`SmartLogin` is the PWA-optimized login page. It provides the same authentication flow as `Login` but with a richer set of visual controls:

- **Background image** with a configurable overlay opacity and color
- **Three card variants**: `solid` (default), `glass`, `minimal`
- **Card alignment**: `center`, `left`, or `right`
- **Logo position**: `left` (side-by-side on desktop) or `top` (stacked)
- **Built-in password toggle** (show / hide)
- **Entrance animation** on mount
- **Responsive orientation detection**: on portrait mode the logo automatically moves above the form regardless of `logoPosition`

`SmartLogin` manages its own form state and submission — it does not use the `LoginForm` component internally — but it still reads labels, placeholder text, and style overrides from `LoginFormContext`.

## Import

```js
import { SmartLogin } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `Logo` | `React.ComponentType` | `undefined` | No | SVG/image component rendered as the brand logo |
| `backgroundSrc` | `string` | CSS `--bg-image` variable | No | URL of the background image. When omitted, the CSS variable `--bg-image` is used |
| `overlayOpacity` | `number` | `0.5` | No | Opacity of the color overlay on top of the background (0.0–1.0) |
| `overlayColor` | `string` | `'#f1f1f1'` | No | Color of the overlay layer |
| `cardVariant` | `'solid' \| 'glass' \| 'minimal'` | `'solid'` | No | Visual style of the login card |
| `cardPosition` | `'center' \| 'left' \| 'right'` | `'center'` | No | Horizontal alignment of the card within the viewport |
| `logoPosition` | `'left' \| 'top'` | `'left'` | No | Position of the logo relative to the form on landscape/desktop |
| `showPasswordToggle` | `boolean` | `true` | No | Show the eye icon to toggle password visibility |
| `animateEntrance` | `boolean` | `true` | No | Animate the card sliding in on mount |

## Usage

### Minimal

```jsx
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

function LoginPage() {
  return <SmartLogin Logo={Logo} />;
}
```

### Full customization

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

### In a custom routing tree

```jsx
import { Routes, Route } from 'react-router-dom';
import { SmartLogin } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

<Routes>
  <Route path="/" index element={<SmartLogin Logo={Logo} cardVariant="glass" />} />
</Routes>
```

## Notes

- `SmartLogin` calls `useViewportHeight()` to handle the mobile browser `100vh` issue.
- On portrait orientation (detected via `useOrientation`), `logoPosition` is overridden to `'top'` automatically.
- `clearLoginFormOnError` in `ConfigContext`: when `true`, the password field is cleared on every failed login attempt.
- Style overrides (`overrideStyle` from `LoginFormContext`) apply to `cardForm`, `containerLogo`, `logo`, `form`, `title`, `containerEmail`, `containerPassword`, `containerButton`, and `button`.
- Background overlay and `backgroundSrc` are rendered in a separate `div` (`.lp-bg`) to avoid re-rendering the form on scroll or parallax updates.
- `SmartLogin` does not support `autoLogin` or `AutoLoginFallback`. Use `Login` when auto-login is required.
