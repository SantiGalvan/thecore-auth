# AlertProvider / useAlert

> 🇬🇧 [English](../../contexts/AlertProvider.md) | 🇮🇹 [Italiano](../../it/contexts/AlertProvider.md)

## Descripción general

`AlertProvider` gestiona las notificaciones dentro de la aplicación. En escritorio renderiza un banner de alerta; en móvil/tablet usa notificaciones toast de Sileo (cuando `sileoToastEnabled: true` en config). Se admiten cuatro tipos de severidad: `danger`, `info`, `success`, `warning`.

---

## Configuración

Colocar `AlertProvider` dentro de `ConfigProvider` (lee `sileoToastEnabled` y `customDeviceType` de config).

```jsx
import { ConfigProvider, AlertProvider } from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      <AlertProvider>
        {/* tu app */}
      </AlertProvider>
    </ConfigProvider>
  );
}
```

Para mostrar el banner de alerta, renderizar el componente `Alert` (de `thecore-auth`) en algún punto del layout — típicamente en el nivel superior dentro de `AlertProvider`.

---

## API del hook

```js
const alert = useAlert();
```

| Valor | Tipo | Descripción |
|---|---|---|
| `showAlert` | `boolean` | Si el banner de alerta está actualmente visible |
| `setShowAlert` | `(value: boolean) => void` | Muestra u oculta manualmente el banner |
| `typeAlert` | `'danger' \| 'info' \| 'success' \| 'warning'` | Severidad de la alerta actual |
| `setTypeAlert` | `(type: string) => void` | Sobreescribe el tipo de alerta directamente |
| `messageAlert` | `string` | Texto del mensaje de alerta actual |
| `setMessageAlert` | `(message: string) => void` | Sobreescribe el mensaje directamente |
| `alertConfig` | `Record<string, object>` | Mapas de clases Tailwind para cada tipo de alerta (colores, hover, ring, progress) |
| `getIcon` | `(type: string) => ReactElement` | Devuelve el componente icono para el tipo de alerta dado |
| `closeAlert` | `() => void` | Alterna `showAlert` para cerrar el banner |
| `activeAlert` | `(type, message, customType?) => void` | Activa una alerta — usa toast Sileo en móvil/tablet, banner en escritorio |

### Parámetros de `activeAlert`

| Parámetro | Tipo | Descripción |
|---|---|---|
| `type` | `'danger' \| 'info' \| 'success' \| 'warning'` | Severidad de la alerta |
| `message` | `string` | El texto a mostrar |
| `customType` | `any` (opcional) | Si es truthy, fuerza el banner incluso en móvil (bypasa Sileo) |

---

## Uso

```jsx
import { useAlert } from 'thecore-auth';

function DeleteButton({ onDelete }) {
  const { activeAlert } = useAlert();

  const handleDelete = async () => {
    try {
      await onDelete();
      activeAlert('success', 'Elemento eliminado correctamente');
    } catch {
      activeAlert('danger', 'No se pudo eliminar el elemento');
    }
  };

  return <button onClick={handleDelete}>Eliminar</button>;
}
```

---

## Notas

- En móvil y tablet, cuando `sileoToastEnabled: true`, `activeAlert` envía un toast Sileo y retorna inmediatamente — `showAlert` nunca se establece a `true` en este flujo.
- `customDeviceType` en config sobreescribe el tipo de dispositivo detectado automáticamente. Útil para forzar comportamiento de escritorio en entornos híbridos.
- `activeAlert` resetea `showAlert` a `false` antes de establecer la nueva alerta (mediante un `setTimeout` de 50 ms) para forzar un re-render incluso cuando el mismo mensaje se activa dos veces seguidas.
- `closeAlert` alterna el valor (no establece incondicionalmente a `false`) — evitar llamarlo cuando `showAlert` ya es `false`.
