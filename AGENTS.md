# AGENTS.md — AI Agent Guide

> **This file is law.** Every agent operating on this repository reads it before any action
> and follows it **without exception**. There are no "special cases" that justify deviations.

> **Versione italiana:** [docs/it/AGENTS.md](docs/it/AGENTS.md) | **Versión española:** [docs/es/AGENTS.md](docs/es/AGENTS.md)

---

## 0. BOOTSTRAP — First time on this repo

If you have not run the initial setup yet:

```
/setup-matt-pocock-skills
```

Configures the issue tracker, the triage label vocabulary, and the domain doc layout.
**Run it once. The other skills assume it.**

---

## 1. ENGINEERING WORKFLOW — MANDATORY FOR EVERY CHANGE REQUEST

> ⚠️ **STOP.** Every time you receive a request to add, modify, or remove **anything**,
> **you must follow this sequence in its entirety.** There is no shortcut. There is no "obvious case."

### 1.0 Classify the request first

Before doing anything else, classify the request into one of these types:

| Type | Scope | Full workflow |
|------|-------|---------------|
| `code` | `src/`, dependencies, tests | ✅ Yes — Steps 1–5 |
| `config` | `public/config.json`, `vite.config.js` | ✅ Yes — Steps 1–5 |
| `docs` | `AGENTS.md`, `.claude/skills/`, `.claude/settings.json` hooks | ✅ Yes — Steps 1–5 |
| `readme` | `README.md`, `CHANGELOG.md`, translations | Step 1 light + translation update |

**Why `config` and `docs` require the full workflow:**
- `public/config.json` changes affect runtime behavior of the app.
- `AGENTS.md` changes affect every future AI session on this repo — a wrong rule propagates everywhere.
- Skills and hooks change what the AI does automatically — same risk level as code.

### 1.1 Main flow: idea → ship

```
STEP 1 ─ /grill-with-docs
          In-depth interview about the idea. Update CONTEXT.md and the ADRs inline.
          Do not proceed to step 2 until every open question is resolved.

STEP 2 ─ Can you settle everything in conversation?
          YES → go to STEP 3
          NO  → /prototype (throwaway session) → /handoff (bring the result back) → return to STEP 1

STEP 3 ─ Is this a multi-session build? (> 1 issue, > 1 component, estimate > 2h)
          YES → /to-prd   (PRD as an issue)
                /to-issues (split into independent, vertically sliced issues)
                Then: a NEW session per issue → /implement with PRD + single issue
          NO  → /implement in the same context window

STEP 4 ─ Git workflow (see §2)
          Feature branch → atomic commits → PR toward main → stop, no autonomous merge

STEP 5 ─ /tdd
          Every implementation follows red-green-refactor.
          Do not close an issue without a corresponding passing test.
```

### 1.2 On-ramp: incoming bugs and requests

```
Bug report / feature request received externally?
→ /triage before anything else
→ Only issues marked agent-ready enter the main flow at STEP 1
```

### 1.3 Codebase maintenance

```
Have a spare moment between tasks? Run:
→ /improve-codebase-architecture
   Reads CONTEXT.md and docs/adr/ and identifies deepening opportunities.
   Each opportunity becomes an idea → re-enters the main flow at STEP 1.
```

### 1.4 Context hygiene rules

- Keep STEPS 1–3 in **a single context window** without compacting.
- Every `/implement` starts from a **fresh** context, with PRD + issue as its only input.
- If the context approaches the smart zone (~120k tokens), run `/handoff` and open
  a new session before it degrades.
- Do not compact mid-phase: `/handoff` to fork, `/compact` only between completed phases.

---

## 2. GIT WORKFLOW — TRUNK-BASED FLOW (MANDATORY)

### 2.1 Rule zero

> **NEVER work directly on `main`.** Before touching any file, create a feature branch.

The default working branch is `main`. **Every single change — no matter how small — must be done
on a dedicated feature branch**, then merged into `main` via a pull request.

```bash
# Verify current branch
git branch --show-current

# If on main: ALWAYS create a branch before making any change
git checkout -b feature/<description>
```

**There is no exception.** A one-line fix still requires its own branch and PR.

