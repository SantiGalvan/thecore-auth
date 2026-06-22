# thecore-auth — Documentation (English)

> 🇮🇹 [Documentazione in Italiano](./DOCUMENTATION_IT.md) | 🇪🇸 [Documentación en Español](./DOCUMENTATION_ES.md)

> Version: 0.0.214 | License: MIT | Author: Santiago Galvan

---

## What is thecore-auth?

**thecore-auth** is a React library that provides a complete authentication system based on **JWT (JSON Web Tokens)**, integrated with **React Router** and built for the **thecore** architecture pattern.

It ships ready-to-use:
- JWT login / logout with automatic token refresh
- Context providers for auth, loading, alerts, modals, forms, and routing
- A set of UI components (login form, modal, inputs, loaders, alerts)
- Utility hooks for device detection, form management, calendar, IndexedDB, and more
- Re-exports of the most common React Router APIs so you only import from one place

---

## Installation

### 1. Create a new React project with Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

### 2. Install thecore-auth

```bash
npm install thecore-auth
```

### 3. Import the CSS

In your main CSS file (e.g. `src/index.css`) add:

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');
```

Or in `src/main.jsx`:

```jsx
import 'thecore-auth/dist/thecore-auth.css';
```

---

## Required Configuration

Create a file `public/config.json` in your project. This file is loaded at runtime and drives the entire auth system:

```json
{
  "baseUri": "https://api.myapp.com",
  "authenticatedEndpoint": "/auth/login",
  "usersEndpoint": "/auth/me",
  "heartbeatEndpoint": "/auth/refresh",
  "firstPrivatePath": "/dashboard",
  "firstPrivateTitle": "Dashboard",
  "infiniteSession": false,
  "timeDeducted": 60000,
  "alertTimeout": 4000,
  "axiosTimeout": 10000,
  "axiosErrors": {
    "unauthorized": "Session expired. Please log in again.",
    "notFound": "Resource not found.",
    "defaultMessage": "An unexpected error occurred."
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "",
  "isDebug": false,
  "sileoToastEnabled": false,
  "hasSessionKey": false,
  "appKey": "myapp",
  "isDevelopment": false,
  "defaultTitle": "My App",
  "routes": [
    { "path": "/dashboard", "title": "Dashboard" },
    { "path": "/profile", "title": "Profile" }
  ],
  "configRoutes": []
}
```

| Key | Type | Description |
|-----|------|-------------|
| `baseUri` | `string` | Base URL of the backend API |
| `authenticatedEndpoint` | `string` | Login endpoint path |
| `usersEndpoint` | `string` | Endpoint to fetch the authenticated user |
| `heartbeatEndpoint` | `string` | Endpoint to refresh the JWT token |
| `firstPrivatePath` | `string` | Redirect path after successful login |
| `firstPrivateTitle` | `string` | Title of the first private page |
| `infiniteSession` | `boolean` | If `true`, session never expires |
| `timeDeducted` | `number` | Milliseconds to subtract from token expiry for early refresh |
| `alertTimeout` | `number` | Duration (ms) to show alert notifications |
| `axiosTimeout` | `number` | HTTP request timeout in milliseconds |
| `axiosErrors` | `object` | Custom error messages for 401, 404, and generic errors |
| `clearLoginFormOnError` | `boolean` | Clear login form fields when an error occurs |
| `autoLogin` | `boolean` | Enable machine-to-machine auto-login |
| `backendToken` | `string` | Token used for auto-login |
| `isDebug` | `boolean` | Enable debug logging to console |
| `sileoToastEnabled` | `boolean` | Enable Sileo mobile toast notifications |
| `sileoToastConfig` | `object` | Sileo toast options: `position`, `options.fill`, `options.duration`, `options.styles` |
| `hasSessionKey` | `boolean` | Generate a unique session key per browser tab |
| `appKey` | `string` | App prefix for the session key |
| `isDevelopment` | `boolean` | Development mode flag |
| `defaultTitle` | `string` | Default browser tab title |
| `routes` | `array` | Array of `{ path, title }` for automatic page title updates |
| `configRoutes` | `array` | Additional custom routes injected by the package |
| `tokenLog` | `boolean` | Log JWT token details to the console (debug) |
| `showHeaderButton` | `boolean` | Show a logout button in the default header |
| `useCustomLoginTimeout` | `boolean` | Enable a custom timeout for the login request |
| `customLoginTimeout` | `number` | Timeout (ms) for the login request when `useCustomLoginTimeout` is `true` |
| `stopLoaderOnFinish` | `boolean` | Stop the global loader when SmartLogin finishes its intro animation |
| `timerInfiniteSession` | `string` | Cron-like string for infinite-session heartbeat scheduling |
| `customDeviceType` | `string` | Override the detected device type (`'mobile'`, `'tablet'`, `'desktop'`) |
| `pwa` | `object` | PWA install prompt config: `enabled`, `promptOnLoad`, `customPrompt` |

---

## Quick Start — Complete Setup

### `src/main.jsx`

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'thecore-auth';
import App from './App.jsx';
import 'thecore-auth/dist/thecore-auth.css';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### `src/App.jsx`

```jsx
import {
  PackageRoutes,
  ConfigProvider,
  AuthProvider,
  LoadingProvider,
  AlertProvider,
  LoginFormProvider,
  ModalProvider,
  RouteProvider
} from 'thecore-auth';

// Your private pages
import Dashboard from './pages/Dashboard';

// Define your private routes
const privateRoutes = [
  { path: '/dashboard', element: <Dashboard /> }
];

export default function App() {
  return (
    <ConfigProvider>
      <LoadingProvider>
        <AlertProvider>
          <AuthProvider>
            <LoginFormProvider>
              <ModalProvider>
                <RouteProvider privateRoutes={privateRoutes} publicRoutes={[]}>
                  <PackageRoutes
                    firstPrivateElement={<Dashboard />}
                  />
                </RouteProvider>
              </ModalProvider>
            </LoginFormProvider>
          </AuthProvider>
        </AlertProvider>
      </LoadingProvider>
    </ConfigProvider>
  );
}
```

---

## Context Providers & Hooks

### ConfigProvider / useConfig

Loads and exposes the runtime `config.json` configuration. Also provides IndexedDB utilities and the current date helper.

```jsx
import { useConfig } from 'thecore-auth';

function MyComponent() {
  const { config, version, setCurrentDate, getDataIndexedDB } = useConfig();

  return <p>API base: {config.baseUri}</p>;
}
```

**Returned values:**

| Name | Type | Description |
|------|------|-------------|
| `config` | `object` | All values from `config.json` |
| `version` | `string` | Package version |
| `setCurrentDate()` | `function` | Returns current date as `dd/mm/yyyy hh:mm:ss` |
| `openIndexedDB(db, store)` | `function` | Open an IndexedDB connection |
| `getDataIndexedDB(db, store, key)` | `function` | Read a value from IndexedDB |
| `setDataIndexedDB(db, store, data)` | `function` | Write a value to IndexedDB |
| `generateUniqueId(db, store)` | `function` | Generate a unique numeric ID |
| `setDataWithAutoId(db, store, data)` | `function` | Save data with an auto-generated ID |
| `activity` | `object` | User activity info (visibility, focus) |
| `sessionKey` | `string \| undefined` | Unique session key (if `hasSessionKey: true`) |

---

### AuthProvider / useAuth

Manages JWT authentication state, token refresh, and login/logout.

```jsx
import { useAuth } from 'thecore-auth';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return isAuthenticated
    ? <button onClick={logout}>Logout</button>
    : <p>Not logged in</p>;
}
```

**Returned values:**

| Name | Type | Description |
|------|------|-------------|
| `isAuthenticated` | `boolean \| null` | Auth state (`null` = loading) |
| `login(e?, formData)` | `function` | Submit login credentials |
| `logout()` | `function` | Clear session and redirect to login |
| `createAxiosInstances(...)` | `function` | Create axios instance with Bearer token |
| `fetchHeartbeat()` | `function` | Manually refresh the JWT token |
| `getTokenExpiry(token?)` | `function` | Get remaining ms before token expires |
| `checkTokenValidity(token)` | `function` | Returns `true` if token is still valid |
| `timeoutToken` | `number` | Ms until next token refresh |
| `sessionTimeout` | `number` | Ms until session expires |

---

### LoadingProvider / useLoading

Global loading spinner visible over the entire application.

```jsx
import { useLoading } from 'thecore-auth';

