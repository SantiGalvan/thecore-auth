# LoginProva — Documento delle migliorie rispetto a Login.jsx

## Panoramica

`LoginProva` è la versione migliorata di `Login`. Mantiene la stessa logica di autenticazione (stessi context, stessi hook) ma corregge i bug esistenti, aggiunge personalizzabilità completa via props, e migliora usabilità, accessibilità e compatibilità PWA.

---

## 1. Bug risolti

### 1.1 `useEffect` con dipendenze mancanti

**Problema:**
```jsx
// Login.jsx — dipendenze mancanti → warning React, comportamento indefinito in StrictMode
useEffect(() => {
  if (token && user?.id) navigate(`${firstPrivatePath}${user.id}`);
}, []);
```
React Strict Mode monta/smonta i componenti due volte in development. Con array vuoto il redirect avviene solo al primo mount, ma in StrictMode il comportamento può essere inconsistente. ESLint `exhaustive-deps` segnala questo come errore.

**Fix in LoginProva:**
```jsx
useEffect(() => {
  if (token && user?.id) navigate(`${firstPrivatePath}${user.id}`);
}, [token, user?.id, navigate, firstPrivatePath]);
```

---

### 1.2 `min-h-screen` usa `100vh` statico su iOS Safari

**Problema:**
Il div container usava la classe Tailwind `min-h-screen` che si traduce in `min-height: 100vh`.  
Su iOS Safari `100vh` include la barra degli indirizzi del browser, causando overflow visivo di ~80px che spinge il contenuto fuori dallo schermo visibile.

**Fix in LoginProva:**
```jsx
// Container usa --vh calcolato da useViewportHeight() invece di min-h-screen
<div style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
```
`useViewportHeight()` imposta `--vh = visualViewport.height * 0.01`, il valore reale del viewport senza barre del browser.

---

### 1.3 Doppio submit possibile

**Problema:**
In `Login.jsx`, `handleLogin` in `LoginFormContext` non blocca submit multipli. Se l'utente preme Invio due volte rapidamente, vengono inviate due richieste di autenticazione.

**Fix in LoginProva:**
```jsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;  // Guard
  setIsSubmitting(true);
  try {
    await login(null, formData);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

### 1.4 `clearLoginFormOnError` cancella anche l'email

**Problema:**
In `LoginFormContext.handleLogin`:
```jsx
const handleLogin = e => {
  login(e, formData);
  if (clearLoginFormOnError) setFormData(initialData); // cancella TUTTO
}
```
L'email viene cancellata insieme alla password, obbligando l'utente a reinserire tutto.

**Fix in LoginProva:**
```jsx
// Solo la password viene resettata dopo il submit
if (clearLoginFormOnError) changeData("password", "");
```

---

## 2. Personalizzabilità via Props

`LoginProva` accetta queste props che `Login` non supportava:

| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `Logo` | `ComponentType` | — | Componente SVG logo (stesso di Login) |
| `backgroundSrc` | `string` | `undefined` | URL immagine sfondo custom |
| `overlayOpacity` | `number` | `0.5` | Opacità sfondo (0.0–1.0) |
| `overlayColor` | `string` | `'#f1f1f1'` | Colore base overlay sfondo |
| `cardVariant` | `'solid'\|'glass'\|'minimal'` | `'solid'` | Stile card |
| `cardPosition` | `'center'\|'left'\|'right'` | `'center'` | Posizione orizzontale card |
| `logoPosition` | `'left'\|'top'` | `'left'` | Posizione logo su desktop |
| `showPasswordToggle` | `boolean` | `true` | Mostra toggle mostra/nascondi password |
| `animateEntrance` | `boolean` | `true` | Anima la card al mount |

Tutti gli `overrideStyle` da `LoginFormContext` continuano a funzionare normalmente.

---

## 3. Background intelligente

**Problema in Login.jsx:**
Lo sfondo era gestito esclusivamente tramite il pseudo-elemento CSS `#login-page::before` con `var(--bg-image)`. Non era possibile cambiare l'immagine per singola istanza senza sovrascrivere una variabile CSS globale.

**Soluzione in LoginProva:**
Il background è un `<div>` React dedicato:
```jsx
<div className="lp-bg" style={bgStyle} aria-hidden="true" />
```
- Se `backgroundSrc` non è passata → usa `var(--bg-image)` dal CSS (stesso sfondo di prima)
- Se `backgroundSrc` è passata → lo stile inline sovrascrive il background con l'URL fornito
- `overlayOpacity` e `overlayColor` sono controllabili per ogni istanza
- `position: fixed` invece di `position: absolute` → più stabile su PWA/fullscreen

---

## 4. Varianti card

### `cardVariant="solid"` (default)
Card bianca con bordo e ombra, stile identico a Login.jsx.

### `cardVariant="glass"`
Glassmorphism: sfondo semi-trasparente con blur dello sfondo dietro.
```css
background: rgba(255, 255, 255, 0.82);
backdrop-filter: blur(14px);
-webkit-backdrop-filter: blur(14px);
```
Supportato su: Chrome 76+, Safari 9+, Firefox 103+, tutti i browser mobili moderni.

