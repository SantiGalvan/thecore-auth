# useToast

> [English](../../../docs/en/hooks/useToast.md) | [Versión española](../../es/hooks/useToast.md)

## Panoramica

`useToast` fornisce un'interfaccia tipizzata intorno alla libreria di notifiche [Sileo](https://github.com/sileo-js/sileo). Espone una funzione per ogni variante di toast — `success`, `error`, `info`, `warning` e `promise` — in modo che i componenti possano mostrare messaggi di feedback senza importare Sileo direttamente.

## Importazione

```js
import { useToast } from 'thecore-auth';
```

## Parametri

Questo hook non accetta parametri.

## Valore restituito

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `success` | `(title: string, description?: string) => void` | Mostra un toast verde di successo. |
| `error` | `(title: string, description?: string) => void` | Mostra un toast rosso di errore. |
| `info` | `(title: string, description?: string) => void` | Mostra un toast blu informativo. |
| `warning` | `(title: string, description?: string) => void` | Mostra un toast arancione di avviso. |
| `promise` | `(promise: Promise, messages: SileoPromiseMessages) => void` | Mostra un toast di caricamento che passa a successo o errore in base all'esito della promise. |

## Utilizzo

```jsx
import { useToast } from 'thecore-auth';

function SaveButton({ onSave }) {
  const toast = useToast();

  const handleClick = async () => {
    try {
      await toast.promise(
        onSave(),
        {
          loading: 'Salvataggio in corso...',
          success: { title: 'Salvato', description: 'Le modifiche sono state salvate.' },
          error:   { title: 'Errore',  description: 'Impossibile salvare. Riprova.' },
        }
      );
    } catch {
      toast.error('Errore imprevisto', 'Contatta il supporto.');
    }
  };

  return <button onClick={handleClick}>Salva</button>;
}

// Simple feedback example
function DeleteButton({ onDelete }) {
  const { success, error } = useToast();

  const handleDelete = async () => {
    try {
      await onDelete();
      success('Eliminato', 'L'elemento è stato rimosso con successo.');
    } catch {
      error('Eliminazione fallita', 'L'elemento non può essere rimosso.');
    }
  };

  return <button onClick={handleDelete}>Elimina</button>;
}
```

## Note

- Sileo deve essere configurato nella root dell'applicazione (es. `<SileoProvider />`) per visualizzare i toast. `useToast` racchiude solo l'API imperativa — non monta il container.
- Il metodo `promise` rispecchia la firma di `sileo.promise`. Consultare la documentazione di Sileo per la forma esatta dell'argomento `messages`.
- Tutte le funzioni restituite vengono ricreate ad ogni render (nessun `useCallback`). Se vengono passate come props o usate nelle dipendenze di `useEffect`, memorizzare con useCallback al punto di chiamata se necessario.