### 2.2 Branch naming

```
<type>/<short-description-kebab-case>

allowed types:
  feature/   → new functionality
  fix/        → bugfix
  chore/      → infrastructure updates, dependencies, config
  refactor/   → refactoring with no behavior change
  docs/       → documentation only
  test/       → adding or fixing tests
  hotfix/     → urgent fix on production (exceptional, requires human approval)

examples:
  feature/smart-login-card-variants
  fix/autologin-fallback-redirect
  chore/vite-config-upgrade
  refactor/auth-context-cleanup
  docs/readme-spanish-translation
```

### 2.3 Workflow step-by-step

```bash
# 1. Verify you are NOT on main — create a branch if needed
git branch --show-current
git checkout -b feature/<description>   # branch from current main

# 2. Work in atomic commits (one commit = one logical change)
git add -p                              # always add -p, never git add .
git commit -m "<type>(<scope>): <description>"   # Conventional Commits

# 3. Keep the branch up to date
git fetch origin main
git rebase origin/main

# 4. When the task is complete: push + open a PR
git push -u origin feature/<your-branch>

# GitHub CLI:
gh pr create \
  --base main \
  --title "<type>(<scope>): <description>" \
  --draft
```

### 2.4 Conventional Commits — mandatory format

```
<type>(<scope>): <imperative description in English>

types: feat | fix | chore | refactor | docs | test | ci | perf | revert
scope: module or area (e.g. auth, config, modal, login, hooks, deps)

examples:
  feat(auth): add configurable session timeout
  fix(login): resolve double-submit on rapid keypress
  chore(deps): bump react-router-dom from 7.1.3 to 7.2.0
  refactor(config): simplify context initialization
  docs(readme): add Spanish documentation link

BREAKING CHANGE: add as footer or with ! after the type
  feat(auth)!: remove legacy session token storage
```

### 2.5 GitHub Issues — issue and task tracking (MANDATORY)

