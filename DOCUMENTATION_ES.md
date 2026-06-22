# thecore-auth — Documentación (Español)

> 🇬🇧 [Documentation in English](./README.md) | 🇮🇹 [Documentazione in Italiano](./DOCUMENTATION_IT.md)

> Versión: 0.0.214 | Licencia: MIT | Autor: Santiago Galvan

---

## ¿Qué es thecore-auth?

**thecore-auth** es una librería React que proporciona un sistema de autenticación completo basado en **JWT (JSON Web Tokens)**, integrado con **React Router** y construido siguiendo el patrón arquitectónico **thecore**.

Incluye listo para usar:
- Login / logout con JWT y refresco automático del token
- Context providers para autenticación, loading, alertas, modales, formularios y routing
- Componentes UI (formulario de login, modal, inputs, loaders, alertas)
- Hooks de utilidad para detección de dispositivo, gestión de formularios, calendario, IndexedDB y más
- Re-exports de las APIs más comunes de React Router, para importar todo desde un único lugar

---

## Instalación

### 1. Crear un nuevo proyecto React con Vite

```bash
npm create vite@latest my-app -- --template react
cd my-app
npm install
```

### 2. Instalar thecore-auth

```bash
npm install thecore-auth
```

### 3. Importar el CSS

En tu archivo CSS principal (p. ej. `src/index.css`) añade:

```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');
```

O directamente en `src/main.jsx`:

```jsx
import 'thecore-auth/dist/thecore-auth.css';
```

---

## Configuración requerida

Crea el archivo `public/config.json` en tu proyecto. Este archivo se carga en tiempo de ejecución y controla todo el sistema de autenticación:

```json
{
  "baseUri": "https://api.mi-app.com",
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
    "unauthorized": "Sesión expirada. Por favor, inicia sesión de nuevo.",
    "notFound": "Recurso no encontrado.",
    "defaultMessage": "Se produjo un error inesperado."
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "",
  "isDebug": false,
  "sileoToastEnabled": false,
  "hasSessionKey": false,
  "appKey": "mi-app",
  "isDevelopment": false,
  "defaultTitle": "Mi App",
  "routes": [
    { "path": "/dashboard", "title": "Dashboard" },
    { "path": "/perfil", "title": "Perfil" }
  ],
  "configRoutes": []
}
```

| Clave | Tipo | Descripción |
|-------|------|-------------|
| `baseUri` | `string` | URL base de la API backend |
| `authenticatedEndpoint` | `string` | Ruta del endpoint de login |
| `usersEndpoint` | `string` | Endpoint para obtener el usuario autenticado |
| `heartbeatEndpoint` | `string` | Endpoint para refrescar el token JWT |
| `firstPrivatePath` | `string` | Ruta de redirección tras el login exitoso |
| `firstPrivateTitle` | `string` | Título de la primera página privada |
| `infiniteSession` | `boolean` | Si es `true`, la sesión nunca expira |
| `timeDeducted` | `number` | Milisegundos a restar a la expiración del token para el refresco anticipado |
| `alertTimeout` | `number` | Duración (ms) de las notificaciones de alerta |
| `axiosTimeout` | `number` | Timeout de las peticiones HTTP en milisegundos |
| `axiosErrors` | `object` | Mensajes de error personalizados para 401, 404 y errores genéricos |
| `clearLoginFormOnError` | `boolean` | Limpia los campos del formulario de login cuando ocurre un error |
| `autoLogin` | `boolean` | Habilita el auto-login machine-to-machine |
| `backendToken` | `string` | Token usado para el auto-login |
| `isDebug` | `boolean` | Habilita el logging de debug en consola |
| `sileoToastEnabled` | `boolean` | Habilita las notificaciones toast Sileo para móvil |
| `sileoToastConfig` | `object` | Opciones Sileo toast: `position`, `options.fill`, `options.duration`, `options.styles` |
| `hasSessionKey` | `boolean` | Genera una clave de sesión única por pestaña del navegador |
| `appKey` | `string` | Prefijo de la app para la clave de sesión |
| `isDevelopment` | `boolean` | Flag de modo de desarrollo |
| `defaultTitle` | `string` | Título predeterminado de la pestaña del navegador |
| `routes` | `array` | Array de `{ path, title }` para la actualización automática del título |
| `configRoutes` | `array` | Rutas adicionales inyectadas por el paquete |
| `tokenLog` | `boolean` | Registra los detalles del token JWT en consola (debug) |
| `showHeaderButton` | `boolean` | Muestra un botón de logout en el header predeterminado |
| `useCustomLoginTimeout` | `boolean` | Habilita un timeout personalizado para la petición de login |
| `customLoginTimeout` | `number` | Timeout (ms) para el login cuando `useCustomLoginTimeout` es `true` |
| `stopLoaderOnFinish` | `boolean` | Detiene el loader global al terminar la animación de SmartLogin |
| `timerInfiniteSession` | `string` | Cadena tipo cron para la planificación del heartbeat en sesión infinita |
| `customDeviceType` | `string` | Sobreescribe el tipo de dispositivo detectado (`'mobile'`, `'tablet'`, `'desktop'`) |
| `pwa` | `object` | Config del prompt de instalación PWA: `enabled`, `promptOnLoad`, `customPrompt` |

