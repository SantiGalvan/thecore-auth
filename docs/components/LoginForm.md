# LoginForm

> [Versione italiana](../../docs/it/components/LoginForm.md) | [Versión española](../../docs/es/components/LoginForm.md)

## Overview

`LoginForm` is the credential form rendered inside the login card. It has no props: all its state (title, labels, field types, placeholder, button text, style overrides) is consumed from `LoginFormContext` via `useLoginForm()`. Customize the form by calling the setters exposed by the context before rendering.

## Import

```js
import { LoginForm } from 'thecore-auth';
```

## Props

This component accepts **no props**. All configuration is handled through `LoginFormContext`.

| Context value | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | `'Accedi'` | Heading displayed above the email field |
| `label` | `string` | `'Email'` | Label text for the email input |
| `type` | `string` | `'email'` | Input type for the email field |
| `placeholder` | `string` | `'example@example.it'` | Placeholder for the email input |
| `buttonText` | `string` | `'Accedi'` | Text displayed in the submit button |
| `overrideStyle` | `object` | `{}` | Per-slot class overrides (see Notes) |

## CSS Variables

These variables, defined in `src/css/index.css`, control the visual appearance of the form:

| Variable | Default | Description |
|---|---|---|
| `--basis-form` | `50%` | Flex-basis of the form element |
| `--input-form-width` | `70%` | Width of each input container |
| `--text-form-title-size` | `2.25rem` | Font size of the form title |
| `--margin-form-title` | `32px 0` | Margin around the form title |
| `--title-display` | `none` | Whether the title is visible (`block` to show) |
| `--title-position` | `center` | Text alignment of the title |
| `--justify-primary` | `center` | Justify-content for the button row |
| `--padding-primary-button` | `8px 16px` | Padding of the submit button |
| `--radius-primary-button` | `calc(infinity * 1px)` | Border radius of the submit button |
| `--color-primary` | `#f56907` | Button background color |
| `--color-primary-hover` | `#f88b29` | Button hover background color |
| `--color-primary-text` | `#fff` | Button text color |
| `--shadow-primary` | `…` | Button box-shadow |
| `--shadow-primary-hover` | `…` | Button box-shadow on hover |
| `--shadow-primary-active` | `…` | Button box-shadow on press |
| `--padding-input` | `10px` | Vertical padding of each input field |
| `--input-radius` | `8px` | Border radius of each input field |

## Usage

```jsx
import { LoginFormProvider, useLoginForm, LoginForm } from 'thecore-auth';

// Inner component that configures the form before it mounts
function ConfiguredForm() {
  const { setTitle, setLabel, setButtonText, setOverrideStyle } = useLoginForm();

  useEffect(() => {
    setTitle('Sign in');
    setLabel('Work email');
    setButtonText('Log in');
    // Override the button slot with a custom Tailwind class
    setOverrideStyle({
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full',
    });
  }, []);

  return <LoginForm />;
}

// Wrap the consumer with the provider
export default function LoginPage() {
  return (
    <LoginFormProvider>
      <ConfiguredForm />
    </LoginFormProvider>
  );
}
```

## Notes

- `overrideStyle` accepts the following slot keys: `form`, `title`, `containerEmail`, `containerPassword`, `containerButton`, `button`. When a slot key is set, the entire default class string for that slot is replaced (not merged).
- The component is typically used inside the `Login` or `SmartLogin` page, which already wraps it in `LoginFormProvider`.
- The password field is always of type `password` and is not configurable via context.
