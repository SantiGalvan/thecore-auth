# thecore-auth — Documentazione (Italiano)

> 🇬🇧 [Documentation in English](https://github.com/SantiGalvan/thecore-auth/blob/main/README.md) | 🇪🇸 [Documentación en Español](https://github.com/SantiGalvan/thecore-auth/blob/main/DOCUMENTATION_ES.md)

> Versione: 0.0.214 | Licenza: MIT | Autore: Santiago Galvan

---

## Cos'è thecore-auth?

**thecore-auth** è una libreria React che fornisce un sistema di autenticazione completo basato su **JWT (JSON Web Tokens)**, integrato con **React Router** e costruito seguendo il pattern architetturale **thecore**.

Include già pronti all'uso:
- Login / logout con JWT e refresh automatico del token
- Context provider per autenticazione, loading, alert, modal, form e routing
- Componenti UI (form di login, modal, input, loader, alert)
- Hook di utilità per rilevamento del dispositivo, gestione form, calendario, IndexedDB e altro
- Re-export delle API più comuni di React Router, così da importare tutto da un unico posto

---

## Installazione

### 1. Crea un nuovo progetto React con Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

### 2. Installa thecore-auth

```bash
npm install thecore-auth
```

### 3. Importa il CSS

Nel tuo file CSS principale (es. `src/index.css`) aggiungi:

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');
```

Oppure direttamente in `src/main.jsx`:

```jsx
import 'thecore-auth/dist/thecore-auth.css';
```

---

## Configurazione richiesta

Crea il file `public/config.json` nel tuo progetto. Questo file viene caricato a runtime e pilota l'intero sistema di autenticazione:

```json
{
  "baseUri": "https://api.mia-app.it",
  "authenticatedEndpoint": "/auth/login",
  "usersEndpoint": "/auth/me",
  "heartbeatEndpoint": "/auth/refresh",
  "firstPrivatePath": "/dashboard",
  "firstPrivateTitle": "Dashboard",
  "defaultTitle": "La mia App",
  "infiniteSession": false,
  "timeDeducted": 60000,
  "alertTimeout": 4000,
  "axiosErrors": {
    "unauthorized": "Sessione scaduta. Effettua nuovamente il login.",
    "notFound": "Risorsa non trovata.",
    "defaultMessage": "Si è verificato un errore imprevisto."
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "",
  "isDebug": false,
  "tokenLog": false,
  "isDevelopment": false,
  "hasSessionKey": false,
  "appKey": "mia-app",
  "showHeaderButton": false,
  "useCustomLoginTimeout": false,
  "customLoginTimeout": 10000,
  "stopLoaderOnFinish": true,
  "timerInfiniteSession": "",
  "customDeviceType": "",
  "sileoToastEnabled": false,
  "sileoToastConfig": {
    "position": "bottom-center",
    "options": {
      "fill": "#000000",
      "duration": 2000,
      "styles": {
        "title": "text-white font-semibold",
        "description": "text-white/75",
        "badge": "bg-white/20"
      }
    }
  },
  "pwa": {
    "enabled": false,
    "promptOnLoad": false,
    "customPrompt": false
  },
  "routes": [
    { "path": "/dashboard", "title": "Dashboard" },
    { "path": "/profilo", "title": "Profilo" }
  ],
  "configRoutes": []
}
```

| Chiave | Tipo | Descrizione |
|--------|------|-------------|
| `baseUri` | `string` | URL base dell'API backend |
| `authenticatedEndpoint` | `string` | Percorso dell'endpoint di login |
| `usersEndpoint` | `string` | Endpoint per ottenere l'utente autenticato |
| `heartbeatEndpoint` | `string` | Endpoint per aggiornare il token JWT |
| `firstPrivatePath` | `string` | Percorso di redirect dopo il login |
| `firstPrivateTitle` | `string` | Titolo della prima pagina privata |
| `infiniteSession` | `boolean` | Se `true`, la sessione non scade mai |
| `timeDeducted` | `number` | Millisecondi da sottrarre alla scadenza del token per il refresh anticipato |
| `alertTimeout` | `number` | Durata (ms) della visualizzazione degli alert |
| `axiosErrors` | `object` | Messaggi di errore personalizzati per 401, 404 ed errori generici |
| `clearLoginFormOnError` | `boolean` | Pulisce i campi del form di login in caso di errore |
| `autoLogin` | `boolean` | Abilita il login automatico machine-to-machine |
| `backendToken` | `string` | Token usato per l'auto-login |
| `isDebug` | `boolean` | Abilita il logging di debug in console |
| `sileoToastEnabled` | `boolean` | Abilita le notifiche toast Sileo per mobile |
| `sileoToastConfig` | `object` | Opzioni Sileo: `position`, `options.fill`, `options.duration`, `options.styles` |
| `hasSessionKey` | `boolean` | Genera una chiave di sessione univoca per ogni tab del browser |
| `appKey` | `string` | Prefisso dell'app per la chiave di sessione |
| `isDevelopment` | `boolean` | Flag per la modalità di sviluppo |
| `defaultTitle` | `string` | Titolo predefinito del browser tab |
| `routes` | `array` | Array di `{ path, title }` per l'aggiornamento automatico del titolo |
| `configRoutes` | `array` | Rotte aggiuntive iniettate dal pacchetto |
| `tokenLog` | `boolean` | Logga i dettagli del token JWT in console (debug) |
| `showHeaderButton` | `boolean` | Mostra un pulsante di logout nell'header predefinito |
| `useCustomLoginTimeout` | `boolean` | Abilita un timeout personalizzato per la richiesta di login |
| `customLoginTimeout` | `number` | Timeout (ms) per il login quando `useCustomLoginTimeout` è `true` |
| `stopLoaderOnFinish` | `boolean` | Ferma il loader globale al termine dell'animazione di SmartLogin |
| `timerInfiniteSession` | `string` | Stringa cron per la pianificazione dell'heartbeat in sessione infinita |
| `customDeviceType` | `string` | Sovrascrive il tipo di dispositivo rilevato (`'mobile'`, `'tablet'`, `'desktop'`) |
| `pwa` | `object` | Config prompt installazione PWA: `enabled`, `promptOnLoad`, `customPrompt` |

---

## Avvio rapido — Setup completo

### `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  ConfigProvider,
  LoadingProvider,
  AlertProvider,
  AuthProvider,
  LoginFormProvider,
  ModalProvider
} from 'thecore-auth';
import App from './App.jsx';
import 'thecore-auth/dist/thecore-auth.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <LoadingProvider>
          <AlertProvider>
            <AuthProvider>
              <LoginFormProvider>
                <ModalProvider>
                  <App />
                </ModalProvider>
              </LoginFormProvider>
            </AuthProvider>
          </AlertProvider>
        </LoadingProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
```

### `src/App.jsx`

```jsx
import { PackageRoutes, RouteProvider } from 'thecore-auth';

// Le tue pagine private
import Dashboard from './pages/Dashboard';

// Definisci le rotte private
const privateRoutes = [
  { path: '/dashboard', element: <Dashboard /> }
];

export default function App() {
  return (
    <RouteProvider privateRoutes={privateRoutes} publicRoutes={[]}>
      <PackageRoutes
        firstPrivateElement={<Dashboard />}
      />
    </RouteProvider>
  );
}
```

---

## Context Provider e Hook

### ConfigProvider / useConfig

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/contexts/ConfigProvider.md)

Carica ed espone la configurazione runtime da `config.json`. Fornisce anche utility per IndexedDB e la data corrente.

```jsx
import { useConfig } from 'thecore-auth';

function MioComponente() {
  const { config, version, setCurrentDate } = useConfig();

  return <p>API base: {config.baseUri}</p>;
}
```

**Valori restituiti:**

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `config` | `object` | Tutti i valori di `config.json` |
| `version` | `string` | Versione del pacchetto |
| `setCurrentDate()` | `function` | Restituisce la data corrente come `dd/mm/yyyy hh:mm:ss` |
| `openIndexedDB(db, store)` | `function` | Apre una connessione IndexedDB |
| `getDataIndexedDB(db, store, key)` | `function` | Legge un valore da IndexedDB |
| `setDataIndexedDB(db, store, data)` | `function` | Scrive un valore su IndexedDB |
| `generateUniqueId(db, store)` | `function` | Genera un ID numerico univoco |
| `setDataWithAutoId(db, store, data)` | `function` | Salva dati con ID auto-generato |
| `activity` | `object` | Stato di attività dell'utente (visibilità, focus) |
| `sessionKey` | `string \| undefined` | Chiave di sessione univoca (se `hasSessionKey: true`) |

---

### AuthProvider / useAuth

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/contexts/AuthProvider.md)

Gestisce lo stato dell'autenticazione JWT, il refresh del token e le operazioni di login/logout.

```jsx
import { useAuth } from 'thecore-auth';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return isAuthenticated
    ? <button onClick={logout}>Esci</button>
    : <p>Non autenticato</p>;
}
```

**Valori restituiti:**

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `isAuthenticated` | `boolean \| null` | Stato autenticazione (`null` = in caricamento) |
| `login(e?, formData)` | `function` | Invia le credenziali di login |
| `logout()` | `function` | Cancella la sessione e reindirizza al login |
| `createAxiosInstances(...)` | `function` | Crea un'istanza axios con token Bearer |
| `fetchHeartbeat()` | `function` | Aggiorna manualmente il token JWT |
| `getTokenExpiry(token?)` | `function` | Ottiene i ms rimanenti prima della scadenza del token |
| `checkTokenValidity(token)` | `function` | Restituisce `true` se il token è ancora valido |
| `timeoutToken` | `number` | Ms al prossimo refresh del token |
| `sessionTimeout` | `number` | Ms alla scadenza della sessione |

---

### LoadingProvider / useLoading

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/contexts/LoadingProvider.md)

Spinner di caricamento globale, visibile sull'intera applicazione.

```jsx
import { useLoading } from 'thecore-auth';

