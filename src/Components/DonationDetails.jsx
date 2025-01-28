import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AxiosSecure from './Hooks/AxiosSecure';
import Payment from './Payment/Payment';

// const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = AxiosSecure();
  const [donationDetails, setDonationDetails] = useState(null);
  const [recommendedDonations, setRecommendedDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(''); // Track entered donation amount

  // Fetch donation details
  const fetchDonationDetails = async () => {
      try {
          const response = await axiosSecure.get(`/donations/${id}`);
          setDonationDetails(response.data);
      } catch (error) {
          console.error('Error fetching donation details:', error);
          Swal.fire('Error', 'Failed to fetch donation details.', 'error');
      }
  };

  useEffect(() => {
      fetchDonationDetails();
  }, []);

  if (!donationDetails) return <p>Loading...</p>;

  return (
      <div className="p-6 pt-28">
          <h1 className="text-3xl font-bold mb-4">{donationDetails.petName}</h1>
          <img
              src={donationDetails.petPicture}
              alt={donationDetails.petName}
              className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p className="mb-4">{donationDetails.longDescription}</p>
          <p className="mb-4 font-semibold">
              Target Amount: ${donationDetails.maxDonationAmount}
          </p>
          <p className="mb-4 font-semibold">
              Raised Amount: ${donationDetails.raisedAmount}
          </p>
          <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={() => setShowModal(true)}
          >
              Donate Now
          </button>

          {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                      <h2 className="text-xl font-bold mb-4">Make a Donation</h2>
                      <input
                          type="number"
                          placeholder="Enter Donation Amount"
                          className="w-full p-2 mb-4 border rounded"
                          value={donationAmount}
                          onChange={(e) => setDonationAmount(e.target.value)}
                      />
                      <Payment
                          donationId={id}
                          donationAmount={donationAmount}
                          setShowModal={setShowModal}
                      />
                      <button
                          className="bg-gray-500 text-white px-4 py-2 rounded mt-6"
                          onClick={() => setShowModal(false)}
                      >
                          Close
                      </button>
                  </div>
              </div>
          )}
      </div>
  );
};

export default DonationDetails;
