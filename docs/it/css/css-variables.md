# Variabili CSS — thecore-auth

> 🇬🇧 [CSS Variables in English](../../en/css/css-variables.md) | 🇪🇸 [Variables CSS en Español](../../es/css/css-variables.md)

Tutti gli aspetti visivi di `thecore-auth` sono controllati tramite proprietà CSS personalizzate (variabili).
Sovrascrivile nel tuo blocco `:root {}` dopo aver importato il CSS del pacchetto per adattare l'aspetto al tuo brand.

## Configurazione

### 1. Importa il CSS del pacchetto

Nel tuo file CSS principale (es. `src/index.css`):

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');
```

Oppure in `src/main.jsx`:

```jsx
import 'thecore-auth/dist/thecore-auth.css';
```

### 2. Sovrascrivi le variabili

```css
:root {
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-text: #ffffff;
  --height-card-form: 60vh;
}
```

Le modifiche si applicano immediatamente a tutti i componenti che usano quelle variabili — nessuna ricompilazione necessaria.

---

## Riferimento variabili

### Colore primario e pulsante

Controlla il colore brand utilizzato su pulsanti ed elementi interattivi.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--color-primary` | `#f56907` | Colore brand principale |
| `--color-primary-hover` | `#f88b29` | Colore brand al passaggio del mouse |
| `--color-primary-text` | `#fff` | Colore del testo sugli elementi con colore primario |
| `--shadow-primary` | `0 4px 10px rgba(245,105,7,0.3)…` | Ombra per gli elementi primari |
| `--shadow-primary-hover` | `0 6px 14px rgba(245,105,7,0.4)…` | Ombra al passaggio del mouse |
| `--shadow-primary-active` | `0 2px 5px rgba(245,105,7,0.3)` | Ombra alla pressione/attivazione |
| `--shadow-primary-input` | `inset 0 1px 1px …, 0 0 8px rgba(245,105,7,0.6)` | Ombra del focus ring sugli input |
| `--padding-primary-button` | `8px 16px` | Padding del pulsante di invio login |
| `--margin-primary-button` | `20px 0px` | Margine attorno al pulsante di invio login |
| `--radius-primary-button` | `calc(infinity * 1px)` | Border radius del pulsante di invio login (pill per impostazione predefinita) |
| `--justify-primary` | `center` | Allineamento orizzontale del pulsante di login (`flex-start`, `center`, `flex-end`) |

---

### Card di login — Dimensioni

Controlla le dimensioni e la forma della card di login che contiene il logo e il form.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--height-card-form` | `70vh` | Altezza della card su desktop |
| `--height-card-form-landscape` | `80vh` | Altezza della card in orientamento landscape |
| `--width-card-form` | `85vw` | Larghezza della card |
| `--max-width-card-form` | `1136px` | Larghezza massima della card |
| `--border-form-size` | `2px` | Spessore del bordo della card |
| `--form-radius` | `2em` | Border radius della card |

---

### Card di login — Colori

Controlla il colore di sfondo e del bordo della card di login.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--color-form` | `#fff` | Colore di sfondo della card |
| `--color-form-border` | `#D3D3D3` | Colore del bordo della card |

---

### Stile degli input

Controlla l'aspetto degli input del form all'interno della card di login.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--color-input-bg` | `#f9fafb` | Colore di sfondo dell'input |
| `--color-input-border` | `#d1d5db` | Colore del bordo dell'input |
| `--color-input-text` | `#111827` | Colore del testo dell'input |
| `--padding-input` | `10px` | Padding interno dell'input (controlla l'altezza dell'input) |
| `--input-radius` | `8px` | Border radius dell'input |
| `--text-input-label` | `14px` | Dimensione del font delle label degli input |
| `--text-input-placeholder` | `14px` | Dimensione del font del testo segnaposto degli input |
| `--color-color-label` | `#111827` | Colore del testo delle label degli input |
| `--label-display` | `block` | Visibilità della label: `block` la mostra, `none` la nasconde |

---

### Layout del form

Controlla le proporzioni interne della sezione form all'interno della card.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--basis-form` | `50%` | Larghezza della sezione form (flex-basis) |
| `--input-form-width` | `70%` | Larghezza di ciascun campo input relativa al form |
| `--margin-input-form` | `16px 0` | Margine verticale tra i campi input |

---

### Titolo del form

Controlla il testo del titolo visualizzato sopra i campi del form.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--text-form-title-size` | `2.25rem` | Dimensione del font del titolo |
| `--margin-form-title` | `32px 0` | Margine sopra e sotto il titolo |
| `--title-display` | `none` | Visibilità del titolo: `block` lo mostra, `none` lo nasconde |
| `--title-position` | `center` | Allineamento del testo del titolo (`left`, `center`, `right`) |

---

### Sfondo del login

Controlla l'immagine di sfondo visualizzata dietro la card di login.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--bg-image` | `url(../assets/login-background.svg)` | Immagine di sfondo della pagina di login (`url(…)` oppure `none`) |

