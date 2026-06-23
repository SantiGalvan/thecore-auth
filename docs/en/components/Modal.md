# Modal

> [Versione italiana](../../docs/it/components/Modal.md) | [Versión española](../../docs/es/components/Modal.md)

> ⚙️ **Internal component** — not directly importable. Used inside `DefaultLayout`.
> Interact with the modal system via [`useModal`](../contexts/ModalProvider.md).

## Overview

`Modal` is the root modal component. It renders a portal into `document.body`, manages open/close animation, traps keyboard focus, and closes on `Escape` or backdrop click. It composes `ModalHeader`, `ModalMain`, and `ModalFooter` — each of which can be replaced by a custom slot via `headerContent` / `footerContent`.

Three behavioral modes are available via the `type` prop:
- `submit` — renders a form-linked save/reset/cancel footer; the `formId` prop connects the submit button to a `<form>`.
- `delete` — compact width, no main area, header shows an item-name confirmation question, footer has a destructive confirm button.
- `custom` — footer confirm button calls `onConfirm` directly without submitting a form.

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `isOpen` | `boolean` | — | ✅ | Controls modal visibility and entrance animation |
| `onClose` | `function` | — | ✅ | Called when the modal should close (backdrop click, ESC, close button) |
| `onCancel` | `function` | `undefined` | — | If provided, replaces `onClose` for ESC, backdrop click, and header/cancel-button actions |
| `title` | `string` | `undefined` | — | Title rendered in `ModalHeader` (unused when `type === 'delete'` and `item.name` is set) |
| `formId` | `string` | `undefined` | — | HTML form `id` linked to the submit/reset buttons in `ModalFooter` |
| `children` | `ReactNode` | `undefined` | — | Content rendered inside `ModalMain` |
| `item` | `object` | `undefined` | — | Item being acted on; `item.name` appears in the delete confirmation header |
| `onConfirm` | `function` | `undefined` | — | Called on confirm action for `delete` and `custom` types |
| `type` | `string` | `'submit'` | — | Modal behavior mode: `'submit'` \| `'delete'` \| `'custom'` |
| `style` | `object` | `{}` | — | Style overrides object — see the Style object keys table below |
| `headerContent` | `ReactNode` | `undefined` | — | Replaces `ModalHeader` entirely when provided |
| `footerContent` | `ReactNode` | `undefined` | — | Replaces `ModalFooter` entirely when provided |

### `style` object keys

| Key | Type | Default | Description |
|---|---|---|---|
| `style.width` | `string` | `'max-w-md w-auto'` (delete) / `'w-full max-w-4xl'` | Tailwind width classes for the modal container |
| `style.bgModal` | `string` | `'bg-white'` | Background color class for the modal panel |
| `style.bgOverlay` | `string` | `'bg-black/50'` | Background color class for the backdrop overlay |
| `style.zIndex` | `string` | `'z-50'` | z-index class for the overlay |
| `style.overlayStyle` | `string` | `undefined` | Full class string override for the outer overlay `<div>` (replaces all defaults) |
| `style.modalStyle` | `string` | `undefined` | Full class string override for the inner modal panel (replaces all defaults) |
| `style.overrideStyle` | `string` | `undefined` | Passed to `ModalMain`; replaces the default `<main>` class string |
| `style.resetButton` | `boolean` | `true` | Whether the reset button is shown in `ModalFooter` (ignored for `delete` type) |
| `style.confirmButtonText` | `string` | `'Salva'` / `'Elimina'` | Text for the confirm button |
| `style.cancelButtonText` | `string` | `'Annulla'` | Text for the cancel button |
| `style.bgSaveButton` | `string` | indigo Tailwind classes | Classes for the save button (submit/custom types) |
| `style.bgDeleteButton` | `string` | rose Tailwind classes | Classes for the delete confirm button |
| `style.bgResetButton` | `string` | rose Tailwind classes | Classes for the reset button |
| `style.bgCancelButton` | `string` | gray Tailwind classes | Classes for the cancel button |
| `style.customButtonStyle` | `string` | `null` | Full class override for the confirm button when `type === 'custom'` |

## Notes

- `Modal` uses `ReactDOM.createPortal` to render into `document.body`, so it is unaffected by ancestor `overflow` or `z-index` stacking contexts.
- On open, focus moves to the modal panel and is restored to the previously focused element on close.
- If both `onCancel` and `onClose` are provided, `onCancel` is called first for ESC and backdrop/header-button actions; `onClose` is still used internally after delete confirmation.
- `headerContent` and `footerContent` are escape hatches — prefer `style` overrides for visual customization.
- The full `useModal` API (openModal, closeModal, style reference) is documented in [`docs/modal.md`](../modal.md).
