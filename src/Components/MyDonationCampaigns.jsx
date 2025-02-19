import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AxiosSecure from './Hooks/AxiosSecure';
import { AuthContext } from './Provider/Authprovider';
import "react-loading-skeleton/dist/skeleton.css";
import TableSkeleton from './Skeleton/TableSkeleton';

const MyDonationCampaigns = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonators, setSelectedDonators] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const axiosSecure = AxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) return;

    const fetchDonations = async () => {
      try {
        const response = await axiosSecure.get('/api/donations');
        setDonations(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, [user, axiosSecure]);

  const handlePause = async (donationId) => {
    try {
      const response = await axiosSecure.patch(`/api/donations/${donationId}/pause`);
      const { paused } = response.data;

      setDonations((prev) =>
        prev.map((donation) =>
          donation._id === donationId ? { ...donation, paused } : donation
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

  if (loading) return <TableSkeleton></TableSkeleton>

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <table className="table-auto w-full border-collapse border border-gray-200 text-sm sm:text-base overflow-x-auto">
        <thead>
          <tr>
            <th className="border px-2 sm:px-4 py-2">Pet Name</th>
            <th className="border px-2 sm:px-4 py-2">Maximum Donation</th>
            <th className="border px-2 sm:px-4 py-2">Progress</th>
            <th className="border px-2 sm:px-4 py-2">Actions</th>
          </tr>
        </thead>

        
        <tbody>
          {donations.map((donation) => (
            <tr key={donation._id} className="text-center">
              <td className="border px-2 sm:px-4 py-2">{donation.petName}</td>
              <td className="border px-2 sm:px-4 py-2">${donation.maxDonationAmount}</td>
              <td className="border px-2 sm:px-4 py-2">
                <progress
                  value={donation.currentDonation}
                  max={donation.maxDonationAmount}
                  className="w-32 sm:w-48"
                ></progress>
              </td>
              <td className="border px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  className={`px-3 py-1 text-white rounded w-full sm:w-auto ${
                    donation.paused ? 'bg-gray-500' : 'bg-[#6d165D]'
                  }`}
                  onClick={() => handlePause(donation._id)}
                >
                  {donation.paused ? 'Unpause' : 'Pause'}
                </button>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded w-full sm:w-auto"
                  onClick={() => handleEdit(donation._id)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-yellow-500 text-white rounded w-full sm:w-auto"
                  onClick={() => handleViewDonators(donation._id)}
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h2 className="text-lg font-bold mb-4">Donators</h2>
            <ul className="space-y-2">
              {selectedDonators.map((donator) => (
                <li key={donator.id} className="flex justify-between">
                  <span>{donator.name}</span>
                  <span>${donator.amount}</span>
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