---

### Logo del login

Controlla le dimensioni del logo visualizzato all'interno della card di login.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--login-logo-width` | `40vw` | Larghezza del logo in portrait/desktop |
| `--login-logo-max-width` | `300px` | Larghezza massima del logo in portrait/desktop |
| `--login-logo-landscape-width` | `20vw` | Larghezza del logo in orientamento landscape |
| `--login-logo-landscape-max-width` | `250px` | Larghezza massima del logo in orientamento landscape |

---

### Colori degli alert

Controlla la palette di colori dei quattro tipi di alert: `danger`, `info`, `success` e `warning`.
Ogni tipo ha quattro varianti: sfondo, testo, sfondo al hover e barra di avanzamento.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--color-danger` | `#FEE2E2` | Sfondo dell'alert danger |
| `--color-danger-text` | `#B91C1C` | Colore del testo dell'alert danger |
| `--color-danger-hover` | `#FECACA` | Sfondo dell'alert danger al hover |
| `--color-danger-progress` | `#F87171` | Colore della barra di avanzamento dell'alert danger |
| `--color-info` | `#EFF6FF` | Sfondo dell'alert info |
| `--color-info-text` | `#1D4ED8` | Colore del testo dell'alert info |
| `--color-info-hover` | `#BFDBFE` | Sfondo dell'alert info al hover |
| `--color-info-progress` | `#60A5FA` | Colore della barra di avanzamento dell'alert info |
| `--color-success` | `#ECFDF5` | Sfondo dell'alert success |
| `--color-success-text` | `#15803D` | Colore del testo dell'alert success |
| `--color-success-hover` | `#A7F3D0` | Sfondo dell'alert success al hover |
| `--color-success-progress` | `#34D399` | Colore della barra di avanzamento dell'alert success |
| `--color-warning` | `#F9FAEB` | Sfondo dell'alert warning |
| `--color-warning-text` | `#D97706` | Colore del testo dell'alert warning |
| `--color-warning-hover` | `#FDE047` | Sfondo dell'alert warning al hover |
| `--color-warning-progress` | `#FACC15` | Colore della barra di avanzamento dell'alert warning |

---

### Componente di caricamento

Controlla l'aspetto dell'overlay di caricamento a schermo intero.

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--color-loading-bg` | `#4B556366` | Colore di sfondo dell'overlay di caricamento (supporta trasparenza alpha) |
| `--color-spinner` | `#fff` | Colore dell'icona dello spinner |

---

### Componenti SPOT RFID

Variabili per la famiglia di componenti SPOT RFID (`SpotRfidHeader`, `InputGroup`, `CardInputTag`, `CardInputRange`).

| Variabile | Valore predefinito | Descrizione |
|-----------|-------------------|-------------|
| `--header-height` | `60px` | Altezza del componente `SpotRfidHeader` |
| `--width-logo-size` | `48px` | Larghezza del logo all'interno di `SpotRfidHeader` |
| `--color-primary-accent` | `#f56907` | Colore accent usato in `CardInputRange` |
| `--color-save-button` | `#16A34A` | Colore del pulsante salva in `CardInputRange` |
| `--color-write-button` | `#0284C7` | Colore del pulsante scrivi in `CardInputTag` |
| `--color-focus-ring` | `#f5690780` | Colore del focus ring per gli input SPOT RFID |
| `--color-focus-error` | `rgba(255,0,0,0.5)` | Colore del focus ring in caso di errore |
| `--color-spot-rfid-input-border` | `#f56907` | Colore del bordo degli input SPOT RFID |
| `--shadow-spot-rfid-input` | `0 0 0 4px var(--color-focus-ring)` | Ombra al focus degli input SPOT RFID |
| `--shadow-spot-rfid-error` | `0 0 0 4px var(--color-focus-error)` | Ombra in caso di errore degli input SPOT RFID |

---

## Esempio completo

Un blocco `:root` di sovrascrittura completo per un brand personalizzato:

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');

:root {
  /* Brand colors */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-text: #ffffff;

  /* Login card */
  --height-card-form: 65vh;
  --form-radius: 1.5rem;
  --color-form: #f8fafc;

  /* Inputs */
  --input-radius: 0.5rem;
  --padding-input: 12px;

  /* Alerts */
  --color-danger: #fef2f2;
  --color-success: #f0fdf4;
  --color-info: #eff6ff;
  --color-warning: #fffbeb;

  /* Loading */
  --color-spinner: #6366f1;
}
```
