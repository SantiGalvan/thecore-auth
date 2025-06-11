# Modal Documentation

## Overview

This modal system provides a global and customizable modal component managed via React Context. The modal is mounted in the `DefaultLayout` and can be triggered dynamically from any component using `useModal().openModal(...)`.

---

## `openModal` Function

### Signature

```js
openModal({
  content: ReactNode,
  title: string,           // optional
  onConfirm: function,     // optional
  type: 'default' | 'delete', // optional
  formId: string,          // optional
  item: any,               // optional
  style: ModalStyleOptions // optional
})
```

### Example

```jsx
const { openModal } = useModal();

openModal({
  title: 'Delete user',
  type: 'delete',
  onConfirm: () => handleDelete(user.id),
  content: <p>Are you sure you want to delete user {user.name}?</p>,
});
```

---

## 🧱 Modal Structure

```
<Modal>
  ├── <ModalHeader />   // Title, close button, optional item name
  ├── <ModalMain />     // Dynamic content passed via `content`
  └── <ModalFooter />   // Cancel, Reset (if not delete), Confirm buttons
```

The main content of the modal is passed as `content` in the `openModal` function, for example:

```jsx
openModal({
  title: 'Project Info',
  content: <ProjectDetails />, // React component that will be displayed in the modal body
});
```

---

## `style` Options

All keys are optional. If not specified, the following default values are used:

```js
const style = {
  width: type === 'delete' ? 'max-w-md w-auto' : 'w-full max-w-4xl',
  bgModal: 'bg-white',
  bgOverlay: 'bg-black/50',

  confirmButtonText: type === 'delete' ? 'Delete' : 'Save',
  cancelButtonText: 'Cancel',

  resetButton: true, // visible only if type !== 'delete'

  bgSaveButton: 'bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg active:bg-indigo-800 text-white',
  bgDeleteButton: 'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white',
  bgResetButton: 'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white',
  bgCancelButton: 'text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg active:bg-gray-500'
}
```

---

## Helpful Tips

* The modal can be triggered from any component nested inside the `ModalProvider`.
* Since the modal is mounted only once in the `DefaultLayout`, only dynamic content is passed via `openModal()`.
* Supports `formId` to associate reset and submit buttons even in dynamic content.

---

## Context Hook

```js
const {
  isOpen,
  openModal,
  closeModal,
  content,
  title,
  onConfirm,
  type,
  item,
  formId,
  style
} = useModal();
```

Make sure your component is wrapped in `<ModalProvider>`, otherwise you will get an error. It is recommended to place the `ModalProvider` inside the `main.jsx` file, where the React app entry point is configured.

---
