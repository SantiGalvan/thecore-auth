# Modal

> [English](../../../docs/components/Modal.md) | [Versione italiana](../../../docs/it/components/Modal.md)

> ⚙️ **Componente interno** — no importable directamente. Usado dentro de `DefaultLayout`. Interactúa con el sistema modal a través de [`useModal`](../../contexts/ModalProvider.md).

## Descripción general

`Modal` es el componente raíz del modal. Renderiza un portal en `document.body`, gestiona la animación de apertura/cierre, atrapa el foco del teclado y se cierra con `Escape` o al hacer clic en el fondo. Compone `ModalHeader`, `ModalMain` y `ModalFooter`, cada uno de los cuales puede sustituirse por un slot personalizado mediante `headerContent` / `footerContent`.

Hay tres modos de comportamiento disponibles a través de la prop `type`:
- `submit` — renderiza un pie de página con botones de guardar/resetear/cancelar enlazados a un formulario; la prop `formId` conecta el botón de envío con un `<form>`.
- `delete` — ancho compacto, sin área principal, el encabezado muestra una pregunta de confirmación con el nombre del elemento, el pie de página tiene un botón de confirmación destructivo.
- `custom` — el botón de confirmación del pie de página llama a `onConfirm` directamente sin enviar ningún formulario.

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|---|---|---|---|---|
| `isOpen` | `boolean` | — | ✅ | Controla la visibilidad del modal y la animación de entrada |
| `onClose` | `function` | — | ✅ | Se invoca cuando el modal debe cerrarse (clic en el fondo, ESC, botón de cierre) |
| `onCancel` | `function` | `undefined` | — | Si se proporciona, reemplaza a `onClose` para ESC, clic en el fondo y acciones del encabezado/botón de cancelar |
| `title` | `string` | `undefined` | — | Título renderizado en `ModalHeader` (no se usa cuando `type === 'delete'` e `item.name` está definido) |
| `formId` | `string` | `undefined` | — | `id` del formulario HTML enlazado a los botones de envío/reseteo en `ModalFooter` |
| `children` | `ReactNode` | `undefined` | — | Contenido renderizado dentro de `ModalMain` |
| `item` | `object` | `undefined` | — | Elemento sobre el que se actúa; `item.name` aparece en el encabezado de confirmación de eliminación |
| `onConfirm` | `function` | `undefined` | — | Se invoca en la acción de confirmar para los tipos `delete` y `custom` |
| `type` | `string` | `'submit'` | — | Modo de comportamiento del modal: `'submit'` \| `'delete'` \| `'custom'` |
| `style` | `object` | `{}` | — | Objeto de sobreescritura de estilos — ver la tabla de claves del objeto `style` más abajo |
| `headerContent` | `ReactNode` | `undefined` | — | Reemplaza completamente `ModalHeader` cuando se proporciona |
| `footerContent` | `ReactNode` | `undefined` | — | Reemplaza completamente `ModalFooter` cuando se proporciona |

### Claves del objeto `style`

| Clave | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `style.width` | `string` | `'max-w-md w-auto'` (delete) / `'w-full max-w-4xl'` | Clases Tailwind de ancho para el contenedor del modal |
| `style.bgModal` | `string` | `'bg-white'` | Clase de color de fondo para el panel del modal |
| `style.bgOverlay` | `string` | `'bg-black/50'` | Clase de color de fondo para el fondo semitransparente |
| `style.zIndex` | `string` | `'z-50'` | Clase de z-index para el overlay |
| `style.overlayStyle` | `string` | `undefined` | Cadena de clases completa para el `<div>` externo del overlay (reemplaza todos los valores por defecto) |
| `style.modalStyle` | `string` | `undefined` | Cadena de clases completa para el panel interno del modal (reemplaza todos los valores por defecto) |
| `style.overrideStyle` | `string` | `undefined` | Se pasa a `ModalMain`; reemplaza la cadena de clases del `<main>` por defecto |
| `style.resetButton` | `boolean` | `true` | Si el botón de reseteo se muestra en `ModalFooter` (ignorado para el tipo `delete`) |
| `style.confirmButtonText` | `string` | `'Salva'` / `'Elimina'` | Texto del botón de confirmación |
| `style.cancelButtonText` | `string` | `'Annulla'` | Texto del botón de cancelar |
| `style.bgSaveButton` | `string` | clases Tailwind índigo | Clases para el botón de guardar (tipos `submit`/`custom`) |
| `style.bgDeleteButton` | `string` | clases Tailwind rosa | Clases para el botón de confirmación de eliminación |
| `style.bgResetButton` | `string` | clases Tailwind rosa | Clases para el botón de reseteo |
| `style.bgCancelButton` | `string` | clases Tailwind gris | Clases para el botón de cancelar |
| `style.customButtonStyle` | `string` | `null` | Sobreescritura completa de clases para el botón de confirmación cuando `type === 'custom'` |

## Notas

- `Modal` utiliza `ReactDOM.createPortal` para renderizar en `document.body`, por lo que no se ve afectado por el contexto de apilamiento `overflow` o `z-index` de los elementos ancestros.
- Al abrirse, el foco se mueve al panel del modal y se restaura al elemento previamente enfocado al cerrarse.
- Si se proporcionan tanto `onCancel` como `onClose`, `onCancel` se invoca primero para ESC y las acciones del fondo/botón del encabezado; `onClose` sigue utilizándose internamente tras la confirmación de eliminación.
- `headerContent` y `footerContent` son vías de escape — se recomienda usar sobreescrituras de `style` para la personalización visual.
- La API completa de `useModal` (openModal, closeModal, referencia de style) está documentada en [`docs/modal.md`](../modal.md).
