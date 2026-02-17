import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/auth/AuthContext.jsx'
import { ConfigProvider } from './contexts/config/ConfigContext.jsx'
import { LoadingProvider } from './contexts/loading/LoadingContext.jsx'
import { AlertProvider } from './contexts/alert/AlertContext.jsx'
import { LoginFormProvider } from './contexts/login/LoginFormContext.jsx'
import { ModalProvider } from './contexts/modal/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ConfigProvider>
          <AlertProvider>
            <AuthProvider>
              <LoginFormProvider>
                <ModalProvider>

                  <App />

                </ModalProvider>
              </LoginFormProvider>
            </AuthProvider>
          </AlertProvider>
        </ConfigProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