function BottoneSalva() {
  const { setIsLoading } = useLoading();

  const handleSave = async () => {
    setIsLoading(true);
    await salvaData();
    setIsLoading(false);
  };

  return <button onClick={handleSave}>Salva</button>;
}
```

**Valori restituiti:**

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `isLoading` | `boolean` | Stato corrente del caricamento |
| `setIsLoading(bool)` | `function` | Mostra o nasconde lo spinner |
| `showLoadingFor(ms?, props?)` | `function` | Mostra lo spinner per una durata fissa |
| `loadingProps` | `object` | Props passate al componente `Loading` |

---

### AlertProvider / useAlert

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/contexts/AlertProvider.md)

Mostra notifiche in-app di tipo `danger`, `info`, `success` o `warning`.

```jsx
import { useAlert } from 'thecore-auth';

function FormInvio() {
  const { activeAlert } = useAlert();

  const handleSubmit = async () => {
    try {
      await inviaData();
      activeAlert('success', 'Dati salvati con successo!');
    } catch {
      activeAlert('danger', 'Qualcosa è andato storto.');
    }
  };

  return <button onClick={handleSubmit}>Invia</button>;
}
```

**Valori restituiti:**

| Nome | Tipo | Descrizione |
|------|------|-------------|
| `showAlert` | `boolean` | Indica se l'alert è visibile |
| `typeAlert` | `string` | Tipo di alert (`danger`, `info`, `success`, `warning`) |
| `messageAlert` | `string` | Testo del messaggio |
| `activeAlert(type, message)` | `function` | Mostra un alert |
| `closeAlert()` | `function` | Chiude l'alert corrente |

---

### ModalProvider / useModal

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/contexts/ModalProvider.md)

Sistema modal centralizzato con supporto ai tipi `submit`, `delete` e `custom`.

```jsx
import { useModal } from 'thecore-auth';