function SaveButton() {
  const { setIsLoading } = useLoading();

  const handleSave = async () => {
    setIsLoading(true);
    await saveData();
    setIsLoading(false);
  };

  return <button onClick={handleSave}>Save</button>;
}
```

**Returned values:**

| Name | Type | Description |
|------|------|-------------|
| `isLoading` | `boolean` | Current loading state |
| `setIsLoading(bool)` | `function` | Show or hide the spinner |
| `showLoadingFor(ms?, props?)` | `function` | Show spinner for a fixed duration |
| `loadingProps` | `object` | Props passed to `Loading` component |

---

### AlertProvider / useAlert

Displays in-app notifications of type `danger`, `info`, `success`, or `warning`.

```jsx
import { useAlert } from 'thecore-auth';

function SubmitForm() {
  const { activeAlert } = useAlert();

  const handleSubmit = async () => {
    try {
      await submitData();
      activeAlert('success', 'Data saved successfully!');
    } catch {
      activeAlert('danger', 'Something went wrong.');
    }
  };

  return <button onClick={handleSubmit}>Submit</button>;
}
```

**Returned values:**

| Name | Type | Description |
|------|------|-------------|
| `showAlert` | `boolean` | Whether the alert is visible |
| `typeAlert` | `string` | Alert type (`danger`, `info`, `success`, `warning`) |
| `messageAlert` | `string` | Alert message text |
| `activeAlert(type, message)` | `function` | Show an alert |
| `closeAlert()` | `function` | Dismiss the current alert |

---

### ModalProvider / useModal

Centralized modal system supporting `submit`, `delete`, and `custom` modal types.

```jsx
import { useModal } from 'thecore-auth';

