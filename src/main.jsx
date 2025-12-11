import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import { router } from './Routes/router';

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='md:max-w-screen-1xl mx-auto font-urbanist bg-slate-200'>
       <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