### `cardVariant="minimal"`
Nessun bordo, nessuna ombra, sfondo trasparente. Utile con sfondi molto chiari o temi custom completi.

---

## 5. Toggle mostra/nascondi password

`Login.jsx` non aveva questa funzionalità. `LoginProva` aggiunge un bottone con icone `FiEye`/`FiEyeOff` (già disponibili in `react-icons`, dipendenza esistente).

```jsx
<button type="button" className="lp-pw-toggle" onClick={() => setShowPassword(v => !v)}
  aria-label={showPassword ? "Nascondi password" : "Mostra password"}>
  {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
</button>
```

Disabilitabile via `showPasswordToggle={false}`.

---

## 6. Loading state sul bottone

**Problema in Login.jsx:**
Il bottone non aveva feedback visivo durante la chiamata di login.

**Fix in LoginProva:**
```jsx
<button disabled={isSubmitting} aria-busy={isSubmitting}>
  {isSubmitting ? <span className="lp-spinner" /> : buttonText}
</button>
```
- Bottone disabilitato durante il submit (previene doppio click)
- Spinner CSS inline visibile durante l'attesa
- `aria-busy` per screen reader

---

## 7. Layout adattivo con useOrientation

**Problema in Login.jsx:**
L'orientamento era gestito solo via media query CSS (`sm:flex-row`). `useOrientation()` esisteva nel progetto ma non era usato.

**Miglioramento in LoginProva:**
```jsx
const orientation = useOrientation();
const isLogoTop = orientation === "portrait" || logoPosition === "top";
```
- Portrait → `flex-col` (logo sopra, form sotto)
- Landscape/desktop → `flex-row` (logo a sinistra, form a destra)
- Transizione fluida al cambio orientamento (evento `resize`)

---

## 8. Accessibilità (ARIA)

Attributi aggiunti che mancavano:

```jsx
<section role="main" aria-label="Pagina di accesso">
<form aria-label="Form di accesso" noValidate>
<Logo role="img" aria-label="Logo aziendale" />
<button aria-label="..." aria-busy={isSubmitting}>
<div class="lp-bg" aria-hidden="true" />  // decorativo, nascosto a screen reader
```

Il campo email ha `inputName="email"` e quello password `inputName="password"` per il corretto funzionamento del password manager del browser e di `autocomplete`.

---

## 9. Compatibilità PWA

### iOS Safari (standalone mode)
- Safe area: `env(safe-area-inset-*)` già presenti, ora scoped a `#login-prova-page`
- Altezza reale: `calc(var(--vh, 1vh) * 100)` tramite `useViewportHeight()`
- Nessun uso di `100vh` statico
- `user-select: none` per evitare selezione testo accidentale su touch

### Android Chrome
- `backdrop-filter` supportato da Chrome 76+
- Touch targets ≥ 44px per i bottoni (rispettato dalle classi Tailwind esistenti)

### Landscape mobile
- `useOrientation()` rileva landscape e applica `flex-row` con logo a sinistra
- Le media query di `index.css` applicano le dimensioni corrette della card

---

## 10. Performance

- Il div background è separato dal DOM della card → i re-render del form non triggherano re-paint dello sfondo
- Nessuna dipendenza aggiuntiva: si usano solo hook e componenti già presenti nel progetto
- `animateEntrance={false}` per disabilitare l'animazione in contesti ad alte prestazioni

---

## 11. Riutilizzo componenti e hook esistenti

Nessun codice duplicato: tutto riutilizzato dal progetto.

| Risorsa | File |
|---------|------|
| `useViewportHeight` | `src/hooks/viewport/useViewportHeight.jsx` |
| `useOrientation` | `src/hooks/orientation/useOrientation.jsx` |
| `useLoginForm` | `src/contexts/login/LoginFormContext.jsx` |
| `useConfig` | `src/contexts/config/ConfigContext.jsx` |
| `useAuth` | `src/contexts/auth/AuthContext.jsx` |
| `useAuthStorage` | `src/hooks/auth/useAuthStorage.jsx` |
| `Input` | `src/components/inputs/Input.jsx` |
| `InputLabel` | `src/components/inputs/InputLabel.jsx` |
| `FiEye`, `FiEyeOff` | `react-icons/fi` (già in package.json) |

---

## 12. Esempio di utilizzo

```jsx
// Uso base — identico a Login
<LoginProva Logo={MyLogo} />

// Card glassmorphism con sfondo custom
<LoginProva
  Logo={MyLogo}
  backgroundSrc="/images/my-bg.jpg"
  overlayOpacity={0.4}
  cardVariant="glass"
/>

// Card centrata, logo sopra, no animazione
<LoginProva
  Logo={MyLogo}
  logoPosition="top"
  animateEntrance={false}
/>

// Card a destra senza toggle password
<LoginProva
  Logo={MyLogo}
  cardPosition="right"
  showPasswordToggle={false}
/>
```
