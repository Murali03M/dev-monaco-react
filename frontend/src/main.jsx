import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import NotificationProvider from './components/NotificationProvider/NotificationProvider.jsx'

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
     </NotificationProvider>
   
  </React.StrictMode>,
)
