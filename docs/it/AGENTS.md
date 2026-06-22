# AGENTS.md — Guida per l'Agente AI

> **Questo file è legge.** Ogni agente che opera su questo repository lo legge prima di qualsiasi azione
> e lo segue **senza eccezioni**. Non esistono "casi speciali" che giustificano deviazioni.

> **English version:** [../../AGENTS.md](../../AGENTS.md) | **Versión española:** [../es/AGENTS.md](../es/AGENTS.md)

---

## 0. BOOTSTRAP — Prima volta su questo repo

Se non hai ancora eseguito il setup iniziale:

```
/setup-matt-pocock-skills
```

Configura il sistema di tracciamento delle issue, il vocabolario delle label e la struttura della documentazione.
**Eseguilo una sola volta. Le altre skill lo presuppongono.**

---

## 1. FLUSSO DI LAVORO — OBBLIGATORIO PER OGNI RICHIESTA DI MODIFICA

> ⚠️ **FERMATI.** Ogni volta che ricevi una richiesta di aggiungere, modificare o rimuovere **qualsiasi cosa**,
> **devi seguire questa sequenza per intero.** Non esistono scorciatoie. Non esistono "casi ovvi".

### 1.0 Classifica la richiesta prima di tutto

Prima di fare qualsiasi cosa, classifica la richiesta in uno di questi tipi:

| Tipo | Scope | Flusso completo |
|------|-------|-----------------|
| `code` | `src/`, dipendenze, test | ✅ Sì — Step 1–5 |
| `config` | `public/config.json`, `vite.config.js` | ✅ Sì — Step 1–5 |
| `docs` | `AGENTS.md`, `.claude/skills/`, `.claude/settings.json` hook | ✅ Sì — Step 1–5 |
| `readme` | `README.md`, `CHANGELOG.md`, traduzioni | Step 1 leggero + aggiornamento traduzioni |

**Perché `config` e `docs` richiedono il flusso completo:**
- Le modifiche a `public/config.json` influenzano il comportamento runtime dell'app.
- Le modifiche a `AGENTS.md` influenzano ogni sessione AI futura su questo repo — una regola errata si propaga ovunque.
- Skill e hook cambiano ciò che l'AI fa automaticamente — stesso livello di rischio del codice.

### 1.1 Flusso principale: idea → rilascio

```
STEP 1 ─ /grill-with-docs
          Intervista approfondita sull'idea. Aggiorna CONTEXT.md e gli ADR inline.
          Non procedere allo step 2 finché ogni domanda aperta non è risolta.

STEP 2 ─ Puoi risolvere tutto in conversazione?
          SÌ  → vai allo STEP 3
          NO  → /prototype (sessione usa e getta) → /handoff (riporta il risultato) → torna allo STEP 1

STEP 3 ─ È una build multi-sessione? (> 1 issue, > 1 componente, stima > 2h)
          SÌ  → /to-prd   (PRD come issue)
                /to-issues (split in issue indipendenti, verticalmente sliced)
                Poi: una NUOVA sessione per issue → /implement con PRD + singola issue
          NO  → /implement nella stessa finestra di contesto

STEP 4 ─ Git workflow (vedi §2)
          Feature branch → commit atomici → PR verso main → stop, nessun merge autonomo

STEP 5 ─ /tdd
          Ogni implementazione segue il ciclo red-green-refactor.
          Non chiudere una issue senza un test corrispondente che passa.
```

### 1.2 On-ramp: bug e richieste in entrata

```
Bug report / feature request ricevuto dall'esterno?
→ /triage prima di tutto
→ Solo le issue marcate agent-ready entrano nel flusso principale allo STEP 1
```

### 1.3 Manutenzione del codebase

```
Hai un momento libero tra un task e l'altro? Esegui:
→ /improve-codebase-architecture
   Legge CONTEXT.md e docs/adr/ e identifica opportunità di miglioramento.
   Ogni opportunità diventa un'idea → rientra nel flusso principale allo STEP 1.
```

### 1.4 Regole di igiene del contesto

- Mantieni gli STEP 1–3 in **una singola finestra di contesto** senza compattare.
- Ogni `/implement` parte da un **contesto fresco**, con PRD + issue come unico input.
- Se il contesto si avvicina alla zona critica (~120k token), esegui `/handoff` e apri
  una nuova sessione prima che degrade.
- Non compattare a metà fase: `/handoff` per forkare, `/compact` solo tra fasi completate.

---

## 2. GIT WORKFLOW — FLUSSO TRUNK-BASED (OBBLIGATORIO)

### 2.1 Regola zero

> **NON lavorare mai direttamente su `main`.** Prima di toccare qualsiasi file, crea un feature branch.

