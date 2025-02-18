import React, { useState } from 'react';
import AddPet from './AddPet';
import MyAddedPets from './MyAddedPets';
import AllUsers from './AllUsers';
import Admin from './Hooks/Admin';
import AllPets from './AllPets';
import AllDonations from './AllDonations';
import CreateDonationCampaign from './CreateDonationCampaign';
import AdoptionRequests from './AdoptionRequests';
import MyDonationCampaigns from './MyDonationCampaigns';
import { NavLink } from 'react-router-dom';
import Footer from './Footer';


const Dashboard = () => {
  const [activePage, setActivePage] = useState('AddPet'); // Tracks which page to display
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For mobile view dropdown toggle
  const [isAdmin, isLoading, isError] = Admin();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error checking admin status.</p>;

  // Mapping pages to components and titles
  const pages = [
    { key: 'AddPet', label: 'Add a Pet', component: <AddPet /> },
    { key: 'MyAddedPets', label: 'My Added Pets', component: <MyAddedPets /> },
    { key: 'AdoptionRequests', label: 'Adoption Requests', component: <AdoptionRequests /> },
    { key: 'CreateDonationCampaign', label: 'Create Donation Campaign', component: <CreateDonationCampaign /> },
    { key: 'MyDonationCampaigns', label: 'My Donation Campaigns', component: <MyDonationCampaigns /> },
    { key: 'MyDonations', label: 'My Donations', component: <div>My Donations</div> },
  ];

  const adminPages = [
    { key: 'Users', label: 'Users', component: <AllUsers /> },
    { key: 'AllPets', label: 'All Pets', component: <AllPets /> },
    { key: 'AllDonations', label: 'All Donations', component: <AllDonations /> },
  ];

  // Render current page's component
  const renderPage = () => {
    const page = [...pages, ...(isAdmin ? adminPages : [])].find((p) => p.key === activePage);
    return page?.component || <AddPet />;
  };

  return (
    <div>
       <div className="flex h-screen">
      {/* Sidebar for Large and Medium Devices */}
      <div className="hidden lg:flex lg:w-56 bg-gray-800 text-white flex-col">
        <div className="p-4 text-center text-xl font-bold bg-[#6d165D]">
          {isAdmin ? 'Admin' : 'User'} <span className="text-[#ECA511]">D</span>ashboard
        </div>
        <nav className="flex-grow p-4 space-y-4">
          <NavLink to='/'  className='block w-full text-left px-3 py-2 rounded-md hover:bg-[#ECA511]'>Home</NavLink>
          {[...pages, ...(isAdmin ? adminPages : [])].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`block w-full text-left px-3 py-2 rounded-md ${activePage === key ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'}`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
     
      {/* Main Content */}
      <div className="flex-grow flex flex-col">
      <div className="bg-[#6d165D] w-full py-3 flex items-center justify-between px-4 shadow md:hidden">
        <div className="flex items-center pb-2">
          {/* Bar Icon */}
          <div className='pr-2 text-white'>
          <svg onClick={() => setIsDropdownOpen(!isDropdownOpen)} xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"></path></svg>
          </div>
         
          {/* User/Admin Dashboard Text */}
          <span className="text-xl font-bold" style={{ color: 'white' }}>
            {isAdmin ? 'Admin' : 'User'} <span className="text-[#ECA511]">D</span>ashboard
          </span>
        </div>
      </div>
        <div className="bg-gray-100 px-6 py-4 shadow">
          <h1 className="text-2xl font-semibold" style={{ color: '#6d165D' }}>
            {pages.find((p) => p.key === activePage)?.label ||
              adminPages.find((p) => p.key === activePage)?.label ||
              'Dashboard'}
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto bg-gray-50">{renderPage()}</div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isDropdownOpen && (
        <div className="absolute top-24 left-4 right-4 bg-white border rounded-lg shadow-lg z-50">
          <nav className="p-4 space-y-2">
          <NavLink to='/'  className='block w-full text-left px-3 py-2 rounded-md hover:bg-[#ECA511]'>Home</NavLink>
            {[...pages, ...(isAdmin ? adminPages : [])].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => {
                  setActivePage(key);
                  setIsDropdownOpen(false); // Close dropdown when a menu is clicked
                }}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  activePage === key ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
                }`}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
    <Footer></Footer>
    </div>
   
  );
};

export default Dashboard;
