# ModalFooter

> [English](../../../docs/en/components/ModalFooter.md) | [Versión española](../../../docs/es/components/ModalFooter.md)

> ⚙️ **Componente interno** — non importabile direttamente. Utilizzato all'interno di `DefaultLayout`. Interagisci con il sistema modale tramite [`useModal`](../../contexts/ModalProvider.md).

## Panoramica

`ModalFooter` renderizza i pulsanti di azione nella parte inferiore del modale. Il layout e il comportamento dei pulsanti dipendono dal `type`:

- `submit` — annulla + reset + submit (collegato a `formId`)
- `delete` — annulla + conferma distruttiva (chiama `onConfirm`, poi `onClose`)
- `custom` — annulla + conferma (chiama solo `onConfirm`, non si chiude automaticamente)

`Modal` renderizza `ModalFooter` di default; passa `footerContent` a `Modal` per sostituirlo interamente.

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|---|---|---|---|---|
| `onClose` | `function` | — | ✅ | Chiamata quando si clicca annulla; chiamata anche dopo `onConfirm` per il tipo `delete` |
| `onCancel` | `function` | `undefined` | — | Se fornita, ha la precedenza su `onClose` per il pulsante di annullamento |
| `onConfirm` | `function` | `undefined` | — | Chiamata alla conferma per i tipi `delete` e `custom` |
| `type` | `string` | — | ✅ | Tipo di modale: `'submit'` \| `'delete'` \| `'custom'` |
| `formId` | `string` | `undefined` | — | `id` HTML del form collegato ai pulsanti submit/reset (utilizzato nella modalità `submit`) |
| `style` | `object` | `{}` | — | Sovrascritture degli stili — vedi la tabella delle chiavi qui sotto |

### Chiavi dell'oggetto `style`

| Chiave | Tipo | Default | Descrizione |
|---|---|---|---|
| `style.resetButton` | `boolean` | `true` | Se mostrare il pulsante reset (sempre nascosto per il tipo `delete`) |
| `style.confirmButtonText` | `string` | `'Salva'` / `'Elimina'` | Testo del pulsante di conferma; il default dipende dal `type` |
| `style.cancelButtonText` | `string` | `'Annulla'` | Testo del pulsante di annullamento |
| `style.bgSaveButton` | `string` | classi Tailwind indigo | Classi per il pulsante salva (tipi `submit` / `custom`) |
| `style.bgDeleteButton` | `string` | classi Tailwind rose | Classi per il pulsante di conferma eliminazione |
| `style.bgResetButton` | `string` | classi Tailwind rose | Classi per il pulsante reset |
| `style.bgCancelButton` | `string` | classi Tailwind gray | Classi per il pulsante di annullamento |
| `style.customButtonStyle` | `string` | `null` | Sovrascrittura completa delle classi del pulsante di conferma quando `type === 'custom'` |

## Note

- Per il tipo `delete`: il click su conferma chiama `onConfirm?.()` poi `onClose?.()` — il modale si chiude dopo l'azione.
- Per il tipo `custom`: il click su conferma chiama solo `onConfirm?.()` — è responsabilità del chiamante chiudere il modale.
- Per il tipo `submit`: il pulsante di conferma ha `type="submit"` e `form={formId}`; il pulsante reset ha `type="reset"` e `form={formId}`.
- Il pulsante reset viene soppresso quando `type === 'delete'`, indipendentemente da `style.resetButton`.
- L'API completa di `useModal` è documentata in [`docs/modal.md`](../modal.md).
