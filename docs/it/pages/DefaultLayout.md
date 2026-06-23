# DefaultLayout

> [English](../../pages/DefaultLayout.md) | [Español](../../es/pages/DefaultLayout.md)

## Panoramica

`DefaultLayout` è lo shell di layout renderizzato intorno a ogni rotta in `PackageRoutes`. Stratifica la seguente infrastruttura UI sopra e sotto l'outlet di rotta:

- **Prompt di installazione PWA** — renderizzato quando `pwa.customPrompt` è abilitato in `ConfigContext`
- **Overlay di caricamento** — spinner a schermo intero gestito da `LoadingContext`
- **Banner alert** — gestito da `AlertContext`
- **Sileo Toaster** — notifiche toast configurate tramite `sileoToastConfig` in `ConfigContext`
- **Modal** — gestita da `ModalContext`
- **Header / footer opzionali** — mostrati o nascosti per rotta tramite le prop di esclusione

## Import

```js
import { DefaultLayout } from 'thecore-auth';
```

`DefaultLayout` viene usato automaticamente da `PackageRoutes`. L'import diretto è necessario solo quando si costruisce un albero di layout personalizzato.

## Props

| Nome | Tipo | Default | Richiesto | Descrizione |
|------|------|---------|-----------|-------------|
| `isMain` | `boolean` | `true` | No | Se `true`, avvolge l'outlet in `<main>` e lo nasconde mentre l'overlay di caricamento è attivo |
| `headerComponent` | `ReactElement` | `null` | No | Elemento header renderizzato sopra l'outlet |
| `showHeaderOnLogin` | `boolean` | `false` | No | Mostra l'header sulla rotta di login (`"/"`) |
| `headerExcludedRoutes` | `string[]` | `[]` | No | Pattern di rotte (formato `matchPath` di React Router) in cui l'header viene soppresso |
| `footerComponent` | `ReactElement` | `null` | No | Elemento footer renderizzato sotto l'outlet |
| `showFooterOnLogin` | `boolean` | `false` | No | Mostra il footer sulla rotta di login |
| `footerExcludedRoutes` | `string[]` | `[]` | No | Pattern di rotte in cui il footer viene soppresso |
| `promptComponent` | `ReactElement` | `null` | No | Elemento prompt di installazione PWA, renderizzato solo quando `ConfigContext.pwa.customPrompt` è truthy |

## Utilizzo

`DefaultLayout` viene consumato automaticamente da `PackageRoutes`:

```jsx
<PackageRoutes
  headerComponent={<AppHeader />}
  showHeaderOnLogin={false}
  headerExcludedRoutes={['/settings/:id', '/print/*']}
  footerComponent={<AppFooter />}
  footerExcludedRoutes={['/settings/:id']}
  promptComponent={<PwaInstallBanner />}
/>
```

Per costruire uno shell di layout personalizzato, usalo come override `globalLayout`:

```jsx
const MyLayout = (
  <DefaultLayout
    isMain={false}
    headerComponent={<AdminHeader />}
    showHeaderOnLogin={false}
    footerComponent={<AdminFooter />}
  />
);

<PackageRoutes globalLayout={MyLayout} />
```

## Note

- L'esclusione delle rotte usa `matchPath` di React Router — pattern come `'/report/:id'` e `'/admin/*'` sono entrambi validi.
- Quando `isMain` è `false`, l'outlet viene renderizzato come frammento semplice (senza wrapper `<main>` e senza comportamento hidden-during-loading). Usalo per dashboard che gestiscono il proprio stato di caricamento.
- Il componente `Alert` viene renderizzato due volte quando `isMain` è `true`: una volta fuori da `<main>` (sempre visibile) e una volta dentro. Solo quello esterno è visibile durante il caricamento.
- La posizione dei toast di Sileo è `"bottom-right"` di default se `sileoToastConfig.position` non è impostato nella config.
