# Sistema Modal — thecore-auth

> 🇬🇧 [Documentazione Modal in Inglese](../modal.md) | 🇪🇸 [Documentación Modal en Español](../es/modal.md)

Il modal fornito da `thecore-auth` è un sistema di dialogo centralizzato e guidato dal contesto.
Supporta tre varianti predefinite (`submit`, `delete`, `custom`), override completi dello stile e integrazione nativa con i form — tutto controllato tramite un singolo hook `useModal()` da qualsiasi punto dell'app.

---

## Panoramica

Il modal viene montato una sola volta all'interno di `DefaultLayout` e gestito da `ModalContext`. Le sue tre sezioni — header, main e footer — possono essere personalizzate indipendentemente:

- **Header** — mostra un titolo e un pulsante di chiusura. Completamente sostituibile con un componente personalizzato.
- **Main** — un contenitore vuoto da popolare con qualsiasi componente React (form, testo, messaggi di conferma, ecc.).
- **Footer** — pulsanti di annullamento, reset e conferma. Le etichette, i colori e la visibilità dei pulsanti sono tutti configurabili.

```jsx
<Modal>
  ├── <ModalHeader />   // Titolo, pulsante di chiusura, nome elemento opzionale
  ├── <ModalMain />     // Contenuto dinamico iniettato tramite `component`
  └── <ModalFooter />   // Pulsanti Cancel, Reset (solo submit), Confirm
```

---

## Configurazione

`ModalProvider` deve avvolgere la tua applicazione. È già incluso quando si usa `DefaultLayout` tramite `PackageRoutes`. Se configuri i provider manualmente:

```jsx
import { ModalProvider } from 'thecore-auth';

<ModalProvider>
  <App />
</ModalProvider>
```

Quindi usa l'hook ovunque all'interno:

```jsx
import { useModal } from 'thecore-auth';

const { openModal, closeModal, modalData } = useModal();
```

---

## Tipi di Modal

| Tipo | Pulsanti | Caso d'uso |
|------|---------|-------------|
| `submit` | Cancel · Reset · Save | Form — il pulsante Save invia il form tramite `formId` |
| `delete` | Cancel · Delete | Conferme di azioni distruttive |
| `custom` | Cancel · custom | Controllo manuale completo del comportamento dei pulsanti |

---

## `openModal` — Parametri

Chiama `openModal({ ... })` per aprire il modal:

```js
openModal({
  title: 'Edit user',
  type: 'submit',
  formId: 'user-form',
  component: <UserForm />,
  modalData: user,
  onConfirm: null,
  item: null,
  style: {},
});
```