function UserList() {
  const { openModal, closeModal } = useModal();

  const handleDelete = (user) => {
    openModal({
      type: 'delete',
      title: 'Delete user',
      item: user,
      onConfirm: async () => {
        await deleteUser(user.id);
        closeModal();
      }
    });
  };

  return <button onClick={() => handleDelete(user)}>Delete</button>;
}
```

**`openModal` options:**

| Property | Type | Description |
|----------|------|-------------|
| `type` | `'submit' \| 'delete' \| 'custom'` | Modal behavior type |
| `title` | `string` | Modal header title |
| `component` | `ReactNode` | Content to render inside the modal |
| `modalData` | `object` | Initial form data |
| `onConfirm` | `function` | Confirm callback |
| `onCancel` | `function` | Cancel callback |
| `formId` | `string` | ID of the form inside the modal |
| `item` | `any` | Entity the modal is acting upon |
| `style` | `object` | Custom styles |

---

### LoginFormProvider / useLoginForm

Manages the login form state and customization options.

```jsx
import { LoginFormProvider } from 'thecore-auth';

<LoginFormProvider
  title="Sign In"
  label="Email address"
  buttonText="Log in"
  LogoImg={MyLogo}
>
  {/* children */}
</LoginFormProvider>
```

**Provider props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Accedi'` | Form card title |
| `label` | `string` | `'Email'` | Email field label |
| `type` | `string` | `'email'` | Email field input type |
| `placeholder` | `string` | — | Email field placeholder |
| `buttonText` | `string` | `'Accedi'` | Submit button text |
| `LogoImg` | `ReactNode` | — | Logo component |
| `styleCardForm` | `object` | — | Card container styles |
| `styleLogo` | `object` | — | Logo styles |
| `overrideStyle` | `object` | — | CSS override object |
| `customVersion` | `string` | — | Custom version string |

---

### RouteProvider / useRoutesInjection

Registers public and private routes to be rendered by `PackageRoutes`.

```jsx
import { RouteProvider } from 'thecore-auth';

const privateRoutes = [
  { path: '/profile', element: <ProfilePage /> },
  { path: '/settings', element: <SettingsPage /> }
];

const publicRoutes = [
  { path: '/about', element: <AboutPage /> }
];

<RouteProvider privateRoutes={privateRoutes} publicRoutes={publicRoutes}>
  <PackageRoutes firstPrivateElement={<Dashboard />} />
</RouteProvider>
```

---

## Components

### PackageRoutes

The main routing component. Renders public routes, the login page, and wraps private routes with authentication guards.

