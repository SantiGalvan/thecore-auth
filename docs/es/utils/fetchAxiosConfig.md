# fetchAxiosConfig

> [English](../../utils/fetchAxiosConfig.md) | [Versione italiana](../../it/utils/fetchAxiosConfig.md)

## Descripción general

`fetchAxiosConfig` es una factory asíncrona que crea y almacena en caché una instancia [Axios](https://axios-http.com/) preconfigurada. Lee `baseURL` y los mensajes de error desde `/config.json`, inyecta automáticamente el token JWT de acceso desde `localStorage` en cada petición y gestiona los errores HTTP `401`, `404` y genéricos a través de un único response interceptor.

La instancia es un singleton: llamar a `fetchAxiosConfig` varias veces siempre devuelve la misma instancia Axios sin volver a leer la configuración ni registrar los interceptores de nuevo.

## Importación

```js
import { fetchAxiosConfig } from 'thecore-auth';
```

## Funciones

### `fetchAxiosConfig(alert, onUnauthorized, onNotFound, onGenericError)`

Crea (o devuelve de la caché) la instancia Axios configurada para la aplicación actual.

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `alert` | `(type: string, message: string) => void` \| `undefined` | Callback invocado para mostrar una notificación de error. `type` es siempre `'danger'`. Típicamente la función `alert` de `useAlert`. |
| `onUnauthorized` | `() => void` \| `undefined` | Llamado cuando se recibe una respuesta `401`. Úsalo para redirigir al usuario a la página de login. |
| `onNotFound` | `(error: AxiosError) => void` \| `undefined` | Llamado cuando se recibe una respuesta `404`. |
| `onGenericError` | `(error: AxiosError) => void` \| `undefined` | Llamado para cualquier otro estado de error HTTP. |

**Devuelve:** `Promise<AxiosInstance>` — la instancia Axios singleton configurada.

**Estructura del archivo de config** (`/config.json`):

```json
{
  "baseUri": "https://api.example.com",
  "axiosErrors": {
    "unauthorized": "Sesión expirada. Inicia sesión de nuevo.",
    "notFound": "El recurso solicitado no fue encontrado.",
    "defaultMessage": "Se produjo un error."
  }
}
```

**Comportamiento del request interceptor:**
- Lee `accessToken` desde `localStorage` (almacenado como cadena JSON).
- Si existe el token, establece `Authorization: Bearer <token>` en la petición.
- Si no existe ningún token y no hay ya un header `Authorization`, lo elimina por completo.

**Comportamiento del response interceptor:**

| Estado | Acción |
|--------|--------|
| `401` | Elimina `accessToken` de `localStorage`, llama a `alert('danger', unauthorized)`, llama a `onUnauthorized()` |
| `404` | Llama a `alert('danger', notFound)`, llama a `onNotFound(error)` |
| Otros errores | Llama a `alert('danger', defaultMessage + status + data.error)`, llama a `onGenericError(error)` |

Todos los casos de error rechazan de nuevo la promise, de modo que el `.catch()` / `try-catch` del llamante sigue ejecutándose.

```js
const axios = await fetchAxiosConfig(
  (type, msg) => showToast(type, msg),
  () => navigate('/login'),
  (err) => console.warn('Not found', err),
  (err) => console.error('Server error', err),
);

const { data } = await axios.get('/users/me');
```

---

## Uso

```jsx
import { fetchAxiosConfig, useAlert, useAuth } from 'thecore-auth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function UserProfile() {
  const { alert } = useAlert();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const axios = await fetchAxiosConfig(
        alert,
        () => navigate('/login'),   // redirige al login en 401
        (err) => console.warn('Not found:', err.response?.config?.url),
        (err) => console.error('Error inesperado:', err),
      );

      const { data } = await axios.get('/users/me');
      setProfile(data);
    };

    loadProfile();
  }, []);

  if (!profile) return <p>Cargando...</p>;

  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.email}</p>
    </div>
  );
}
```

## Notas

- **Patrón singleton**: la instancia se crea una sola vez por carga de página. Si necesitas distintos `baseURL` o interceptores para diferentes servicios, ten en cuenta que la implementación actual usa una única variable a nivel de módulo: todos los llamantes comparten la misma instancia.
- **Fuente del token**: el token se lee desde `localStorage` en cada petición (dentro del request interceptor), por lo que los refresh del token se reflejan automáticamente sin recrear la instancia.
- **Errores de configuración**: si `/config.json` no puede obtenerse o analizarse, la factory registra el error en consola y devuelve `undefined`. En los llamantes, verifica el valor devuelto antes de usarlo.
- **Todos los parámetros callback son opcionales**: pasa `undefined` para los manejadores que no necesites. El interceptor usa optional chaining (`?.`) para todas las callbacks.
- La factory depende de `/config.json` servido en la raíz del servidor dev/prod. En los tests, mockea `fetch` o proporciona un archivo de config local.
