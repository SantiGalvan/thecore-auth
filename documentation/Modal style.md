# Modal Styles

## Overlay and Modal Body Styles

- ### width:

  - **Description**: Determines the width of the modal

  - **Default value**: `(type === 'delete' ? 'max-w-md w-auto' : 'w-full max-w-4xl')`

- ### bgModal:

  - **Description**: Defines the background of the modal

  - **Default value**: `'bg-white'`

- ### bgOverlay:

  - **Description**: Defines the background of the overlay

  - **Default value**: `'bg-black/50'`

- ### zIndex:

  - **Description**: Defines the z-index of the entire modal (overlay + modal)

  - **Default value**: `'z-50'`

#### In the component, it is handled as follows:

```js
const modalWidth =
  style.width ?? (type === "delete" ? "max-w-md w-auto" : "w-full max-w-4xl");
const bgModal = style.bgModal ?? "bg-white";
const bgOverlay = style.bgOverlay ?? "bg-black/50";
const zIndex = style.zIndex ?? "z-50";
```

## Modal Main Style (ModaMain from the package)

- ### overrideStyle:
  - **Description**: Determines the style of the modal main, overriding the default style.
  - **Default value**: `'my-8 max-h-[600px] overflow-y-auto overflow-x-hidden'`
  - **Warning**: Adding even a single Tailwind or regular CSS class will override the entire default value.

## Modal Footer Style (ModalFooter from the package)

- ### resetButton:

  - **Description**: Defines whether to render the reset button or not
  - **Default value**: `true`

- ### confirmButtonText:

  - **Description**: Defines the text of the confirm button
  - **Default value**: `(type === 'delete' ? 'Delete' : 'Save')`
  - **Warning**: Providing a value will replace the text even for `type === 'delete'`

- ### cancelButtonText:

  - **Description**: Defines the text of the cancel button (also customizable in the function)
  - **Default value**: `'Cancel'`

- ### bgSaveButton:

  - **Description**: Defines the background color of the confirm button
  - **Default value**: `'bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg active:bg-indigo-800 text-white'`
  - **Warning**: Adding even a single Tailwind or regular CSS class will override the entire default value.

- ### bgDeleteButton:

  - **Description**: Defines the background color of the delete button, if present
  - **Default value**: `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white'`
  - **Warning**: Adding even a single Tailwind or regular CSS class will override the entire default value.

- ### bgResetButton:

  - **Description**: Defines the background color of the reset button, if present
  - **Default value**: `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white'`
  - **Warning**: Adding even a single Tailwind or regular CSS class will override the entire default value.

- ### bgCancelButton:

  - **Description**: Defines the background color of the cancel button (also customizable in the function)
  - **Default value**: `'text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg active:bg-gray-500'`
  - **Warning**: Adding even a single Tailwind or regular CSS class will override the entire default value.

- ### customButtonStyle:
  - **Description**: Defines the style of the custom button (only if type === custom)
  - **Default value**: `null`
  - **Warning**: Adding even a single Tailwind or regular CSS class will override the entire default value of the original button. This key also overrides the ones modifying the background color of the confirm button - `bgSaveButton` and `bgDeleteButton`.

#### In the component, it is handled as follows:

```js
const resetButton = style.resetButton ?? true;
const confirmButtonText =
  style.confirmButtonText ?? (type === "delete" ? "Delete" : "Save");
const cancelButtonText = style.cancelButtonText ?? "Cancel";
const bgSaveButton =
  style.bgSaveButton ??
  "bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg active:bg-indigo-800 text-white";
const bgDeleteButton =
  style.bgDeleteButton ??
  "bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white";
const bgResetButton =
  style.bgResetButton ??
  "bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 hover:shadow-lg active:bg-rose-700 text-white";
const bgCancelButton =
  style.bgCancelButton ??
  "text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg active:bg-gray-500";
const customButtonStyle = type === "custom" ? style.customButtonStyle : null;
```

## Complete Style Example

```js
const style = {
  width: "w-[50%]",
  bgModal: "bg-slate-300",
  bgOverlay: "bg-green-800/80",
  zIndex: "z-60",
  overrideStyle: "my-2 h-[400px] overflow-auto",
  resetButton: false,
  confirmButtonText: null,
  cancelButtonText: "Test",
  bgSaveButton: null,
  bgDeleteButton: null,
  bgResetButton:
    "bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg active:bg-orange-800 text-white",
  bgCancelButton:
    "bg-white rounded-lg shadow-md hover:bg-white hover:shadow-lg active:bg-white text-gray-800",
  customButtonStyle:
    "bg-orange-500 text-white rounded px-4 py-2 font-medium hover:bg-orange-600 active:bg-orange-700 transition transform active:scale-95",
};
```
