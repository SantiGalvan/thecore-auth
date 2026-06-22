# CSS Variables — thecore-auth

> 🇮🇹 [Variabili CSS in Italiano](./it/css-variables.md) | 🇪🇸 [Variables CSS en Español](./es/css-variables.md)

All visual aspects of `thecore-auth` are controlled through CSS custom properties (variables).
Override them in your own `:root {}` block after importing the package CSS to adapt the look to your brand.

## Setup

### 1. Import the package CSS

In your main CSS file (e.g. `src/index.css`):

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');
```

Or in `src/main.jsx`:

```jsx
import 'thecore-auth/dist/thecore-auth.css';
```

### 2. Override the variables

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-text: #ffffff;
  --height-card-form: 60vh;
}
```

Changes apply instantly to all components that use those variables — no rebuild required.

---

## Variables Reference

### Primary Color & Button

Controls the brand color used across buttons and interactive elements.

| Variable | Default | Description |
|----------|---------|-------------|
| `--color-primary` | `#f56907` | Main brand color |
| `--color-primary-hover` | `#f88b29` | Brand color on hover |
| `--color-primary-text` | `#fff` | Text color on primary-colored elements |
| `--shadow-primary` | `0 4px 10px rgba(245,105,7,0.3)…` | Box shadow for primary elements |
| `--shadow-primary-hover` | `0 6px 14px rgba(245,105,7,0.4)…` | Box shadow on hover |
| `--shadow-primary-active` | `0 2px 5px rgba(245,105,7,0.3)` | Box shadow on active/press |
| `--shadow-primary-input` | `inset 0 1px 1px …, 0 0 8px rgba(245,105,7,0.6)` | Focus ring shadow on inputs |
| `--padding-primary-button` | `8px 16px` | Padding of the login submit button |
| `--margin-primary-button` | `20px 0px` | Margin around the login submit button |
| `--radius-primary-button` | `calc(infinity * 1px)` | Border radius of the login submit button (pill by default) |
| `--justify-primary` | `center` | Horizontal alignment of the login button (`flex-start`, `center`, `flex-end`) |

---

### Login Card — Dimensions

Controls the size and shape of the login card that contains the logo and form.

| Variable | Default | Description |
|----------|---------|-------------|
| `--height-card-form` | `70vh` | Card height on desktop |
| `--height-card-form-landscape` | `80vh` | Card height in landscape orientation |
| `--width-card-form` | `85vw` | Card width |
| `--max-width-card-form` | `1136px` | Maximum card width |
| `--border-form-size` | `2px` | Card border width |
| `--form-radius` | `2em` | Card border radius |

---

### Login Card — Colors

Controls the background and border color of the login card.

| Variable | Default | Description |
|----------|---------|-------------|
| `--color-form` | `#fff` | Card background color |
| `--color-form-border` | `#D3D3D3` | Card border color |

---

### Input Styling

Controls the appearance of form inputs inside the login card.

| Variable | Default | Description |
|----------|---------|-------------|
| `--color-input-bg` | `#f9fafb` | Input background color |
| `--color-input-border` | `#d1d5db` | Input border color |
| `--color-input-text` | `#111827` | Input text color |
| `--padding-input` | `10px` | Input internal padding (controls input height) |
| `--input-radius` | `8px` | Input border radius |
| `--text-input-label` | `14px` | Font size of input labels |
| `--text-input-placeholder` | `14px` | Font size of input placeholder text |
| `--color-color-label` | `#111827` | Text color of input labels |
| `--label-display` | `block` | Label visibility: `block` shows it, `none` hides it |

---

### Form Layout

Controls the internal proportions of the form section inside the card.

| Variable | Default | Description |
|----------|---------|-------------|
| `--basis-form` | `50%` | Width of the form section (flex-basis) |
| `--input-form-width` | `70%` | Width of each input field relative to the form |
| `--margin-input-form` | `16px 0` | Vertical margin between input fields |

---

### Form Title

Controls the title text displayed above the form fields.

| Variable | Default | Description |
|----------|---------|-------------|
| `--text-form-title-size` | `2.25rem` | Title font size |
| `--margin-form-title` | `32px 0` | Margin above and below the title |
| `--title-display` | `none` | Title visibility: `block` shows it, `none` hides it |
| `--title-position` | `center` | Title text alignment (`left`, `center`, `right`) |

