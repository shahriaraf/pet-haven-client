import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home';
import Errorpage from './Components/Errorpage/Errorpage';
import Root from './Components/Root';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>, // Assuming Root is a layout or wrapper component
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
     
    ]
  },
  {
    path: "*",
    element: <Errorpage></Errorpage>, // Home is the main page
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Pass the queryClient instance to the QueryClientProvider */}
   
        <RouterProvider router={router} />
  
  </StrictMode>,
);
