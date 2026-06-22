# LoginForm

> [English](../../../docs/components/LoginForm.md) | [Versione italiana](../../../docs/it/components/LoginForm.md)

## Descripción general

`LoginForm` es el formulario de credenciales renderizado dentro de la tarjeta de login. No acepta props: todo su estado (título, etiquetas, tipo de campos, placeholder, texto del botón, anulaciones de estilo) se lee de `LoginFormContext` a través de `useLoginForm()`. Para personalizar el formulario, llama a los setters expuestos por el context antes del render.

## Importación

```js
import { LoginForm } from 'thecore-auth';
```

## Props

Este componente **no acepta props**. Toda la configuración se gestiona a través de `LoginFormContext`.

| Valor del context | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `title` | `string` | `'Accedi'` | Encabezado mostrado sobre el campo email |
| `label` | `string` | `'Email'` | Texto de la etiqueta para el campo email |
| `type` | `string` | `'email'` | Tipo de input para el campo email |
| `placeholder` | `string` | `'example@example.it'` | Placeholder del input email |
| `buttonText` | `string` | `'Accedi'` | Texto del botón de envío |
| `overrideStyle` | `object` | `{}` | Anulaciones de clases por slot (ver Notas) |

## Variables CSS

Estas variables, definidas en `src/css/index.css`, controlan el aspecto visual del formulario:

| Variable | Por defecto | Descripción |
|---|---|---|
| `--basis-form` | `50%` | Flex-basis del elemento form |
| `--input-form-width` | `70%` | Ancho de cada contenedor de input |
| `--text-form-title-size` | `2.25rem` | Tamaño de fuente del título del formulario |
| `--margin-form-title` | `32px 0` | Margen alrededor del título del formulario |
| `--title-display` | `none` | Visibilidad del título (`block` para mostrarlo) |
| `--title-position` | `center` | Alineación del texto del título |
| `--justify-primary` | `center` | Justify-content de la fila del botón |
| `--padding-primary-button` | `8px 16px` | Padding del botón de envío |
| `--radius-primary-button` | `calc(infinity * 1px)` | Border radius del botón de envío |
| `--color-primary` | `#f56907` | Color de fondo del botón |
| `--color-primary-hover` | `#f88b29` | Color de fondo del botón al pasar el ratón |
| `--color-primary-text` | `#fff` | Color del texto del botón |
| `--shadow-primary` | `…` | Box-shadow del botón |
| `--shadow-primary-hover` | `…` | Box-shadow del botón al pasar el ratón |
| `--shadow-primary-active` | `…` | Box-shadow del botón al presionar |
| `--padding-input` | `10px` | Padding vertical de cada campo input |
| `--input-radius` | `8px` | Border radius de cada campo input |

## Uso

```jsx
import { LoginFormProvider, useLoginForm, LoginForm } from 'thecore-auth';

// Componente interno que configura el formulario antes del montaje
function ConfiguredForm() {
  const { setTitle, setLabel, setButtonText, setOverrideStyle } = useLoginForm();

  useEffect(() => {
    setTitle('Iniciar sesión');
    setLabel('Correo corporativo');
    setButtonText('Entrar');
    // Anular el slot botón con una clase Tailwind personalizada
    setOverrideStyle({
      button: 'bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-full',
    });
  }, []);

  return <LoginForm />;
}

// Envuelve el consumidor con el proveedor
export default function LoginPage() {
  return (
    <LoginFormProvider>
      <ConfiguredForm />
    </LoginFormProvider>
  );
}
```

## Notas

- `overrideStyle` acepta las siguientes claves de slot: `form`, `title`, `containerEmail`, `containerPassword`, `containerButton`, `button`. Cuando se establece una clave de slot, se reemplaza toda la cadena de clases predeterminada para ese slot (no se fusiona).
- El componente se usa típicamente dentro de las páginas `Login` o `SmartLogin`, que ya lo envuelven en `LoginFormProvider`.
- El campo de contraseña es siempre de tipo `password` y no es configurable a través del context.
