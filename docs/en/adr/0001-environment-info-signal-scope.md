# 1. Scope of browser/device signals collected by `useEnvironmentInfo`

Date: 2026-07-29

## Status

Accepted

## Context

We want a new internal hook that centralizes reading of browser/device environment
signals not already captured by existing hooks (`useDevice`, `useOrientation`,
`useViewportHeight`, `useSafeArea`, `useUserActivity`). A research pass cataloged
roughly 70 signals retrievable from a browser via JavaScript, grouped by risk:

1. Reliable, low-risk, no permission required (e.g. `navigator.language`, `Intl`
   timezone/locale, `hardwareConcurrency`, `maxTouchPoints`, `devicePixelRatio`,
   screen dimensions, `prefers-color-scheme`/`prefers-reduced-motion`, `onLine`).
2. Useful but partial/Chromium-only (e.g. `userAgentData`, `deviceMemory`,
   `navigator.connection`, Generic Sensor API, `IdleDetector`, WebGPU adapter info,
   Window Management API).
3. Deprecated or actively being removed by browser vendors (Battery Status API,
   `navigator.plugins`/`mimeTypes`, `navigator.doNotTrack`, `navigator.oscpu`,
   `performance.timing`/`performance.navigation`).
4. Fingerprinting-grade or consent-sensitive techniques (canvas/audio
   fingerprinting, WebGL `UNMASKED_RENDERER/VENDOR_WEBGL`, brute-force font
   enumeration, WebRTC local IP leak via ICE candidates, precise geolocation,
   `IdleDetector`, motion/orientation sensors, `speechSynthesis.getVoices()`).

`thecore-auth` is a published npm library consumed by other applications. Any
signal this library collects by default is inherited silently by every consumer
app, which cannot easily opt out without forking the hook. This makes the
collection criteria a library-wide decision, not a per-app one.

## Decision

`useEnvironmentInfo` (`src/hooks/environment/useEnvironmentInfo.jsx`) collects
**only signals that do not trigger a browser permission prompt**, drawn from
groups 1 and 2 above. Within that set, we exclude two additional categories even
though they technically require no prompt:

- **Deprecated/removed APIs** (group 3) — building on them creates dead code as
  browser support disappears.
- **Active fingerprinting techniques** (group 4) — canvas/audio fingerprinting,
  WebGL unmasked renderer/vendor, brute-force font enumeration, WebRTC IP leak,
  and `speechSynthesis.getVoices()` are not "environment info", they are
  adversarial identification techniques that browser vendors actively fight
  (Firefox/Safari add noise or block them outright). Shipping them by default in
  a library would carry GDPR/consent implications the consuming application has
  not agreed to.

The hook also returns capability flags (e.g. `'bluetooth' in navigator`,
`'wakeLock' in navigator`, `'share' in navigator`) alongside informational
values, since presence checks carry the same "no prompt" property.

Within the collected set, fields are split into two update strategies:

- **Static** — computed once and memoized (mirrors the existing `useDevice`
  pattern): `hardwareConcurrency`, `deviceMemory`, `maxTouchPoints`, screen
  dimensions, `userAgentData` low-entropy fields, `cookieEnabled`, and all
  capability flags.
- **Dynamic** — re-read on the relevant browser event: `language`/`languages`
  (+ derived `Intl.Locale`) on `languagechange`, `devicePixelRatio` on `resize`,
  `screen.orientation` on its `change` event, `navigator.connection` on its
  `change` event, `navigator.onLine` on `online`/`offline`, and each media-query
  preference (`prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`,
  `forced-colors`, `prefers-reduced-data`, `display-mode: standalone`) on its own
  `matchMedia` `change` listener.
- Two fields have no native change event and are handled as special cases:
  `Intl.DateTimeFormat().resolvedOptions().timeZone` is read once and recomputed
  alongside `language` on `languagechange`; `navigator.storage.estimate()` is
  read once at mount and exposed with a manual `refreshStorageEstimate()`
  function instead of being polled.

For this first iteration, the hook does not persist anything. Every individual
read logs its own result (`console.log('[useEnvironmentInfo] <field>:', value)`)
so the actual data shape can be inspected in real usage before a persistence
mechanism is designed. The hook remains **internal** (not exported from
`src/index.js`) until we decide it is stable and useful enough to become part of
the public API.

## Consequences

- Consumers of `thecore-auth` are not exposed to any new permission prompts or
  fingerprinting behavior through this hook.
- Some genuinely useful signals (network quality via `navigator.connection`,
  device memory) remain Chromium-only; call sites must treat them as
  best-effort/optional, not guaranteed.
- Fingerprinting-grade techniques and permission-gated APIs (geolocation reads,
  `mediaDevices.enumerateDevices()`, motion sensors, `IdleDetector`) are
  explicitly out of scope for this hook. If a future feature genuinely needs one
  of them, it should be an explicit, opt-in addition with its own ADR and
  documented consent story — not folded into this hook's default output.
- Persistence (indexedDB / localStorage / sessionStorage, config-driven via
  `public/config.json`) is deliberately deferred. A follow-up ADR will cover
  where the data is stored, its retention, and any consumer-facing disclosure
  requirements once real usage data from this iteration is available.
- Because the hook is internal, no public documentation (`README.md`,
  `DOCUMENTATION_IT.md`, `DOCUMENTATION_ES.md`) update is required yet; this will
  become mandatory the moment it is exported from `src/index.js`.

## Update — 2026-08-06

The hook is now exported from `src/index.js` and documented in `README.md` /
`DOCUMENTATION_IT.md` / `DOCUMENTATION_ES.md`. Per-field `console.log` calls are
no longer unconditional: they are gated behind `environmentInfoLog` in
`public/config.json` (read via `useConfig()`), defaulting to `false`. A missing
key is treated the same as `false` — the hook never throws for it. This does
not change the signal-scope decision above; it only changes visibility of the
existing logs and the hook's public/internal status. Persistence remains out
of scope, unchanged from the original decision.
