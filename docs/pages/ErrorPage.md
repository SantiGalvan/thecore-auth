# ErrorPage

> [Italiano](../it/pages/ErrorPage.md) | [Español](../es/pages/ErrorPage.md)

## Overview

`ErrorPage` is a minimal error display component. It shows a full-page "Errore" heading and a `<pre>` block with the error message. The whole section is hidden with the `hidden` CSS class when `errorShow` is `false`, making it suitable for conditional rendering without unmounting.

## Import

```js
import { ErrorPage } from 'thecore-auth';
```

## Props

| Name | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| `errorMessage` | `string` | `undefined` | No | The error text displayed inside a `<pre>` element |
| `errorShow` | `boolean` | `undefined` | No | Controls visibility. When `false`, the section receives the `hidden` class |

## Usage

### As a React Router error boundary

```jsx
import { useRouteError } from 'react-router-dom';
import { ErrorPage } from 'thecore-auth';

function RouteErrorBoundary() {
  const error = useRouteError();
  const message = error instanceof Error
    ? error.message
    : String(error);

  return <ErrorPage errorMessage={message} errorShow={true} />;
}

// In your router configuration:
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteErrorBoundary />,
  },
]);
```

### Conditional visibility

```jsx
import { useState } from 'react';
import { ErrorPage } from 'thecore-auth';

function DataLoader() {
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      await fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <button onClick={load}>Load</button>
      <ErrorPage
        errorMessage={error}
        errorShow={Boolean(error)}
      />
    </>
  );
}
```

## Notes

- The heading text ("Errore") is hardcoded. If you need a localized or custom heading, use `ErrorPage` as a reference and build your own.
- `errorShow` hides via the Tailwind `hidden` utility class — the component stays mounted and the DOM node remains in the tree.
- `errorMessage` is rendered inside `<pre>`, so stack traces and multi-line strings are preserved as-is.
