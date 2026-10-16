import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { initCloudCmsSync } from './utils/cloudSync'

// Handle Vite dynamic import (chunk) errors on new deployments
window.addEventListener('vite:preloadError', (event) => {
  console.warn('Vite chunk preload error detected after new deployment, refreshing page...', event)
  window.location.reload()
})

const rootElement = document.getElementById('root')!

initCloudCmsSync({ timeoutMs: 1200 }).finally(() => {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  )
})


