# useToast

> [Versione italiana](../../it/hooks/useToast.md) | [Versión española](../../es/hooks/useToast.md)

## Overview

`useToast` provides a typed interface around the [Sileo](https://github.com/sileo-js/sileo) notification library. It exposes one function per toast variant — `success`, `error`, `info`, `warning`, and `promise` — so that components can display feedback messages without importing Sileo directly.

## Import

```js
import { useToast } from 'thecore-auth';
```

## Parameters

This hook accepts no parameters.

## Return value

| Key | Type | Description |
|-----|------|-------------|
| `success` | `(title: string, description?: string) => void` | Shows a green success toast. |
| `error` | `(title: string, description?: string) => void` | Shows a red error toast. |
| `info` | `(title: string, description?: string) => void` | Shows a blue info toast. |
| `warning` | `(title: string, description?: string) => void` | Shows an orange warning toast. |
| `promise` | `(promise: Promise, messages: SileoPromiseMessages) => void` | Shows a loading toast that transitions to success or error based on the promise outcome. |

## Usage

```jsx
import { useToast } from 'thecore-auth';

function SaveButton({ onSave }) {
  const toast = useToast();

  const handleClick = async () => {
    try {
      await toast.promise(
        onSave(),
        {
          loading: 'Saving...',
          success: { title: 'Saved', description: 'Your changes were saved.' },
          error:   { title: 'Error',  description: 'Could not save. Try again.' },
        }
      );
    } catch {
      toast.error('Unexpected error', 'Please contact support.');
    }
  };

  return <button onClick={handleClick}>Save</button>;
}

// Simple feedback example
function DeleteButton({ onDelete }) {
  const { success, error } = useToast();

  const handleDelete = async () => {
    try {
      await onDelete();
      success('Deleted', 'The item was removed successfully.');
    } catch {
      error('Delete failed', 'The item could not be removed.');
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Notes

- Sileo must be configured in the application root (e.g. `<SileoProvider />`) for toasts to render. `useToast` only wraps the imperative API — it does not mount the container.
- The `promise` method reflects the `sileo.promise` signature. Refer to the Sileo documentation for the exact shape of the `messages` argument.
- All returned functions are recreated on every render (no `useCallback`). If you pass them as props or use them in `useEffect` dependencies, memoize at the call site if needed.
