# ModalProvider / useModal

> 🇮🇹 [Italiano](../it/contexts/ModalProvider.md) | 🇪🇸 [Español](../es/contexts/ModalProvider.md)

## Overview

`ModalProvider` manages a single, centralized modal dialog used throughout the application. It is controlled entirely through the `useModal()` hook — no prop drilling required.

For the **full API reference** (variants, `openModal` options, style overrides, component slots, and examples), see [docs/modal.md](../modal.md).

---

## Setup

`ModalProvider` must wrap any component that calls `useModal()`. When using `PackageRoutes` / `DefaultLayout`, it is already included. For manual setup:

```jsx
import { ModalProvider } from 'thecore-auth';

function App() {
  return (
    <ModalProvider>
      {/* your app */}
    </ModalProvider>
  );
}
```

---

## Hook API

```js
const modal = useModal();
```

| Value | Type | Description |
|---|---|---|
| `isOpen` | `boolean` | Whether the modal is currently visible |
| `openModal` | `(options: OpenModalOptions) => void` | Open the modal with given configuration |
| `closeModal` | `() => void` | Close the modal and reset all state |
| `content` | `ReactElement \| null` | The component injected into `ModalMain` |
| `title` | `string` | Modal title displayed in `ModalHeader` |
| `type` | `'submit' \| 'delete' \| 'custom'` | Determines footer button layout |
| `formId` | `string` | ID linking the footer's submit button to a form inside `ModalMain` |
| `item` | `any` | Arbitrary data passed to the modal (e.g. the item being deleted) |
| `style` | `object` | Style overrides for modal sections |
| `modalData` | `object \| null` | Controlled form data managed inside the modal |
| `setModalData` | `(data: object) => void` | Override `modalData` directly |
| `handleChange` | `(e: ChangeEvent) => void` | Generic input change handler for `modalData` |
| `handleSubmit` | `(e: FormEvent) => void` | Calls `onConfirm(modalData)` then closes the modal |
| `headerContent` | `ReactElement \| null` | Custom header slot (replaces default `ModalHeader`) |
| `setHeaderContent` | `(element: ReactElement) => void` | Set a custom header component |
| `footerContent` | `ReactElement \| null` | Custom footer slot (replaces default `ModalFooter`) |
| `setFooterContent` | `(element: ReactElement) => void` | Set a custom footer component |
| `onCancel` | `() => void \| null` | Callback fired on cancel |
| `setOnCancel` | `(fn: () => void) => void` | Set the cancel callback |

See [docs/modal.md](../modal.md) for `OpenModalOptions` fields and detailed examples.

---

## Notes

- All modal state is reset by `closeModal()` — title, content, formId, type, style, item, and modalData all return to their defaults.
- The modal is designed to be opened from anywhere in the tree. You do not need to co-locate the trigger with the modal component.
- For the full breakdown of `openModal` options and modal variants, refer to [docs/modal.md](../modal.md).