Il branch di lavoro predefinito è `main`. **Ogni singola modifica — per quanto piccola — deve essere fatta
su un branch dedicato**, poi unita in `main` tramite una pull request.

```bash
# Verifica il branch corrente
git branch --show-current

# Se sei su main: crea SEMPRE un branch prima di fare qualsiasi modifica
git checkout -b feature/<descrizione>
```

**Non esistono eccezioni.** Anche una modifica di una riga richiede il suo branch e la sua PR.

### 2.2 Naming dei branch

```
<tipo>/<descrizione-breve-kebab-case>

tipi consentiti:
  feature/   → nuova funzionalità
  fix/        → bugfix
  chore/      → aggiornamenti infrastruttura, dipendenze, config
  refactor/   → refactoring senza cambio di comportamento
  docs/       → solo documentazione
  test/       → aggiunta o correzione di test
  hotfix/     → fix urgente in produzione (eccezionale, richiede approvazione umana)

esempi:
  feature/smart-login-varianti-card
  fix/autologin-fallback-redirect
  chore/vite-config-upgrade
  refactor/auth-context-cleanup
  docs/readme-traduzione-spagnola
```

### 2.3 Workflow step-by-step

```bash
# 1. Verifica di NON essere su main — crea un branch se necessario
git branch --show-current
git checkout -b feature/<descrizione>   # branch dal main corrente

# 2. Lavora con commit atomici (un commit = una modifica logica)
git add -p                              # sempre add -p, mai git add .
git commit -m "<tipo>(<scope>): <descrizione>"   # Conventional Commits

# 3. Mantieni il branch aggiornato
git fetch origin main
git rebase origin/main

# 4. Quando il task è completo: push + apertura PR
git push -u origin feature/<tuo-branch>

# GitHub CLI:
gh pr create \
  --base main \
  --title "<tipo>(<scope>): <descrizione>" \
  --draft
```

### 2.4 Conventional Commits — formato obbligatorio

```
<tipo>(<scope>): <descrizione imperativa in inglese>

tipi: feat | fix | chore | refactor | docs | test | ci | perf | revert
scope: modulo o area (es. auth, config, modal, login, hooks, deps)

esempi:
  feat(auth): add configurable session timeout
  fix(login): resolve double-submit on rapid keypress
  chore(deps): bump react-router-dom from 7.1.3 to 7.2.0
  refactor(config): simplify context initialization
  docs(readme): add Spanish documentation link

BREAKING CHANGE: aggiungi come footer o con ! dopo il tipo
  feat(auth)!: remove legacy session token storage
```

### 2.5 GitHub Issues — tracciamento di issue e task (OBBLIGATORIO)

