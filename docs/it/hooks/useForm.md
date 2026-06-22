# useForm

> [English](../../../docs/hooks/useForm.md) | [Versión española](../../es/hooks/useForm.md)

## Panoramica

`useForm` gestisce lo stato di un form che può contenere sia valori di campi primitivi che upload di file. Gestisce le modifiche ai campi, l'aggiunta, la sostituzione e la rimozione di file, e genera automaticamente URL di anteprima degli oggetti per i file immagine.

## Importazione

```js
import { useForm } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `initialValues` | `object` | `{}` | Valori iniziali per tutti i campi non-file, con chiave per nome del campo. |

## Valore restituito

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `values` | `object` | Valori correnti dei campi non-file. |
| `handleChange` | `(field: string, value: any) => void` | Aggiorna il valore di un singolo campo. |
| `files` | `object` | Mappa nome campo → `File[]` per i file caricati. |
| `previews` | `object` | Mappa nome campo → `string[]` di URL oggetto per l'anteprima delle immagini. |
| `addFiles` | `(field: string, fileList: FileList | File[]) => void` | Aggiunge nuovi file a una lista esistente senza sostituire quelli precedenti. |
| `replaceFiles` | `(field: string, fileList: FileList | File[]) => void` | Sostituisce completamente la lista dei file per un campo. |
| `removeFile` | `(field: string, index: number) => void` | Rimuove un singolo file e la sua anteprima per indice. |
| `setValues` | `React.Dispatch` | Setter dello stato diretto per `values` — usare per aggiornamenti in blocco. |
| `resetForm` | `() => void` | Reimposta `values` a `initialValues` e cancella tutti i file e le anteprime. |

## Utilizzo

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
          <img src={url} alt="anteprima" width={80} />
          <button type="button" onClick={() => removeFile('avatar', i)}>Rimuovi</button>
        </div>
      ))}

      <button type="submit">Salva</button>
      <button type="button" onClick={resetForm}>Reimposta</button>
    </form>
  );
}
```

## Note

- Gli URL degli oggetti creati da `addFiles` e `replaceFiles` **non** vengono revocati automaticamente. Chiamare `URL.revokeObjectURL(url)` quando l'anteprima non è più necessaria per evitare memory leak, specialmente quando gli utenti caricano molti file di grandi dimensioni.
- `handleChange` imposta un singolo campo; per aggiornamenti in blocco dei valori usare direttamente il dispatcher `setValues` restituito.
- `files` e `values` vengono tracciati in oggetti di stato separati, quindi l'aggiornamento dei file non fa ri-renderizzare i componenti che consumano solo `values`, e viceversa.
- `resetForm` ripristina `values` alla snapshot di `initialValues` catturata al momento dell'inizializzazione dell'hook — le mutazioni all'oggetto `initialValues` dopo il mount non vengono riflesse.
