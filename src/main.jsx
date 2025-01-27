import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
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
import PetDetails from './Components/PetDetails';
import Donation from './Components/Donation';

import MyAddedPets from './Components/MyAddedPets';
import AllUsers from './Components/AllUsers';
import AdminRoute from './Components/AdminRoute';
import Dashboard from './Components/Dashboard';
import AllPets from './Components/AllPets';
import AllDonations from './Components/AllDonations';
import CreateDonationCampaign from './Components/CreateDonationCampaign';
import MyDonationCampaigns from './Components/MyDonationCampaigns';
import DonationDetails from './Components/DonationDetails';
import AdoptionRequests from './Components/AdoptionRequests';
import EditDonation from './Components/EditDonation';
import EditPet from './Components/EditPet';


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
        element: <Petlist />,
      },
      {
        path: '/add-pet',
        element: <AddPet />,
      },
      {
        path: 'pets/:id',
        element: <PetDetails />,
      },
      {
        path: 'update-pet/:id',
        element: <EditPet></EditPet>,
      },
      {
        path: 'donation-details/:id',
        element: <DonationDetails></DonationDetails>,
      },
      {
        path: '/donation',
        element: <Donation />,
      },
      {
        path: 'donation/:id',
        element: <EditDonation></EditDonation>,
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>, // Main Dashboard Component
        errorElement: <Errorpage />, // Fallback for route errors
        children: [
          {
            path: 'my-added-pets', // Relative path
            element: <MyAddedPets />,
          },
          {
            path: 'create-donation-campaigns', // Relative path
            element: <CreateDonationCampaign></CreateDonationCampaign>
          },
          {
            path: 'my-donation-campaigns', // Relative path
            element: <MyDonationCampaigns></MyDonationCampaigns>
          },
          {
            path: 'adoption-requests', // Relative path
            element: <AdoptionRequests></AdoptionRequests>
          },
          {
            path: 'all-users', // Relative path
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
          },
          {
            path: 'all-pets', // Relative path
            element: <AdminRoute><AllPets></AllPets></AdminRoute>,
          },
          {
            path: 'all-donations', // Relative path
            element: <AdminRoute><AllDonations></AllDonations></AdminRoute>,
          },

        ],
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