```jsx
<PackageRoutes
  firstPrivateElement={<Dashboard />}
  globalLayout={MyLayout}
  headerComponent={MyHeader}
  footerComponent={MyFooter}
  showHeaderOnLogin={false}
  showFooterOnLogin={false}
  headerExcludedRoutes={['/settings']}
  footerExcludedRoutes={[]}
/>
```

| Prop | Type | Description |
|------|------|-------------|
| `firstPrivateElement` | `ReactNode` | Component for the first private route |
| `globalLayout` | `ReactNode` | Custom layout wrapper component |
| `headerComponent` | `ReactNode` | Header component |
| `footerComponent` | `ReactNode` | Footer component |
| `showHeaderOnLogin` | `boolean` | Show header on the login page |
| `showFooterOnLogin` | `boolean` | Show footer on the login page |
| `headerExcludedRoutes` | `string[]` | Paths where the header is hidden |
| `footerExcludedRoutes` | `string[]` | Paths where the footer is hidden |
| `privateProvider` | `ReactNode` | Extra provider wrapping private routes |
| `customProvider` | `ReactNode` | Extra provider wrapping all routes |
| `promptComponent` | `ReactNode` | Navigation prompt component |

---

### Login

Pre-built login page. Automatically used by `PackageRoutes` at the `/` path.

---

### SmartLogin

PWA-ready login page with advanced features. Drop-in replacement for `Login` with full
customization, accessibility improvements, and better mobile support.

```jsx
import { SmartLogin } from 'thecore-auth';

<SmartLogin
  Logo={MyLogo}
  backgroundSrc="/images/bg.jpg"
  overlayOpacity={0.5}
  overlayColor="#f1f1f1"
  cardVariant="glass"
  cardPosition="center"
  logoPosition="left"
  showPasswordToggle={true}
  animateEntrance={true}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `Logo` | `ComponentType` | — | SVG logo component |
| `backgroundSrc` | `string` | `undefined` | Custom background image URL |
| `overlayOpacity` | `number` | `0.5` | Background overlay opacity (0.0–1.0) |
| `overlayColor` | `string` | `'#f1f1f1'` | Background overlay base color |
| `cardVariant` | `'solid' \| 'glass' \| 'minimal'` | `'solid'` | Card style variant |
| `cardPosition` | `'center' \| 'left' \| 'right'` | `'center'` | Horizontal card position |
| `logoPosition` | `'left' \| 'top'` | `'left'` | Logo position on desktop |
| `showPasswordToggle` | `boolean` | `true` | Show password visibility toggle |
| `animateEntrance` | `boolean` | `true` | Animate card on mount |

All `overrideStyle` values from `LoginFormProvider` continue to work with `SmartLogin`.

---

### LoginForm

Login form UI built on top of `LoginFormProvider`. Can be used standalone inside a custom layout.

```jsx
import { LoginForm } from 'thecore-auth';

<LoginForm />
```

---

### DefaultLayout

Layout wrapper that renders `Loading`, `Alert`, `Modal`, and an optional toast layer alongside the page content.

```jsx
import { DefaultLayout } from 'thecore-auth';

<DefaultLayout
  headerComponent={<MyHeader />}
  footerComponent={<MyFooter />}
  isMain={true}
/>
```

---

### Input / InputLabel

Basic form input and label components.

```jsx
import { Input, InputLabel } from 'thecore-auth';

<InputLabel label="Name" labelId="name" />
<Input
  inputId="name"
  inputType="text"
  inputValue={name}
  inputChange={(e) => setName(e.target.value)}
  inputPlaceholder="Enter your name"
/>
```

---

### InputDate / InputStartEndDate

Date picker and date range picker components.

```jsx
import { InputDate, InputStartEndDate } from 'thecore-auth';

// Single date
<InputDate
  id="date"
  name="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  title="Select date"
/>

// Date range
<InputStartEndDate
  startId="start"
  endId="end"
  startValue={startDate}
  endValue={endDate}
  onChange={handleChange}
  startTitle="From"
  endTitle="To"
/>
```

---

### FileDropzone

Drag-and-drop file upload area.

```jsx
import { FileDropzone } from 'thecore-auth';

<FileDropzone
  id="upload"
  onFilesSelect={(files) => console.log(files)}
