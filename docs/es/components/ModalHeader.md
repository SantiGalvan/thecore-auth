# ModalHeader

> [English](../../../docs/components/ModalHeader.md) | [Versione italiana](../../../docs/it/components/ModalHeader.md)

> ⚙️ **Componente interno** — no importable directamente. Usado dentro de `DefaultLayout`. Interactúa con el sistema modal a través de [`useModal`](../../contexts/ModalProvider.md).

## Descripción general

`ModalHeader` renderiza la sección superior del modal: un título a la izquierda y un botón de cierre `×` a la derecha. El contenido del título se adapta al tipo de modal:

- `type === 'delete'` y `name` está definido → muestra "Sei sicuro di volere eliminare: **{name}**?"
- en caso contrario → muestra `title` si se ha proporcionado, con `'Conferma operazione'` como valor de reserva

`Modal` renderiza `ModalHeader` por defecto; se puede pasar `headerContent` a `Modal` para reemplazarlo completamente.

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|---|---|---|---|---|
| `onClose` | `function` | — | ✅ | Se invoca cuando se hace clic en el botón `×` (a menos que se haya proporcionado `onCancel`) |
| `onCancel` | `function` | `undefined` | — | Si se proporciona, tiene precedencia sobre `onClose` para el clic en el botón `×` |
| `type` | `string` | — | ✅ | Tipo del modal: `'submit'` \| `'delete'` \| `'custom'`; controla la lógica de renderizado del título |
| `title` | `string` | `'Conferma operazione'` | — | Texto del título mostrado cuando `type !== 'delete'` o `name` está ausente |
| `name` | `string` | `undefined` | — | Nombre del elemento usado en la pregunta de confirmación de eliminación |

## Notas

- El botón `×` siempre se renderiza independientemente del `type`.
- El botón de cierre tiene una animación de escala/opacidad al pasar el cursor y un `aria-label="Chiudi modale"` para la accesibilidad.
- Para mostrar un encabezado personalizado, se debe pasar `headerContent` a `Modal` en lugar de sobreescribir `ModalHeader` directamente.
- La API completa de `useModal` está documentada en [`docs/modal.md`](../modal.md).