---

## Inicio rápido — Configuración completa

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

// Tus páginas privadas
import Dashboard from './pages/Dashboard';

// Define tus rutas privadas
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

## Context Providers y Hooks

### ConfigProvider / useConfig

Carga y expone la configuración runtime de `config.json`. También proporciona utilidades para IndexedDB y el helper de fecha actual.

```jsx
import { useConfig } from 'thecore-auth';

function MiComponente() {
  const { config, version, setCurrentDate, getDataIndexedDB } = useConfig();

  return <p>API base: {config.baseUri}</p>;
}
```

**Valores devueltos:**

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `config` | `object` | Todos los valores de `config.json` |
| `version` | `string` | Versión del paquete |
| `setCurrentDate()` | `function` | Devuelve la fecha actual como `dd/mm/yyyy hh:mm:ss` |
| `openIndexedDB(db, store)` | `function` | Abre una conexión IndexedDB |
| `getDataIndexedDB(db, store, key)` | `function` | Lee un valor de IndexedDB |
| `setDataIndexedDB(db, store, data)` | `function` | Escribe un valor en IndexedDB |
| `generateUniqueId(db, store)` | `function` | Genera un ID numérico único |
| `setDataWithAutoId(db, store, data)` | `function` | Guarda datos con un ID auto-generado |
| `activity` | `object` | Información de actividad del usuario (visibilidad, foco) |
| `sessionKey` | `string \| undefined` | Clave de sesión única (si `hasSessionKey: true`) |

---

### AuthProvider / useAuth

Gestiona el estado de autenticación JWT, el refresco del token y las operaciones de login/logout.

```jsx
import { useAuth } from 'thecore-auth';

function Header() {
  const { isAuthenticated, logout } = useAuth();

  return isAuthenticated
    ? <button onClick={logout}>Cerrar sesión</button>
    : <p>No autenticado</p>;
}
```

**Valores devueltos:**

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `isAuthenticated` | `boolean \| null` | Estado de autenticación (`null` = cargando) |
| `login(e?, formData)` | `function` | Envía las credenciales de login |
| `logout()` | `function` | Limpia la sesión y redirige al login |
| `createAxiosInstances(...)` | `function` | Crea una instancia axios con token Bearer |
| `fetchHeartbeat()` | `function` | Refresca manualmente el token JWT |
| `getTokenExpiry(token?)` | `function` | Obtiene los ms restantes antes de que expire el token |
| `checkTokenValidity(token)` | `function` | Devuelve `true` si el token sigue siendo válido |
| `timeoutToken` | `number` | Ms hasta el próximo refresco del token |
| `sessionTimeout` | `number` | Ms hasta que expire la sesión |

---

### LoadingProvider / useLoading

Spinner de carga global visible sobre toda la aplicación.

```jsx
import { useLoading } from 'thecore-auth';

function BotonGuardar() {
  const { setIsLoading } = useLoading();

  const handleSave = async () => {
    setIsLoading(true);
    await guardarDatos();
    setIsLoading(false);
  };

  return <button onClick={handleSave}>Guardar</button>;
}
```

**Valores devueltos:**

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `isLoading` | `boolean` | Estado actual de carga |
| `setIsLoading(bool)` | `function` | Muestra u oculta el spinner |
| `showLoadingFor(ms?, props?)` | `function` | Muestra el spinner durante una duración fija |
| `loadingProps` | `object` | Props pasadas al componente `Loading` |

---

### AlertProvider / useAlert