/>
```

---

### SwitchRadio

A toggle switch (controlled or uncontrolled).

```jsx
import { SwitchRadio } from 'thecore-auth';

<SwitchRadio value={active} onChange={(val) => setActive(val)} />
```

---

### SingleSelect / MultiSelect

Dropdown select components.

```jsx
import { SingleSelect, MultiSelect } from 'thecore-auth';

// Single
<SingleSelect
  options={[{ label: 'Italy', value: 'IT' }, { label: 'France', value: 'FR' }]}
  value={selected}
  onChange={setSelected}
/>

// Multi
<MultiSelect
  label="Countries"
  items={countries}
  value={selectedCountries}
  displayKey="label"
  valueKey="value"
  idKey="id"
  updateFilter={setSelectedCountries}
/>
```

---

### Loading / LoadingComponent / Loader / LogoLoader

Loading state components.

```jsx
import { Loader } from 'thecore-auth';

<Loader
  Logo={MyLogo}
  spinnerColor="#3b82f6"
  containerSize="100vh"
/>
```

---

### Alert

Notification banner controlled by `AlertProvider`. Renders automatically when `activeAlert` is called.

---

### AuthPage / AuthAdmin

Route guards for authentication and admin roles.

```jsx
import { AuthPage, AuthAdmin } from 'thecore-auth';

// In your routes:
{ path: '/dashboard', element: <AuthPage><Dashboard /></AuthPage> }
{ path: '/admin', element: <AuthAdmin><AdminPanel /></AuthAdmin> }
```

---

## Hooks

### useStorage

State synchronized with `localStorage`.

```jsx
import { useStorage } from 'thecore-auth';

const [theme, setTheme, removeTheme] = useStorage('light', 'app-theme');
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `initialValue` | `any` | Default value if key is not in storage |
| `itemKey` | `string` | localStorage key |

Returns `[state, setState, remove]`.

---

### useAuthStorage

Manages `accessToken` and `user` in localStorage.

```jsx
import { useAuthStorage } from 'thecore-auth';

const { token, user, setToken, setUser, storageLogout } = useAuthStorage();
```

---

### useIndexedDB

Full CRUD operations on an IndexedDB object store.

```jsx
import { useIndexedDB } from 'thecore-auth';

const db = useIndexedDB('myDatabase', 'myStore');

await db.set({ id: 1, name: 'Item' });
const item = await db.get(1);
await db.remove(1);
```

| Method | Description |
|--------|-------------|
| `get(key)` | Read a record by key |
| `getAll()` | Read all records |
| `set(data)` | Write a record |
| `setWithAutoId(data)` | Write with auto-generated ID |
| `remove(id)` | Delete a record by ID |
| `clear()` | Delete all records |
| `isReady` | `boolean` — DB is ready to use |

---

### useForm

Form state management with file upload support.

```jsx
import { useForm } from 'thecore-auth';

const { values, handleChange, files, addFiles, resetForm } = useForm({
  name: '',
  email: ''
});

<input
  value={values.name}
  onChange={(e) => handleChange('name', e.target.value)}
/>
```

| Returned value | Type | Description |
|----------------|------|-------------|
| `values` | `object` | Current form values |
| `handleChange(field, value)` | `function` | Update a field value |
| `files` | `object` | File inputs by field name |
| `previews` | `object` | Preview URLs for image files |
| `addFiles(field, fileList)` | `function` | Append files to a field |
| `replaceFiles(field, fileList)` | `function` | Replace files in a field |
| `removeFile(field, index)` | `function` | Remove a file by index |
| `setValues` | `function` | Override the entire form state |
| `resetForm()` | `function` | Reset to initial values |

---

### useDevice

Detect the user's device type, OS, and browser.

```jsx
import { useDevice } from 'thecore-auth';

const { isMobile, isDesktop, os, browser } = useDevice();
```

| Returned value | Type | Description |
|----------------|------|-------------|
| `type` | `string` | `'mobile'`, `'tablet'`, or `'desktop'` |
| `os` | `string` | Operating system name |
| `browser` | `string` | Browser name |
| `vendor` | `string` | Device manufacturer |
| `model` | `string` | Device model |
| `isMobile` | `boolean` | — |
| `isTablet` | `boolean` | — |
| `isDesktop` | `boolean` | — |
| `isIPhone` | `boolean` | — |
| `isIPad` | `boolean` | — |
| `isAndroid` | `boolean` | — |