function ListaUtenti() {
  const { openModal, closeModal } = useModal();

  const handleElimina = (utente) => {
    openModal({
      type: 'delete',
      title: 'Elimina utente',
      item: utente,
      onConfirm: async () => {
        await eliminaUtente(utente.id);
        closeModal();
      }
    });
  };

  return <button onClick={() => handleElimina(utente)}>Elimina</button>;
}
```

**Opzioni di `openModal`:**

| Proprietà | Tipo | Descrizione |
|-----------|------|-------------|
| `type` | `'submit' \| 'delete' \| 'custom'` | Tipo di comportamento del modal |
| `title` | `string` | Titolo dell'intestazione |
| `component` | `ReactNode` | Contenuto da renderizzare nel modal |
| `modalData` | `object` | Dati iniziali del form |
| `onConfirm` | `function` | Callback alla conferma |
| `onCancel` | `function` | Callback all'annullamento |
| `formId` | `string` | ID del form dentro il modal |
| `item` | `any` | Entità su cui agisce il modal |
| `style` | `object` | Stili personalizzati |

---

### LoginFormProvider / useLoginForm

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/contexts/LoginFormProvider.md)

Gestisce lo stato e la personalizzazione del form di login.

```jsx
import { LoginFormProvider } from 'thecore-auth';

<LoginFormProvider
  title="Accedi al tuo account"
  label="Indirizzo email"
  buttonText="Entra"
  LogoImg={MioLogo}
>
  {/* children */}
