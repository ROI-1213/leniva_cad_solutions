import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { initCloudCmsSync } from './utils/cloudSync'

// Handle Vite dynamic import (chunk) errors on new deployments safely without infinite loop
window.addEventListener('vite:preloadError', (event: any) => {
  const reloadKey = 'leniva_last_preload_reload'
  const lastReload = Number(sessionStorage.getItem(reloadKey) || 0)
  const now = Date.now()
  if (now - lastReload > 10000) {
    sessionStorage.setItem(reloadKey, String(now))
    console.warn('Vite chunk preload error detected after new deployment, refreshing once...', event)
    window.location.reload()
  } else {
    console.error('Repeated Vite preload error, preventing reload loop:', event)
  }
})

const rootElement = document.getElementById('root')!

// 1. Mount React UI immediately (instant render, zero blank screen delay)
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

// 2. Initialize Cloud CMS sync in the background (non-blocking, resilient)
try {
  initCloudCmsSync({ timeoutMs: 2000 }).catch(err => {
    console.warn('Cloud CMS background sync non-fatal warning:', err)
  })
} catch (err) {
  console.warn('Failed to start Cloud CMS sync:', err)
}


