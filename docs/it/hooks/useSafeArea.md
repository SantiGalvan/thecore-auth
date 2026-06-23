# useSafeArea

> [English](../../../docs/en/hooks/useSafeArea.md) | [Versión española](../../es/hooks/useSafeArea.md)

## Panoramica

`useSafeArea` gestisce la classe CSS `with-safe-area` su `document.body`. Quando la rotta corrente **non** è nell'elenco di esclusione, la classe viene aggiunta in modo che i safe-area insets (es. notch / home bar dell'iPhone) vengano rispettati. La classe viene rimossa nelle rotte escluse (tipicamente la pagina di login) dove si desiderano layout a piena pagina.

## Importazione

```js
import { useSafeArea } from 'thecore-auth';
```

## Parametri

| Nome | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `excludedPaths` | `string[]` | `["/"]` | Array di pathname esatti dove la classe safe-area **non** deve essere applicata. |

## Valore restituito

Questo hook non restituisce nulla (`void`). Opera solo come effetto collaterale.

## Utilizzo

```jsx
import { useSafeArea } from 'thecore-auth';

function App() {
  // Apply safe-area everywhere except the login and splash pages
  useSafeArea(['/', '/splash']);

  return (
    <Routes>
      <Route path="/"       element={<Login />} />
      <Route path="/splash" element={<Splash />} />
      <Route path="/app"    element={<Dashboard />} />
    </Routes>
  );
}
```

```css
/* In your global CSS, define what with-safe-area means */
.with-safe-area {
  padding-bottom: env(safe-area-inset-bottom);
  padding-top:    env(safe-area-inset-top);
}
```

## Note

- Deve essere chiamato all'interno di un componente che è discendente di `<BrowserRouter>` (o equivalente), poiché dipende da `useLocation`.
- La corrispondenza del percorso è un confronto esatto di stringhe (`includes`). I segmenti dinamici (es. `/user/123`) **non** vengono abbinati da un pattern come `/user/:id` — elencare i percorsi letterali da escludere.
- La classe viene rimossa nel cleanup dell'effetto, quindi navigare lontano da una rotta inizia sempre con uno stato pulito prima che venga eseguito il nuovo effetto.
- Se la manipolazione della classe di `document.body` entra in conflitto con altre librerie, considerare l'uso di una variabile CSS o di un approccio con attributi data e adattare l'hook di conseguenza.