</LoginFormProvider>
```

**Props del provider:**

| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `title` | `string` | `'Accedi'` | Titolo del form |
| `label` | `string` | `'Email'` | Etichetta del campo email |
| `type` | `string` | `'email'` | Tipo del campo email |
| `placeholder` | `string` | — | Placeholder del campo email |
| `buttonText` | `string` | `'Accedi'` | Testo del pulsante di invio |
| `LogoImg` | `ReactNode` | — | Componente logo |
| `styleCardForm` | `object` | — | Stili del contenitore card |
| `styleLogo` | `object` | — | Stili del logo |
| `overrideStyle` | `object` | — | Override CSS completo |
| `customVersion` | `string` | — | Stringa di versione personalizzata |

---

### RouteProvider / useRoutesInjection

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/contexts/RouteProvider.md)

Registra le rotte pubbliche e private da renderizzare tramite `PackageRoutes`.

```jsx
import { RouteProvider } from 'thecore-auth';

const privateRoutes = [
  { path: '/profilo', element: <PaginaProfilo /> },
  { path: '/impostazioni', element: <PaginaImpostazioni /> }
];

const publicRoutes = [
  { path: '/chi-siamo', element: <ChiSiamo /> }
];

<RouteProvider privateRoutes={privateRoutes} publicRoutes={publicRoutes}>
  <PackageRoutes firstPrivateElement={<Dashboard />} />
</RouteProvider>
```

---

## Componenti

### PackageRoutes

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/routing/PackageRoutes.md)

Il componente di routing principale. Renderizza le rotte pubbliche, la pagina di login e protegge le rotte private con i guard di autenticazione.

```jsx
<PackageRoutes
  firstPrivateElement={<Dashboard />}
  globalLayout={MioLayout}
  headerComponent={MioHeader}
  footerComponent={MioFooter}
  showHeaderOnLogin={false}
  showFooterOnLogin={false}
  headerExcludedRoutes={['/impostazioni']}
  footerExcludedRoutes={[]}
/>
```

| Prop | Tipo | Descrizione |
|------|------|-------------|
| `firstPrivateElement` | `ReactNode` | Componente della prima rotta privata |
| `globalLayout` | `ReactNode` | Layout wrapper personalizzato |
| `headerComponent` | `ReactNode` | Componente header |
| `footerComponent` | `ReactNode` | Componente footer |
| `showHeaderOnLogin` | `boolean` | Mostra l'header nella pagina di login |
| `showFooterOnLogin` | `boolean` | Mostra il footer nella pagina di login |
| `headerExcludedRoutes` | `string[]` | Percorsi dove l'header è nascosto |
| `footerExcludedRoutes` | `string[]` | Percorsi dove il footer è nascosto |
| `privateProvider` | `ReactNode` | Provider aggiuntivo per le rotte private |
| `customProvider` | `ReactNode` | Provider aggiuntivo per tutte le rotte |
| `promptComponent` | `ReactNode` | Componente prompt di navigazione |

---

### Login

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/pages/Login.md)

Pagina di login pre-costruita. Usata automaticamente da `PackageRoutes` al percorso `/`.

---

### SmartLogin

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/pages/SmartLogin.md)

Pagina di login PWA-ready con funzionalità avanzate. Sostituta diretta di `Login` con
personalizzazione completa, miglioramenti all'accessibilità e miglior supporto mobile.

```jsx
import { SmartLogin } from 'thecore-auth';

<SmartLogin
  Logo={MioLogo}
  backgroundSrc="/images/sfondo.jpg"
  overlayOpacity={0.5}
  overlayColor="#f1f1f1"
  cardVariant="glass"
  cardPosition="center"
  logoPosition="left"
  showPasswordToggle={true}
  animateEntrance={true}
/>
```

| Prop | Tipo | Default | Descrizione |
|------|------|---------|-------------|
| `Logo` | `ComponentType` | — | Componente SVG logo |
| `backgroundSrc` | `string` | `undefined` | URL immagine sfondo personalizzata |
| `overlayOpacity` | `number` | `0.5` | Opacità overlay sfondo (0.0–1.0) |
| `overlayColor` | `string` | `'#f1f1f1'` | Colore base overlay sfondo |
| `cardVariant` | `'solid' \| 'glass' \| 'minimal'` | `'solid'` | Variante stile card |
| `cardPosition` | `'center' \| 'left' \| 'right'` | `'center'` | Posizione orizzontale della card |
| `logoPosition` | `'left' \| 'top'` | `'left'` | Posizione logo su desktop |
| `showPasswordToggle` | `boolean` | `true` | Mostra toggle visibilità password |
| `animateEntrance` | `boolean` | `true` | Anima la card al mount |

Tutti i valori `overrideStyle` di `LoginFormProvider` continuano a funzionare con `SmartLogin`.

---

### LoginForm

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/LoginForm.md)

Interfaccia del form di login basata su `LoginFormProvider`. Può essere usata autonomamente in un layout personalizzato.

```jsx
import { LoginForm } from 'thecore-auth';

