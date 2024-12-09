import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SnackbarProvider>
);