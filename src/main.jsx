import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router";

const router = createBrowserRouter(
    [
        {
            path: '/',
            Component: ()
        },
        {
            path: '/quiz',
            Component: () => ()
        },
        {
            path: '/score',
            Component: () => ()
        }
    ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
