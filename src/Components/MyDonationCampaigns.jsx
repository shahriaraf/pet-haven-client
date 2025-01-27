import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AxiosSecure from './Hooks/AxiosSecure';
import { AuthContext } from './Provider/Authprovider';


const MyDonationCampaigns = () => {
  const [donations, setDonations] = useState([]);
  const [selectedDonators, setSelectedDonators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = AxiosSecure();

  // Get user from AuthContext
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return; // If no user, do nothing

    // Fetch donations from API for logged-in user
    const fetchDonations = async () => {
      try {
        const response = await axiosSecure.get('/api/donations'); // Assuming user has an `id` field
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, [user, axiosSecure]); // Add user and axiosSecure as dependencies


  const handlePause = async (donationId) => {
    try {
      // Update pause status in the backend
      const response = await axiosSecure.patch(`/api/donations/${donationId}/pause`);
  
      const { paused } = response.data; // Get the updated 'paused' status from the response
  
      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === donationId
            ? { ...donation, paused } // Update the paused status in the state
            : donation
        )
      );
    } catch (error) {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };
  
  

  const handleEdit = (donationId) => {
    navigate(`/donation/${donationId}`);
  };

  const handleViewDonators = async (donationId) => {
    try {
      const response = await axiosSecure.get(`/api/donations/${donationId}/donators`);
      setSelectedDonators(response.data);
      setIsModalOpen(true);
    } catch (error) {
      Swal.fire('Error', 'Failed to fetch donators', 'error');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Pet Name</th>
            <th className="border px-4 py-2">Maximum Donation</th>
            <th className="border px-4 py-2">Progress</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id} className="text-center">
              <td className="border px-4 py-2">{donation.petName}</td>
              <td className="border px-4 py-2">${donation.maxDonation}</td>
              <td className="border px-4 py-2">
                <progress
                  value={donation.currentDonation}
                  max={donation.maxDonation}
                ></progress>
              </td>
              <td className="border px-4 py-2">
                <button
                  className={`px-3 py-1 text-white rounded ${
                    donation.paused ? 'bg-gray-500' : 'bg-[#6d165D]'
                  }`}
                  onClick={() => handlePause(donation._id)}
                >
                  {donation.paused ? 'Unpause' : 'Pause'}
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleEdit(donation._id)}
                >
                  Edit
                </button>
                <button
                  className="ml-2 px-3 py-1 bg-yellow-500 text-white rounded"
                  onClick={() => handleViewDonators(donation.id)}
                >
                  View Donators
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Donators Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="text-lg font-bold">Donators</h2>
            <ul>
              {selectedDonators.map((donator) => (
                <li key={donator.id}>
                  {donator.name} - ${donator.amount}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationCampaigns;
