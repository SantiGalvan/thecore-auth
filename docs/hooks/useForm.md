# useForm

> [Versione italiana](../../it/hooks/useForm.md) | [Versión española](../../es/hooks/useForm.md)

## Overview

`useForm` manages the state of a form that can contain both primitive field values and file uploads. It handles field changes, file additions, replacements, and removals, and generates object-URL previews for image files automatically.

## Import

```js
import { useForm } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialValues` | `object` | `{}` | Initial values for all non-file fields, keyed by field name. |

## Return value

| Key | Type | Description |
|-----|------|-------------|
| `values` | `object` | Current non-file field values. |
| `handleChange` | `(field: string, value: any) => void` | Updates a single field value. |
| `files` | `object` | Map of field name → `File[]` for uploaded files. |
| `previews` | `object` | Map of field name → `string[]` of object URLs for previewing images. |
| `addFiles` | `(field: string, fileList: FileList \| File[]) => void` | Appends new files to an existing list without replacing previous ones. |
| `replaceFiles` | `(field: string, fileList: FileList \| File[]) => void` | Replaces the entire file list for a field. |
| `removeFile` | `(field: string, index: number) => void` | Removes a single file and its preview by index. |
| `setValues` | `React.Dispatch` | Direct state setter for `values` — use for bulk updates. |
| `resetForm` | `() => void` | Resets `values` to `initialValues` and clears all files and previews. |

## Usage

```jsx
import { useForm } from 'thecore-auth';

function ProfileForm({ onSubmit }) {
  const { values, handleChange, files, previews, addFiles, removeFile, resetForm } = useForm({
    username: '',
    bio: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', values.username);
    formData.append('bio', values.bio);
    (files.avatar || []).forEach(f => formData.append('avatar', f));
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={values.username}
        onChange={e => handleChange('username', e.target.value)}
        placeholder="Username"
      />
      <textarea
        value={values.bio}
        onChange={e => handleChange('bio', e.target.value)}
        placeholder="Bio"
      />
      <input type="file" accept="image/*"
        onChange={e => addFiles('avatar', e.target.files)} />

      {(previews.avatar || []).map((url, i) => (
        <div key={i}>
          <img src={url} alt="preview" width={80} />
          <button type="button" onClick={() => removeFile('avatar', i)}>Remove</button>
        </div>
      ))}

      <button type="submit">Save</button>
      <button type="button" onClick={resetForm}>Reset</button>
    </form>
  );
}
```

## Notes

- Object URLs created by `addFiles` and `replaceFiles` are **not** automatically revoked. Call `URL.revokeObjectURL(url)` when the preview is no longer needed to avoid memory leaks, especially when users upload many large files.
- `handleChange` sets a single field; for bulk value updates use the returned `setValues` dispatcher directly.
- `files` and `values` are tracked in separate state objects, so updating files does not re-render components that only consume `values`, and vice versa (in practice React batches them, but the separation keeps each piece of state minimal).
- `resetForm` restores `values` to the `initialValues` snapshot captured at hook initialisation time — mutations to the `initialValues` object after mount are not reflected.
