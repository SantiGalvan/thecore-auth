# Release Notes

## [0.0.218] — 2026-08-06

### Added
- `useEnvironmentInfo` is now part of the public API: a hook that reads browser/device environment
  signals (hardware, locale, connectivity, media-query preferences, storage estimate) that don't
  require a permission prompt. Every field it reads can optionally be mirrored to the console via
  the new `environmentInfoLog` config key, which defaults to `false` — and behaves the same as
  `false` if it's missing from `config.json` entirely. See the
  [useEnvironmentInfo docs](../hooks/useEnvironmentInfo.md).

### Fixed
- Fixed a stale-closure race in `AuthProvider`'s `window` `load` listener: on a hard reload, a
  login that completed just before the delayed `load` event fired could get silently reverted back
  to logged-out. `AuthProvider` now reads the token from a ref kept in sync on every render instead
  of the value captured when the listener was first registered.

### Details
- [useEnvironmentInfo — hook creation](../changelog/2026-07-29-0.0.217-use-environment-info-hook.md)
- [useEnvironmentInfo — config-gated logging, public export](../changelog/2026-08-06-0.0.217-use-environment-info-hook.md)
- [AuthProvider — stale-closure fix](../changelog/2026-08-06-0.0.217-fix-auth-provider-stale-load-listener.md)
