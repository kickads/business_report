import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './css/tailwind.css';
import { ReactRouterProvider } from './providers/ReactRouterProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReactRouterProvider>
      <App />
    </ReactRouterProvider>
  </React.StrictMode>,
)