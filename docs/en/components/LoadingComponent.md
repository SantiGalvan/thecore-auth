# LoadingComponent

> [Versione italiana](../../docs/it/components/LoadingComponent.md) | [Versión española](../../docs/es/components/LoadingComponent.md)

## Overview

`LoadingComponent` is a self-contained inline spinner. Unlike `Loading`, it is **not** connected to any context — it accepts all its configuration via props and fits inside any container. Use it to indicate loading state for a specific section of the page rather than the entire viewport.

## Import

```js
import { LoadingComponent } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|---|---|---|---|---|
| `spinner` | `boolean` | `true` | No | Whether to render the spinner icon |
| `spinnerStyle` | `string` | `undefined` | No | Extra Tailwind classes appended to the spinner element |
| `text` | `string` | `'Loading...'` | No | Text shown over the spinner |
| `textStyle` | `string` | `undefined` | No | Extra Tailwind classes appended to the text element |
| `children` | `ReactNode` | `undefined` | No | Custom node rendered instead of the default text |
| `containerStyle` | `string` | `undefined` | No | Extra Tailwind classes appended to the wrapper div |
| `overrideStyle` | `object` | `{}` | No | Per-slot class overrides: `container`, `spinner`, `text` |

## CSS Variables

`LoadingComponent` does not consume any CSS custom properties. Its defaults are hardcoded Tailwind classes (`text-black`, `animate-spin`).

## Usage

```jsx
import { LoadingComponent } from 'thecore-auth';

function UserCard({ isLoading, user }) {
  if (isLoading) {
    return (
      // The component fills its parent, so give the parent a known size
      <div className="h-40 w-full">
        <LoadingComponent
          text="Loading profile…"
          textStyle="text-sm text-gray-500"
          spinnerStyle="text-indigo-500"
        />
      </div>
    );
  }

  return <p>{user.name}</p>;
}
```

### Custom content via `children`

```jsx
<LoadingComponent spinner={false}>
  <span className="text-xs text-gray-400 italic">Please wait…</span>
</LoadingComponent>
```

### Full override

```jsx
<LoadingComponent
  overrideStyle={{
    container: 'flex flex-col items-center gap-2 p-4',
    spinner: 'text-4xl text-blue-600 animate-spin',
    text: 'text-blue-600 text-sm mt-1',
  }}
  text="Syncing…"
/>
```

## Notes

- The container is `w-full h-full relative`, so its size is determined entirely by the parent element.
- `overrideStyle` replaces the full default class string for a slot; `spinnerStyle`, `textStyle`, and `containerStyle` append to defaults.
- When `children` is provided it replaces the `<p>` text element, but the spinner is still rendered unless `spinner={false}`.
