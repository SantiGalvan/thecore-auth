import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ConfigProvider } from './contexts/ConfigContext.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'
import { LoginFormProvider } from './contexts/LoginFormContext.jsx'
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