Questo progetto usa **GitHub Issues** come sistema di tracciamento.
Repository: [https://github.com/SantiGalvan/thecore-auth](https://github.com/SantiGalvan/thecore-auth)

**Ogni implementazione deve avere una corrispondente GitHub Issue.**

**Label** — usa il tipo appropriato:
- `bug` → difetto o comportamento anomalo
- `enhancement` → nuova funzionalità o miglioramento
- `documentation` → modifica solo alla documentazione
- `refactor` → ristrutturazione del codice senza cambio di comportamento
- `chore` → manutenzione, dipendenze, infrastruttura

**Ciclo di vita:**
1. Prima di iniziare: verifica o crea la GitHub Issue corrispondente.
2. Durante il lavoro: riferisci la issue nei messaggi di commit dove pertinente (`#123`).
3. Al termine: chiudi la issue tramite la descrizione della PR (`Closes #123`).

**Regola di tracciabilità obbligatoria:**
Ogni modifica al codebase — per quanto piccola — deve avere una GitHub Issue corrispondente.
Prima di terminare una sessione, verifica che tutte le modifiche siano tracciate. Crea eventuali issue mancanti immediatamente.

**GitHub CLI:**
```bash
# Crea una issue
gh issue create --title "Descrizione" --label "enhancement"

# Lista le issue aperte
gh issue list

# Visualizza una issue
gh issue view 123
```

### 2.6 Regole per le PR

- La PR va sempre verso `main`, **non fare mai push diretto su main**.
- Apri sempre come **draft** — la revisione umana è obbligatoria prima del merge.
- Non fare mai merge autonomamente. **Mai.**
- Collega la PR alla issue corrispondente: `Closes #<numero-issue>` nella descrizione.
- Dopo aver aperto la PR, restituisci l'URL all'utente e fermati.

### 2.7 Comandi git VIETATI (senza esplicita approvazione umana)

```bash
# NON eseguire mai autonomamente:
git push --force
git push --force-with-lease
git reset --hard
git clean -fd
git push origin main
```

Se hai bisogno di uno di questi, **spiega il motivo all'utente e aspetta conferma scritta**.

---

## 3. TECH STACK

- **Tipo pacchetto**: libreria npm (pubblicata come `thecore-auth`)
- **Runtime**: React 19 + Vite 6
- **Stili**: Tailwind CSS v4
- **Routing**: React Router 7
- **Client HTTP**: Axios
- **Auth**: JWT tramite `jwt-decode`
- **Notifiche**: Sileo (toast ottimizzati per mobile)
- **Rilevamento dispositivo**: `ua-parser-js`
- **Calendario/festività**: `date-holidays`
- **Lint**: ESLint 9

## Struttura del progetto

```
src/
  api/              # Factory per l'istanza Axios (fetchAxiosConfig)
  assets/           # Asset SVG e immagini
  components/       # Componenti UI riutilizzabili
    alert/          # Banner di notifica alert
    form/           # LoginForm
    inputs/         # Input, InputLabel, FileDropzone, SwitchRadio
    inputs/date/    # InputDate, InputStartEndDate
    inputs/select/  # SingleSelect, MultiSelect
    loading/        # Loading, LoadingComponent
    modal/          # Modal, ModalHeader, ModalMain, ModalFooter
    MyTask/         # Loader, LogoLoader
    SPOT RFID/      # InputGroup, CardInputTag, CardInputRange,
                    # ConfigFileReader, ConfigFileReaderAllBrowser, SpotRfidHeader
  contexts/         # Context provider React
    auth/           # AuthProvider, useAuth
    config/         # ConfigProvider, useConfig
    alert/          # AlertProvider, useAlert
    loading/        # LoadingProvider, useLoading
    login/          # LoginFormProvider, useLoginForm
    modal/          # ModalProvider, useModal
    route/          # RouteProvider, useRoutesInjection
  css/              # CSS globale (index.css, loader.css)
  hooks/            # Hook React personalizzati
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
    visibility/     # useUserActivity (interno, non esportato)
  layouts/          # DefaultLayout
  middlewares/      # Route guard
    auth/           # AuthPage
    admin/          # AuthAdmin
  pages/            # Componenti pagina
    login/          # Login, SmartLogin, DefaultAutoLoginFallback
    user/           # Dashboard
    error/          # ErrorPage
  routes/           # PackageRoutes
  utils/            # Funzioni di utilità
    date/           # dateUtils (toDatetimeLocalValue, setTime, subtractDays, …)
  index.js          # Entry point del pacchetto — TUTTI gli export pubblici dichiarati qui
dist/               # File del pacchetto compilato (non modificare manualmente)
docs/               # Documentazione
  it/               # Traduzioni in italiano
  es/               # Traduzioni in spagnolo
  adr/              # Architecture Decision Records
documentation/      # Docs supplementari (variabili CSS, Modal)
deploy-scripts/     # Utility di deploy e template Docker
public/
  config.json       # Configurazione runtime per dev/test (non inclusa nel pacchetto npm)
```

### Convenzioni React

```javascript
// UN COMPONENTE PER FILE — obbligatorio.
// Il nome del file corrisponde al nome del componente (ModalHeader.jsx → export default ModalHeader).
// Mai definire più componenti nello stesso file.
// Componenti: solo functional + hooks, nessun class component.
// Naming: PascalCase per i componenti, camelCase per gli hook (useXxx).

// Test: Vitest + React Testing Library
// Testa il comportamento utente, non l'implementazione interna.
// Ogni componente non banale con props → test obbligatorio.
```

### Regola degli export del pacchetto

Tutti i simboli pubblici devono essere dichiarati in `src/index.js`. Non esportare nuovi simboli senza
documentarli contemporaneamente in `README.md`, `DOCUMENTATION_IT.md` e `DOCUMENTATION_ES.md`.

### Segreti e configurazione

```bash
# VIETATO fare commit di:
# - .env con valori reali
# - credenziali, API key, certificati privati
# - backendToken con valori reali (token di auto-login)

# Verifica prima di ogni commit:
git diff --cached | grep -iE "(password|secret|key|token|api_key|private)" && echo "⚠️ POSSIBILE SEGRETO RILEVATO"
```

---

## 4. REGOLE DI LINGUA (OBBLIGATORIO)

> ⚠️ **Regola non negoziabile, valida per tutto il progetto.**

**Deve essere SEMPRE in inglese:**

- **Codice** — nomi di variabili, funzioni, metodi, classi, hook, costanti, file sorgente e cartelle.
- **Commenti nel codice** — ogni commento inline o a blocco.
- **Messaggi di commit** — già richiesto dal §2.4 (Conventional Commits in inglese).
- **PR** — titolo, descrizione, label tecniche.

**Unica eccezione consentita:**

- **Stringhe visibili all'utente finale (UI)** che devono apparire in una lingua specifica per un requisito di prodotto.

**Regola trilingue per il Markdown:**

Ogni file `.md` deve essere scritto in **inglese** come lingua primaria. Per ogni file `.md` primario
creato o aggiornato, le corrispondenti traduzioni in italiano e spagnolo devono essere create o aggiornate:

| Primario (Inglese) | Italiano | Spagnolo |
|---|---|---|
| `AGENTS.md` | `docs/it/AGENTS.md` | `docs/es/AGENTS.md` |
| `README.md` | `DOCUMENTATION_IT.md` | `DOCUMENTATION_ES.md` |

Tutte e tre le versioni devono rimanere sincronizzate dopo ogni aggiornamento.

```javascript
// ✅ CORRETTO
function formatDatetimeLabel(entry) { /* ... */ }

// ❌ SBAGLIATO
function formattaEtichettaData(voce) { /* ... */ }
```

---

## 5. VERSIONAMENTO

La versione si trova in `package.json`. Ogni bump di versione corrisponde a un commit con
messaggio `X.Y.Z` + aggiornamento di `CHANGELOG.md`.

```bash
npm run increment-version   # bump patch + git push
```

Dopo ogni bump di versione, aggiorna il numero di versione in `README.md`, `DOCUMENTATION_IT.md`
e `DOCUMENTATION_ES.md`.

---

## 6. ARCHITECTURE DECISION RECORDS

Le decisioni architetturali si trovano in `docs/adr/`.
Formato: `docs/adr/NNNN-<kebab-title>.md` (Lightweight ADR, Michael Nygard).

Quando prendi una decisione che impatta l'architettura:
1. Crea o aggiorna l'ADR corrispondente.
2. Committa nella stessa PR della modifica che ha motivato la decisione.
3. Aggiorna `CONTEXT.md` se la decisione introduce nuovo linguaggio di dominio.

---

## 7. CHECKLIST PRE-PUSH

Prima di ogni `git push`, verifica:

- [ ] Sono su un feature branch (NON su main)?
- [ ] Ho seguito il flusso `/grill-with-docs` → `/to-prd` → `/implement` → `/tdd`?
- [ ] Tutti i commit seguono il formato Conventional Commits in inglese?
- [ ] Il codice e i commenti sono in inglese?
- [ ] Nessun segreto o credenziale nel diff?
- [ ] Esiste la GitHub Issue corrispondente ed è referenziata nella PR?
- [ ] La PR è verso `main`?
- [ ] La PR è aperta come draft?
- [ ] Tutte e tre le lingue della documentazione (EN, IT, ES) sono aggiornate se la doc è cambiata?

---

## 8. RIFERIMENTO RAPIDO ALLE SKILL

| Skill | Quando usarla |
|-------|---------------|
| `/ask-matt` | Non sai quale skill usare → inizia da qui |
| `/setup-matt-pocock-skills` | Prima volta su questo repo |
| `/grill-with-docs` | **Ogni** nuova idea o funzionalità — STEP 1 obbligatorio |
| `/grill-me` | Nessun codebase ancora, solo design |
| `/to-prd` | Trasforma la conversazione in un PRD formale |
| `/to-issues` | Dividi il PRD in issue indipendenti e verticali |
| `/triage` | Bug/richieste in arrivo dall'esterno |
| `/implement` | Esecuzione di una singola issue |
| `/tdd` | Red-green-refactor per ogni implementazione |
| `/diagnose` | Bug difficile o regressione di performance |
| `/improve-codebase-architecture` | Manutenzione proattiva del codebase |
| `/zoom-out` | Perso nel codice? Chiedi il contesto di sistema |
| `/prototype` | Una domanda che richiede codice usa-e-getta per essere risposta |
| `/handoff` | Passa il contesto a una nuova sessione |

---

## 9. FILE DA AGGIORNARE DOPO LE MODIFICHE AL CODICE

Dopo ogni modifica significativa, aggiorna:
1. `README.md` + `DOCUMENTATION_IT.md` + `DOCUMENTATION_ES.md` — se l'API pubblica, le prop, gli hook o la configurazione cambiano
2. `AGENTS.md` + `docs/it/AGENTS.md` + `docs/es/AGENTS.md` — se l'architettura o le convenzioni cambiano
3. `README.md` — se cambiano i passi di installazione o il comportamento a livello di pacchetto
4. `CHANGELOG.md` — sempre, con la data odierna e la versione corrente

---

## 10. COSA NON FARE

- Non modificare `package-lock.json` manualmente
- Non aggiungere nuovi export pubblici a `src/index.js` senza aggiornare tutti e tre i file di documentazione
- Non fare commit di credenziali, API key o token backend reali
- Non fare push direttamente su `main`
- Non fare merge di PR autonomamente
- Non pubblicare su npm (`npm publish`) senza esplicita approvazione umana