This project uses **GitHub Issues** as the issue tracker.
Repository: [https://github.com/SantiGalvan/thecore-auth](https://github.com/SantiGalvan/thecore-auth)

**Every implementation must have a corresponding GitHub Issue.**

**Labels** — use the appropriate type:
- `bug` → defect or broken behavior
- `enhancement` → new feature or improvement
- `documentation` → docs-only change
- `refactor` → code restructuring with no behavior change
- `chore` → maintenance, dependencies, infrastructure

**Lifecycle:**
1. Before starting: verify or create the corresponding GitHub Issue.
2. During work: reference the issue in commit messages where relevant (`#123`).
3. When done: close the issue via the PR description (`Closes #123`).

**Mandatory traceability rule:**
Every change to the codebase — no matter how small — must have a corresponding GitHub Issue.
Before ending a session, verify that all changes are tracked. Create any missing issues immediately.

**GitHub CLI:**
```bash
# Create an issue
gh issue create --title "Description" --label "enhancement"

# List open issues
gh issue list

# View an issue
gh issue view 123
```

### 2.6 PR rules

- PR always toward `main`, **never push directly to main**.
- Always open as a **draft** — human review is mandatory before merge.
- Do not merge autonomously. **Ever.**
- Link the PR to the corresponding issue: `Closes #<issue-number>` in the PR description.
- After opening the PR, return the URL to the user and stop.

### 2.7 FORBIDDEN git commands (without explicit human approval)

```bash
# NEVER run autonomously:
git push --force
git push --force-with-lease
git reset --hard
git clean -fd
git push origin main
```

If you need one of these, **explain the reason to the user and wait for written confirmation**.

---

## 3. TECH STACK

- **Package type**: npm library (published as `thecore-auth`)
- **Runtime**: React 19 + Vite 6
- **Styles**: Tailwind CSS v4
- **Routing**: React Router 7
- **HTTP client**: Axios
- **Auth**: JWT via `jwt-decode`
- **Notifications**: Sileo (mobile-optimized toast)
- **Device detection**: `ua-parser-js`
- **Calendar/holidays**: `date-holidays`
- **Lint**: ESLint 9

## Project structure

```
src/
  api/              # Axios instance factory (fetchAxiosConfig)
  assets/           # SVG and image assets
  components/       # Reusable UI components
    alert/          # Alert notification banner
    form/           # LoginForm
    inputs/         # Input, InputLabel, FileDropzone, SwitchRadio
    inputs/date/    # InputDate, InputStartEndDate
    inputs/select/  # SingleSelect, MultiSelect
    loading/        # Loading, LoadingComponent
    modal/          # Modal, ModalHeader, ModalMain, ModalFooter
    MyTask/         # Loader, LogoLoader
    SPOT RFID/      # InputGroup, CardInputTag, CardInputRange,
                    # ConfigFileReader, ConfigFileReaderAllBrowser, SpotRfidHeader
  contexts/         # React context providers
    auth/           # AuthProvider, useAuth
    config/         # ConfigProvider, useConfig
    alert/          # AlertProvider, useAlert
    loading/        # LoadingProvider, useLoading
    login/          # LoginFormProvider, useLoginForm
    modal/          # ModalProvider, useModal
    route/          # RouteProvider, useRoutesInjection
  css/              # Global CSS (index.css, loader.css)
  hooks/            # Custom React hooks
    auth/           # useAuthStorage
    calendar/       # useCalendar
    device/         # useDevice
    form/           # useForm
    indexedDB/      # useIndexedDB
    orientation/    # useOrientation
    safe-area/      # useSafeArea
    storage/        # useStorage
    title/          # UsePageTitle
    toast/          # useToast
    ui/             # useClickOutside
    viewport/       # useViewportHeight
    visibility/     # useUserActivity (internal, not exported)
  layouts/          # DefaultLayout
  middlewares/      # Route guards
    auth/           # AuthPage
    admin/          # AuthAdmin
  pages/            # Page components
    login/          # Login, SmartLogin, DefaultAutoLoginFallback
    user/           # Dashboard
    error/          # ErrorPage
  routes/           # PackageRoutes
  utils/            # Utility functions
    date/           # dateUtils (toDatetimeLocalValue, setTime, subtractDays, …)
  index.js          # Package entry point — ALL public exports declared here
dist/               # Built package files (do not edit manually)
docs/
  en/                 # English reference documentation
    components/       # Component reference files
    contexts/         # Context pair reference files
    hooks/            # Hook reference files
    layouts/          # DefaultLayout
    middlewares/      # AuthPage, AuthAdmin
    routing/          # PackageRoutes
    pages/            # Login, SmartLogin, Dashboard, ErrorPage
    utils/            # dateUtils, fetchAxiosConfig
    css/              # css-variables.md
    modal.md          # Full modal system guide (useModal API)
  it/                 # Italian translations (mirrors en/ structure)
  es/                 # Spanish translations (mirrors en/ structure)
  adr/                # Architecture Decision Records
deploy-scripts/     # Deployment utilities and Docker templates
public/
  config.json       # Dev/test runtime configuration (not shipped in npm package)
```

### React conventions

```javascript
// ONE COMPONENT PER FILE — mandatory.
// Filename matches component name (ModalHeader.jsx → export default ModalHeader).
// Never define multiple components in the same file.
// Components: functional + hooks only, no class components.
// Naming: PascalCase for components, camelCase for hooks (useXxx).

// Tests: Vitest + React Testing Library
// Test user behavior, not internal implementation.
// Every non-trivial component with props → mandatory test.
```

### Package exports rule

All public symbols must be declared in `src/index.js`. Do not export new symbols without
simultaneously documenting them in `README.md`, `DOCUMENTATION_IT.md`, and `DOCUMENTATION_ES.md`.

### Secrets and configuration

```bash
# FORBIDDEN to commit:
# - .env with real values
# - credentials, API keys, private certificates
# - backendToken with real values (auto-login tokens)

# Verify before every commit:
git diff --cached | grep -iE "(password|secret|key|token|api_key|private)" && echo "⚠️ POSSIBLE SECRET DETECTED"
```

---

## 4. LANGUAGE RULES (MANDATORY)

> ⚠️ **Non-negotiable rule, cutting across the whole project.**

**Must ALWAYS be in English:**

- **Code** — names of variables, functions, methods, classes, hooks, constants, source files and folders.
- **Code comments** — every inline or block comment.
- **Commit messages** — already required by §2.4 (Conventional Commits in English).
- **PR** — title, description, technical labels.

**The only allowed exception:**

- **End-user-facing strings (UI)** that must appear in a specific language for a product requirement.

**Markdown trilingual rule:**

Every `.md` document must be written in **English** as the primary language. For each primary `.md`
file created or updated, the corresponding Italian and Spanish translations must be created or updated:

| Primary (English) | Italian | Spanish |
|---|---|---|
| `AGENTS.md` | `docs/it/AGENTS.md` | `docs/es/AGENTS.md` |
| `README.md` | `DOCUMENTATION_IT.md` | `DOCUMENTATION_ES.md` |

All three versions must remain in sync after every update.

```javascript
// ✅ CORRECT
function formatDatetimeLabel(entry) { /* ... */ }

// ❌ WRONG
function formattaEtichettaData(voce) { /* ... */ }
```

---

## 5. VERSIONING

The version lives in `package.json`. Each version bump corresponds to a commit with
message `X.Y.Z` + update to `CHANGELOG.md`.

```bash
npm run increment-version   # bump patch + git push
```

After every version bump, update the version number in `README.md`, `DOCUMENTATION_IT.md`,
and `DOCUMENTATION_ES.md`.

---

## 6. ARCHITECTURE DECISION RECORDS

Architectural decisions live in `docs/adr/`.
Format: `docs/adr/NNNN-<kebab-title>.md` (Lightweight ADR, Michael Nygard).

When you make a decision that impacts the architecture:
1. Create or update the corresponding ADR.
2. Commit it in the same PR as the change that motivated the decision.
3. Update `CONTEXT.md` if the decision introduces new domain language.

---

## 7. PRE-PUSH CHECKLIST

Before every `git push`, verify:

- [ ] Am I on a feature branch (NOT on main)?
- [ ] Did I follow the flow `/grill-with-docs` → `/to-prd` → `/implement` → `/tdd`?
- [ ] Do all commits follow the Conventional Commits format in English?
- [ ] Are code and code comments in English?
- [ ] No secrets or credentials in the diff?
- [ ] Does the corresponding GitHub Issue exist and is referenced in the PR?
- [ ] Is the PR targeted at `main`?
- [ ] Is the PR opened as a draft?
- [ ] Are all three documentation languages (EN, IT, ES) updated if docs changed?

---

## 8. QUICK SKILL REFERENCE

| Skill | When to use it |
|-------|----------------|
| `/ask-matt` | Don't know which skill to use → start here |
| `/setup-matt-pocock-skills` | First time on this repo |
| `/grill-with-docs` | **Every** new idea or feature — mandatory STEP 1 |
| `/grill-me` | No codebase yet, design only |
| `/to-prd` | Turn the conversation into a formal PRD |
| `/to-issues` | Split the PRD into independent, vertical issues |
| `/triage` | Incoming external bugs/requests |
| `/implement` | Execution of a single issue |
| `/tdd` | Red-green-refactor for every implementation |
| `/diagnose` | Hard bug or performance regression |
| `/improve-codebase-architecture` | Proactive codebase maintenance |
| `/zoom-out` | Lost in the code? Ask for system context |
| `/prototype` | A question that needs throwaway code to be answered |
| `/handoff` | Hand the context to a new session |

---

## 9. FILES TO UPDATE AFTER CODE CHANGES

After every significant change, update:
1. `README.md` + `DOCUMENTATION_IT.md` + `DOCUMENTATION_ES.md` — if public API, props, hooks, or config changes
2. `AGENTS.md` + `docs/it/AGENTS.md` + `docs/es/AGENTS.md` — if architecture or conventions change
3. `README.md` — if installation steps or package-level behavior changes
4. `CHANGELOG.md` — always, with today's date and current version

---

## 10. WHAT NOT TO DO

- Do not edit `package-lock.json` manually
- Do not add new public exports to `src/index.js` without updating all three documentation files
- Do not commit credentials, API keys, or real backend tokens
- Do not push directly to `main`
- Do not merge PRs autonomously
- Do not publish to npm (`npm publish`) without explicit human approval