<LoginForm />
```

---

### DefaultLayout

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/layouts/DefaultLayout.md)

Layout wrapper che renderizza `Loading`, `Alert`, `Modal` e un layer di toast opzionale insieme al contenuto della pagina.

```jsx
import { DefaultLayout } from 'thecore-auth';

<DefaultLayout
  headerComponent={<MioHeader />}
  footerComponent={<MioFooter />}
  isMain={true}
/>
```

---

### Input / InputLabel

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/Input.md) | [InputLabel](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/InputLabel.md)

Componenti base per input e label dei form.

```jsx
import { Input, InputLabel } from 'thecore-auth';

<InputLabel label="Nome" labelId="nome" />
<Input
  inputId="nome"
  inputType="text"
  inputValue={nome}
  inputChange={(e) => setNome(e.target.value)}
  inputPlaceholder="Inserisci il tuo nome"
/>
```

---

### InputDate / InputStartEndDate

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/InputDate.md) | [InputStartEndDate](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/InputStartEndDate.md)

Componenti per la selezione di una data singola o un intervallo di date.

```jsx
import { InputDate, InputStartEndDate } from 'thecore-auth';

// Data singola
<InputDate
  id="data"
  name="data"
  value={data}
  onChange={(e) => setData(e.target.value)}
  title="Seleziona data"
/>

// Intervallo di date
<InputStartEndDate
  startId="inizio"
  endId="fine"
  startValue={dataInizio}
  endValue={dataFine}
  onChange={handleChange}
  startTitle="Dal"
  endTitle="Al"
/>
```

---

### FileDropzone

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/FileDropzone.md)

Area di upload file con drag-and-drop.

```jsx
import { FileDropzone } from 'thecore-auth';

<FileDropzone
  id="upload"
  onFilesSelect={(files) => console.log(files)}
/>
```

---

### SwitchRadio

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/SwitchRadio.md)

Toggle switch (controllato o non controllato).

```jsx
import { SwitchRadio } from 'thecore-auth';

<SwitchRadio value={attivo} onChange={(val) => setAttivo(val)} />
```

---

### SingleSelect / MultiSelect

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/SingleSelect.md) | [MultiSelect](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/MultiSelect.md)

Componenti dropdown per selezione singola o multipla.

```jsx
import { SingleSelect, MultiSelect } from 'thecore-auth';

// Selezione singola
<SingleSelect
  options={[{ label: 'Italia', value: 'IT' }, { label: 'Francia', value: 'FR' }]}
  value={selezionato}
  onChange={setSelezionato}
/>

// Selezione multipla
<MultiSelect
  label="Paesi"
  items={paesi}
  value={paesiSelezionati}
  displayKey="label"
  valueKey="value"
  idKey="id"
  updateFilter={setPaesiSelezionati}
/>
```

---

### Loading / LoadingComponent / Loader / LogoLoader

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/Loading.md) | [LoadingComponent](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/LoadingComponent.md) | [Loader](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/Loader.md) | [LogoLoader](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/LogoLoader.md)

Componenti per gli stati di caricamento.

```jsx
import { Loader } from 'thecore-auth';

<Loader
  Logo={MioLogo}
  spinnerColor="#3b82f6"
  containerSize="100vh"
/>
```

---

### Alert

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/components/Alert.md)

Banner di notifica controllato da `AlertProvider`. Viene renderizzato automaticamente quando viene chiamato `activeAlert`.

---

### AuthPage / AuthAdmin

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/middlewares/AuthPage.md) | [AuthAdmin](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/middlewares/AuthAdmin.md)

Guard di rotta per l'autenticazione e i ruoli admin.

```jsx
import { AuthPage, AuthAdmin } from 'thecore-auth';

// Nelle tue rotte:
{ path: '/dashboard', element: <AuthPage><Dashboard /></AuthPage> }
{ path: '/admin', element: <AuthAdmin><PannelloAdmin /></AuthAdmin> }
```

---

## Hook

### useStorage

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useStorage.md)

Stato sincronizzato con `localStorage`.

```jsx
import { useStorage } from 'thecore-auth';

const [tema, setTema, rimuoviTema] = useStorage('chiaro', 'app-tema');
```

| Parametro | Tipo | Descrizione |
|-----------|------|-------------|
| `initialValue` | `any` | Valore di default se la chiave non esiste |
| `itemKey` | `string` | Chiave localStorage |

Restituisce `[state, setState, remove]`.

---

### useAuthStorage

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useAuthStorage.md)

Gestisce `accessToken` e `user` nel localStorage.

```jsx
import { useAuthStorage } from 'thecore-auth';

