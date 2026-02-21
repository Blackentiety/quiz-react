import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import HomePage from "./pages/HomePage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ScorePage from "./pages/ScorePage.jsx";

const router = createBrowserRouter(
    [
        {
            path: '/',
            Component: HomePage
        },
        {
            path: '/quiz',
            Component: QuizPage
        },
        {
            path: '/score',
            Component: ScorePage
        }
    ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