Muestra notificaciones in-app de tipo `danger`, `info`, `success` o `warning`.

```jsx
import { useAlert } from 'thecore-auth';

function FormularioEnvio() {
  const { activeAlert } = useAlert();

  const handleSubmit = async () => {
    try {
      await enviarDatos();
      activeAlert('success', '¡Datos guardados correctamente!');
    } catch {
      activeAlert('danger', 'Algo salió mal.');
    }
  };

  return <button onClick={handleSubmit}>Enviar</button>;
}
```

**Valores devueltos:**

| Nombre | Tipo | Descripción |
|--------|------|-------------|
| `showAlert` | `boolean` | Indica si la alerta está visible |
| `typeAlert` | `string` | Tipo de alerta (`danger`, `info`, `success`, `warning`) |
| `messageAlert` | `string` | Texto del mensaje de alerta |
| `activeAlert(type, message)` | `function` | Muestra una alerta |
| `closeAlert()` | `function` | Cierra la alerta actual |

---

### ModalProvider / useModal

Sistema de modales centralizado con soporte para los tipos `submit`, `delete` y `custom`.

```jsx
import { useModal } from 'thecore-auth';

function ListaUsuarios() {
  const { openModal, closeModal } = useModal();

  const handleEliminar = (usuario) => {
    openModal({
      type: 'delete',
      title: 'Eliminar usuario',
      item: usuario,
      onConfirm: async () => {
        await eliminarUsuario(usuario.id);
        closeModal();
      }
    });
  };

  return <button onClick={() => handleEliminar(usuario)}>Eliminar</button>;
}
```

**Opciones de `openModal`:**

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `type` | `'submit' \| 'delete' \| 'custom'` | Tipo de comportamiento del modal |
| `title` | `string` | Título de la cabecera del modal |
| `component` | `ReactNode` | Contenido a renderizar dentro del modal |
| `modalData` | `object` | Datos iniciales del formulario |
| `onConfirm` | `function` | Callback de confirmación |
| `onCancel` | `function` | Callback de cancelación |
| `formId` | `string` | ID del formulario dentro del modal |
| `item` | `any` | Entidad sobre la que actúa el modal |
| `style` | `object` | Estilos personalizados |

---

### LoginFormProvider / useLoginForm

Gestiona el estado y las opciones de personalización del formulario de login.

```jsx
import { LoginFormProvider } from 'thecore-auth';

<LoginFormProvider
  title="Iniciar sesión"
  label="Dirección de email"
  buttonText="Entrar"
  LogoImg={MiLogo}
>
  {/* children */}
</LoginFormProvider>
```

**Props del provider:**

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string` | `'Accedi'` | Título de la tarjeta del formulario |
| `label` | `string` | `'Email'` | Etiqueta del campo email |
| `type` | `string` | `'email'` | Tipo de input del campo email |
| `placeholder` | `string` | — | Placeholder del campo email |
| `buttonText` | `string` | `'Accedi'` | Texto del botón de envío |
| `LogoImg` | `ReactNode` | — | Componente de logo |
| `styleCardForm` | `object` | — | Estilos del contenedor de la tarjeta |
| `styleLogo` | `object` | — | Estilos del logo |
| `overrideStyle` | `object` | — | Objeto de override CSS |
| `customVersion` | `string` | — | Cadena de versión personalizada |

---

### RouteProvider / useRoutesInjection

Registra las rutas públicas y privadas para ser renderizadas por `PackageRoutes`.

```jsx
import { RouteProvider } from 'thecore-auth';

const privateRoutes = [
  { path: '/perfil', element: <PaginaPerfil /> },
  { path: '/configuracion', element: <PaginaConfiguracion /> }
];

const publicRoutes = [
  { path: '/acerca-de', element: <PaginaAcercaDe /> }
];

<RouteProvider privateRoutes={privateRoutes} publicRoutes={publicRoutes}>
  <PackageRoutes firstPrivateElement={<Dashboard />} />
</RouteProvider>
```

---

## Componentes

### PackageRoutes

El componente de routing principal. Renderiza las rutas públicas, la página de login y envuelve las rutas privadas con guards de autenticación.

```jsx
<PackageRoutes
  firstPrivateElement={<Dashboard />}
  globalLayout={MiLayout}
  headerComponent={MiHeader}
  footerComponent={MiFooter}
  showHeaderOnLogin={false}
  showFooterOnLogin={false}
  headerExcludedRoutes={['/configuracion']}
  footerExcludedRoutes={[]}
