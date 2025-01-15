import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Components/Home/Home';
import Errorpage from './Components/Errorpage/Errorpage';
import Root from './Components/Root';
import Register from './Components/Register';
import Login from './Components/Login';
import Authprovider from './Components/Provider/Authprovider';
import Petlist from './Components/Petlist';
import AddPet from './Components/AddPet';


// Initialize QueryClient for react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent refetching when the window regains focus
      retry: 2, // Retry failed queries twice
      onError: (error) => {
        console.error('Query error:', error); // Log query errors globally
      },
    },
  },
});

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // Root layout or wrapper component
    errorElement: <Errorpage />, // Fallback for route errors
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/petlist',
        element: <Petlist></Petlist>
      },
      {
        path: '/add-pet',
        element: <AddPet></AddPet>
      },
    ],
  },
  {
    path: '*',
    element: <Errorpage />, // Fallback for unknown routes
  },
]);

// Render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Authprovider>
        <RouterProvider router={router} />
      </Authprovider>
    </QueryClientProvider>
  </StrictMode>
);
