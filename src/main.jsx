import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { ConfigProvider } from './contexts/ConfigContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider>
        <AuthProvider>

          <App />

        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
