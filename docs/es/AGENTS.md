# AGENTS.md — Guía para el Agente de IA

> **Este archivo es ley.** Cada agente que opera en este repositorio lo lee antes de cualquier acción
> y lo sigue **sin excepciones**. No existen "casos especiales" que justifiquen desviaciones.

> **English version:** [../../AGENTS.md](../../AGENTS.md) | **Versione italiana:** [../it/AGENTS.md](../it/AGENTS.md)

---

## 0. BOOTSTRAP — Primera vez en este repo

Si aún no has ejecutado la configuración inicial:

```
/setup-matt-pocock-skills
```

Configura el rastreador de issues, el vocabulario de etiquetas y el diseño de la documentación.
**Ejecútalo una sola vez. Las demás skills lo presuponen.**

---

## 1. FLUJO DE TRABAJO DE INGENIERÍA — OBLIGATORIO PARA CADA SOLICITUD DE CAMBIO

> ⚠️ **DETENTE.** Cada vez que recibas una solicitud para añadir, modificar o eliminar **cualquier cosa**,
> **debes seguir esta secuencia en su totalidad.** No hay atajos. No hay "casos obvios".

### 1.0 Clasifica la solicitud primero

Antes de hacer cualquier cosa, clasifica la solicitud en uno de estos tipos:

| Tipo | Alcance | Flujo completo |
|------|---------|----------------|
| `code` | `src/`, dependencias, tests | ✅ Sí — Pasos 1–5 |
| `config` | `public/config.json`, `vite.config.js` | ✅ Sí — Pasos 1–5 |
| `docs` | `AGENTS.md`, `.claude/skills/`, `.claude/settings.json` hooks | ✅ Sí — Pasos 1–5 |
| `readme` | `README.md`, `CHANGELOG.md`, traducciones | Paso 1 ligero + actualización de traducciones |

**Por qué `config` y `docs` requieren el flujo completo:**
- Los cambios en `public/config.json` afectan el comportamiento en tiempo de ejecución de la app.
- Los cambios en `AGENTS.md` afectan cada sesión de IA futura en este repo — una regla incorrecta se propaga en todas partes.
- Skills y hooks cambian lo que la IA hace automáticamente — mismo nivel de riesgo que el código.

### 1.1 Flujo principal: idea → envío

```
PASO 1 ─ /grill-with-docs
          Entrevista profunda sobre la idea. Actualiza CONTEXT.md y los ADR inline.
          No procedas al paso 2 hasta que todas las preguntas abiertas estén resueltas.

PASO 2 ─ ¿Puedes resolver todo en conversación?
          SÍ → ve al PASO 3
          NO → /prototype (sesión desechable) → /handoff (trae el resultado) → vuelve al PASO 1

PASO 3 ─ ¿Es una construcción multi-sesión? (> 1 issue, > 1 componente, estimación > 2h)
          SÍ → /to-prd   (PRD como issue)
               /to-issues (divide en issues independientes, verticalmente segmentadas)
               Luego: una NUEVA sesión por issue → /implement con PRD + issue única
          NO → /implement en la misma ventana de contexto

PASO 4 ─ Flujo de Git (ver §2)
          Feature branch → commits atómicos → PR hacia main → stop, sin merge autónomo

PASO 5 ─ /tdd
          Cada implementación sigue el ciclo rojo-verde-refactor.
          No cierres una issue sin un test correspondiente que pase.
```

### 1.2 On-ramp: bugs y solicitudes entrantes

```
¿Bug report / feature request recibido externamente?
→ /triage antes que todo
→ Solo las issues marcadas agent-ready entran al flujo principal en el PASO 1
```

### 1.3 Mantenimiento del codebase

```
¿Tienes un momento libre entre tareas? Ejecuta:
→ /improve-codebase-architecture
   Lee CONTEXT.md y docs/adr/ e identifica oportunidades de profundización.
   Cada oportunidad se convierte en una idea → regresa al flujo principal en el PASO 1.
```

