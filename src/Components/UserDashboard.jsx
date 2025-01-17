import React, { useState } from 'react';
import AddPet from './AddPet';
import MyAddedPets from './MyAddedPets';


const UserDashboard = () => {
  const [activePage, setActivePage] = useState('AddPet'); // Tracks which page to display

  // Function to render the correct component based on `activePage`
  const renderPage = () => {
    switch (activePage) {
      case 'AddPet':
        return <AddPet></AddPet>;
      case 'MyAddedPets':
        return <MyAddedPets></MyAddedPets>;
      case 'AdoptionRequests':
        return <AdoptionRequests />;
      case 'CreateDonationCampaign':
        return <CreateDonationCampaign />;
      case 'MyDonationCampaigns':
        return <MyDonationCampaigns />;
      case 'MyDonations':
        return <MyDonations />;
      default:
        return <AddPet />;
    }
  };

  return (
    <div className="flex h-screen pt-20">
      {/* Sidebar */}
      <div className="w-56 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-center text-xl font-bold bg-[#6d165D]">
          User <span className="text-[#ECA511]">D</span>ashboard
        </div>
        <nav className="flex-grow p-4 space-y-4">
          <button
            onClick={() => setActivePage('AddPet')}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              activePage === 'AddPet' ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
            }`}
          >
            Add a Pet
          </button>
          <button
            onClick={() => setActivePage('MyAddedPets')}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              activePage === 'MyAddedPets' ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
            }`}
          >
            My Added Pets
          </button>
          <button
            onClick={() => setActivePage('AdoptionRequests')}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              activePage === 'AdoptionRequests' ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
            }`}
          >
            Adoption Requests
          </button>
          <button
            onClick={() => setActivePage('CreateDonationCampaign')}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              activePage === 'CreateDonationCampaign' ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
            }`}
          >
            Create Donation Campaign
          </button>
          <button
            onClick={() => setActivePage('MyDonationCampaigns')}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              activePage === 'MyDonationCampaigns' ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
            }`}
          >
            My Donation Campaigns
          </button>
          <button
            onClick={() => setActivePage('MyDonations')}
            className={`block w-full text-left px-3 py-2 rounded-md ${
              activePage === 'MyDonations' ? 'bg-[#ECA511] text-gray-800' : 'hover:bg-[#ECA511]'
            }`}
          >
            My Donations
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Top Navbar */}
        <div className="bg-gray-100 px-6 py-4 shadow">
          <h1 className="text-lg font-semibold" style={{ color: '#6d165D' }}>
            {activePage.replace(/([A-Z])/g, ' $1').trim()}
          </h1>
        </div>

        {/* Page Content */}
        <div className="flex-grow overflow-y-auto bg-gray-50">{renderPage()}</div>
      </div>
    </div>
  );
};

export default UserDashboard;
