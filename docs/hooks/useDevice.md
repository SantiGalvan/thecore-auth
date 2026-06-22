# useDevice

> [Versione italiana](../../it/hooks/useDevice.md) | [Versión española](../../es/hooks/useDevice.md)

## Overview

`useDevice` parses the current User-Agent string via `ua-parser-js` and returns a stable object describing the device type, OS, browser, and convenience boolean flags. The result is computed once and cached at module level, so subsequent calls (even across different components) share the same object without re-parsing.

## Import

```js
import { useDevice } from 'thecore-auth';
```

## Parameters

This hook accepts no parameters.

## Return value

| Key | Type | Description |
|-----|------|-------------|
| `type` | `string` | Device type: `"mobile"`, `"tablet"`, or `"desktop"`. |
| `os` | `string \| undefined` | Operating system name (e.g. `"iOS"`, `"Android"`, `"Windows"`). |
| `browser` | `string \| undefined` | Browser name (e.g. `"Chrome"`, `"Safari"`, `"Firefox"`). |
| `vendor` | `string \| null` | Device manufacturer (e.g. `"Apple"`, `"Samsung"`), or `null` if unknown. |
| `model` | `string \| null` | Device model (e.g. `"iPhone"`, `"iPad"`), or `null` if unknown. |
| `isMobile` | `boolean` | `true` for phones. |
| `isTablet` | `boolean` | `true` for tablets, including iPads masked as desktop by Safari. |
| `isDesktop` | `boolean` | `true` when neither mobile nor tablet. |
| `isIPhone` | `boolean` | `true` when the device model is `"iPhone"`. |
| `isIPad` | `boolean` | `true` for iPads, including those where Safari reports `MacIntel`. |
| `isAndroid` | `boolean` | `true` when the OS is `"Android"`. |

## Usage

```jsx
import { useDevice } from 'thecore-auth';

function AdaptiveLayout({ children }) {
  const { isMobile, isTablet, isDesktop, os } = useDevice();

  return (
    <div
      className={
        isMobile  ? 'layout-mobile'  :
        isTablet  ? 'layout-tablet'  :
                    'layout-desktop'
      }
    >
      {isDesktop && <Sidebar />}
      <main>{children}</main>
      {isMobile && os === 'iOS' && <IOSInstallBanner />}
    </div>
  );
}
```

## Notes

- The UA is parsed at most once per page load. The result is stored in a module-level variable (`cachedDevice`), so calling `useDevice` in multiple components is free after the first call.
- iPad detection includes a fallback for Safari ≥ 13 on iPadOS, which reports `MacIntel` as the platform. The hook checks `navigator.platform === "MacIntel" && "ontouchend" in document` to identify these devices.
- Because the result is cached, it does not change reactively. If the hook is used in a server-side rendering context, `navigator` / `document` will not be available and the hook will throw.
- `useMemo` with an empty dependency array is used to guarantee referential stability; the returned object is always the same cached reference.
