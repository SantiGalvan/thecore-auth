# Changelog

Master index of every change tracked under `docs/en/changelog/` (see [AGENTS.md §2.9](AGENTS.md#29-changelog-entry-template-mandatory--step-45)
for the process). Each entry links to the detailed English changelog file; an Italian translation
of every entry lives under `docs/it/changelog/`.

## 0.0.217

- [docs-rewrite-agents-for-thecore-auth](docs/en/changelog/2026-07-29-0.0.217-docs-rewrite-agents-for-thecore-auth.md) — rewrite AGENTS.md (+ IT/ES translations) so it reflects thecore-auth instead of the Bancolini planner app it had been overwritten with
- [use-environment-info-hook](docs/en/changelog/2026-07-29-0.0.217-use-environment-info-hook.md) — add internal `useEnvironmentInfo` hook for non-permission browser signals, plus the Vitest + React Testing Library setup this repo was missing
- [fix-auth-provider-stale-load-listener](docs/en/changelog/2026-08-06-0.0.217-fix-auth-provider-stale-load-listener.md) — fix a stale-closure race where a login completed just before a delayed `window` `load` event on a hard reload would get silently reverted
- [use-environment-info-hook](docs/en/changelog/2026-08-06-0.0.217-use-environment-info-hook.md) — gate `useEnvironmentInfo`'s per-field console logging behind a new `environmentInfoLog` config key (defaults to `false`, missing-safe), export the hook publicly, and remove its temporary validation call from `App.jsx`