---

### useOrientation

Detect portrait or landscape orientation.

```jsx
import { useOrientation } from 'thecore-auth';

const orientation = useOrientation(); // 'portrait' | 'landscape'
```

---

### useViewportHeight

Reads the actual viewport height and exposes it as a CSS variable `--vh`.

```jsx
import { useViewportHeight } from 'thecore-auth';

const { height, vh } = useViewportHeight({ getValues: true });
```

---

### useSafeArea

Adds the `with-safe-area` class to `<body>` when on devices with a notch or safe area insets (iPhone X+, etc.).

```jsx
import { useSafeArea } from 'thecore-auth';

useSafeArea(['/login']); // exclude these paths
```

---

### useClickOutside

Fire a callback when the user clicks outside a referenced element.

```jsx
import { useClickOutside } from 'thecore-auth';
import { useRef } from 'react';

const ref = useRef();
useClickOutside(ref, () => setOpen(false));

<div ref={ref}>...</div>
```

---

### UsePageTitle

Update `document.title` automatically based on the current route.

```jsx
import { UsePageTitle } from 'thecore-auth';

// Inside your layout component:
UsePageTitle(routes, 'My App');
```

---

### useToast

Mobile-optimized toast notifications via the Sileo library.

```jsx
import { useToast } from 'thecore-auth';

const toast = useToast();

toast.success('Saved!', 'Your changes have been saved.');
toast.error('Error', 'Something went wrong.');
toast.info('Notice', 'Please review the form.');
toast.warning('Warning', 'This action cannot be undone.');

// Promise toast
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: 'Done!',
  error: 'Failed'
});
```

---

### useCalendar

Calendar utilities with public holiday detection.

```jsx
import { useCalendar } from 'thecore-auth';

const { isTodayHoliday, isHoliday, getDaysInMonth } = useCalendar(2025, 'IT');

const isHol = isTodayHoliday();
const days = getDaysInMonth(0, 2025); // January 2025
```

| Returned value | Description |
|----------------|-------------|
| `holidays` | Array of holiday objects |
| `holidayMap` | Map for O(1) holiday lookup |
| `isTodayHoliday()` | `true` if today is a holiday |
| `isHoliday(date)` | `true` if the given date is a holiday |
| `getWeekDays(date)` | 7-day week starting from Monday |
| `getWeeksInMonth(month, year)` | Weeks in the given month |
| `getDaysInMonth(month, year)` | All days in the given month |
| `getDaysInMonths(start, year, n)` | Days across `n` months from `start` |
| `getDaysInYear(year)` | All days in the given year |

---

## Utility Functions

