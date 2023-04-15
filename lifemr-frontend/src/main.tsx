import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Pages/App'
import Login from './Pages/Login'
import './main.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/login",
    element: <Login LoginOrSignup={0} Message={"Login to Your Account"}/>,
  },
  {
    path: "/signup",
    element: <Login LoginOrSignup={1} Message={"Get Your New Account"}/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
