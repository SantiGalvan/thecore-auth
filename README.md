# THECORE-AUTH Documentation

## Overview

THECORE-AUTH is an authentication package for React applications. This documentation explains its configuration, usage, and available customization options.

## Configuration (`config.json`)
After installation, create a `config.json` file inside the `public/` folder. This file contains the necessary configuration variables.

### Example:
```json
{
  "baseUri": "",
  "authenticatedEndpoint": "",
  "usersEndpoint": "",
  "heartbeatEndpoint": "",
  "firstPrivatePath": "/dashboard/",
  "firstPrivateTitle": "Dashboard",
  "configRoutes": [
    {"path": "", "title": "", "element": ""}
  ],
  "infiniteSession": 60000,
  "alertTimeout": 5000,
  "axiosTimeout": 3000,
  "axiosErrors": {
    "unauthorized": "Accesso negato",
    "notFound": "Risorsa non trovata",
    "defaultMessage": "Errore sconosciuto"
  },
  "clearLoginFormOnError": true,
  "autoLogin": false,
  "backendToken": "token-machine-to-machine",
  "isDebug": true
}
```

#### Details of each key:

- `baseUri`: The base URI of the back-end, used to compose the API URLs. This is the fixed part of the server's URL.
- `authenticatedEndpoint`: The endpoint for user login and authentication. This URL is used to send the authentication request.
- `usersEndpoint`: The endpoint to retrieve user information, such as the user list or details of the authenticated user.
- `heartbeatEndpoint`: The endpoint for renewing the authentication token (heartbeat). This URL is used to keep the session active, preventing the token from expiring.
- `firstPrivatePath`: The path to the first private route that the user sees after logging in. For example, it might be a page like the dashboard.
- `firstPrivateTitle`: The title to display for the first private page, useful for defining the page name in the layout.
- `configRoutes`: A list of new customizable routes to add to the application. Each route contains a `path` (URL), a `title` (title to display on the page), and an `element` (the element defining the route content, such as a React component).
- `infiniteSession`: The number of milliseconds to subtract from the authentication token's expiration time to determine when the session should be considered expired and therefore renewed.
- `alertTimeout`: The time, in milliseconds, for how long an alert (e.g., an on-screen notification) should remain visible.
- `axiosTimeout`: The maximum duration (in milliseconds) that an Axios request can take before it times out.
- `axiosErrors`: An object containing custom messages to display for specific Axios errors:
    - `unauthorized`: The message displayed when error code 401 (access denied) is returned from the request.
    - `notFound`: The message displayed when error code 404 (resource not found) is returned from the request.
    - `defaultMessage`: A generic message displayed for unspecified errors.
- `clearLoginFormOnError`: A flag that indicates whether the login form data should be cleared in case of an error.
- `autoLogin`: A flag that enables or disables auto-login. When set to true, the app will automatically log in with predefined credentials.
- `backendToken`: The token for auto-login, used for automatic login in "machine-to-machine" mode or without user interaction.
- `isDebug`: A flag that, when set to true, enables the display of debug logs (console.log) to assist with application debugging.

Additional variables can be included and retrieved using the `useConfig` hook:

```jsx
const { numOfRecords } = useConfig();
```

## Providers

THECORE-AUTH offers various context providers to integrate into your application. They can be included individually or using the `ProvidersContainer`, which exclusively includes `LoadingProvider`, `ConfigProvider`, and `AlertProvider`. This helps keep the `main.jsx` file cleaner without manually declaring these providers.

### Example: Individual Providers

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ConfigProvider>
          <AlertProvider>
            <AuthProvider>
              <LoginFormProvider>
                <App />
              </LoginFormProvider>
            </AuthProvider>
          </AlertProvider>
        </ConfigProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
```

### Example: ProvidersContainer

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ProvidersContainer>
        <AuthProvider>
          <LoginFormProvider>
            <App />
          </LoginFormProvider>
        </AuthProvider>
      </ProvidersContainer>
    </BrowserRouter>
  </StrictMode>,
)
```

## Modals and Modal Management

`THECORE-AUTH` uses a centralized modal system to manage dialog windows, forms, and multi-step flows in a simple and dynamic way. The modal management is fully controlled via Context, allowing modals to be opened from anywhere in the application with customizable content and behavior.

For more details on usage, customization, and advanced use cases of the modal system, please refer to the [dedicated modal documentation](./Modal%20documentation.md).

## Routing

### `RouteProvider`

Used to manage public and private routes. Routes are passed as an array.

```jsx
const privateRoutes = [
  { path: 'test/:id', element: <TestPage /> }
];
const publicRoutes = [
  { path: 'publictest', element: <TestPublicPage /> }
];

<RouteProvider privateRoutes={privateRoutes} publicRoutes={publicRoutes}>
  <PackageRoutes />
</RouteProvider>
```

### `PackageRoutes` Props

| Prop                   | Type      | Default         | Description                                                 |
| ---------------------- | --------- | --------------- | ----------------------------------------------------------- |
| `firstPrivateElement`  | Component | `<Dashboard />` | First component of the private route                        |
| `firstPrivatePath`     | String    | `/dashboard/`   | Path of the first private route (configurable in `config.json`) |
| `logoImg`              | Component | `MyWharehouse`          | SVG component for the login logo                             |
| `globalLayout`         | Component | `null`          | Custom global layout                                       |
| `isMain`               | Boolean   | `false`         | Keeps the `main` tag in `DefaultLayout`                     |
| `headerComponent`      | Component | `null`          | Header component                                           |
| `showHeaderOnLogin`    | Boolean   | `false`         | Displays the header on the login page                      |
| `headerExcludedRoutes` | Array     | `[]`            | Routes where the header should not be displayed            |
| `footerComponent`      | Component | `null`          | Footer component                                           |
| `showFooterOnLogin`    | Boolean   | `false`         | Displays the footer on the login page                      |
| `footerExcludedRoutes` | Array     | `[]`            | Routes where the footer should not be displayed            |

## Layout Management

`DefaultLayout` has been updated to support new props related to the header and footer.

### Header Props

- `headerComponent`: Component to be used as a header
- `showHeaderOnLogin`: Boolean flag to show the header on the login page
- `headerExcludedRoutes`: Array of routes where the header should not appear

### Footer Props

- `footerComponent`: Component to be used as a footer
- `showFooterOnLogin`: Boolean flag to show the footer on the login page
- `footerExcludedRoutes`: Array of routes where the footer should not appear

## Customizing Login

To customize the Login, use the states provided by `LoginFormContext`. Some values can be directly modified, while others must be adjusted via CSS variables.

Example usage:
```javascript
const { setButtonText, setOverrideStyle } = useLoginForm();

useLayoutEffect(() => {
  setButtonText('LOGIN');
  setOverrideStyle({
    container: 'container mx-auto flex items-center justify-center h-screen',
    cardForm: 'bg-[#A0D8F1] flex p-24 rounded-full h-[900px] w-[900px]',
    form: 'flex items-center justify-center flex-col basis-1/2'
  });
}, []);
```

## Styling
To apply package styles, import the CSS into your main styles file:

```css
@import url(../node_modules/@dev/thecore-auth/dist/thecore-auth.css);
```

For modifying the app’s appearance, we have implemented CSS variables that allow customization without creating new classes. For more details, see the [CSS Variables Documentation](CSS%20variables%20documentation.md)

---

## Conclusion
This documentation covers the basic configuration and usage of THECORE-AUTH. For further customization, make sure to correctly use the context providers and configuration options.
