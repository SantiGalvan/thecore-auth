# Dashboard

> [English](../../pages/Dashboard.md) | [Italiano](../../it/pages/Dashboard.md)

## Descripción general

`Dashboard` es el marcador de posición integrado para la primera ruta privada. Se usa como valor por defecto de `firstPrivateElement` en `PackageRoutes` y sirve como sandbox de desarrollo y demo en vivo de las características principales del paquete:

- Visualización de email de usuario y logout
- Notificaciones alert y toast (success, error, info, warning, basadas en promesas)
- Switch de modo de notificación Desktop / Mobile mediante `SwitchRadio`
- Llamada API autenticada (obtiene la lista de usuarios via `usersEndpoint` de la config)
- Ejemplo de integración de calendario

**Este componente no está destinado a uso en producción.** Reemplázalo con tu propia página de inicio autenticada mediante la prop `firstPrivateElement` en `PackageRoutes`.

## Importación

```js
import { Dashboard } from 'thecore-auth';
```

## Props

`Dashboard` no acepta props. Todos los datos se leen desde los contextos y hooks del paquete.

## Uso

### Reemplaza con tu propia página (recomendado)

```jsx
import { PackageRoutes } from 'thecore-auth';
import HomeDashboard from './pages/HomeDashboard';
import Logo from './assets/logo.svg?react';

function App() {
  return (
    <PackageRoutes
      logoImg={Logo}
      firstPrivateElement={<HomeDashboard />}
    />
  );
}
```

### Mantener para desarrollo / demo

```jsx
import { PackageRoutes } from 'thecore-auth';
import Logo from './assets/logo.svg?react';

// firstPrivateElement tiene por defecto <Dashboard /> — no se necesita prop
function App() {
  return <PackageRoutes logoImg={Logo} />;
}
```

### Hooks mostrados dentro de Dashboard

El componente demuestra los siguientes hooks y contextos del paquete:

```js
const { logout, createAxiosInstances } = useAuth();
const { usersEndpoint } = useConfig();
const { setIsLoading } = useLoading();
const { activeAlert } = useAlert();
const { token, user } = useAuthStorage();
const { success, error, info, warning, promise } = useToast();
```

## Notas

- La función `fetchUsers` llama a `createAxiosInstances()` para obtener una instancia Axios autenticada y realiza una petición `GET` a `usersEndpoint`.
- El toast `promise` envuelve una llamada Axios y muestra automáticamente los estados loading / success / error mediante Sileo.
- `SwitchRadio` alterna entre alertas de escritorio (`activeAlert`) y toasts móviles (`useToast`).
- `Dashboard` lee `user.email` de `useAuthStorage` — la página fallará si se renderiza fuera de una ruta autenticada (es decir, sin un usuario válido en el almacenamiento).
