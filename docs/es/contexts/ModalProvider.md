# ModalProvider / useModal

> 🇬🇧 [English](../../contexts/ModalProvider.md) | 🇮🇹 [Italiano](../../it/contexts/ModalProvider.md)

## Descripción general

`ModalProvider` gestiona un único diálogo modal centralizado usado en toda la aplicación. Se controla enteramente a través del hook `useModal()` — sin prop drilling.

Para la **referencia API completa** (variantes, opciones de `openModal`, sobreescrituras de estilo, slots de componentes y ejemplos), ver [docs/modal.md](../../modal.md).

---

## Configuración

`ModalProvider` debe envolver cualquier componente que llame a `useModal()`. Al usar `PackageRoutes` / `DefaultLayout`, ya está incluido. Para configuración manual:

```jsx
import { ModalProvider } from 'thecore-auth';

function App() {
  return (
    <ModalProvider>
      {/* tu app */}
    </ModalProvider>
  );
}
```

---

## API del hook

```js
const modal = useModal();
```

| Valor | Tipo | Descripción |
|---|---|---|
| `isOpen` | `boolean` | Si el modal está actualmente visible |
| `openModal` | `(options: OpenModalOptions) => void` | Abre el modal con la configuración dada |
| `closeModal` | `() => void` | Cierra el modal y resetea todo el estado |
| `content` | `ReactElement \| null` | El componente inyectado en `ModalMain` |
| `title` | `string` | Título del modal mostrado en `ModalHeader` |
| `type` | `'submit' \| 'delete' \| 'custom'` | Determina el layout de los botones del footer |
| `formId` | `string` | ID que conecta el botón submit del footer con un form dentro de `ModalMain` |
| `item` | `any` | Datos arbitrarios pasados al modal (ej. el elemento a eliminar) |
| `style` | `object` | Sobreescrituras de estilo para las secciones del modal |
| `modalData` | `object \| null` | Datos de formulario controlado gestionados dentro del modal |
| `setModalData` | `(data: object) => void` | Sobreescribe `modalData` directamente |
| `handleChange` | `(e: ChangeEvent) => void` | Handler genérico para cambios de inputs en `modalData` |
| `handleSubmit` | `(e: FormEvent) => void` | Llama a `onConfirm(modalData)` luego cierra el modal |
| `headerContent` | `ReactElement \| null` | Slot de header personalizado (reemplaza el `ModalHeader` predeterminado) |
| `setHeaderContent` | `(element: ReactElement) => void` | Establece un componente header personalizado |
| `footerContent` | `ReactElement \| null` | Slot de footer personalizado (reemplaza el `ModalFooter` predeterminado) |
| `setFooterContent` | `(element: ReactElement) => void` | Establece un componente footer personalizado |
| `onCancel` | `() => void \| null` | Callback ejecutada al cancelar |
| `setOnCancel` | `(fn: () => void) => void` | Establece la callback de cancelación |

Para los campos de `OpenModalOptions` y ejemplos detallados, ver [docs/modal.md](../../modal.md).

---

## Notas

- Todo el estado del modal es reseteado por `closeModal()` — título, contenido, formId, tipo, estilo, item y modalData vuelven a sus valores predeterminados.
- El modal está diseñado para abrirse desde cualquier punto del árbol. No es necesario que el trigger esté cerca del componente modal.
- Para el desglose completo de las opciones de `openModal` y las variantes del modal, ver [docs/modal.md](../../modal.md).
