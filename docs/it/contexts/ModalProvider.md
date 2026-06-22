# ModalProvider / useModal

> 🇬🇧 [English](../../contexts/ModalProvider.md) | 🇪🇸 [Español](../../es/contexts/ModalProvider.md)

## Panoramica

`ModalProvider` gestisce un'unica finestra modale centralizzata, usata in tutta l'applicazione. È controllata interamente tramite l'hook `useModal()` — nessun prop drilling necessario.

Per il **riferimento API completo** (varianti, opzioni di `openModal`, override di stile, slot dei componenti ed esempi), vedere [docs/modal.md](../../modal.md).

---

## Setup

`ModalProvider` deve avvolgere qualsiasi componente che chiama `useModal()`. Usando `PackageRoutes` / `DefaultLayout`, è già incluso. Per setup manuale:

```jsx
import { ModalProvider } from 'thecore-auth';

function App() {
  return (
    <ModalProvider>
      {/* la tua app */}
    </ModalProvider>
  );
}
```

---

## API dell'hook

```js
const modal = useModal();
```

| Valore | Tipo | Descrizione |
|---|---|---|
| `isOpen` | `boolean` | Se la modale è attualmente visibile |
| `openModal` | `(options: OpenModalOptions) => void` | Apre la modale con la configurazione data |
| `closeModal` | `() => void` | Chiude la modale e azzera tutto lo stato |
| `content` | `ReactElement \| null` | Il componente iniettato in `ModalMain` |
| `title` | `string` | Titolo della modale visualizzato in `ModalHeader` |
| `type` | `'submit' \| 'delete' \| 'custom'` | Determina il layout dei pulsanti nel footer |
| `formId` | `string` | ID che collega il pulsante submit del footer a un form dentro `ModalMain` |
| `item` | `any` | Dati arbitrari passati alla modale (es. l'elemento da eliminare) |
| `style` | `object` | Override di stile per le sezioni della modale |
| `modalData` | `object \| null` | Dati del form controllato gestiti dentro la modale |
| `setModalData` | `(data: object) => void` | Sovrascrive `modalData` direttamente |
| `handleChange` | `(e: ChangeEvent) => void` | Handler generico per i cambiamenti degli input in `modalData` |
| `handleSubmit` | `(e: FormEvent) => void` | Chiama `onConfirm(modalData)` poi chiude la modale |
| `headerContent` | `ReactElement \| null` | Slot header personalizzato (sostituisce il `ModalHeader` predefinito) |
| `setHeaderContent` | `(element: ReactElement) => void` | Imposta un componente header personalizzato |
| `footerContent` | `ReactElement \| null` | Slot footer personalizzato (sostituisce il `ModalFooter` predefinito) |
| `setFooterContent` | `(element: ReactElement) => void` | Imposta un componente footer personalizzato |
| `onCancel` | `() => void \| null` | Callback chiamata alla cancellazione |
| `setOnCancel` | `(fn: () => void) => void` | Imposta la callback di cancellazione |

Per i campi di `OpenModalOptions` ed esempi dettagliati, vedere [docs/modal.md](../../modal.md).

---

## Note

- Tutto lo stato della modale viene resettato da `closeModal()` — titolo, contenuto, formId, tipo, stile, item e modalData tornano ai valori predefiniti.
- La modale è progettata per essere aperta da qualsiasi punto dell'albero. Non è necessario che il trigger sia vicino al componente modale.
- Per la descrizione completa delle opzioni di `openModal` e delle varianti della modale, vedere [docs/modal.md](../../modal.md).
