import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Routes/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='md:max-w-screen-1xl mx-auto font-urbanist  bg-[#016A70] lg:pt-4'>
       <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
