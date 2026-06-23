# ModalMain

> [Versione italiana](../../docs/it/components/ModalMain.md) | [Versión española](../../docs/es/components/ModalMain.md)

> ⚙️ **Internal component** — not directly importable. Used inside `DefaultLayout`.
> Interact with the modal system via [`useModal`](../contexts/ModalProvider.md).

## Overview

`ModalMain` renders the scrollable content area of the modal. It wraps `children` in a `<main>` element with a fixed max-height and vertical scroll.

When `type === 'delete'`, the entire `<main>` is suppressed — delete modals contain no body content, only the header confirmation question and the footer action buttons.

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `type` | `string` | — | ✅ | Modal type: `'submit'` \| `'delete'` \| `'custom'`. When `'delete'`, nothing is rendered |
| `children` | `ReactNode` | `undefined` | — | Content rendered inside the scrollable `<main>` area |
| `item` | `object` | `undefined` | — | Item being acted on; when `type === 'delete'` and `item` is absent, an error message is shown instead of `children` |
| `overrideStyle` | `string` | `undefined` | — | Replaces the default class string (`my-8 max-h-[600px] overflow-y-auto overflow-x-hidden`) when provided |

## Notes

- The default max-height is `600px`; use `overrideStyle` (via `style.overrideStyle` on `Modal`) to change it.
- The internal error state (`type === 'delete'` with no `item`) is a defensive check that is never visible in normal use — `Modal` always supplies `item` for delete modals.
- The full `useModal` API is documented in [`docs/modal.md`](../modal.md).
