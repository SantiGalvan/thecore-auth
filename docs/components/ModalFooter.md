# ModalFooter

> [Versione italiana](../../docs/it/components/ModalFooter.md) | [Versión española](../../docs/es/components/ModalFooter.md)

> ⚙️ **Internal component** — not directly importable. Used inside `DefaultLayout`.
> Interact with the modal system via [`useModal`](../contexts/ModalProvider.md).

## Overview

`ModalFooter` renders the action buttons at the bottom of the modal. Button layout and behavior depend on `type`:

- `submit` — cancel + reset + submit (linked to `formId`)
- `delete` — cancel + destructive confirm (calls `onConfirm`, then `onClose`)
- `custom` — cancel + confirm (calls `onConfirm` only, does not close automatically)

`Modal` renders `ModalFooter` by default; pass `footerContent` to `Modal` to replace it entirely.

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `onClose` | `function` | — | ✅ | Called when cancel is clicked; also called after `onConfirm` for `delete` type |
| `onCancel` | `function` | `undefined` | — | If provided, takes precedence over `onClose` for the cancel button |
| `onConfirm` | `function` | `undefined` | — | Called on confirm for `delete` and `custom` types |
| `type` | `string` | — | ✅ | Modal type: `'submit'` \| `'delete'` \| `'custom'` |
| `formId` | `string` | `undefined` | — | HTML form `id` linked to the submit/reset buttons (used in `submit` mode) |
| `style` | `object` | `{}` | — | Style overrides — see the style keys table below |

### `style` object keys

| Key | Type | Default | Description |
|---|---|---|---|
| `style.resetButton` | `boolean` | `true` | Whether to show the reset button (always hidden for `delete` type) |
| `style.confirmButtonText` | `string` | `'Salva'` / `'Elimina'` | Text for the confirm button; default depends on `type` |
| `style.cancelButtonText` | `string` | `'Annulla'` | Text for the cancel button |
| `style.bgSaveButton` | `string` | indigo Tailwind classes | Classes for the save button (`submit` / `custom` types) |
| `style.bgDeleteButton` | `string` | rose Tailwind classes | Classes for the delete confirm button |
| `style.bgResetButton` | `string` | rose Tailwind classes | Classes for the reset button |
| `style.bgCancelButton` | `string` | gray Tailwind classes | Classes for the cancel button |
| `style.customButtonStyle` | `string` | `null` | Full class override for the confirm button when `type === 'custom'` |

## Notes

- For `delete` type: clicking confirm calls `onConfirm?.()` then `onClose?.()` — the modal closes after the action.
- For `custom` type: clicking confirm calls `onConfirm?.()` only — the caller is responsible for closing the modal.
- For `submit` type: the confirm button has `type="submit"` and `form={formId}`; the reset button has `type="reset"` and `form={formId}`.
- The reset button is suppressed when `type === 'delete'`, regardless of `style.resetButton`.
- The full `useModal` API is documented in [`docs/modal.md`](../modal.md).
