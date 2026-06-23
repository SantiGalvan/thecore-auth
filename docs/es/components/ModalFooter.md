# ModalFooter

> [English](../../../docs/components/ModalFooter.md) | [Versione italiana](../../../docs/it/components/ModalFooter.md)

> ⚙️ **Componente interno** — no importable directamente. Usado dentro de `DefaultLayout`. Interactúa con el sistema modal a través de [`useModal`](../../contexts/ModalProvider.md).

## Descripción general

`ModalFooter` renderiza los botones de acción en la parte inferior del modal. La disposición y el comportamiento de los botones dependen del `type`:

- `submit` — cancelar + resetear + enviar (enlazado a `formId`)
- `delete` — cancelar + confirmar destructivo (llama a `onConfirm`, luego a `onClose`)
- `custom` — cancelar + confirmar (llama solo a `onConfirm`, no cierra automáticamente)

`Modal` renderiza `ModalFooter` por defecto; se puede pasar `footerContent` a `Modal` para reemplazarlo completamente.

## Props

| Nombre | Tipo | Por defecto | Requerido | Descripción |
|---|---|---|---|---|
| `onClose` | `function` | — | ✅ | Se invoca cuando se hace clic en cancelar; también se invoca después de `onConfirm` para el tipo `delete` |
| `onCancel` | `function` | `undefined` | — | Si se proporciona, tiene precedencia sobre `onClose` para el botón de cancelar |
| `onConfirm` | `function` | `undefined` | — | Se invoca en la confirmación para los tipos `delete` y `custom` |
| `type` | `string` | — | ✅ | Tipo del modal: `'submit'` \| `'delete'` \| `'custom'` |
| `formId` | `string` | `undefined` | — | `id` del formulario HTML enlazado a los botones de envío/reseteo (usado en el modo `submit`) |
| `style` | `object` | `{}` | — | Sobreescrituras de estilo — ver la tabla de claves de style más abajo |

### Claves del objeto `style`

| Clave | Tipo | Por defecto | Descripción |
|---|---|---|---|
| `style.resetButton` | `boolean` | `true` | Si mostrar el botón de reseteo (siempre oculto para el tipo `delete`) |
| `style.confirmButtonText` | `string` | `'Salva'` / `'Elimina'` | Texto del botón de confirmación; el valor por defecto depende del `type` |
| `style.cancelButtonText` | `string` | `'Annulla'` | Texto del botón de cancelar |
| `style.bgSaveButton` | `string` | clases Tailwind índigo | Clases para el botón de guardar (tipos `submit` / `custom`) |
| `style.bgDeleteButton` | `string` | clases Tailwind rosa | Clases para el botón de confirmación de eliminación |
| `style.bgResetButton` | `string` | clases Tailwind rosa | Clases para el botón de reseteo |
| `style.bgCancelButton` | `string` | clases Tailwind gris | Clases para el botón de cancelar |
| `style.customButtonStyle` | `string` | `null` | Sobreescritura completa de clases para el botón de confirmación cuando `type === 'custom'` |

## Notas

- Para el tipo `delete`: al hacer clic en confirmar se llama a `onConfirm?.()` y luego a `onClose?.()` — el modal se cierra tras la acción.
- Para el tipo `custom`: al hacer clic en confirmar se llama solo a `onConfirm?.()` — el llamador es responsable de cerrar el modal.
- Para el tipo `submit`: el botón de confirmación tiene `type="submit"` y `form={formId}`; el botón de reseteo tiene `type="reset"` y `form={formId}`.
- El botón de reseteo se suprime cuando `type === 'delete'`, independientemente del valor de `style.resetButton`.
- La API completa de `useModal` está documentada en [`docs/modal.md`](../modal.md).
