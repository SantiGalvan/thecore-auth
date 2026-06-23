# Modal System — thecore-auth

> 🇮🇹 [Documentazione Modal in Italiano](../it/modal.md) | 🇪🇸 [Documentación Modal en Español](../es/modal.md)

The modal provided by `thecore-auth` is a centralized, context-driven dialog system.
It supports three built-in variants (`submit`, `delete`, `custom`), full style overrides, and native form integration — all controlled through a single `useModal()` hook from anywhere in the app.

---

## Overview

The modal is mounted once inside `DefaultLayout` and managed by `ModalContext`. Its three sections — header, main, and footer — can each be customized independently:

- **Header** — displays a title and close button. Fully replaceable with a custom component.
- **Main** — an empty container you populate with any React component (forms, text, confirmation messages, etc.).
- **Footer** — cancel, reset, and confirm buttons. Button labels, colors, and visibility are all configurable.

```jsx
<Modal>
  ├── <ModalHeader />   // Title, close button, optional item name
  ├── <ModalMain />     // Dynamic content injected via `component`
  └── <ModalFooter />   // Cancel, Reset (submit only), Confirm buttons
```

---

## Setup

`ModalProvider` must wrap your application. It is already included when you use `DefaultLayout` via `PackageRoutes`. If you set up providers manually:

```jsx
import { ModalProvider } from 'thecore-auth';

<ModalProvider>
  <App />
</ModalProvider>
```

Then use the hook anywhere inside:

```jsx
import { useModal } from 'thecore-auth';

const { openModal, closeModal, modalData } = useModal();
```

---

## Modal Types

| Type | Buttons | Use case |
|------|---------|----------|
| `submit` | Cancel · Reset · Save | Forms — the Save button submits the form via `formId` |
| `delete` | Cancel · Delete | Destructive confirmations |
| `custom` | Cancel · custom | Full manual control of button behavior |

---

## `openModal` — Parameters

Call `openModal({ ... })` to open the modal:

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

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `title` | `string` | `""` | Header title. Ignored if a custom header component is provided. |
| `type` | `'submit' \| 'delete' \| 'custom'` | `'submit'` | Modal variant. Controls which buttons appear in the footer. |
| `component` | `ReactNode` | `null` | Component rendered inside the `main` section. |
| `modalData` | `any` | `null` | Data passed to the modal. Since the modal lives in the layout, you cannot share local state directly — pass it here and read it with `useModal().modalData`. |
| `onConfirm` | `function` | `null` | Confirm button callback. Used by `delete` and `custom` types. For `submit`, the form's `onSubmit` handler fires instead. |
| `formId` | `string` | `'modal-form'` | ID of the form element. The Save button gets `form={formId}` so it submits the form natively. Only used when `type === 'submit'`. |
| `item` | `any` | `null` | Entity the modal is acting on (e.g., the record being deleted). Available inside the modal via `useModal().item`. |
| `style` | `object` | `{}` | Style overrides — see [Style Reference](#style-reference) below. |

---

## `closeModal`

Call `closeModal()` to dismiss the modal and reset all its state:

```js
closeModal();
// Resets: content, title, onConfirm, type, formId, item, style, modalData
```

---

## Style Reference

Pass a `style` object to `openModal` to override any part of the modal's appearance.
All keys are optional — omit a key to keep its default value.

### Overlay & modal container

| Key | Default | Description |
|-----|---------|-------------|
| `width` | `'max-w-md w-auto'` (delete) · `'w-full max-w-4xl'` (others) | Modal width (Tailwind class) |
| `bgModal` | `'bg-white'` | Modal background (Tailwind class) |
| `bgOverlay` | `'bg-black/50'` | Overlay background (Tailwind class) |
| `zIndex` | `'z-50'` | Z-index of the modal + overlay (Tailwind class) |

```js
const modalWidth = style.width ?? (type === 'delete' ? 'max-w-md w-auto' : 'w-full max-w-4xl');
const bgModal    = style.bgModal   ?? 'bg-white';
const bgOverlay  = style.bgOverlay ?? 'bg-black/50';
const zIndex     = style.zIndex    ?? 'z-50';
```

### Main section

| Key | Default | Description |
|-----|---------|-------------|
| `overrideStyle` | `'my-8 max-h-[600px] overflow-y-auto overflow-x-hidden'` | CSS classes for the main container. **Adding even one class replaces the entire default.** |

### Footer buttons

| Key | Default | Description |
|-----|---------|-------------|
| `resetButton` | `true` | Show or hide the Reset button (only relevant for `submit` type) |
| `confirmButtonText` | `'Delete'` (delete) · `'Save'` (others) | Confirm button label. Providing a value overrides even the delete variant. |
| `cancelButtonText` | `'Cancel'` | Cancel button label |
| `bgSaveButton` | `'bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 … text-white'` | Confirm button classes. **One class replaces all defaults.** |
| `bgDeleteButton` | `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 … text-white'` | Delete button classes. **One class replaces all defaults.** |
| `bgResetButton` | `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 … text-white'` | Reset button classes. **One class replaces all defaults.** |
| `bgCancelButton` | `'text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 …'` | Cancel button classes. **One class replaces all defaults.** |
| `customButtonStyle` | `null` | Confirm button classes for `custom` type. **Overrides `bgSaveButton` and `bgDeleteButton`.** |

### Complete style example

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

## Usage Examples

### Submit modal — form inside the modal

```jsx
const UserForm = () => {
  const { modalData, closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // save logic…
    closeModal();
  };

  return (
    <form id="user-form" onSubmit={handleSubmit}>
      <input defaultValue={modalData?.name} />
    </form>
  );
};

// Open the modal
openModal({
  title: 'Edit user',
  type: 'submit',
  formId: 'user-form',
  component: <UserForm />,
  modalData: selectedUser,
});
```

### Delete modal — destructive confirmation

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

### Custom modal — full manual control

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

## Nested Confirmation Modal

To ask the user for a second confirmation before executing a critical action, open a new modal from inside `onConfirm`:

```jsx
// Step 1 — first modal (any type)
const openEditModal = () => {
  openModal({
    title: 'Edit record',
    type: 'custom',
    component: <EditForm />,
    onConfirm: () => openConfirmModal(),  // opens the confirmation
  });
};

// Step 2 — confirmation modal
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

**Note:** while it is technically possible to chain from a `delete` modal, the most common pattern is chaining from `custom` or `submit` modals.

---

## Important Notes

- The modal is a **singleton** — mounted once in the main layout, shared across the entire app.
- `modalData` is the only way to pass reactive data into the modal. Local component state will not update the modal after it opens.
- Components passed via `component` are mounted and unmounted on each open/close cycle.
- Calling `closeModal()` resets all state to its initial values.
- Use the confirmation modal pattern only for **critical, irreversible actions** (deletions, permanent modifications).
