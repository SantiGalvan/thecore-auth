# ModalMain

> [English](../../../docs/en/components/ModalMain.md) | [Versión española](../../../docs/es/components/ModalMain.md)

> ⚙️ **Componente interno** — non importabile direttamente. Utilizzato all'interno di `DefaultLayout`. Interagisci con il sistema modale tramite [`useModal`](../../contexts/ModalProvider.md).

## Panoramica

`ModalMain` renderizza l'area di contenuto scorrevole del modale. Avvolge `children` in un elemento `<main>` con altezza massima fissa e scroll verticale.

Quando `type === 'delete'`, l'intero `<main>` viene soppresso — i modali di eliminazione non contengono contenuto nel corpo, solo la domanda di conferma nell'header e i pulsanti di azione nel footer.

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|---|---|---|---|---|
| `type` | `string` | — | ✅ | Tipo di modale: `'submit'` \| `'delete'` \| `'custom'`. Quando è `'delete'`, non viene renderizzato nulla |
| `children` | `ReactNode` | `undefined` | — | Contenuto renderizzato all'interno dell'area `<main>` scorrevole |
| `item` | `object` | `undefined` | — | Elemento su cui si agisce; quando `type === 'delete'` e `item` è assente, viene mostrato un messaggio di errore al posto di `children` |
| `overrideStyle` | `string` | `undefined` | — | Sostituisce la stringa di classi predefinita (`my-8 max-h-[600px] overflow-y-auto overflow-x-hidden`) quando fornita |

## Note

- L'altezza massima predefinita è `600px`; usa `overrideStyle` (tramite `style.overrideStyle` su `Modal`) per modificarla.
- Lo stato di errore interno (`type === 'delete'` senza `item`) è un controllo difensivo che non è mai visibile in uso normale — `Modal` fornisce sempre `item` per i modali di eliminazione.
- L'API completa di `useModal` è documentata in [`docs/modal.md`](../modal.md).
