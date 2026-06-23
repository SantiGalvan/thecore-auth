# useIndexedDB

> [English](../../../docs/en/hooks/useIndexedDB.md) | [Versión española](../../es/hooks/useIndexedDB.md)

## Panoramica

`useIndexedDB` apre un database IndexedDB ed espone un'interfaccia CRUD basata su Promise per un singolo object store. La connessione al database viene aperta al mount e chiusa all'unmount. Un flag `isReady` segnala quando il database è aperto e le operazioni possono essere eseguite in sicurezza.

## Importazione

```js
import { useIndexedDB } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `dbName` | `string` | — | Nome del database IndexedDB da aprire o creare. |
| `storeName` | `string` | — | Nome dell'object store da usare nel database. Creato automaticamente alla prima apertura. |
| `version` | `number` | `1` | Versione dello schema del database. Incrementare per innescare una migrazione `onupgradeneeded`. |

## Valore restituito

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `isReady` | `boolean` | `true` una volta che la connessione al database è aperta e le operazioni possono essere eseguite. |
| `get` | `(key: any) => Promise<any>` | Recupera il record corrispondente alla chiave primaria. Risolve `undefined` se non trovato. |
| `getAll` | `() => Promise<any[]>` | Recupera tutti i record nello store. |
| `set` | `(data: object) => Promise<IDBValidKey>` | Inserisce o aggiorna un record. L'oggetto `data` deve includere il campo `id` (keyPath). |
| `setWithAutoId` | `(data: object) => Promise<IDBValidKey>` | Come `set`, ma genera automaticamente un `id` numerico univoco se `data.id` è assente. |
| `remove` | `(id: any) => Promise<true>` | Elimina il record con la chiave primaria specificata. |
| `clear` | `() => Promise<true>` | Elimina tutti i record nello store. |

## Utilizzo

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
    await setWithAutoId({ text: 'Nuova nota', createdAt: Date.now() });
    setNotes(await getAll());
  };

  const deleteNote = async (id) => {
    await remove(id);
    setNotes(await getAll());
  };

  return (
    <div>
      <button onClick={addNote}>Aggiungi nota</button>
      <ul>
        {notes.map(n => (
          <li key={n.id}>
            {n.text} <button onClick={() => deleteNote(n.id)}>Elimina</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Note

- L'object store viene creato con `keyPath: "id"` alla prima apertura. I record devono includere un campo `id` quando si usa direttamente `set`.
- `setWithAutoId` genera ID usando `Date.now()` e incrementa fino a trovare un valore senza collisioni — adatto per scritture a basso volume; non raccomandato per scenari ad alta concorrenza.
- Tutte le operazioni rifiutano con una stringa di errore (`"DB non pronto"`) se chiamate prima che `isReady` sia `true`.
- Per ogni istanza dell'hook viene gestito un solo object store. Per più store, istanziare l'hook più volte con lo stesso `dbName` e diversi valori `storeName`.
- La connessione al database viene chiusa automaticamente quando il componente viene smontato.