### 1.4 Reglas de higiene del contexto

- Mantén los PASOS 1–3 en **una única ventana de contexto** sin compactar.
- Cada `/implement` comienza desde un **contexto fresco**, con PRD + issue como único input.
- Si el contexto se acerca a la zona crítica (~120k tokens), ejecuta `/handoff` y abre
  una nueva sesión antes de que se degrade.
- No compactes a mitad de fase: `/handoff` para bifurcar, `/compact` solo entre fases completadas.

---

## 2. FLUJO DE GIT — FLUJO TRUNK-BASED (OBLIGATORIO)

### 2.1 Regla cero

> **NUNCA trabajes directamente en `main`.** Antes de tocar cualquier archivo, crea una feature branch.

La rama de trabajo predeterminada es `main`. **Cada cambio — por pequeño que sea — debe hacerse
en una rama dedicada**, luego fusionado en `main` mediante una pull request.

```bash
# Verifica la rama actual
git branch --show-current

# Si estás en main: crea SIEMPRE una rama antes de hacer cualquier cambio
git checkout -b feature/<descripcion>
```

**No hay excepciones.** Un cambio de una línea también requiere su propia rama y PR.

### 2.2 Nomenclatura de ramas

```
<tipo>/<descripcion-corta-kebab-case>

tipos permitidos:
  feature/   → nueva funcionalidad
  fix/        → corrección de bug
  chore/      → actualizaciones de infraestructura, dependencias, config
  refactor/   → refactorización sin cambio de comportamiento
  docs/       → solo documentación
  test/       → añadir o corregir tests
  hotfix/     → fix urgente en producción (excepcional, requiere aprobación humana)

ejemplos:
  feature/smart-login-variantes-card
  fix/autologin-fallback-redirect
  chore/vite-config-upgrade
  refactor/auth-context-cleanup
  docs/readme-traduccion-espanol
```

### 2.3 Workflow paso a paso

```bash
# 1. Verifica que NO estás en main — crea una rama si es necesario
git branch --show-current
git checkout -b feature/<descripcion>   # rama desde el main actual

# 2. Trabaja con commits atómicos (un commit = un cambio lógico)
git add -p                              # siempre add -p, nunca git add .
git commit -m "<tipo>(<scope>): <descripcion>"   # Conventional Commits

# 3. Mantén la rama actualizada
git fetch origin main
git rebase origin/main

# 4. Cuando la tarea esté completa: push + abrir PR
git push -u origin feature/<tu-rama>

# GitHub CLI:
gh pr create \
  --base main \
  --title "<tipo>(<scope>): <descripcion>" \
  --draft
```

### 2.4 Conventional Commits — formato obligatorio

```
<tipo>(<scope>): <descripción imperativa en inglés>

tipos: feat | fix | chore | refactor | docs | test | ci | perf | revert
scope: módulo o área (ej. auth, config, modal, login, hooks, deps)

ejemplos:
  feat(auth): add configurable session timeout
  fix(login): resolve double-submit on rapid keypress
  chore(deps): bump react-router-dom from 7.1.3 to 7.2.0
  refactor(config): simplify context initialization
  docs(readme): add Spanish documentation link

BREAKING CHANGE: añade como footer o con ! después del tipo
  feat(auth)!: remove legacy session token storage
```

### 2.5 GitHub Issues — seguimiento de issues y tareas (OBLIGATORIO)

