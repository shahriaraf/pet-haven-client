import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AxiosSecure from './Hooks/AxiosSecure';

// const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const DonationDetails = () => {
  const { id } = useParams(); // Donation campaign ID from URL
  const axiosSecure = AxiosSecure();
  const [donationDetails, setDonationDetails] = useState(null);
  const [recommendedDonations, setRecommendedDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  // Fetch recommended donations
  const fetchRecommendedDonations = async () => {
    try {
      const response = await axiosSecure.get('/donation-campaigns', {
        params: { excludeId: id },
      });
      setRecommendedDonations(response.data);
    } catch (error) {
      console.error('Error fetching recommended donations:', error);
    }
  };

  useEffect(() => {
    fetchDonationDetails();
    fetchRecommendedDonations();
  }, []);

  if (!donationDetails) return <p>Loading...</p>;

  return (
    <div className="p-6 pt-28">
      <h1 className="text-3xl font-bold mb-4">{donationDetails.petName}</h1>
      <img
        src={donationDetails.petPicture
        }
        alt={donationDetails.petName}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="mb-4">{donationDetails.longDescription}</p>
      <p className="mb-4 font-semibold">
        Target Amount: ${donationDetails.maxDonationAmount
        }
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
            {/* <Elements stripe={stripePromise}>
              <DonationForm
                donationId={id}
                onSuccess={() => {
                  fetchDonationDetails();
                  setShowModal(false);
                }}
              />
            </Elements> */}
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">Recommended Donations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendedDonations.map((donation) => (
          <div
            key={donation._id}
            className="border rounded p-4 shadow-lg hover:shadow-xl"
          >
            <img
              src={donation.petPicture}
              alt={donation.petName}
              className="h-32 w-full object-cover rounded mb-2"
            />
            <h3 className="font-bold">{donation.petName}</h3>
            <p className="text-sm text-gray-600">{donation.shortDescription}</p>
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
              onClick={() => (window.location.href = `/donation-details/${donation._id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationDetails;
