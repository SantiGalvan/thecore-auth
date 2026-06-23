# ModalHeader

> [Versione italiana](../../docs/it/components/ModalHeader.md) | [Versión española](../../docs/es/components/ModalHeader.md)

> ⚙️ **Internal component** — not directly importable. Used inside `DefaultLayout`.
> Interact with the modal system via [`useModal`](../contexts/ModalProvider.md).

## Overview

`ModalHeader` renders the top section of the modal: a title on the left and an `×` close button on the right. Title content adapts to the modal type:

- `type === 'delete'` and `name` is set → shows "Sei sicuro di volere eliminare: **{name}**?"
- otherwise → shows `title` if provided, falling back to `'Conferma operazione'`

`Modal` renders `ModalHeader` by default; pass `headerContent` to `Modal` to replace it entirely.

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `onClose` | `function` | — | ✅ | Called when the `×` button is clicked (unless `onCancel` is provided) |
| `onCancel` | `function` | `undefined` | — | If provided, takes precedence over `onClose` for the `×` button click |
| `type` | `string` | — | ✅ | Modal type: `'submit'` \| `'delete'` \| `'custom'`; controls title rendering logic |
| `title` | `string` | `'Conferma operazione'` | — | Title text shown when `type !== 'delete'` or `name` is absent |
| `name` | `string` | `undefined` | — | Item name used in the delete confirmation question |

## Notes

- The `×` button is always rendered regardless of `type`.
- The close button has a scale/opacity hover animation and an `aria-label="Chiudi modale"` for accessibility.
- To show a custom header, pass `headerContent` to `Modal` instead of overriding `ModalHeader` directly.
- The full `useModal` API is documented in [`docs/modal.md`](../modal.md).
