import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import AppSnackbarProvider from './lib/providers/AppSnackBarProvider/AppSnackBarProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppSnackbarProvider>
        <AppRoutes />
      </AppSnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
)
