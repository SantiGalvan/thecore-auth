# useForm

> [English](../../../docs/hooks/useForm.md) | [Versione italiana](../../it/hooks/useForm.md)

## Descripción general

`useForm` gestiona el estado de un formulario que puede contener tanto valores de campos primitivos como subidas de archivos. Maneja los cambios de campos, la adición, sustitución y eliminación de archivos, y genera automáticamente URLs de vista previa de objetos para archivos de imagen.

## Importación

```js
import { useForm } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `initialValues` | `object` | `{}` | Valores iniciales para todos los campos no-archivo, con clave por nombre de campo. |

## Valor de retorno

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `values` | `object` | Valores actuales de los campos no-archivo. |
| `handleChange` | `(field: string, value: any) => void` | Actualiza el valor de un único campo. |
| `files` | `object` | Mapa nombre de campo → `File[]` para los archivos subidos. |
| `previews` | `object` | Mapa nombre de campo → `string[]` de URLs de objeto para previsualizar imágenes. |
| `addFiles` | `(field: string, fileList: FileList \| File[]) => void` | Agrega nuevos archivos a una lista existente sin reemplazar los anteriores. |
| `replaceFiles` | `(field: string, fileList: FileList \| File[]) => void` | Reemplaza completamente la lista de archivos de un campo. |
| `removeFile` | `(field: string, index: number) => void` | Elimina un único archivo y su vista previa por índice. |
| `setValues` | `React.Dispatch` | Setter de estado directo para `values` — usar para actualizaciones masivas. |
| `resetForm` | `() => void` | Restablece `values` a `initialValues` y limpia todos los archivos y vistas previas. |

## Uso

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
        placeholder="Nombre de usuario"
      />
      <textarea
        value={values.bio}
        onChange={e => handleChange('bio', e.target.value)}
        placeholder="Biografía"
      />
      <input type="file" accept="image/*"
        onChange={e => addFiles('avatar', e.target.files)} />

      {(previews.avatar || []).map((url, i) => (
        <div key={i}>
          <img src={url} alt="vista previa" width={80} />
          <button type="button" onClick={() => removeFile('avatar', i)}>Eliminar</button>
        </div>
      ))}

      <button type="submit">Guardar</button>
      <button type="button" onClick={resetForm}>Restablecer</button>
    </form>
  );
}
```

## Notas

- Las URLs de objeto creadas por `addFiles` y `replaceFiles` **no** se revocan automáticamente. Llamar a `URL.revokeObjectURL(url)` cuando la vista previa ya no sea necesaria para evitar fugas de memoria, especialmente cuando los usuarios suben muchos archivos de gran tamaño.
- `handleChange` establece un único campo; para actualizaciones masivas de valores usar el dispatcher `setValues` devuelto directamente.
- `files` y `values` se rastrean en objetos de estado separados, por lo que actualizar los archivos no provoca un re-render de los componentes que solo consumen `values`, y viceversa.
- `resetForm` restaura `values` a la instantánea de `initialValues` capturada en el momento de la inicialización del hook — las mutaciones al objeto `initialValues` después del montaje no se reflejan.