const { token, user, setToken, setUser, storageLogout } = useAuthStorage();
```

---

### useIndexedDB

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useIndexedDB.md)

Operazioni CRUD complete su un object store di IndexedDB.

```jsx
import { useIndexedDB } from 'thecore-auth';

const db = useIndexedDB('mioDatabase', 'mioStore');

await db.set({ id: 1, nome: 'Elemento' });
const elemento = await db.get(1);
await db.remove(1);
```

| Metodo | Descrizione |
|--------|-------------|
| `get(key)` | Legge un record tramite chiave |
| `getAll()` | Legge tutti i record |
| `set(data)` | Scrive un record |
| `setWithAutoId(data)` | Scrive con ID auto-generato |
| `remove(id)` | Elimina un record tramite ID |
| `clear()` | Elimina tutti i record |
| `isReady` | `boolean` — il DB è pronto |

---

### useForm

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useForm.md)

Gestione dello stato del form con supporto all'upload di file.

```jsx
import { useForm } from 'thecore-auth';

const { values, handleChange, files, addFiles, resetForm } = useForm({
  nome: '',
  email: ''
});

<input
  value={values.nome}
  onChange={(e) => handleChange('nome', e.target.value)}
/>
```

| Valore restituito | Tipo | Descrizione |
|-------------------|------|-------------|
| `values` | `object` | Valori correnti del form |
| `handleChange(field, value)` | `function` | Aggiorna un campo |
| `files` | `object` | File per nome campo |
| `previews` | `object` | URL di anteprima per i file immagine |
| `addFiles(field, fileList)` | `function` | Aggiunge file a un campo |
| `replaceFiles(field, fileList)` | `function` | Sostituisce i file di un campo |
| `removeFile(field, index)` | `function` | Rimuove un file per indice |
| `setValues` | `function` | Sovrascrive l'intero stato del form |
| `resetForm()` | `function` | Ripristina i valori iniziali |

---

### useDevice

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useDevice.md)

Rileva il tipo di dispositivo, il sistema operativo e il browser dell'utente.

```jsx
import { useDevice } from 'thecore-auth';

const { isMobile, isDesktop, os, browser } = useDevice();
```

| Valore restituito | Tipo | Descrizione |
|-------------------|------|-------------|
| `type` | `string` | `'mobile'`, `'tablet'` o `'desktop'` |
| `os` | `string` | Nome del sistema operativo |
| `browser` | `string` | Nome del browser |
| `vendor` | `string` | Produttore del dispositivo |
| `model` | `string` | Modello del dispositivo |
| `isMobile` | `boolean` | — |
| `isTablet` | `boolean` | — |
| `isDesktop` | `boolean` | — |
| `isIPhone` | `boolean` | — |
| `isIPad` | `boolean` | — |
| `isAndroid` | `boolean` | — |

---

### useOrientation

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useOrientation.md)

Rileva l'orientamento portrait o landscape.

```jsx
import { useOrientation } from 'thecore-auth';

const orientamento = useOrientation(); // 'portrait' | 'landscape'
```

---

### useViewportHeight

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useViewportHeight.md)

Legge l'altezza effettiva del viewport e la espone come variabile CSS `--vh`.

```jsx
import { useViewportHeight } from 'thecore-auth';

const { height, vh } = useViewportHeight({ getValues: true });
```

---

### useSafeArea

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useSafeArea.md)

Aggiunge la classe `with-safe-area` al `<body>` sui dispositivi con notch o safe area (iPhone X+, ecc.).

```jsx
import { useSafeArea } from 'thecore-auth';

useSafeArea(['/login']); // esclude questi percorsi
```

---

### useClickOutside

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useClickOutside.md)

Esegue una callback quando l'utente clicca al di fuori di un elemento referenziato.

```jsx
import { useClickOutside } from 'thecore-auth';
import { useRef } from 'react';

const ref = useRef();
useClickOutside(ref, () => setAperto(false));

<div ref={ref}>...</div>
```

---

### UsePageTitle

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/UsePageTitle.md)

Aggiorna automaticamente `document.title` in base alla rotta corrente.

```jsx
import { UsePageTitle } from 'thecore-auth';

// All'interno del tuo componente layout:
UsePageTitle(rotte, 'La mia App');
```

---

### useToast

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useToast.md)

Notifiche toast ottimizzate per mobile tramite la libreria Sileo.

```jsx
import { useToast } from 'thecore-auth';

const toast = useToast();

