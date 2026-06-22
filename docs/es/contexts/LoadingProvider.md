# LoadingProvider / useLoading

> 🇬🇧 [English](../../contexts/LoadingProvider.md) | 🇮🇹 [Italiano](../../it/contexts/LoadingProvider.md)

## Descripción general

`LoadingProvider` gestiona un overlay de carga global. Expone un flag booleano y helpers para mostrar el loader inmediatamente o durante una duración fija. El componente renderizado como overlay puede reemplazarse en tiempo de ejecución mediante `setLoadingComponent`.

---

## Configuración

Colocar `LoadingProvider` dentro de `ConfigProvider`. Pasar el componente de carga personalizado como `defaultComponent` si se desea sobreescribir el loader predeterminado.

```jsx
import { ConfigProvider, LoadingProvider } from 'thecore-auth';
import MySpinner from './MySpinner';

function App() {
  return (
    <ConfigProvider>
      <LoadingProvider defaultComponent={<MySpinner />}>
        {/* tu app */}
      </LoadingProvider>
    </ConfigProvider>
  );
}
```

Si se omite `defaultComponent`, se usa el loader integrado de la librería.

---

## API del hook

```js
const loading = useLoading();
```

| Valor | Tipo | Descripción |
|---|---|---|
| `isLoading` | `boolean` | Si el overlay de carga está actualmente activo |
| `setIsLoading` | `(value: boolean) => void` | Establece directamente el estado de carga |
| `loadingProps` | `object` | Props pasadas al componente de carga actual |
| `setLoadingProps` | `(props: object) => void` | Actualiza las props del componente de carga |
| `loadingComponent` | `ReactElement \| undefined` | El componente actualmente renderizado como loader |
| `setLoadingComponent` | `(component: ReactElement) => void` | Reemplaza el componente loader en tiempo de ejecución |
| `showLoadingFor` | `(duration?: number, props?: object) => void` | Muestra el loader durante `duration` ms (por defecto: 2000), luego se oculta automáticamente |

---

## Uso

```jsx
import { useLoading } from 'thecore-auth';

function SaveButton({ onSave }) {
  const { isLoading, setIsLoading, showLoadingFor } = useLoading();

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave();
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = () => {
    // Muestra el loader durante exactamente 1.5 segundos
    showLoadingFor(1500);
    performQuickAction();
  };

  return (
    <>
      <button onClick={handleSave} disabled={isLoading}>Guardar</button>
      <button onClick={handleQuickAction}>Acción rápida</button>
    </>
  );
}
```

---

## Notas

- `showLoadingFor` usa `setTimeout` internamente: después de `duration` ms, `setIsLoading(false)` se llama incondicionalmente. Si se llama `setIsLoading(false)` manualmente antes de que el timer expire, el timer seguirá disparándose pero sin efecto visible.
- `loadingProps` se resetea a `{}` en cada llamada a `showLoadingFor` (o al argumento `props` si se proporciona).
- `LoadingProvider` acepta `children` y `defaultComponent` como props. `defaultComponent` establece el valor inicial del estado `loadingComponent`.
