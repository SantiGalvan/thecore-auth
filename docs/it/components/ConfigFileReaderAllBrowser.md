# ConfigFileReaderAllBrowser

> [English](../../../docs/components/ConfigFileReaderAllBrowser.md) | [Versión española](../../es/components/ConfigFileReaderAllBrowser.md)

## Panoramica

`ConfigFileReaderAllBrowser` è un componente SPOT RFID che fornisce un selettore di file cross-browser per un file `config.json`. A differenza di [`ConfigFileReader`](./ConfigFileReader.md), renderizza un `<input type="file" accept=".json">` nascosto e usa un `ref` per attivarlo programmaticamente al click del pulsante visibile — rendendolo compatibile con i browser desktop e mobile standard senza richiedere un bridge nativo.

Su iOS (iPad/iPhone/iPod), un messaggio istruzionale aggiuntivo guida l'utente a salvare il file nell'app File di iOS prima di selezionarlo, aggirando le restrizioni di accesso ai file di iOS.

Supporta un'animazione di ingresso opzionale controllata da `isConfigPage` e `show`.

## Import

```jsx
import { ConfigFileReaderAllBrowser } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `handleFileChange` | `function` | — | ✅ | Handler `onChange` per l'input file nascosto. Riceve il `ChangeEvent` nativo. Usare `event.target.files[0]` per leggere il file selezionato. |
| `show` | `boolean` | — | — | Quando `isConfigPage` è `true`, controlla l'animazione di ingresso: `true` → visibile, `false` → nascosto con offset verso il basso. |
| `isConfigPage` | `boolean` | — | — | Abilita il comportamento animato show/hide guidato da `show`. Quando `false`, il componente è sempre completamente visibile senza animazione. |

## Variabili CSS

Questo componente non usa variabili CSS specifiche per SPOT RFID. Si applicano le variabili di layout generali dell'applicazione ospite.

## Utilizzo

```jsx
import { ConfigFileReaderAllBrowser } from 'thecore-auth';

function ConfigPage({ isReady }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target.result);
        console.log('Loaded config:', config);
      } catch {
        console.error('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <ConfigFileReaderAllBrowser
        isConfigPage={true}
        show={isReady}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}
```

## Note

- Il rilevamento iOS (`/iPad|iPhone|iPod/.test(navigator.userAgent)`) viene eseguito al momento della valutazione del modulo, non all'interno del componente — non è reattivo ai cambiamenti dello user-agent durante la sessione.
- L'`<input type="file">` nascosto accetta solo file `.json` (`accept=".json"`). La restrizione del tipo di file è applicata dalla UI del browser; `handleFileChange` dovrebbe comunque validare il contenuto del file.
- Usare questo componente invece di [`ConfigFileReader`](./ConfigFileReader.md) quando non è disponibile un bridge WebView nativo.
- Il comportamento dell'animazione è identico a `ConfigFileReader`: attivo solo quando `isConfigPage={true}`.
- Il testo istruzione e il messaggio guida iOS sono fissi in italiano come requisito di prodotto.
