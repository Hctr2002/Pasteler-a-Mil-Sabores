
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx'
import Home from './components/Home.jsx'; 
import Catalogo from './components/Catalogo.jsx'; 

import './index.css'

// Aquí creamos las rutas
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, 
    children: [
      {
        index: true, 
        element: <Home />,
      },
      {
        path: "catalogo", 
        element: <Catalogo />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)