Este proyecto usa **GitHub Issues** como rastreador de issues.
Repositorio: [https://github.com/SantiGalvan/thecore-auth](https://github.com/SantiGalvan/thecore-auth)

**Cada implementación debe tener una GitHub Issue correspondiente.**

**Etiquetas** — usa el tipo apropiado:
- `bug` → defecto o comportamiento roto
- `enhancement` → nueva funcionalidad o mejora
- `documentation` → cambio solo en documentación
- `refactor` → reestructuración de código sin cambio de comportamiento
- `chore` → mantenimiento, dependencias, infraestructura

**Ciclo de vida:**
1. Antes de comenzar: verifica o crea la GitHub Issue correspondiente.
2. Durante el trabajo: referencia la issue en los mensajes de commit cuando sea relevante (`#123`).
3. Al terminar: cierra la issue a través de la descripción de la PR (`Closes #123`).

**Regla de trazabilidad obligatoria:**
Cada cambio en el codebase — por pequeño que sea — debe tener una GitHub Issue correspondiente.
Antes de terminar una sesión, verifica que todos los cambios estén rastreados. Crea cualquier issue faltante de inmediato.

**GitHub CLI:**
```bash
# Crear una issue
gh issue create --title "Descripción" --label "enhancement"

# Listar issues abiertas
gh issue list

# Ver una issue
gh issue view 123
```

### 2.6 Reglas para las PR

- La PR siempre hacia `main`, **nunca hacer push directo a main**.
- Siempre abrir como **draft** — la revisión humana es obligatoria antes del merge.
- No hacer merge autónomamente. **Nunca.**
- Enlaza la PR a la issue correspondiente: `Closes #<número-issue>` en la descripción.
- Después de abrir la PR, devuelve la URL al usuario y detente.

### 2.7 Comandos git PROHIBIDOS (sin aprobación humana explícita)

```bash
# NUNCA ejecutar autónomamente:
git push --force
git push --force-with-lease
git reset --hard
git clean -fd
git push origin main
```

Si necesitas uno de estos, **explica el motivo al usuario y espera confirmación escrita**.

---

## 3. TECH STACK

- **Tipo de paquete**: librería npm (publicada como `thecore-auth`)
- **Runtime**: React 19 + Vite 6
- **Estilos**: Tailwind CSS v4
- **Enrutamiento**: React Router 7
- **Cliente HTTP**: Axios
- **Auth**: JWT mediante `jwt-decode`
- **Notificaciones**: Sileo (toast optimizados para mobile)
- **Detección de dispositivo**: `ua-parser-js`
- **Calendario/festivos**: `date-holidays`
- **Lint**: ESLint 9

## Estructura del proyecto

```
src/
  api/              # Factory para la instancia de Axios (fetchAxiosConfig)
  assets/           # Assets SVG e imágenes
  components/       # Componentes UI reutilizables
    alert/          # Banner de notificación alert
    form/           # LoginForm
    inputs/         # Input, InputLabel, FileDropzone, SwitchRadio
    inputs/date/    # InputDate, InputStartEndDate
    inputs/select/  # SingleSelect, MultiSelect
    loading/        # Loading, LoadingComponent
    modal/          # Modal, ModalHeader, ModalMain, ModalFooter
    MyTask/         # Loader, LogoLoader
    SPOT RFID/      # InputGroup, CardInputTag, CardInputRange,
                    # ConfigFileReader, ConfigFileReaderAllBrowser, SpotRfidHeader
  contexts/         # Context providers de React
    auth/           # AuthProvider, useAuth
    config/         # ConfigProvider, useConfig
    alert/          # AlertProvider, useAlert
    loading/        # LoadingProvider, useLoading
    login/          # LoginFormProvider, useLoginForm
    modal/          # ModalProvider, useModal
    route/          # RouteProvider, useRoutesInjection
  css/              # CSS global (index.css, loader.css)
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
    visibility/     # useUserActivity (interno, no exportado)
  layouts/          # DefaultLayout
  middlewares/      # Route guards
    auth/           # AuthPage
    admin/          # AuthAdmin
  pages/            # Componentes de página
    login/          # Login, SmartLogin, DefaultAutoLoginFallback
    user/           # Dashboard
    error/          # ErrorPage
  routes/           # PackageRoutes
  utils/            # Funciones utilitarias
    date/           # dateUtils (toDatetimeLocalValue, setTime, subtractDays, …)
  index.js          # Entry point del paquete — TODOS los exports públicos declarados aquí
dist/               # Archivos del paquete compilado (no editar manualmente)
docs/
  en/                 # Documentación de referencia en inglés
    components/       # Archivos de referencia de componentes
    contexts/         # Archivos de referencia de context pair
    hooks/            # Archivos de referencia de hooks
    layouts/          # DefaultLayout
    middlewares/      # AuthPage, AuthAdmin
    routing/          # PackageRoutes
    pages/            # Login, SmartLogin, Dashboard, ErrorPage
    utils/            # dateUtils, fetchAxiosConfig
    css/              # css-variables.md
    modal.md          # Guía completa del sistema modal (API useModal)
  it/                 # Traducciones al italiano (espeja la estructura en/)
  es/                 # Traducciones al español (espeja la estructura en/)
  adr/                # Architecture Decision Records
deploy-scripts/     # Utilidades de deploy y templates Docker
public/
  config.json       # Configuración runtime para dev/test (no incluida en el paquete npm)
```

### Convenciones de React

```javascript
// UN COMPONENTE POR ARCHIVO — obligatorio.
// El nombre del archivo coincide con el nombre del componente (ModalHeader.jsx → export default ModalHeader).
// Nunca definir múltiples componentes en el mismo archivo.
// Componentes: solo functional + hooks, sin class components.
// Naming: PascalCase para componentes, camelCase para hooks (useXxx).

// Tests: Vitest + React Testing Library
// Testea el comportamiento del usuario, no la implementación interna.
// Cada componente no trivial con props → test obligatorio.
```

### Regla de exports del paquete

Todos los símbolos públicos deben declararse en `src/index.js`. No exportes nuevos símbolos sin
documentarlos simultáneamente en `README.md`, `DOCUMENTATION_IT.md` y `DOCUMENTATION_ES.md`.

### Secretos y configuración

```bash
# PROHIBIDO hacer commit de:
# - .env con valores reales
# - credenciales, API keys, certificados privados
# - backendToken con valores reales (tokens de auto-login)

# Verifica antes de cada commit:
git diff --cached | grep -iE "(password|secret|key|token|api_key|private)" && echo "⚠️ POSIBLE SECRETO DETECTADO"
```

---

## 4. REGLAS DE IDIOMA (OBLIGATORIO)

> ⚠️ **Regla no negociable, que aplica a todo el proyecto.**

**Debe estar SIEMPRE en inglés:**

- **Código** — nombres de variables, funciones, métodos, clases, hooks, constantes, archivos fuente y carpetas.
- **Comentarios en el código** — cada comentario inline o en bloque.
- **Mensajes de commit** — ya requerido por §2.4 (Conventional Commits en inglés).
- **PR** — título, descripción, etiquetas técnicas.

**La única excepción permitida:**

- **Strings visibles para el usuario final (UI)** que deben aparecer en un idioma específico por un requisito de producto.

**Regla trilingüe para Markdown:**

Cada archivo `.md` debe escribirse en **inglés** como idioma principal. Para cada archivo `.md` primario
creado o actualizado, las traducciones al italiano y español correspondientes deben crearse o actualizarse:

| Primario (Inglés) | Italiano | Español |
|---|---|---|
| `AGENTS.md` | `docs/it/AGENTS.md` | `docs/es/AGENTS.md` |
| `README.md` | `DOCUMENTATION_IT.md` | `DOCUMENTATION_ES.md` |

Las tres versiones deben mantenerse sincronizadas después de cada actualización.

```javascript
// ✅ CORRECTO
function formatDatetimeLabel(entry) { /* ... */ }

// ❌ INCORRECTO
function formatearEtiquetaFecha(entrada) { /* ... */ }
```

---

## 5. VERSIONADO

La versión vive en `package.json`. Cada bump de versión corresponde a un commit con
mensaje `X.Y.Z` + actualización de `CHANGELOG.md`.

```bash
npm run increment-version   # bump patch + git push
```

Después de cada bump de versión, actualiza el número de versión en `README.md`, `DOCUMENTATION_IT.md`
y `DOCUMENTATION_ES.md`.

---

## 6. ARCHITECTURE DECISION RECORDS

Las decisiones arquitectónicas se encuentran en `docs/adr/`.
Formato: `docs/adr/NNNN-<kebab-title>.md` (Lightweight ADR, Michael Nygard).

Cuando tomes una decisión que impacte la arquitectura:
1. Crea o actualiza el ADR correspondiente.
2. Haz commit en la misma PR que el cambio que motivó la decisión.
3. Actualiza `CONTEXT.md` si la decisión introduce nuevo lenguaje de dominio.

---

## 7. CHECKLIST PRE-PUSH

Antes de cada `git push`, verifica:

- [ ] ¿Estoy en una feature branch (NO en main)?
- [ ] ¿Seguí el flujo `/grill-with-docs` → `/to-prd` → `/implement` → `/tdd`?
- [ ] ¿Todos los commits siguen el formato Conventional Commits en inglés?
- [ ] ¿El código y los comentarios están en inglés?
- [ ] ¿No hay secretos o credenciales en el diff?
- [ ] ¿Existe la GitHub Issue correspondiente y está referenciada en la PR?
- [ ] ¿La PR apunta a `main`?
- [ ] ¿La PR está abierta como draft?
- [ ] ¿Los tres idiomas de la documentación (EN, IT, ES) están actualizados si cambió la doc?

---

## 8. REFERENCIA RÁPIDA DE SKILLS

| Skill | Cuándo usarla |
|-------|---------------|
| `/ask-matt` | No sabes qué skill usar → empieza aquí |
| `/setup-matt-pocock-skills` | Primera vez en este repo |
| `/grill-with-docs` | **Cada** nueva idea o funcionalidad — PASO 1 obligatorio |
| `/grill-me` | Sin codebase aún, solo diseño |
| `/to-prd` | Convierte la conversación en un PRD formal |
| `/to-issues` | Divide el PRD en issues independientes y verticales |
| `/triage` | Bugs/solicitudes entrantes del exterior |
| `/implement` | Ejecución de una sola issue |
| `/tdd` | Rojo-verde-refactor para cada implementación |
| `/diagnose` | Bug difícil o regresión de rendimiento |
| `/improve-codebase-architecture` | Mantenimiento proactivo del codebase |
| `/zoom-out` | ¿Perdido en el código? Pide contexto del sistema |
| `/prototype` | Una pregunta que necesita código desechable para ser respondida |
| `/handoff` | Pasa el contexto a una nueva sesión |

---

## 9. ARCHIVOS A ACTUALIZAR DESPUÉS DE CAMBIOS EN EL CÓDIGO

Después de cada cambio significativo, actualiza:
1. `README.md` + `DOCUMENTATION_IT.md` + `DOCUMENTATION_ES.md` — si cambia la API pública, props, hooks o configuración
2. `AGENTS.md` + `docs/it/AGENTS.md` + `docs/es/AGENTS.md` — si cambia la arquitectura o las convenciones
3. `README.md` — si cambian los pasos de instalación o el comportamiento a nivel de paquete
4. `CHANGELOG.md` — siempre, con la fecha de hoy y la versión actual

---

## 10. QUÉ NO HACER

- No editar `package-lock.json` manualmente
- No añadir nuevos exports públicos a `src/index.js` sin actualizar los tres archivos de documentación
- No hacer commit de credenciales, API keys o tokens de backend reales
- No hacer push directamente a `main`
- No hacer merge de PRs autónomamente
- No publicar en npm (`npm publish`) sin aprobación humana explícita
