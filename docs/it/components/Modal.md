# Modal

> [English](../../../docs/en/components/Modal.md) | [Versión española](../../../docs/es/components/Modal.md)

> ⚙️ **Componente interno** — non importabile direttamente. Utilizzato all'interno di `DefaultLayout`. Interagisci con il sistema modale tramite [`useModal`](../../contexts/ModalProvider.md).

## Panoramica

`Modal` è il componente radice del modale. Esegue il rendering tramite un portale in `document.body`, gestisce l'animazione di apertura/chiusura, intrappola il focus della tastiera e si chiude alla pressione di `Escape` o al click sul backdrop. Compone `ModalHeader`, `ModalMain` e `ModalFooter` — ognuno dei quali può essere sostituito da uno slot personalizzato tramite `headerContent` / `footerContent`.

Tramite la prop `type` sono disponibili tre modalità comportamentali:
- `submit` — renderizza un footer con pulsanti salva/reset/annulla collegati a un form; la prop `formId` collega il pulsante di submit a un `<form>`.
- `delete` — larghezza ridotta, nessuna area principale, l'header mostra una domanda di conferma con il nome dell'elemento, il footer contiene un pulsante di conferma distruttivo.
- `custom` — il pulsante di conferma nel footer chiama `onConfirm` direttamente senza inviare un form.

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|---|---|---|---|---|
| `isOpen` | `boolean` | — | ✅ | Controlla la visibilità del modale e l'animazione di ingresso |
| `onClose` | `function` | — | ✅ | Chiamata quando il modale deve chiudersi (click sul backdrop, ESC, pulsante chiudi) |
| `onCancel` | `function` | `undefined` | — | Se fornita, sostituisce `onClose` per le azioni ESC, click sul backdrop e pulsante di chiusura/annullamento |
| `title` | `string` | `undefined` | — | Titolo renderizzato in `ModalHeader` (non utilizzato quando `type === 'delete'` e `item.name` è impostato) |
| `formId` | `string` | `undefined` | — | `id` HTML del form collegato ai pulsanti submit/reset in `ModalFooter` |
| `children` | `ReactNode` | `undefined` | — | Contenuto renderizzato all'interno di `ModalMain` |
| `item` | `object` | `undefined` | — | Elemento su cui si agisce; `item.name` appare nell'header di conferma eliminazione |
| `onConfirm` | `function` | `undefined` | — | Chiamata all'azione di conferma per i tipi `delete` e `custom` |
| `type` | `string` | `'submit'` | — | Modalità comportamentale del modale: `'submit'` \| `'delete'` \| `'custom'` |
| `style` | `object` | `{}` | — | Oggetto di sovrascrittura degli stili — vedi la tabella delle chiavi dell'oggetto `style` qui sotto |
| `headerContent` | `ReactNode` | `undefined` | — | Sostituisce completamente `ModalHeader` quando fornito |
| `footerContent` | `ReactNode` | `undefined` | — | Sostituisce completamente `ModalFooter` quando fornito |

### Chiavi dell'oggetto `style`

| Chiave | Tipo | Default | Descrizione |
|---|---|---|---|
| `style.width` | `string` | `'max-w-md w-auto'` (delete) / `'w-full max-w-4xl'` | Classi Tailwind per la larghezza del contenitore del modale |
| `style.bgModal` | `string` | `'bg-white'` | Classe per il colore di sfondo del pannello modale |
| `style.bgOverlay` | `string` | `'bg-black/50'` | Classe per il colore di sfondo del backdrop |
| `style.zIndex` | `string` | `'z-50'` | Classe z-index per l'overlay |
| `style.overlayStyle` | `string` | `undefined` | Stringa di classi completa per il `<div>` overlay esterno (sostituisce tutti i default) |
| `style.modalStyle` | `string` | `undefined` | Stringa di classi completa per il pannello modale interno (sostituisce tutti i default) |
| `style.overrideStyle` | `string` | `undefined` | Passato a `ModalMain`; sostituisce la stringa di classi predefinita del `<main>` |
| `style.resetButton` | `boolean` | `true` | Se mostrare il pulsante reset in `ModalFooter` (ignorato per il tipo `delete`) |
| `style.confirmButtonText` | `string` | `'Salva'` / `'Elimina'` | Testo del pulsante di conferma |
| `style.cancelButtonText` | `string` | `'Annulla'` | Testo del pulsante di annullamento |
| `style.bgSaveButton` | `string` | classi Tailwind indigo | Classi per il pulsante salva (tipi `submit`/`custom`) |
| `style.bgDeleteButton` | `string` | classi Tailwind rose | Classi per il pulsante di conferma eliminazione |
| `style.bgResetButton` | `string` | classi Tailwind rose | Classi per il pulsante reset |
| `style.bgCancelButton` | `string` | classi Tailwind gray | Classi per il pulsante di annullamento |
| `style.customButtonStyle` | `string` | `null` | Sovrascrittura completa delle classi del pulsante di conferma quando `type === 'custom'` |

## Note

- `Modal` usa `ReactDOM.createPortal` per renderizzare in `document.body`, quindi non è influenzato dai contesti di impilamento `overflow` o `z-index` degli elementi antenato.
- All'apertura, il focus si sposta sul pannello modale e viene ripristinato sull'elemento precedentemente focalizzato alla chiusura.
- Se sono forniti sia `onCancel` che `onClose`, `onCancel` viene chiamato prima per ESC e le azioni sul backdrop/pulsante header; `onClose` viene comunque utilizzato internamente dopo la conferma di eliminazione.
- `headerContent` e `footerContent` sono vie di fuga — preferire le sovrascritture tramite `style` per la personalizzazione visiva.
- L'API completa di `useModal` (openModal, closeModal, riferimento agli stili) è documentata in [`docs/modal.md`](../modal.md).
