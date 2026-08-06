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
| `readme` | `README.md`, `CHANGELOG.md`, `DOCUMENTATION_IT.md`/`DOCUMENTATION_ES.md` | Paso 1 ligero + actualización de traducciones |

**Por qué `config` y `docs` requieren el flujo completo:**
- Los cambios en `public/config.json` afectan el comportamiento en tiempo de ejecución de la app demo de dev/test.
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
          SÍ → /to-prd   (PRD como GitHub Issue)
               /to-issues (divide en issues independientes, verticalmente segmentadas)
               Luego: una NUEVA sesión por issue → /implement con PRD + issue única
          NO → /implement en la misma ventana de contexto

PASO 4 ─ Flujo de Git (ver §2)
          Feature branch → commits atómicos → PR hacia main → stop, sin merge autónomo

PASO 4.5 ─ Changelog (ver §2.9) — OBLIGATORIO antes de cada push
            1. Crea docs/en/changelog/YYYY-MM-DD-X.Y.Z-branch-name.md usando la plantilla del §2.9
            2. Actualiza el índice maestro CHANGELOG.md con un enlace + un resumen de una línea
            3. Crea la traducción italiana en docs/it/changelog/
            No hagas push antes de completar este paso.

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
   Lee CONTEXT.md y docs/en/adr/ e identifica oportunidades de profundización.
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

Este proyecto usa **GitHub Issues** como rastreador de issues, junto con Asana (ver §2.6) — ambos
son obligatorios, no alternativas.
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
Cada cambio en el codebase — por pequeño que sea — debe tener una GitHub Issue correspondiente **y**
un subtask de Asana correspondiente (§2.6). Antes de terminar una sesión, verifica que todos los
cambios estén rastreados en ambos sistemas. Crea cualquier issue/subtask faltante de inmediato.

**GitHub CLI:**
```bash
# Crear una issue
gh issue create --title "Descripción" --label "enhancement"

# Listar issues abiertas
gh issue list

# Ver una issue
gh issue view 123
```

### 2.6 Asana — seguimiento de sprint (OBLIGATORIO)

Cada GitHub Issue anterior también obtiene una tarea de Asana correspondiente, para que el tablero
de sprint del equipo refleje el trabajo hecho en este repo. Las tareas de Asana son **además de**
GitHub Issues, no un reemplazo.

**Proyecto: siempre "Sviluppo Sprint" — nunca "MyTask"** (ese proyecto pertenece a la app planner
de Bancolini, un codebase diferente). No preguntes al usuario qué proyecto usar — es fijo.

**Cómo resolver el proyecto y el sprint actual (sin GIDs hardcodeados — búscalos cada vez):**
1. Llama a la herramienta de listado de workspaces para encontrar el GID del workspace `bancolini.com`.
2. Llama a `asana_get_projects_for_workspace` en ese workspace y encuentra el proyecto llamado
   **"Sviluppo Sprint"** por nombre — nunca asumas que su GID es estable entre sesiones.
3. Llama a `asana_get_project_sections` en el GID de ese proyecto.
4. Encuentra la sección llamada `Sprint DD Mmm–DD Mmm YYYY` cuyo rango de fechas incluya hoy.
   **Usa siempre el sprint actual.** Nunca uses el Backlog a menos que no exista ninguna sección
   de sprint activa.

**Estructura para cada implementación:**
- **Tarea principal** → una tarea por implementación, nombrada en italiano como una descripción
  simple sin prefijo Conventional Commits (ej. `Aggiunta traduzione spagnola alla documentazione`,
  no `docs(readme): add spanish translation`).
- **Subtareas** → una subtarea por cada GitHub Issue de esta implementación, referenciando el
  número de la issue (ej. `Tradurre AGENTS.md in spagnolo (#42)`).

