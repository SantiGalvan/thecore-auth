# useIndexedDB

> [English](../../../docs/hooks/useIndexedDB.md) | [Versione italiana](../../it/hooks/useIndexedDB.md)

## Descripción general

`useIndexedDB` abre una base de datos IndexedDB y expone una interfaz CRUD basada en Promise para un único almacén de objetos. La conexión a la base de datos se abre al montarse y se cierra al desmontarse. Un flag `isReady` señala cuándo la base de datos está abierta y las operaciones pueden realizarse de forma segura.

## Importación

```js
import { useIndexedDB } from 'thecore-auth';
```

## Parámetros

| Nombre | Tipo | Por defecto | Descripción |
|--------|------|-------------|-------------|
| `dbName` | `string` | — | Nombre de la base de datos IndexedDB a abrir o crear. |
| `storeName` | `string` | — | Nombre del almacén de objetos a usar dentro de la base de datos. Se crea automáticamente en la primera apertura. |
| `version` | `number` | `1` | Versión del esquema de la base de datos. Incrementar para desencadenar una migración `onupgradeneeded`. |

## Valor de retorno

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `isReady` | `boolean` | `true` una vez que la conexión a la base de datos está abierta y las operaciones pueden ejecutarse. |
| `get` | `(key: any) => Promise<any>` | Recupera el registro que coincide con la clave primaria. Resuelve `undefined` si no se encuentra. |
| `getAll` | `() => Promise<any[]>` | Recupera todos los registros del almacén. |
| `set` | `(data: object) => Promise<IDBValidKey>` | Inserta o actualiza un registro. El objeto `data` debe incluir el campo `id` (keyPath). |
| `setWithAutoId` | `(data: object) => Promise<IDBValidKey>` | Igual que `set`, pero genera automáticamente un `id` numérico único si `data.id` está ausente. |
| `remove` | `(id: any) => Promise<true>` | Elimina el registro con la clave primaria especificada. |
| `clear` | `() => Promise<true>` | Elimina todos los registros del almacén. |

## Uso

```jsx
import { useIndexedDB } from 'thecore-auth';

function NoteList() {
  const { isReady, getAll, setWithAutoId, remove } = useIndexedDB('notesDB', 'notes');
  const [notes, setNotes] = React.useState([]);

  // Load all notes once the DB is open
  React.useEffect(() => {
    if (!isReady) return;
    getAll().then(setNotes);
  }, [isReady, getAll]);

  const addNote = async () => {
    await setWithAutoId({ text: 'Nueva nota', createdAt: Date.now() });
    setNotes(await getAll());
  };

  const deleteNote = async (id) => {
    await remove(id);
    setNotes(await getAll());
  };

  return (
    <div>
      <button onClick={addNote}>Agregar nota</button>
      <ul>
        {notes.map(n => (
          <li key={n.id}>
            {n.text} <button onClick={() => deleteNote(n.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Notas

- El almacén de objetos se crea con `keyPath: "id"` en la primera apertura. Los registros deben incluir un campo `id` cuando se usa `set` directamente.
- `setWithAutoId` genera IDs usando `Date.now()` e incrementa hasta encontrar un valor sin colisiones — adecuado para escrituras de bajo volumen; no recomendado para escenarios de alta concurrencia.
- Todas las operaciones rechazan con una cadena de error (`"DB non pronto"`) si se llaman antes de que `isReady` sea `true`.
- Solo se gestiona un almacén de objetos por instancia del hook. Para múltiples almacenes, instanciar el hook varias veces con el mismo `dbName` y diferentes valores `storeName`.
- La conexión a la base de datos se cierra automáticamente cuando el componente se desmonta.