| Parametro | Tipo | Predefinito | Descrizione |
|-----------|------|-------------|-------------|
| `title` | `string` | `""` | Titolo dell'header. Ignorato se viene fornito un componente header personalizzato. |
| `type` | `'submit' \| 'delete' \| 'custom'` | `'submit'` | Variante del modal. Controlla quali pulsanti appaiono nel footer. |
| `component` | `ReactNode` | `null` | Componente renderizzato all'interno della sezione `main`. |
| `modalData` | `any` | `null` | Dati passati al modal. Poiché il modal vive nel layout, non è possibile condividere direttamente lo stato locale — passalo qui e leggilo con `useModal().modalData`. |
| `onConfirm` | `function` | `null` | Callback del pulsante di conferma. Usato dai tipi `delete` e `custom`. Per `submit`, viene eseguito invece il gestore `onSubmit` del form. |
| `formId` | `string` | `'modal-form'` | ID dell'elemento form. Il pulsante Save riceve `form={formId}` così da inviare il form in modo nativo. Usato solo quando `type === 'submit'`. |
| `item` | `any` | `null` | Entità su cui agisce il modal (ad esempio, il record che viene eliminato). Disponibile all'interno del modal tramite `useModal().item`. |
| `style` | `object` | `{}` | Override dello stile — vedi [Riferimento Stile](#riferimento-stile) di seguito. |

---

## `closeModal`

Chiama `closeModal()` per chiudere il modal e resettare tutto il suo stato:

```js
closeModal();
// Resetta: content, title, onConfirm, type, formId, item, style, modalData
```

---

## Riferimento Stile

Passa un oggetto `style` a `openModal` per sovrascrivere qualsiasi parte dell'aspetto del modal.
Tutte le chiavi sono opzionali — ometti una chiave per mantenere il suo valore predefinito.

### Overlay e contenitore modal

| Chiave | Predefinito | Descrizione |
|--------|-------------|-------------|
| `width` | `'max-w-md w-auto'` (delete) · `'w-full max-w-4xl'` (altri) | Larghezza del modal (classe Tailwind) |
| `bgModal` | `'bg-white'` | Sfondo del modal (classe Tailwind) |
| `bgOverlay` | `'bg-black/50'` | Sfondo dell'overlay (classe Tailwind) |
| `zIndex` | `'z-50'` | Z-index del modal + overlay (classe Tailwind) |

```js
const modalWidth = style.width ?? (type === 'delete' ? 'max-w-md w-auto' : 'w-full max-w-4xl');
const bgModal    = style.bgModal   ?? 'bg-white';
const bgOverlay  = style.bgOverlay ?? 'bg-black/50';
const zIndex     = style.zIndex    ?? 'z-50';
```

### Sezione Main

| Chiave | Predefinito | Descrizione |
|--------|-------------|-------------|
| `overrideStyle` | `'my-8 max-h-[600px] overflow-y-auto overflow-x-hidden'` | Classi CSS per il contenitore main. **Aggiungere anche una sola classe sostituisce l'intero predefinito.** |

### Pulsanti del Footer

| Chiave | Predefinito | Descrizione |
|--------|-------------|-------------|
| `resetButton` | `true` | Mostra o nasconde il pulsante Reset (rilevante solo per il tipo `submit`) |
| `confirmButtonText` | `'Delete'` (delete) · `'Save'` (altri) | Etichetta del pulsante di conferma. Fornire un valore sovrascrive anche la variante delete. |
| `cancelButtonText` | `'Cancel'` | Etichetta del pulsante di annullamento |
| `bgSaveButton` | `'bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 … text-white'` | Classi del pulsante di conferma. **Una sola classe sostituisce tutti i predefiniti.** |
| `bgDeleteButton` | `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 … text-white'` | Classi del pulsante di eliminazione. **Una sola classe sostituisce tutti i predefiniti.** |
| `bgResetButton` | `'bg-rose-500 rounded-lg shadow-md hover:bg-rose-600 … text-white'` | Classi del pulsante Reset. **Una sola classe sostituisce tutti i predefiniti.** |
| `bgCancelButton` | `'text-gray-800 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400 …'` | Classi del pulsante di annullamento. **Una sola classe sostituisce tutti i predefiniti.** |
| `customButtonStyle` | `null` | Classi del pulsante di conferma per il tipo `custom`. **Sovrascrive `bgSaveButton` e `bgDeleteButton`.** |

### Esempio di stile completo

```js
const style = {
  width: 'w-[50%]',
  bgModal: 'bg-slate-300',
  bgOverlay: 'bg-green-800/80',
  zIndex: 'z-60',
  overrideStyle: 'my-2 h-[400px] overflow-auto',
  resetButton: false,
  confirmButtonText: null,
  cancelButtonText: 'Cancel',
  bgSaveButton: null,
  bgDeleteButton: null,
  bgResetButton: 'bg-orange-600 rounded-lg shadow-md hover:bg-orange-700 hover:shadow-lg active:bg-orange-800 text-white',
  bgCancelButton: 'bg-white rounded-lg shadow-md hover:bg-white hover:shadow-lg active:bg-white text-gray-800',
  customButtonStyle: 'bg-orange-500 text-white rounded px-4 py-2 font-medium hover:bg-orange-600 active:bg-orange-700',
};
```

---

## Esempi di Utilizzo

### Modal submit — form all'interno del modal

```jsx
const UserForm = () => {
  const { modalData, closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    // logica di salvataggio…
    closeModal();
  };

  return (
    <form id="user-form" onSubmit={handleSubmit}>
      <input defaultValue={modalData?.name} />
    </form>
  );
};

// Apri il modal
openModal({
  title: 'Edit user',
  type: 'submit',
  formId: 'user-form',
  component: <UserForm />,
  modalData: selectedUser,
});
```

### Modal delete — conferma di un'azione distruttiva

```jsx
openModal({
  title: 'Delete user',
  type: 'delete',
  item: selectedUser,
  onConfirm: async () => {
    await deleteUser(selectedUser.id);
    closeModal();
  },
  style: {
    width: 'max-w-md w-auto',
    confirmButtonText: 'Yes, delete',
    cancelButtonText: 'No, keep it',
  },
});
```

### Modal custom — controllo manuale completo

```jsx
openModal({
  title: 'Custom action',
  type: 'custom',
  component: <MyCustomContent />,
  onConfirm: () => {
    doSomething();
    closeModal();
  },
  style: {
    customButtonStyle: 'bg-teal-600 text-white rounded px-4 py-2 hover:bg-teal-700',
  },
});
```

---

## Modal di Conferma Annidata

Per chiedere all'utente una seconda conferma prima di eseguire un'azione critica, apri un nuovo modal dall'interno di `onConfirm`:

```jsx
// Step 1 — primo modal (qualsiasi tipo)
const openEditModal = () => {
  openModal({
    title: 'Edit record',
    type: 'custom',
    component: <EditForm />,
    onConfirm: () => openConfirmModal(),  // apre la conferma
  });
};

// Step 2 — modal di conferma
const openConfirmModal = () => {
  openModal({
    title: 'Are you sure you want to delete this item?',
    type: 'delete',
    item: selectedItem,
    onConfirm: async () => {
      await deleteItem(selectedItem.id);
      closeModal();
    },
  });
};
```

**Nota:** sebbene sia tecnicamente possibile concatenare da un modal `delete`, il pattern più comune è concatenare da modal `custom` o `submit`.

---

## Note Importanti

- Il modal è un **singleton** — montato una sola volta nel layout principale, condiviso in tutta l'app.
- `modalData` è l'unico modo per passare dati reattivi nel modal. Lo stato locale del componente non aggiornerà il modal dopo che è stato aperto.
- I componenti passati tramite `component` vengono montati e smontati ad ogni ciclo di apertura/chiusura.
- Chiamare `closeModal()` resetta tutto lo stato ai suoi valori iniziali.
- Usa il pattern del modal di conferma solo per **azioni critiche e irreversibili** (eliminazioni, modifiche permanenti).