/>
```

| Prop | Tipo | Descripción |
|------|------|-------------|
| `firstPrivateElement` | `ReactNode` | Componente para la primera ruta privada |
| `globalLayout` | `ReactNode` | Componente wrapper de layout personalizado |
| `headerComponent` | `ReactNode` | Componente header |
| `footerComponent` | `ReactNode` | Componente footer |
| `showHeaderOnLogin` | `boolean` | Muestra el header en la página de login |
| `showFooterOnLogin` | `boolean` | Muestra el footer en la página de login |
| `headerExcludedRoutes` | `string[]` | Rutas donde el header está oculto |
| `footerExcludedRoutes` | `string[]` | Rutas donde el footer está oculto |
| `privateProvider` | `ReactNode` | Provider adicional que envuelve las rutas privadas |
| `customProvider` | `ReactNode` | Provider adicional que envuelve todas las rutas |
| `promptComponent` | `ReactNode` | Componente de prompt de navegación |

---

### Login

Página de login pre-construida. Usada automáticamente por `PackageRoutes` en la ruta `/`.

---

### SmartLogin

Página de login PWA-ready con funcionalidades avanzadas. Reemplazo directo de `Login` con
personalización completa, mejoras de accesibilidad y mejor soporte móvil.

```jsx
import { SmartLogin } from 'thecore-auth';

<SmartLogin
  Logo={MiLogo}
  backgroundSrc="/images/fondo.jpg"
  overlayOpacity={0.5}
  overlayColor="#f1f1f1"
  cardVariant="glass"
  cardPosition="center"
  logoPosition="left"
  showPasswordToggle={true}
  animateEntrance={true}
/>
```

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `Logo` | `ComponentType` | — | Componente SVG de logo |
| `backgroundSrc` | `string` | `undefined` | URL de imagen de fondo personalizada |
| `overlayOpacity` | `number` | `0.5` | Opacidad del overlay de fondo (0.0–1.0) |
| `overlayColor` | `string` | `'#f1f1f1'` | Color base del overlay de fondo |
| `cardVariant` | `'solid' \| 'glass' \| 'minimal'` | `'solid'` | Variante de estilo de la tarjeta |
| `cardPosition` | `'center' \| 'left' \| 'right'` | `'center'` | Posición horizontal de la tarjeta |
| `logoPosition` | `'left' \| 'top'` | `'left'` | Posición del logo en escritorio |
| `showPasswordToggle` | `boolean` | `true` | Muestra el toggle de visibilidad de contraseña |
| `animateEntrance` | `boolean` | `true` | Anima la tarjeta al montar |

Todos los valores `overrideStyle` de `LoginFormProvider` siguen funcionando con `SmartLogin`.

---

### LoginForm

Interfaz del formulario de login basada en `LoginFormProvider`. Puede usarse de forma independiente dentro de un layout personalizado.

```jsx
import { LoginForm } from 'thecore-auth';

<LoginForm />
```

---

### DefaultLayout

Wrapper de layout que renderiza `Loading`, `Alert`, `Modal` y una capa opcional de toasts junto al contenido de la página.

```jsx
import { DefaultLayout } from 'thecore-auth';

<DefaultLayout
  headerComponent={<MiHeader />}
  footerComponent={<MiFooter />}
  isMain={true}
/>
```

---

---

### Input / InputLabel

Componentes básicos de input y label para formularios.

```jsx
import { Input, InputLabel } from 'thecore-auth';

<InputLabel label="Nombre" labelId="nombre" />
<Input
  inputId="nombre"
  inputType="text"
  inputValue={nombre}
  inputChange={(e) => setNombre(e.target.value)}
  inputPlaceholder="Introduce tu nombre"
/>
```

---

### InputDate / InputStartEndDate

Componentes de selector de fecha y selector de rango de fechas.

```jsx
import { InputDate, InputStartEndDate } from 'thecore-auth';

// Fecha única
<InputDate
  id="fecha"
  name="fecha"
  value={fecha}
  onChange={(e) => setFecha(e.target.value)}
  title="Seleccionar fecha"
/>

// Rango de fechas
<InputStartEndDate
  startId="inicio"
  endId="fin"
  startValue={fechaInicio}
  endValue={fechaFin}
  onChange={handleChange}
  startTitle="Desde"
  endTitle="Hasta"
