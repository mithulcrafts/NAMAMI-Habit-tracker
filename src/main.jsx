import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const enableServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    // In dev: unregister old SWs to prevent caching issues
    if (!import.meta.env.PROD) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((reg) => reg.unregister())
      })
    }
    // In prod: register new SW
    else {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .catch((err) => console.error('SW registration failed', err))
      })
    }
  }
}

enableServiceWorker()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
