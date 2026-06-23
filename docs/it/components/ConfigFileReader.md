# ConfigFileReader

> [English](../../../docs/en/components/ConfigFileReader.md) | [Versión española](../../es/components/ConfigFileReader.md)

## Panoramica

`ConfigFileReader` è un componente SPOT RFID che mostra un testo guida e un pulsante per selezionare un file `config.json`. È progettato per ambienti in cui l'integrazione nativa del file-picker è fornita esternamente (es. un bridge WebView o una API file-system personalizzata) — il componente renderizza solo il pulsante e delega l'apertura effettiva del file a `handleSelectFile`.

Supporta un'animazione di ingresso opzionale controllata dalla combinazione di `isConfigPage` e `show`.

## Import

```jsx
import { ConfigFileReader } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `handleSelectFile` | `function` | — | ✅ | Chiamata al click del pulsante "Seleziona file". Responsabile dell'apertura del file picker o del trigger del bridge nativo. |
| `show` | `boolean` | — | — | Quando `isConfigPage` è `true`, controlla l'animazione di ingresso: `true` → visibile, `false` → nascosto con offset verso il basso. |
| `isConfigPage` | `boolean` | — | — | Abilita il comportamento animato show/hide guidato da `show`. Quando `false`, il componente è sempre completamente visibile senza animazione. |

## Variabili CSS

Questo componente non usa variabili CSS specifiche per SPOT RFID. Si applicano le variabili di layout generali dell'applicazione ospite.

## Utilizzo

```jsx
import { ConfigFileReader } from 'thecore-auth';

function ConfigPage({ isReady }) {
  const handleSelectFile = () => {
    // Trigger a WebView bridge call or a custom native file dialog
    window.NativeBridge?.openFilePicker('application/json');
  };

  return (
    <div>
      <ConfigFileReader
        isConfigPage={true}
        show={isReady}
        handleSelectFile={handleSelectFile}
      />
    </div>
  );
}
```

## Note

- Questo componente **non** renderizza un `<input type="file">` nascosto. La selezione del file è completamente delegata a `handleSelectFile` — usare [`ConfigFileReaderAllBrowser`](./ConfigFileReaderAllBrowser.md) per il comportamento standard del file-picker del browser.
- L'animazione è attiva solo quando `isConfigPage={true}`. Quando `isConfigPage` è `false` o omesso, `show` non ha effetto.
- Il testo istruzione ("Seleziona il file **config.json**…") è fisso in italiano come requisito di prodotto.
