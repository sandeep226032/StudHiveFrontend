import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Createnews from './components/Createnews.jsx';
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Userpost from "./components/Userpost.jsx";



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

  }, {
    path: "/createnews",
    element:<Createnews></Createnews>
  },
  {
    path:"/signup",
    element:<Signup></Signup>

  },{
    path:"/login",
    element:<Login></Login>
  },{
    path:"/yourpost",
    element:<Userpost></Userpost>,
  }
 
 
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
