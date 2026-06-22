# LoginFormProvider / useLoginForm

> 🇮🇹 [Italiano](../it/contexts/LoginFormProvider.md) | 🇪🇸 [Español](../es/contexts/LoginFormProvider.md)

## Overview

`LoginFormProvider` manages the state of the login form: field values, labels, placeholder text, button copy, logo image, and card/logo styles. It wraps `AuthProvider`'s `login` function and optionally clears the form on error based on the `clearLoginFormOnError` config flag. It must be nested inside both `AuthProvider` and `ConfigProvider`.

---

## Setup

Place `LoginFormProvider` inside `AuthProvider` and `ConfigProvider`.

```jsx
import {
  ConfigProvider,
  AlertProvider,
  LoadingProvider,
  AuthProvider,
  LoginFormProvider,
} from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      <AlertProvider>
        <LoadingProvider>
          <AuthProvider>
            <LoginFormProvider>
              {/* login page components */}
            </LoginFormProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </ConfigProvider>
  );
}
```

---

## Hook API

```js
const loginForm = useLoginForm();
```

| Value | Type | Description |
|---|---|---|
| `title` | `string` | Card title (default: `'Accedi'`) |
| `setTitle` | `(value: string) => void` | Override the card title |
| `label` | `string` | Input label (default: `'Email'`) |
| `setLabel` | `(value: string) => void` | Override the input label |
| `type` | `string` | Input type (default: `'email'`) |
| `setType` | `(value: string) => void` | Override the input type (e.g. `'text'` for a username field) |
| `placeholder` | `string` | Input placeholder (default: `'example@example.it'`) |
| `setPlaceholder` | `(value: string) => void` | Override the placeholder |
| `buttonText` | `string` | Submit button label (default: `'Accedi'`) |
| `setButtonText` | `(value: string) => void` | Override the button label |
| `formData` | `{ email: string, password: string }` | Controlled form values |
| `setFormData` | `(data: object) => void` | Replace the entire form data object |
| `changeData` | `(key: string, value: string) => void` | Update a single field in `formData` |
| `handleLogin` | `(e: FormEvent) => void` | Calls `login(e, formData)` and optionally resets the form |
| `LogoImg` | `ReactElement \| undefined` | Logo component rendered above the form card |
| `setLogoImg` | `(component: ReactElement) => void` | Set the logo image/component |
| `styleCardForm` | `object \| undefined` | Style overrides for the form card container |
| `setStyleCardForm` | `(style: object) => void` | Set form card styles |
| `styleContainerLogo` | `object \| undefined` | Style overrides for the logo container |
| `setStyleContainerLogo` | `(style: object) => void` | Set logo container styles |
| `styleLogo` | `object \| undefined` | Style overrides for the logo element |
| `setStyleLogo` | `(style: object) => void` | Set logo element styles |
| `overrideStyle` | `object` | Global style override object (default: `{}`) |
| `setOverrideStyle` | `(style: object) => void` | Set global style overrides |
| `customVersion` | `string \| null` | Custom version string displayed in the login card (default: `null`, shows package version) |
| `setCustomVersion` | `(version: string \| null) => void` | Override the displayed version string |

---

## Usage

```jsx
import { useLoginForm } from 'thecore-auth';
import { useEffect } from 'react';
import MyLogo from './MyLogo';

function CustomLoginPage() {
  const {
    setTitle,
    setLabel,
    setPlaceholder,
    setButtonText,
    setLogoImg,
    handleLogin,
    formData,
    changeData,
  } = useLoginForm();

  useEffect(() => {
    // Customize the login form appearance on mount
    setTitle('Welcome back');
    setLabel('Username');
    setPlaceholder('your.username');
    setButtonText('Sign in');
    setLogoImg(<MyLogo />);
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <label>{/* label rendered by LoginForm */}</label>
      <input
        value={formData.email}
        onChange={e => changeData('email', e.target.value)}
      />
      <input
        type="password"
        value={formData.password}
        onChange={e => changeData('password', e.target.value)}
      />
      <button type="submit">Sign in</button>
    </form>
  );
}
```

---

## Notes

- `formData` uses the key `email` for the identifier field even when `type` is set to `'text'` — the key name does not change.
- `handleLogin` calls `clearLoginFormOnError ? setFormData(initialData) : undefined` after calling `login`. The form reset is unconditional (it runs before the login resolves), because clearing on error alone would require coupling to the auth result.
- `LoginForm` (the UI component) reads from this context automatically — mount it inside `LoginFormProvider` and it will be wired up with no extra props.
- `SmartLogin` wraps `LoginFormProvider` internally; you do not need to add it yourself when using `SmartLogin`.
