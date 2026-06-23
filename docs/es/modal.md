# Sistema Modal — thecore-auth

> 🇬🇧 [Modal Documentation in English](../en/modal.md) | 🇮🇹 [Documentazione Modal in Italiano](../it/modal.md)

El modal proporcionado por `thecore-auth` es un sistema de diálogo centralizado y basado en contexto.
Admite tres variantes integradas (`submit`, `delete`, `custom`), anulación completa de estilos e integración nativa con formularios — todo controlado mediante un único hook `useModal()` desde cualquier parte de la aplicación.

---

## Visión general

El modal se monta una sola vez dentro de `DefaultLayout` y es gestionado por `ModalContext`. Sus tres secciones — encabezado, cuerpo y pie de página — pueden personalizarse de forma independiente:

- **Encabezado** — muestra un título y un botón de cierre. Totalmente reemplazable con un componente personalizado.
- **Cuerpo** — contenedor vacío que se rellena con cualquier componente React (formularios, texto, mensajes de confirmación, etc.).
- **Pie de página** — botones de cancelar, restablecer y confirmar. Las etiquetas, colores y visibilidad de los botones son configurables.

```jsx
<Modal>
  ├── <ModalHeader />   // Título, botón de cierre, nombre de elemento opcional
  ├── <ModalMain />     // Contenido dinámico inyectado mediante `component`
  └── <ModalFooter />   // Botones de Cancelar, Restablecer (solo submit) y Confirmar
```

---

## Configuración

`ModalProvider` debe envolver tu aplicación. Ya está incluido cuando usas `DefaultLayout` a través de `PackageRoutes`. Si configuras los proveedores manualmente:

```jsx
import { ModalProvider } from 'thecore-auth';

<ModalProvider>
  <App />
</ModalProvider>
```

Luego usa el hook en cualquier lugar dentro:

```jsx
import { useModal } from 'thecore-auth';

const { openModal, closeModal, modalData } = useModal();
```

---

## Tipos de modal

| Tipo | Botones | Caso de uso |
|------|---------|-------------|
| `submit` | Cancelar · Restablecer · Guardar | Formularios — el botón Guardar envía el formulario mediante `formId` |
| `delete` | Cancelar · Eliminar | Confirmaciones destructivas |
| `custom` | Cancelar · personalizado | Control manual completo del comportamiento de los botones |

---

## `openModal` — Parámetros

Llama a `openModal({ ... })` para abrir el modal:

```js
openModal({
  title: 'Edit user',
  type: 'submit',
  formId: 'user-form',
  component: <UserForm />,
  modalData: user,
  onConfirm: null,
  item: null,
  style: {},
});
```

