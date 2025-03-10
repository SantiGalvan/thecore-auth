# THECORE-AUTH Documentation

## Overview

THECORE-AUTH is an authentication package for React applications. This documentation explains its configuration, usage, and available customization options.

## Configuration (`config.json`)
After installation, create a `config.json` file inside the `public/` folder. This file contains the necessary configuration variables.

### Example:
```json
{
  "baseUri": "",                        // Back-end base URI
  "authenticatedEndpoint": "",           // Authentication endpoint
  "usersEndpoint": "",                  // Users endpoint
  "heartbeatEndpoint": "",              // Heartbeat endpoint for token renewal
  "firstPrivatePath": "/dashboard/",    // Path of the first private route
  "infiniteSession": 60000,              // Milliseconds subtracted from the token expiration time
  "alertTimeout": 5000,                  // Duration in milliseconds of the alert timeout
  "axiosTimeout": 3000,                 // Maximum duration in milliseconds of an axios call
  "axiosErrors": {
    "unauthorized": "Access denied",   // Error message for authentication failure (401 error)
    "notFound": "Resource not found",  // Error message for resource not found (404 error)
    "defaultMessage": "Unknown error" // Generic error message
  },
  "clearLoginFormOnError": true,         // Flag to clear login form data on error
  "autoLogin": false,                   // Flag for auto-login
  "autoLoginEmail": "example@mail.com", // Email for auto-login
  "autoLoginPassword": "password123"    // Password for auto-login
}
```

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
@import url(../node_modules/thecore-auth/dist/thecore-auth.css);
```

For modifying the app’s appearance, we have implemented CSS variables that allow customization without creating new classes. For more details, see the [CSS Variables Documentation](CSS%20variables%20documentation.md)

---

## Conclusion
This documentation covers the basic configuration and usage of THECORE-AUTH. For further customization, make sure to correctly use the context providers and configuration options.
