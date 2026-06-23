# Alert

> [English](../../../docs/en/components/Alert.md) | [Versión española](../../../docs/es/components/Alert.md)

## Panoramica

`Alert` è un banner di notifica in stile toast posizionato in modo fisso. Legge il suo stato da `AlertContext` e `ConfigContext`, quindi non accetta props. Il banner include una barra di avanzamento che si esaurisce in `alertTimeout` millisecondi, dopodiché si auto-chiude. Su dispositivi mobile/tablet con Sileo abilitato, l'alert viene sostituito da un toast nativo (vedi Note).

## Import

```js
import { Alert } from 'thecore-auth';
```

## Props

Questo componente **non accetta props**. Attivalo chiamando `activeAlert` da `useAlert()`.

| Valore di `useAlert()` | Tipo | Firma | Descrizione |
|---|---|---|---|
| `activeAlert` | `function` | `(type, message, customType?)` | Mostra l'alert |
| `closeAlert` | `function` | `()` | Chiude l'alert immediatamente |
| `showAlert` | `boolean` | — | Se l'alert è attualmente visibile |

**Tipi di alert** (argomento `type` di `activeAlert`):

| Valore | Significato |
|---|---|
| `'danger'` | Errore / azione distruttiva |
| `'info'` | Informazione neutra |
| `'success'` | Operazione riuscita |
| `'warning'` | Avviso non critico |

## Variabili CSS

| Variabile | Default | Descrizione |
|---|---|---|
| `--color-danger` | `#FEE2E2` | Sfondo danger |
| `--color-danger-text` | `#B91C1C` | Colore testo danger |
| `--color-danger-hover` | `#FECACA` | Hover bottone chiudi danger |
| `--color-danger-progress` | `#F87171` | Barra progresso danger |
| `--color-info` | `#EFF6FF` | Sfondo info |
| `--color-info-text` | `#1D4ED8` | Colore testo info |
| `--color-info-hover` | `#BFDBFE` | Hover bottone chiudi info |
| `--color-info-progress` | `#60A5FA` | Barra progresso info |
| `--color-success` | `#ECFDF5` | Sfondo success |
| `--color-success-text` | `#15803D` | Colore testo success |
| `--color-success-hover` | `#A7F3D0` | Hover bottone chiudi success |
| `--color-success-progress` | `#34D399` | Barra progresso success |
| `--color-warning` | `#F9FAEB` | Sfondo warning |
| `--color-warning-text` | `#D97706` | Colore testo warning |
| `--color-warning-hover` | `#FDE047` | Hover bottone chiudi warning |
| `--color-warning-progress` | `#FACC15` | Barra progresso warning |

## Utilizzo

```jsx
import { AlertProvider, useAlert, Alert } from 'thecore-auth';

// Posiziona <Alert /> una volta nella root dell'app
function App({ children }) {
  return (
    <AlertProvider>
      {children}
      <Alert />
    </AlertProvider>
  );
}

// Attiva da qualsiasi componente nell'albero
function SaveButton() {
  const { activeAlert } = useAlert();

  async function handleSave() {
    try {
      await api.save();
      activeAlert('success', 'Record salvato con successo.');
    } catch (err) {
      activeAlert('danger', 'Salvataggio fallito. Riprova.');
    }
  }

  return <button onClick={handleSave}>Salva</button>;
}
```

### Forza l'alert web su mobile

```jsx
// Passa un customType non null per bypassare il toast Sileo anche su mobile
activeAlert('warning', 'Sessione in scadenza.', 'web');
```

## Note

- La durata `alertTimeout` (in millisecondi) è configurata in `ConfigContext` tramite `public/config.json`. La barra di avanzamento si esaurisce linearmente in quella durata.
- Quando `sileoToastEnabled` è `true` nel config e il tipo di dispositivo è `mobile` o `tablet`, `activeAlert` delega ai toast nativi Sileo e `<Alert />` non viene mai mostrato. Passa un argomento `customType` non null per forzare il banner web indipendentemente dal dispositivo.
- Posiziona `<Alert />` nella root del tuo albero di componenti per garantire che l'overlay fisso si sovrapponga a tutto il contenuto.
- Il componente usa `role="alert"` per l'accessibilità.
