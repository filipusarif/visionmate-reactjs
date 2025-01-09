import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'flowbite';
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router.jsx'
import { AuthContextProvider } from './components/context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router}/>
    </AuthContextProvider>
  </StrictMode>,
)