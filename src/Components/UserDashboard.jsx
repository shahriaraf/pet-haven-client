import React, { useState } from 'react';
import AddPet from './AddPet';
import MyAddedPets from './MyAddedPets';
import AllUsers from './AllUsers';
import Admin from './Hooks/Admin';


const UserDashboard = () => {
  const [activePage, setActivePage] = useState('AddPet'); // Tracks which page to display
  const [isAdmin, isLoading, isError] = Admin();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error checking admin status.</p>;


  // Mapping pages to components and titles
  const pages = [
    { key: 'AddPet', label: 'Add a Pet', component: <AddPet /> },
    { key: 'MyAddedPets', label: 'My Added Pets', component: <MyAddedPets /> },
    { key: 'AdoptionRequests', label: 'Adoption Requests', component: <div>Adoption Requests</div> },
    { key: 'CreateDonationCampaign', label: 'Create Donation Campaign', component: <div>Create Donation Campaign</div> },
    { key: 'MyDonationCampaigns', label: 'My Donation Campaigns', component: <div>My Donation Campaigns</div> },
    { key: 'MyDonations', label: 'My Donations', component: <div>My Donations</div> },
  ];

  const adminPages = [
    { key: 'Users', label: 'Users', component: <AllUsers></AllUsers> },
    { key: 'AllPets', label: 'All Pets', component: <div>All Pets</div> },
    { key: 'AllDonations', label: 'All Donations', component: <div>All Donations</div> },
  ];

  // Render current page's component
  const renderPage = () => {
    const page = [...pages, ...(isAdmin ? adminPages : [])].find((p) => p.key === activePage);
    return page?.component || <AddPet />;
  };

  return (
    <div className="flex h-screen pt-20">
      {/* Sidebar */}
      <div className="w-56 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-center text-xl font-bold bg-[#6d165D]">
          {isAdmin ? 'Admin' : 'User'} <span className="text-[#ECA511]">D</span>ashboard
        </div>
        <nav className="flex-grow p-4 space-y-4">
          {[...pages, ...(isAdmin ? adminPages : [])].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActivePage(key)}
              className={`block w-full text-left px-3 py-2 rounded-md ${activePage === key ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
                }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        <div className="bg-gray-100 px-6 py-4 shadow">
          <h1 className="text-lg font-semibold" style={{ color: '#6d165D' }}>
            {pages.find((p) => p.key === activePage)?.label ||
              adminPages.find((p) => p.key === activePage)?.label ||
              'Dashboard'}
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto bg-gray-50">{renderPage()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
