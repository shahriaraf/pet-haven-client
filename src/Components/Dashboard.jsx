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
    <div className="flex h-screen pt-20">
      {/* Sidebar for Large and Medium Devices */}
      <div className="hidden lg:flex lg:w-56 bg-gray-800 text-white flex-col">
        <div className="p-4 text-center text-xl font-bold bg-[#6d165D]">
          {isAdmin ? 'Admin' : 'User'} <span className="text-[#ECA511]">D</span>ashboard
        </div>
        <nav className="flex-grow p-4 space-y-4">
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
      <div className="flex-grow flex flex-col pt-3">
      <div className="bg-white w-full h-16 flex items-center justify-between px-4 shadow md:hidden">
        <div className="flex items-center pb-2">
          {/* Bar Icon */}
          <i
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="fa-solid fa-bars-staggered text-black text-xl cursor-pointer mr-4"
          ></i>
          {/* User/Admin Dashboard Text */}
          <span className="text-xl font-extrabold" style={{ color: '#6d165D' }}>
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
  );
};

export default Dashboard;
