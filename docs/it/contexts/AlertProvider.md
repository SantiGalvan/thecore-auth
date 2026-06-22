# AlertProvider / useAlert

> 🇬🇧 [English](../../contexts/AlertProvider.md) | 🇪🇸 [Español](../../es/contexts/AlertProvider.md)

## Panoramica

`AlertProvider` gestisce le notifiche in-app. Su desktop renderizza un banner di alert; su mobile/tablet usa le notifiche toast di Sileo (quando `sileoToastEnabled: true` nella config). Sono supportati quattro tipi di severità: `danger`, `info`, `success`, `warning`.

---

## Setup

Inserire `AlertProvider` all'interno di `ConfigProvider` (legge `sileoToastEnabled` e `customDeviceType` dalla config).

```jsx
import { ConfigProvider, AlertProvider } from 'thecore-auth';

function App() {
  return (
    <ConfigProvider>
      <AlertProvider>
        {/* la tua app */}
      </AlertProvider>
    </ConfigProvider>
  );
}
```

Per visualizzare il banner di alert, renderizzare il componente `Alert` (di `thecore-auth`) nel layout — tipicamente al livello superiore dentro `AlertProvider`.

---

## API dell'hook

```js
const alert = useAlert();
```

| Valore | Tipo | Descrizione |
|---|---|---|
| `showAlert` | `boolean` | Se il banner di alert è attualmente visibile |
| `setShowAlert` | `(value: boolean) => void` | Mostra o nasconde manualmente il banner |
| `typeAlert` | `'danger' \| 'info' \| 'success' \| 'warning'` | Severità dell'alert corrente |
| `setTypeAlert` | `(type: string) => void` | Sovrascrive il tipo di alert direttamente |
| `messageAlert` | `string` | Testo del messaggio di alert corrente |
| `setMessageAlert` | `(message: string) => void` | Sovrascrive il messaggio direttamente |
| `alertConfig` | `Record<string, object>` | Mappe di classi Tailwind per ogni tipo di alert (colori, hover, ring, progress) |
| `getIcon` | `(type: string) => ReactElement` | Restituisce il componente icona per il tipo di alert dato |
| `closeAlert` | `() => void` | Alterna `showAlert` per chiudere il banner |
| `activeAlert` | `(type, message, customType?) => void` | Attiva un alert — usa il toast Sileo su mobile/tablet, il banner su desktop |

### Parametri di `activeAlert`

| Parametro | Tipo | Descrizione |
|---|---|---|
| `type` | `'danger' \| 'info' \| 'success' \| 'warning'` | Severità dell'alert |
| `message` | `string` | Il testo da visualizzare |
| `customType` | `any` (opzionale) | Se truthy, forza il banner anche su mobile (bypassa Sileo) |

---

## Utilizzo

```jsx
import { useAlert } from 'thecore-auth';

function DeleteButton({ onDelete }) {
  const { activeAlert } = useAlert();

  const handleDelete = async () => {
    try {
      await onDelete();
      activeAlert('success', 'Elemento eliminato con successo');
    } catch {
      activeAlert('danger', 'Impossibile eliminare l\'elemento');
    }
  };

  return <button onClick={handleDelete}>Elimina</button>;
}
```

---

## Note

- Su mobile e tablet, quando `sileoToastEnabled: true`, `activeAlert` invia un toast Sileo e ritorna immediatamente — `showAlert` non viene mai impostato a `true` in questo percorso.
- `customDeviceType` nella config sovrascrive il tipo di dispositivo rilevato automaticamente. Utile per forzare il comportamento desktop in ambienti ibridi.
- `activeAlert` azzera `showAlert` a `false` prima di impostare il nuovo alert (tramite un `setTimeout` da 50 ms) per forzare un re-render anche quando lo stesso messaggio viene attivato due volte di fila.
- `closeAlert` alterna il valore (non imposta incondizionatamente a `false`) — evitare di chiamarlo quando `showAlert` è già `false`.