### Date Utilities

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
setTime(new Date(), 9, 0, 0);            // Date at 09:00:00
subtractDays(new Date(), 7);              // 7 days ago
parseUtcToLocal('2025-01-15T12:00:00Z'); // Local Date object
```

---

## React Router Re-exports

You do not need to install `react-router-dom` separately. Import everything from `thecore-auth`:

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

## CSS Customization

Override the package's design tokens in your own CSS file:

```css
:root {
  /* Brand colors */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-text: #ffffff;

  /* Alert colors */
  --color-danger: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;

  /* Login form sizing */
  --height-card-form: auto;
  --width-card-form: 400px;
  --max-width-card-form: 90vw;
  --padding-input: 0.75rem 1rem;
  --input-radius: 0.5rem;

  /* Buttons */
  --padding-primary-button: 0.75rem 1.5rem;
  --radius-primary-button: 0.5rem;
}
```

---

## Complete React App Example

Below is a minimal but complete example of a React application using `thecore-auth`.

### File structure

```
my-app/
├── public/
│   └── config.json
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Profile.jsx
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
  "baseUri": "https://api.example.com",
  "authenticatedEndpoint": "/auth/login",
  "usersEndpoint": "/auth/me",
  "heartbeatEndpoint": "/auth/refresh",
  "firstPrivatePath": "/dashboard",
  "firstPrivateTitle": "Dashboard",
  "infiniteSession": false,
  "timeDeducted": 60000,
  "alertTimeout": 4000,
  "axiosTimeout": 10000,
  "axiosErrors": {
    "unauthorized": "Your session has expired.",
    "notFound": "Page not found.",
    "defaultMessage": "An error occurred."
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "",
  "isDebug": false,
  "sileoToastEnabled": false,
  "hasSessionKey": false,
  "appKey": "myapp",
  "isDevelopment": false,
  "defaultTitle": "My App",
  "routes": [
    { "path": "/dashboard", "title": "Dashboard" },
    { "path": "/profile", "title": "Profile" }
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
import { BrowserRouter } from 'thecore-auth';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
```

### `src/App.jsx`

```jsx
import {
  PackageRoutes,
  ConfigProvider,
  AuthProvider,
  LoadingProvider,
  AlertProvider,
  LoginFormProvider,
  ModalProvider,
  RouteProvider
} from 'thecore-auth';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Header from './components/Header';

const privateRoutes = [
  { path: '/profile', element: <Profile /> }
];

export default function App() {
  return (
    <ConfigProvider>
      <LoadingProvider>
        <AlertProvider>
          <AuthProvider>
            <LoginFormProvider
              title="Welcome back"
              label="Email address"
              buttonText="Sign in"
            >
              <ModalProvider>
                <RouteProvider privateRoutes={privateRoutes} publicRoutes={[]}>
                  <PackageRoutes
                    firstPrivateElement={<Dashboard />}
                    headerComponent={<Header />}
                    showHeaderOnLogin={false}
                  />
                </RouteProvider>
              </ModalProvider>
            </LoginFormProvider>
          </AuthProvider>
        </AlertProvider>
      </LoadingProvider>
    </ConfigProvider>
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
      <Link to="/dashboard">My App</Link>
      {isAuthenticated && (
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
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

  const handleAction = async () => {
    setIsLoading(true);
    try {
      // simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      activeAlert('success', 'Action completed successfully!');
    } catch {
      activeAlert('danger', 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>API: {config.baseUri}</p>
      <button onClick={handleAction}>Run action</button>
    </main>
  );
}
```

### `src/pages/Profile.jsx`

```jsx
import { useForm, useAlert, useAuth } from 'thecore-auth';

export default function Profile() {
  const { values, handleChange, resetForm } = useForm({ name: '', bio: '' });
  const { activeAlert } = useAlert();
  const { createAxiosInstances } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const axios = createAxiosInstances();
    try {
      await axios.put('/profile', values);
      activeAlert('success', 'Profile updated!');
    } catch {
      activeAlert('danger', 'Failed to update profile.');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            value={values.name}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            value={values.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={resetForm}>Reset</button>
      </form>
    </main>
  );
}
```

---

## CSS Variables

All visual aspects of the package are controlled through CSS custom properties.
Override them in your own `:root {}` block after importing the package CSS.

| Language | Link |
|----------|------|
| 🇬🇧 English | [docs/css-variables.md](./docs/css-variables.md) |
| 🇮🇹 Italiano | [docs/it/css-variables.md](./docs/it/css-variables.md) |
| 🇪🇸 Español | [docs/es/css-variables.md](./docs/es/css-variables.md) |

Quick reference — most commonly overridden:

```css
:root {
  --color-primary: #6366f1;        /* brand color */
  --color-primary-hover: #4f46e5;  /* brand color on hover */
  --color-primary-text: #ffffff;   /* text on brand-colored elements */
  --height-card-form: 65vh;        /* login card height */
  --form-radius: 1.5rem;           /* login card border radius */
  --input-radius: 0.5rem;          /* input border radius */
  --color-spinner: #6366f1;        /* loading spinner color */
}
```

---

## Modal System

Full API reference, style override guide, and usage examples for the centralized modal system (`useModal`, `openModal`, `closeModal`).

| Language | Link |
|----------|------|
| 🇬🇧 English | [docs/modal.md](./docs/modal.md) |
| 🇮🇹 Italiano | [docs/it/modal.md](./docs/it/modal.md) |
| 🇪🇸 Español | [docs/es/modal.md](./docs/es/modal.md) |

---

## Repository

- GitHub: [https://github.com/SantiGalvan/thecore-auth](https://github.com/SantiGalvan/thecore-auth)
- npm: `npm install thecore-auth`
