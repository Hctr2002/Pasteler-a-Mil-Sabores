import React from 'react';
import './styles/theme.css';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './routes/AppRouter.jsx';
import { PastelesProvider } from './contexts/PastelesContext.jsx';

import { ProfileProvider } from './contexts/ProfileContext';
import { CartProvider } from './contexts/CartContext';

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <BrowserRouter >
      <ProfileProvider>
        <CartProvider>
          <PastelesProvider>
            <App>
              <AppRouter/>
            </App>
          </PastelesProvider>
        </CartProvider>
      </ProfileProvider>
    </BrowserRouter>
  </React.StrictMode>
  
);