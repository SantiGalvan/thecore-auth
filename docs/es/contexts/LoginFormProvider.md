# LoginFormProvider / useLoginForm

> 🇬🇧 [English](../../contexts/LoginFormProvider.md) | 🇮🇹 [Italiano](../../it/contexts/LoginFormProvider.md)

## Descripción general

`LoginFormProvider` gestiona el estado del formulario de login: valores de campos, etiquetas, placeholder, texto del botón, imagen de logo y estilos de la card/logo. Envuelve la función `login` de `AuthProvider` y, opcionalmente, limpia el formulario en caso de error según el flag `clearLoginFormOnError` en config. Debe anidarse dentro de `AuthProvider` y `ConfigProvider`.

---

## Configuración

Colocar `LoginFormProvider` dentro de `AuthProvider` y `ConfigProvider`.

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
              {/* componentes de la página de login */}
            </LoginFormProvider>
          </AuthProvider>
        </LoadingProvider>
      </AlertProvider>
    </ConfigProvider>
  );
}
```

---

## API del hook

```js
const loginForm = useLoginForm();
```

| Valor | Tipo | Descripción |
|---|---|---|
| `title` | `string` | Título de la card (por defecto: `'Accedi'`) |
| `setTitle` | `(value: string) => void` | Sobreescribe el título de la card |
| `label` | `string` | Etiqueta del input (por defecto: `'Email'`) |
| `setLabel` | `(value: string) => void` | Sobreescribe la etiqueta del input |
| `type` | `string` | Tipo del input (por defecto: `'email'`) |
| `setType` | `(value: string) => void` | Sobreescribe el tipo de input (ej. `'text'` para un campo username) |
| `placeholder` | `string` | Placeholder del input (por defecto: `'example@example.it'`) |
| `setPlaceholder` | `(value: string) => void` | Sobreescribe el placeholder |
| `buttonText` | `string` | Etiqueta del botón de envío (por defecto: `'Accedi'`) |
| `setButtonText` | `(value: string) => void` | Sobreescribe la etiqueta del botón |
| `formData` | `{ email: string, password: string }` | Valores controlados del formulario |
| `setFormData` | `(data: object) => void` | Reemplaza el objeto formData completo |
| `changeData` | `(key: string, value: string) => void` | Actualiza un único campo en `formData` |
| `handleLogin` | `(e: FormEvent) => void` | Llama a `login(e, formData)` y opcionalmente resetea el formulario |
| `LogoImg` | `ReactElement \| undefined` | Componente logo renderizado sobre la card del formulario |
| `setLogoImg` | `(component: ReactElement) => void` | Establece la imagen/componente logo |
| `styleCardForm` | `object \| undefined` | Sobreescrituras de estilo para el contenedor de la card del formulario |
| `setStyleCardForm` | `(style: object) => void` | Establece los estilos de la card del formulario |
| `styleContainerLogo` | `object \| undefined` | Sobreescrituras de estilo para el contenedor del logo |
| `setStyleContainerLogo` | `(style: object) => void` | Establece los estilos del contenedor del logo |
| `styleLogo` | `object \| undefined` | Sobreescrituras de estilo para el elemento logo |
| `setStyleLogo` | `(style: object) => void` | Establece los estilos del elemento logo |
| `overrideStyle` | `object` | Objeto de sobreescritura global de estilos (por defecto: `{}`) |
| `setOverrideStyle` | `(style: object) => void` | Establece las sobreescrituras globales de estilos |
| `customVersion` | `string \| null` | Cadena de versión personalizada mostrada en la card (por defecto: `null`, muestra la versión del paquete) |
| `setCustomVersion` | `(version: string \| null) => void` | Sobreescribe la cadena de versión mostrada |

---

## Uso

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
    // Personalizar la apariencia del formulario de login al montar
    setTitle('Bienvenido de nuevo');
    setLabel('Nombre de usuario');
    setPlaceholder('tu.usuario');
    setButtonText('Iniciar sesión');
    setLogoImg(<MyLogo />);
  }, []);

  return (
    <form onSubmit={handleLogin}>
      <input
        value={formData.email}
        onChange={e => changeData('email', e.target.value)}
      />
      <input
        type="password"
        value={formData.password}
        onChange={e => changeData('password', e.target.value)}
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
```

---

## Notas

- `formData` usa la clave `email` para el campo identificador incluso cuando `type` se establece a `'text'` — el nombre de la clave no cambia.
- `handleLogin` llama a `clearLoginFormOnError ? setFormData(initialData) : undefined` después de llamar a `login`. El reseteo del formulario es incondicional (ocurre antes de que el login se resuelva).
- `LoginForm` (el componente UI) lee de este contexto automáticamente — montarlo dentro de `LoginFormProvider` es suficiente sin props adicionales.
- `SmartLogin` incluye `LoginFormProvider` internamente; no es necesario añadirlo manualmente al usar `SmartLogin`.
