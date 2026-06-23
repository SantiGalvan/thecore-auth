# ModalHeader

> [English](../../../docs/en/components/ModalHeader.md) | [Versión española](../../../docs/es/components/ModalHeader.md)

> ⚙️ **Componente interno** — non importabile direttamente. Utilizzato all'interno di `DefaultLayout`. Interagisci con il sistema modale tramite [`useModal`](../../contexts/ModalProvider.md).

## Panoramica

`ModalHeader` renderizza la sezione superiore del modale: un titolo a sinistra e un pulsante di chiusura `×` a destra. Il contenuto del titolo si adatta al tipo di modale:

- `type === 'delete'` e `name` è impostato → mostra "Sei sicuro di volere eliminare: **{name}**?"
- altrimenti → mostra `title` se fornito, con fallback a `'Conferma operazione'`

`Modal` renderizza `ModalHeader` di default; passa `headerContent` a `Modal` per sostituirlo interamente.

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|---|---|---|---|---|
| `onClose` | `function` | — | ✅ | Chiamata quando si clicca il pulsante `×` (a meno che non sia fornito `onCancel`) |
| `onCancel` | `function` | `undefined` | — | Se fornita, ha la precedenza su `onClose` per il click del pulsante `×` |
| `type` | `string` | — | ✅ | Tipo di modale: `'submit'` \| `'delete'` \| `'custom'`; controlla la logica di rendering del titolo |
| `title` | `string` | `'Conferma operazione'` | — | Testo del titolo mostrato quando `type !== 'delete'` o `name` è assente |
| `name` | `string` | `undefined` | — | Nome dell'elemento utilizzato nella domanda di conferma eliminazione |

## Note

- Il pulsante `×` viene sempre renderizzato indipendentemente dal `type`.
- Il pulsante di chiusura ha un'animazione di scala/opacità al passaggio del cursore e un `aria-label="Chiudi modale"` per l'accessibilità.
- Per mostrare un header personalizzato, passa `headerContent` a `Modal` invece di sovrascrivere `ModalHeader` direttamente.
- L'API completa di `useModal` è documentata in [`docs/modal.md`](../modal.md).
