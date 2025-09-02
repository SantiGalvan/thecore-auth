# `thecore-auth` Modal Documentation

## Overview

The modal provided by `thecore-auth` is designed to be used in any context and customized to your needs. You can style every part of it via a `style` object, or replace the React components for the header, main, and footer entirely—offering exceptional flexibility.

For the header and footer, the modal already includes basic built‑in components. You can use them as-is without creating new ones, while still having customization options such as:

- Editing the title in the `header`
- Customizing the logic and styles of the buttons in the `footer`

For the `main` section, the modal provides an empty container that you can populate with any React component, such as forms, textual content, confirmation prompts for delete operations, or any other content you need.

In `thecore-auth`, the modal is defined in the `DefaultLayout` and managed through the `ModalContext`. To trigger and control the modal, simply use the `useModal()` hook exposed by the package.

This architecture lets you keep a consistent structure across the application while giving you maximum freedom to customize each specific use case.

## Main Features

- **Context-based architecture:** centralized state management for the modal
- **High customization:** replace components or modify styles
- **Built-in components:** header and footer with basic functionality already implemented
- **Multiple types:** modal variants for different use cases (default, delete, submit, custom)
- **Form integration:** native support for form handling via the `formId` attribute

## ModalContext

Within the `ModalContext` you have functions to open and close the modal:

- **openModal:** Function used to open the modal. It expects an object with the following keys:

  - **modalData:**
    - **Type:** React state
    - **Description:** Used to pass data for a possible form or any data that needs to change. Since the modal is rendered in the layout, you cannot pass your own component state and expect it to work; you must pass it to `modalData`, which is the only state able to update the modal.
    - **Default value:** `null`

  - **component:**
    - **Type:** React component
    - **Description:** The component to render inside the `main` section.
    - **Default value:** `null`

  - **title:**
    - **Type:** `string`
    - **Description:** Defines the `header` title. This value is not used if you provide a custom `header` component.
    - **Default value:** `""`

  - **onConfirm:**
    - **Type:** `function`
    - **Description:** When `type` is different from `submit`, provide here the function to be called by the confirm button.
    - **Default value:** `null`

  - **type:**
    - **Type:** `string`
    - **Description:** Defines the modal type to use.
    - **Values:** Accepts exactly three values: `delete`, `submit`, `custom`.
    - **Default value:** `submit`

  - **formId:**
    - **Type:** `string`
    - **Description:** The id of the form. This id will be assigned to the submit button *only if* `type` is set to `submit`.
    - **Default value:** `"modal-form"`

  - **item:**
    - **Type:** `string`
    - **Description:** The item/entity to pass to the modal.
    - **Default value:** `null`

  - **style:**
    - **Type:** `object`
    - **Description:** Object containing keys to customize the modal styles.
    - **Default value:** `undefined`
    - **Object keys:**
      - **width**
      - **bgModal**
      - **bgOverlay**
      - **zIndex**
      - **overrideStyle**
      - **resetButton**
      - **confirmButtonText**
      - **cancelButtonText**
      - **bgSaveButton**
      - **bgDeleteButton**
      - **bgResetButton**
      - **bgCancelButton**
      - **customButtonStyle**
    - **More info:** For additional details, see the modal style documentation. [Modal style documentation](./Modal%20style.md)

  - **Function:**

    ```js
    //* Function to open the modal
    const openModal = ({
      modalData,
      component,
      title = "",
      onConfirm = null,
      type = "submit",
      formId = "modal-form",
      item = null,
      style,
    }) => {
      setModalData(modalData);
      setContent(() => component);
      setTitle(title);
      setOnConfirm(() => onConfirm);
      setType(type);
      setFormId(formId);
      setItem(item);
      setStyle(style);
      setIsOpen(true);
    };
    ```

  - **Example:**

    ```js
    const openDeleteModal = () => {
      const style = {
        width: "w-[40%]",
        bgModal: "bg-red-200",
        bgOverlay: "bg-blue-900/60",
        zIndex: "z-50",
        overrideStyle: "p-4 h-[300px] overflow-y-scroll",
        resetButton: false,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel all",
        bgSaveButton:
          "bg-blue-500 rounded-md shadow hover:bg-blue-600 hover:shadow-md active:bg-blue-700 text-white",
        bgDeleteButton:
          "bg-red-500 rounded-full shadow-md hover:bg-red-600 hover:shadow-lg active:bg-red-700 text-white",
        bgResetButton:
          "bg-yellow-500 rounded-xl shadow hover:bg-yellow-600 hover:shadow-md active:bg-yellow-700 text-black",
        bgCancelButton:
          "bg-gray-100 rounded shadow hover:bg-gray-200 hover:shadow-md active:bg-gray-300 text-gray-900",
      };

      openModal({
        modalData: null,
        component: null,
        title: null,
        onConfirm: null,
        type: "delete",
        formId: "modal-form",
        item: null,
        style,
      });
    };
    ```