| Parámetro | Tipo | Valor por defecto | Descripción |
|-----------|------|-------------------|-------------|
| `title` | `string` | `""` | Título del encabezado. Se ignora si se proporciona un componente de encabezado personalizado. |
| `type` | `'submit' \| 'delete' \| 'custom'` | `'submit'` | Variante del modal. Controla qué botones aparecen en el pie de página. |
| `component` | `ReactNode` | `null` | Componente renderizado dentro de la sección `main`. |
| `modalData` | `any` | `null` | Datos pasados al modal. Dado que el modal vive en el layout, no puedes compartir estado local directamente — pásalo aquí y léelo con `useModal().modalData`. |
| `onConfirm` | `function` | `null` | Callback del botón de confirmar. Utilizado por los tipos `delete` y `custom`. Para `submit`, se ejecuta el handler `onSubmit` del formulario. |
| `formId` | `string` | `'modal-form'` | ID del elemento de formulario. El botón Guardar recibe `form={formId}` para enviar el formulario de forma nativa. Solo se usa cuando `type === 'submit'`. |
| `item` | `any` | `null` | Entidad sobre la que actúa el modal (p. ej., el registro que se va a eliminar). Disponible dentro del modal mediante `useModal().item`. |
| `style` | `object` | `{}` | Anulaciones de estilo — véase la [Referencia de estilos](#referencia-de-estilos) más abajo. |

---

## `closeModal`

Llama a `closeModal()` para cerrar el modal y restablecer todo su estado:

```js
closeModal();
// Restablece: content, title, onConfirm, type, formId, item, style, modalData
```

---

## Referencia de estilos

Pasa un objeto `style` a `openModal` para anular cualquier parte de la apariencia del modal.
Todas las claves son opcionales — omite una clave para conservar su valor por defecto.

### Superposición y contenedor del modal

| Clave | Por defecto | Descripción |
|-------|-------------|-------------|
| `width` | `'max-w-md w-auto'` (delete) · `'w-full max-w-4xl'` (otros) | Ancho del modal (clase de Tailwind) |
| `bgModal` | `'bg-white'` | Fondo del modal (clase de Tailwind) |
| `bgOverlay` | `'bg-black/50'` | Fondo de la superposición (clase de Tailwind) |
| `zIndex` | `'z-50'` | Z-index del modal + superposición (clase de Tailwind) |

```js
const modalWidth = style.width ?? (type === 'delete' ? 'max-w-md w-auto' : 'w-full max-w-4xl');
const bgModal    = style.bgModal   ?? 'bg-white';
const bgOverlay  = style.bgOverlay ?? 'bg-black/50';
const zIndex     = style.zIndex    ?? 'z-50';
```

### Sección del cuerpo

| Clave | Por defecto | Descripción |
|-------|-------------|-------------|
| `overrideStyle` | `'my-8 max-h-[600px] overflow-y-auto overflow-x-hidden'` | Clases CSS para el contenedor del cuerpo. **Añadir incluso una clase reemplaza todo el valor por defecto.** |

### Botones del pie de página

| Clave | Por defecto | Descripción |
|-------|-------------|-------------|
| `resetButton` | `true` | Mostrar u ocultar el botón Restablecer (solo relevante para el tipo `submit`) |
| `confirmButtonText` | `'Delete'` (delete) · `'Save'` (otros) | Etiqueta del botón de confirmar. Proporcionar un valor anula incluso la variante delete. |
| `cancelButtonText` | `'Cancel'` | Etiqueta del botón de cancelar |
| `bgSaveButton` | `'bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 … text-white'` | Clases del botón de confirmar. **Una clase reemplaza todos los valores por defecto.** |
| `bgDeleteButton` | `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 … text-white'` | Clases del botón de eliminar. **Una clase reemplaza todos los valores por defecto.** |
| `bgResetButton` | `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 … text-white'` | Clases del botón de restablecer. **Una clase reemplaza todos los valores por defecto.** |
| `bgCancelButton` | `'text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 …'` | Clases del botón de cancelar. **Una clase reemplaza todos los valores por defecto.** |
| `customButtonStyle` | `null` | Clases del botón de confirmar para el tipo `custom`. **Anula `bgSaveButton` y `bgDeleteButton`.** |

### Ejemplo completo de estilo

```js
const style = {
  width: 'w-[50%]',
  bgModal: 'bg-slate-300',
  bgOverlay: 'bg-green-800/80',
  zIndex: 'z-60',
  overrideStyle: 'my-2 h-[400px] overflow-auto',
  resetButton: false,
  confirmButtonText: null,
  cancelButtonText: 'Cancel',
  bgSaveButton: null,
  bgDeleteButton: null,
  bgResetButton: 'bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg active:bg-orange-800 text-white',
  bgCancelButton: 'bg-white rounded-lg shadow-md hover:bg-white hover:shadow-lg active:bg-white text-gray-800',
  customButtonStyle: 'bg-orange-500 text-white rounded px-4 py-2 font-medium hover:bg-orange-600 active:bg-orange-700',
};
```

---

## Ejemplos de uso

### Modal de tipo submit — formulario dentro del modal

```jsx
const UserForm = () => {
  const { modalData, closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de guardado…
    closeModal();
  };

  return (
    <form id="user-form" onSubmit={handleSubmit}>
      <input defaultValue={modalData?.name} />
    </form>
  );
};

// Abrir el modal
openModal({
  title: 'Edit user',
  type: 'submit',
  formId: 'user-form',
  component: <UserForm />,
  modalData: selectedUser,
});
```

### Modal de tipo delete — confirmación destructiva

```jsx
openModal({
  title: 'Delete user',
  type: 'delete',
  item: selectedUser,
  onConfirm: async () => {
    await deleteUser(selectedUser.id);
    closeModal();
  },
  style: {
    width: 'max-w-md w-auto',
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No, keep it',
  },
});
```

### Modal de tipo custom — control manual completo

```jsx
openModal({
  title: 'Custom action',
  type: 'custom',
  component: <MyCustomContent />,
  onConfirm: () => {
    doSomething();
    closeModal();
  },
  style: {
    customButtonStyle: 'bg-teal-600 text-white rounded px-4 py-2 hover:bg-teal-700',
  },
});
```

---

## Modal de confirmación anidado

Para solicitar al usuario una segunda confirmación antes de ejecutar una acción crítica, abre un nuevo modal desde dentro de `onConfirm`:

```jsx
// Paso 1 — primer modal (cualquier tipo)
const openEditModal = () => {
  openModal({
    title: 'Edit record',
    type: 'custom',
    component: <EditForm />,
    onConfirm: () => openConfirmModal(),  // abre la confirmación
  });
};

// Paso 2 — modal de confirmación
const openConfirmModal = () => {
  openModal({
    title: 'Are you sure you want to delete this item?',
    type: 'delete',
    item: selectedItem,
    onConfirm: async () => {
      await deleteItem(selectedItem.id);
      closeModal();
    },
  });
};
```

**Nota:** aunque técnicamente es posible encadenar desde un modal `delete`, el patrón más común es encadenar desde modales `custom` o `submit`.

---

## Notas importantes

- El modal es un **singleton** — se monta una sola vez en el layout principal y se comparte en toda la aplicación.
- `modalData` es la única forma de pasar datos reactivos al modal. El estado local de un componente no actualizará el modal una vez abierto.
- Los componentes pasados mediante `component` se montan y desmontan en cada ciclo de apertura/cierre.
- Llamar a `closeModal()` restablece todo el estado a sus valores iniciales.
- Usa el patrón de modal de confirmación solo para **acciones críticas e irreversibles** (eliminaciones, modificaciones permanentes).