/>
```

---

### FileDropzone

Área de carga de archivos con arrastrar y soltar.

```jsx
import { FileDropzone } from 'thecore-auth';

<FileDropzone
  id="upload"
  onFilesSelect={(files) => console.log(files)}
/>
```

---

### SwitchRadio

Toggle switch (controlado o no controlado).

```jsx
import { SwitchRadio } from 'thecore-auth';

<SwitchRadio value={activo} onChange={(val) => setActivo(val)} />
```

---

### SingleSelect / MultiSelect

Componentes de selección desplegable.

```jsx
import { SingleSelect, MultiSelect } from 'thecore-auth';

// Selección única
<SingleSelect
  options={[{ label: 'España', value: 'ES' }, { label: 'Francia', value: 'FR' }]}
  value={seleccionado}
  onChange={setSeleccionado}
/>

// Selección múltiple
<MultiSelect
  label="Países"
  items={paises}
  value={paisesSeleccionados}
  displayKey="label"
  valueKey="value"
  idKey="id"
  updateFilter={setPaisesSeleccionados}
/>
```

---

### Loading / LoadingComponent / Loader / LogoLoader

Componentes para estados de carga.

```jsx
import { Loader } from 'thecore-auth';

<Loader
  Logo={MiLogo}
  spinnerColor="#3b82f6"
  containerSize="100vh"
/>
```

---

### Alert

Banner de notificación controlado por `AlertProvider`. Se renderiza automáticamente cuando se llama a `activeAlert`.

---

### AuthPage / AuthAdmin

Guards de ruta para autenticación y roles de administrador.

```jsx
import { AuthPage, AuthAdmin } from 'thecore-auth';

// En tus rutas:
{ path: '/dashboard', element: <AuthPage><Dashboard /></AuthPage> }
{ path: '/admin', element: <AuthAdmin><PanelAdmin /></AuthAdmin> }
```

---

## Hooks

### useStorage

Estado sincronizado con `localStorage`.

```jsx
import { useStorage } from 'thecore-auth';

const [tema, setTema, eliminarTema] = useStorage('light', 'app-tema');
```

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `initialValue` | `any` | Valor por defecto si la clave no existe en el storage |
| `itemKey` | `string` | Clave de localStorage |

Devuelve `[state, setState, remove]`.

---

### useAuthStorage

Gestiona `accessToken` y `user` en localStorage.

```jsx
import { useAuthStorage } from 'thecore-auth';

const { token, user, setToken, setUser, storageLogout } = useAuthStorage();
```

---

### useIndexedDB

Operaciones CRUD completas sobre un object store de IndexedDB.

```jsx
import { useIndexedDB } from 'thecore-auth';

const db = useIndexedDB('miBaseDeDatos', 'miStore');

await db.set({ id: 1, nombre: 'Elemento' });
const elemento = await db.get(1);
await db.remove(1);
```

| Método | Descripción |
|--------|-------------|
| `get(key)` | Lee un registro por clave |
| `getAll()` | Lee todos los registros |
| `set(data)` | Escribe un registro |
| `setWithAutoId(data)` | Escribe con ID auto-generado |
| `remove(id)` | Elimina un registro por ID |
| `clear()` | Elimina todos los registros |
| `isReady` | `boolean` — el DB está listo para usar |

---

### useForm

Gestión del estado del formulario con soporte de carga de archivos.

```jsx
import { useForm } from 'thecore-auth';

const { values, handleChange, files, addFiles, resetForm } = useForm({
  nombre: '',
  email: ''
});

<input
  value={values.nombre}
  onChange={(e) => handleChange('nombre', e.target.value)}
/>
```

| Valor devuelto | Tipo | Descripción |
|----------------|------|-------------|
| `values` | `object` | Valores actuales del formulario |
| `handleChange(field, value)` | `function` | Actualiza el valor de un campo |
| `files` | `object` | Inputs de archivo por nombre de campo |
| `previews` | `object` | URLs de previsualización para archivos de imagen |
| `addFiles(field, fileList)` | `function` | Añade archivos a un campo |
| `replaceFiles(field, fileList)` | `function` | Reemplaza los archivos de un campo |
| `removeFile(field, index)` | `function` | Elimina un archivo por índice |
| `setValues` | `function` | Sobreescribe todo el estado del formulario |
| `resetForm()` | `function` | Restablece los valores iniciales |

---

### useDevice

Detecta el tipo de dispositivo, sistema operativo y navegador del usuario.

```jsx
import { useDevice } from 'thecore-auth';