- **closeModal:** Function used to close the modal, optionally resetting values.
  - **Function:**
    ```js
    //* Function to close the modal
    const closeModal = () => {
      setContent(null);
      setTitle("");
      setOnConfirm(null);
      setType("submit");
      setFormId("modal-form");
      setItem(null);
      setStyle({});
      setIsOpen(false);
      setModalData(null);
    };
    ```
  - **Example:**
    ```js
    closeModal();
    ```

## Modal Structure

```jsx
<Modal>
  ├── <ModalHeader />   // Title, close button, optional item name
  ├── <ModalMain />     // Dynamic content injected via `content`
  └── <ModalFooter />   // Cancel, Reset (if supported), Confirm buttons
```

## Modal Types

1. **Delete**

   - Buttons: Cancel, Delete

2. **Submit**

   - Buttons: Cancel, Reset, Save
   - Integration: Native support for HTML forms
   - Feature: Form reset via `formId`

3. **Custom**

   - Maximum flexibility: Full customization
   - Control: Manual management of buttons and behaviors

## Example of Form Handling in Modal

```jsx
// Form component inside the modal
const UserForm = () => {
  const { modalData, closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit handling...
    closeModal();
  };

  return (
    <form id="user-form" onSubmit={handleSubmit}>
      <input defaultValue={modalData?.name} />
    </form>
  );
};

// Open modal with form
openModal({
  title: "Edit user",
  type: "submit",
  formId: "user-form",
  content: <UserForm />,
  modalData: user,
});
```

## Important Notes

- The modal is a singleton: it is mounted once in the main layout
- The `modalData` state is preserved between reopenings of the same modal
- Components passed in `content` are mounted and unmounted on each open/close
- Closing the modal resets all temporary state and data

## Confirmation Modal

The confirmation modal is useful in all cases where the user needs to
confirm an important action, for example:

-   Deleting an item

-   Saving or modifying data

The modal system is centralized and managed through the `useModal()`
hook. To open a modal, simply call the function `openModal({ ... })`,
passing the required configuration.

### How it works

The confirmation modal can be opened from any type of modal (custom,
form, etc.). The mechanism is based on two steps:

1.  First modal

-   We open a modal of any type.

-   In the `onConfirm` of this modal, we call a new modal opening, which
    will be the confirmation one.

2.  Confirmation modal

-   Here we specify in the `onConfirm` the final operation to perform
    (e.g., deletion, saving, etc.).

-   The confirmation modal uses the Save/Delete button already provided
    by the default layout: we will decide which function to associate
    with this button depending on the context.

**Note**: even though technically it is possible to open a confirmation
modal starting from a delete-type modal, it doesn't make much sense in
practice. The most common case is opening it from custom or form-type
modals.

### Example

``` jsx
// Modal opening function
const modal = () => {
  setFooterContent();

  openModal({
    modalData: null,
    component: null,
    title: null,
    onConfirm: () => openDeleteModal(), // Function to open the confirmation modal
    type: "custom",
    formId: "modal-form",
  });
};

// Delete function
const openDeleteModal = () => {
  openModal({
    modalData: null,
    component: deleteItem(),
    title: null,
    onConfirm: null,
    type: "delete",
    formId: "modal-form",
  });
};
```

### Best practices

- Use the confirmation modal only for critical actions (deletions,
    irreversible modifications).

- If possible, display additional information about the item to be
    deleted (e.g., name or code).

- Keep the modal texts clear and direct:

  - Title: "Are you sure you want to delete the item (item)?". Of
        course, the title can be modified through the `title` key of the
        `openModal({})` function.