---

### Login Background

Controls the background image displayed behind the login card.

| Variable | Default | Description |
|----------|---------|-------------|
| `--bg-image` | `url(../assets/login-background.svg)` | Background image of the login page (`url(…)` or `none`) |

---

### Login Logo

Controls the size of the logo displayed inside the login card.

| Variable | Default | Description |
|----------|---------|-------------|
| `--login-logo-width` | `40vw` | Logo width in portrait/desktop |
| `--login-logo-max-width` | `300px` | Maximum logo width in portrait/desktop |
| `--login-logo-landscape-width` | `20vw` | Logo width in landscape orientation |
| `--login-logo-landscape-max-width` | `250px` | Maximum logo width in landscape orientation |

---

### Alert Colors

Controls the color palette of the four alert types: `danger`, `info`, `success`, and `warning`.
Each type has four variants: background, text, hover background, and progress bar.

| Variable | Default | Description |
|----------|---------|-------------|
| `--color-danger` | `#FEE2E2` | Danger alert background |
| `--color-danger-text` | `#B91C1C` | Danger alert text color |
| `--color-danger-hover` | `#FECACA` | Danger alert hover background |
| `--color-danger-progress` | `#F87171` | Danger alert progress bar color |
| `--color-info` | `#EFF6FF` | Info alert background |
| `--color-info-text` | `#1D4ED8` | Info alert text color |
| `--color-info-hover` | `#BFDBFE` | Info alert hover background |
| `--color-info-progress` | `#60A5FA` | Info alert progress bar color |
| `--color-success` | `#ECFDF5` | Success alert background |
| `--color-success-text` | `#15803D` | Success alert text color |
| `--color-success-hover` | `#A7F3D0` | Success alert hover background |
| `--color-success-progress` | `#34D399` | Success alert progress bar color |
| `--color-warning` | `#F9FAEB` | Warning alert background |
| `--color-warning-text` | `#D97706` | Warning alert text color |
| `--color-warning-hover` | `#FDE047` | Warning alert hover background |
| `--color-warning-progress` | `#FACC15` | Warning alert progress bar color |

---

### Loading Component

Controls the appearance of the full-screen loading overlay.

| Variable | Default | Description |
|----------|---------|-------------|
| `--color-loading-bg` | `#4B556366` | Background color of the loading overlay (supports alpha) |
| `--color-spinner` | `#fff` | Spinner icon color |

---

### SPOT RFID Components

Variables for the SPOT RFID component family (`SpotRfidHeader`, `InputGroup`, `CardInputTag`, `CardInputRange`).

| Variable | Default | Description |
|----------|---------|-------------|
| `--header-height` | `60px` | Height of the `SpotRfidHeader` component |
| `--width-logo-size` | `48px` | Width of the logo inside `SpotRfidHeader` |
| `--color-primary-accent` | `#f56907` | Accent color used in `CardInputRange` |
| `--color-save-button` | `#16A34A` | Save button color in `CardInputRange` |
| `--color-write-button` | `#0284C7` | Write button color in `CardInputTag` |
| `--color-focus-ring` | `#f5690780` | Focus ring color for SPOT RFID inputs |
| `--color-focus-error` | `rgba(255,0,0,0.5)` | Error focus ring color |
| `--color-spot-rfid-input-border` | `#f56907` | Border color of SPOT RFID inputs |
| `--shadow-spot-rfid-input` | `0 0 0 4px var(--color-focus-ring)` | Box shadow on SPOT RFID input focus |
| `--shadow-spot-rfid-error` | `0 0 0 4px var(--color-focus-error)` | Box shadow on SPOT RFID input error |

---

## Full Example

A complete `:root` override block for a custom brand:

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');

:root {
  /* Brand colors */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-text: #ffffff;

  /* Login card */
  --height-card-form: 65vh;
  --form-radius: 1.5rem;
  --color-form: #f8fafc;

  /* Inputs */
  --input-radius: 0.5rem;
  --padding-input: 12px;

  /* Alerts */
  --color-danger: #fef2f2;
  --color-success: #f0fdf4;
  --color-info: #eff6ff;
  --color-warning: #fffbeb;

  /* Loading */
  --color-spinner: #6366f1;
}
```
