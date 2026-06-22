# useIndexedDB

> [Versione italiana](../../it/hooks/useIndexedDB.md) | [Versión española](../../es/hooks/useIndexedDB.md)

## Overview

`useIndexedDB` opens an IndexedDB database and exposes a Promise-based CRUD interface for a single object store. The database connection is opened on mount and closed on unmount. An `isReady` flag signals when the database is open and operations can be performed safely.

## Import

```js
import { useIndexedDB } from 'thecore-auth';
```

## Parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `dbName` | `string` | — | Name of the IndexedDB database to open or create. |
| `storeName` | `string` | — | Name of the object store to use within the database. Created automatically on first open. |
| `version` | `number` | `1` | Database schema version. Increment to trigger an `onupgradeneeded` migration. |

## Return value

| Key | Type | Description |
|-----|------|-------------|
| `isReady` | `boolean` | `true` once the database connection is open and operations can be executed. |
| `get` | `(key: any) => Promise<any>` | Retrieves the record matching the primary key. Resolves `undefined` if not found. |
| `getAll` | `() => Promise<any[]>` | Retrieves all records in the store. |
| `set` | `(data: object) => Promise<IDBValidKey>` | Inserts or updates a record. The `data` object must include the `id` field (keyPath). |
| `setWithAutoId` | `(data: object) => Promise<IDBValidKey>` | Same as `set`, but auto-generates a unique numeric `id` if `data.id` is absent. |
| `remove` | `(id: any) => Promise<true>` | Deletes the record with the given primary key. |
| `clear` | `() => Promise<true>` | Deletes all records in the store. |

## Usage

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
    await setWithAutoId({ text: 'New note', createdAt: Date.now() });
    setNotes(await getAll());
  };

  const deleteNote = async (id) => {
    await remove(id);
    setNotes(await getAll());
  };

  return (
    <div>
      <button onClick={addNote}>Add note</button>
      <ul>
        {notes.map(n => (
          <li key={n.id}>
            {n.text} <button onClick={() => deleteNote(n.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Notes

- The object store is created with `keyPath: "id"` on first open. Records must include an `id` field when using `set` directly.
- `setWithAutoId` generates IDs using `Date.now()` and increments until a collision-free value is found — suitable for low-volume writes; not recommended for high-concurrency scenarios.
- All operations reject with an error message string (`"DB non pronto"`) if called before `isReady` is `true`.
- Only a single object store per hook instance is managed. For multiple stores, instantiate the hook multiple times with the same `dbName` and different `storeName` values.
- The database connection is closed automatically when the component unmounts.