toast.success('Salvato!', 'Le modifiche sono state salvate.');
toast.error('Errore', 'Qualcosa è andato storto.');
toast.info('Avviso', 'Controlla il form.');
toast.warning('Attenzione', 'Questa azione non può essere annullata.');

// Toast con promise
toast.promise(fetchData(), {
  loading: 'Caricamento...',
  success: 'Completato!',
  error: 'Fallito'
});
```

---

### useCalendar

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/hooks/useCalendar.md)

Utilità per il calendario con rilevamento dei giorni festivi.

```jsx
import { useCalendar } from 'thecore-auth';

const { isTodayHoliday, isHoliday, getDaysInMonth } = useCalendar(2025, 'IT');

const eFestivo = isTodayHoliday();
const giorni = getDaysInMonth(0, 2025); // Gennaio 2025
```

| Valore restituito | Descrizione |
|-------------------|-------------|
| `holidays` | Array di oggetti festività |
| `holidayMap` | Map per lookup O(1) delle festività |
| `isTodayHoliday()` | `true` se oggi è festivo |
| `isHoliday(date)` | `true` se la data è festiva |
| `getWeekDays(date)` | 7 giorni della settimana a partire da lunedì |
| `getWeeksInMonth(month, year)` | Settimane nel mese indicato |
| `getDaysInMonth(month, year)` | Tutti i giorni del mese |
| `getDaysInMonths(start, year, n)` | Giorni su `n` mesi a partire da `start` |
| `getDaysInYear(year)` | Tutti i giorni dell'anno |

---

## Funzioni di utilità

### Utilità per le date

[→ Riferimento completo](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/utils/dateUtils.md) | [fetchAxiosConfig](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/utils/fetchAxiosConfig.md)

```jsx
import {
  toDatetimeLocalValue,
  setTime,
  subtractDays,
  parseUtcToLocal,
  toDateValue
} from 'thecore-auth';

toDatetimeLocalValue(new Date());        // "2025-01-15T14:30"
toDateValue(new Date());                  // "2025-01-15"
setTime(new Date(), 9, 0, 0);            // Date alle 09:00:00
subtractDays(new Date(), 7);              // 7 giorni fa
parseUtcToLocal('2025-01-15T12:00:00Z'); // Oggetto Date in orario locale
```

---

## Re-export di React Router

Non è necessario installare separatamente `react-router-dom`. Importa tutto da `thecore-auth`:

```jsx
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
  useMatch
} from 'thecore-auth';
```

---

## Personalizzazione CSS

Sovrascrivi i design token del pacchetto nel tuo file CSS:

```css
:root {
  /* Colori brand */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-text: #ffffff;

  /* Colori alert */
  --color-danger: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;

  /* Dimensioni form di login */
  --height-card-form: auto;
  --width-card-form: 400px;
  --max-width-card-form: 90vw;
  --padding-input: 0.75rem 1rem;
  --input-radius: 0.5rem;

  /* Pulsanti */
  --padding-primary-button: 0.75rem 1.5rem;
  --radius-primary-button: 0.5rem;
}
```

---

## Esempio completo di app React

Di seguito un esempio minimo ma completo di un'applicazione React che usa `thecore-auth`.

### Struttura dei file

```
my-app/
├── public/
│   └── config.json
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Profilo.jsx
│   ├── components/
│   │   └── Header.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── package.json
```

### `public/config.json`

```json
{
  "baseUri": "https://api.esempio.it",
  "authenticatedEndpoint": "/auth/login",
  "usersEndpoint": "/auth/me",
  "heartbeatEndpoint": "/auth/refresh",
  "firstPrivatePath": "/dashboard",
  "firstPrivateTitle": "Dashboard",
  "defaultTitle": "La mia App",
  "infiniteSession": false,
  "timeDeducted": 60000,
  "alertTimeout": 4000,
  "axiosErrors": {
    "unauthorized": "La tua sessione è scaduta.",
    "notFound": "Pagina non trovata.",
    "defaultMessage": "Si è verificato un errore."
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "",
  "isDebug": false,
  "tokenLog": false,
  "isDevelopment": false,
  "hasSessionKey": false,
  "appKey": "mia-app",
  "showHeaderButton": false,
  "useCustomLoginTimeout": false,
  "customLoginTimeout": 10000,
  "stopLoaderOnFinish": true,
  "timerInfiniteSession": "",
  "customDeviceType": "",
  "sileoToastEnabled": false,
  "sileoToastConfig": {
    "position": "bottom-center",
    "options": {
      "fill": "#000000",
      "duration": 2000,
      "styles": {
        "title": "text-white font-semibold",
        "description": "text-white/75",
        "badge": "bg-white/20"
      }
    }
  },
  "pwa": {
    "enabled": false,
    "promptOnLoad": false,
    "customPrompt": false
  },
  "routes": [
    { "path": "/dashboard", "title": "Dashboard" },
    { "path": "/profilo", "title": "Profilo" }
  ],
  "configRoutes": []
}
```

### `src/index.css`

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');

:root {
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-text: #ffffff;
}
```

### `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  ConfigProvider,
  LoadingProvider,
  AlertProvider,
  AuthProvider,
  LoginFormProvider,
  ModalProvider
} from 'thecore-auth';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <LoadingProvider>
          <AlertProvider>
            <AuthProvider>
              <LoginFormProvider
                title="Bentornato"
                label="Indirizzo email"
                buttonText="Accedi"
              >
                <ModalProvider>
                  <App />
                </ModalProvider>
              </LoginFormProvider>
            </AuthProvider>
          </AlertProvider>
        </LoadingProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>
);
```

### `src/App.jsx`

```jsx
import { PackageRoutes, RouteProvider } from 'thecore-auth';