**Reglas para cada tarea y subtarea creada:**
- **Idioma**: nombres y descripciones de las tareas siempre en **italiano** (es una herramienta
  interna de seguimiento del equipo Bancolini — independiente de la
  [regla del inglés](#4-reglas-de-idioma-obligatorio) que rige el código y la documentación del repo).
- **Asignado**: siempre `"me"`.
- **Sección**: siempre la sección del sprint actual (ver arriba).

**Ciclo de vida:**
1. Antes de comenzar: crea la tarea principal + una subtarea por cada GitHub Issue.
2. Durante el trabajo: marca cada subtarea como completa cuando su GitHub Issue se cierre.
3. Cuando todas las subtareas estén completas: marca la tarea principal como completa.

### 2.7 Reglas para las PR

- La PR siempre hacia `main`, **nunca hacer push directo a main**.
- Siempre abrir como **draft** — la revisión humana es obligatoria antes del merge.
- No hacer merge autónomamente. **Nunca.**
- Enlaza la PR a la issue correspondiente: `Closes #<número-issue>` en la descripción.
- Después de abrir la PR, devuelve la URL al usuario y detente.

### 2.8 Comandos git PROHIBIDOS (sin aprobación humana explícita)

```bash
# NUNCA ejecutar autónomamente:
git push --force
git push --force-with-lease
git reset --hard
git clean -fd
git push origin main
```

Si necesitas uno de estos, **explica el motivo al usuario y espera confirmación escrita**.

### 2.9 Plantilla de entrada de changelog (OBLIGATORIO — paso 4.5)

Cada push debe ir acompañado de un archivo en `docs/en/changelog/` siguiendo esta convención de
nombres:

```
docs/en/changelog/YYYY-MM-DD-X.Y.Z-<branch-name>.md
```

Donde `X.Y.Z` es la versión actual en `package.json` en el momento del push — usa siempre el
número de versión real, nunca un placeholder como `unreleased`.

Se debe crear una traducción italiana correspondiente en `docs/it/changelog/` con el mismo nombre
de archivo. **Sin traducción al español** — los changelogs son notas técnicas internas, no
documentación pública de la librería (a diferencia de `README.md`/`DOCUMENTATION_ES.md`, ver §4).

**Plantilla:**

```markdown
# <Título descriptivo del cambio>

## Contexto
Por qué se hizo este trabajo — bug report, solicitud del usuario, o decisión alcanzada en una
sesión de grilling.

## Seguimiento
Enlace a la(s) GitHub Issue(s) y a la tarea/subtareas principales de Asana.

## Rama y versión
- **Rama:** `<branch-name>`
- **Versión:** `X.Y.Z` (o `unreleased`)

## Archivos modificados
| Archivo | Cambio |
|---------|--------|
| `path/to/file.jsx` | Descripción de una línea de qué cambió en este archivo |

## Cambios técnicos
Fragmentos clave del código final con un comentario que explica el porqué, no el qué.

## Motivación
El razonamiento detrás de la solución elegida — por qué este enfoque y no otro.
```

Después de crear la entrada, añade una línea al índice maestro `CHANGELOG.md` bajo el encabezado
de versión correcto:

```markdown
- [branch-name](docs/en/changelog/YYYY-MM-DD-X.Y.Z-branch-name.md) — descripción de una línea
```

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
- **Assets SVG**: `vite-plugin-svgr` (importa archivos `.svg` como componentes React)
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
    environment/    # useEnvironmentInfo
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
    adr/              # Architecture Decision Records (inglés, primario)
    changelog/        # Un archivo por cada cambio publicado (inglés, primario — ver §2.9)
    releases/         # RELEASES.md — notas de lanzamiento legibles (inglés, primario — ver §5)
  it/                 # Traducciones al italiano (espeja la estructura en/, incluyendo adr/, changelog/, releases/)
  es/                 # Traducciones al español (espeja solo la doc de componentes/hooks/context de en/ —
                      # sin adr/, changelog/, ni releases/, ver §4)
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

**Únicas excepciones permitidas:**

- **Strings visibles para el usuario final (UI)** que deben aparecer en un idioma específico por un requisito de producto.
- **Nombres y descripciones de tareas/subtareas de Asana** (§2.6) — siempre en italiano, una
  convención interna del equipo independiente del idioma del código/documentación del repo.

**Regla de traducción de Markdown — el alcance varía según el tipo de documento:**

La documentación **pública** de la librería es trilingüe (EN principal, traducciones IT/ES) porque
la leen consumidores externos. La documentación **interna** de proceso de ingeniería (changelogs,
ADR) es solo EN+IT, ya que no tiene audiencia fuera del equipo Bancolini que mantiene este repo.

| Principal (Inglés) | Italiano | Español |
|---|---|---|
| `AGENTS.md` | `docs/it/AGENTS.md` | `docs/es/AGENTS.md` |
| `README.md` | `DOCUMENTATION_IT.md` | `DOCUMENTATION_ES.md` |
| `docs/en/**` (referencia componentes/hooks/context) | `docs/it/**` | `docs/es/**` |
| `docs/en/adr/*.md` | `docs/it/adr/*.md` | *(ninguna)* |
| `docs/en/changelog/*.md` | `docs/it/changelog/*.md` | *(ninguna)* |
| `docs/en/releases/RELEASES.md` | `docs/it/releases/RELEASES.md` | *(ninguna)* |

Todas las versiones de una fila deben mantenerse sincronizadas después de cada actualización.

```javascript
// ✅ CORRECTO
function formatDatetimeLabel(entry) { /* ... */ }

// ❌ INCORRECTO
function formatearEtiquetaFecha(entrada) { /* ... */ }
```

---

## 5. VERSIONADO

La versión vive en `package.json`. Cada bump de versión es una decisión deliberada tomada por el
usuario — el agente nunca debe hacer el bump de versión de forma autónoma.

**Cuando el usuario pida hacer el bump de versión, sigue esta secuencia en orden:**

1. Escribe el resumen del lanzamiento en `docs/en/releases/RELEASES.md` (legible, en la parte
   superior del archivo):
   - Añade un encabezado `## [X.Y.Z] — YYYY-MM-DD`
   - Resume qué cambió en lenguaje simple
   - Enlaza a las entradas relevantes de `docs/en/changelog/` para los detalles técnicos
2. Crea la traducción italiana en `docs/it/releases/RELEASES.md` (sin español, ver §4)
3. Crea una tarea de Asana independiente `Release X.Y.Z` (§2.6) en la sección del sprint actual:
   - Asignado: `"me"`
   - Descripción: el contenido escrito en el paso 1, **escrito en italiano**
   - **Márcala como completada de inmediato** — el lanzamiento ya está en vivo en este punto
4. Ejecuta el comando de bump de versión:

```bash
npm run increment-version   # bump patch + git push
```

5. Actualiza el número de versión en `README.md`, `DOCUMENTATION_IT.md` y `DOCUMENTATION_ES.md`.

---

## 6. ARCHITECTURE DECISION RECORDS

Las decisiones arquitectónicas se encuentran en `docs/en/adr/`, traducidas a `docs/it/adr/` (sin
español, ver §4).
Formato: `docs/en/adr/NNNN-<kebab-title>.md` (Lightweight ADR, Michael Nygard).

Cuando tomes una decisión que impacte la arquitectura:
1. Crea o actualiza el ADR correspondiente (inglés) y su traducción italiana.
2. Haz commit de ambos en la misma PR que el cambio que motivó la decisión.
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
- [ ] ¿Existe la tarea/subtarea de Asana correspondiente, en el sprint actual de "Sviluppo Sprint"?
- [ ] ¿Creé la entrada de changelog en `docs/en/changelog/` y su traducción italiana? (paso 4.5)
- [ ] ¿Actualicé el índice maestro `CHANGELOG.md` con un enlace + un resumen de una línea?
- [ ] ¿La PR apunta a `main`?
- [ ] ¿La PR está abierta como draft?
- [ ] ¿Los idiomas de documentación relevantes están actualizados? (EN+IT+ES para doc pública,
      EN+IT para changelog/ADR/lanzamientos, ver §4)

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
3. `docs/en/changelog/YYYY-MM-DD-X.Y.Z-branch.md` + `docs/it/changelog/` — siempre (§2.9)
4. `CHANGELOG.md` — siempre, con un enlace a la nueva entrada de changelog
5. `docs/en/adr/` + `docs/it/adr/` — solo cuando el cambio conlleva una decisión arquitectónica (§6)
6. `docs/en/releases/RELEASES.md` + `docs/it/releases/RELEASES.md` — solo en bumps de versión (§5)

---

## 10. QUÉ NO HACER

- No editar `package-lock.json` manualmente
- No añadir nuevos exports públicos a `src/index.js` sin actualizar los tres archivos de documentación
- No hacer commit de credenciales, API keys o tokens de backend reales
- No hacer push directamente a `main`
- No hacer merge de PRs autónomamente
- No publicar en npm (`npm publish`) sin aprobación humana explícita
- No crear tareas de Asana en ningún proyecto distinto de "Sviluppo Sprint" para este repo