const { isMobile, isDesktop, os, browser } = useDevice();
```

| Valor devuelto | Tipo | Descripción |
|----------------|------|-------------|
| `type` | `string` | `'mobile'`, `'tablet'` o `'desktop'` |
| `os` | `string` | Nombre del sistema operativo |
| `browser` | `string` | Nombre del navegador |
| `vendor` | `string` | Fabricante del dispositivo |
| `model` | `string` | Modelo del dispositivo |
| `isMobile` | `boolean` | — |
| `isTablet` | `boolean` | — |
| `isDesktop` | `boolean` | — |
| `isIPhone` | `boolean` | — |
| `isIPad` | `boolean` | — |
| `isAndroid` | `boolean` | — |

---

### useOrientation

Detecta la orientación portrait o landscape.

```jsx
import { useOrientation } from 'thecore-auth';

const orientacion = useOrientation(); // 'portrait' | 'landscape'
```

---

### useViewportHeight

Lee la altura real del viewport y la expone como variable CSS `--vh`.

```jsx
import { useViewportHeight } from 'thecore-auth';

const { height, vh } = useViewportHeight({ getValues: true });
```

---

### useSafeArea

Añade la clase `with-safe-area` al `<body>` en dispositivos con notch o safe area (iPhone X+, etc.).

```jsx
import { useSafeArea } from 'thecore-auth';

useSafeArea(['/login']); // excluye estas rutas
```

---

### useClickOutside

Ejecuta un callback cuando el usuario hace clic fuera de un elemento referenciado.

```jsx
import { useClickOutside } from 'thecore-auth';
import { useRef } from 'react';

const ref = useRef();
useClickOutside(ref, () => setAbierto(false));

<div ref={ref}>...</div>
```

---

### UsePageTitle

Actualiza `document.title` automáticamente en función de la ruta actual.

```jsx
import { UsePageTitle } from 'thecore-auth';

// Dentro de tu componente de layout:
UsePageTitle(rutas, 'Mi App');
```

---

### useToast

Notificaciones toast optimizadas para móvil a través de la librería Sileo.

```jsx
import { useToast } from 'thecore-auth';

const toast = useToast();

toast.success('¡Guardado!', 'Tus cambios han sido guardados.');
toast.error('Error', 'Algo salió mal.');
toast.info('Aviso', 'Por favor revisa el formulario.');
toast.warning('Advertencia', 'Esta acción no se puede deshacer.');

// Toast con promesa
toast.promise(fetchData(), {
  loading: 'Cargando...',
  success: '¡Listo!',
  error: 'Fallido'
});
```

---

### useCalendar

Utilidades de calendario con detección de días festivos.

```jsx
import { useCalendar } from 'thecore-auth';

const { isTodayHoliday, isHoliday, getDaysInMonth } = useCalendar(2025, 'IT');

const esFestivo = isTodayHoliday();
const dias = getDaysInMonth(0, 2025); // Enero 2025
```

| Valor devuelto | Descripción |
|----------------|-------------|
| `holidays` | Array de objetos de festivos |
| `holidayMap` | Map para búsqueda O(1) de festivos |
| `isTodayHoliday()` | `true` si hoy es festivo |
| `isHoliday(date)` | `true` si la fecha dada es festiva |
| `getWeekDays(date)` | 7 días de la semana empezando por el lunes |
| `getWeeksInMonth(month, year)` | Semanas en el mes indicado |
| `getDaysInMonth(month, year)` | Todos los días del mes indicado |
| `getDaysInMonths(start, year, n)` | Días a lo largo de `n` meses desde `start` |
| `getDaysInYear(year)` | Todos los días del año indicado |

---

## Funciones de utilidad

### Utilidades de fecha

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
setTime(new Date(), 9, 0, 0);            // Date a las 09:00:00
subtractDays(new Date(), 7);              // Hace 7 días
parseUtcToLocal('2025-01-15T12:00:00Z'); // Objeto Date en hora local
```

---

## Re-exports de React Router

No es necesario instalar `react-router-dom` por separado. Importa todo desde `thecore-auth`:

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

## Personalización CSS

Sobreescribe los design tokens del paquete en tu propio archivo CSS:

```css
:root {
  /* Colores de marca */
  --color-primary: #3b82f6;
  --color-primary-hover: #2563eb;
  --color-primary-text: #ffffff;

  /* Colores de alerta */
  --color-danger: #ef4444;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;

  /* Dimensiones del formulario de login */
  --height-card-form: auto;
  --width-card-form: 400px;
  --max-width-card-form: 90vw;
  --padding-input: 0.75rem 1rem;
  --input-radius: 0.5rem;

  /* Botones */
  --padding-primary-button: 0.75rem 1.5rem;
  --radius-primary-button: 0.5rem;
}
```

---

## Ejemplo completo de app React

A continuación se muestra un ejemplo mínimo pero completo de una aplicación React usando `thecore-auth`.

### Estructura de archivos

```
my-app/
├── public/
│   └── config.json
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Perfil.jsx
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
  "baseUri": "https://api.ejemplo.com",
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
    "unauthorized": "Tu sesión ha expirado.",
    "notFound": "Página no encontrada.",
    "defaultMessage": "Se produjo un error."
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "",
  "isDebug": false,
  "sileoToastEnabled": false,
  "hasSessionKey": false,
  "appKey": "mi-app",
  "isDevelopment": false,
  "defaultTitle": "Mi App",
  "routes": [
    { "path": "/dashboard", "title": "Dashboard" },
    { "path": "/perfil", "title": "Perfil" }
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
import Perfil from './pages/Perfil';
import Header from './components/Header';

const privateRoutes = [
  { path: '/perfil', element: <Perfil /> }
];

export default function App() {
  return (
    <ConfigProvider>
      <LoadingProvider>
        <AlertProvider>
          <AuthProvider>
            <LoginFormProvider
              title="Bienvenido de nuevo"
              label="Dirección de email"
              buttonText="Iniciar sesión"
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
      <Link to="/dashboard">Mi App</Link>
      {isAuthenticated && (
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/perfil">Perfil</Link>
          <button onClick={handleLogout}>Cerrar sesión</button>
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

  const handleAccion = async () => {
    setIsLoading(true);
    try {
      // simulación de llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500));
      activeAlert('success', '¡Acción completada con éxito!');
    } catch {
      activeAlert('danger', 'Algo salió mal.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) return null;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>API: {config.baseUri}</p>
      <button onClick={handleAccion}>Ejecutar acción</button>
    </main>
  );
}
```

### `src/pages/Perfil.jsx`

```jsx
import { useForm, useAlert, useAuth } from 'thecore-auth';

export default function Perfil() {
  const { values, handleChange, resetForm } = useForm({ nombre: '', bio: '' });
  const { activeAlert } = useAlert();
  const { createAxiosInstances } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const axios = createAxiosInstances();
    try {
      await axios.put('/perfil', values);
      activeAlert('success', '¡Perfil actualizado!');
    } catch {
      activeAlert('danger', 'Error al actualizar el perfil.');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Perfil</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input
            value={values.nombre}
            onChange={(e) => handleChange('nombre', e.target.value)}
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            value={values.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
          />
        </div>
        <button type="submit">Guardar</button>
        <button type="button" onClick={resetForm}>Restablecer</button>
      </form>
    </main>
  );
}
```

---

## Variables CSS

Todos los aspectos visuales del paquete están controlados mediante propiedades CSS personalizadas.
Sobreescríbelas en tu propio bloque `:root {}` después de importar el CSS del paquete.

| Idioma | Enlace |
|--------|--------|
| 🇬🇧 English | [docs/css-variables.md](./docs/css-variables.md) |
| 🇮🇹 Italiano | [docs/it/css-variables.md](./docs/it/css-variables.md) |
| 🇪🇸 Español | [docs/es/css-variables.md](./docs/es/css-variables.md) |

---

## Sistema de Modales

Referencia completa de la API, guía de estilos y ejemplos de uso para el sistema centralizado de modales (`useModal`, `openModal`, `closeModal`).

| Idioma | Enlace |
|--------|--------|
| 🇬🇧 English | [docs/modal.md](./docs/modal.md) |
| 🇮🇹 Italiano | [docs/it/modal.md](./docs/it/modal.md) |
| 🇪🇸 Español | [docs/es/modal.md](./docs/es/modal.md) |

---

## Repositorio

- GitHub: [https://github.com/SantiGalvan/thecore-auth](https://github.com/SantiGalvan/thecore-auth)
- npm: `npm install thecore-auth`