import Dashboard from './pages/Dashboard';
import Profilo from './pages/Profilo';
import Header from './components/Header';

const privateRoutes = [
  { path: '/profilo', element: <Profilo /> }
];

export default function App() {
  return (
    <RouteProvider privateRoutes={privateRoutes} publicRoutes={[]}>
      <PackageRoutes
        firstPrivateElement={<Dashboard />}
        headerComponent={<Header />}
        showHeaderOnLogin={false}
      />
    </RouteProvider>
  );
}
```

### `src/components/Header.jsx`

```jsx
import { useAuth, useNavigate, Link } from 'thecore-auth';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between' }}>
      <Link to="/dashboard">La mia App</Link>
      {isAuthenticated && (
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/profilo">Profilo</Link>
          <button onClick={handleLogout}>Esci</button>
        </nav>
      )}
    </header>
  );
}
```

### `src/pages/Dashboard.jsx`

```jsx
import { useAuth, useAlert, useLoading, useConfig } from 'thecore-auth';

export default function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { activeAlert } = useAlert();
  const { setIsLoading } = useLoading();
  const { config } = useConfig();

  const handleAzione = async () => {
    setIsLoading(true);
    try {
      // simulazione chiamata API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      activeAlert('success', 'Azione completata con successo!');
    } catch {
      activeAlert('danger', 'Qualcosa è andato storto.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>API: {config.baseUri}</p>
      <button onClick={handleAzione}>Esegui azione</button>
    </main>
  );
}
```

### `src/pages/Profilo.jsx`

```jsx
import { useForm, useAlert, useAuth } from 'thecore-auth';

export default function Profilo() {
  const { values, handleChange, resetForm } = useForm({ nome: '', bio: '' });
  const { activeAlert } = useAlert();
  const { createAxiosInstances } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const axios = createAxiosInstances();
    try {
      await axios.put('/profilo', values);
      activeAlert('success', 'Profilo aggiornato!');
    } catch {
      activeAlert('danger', 'Aggiornamento non riuscito.');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Profilo</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome</label>
          <input
            value={values.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            value={values.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
          />
        </div>
        <button type="submit">Salva</button>
        <button type="button" onClick={resetForm}>Ripristina</button>
      </form>
    </main>
  );
}
```

---

## Variabili CSS

Tutti gli aspetti visivi del pacchetto sono controllati tramite proprietà CSS personalizzate.
Sovrascrivile nel tuo blocco `:root {}` dopo aver importato il CSS del pacchetto.

| Lingua | Link |
|--------|------|
| 🇬🇧 English | [docs/css-variables.md](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/css-variables.md) |
| 🇮🇹 Italiano | [docs/it/css/css-variables.md](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/css/css-variables.md) |
| 🇪🇸 Español | [docs/es/css-variables.md](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/es/css-variables.md) |

---

## Sistema Modal

Riferimento API completo, guida agli override di stile ed esempi d'uso per il sistema modal centralizzato (`useModal`, `openModal`, `closeModal`).

| Lingua | Link |
|--------|------|
| 🇬🇧 English | [docs/modal.md](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/modal.md) |
| 🇮🇹 Italiano | [docs/it/modal.md](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/it/modal.md) |
| 🇪🇸 Español | [docs/es/modal.md](https://github.com/SantiGalvan/thecore-auth/blob/main/docs/es/modal.md) |

---

## Repository

- GitHub: [https://github.com/SantiGalvan/thecore-auth](https://github.com/SantiGalvan/thecore-auth)
- npm: `npm install thecore-auth`
