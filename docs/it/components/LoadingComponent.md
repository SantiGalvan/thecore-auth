# LoadingComponent

> [English](../../../docs/en/components/LoadingComponent.md) | [Versión española](../../../docs/es/components/LoadingComponent.md)

## Panoramica

`LoadingComponent` è uno spinner inline autonomo. A differenza di `Loading`, **non** è connesso ad alcun context — riceve tutta la configurazione via props e si adatta a qualsiasi container. Usalo per indicare lo stato di caricamento di una sezione specifica della pagina, anziché dell'intero viewport.

## Import

```js
import { LoadingComponent } from 'thecore-auth';
```

## Props

| Nome | Tipo | Default | Obbligatorio | Descrizione |
|---|---|---|---|---|
| `spinner` | `boolean` | `true` | No | Se renderizzare l'icona spinner |
| `spinnerStyle` | `string` | `undefined` | No | Classi Tailwind aggiuntive aggiunte allo spinner |
| `text` | `string` | `'Loading...'` | No | Testo mostrato sopra lo spinner |
| `textStyle` | `string` | `undefined` | No | Classi Tailwind aggiuntive aggiunte all'elemento testo |
| `children` | `ReactNode` | `undefined` | No | Nodo custom renderizzato al posto del testo predefinito |
| `containerStyle` | `string` | `undefined` | No | Classi Tailwind aggiuntive aggiunte al div wrapper |
| `overrideStyle` | `object` | `{}` | No | Override delle classi per slot: `container`, `spinner`, `text` |

## Variabili CSS

`LoadingComponent` non usa proprietà CSS custom. I suoi default sono classi Tailwind hardcoded (`text-black`, `animate-spin`).

## Utilizzo

```jsx
import { LoadingComponent } from 'thecore-auth';

function UserCard({ isLoading, user }) {
  if (isLoading) {
    return (
      // Il componente riempie il parent, quindi assegna una dimensione nota al parent
      <div className="h-40 w-full">
        <LoadingComponent
          text="Caricamento profilo…"
          textStyle="text-sm text-gray-500"
          spinnerStyle="text-indigo-500"
        />
      </div>
    );
  }

  return <p>{user.name}</p>;
}
```

### Contenuto custom tramite `children`

```jsx
<LoadingComponent spinner={false}>
  <span className="text-xs text-gray-400 italic">Attendere prego…</span>
</LoadingComponent>
```

### Override completo

```jsx
<LoadingComponent
  overrideStyle={{
    container: 'flex flex-col items-center gap-2 p-4',
    spinner: 'text-4xl text-blue-600 animate-spin',
    text: 'text-blue-600 text-sm mt-1',
  }}
  text="Sincronizzazione…"
/>
```

## Note

- Il container è `w-full h-full relative`, quindi la sua dimensione è determinata interamente dall'elemento parent.
- `overrideStyle` sostituisce l'intera stringa di classi predefinita per uno slot; `spinnerStyle`, `textStyle` e `containerStyle` si aggiungono ai default.
- Quando `children` è fornito, sostituisce l'elemento testo `<p>`, ma lo spinner viene comunque renderizzato a meno che `spinner={false}`.
