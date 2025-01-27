import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from './Provider/Authprovider';

const PetDetails = () => {
  const {user} = useContext(AuthContext)
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
  });

  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const response = await axios.get(`https://pet-haven-server-sigma.vercel.app/pets/${id}`);
        setPet(response.data);
      } catch (error) {
        setError(
          error.response && error.response.status === 404
            ? 'Pet not found'
            : 'Failed to fetch pet details'
        );
        console.error('Failed to fetch pet details:', error);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleAdopt = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adoptionData = {
      petId: pet._id,
      petName: pet.petName,
      petImage: pet.petImage,
      userName: user.displayName,
      userEmail: user.email,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      await axios.post('https://pet-haven-server-sigma.vercel.app/adoption-requests', adoptionData);
      alert('Adoption request submitted successfully!');
      setShowModal(false);
    } catch (error) {
      console.error('Failed to submit adoption request:', error);
      alert('Failed to submit adoption request.');
    }
  };

  if (error) {
    return <div className="text-center pt-36 text-red-500">{error}</div>;
  }

  if (!pet) {
    return <div className="text-center pt-36">Loading pet details...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 pt-36 flex justify-center">
      <div className="max-w-3xl bg-white border border-gray-200 rounded-lg shadow-lg">
        <img
          src={pet.petImage}
          alt={pet.petName}
          className="rounded-t-lg w-full h-96 object-cover"
        />
        <div className="p-5">
          <h1
            className="mb-2 text-2xl font-bold tracking-tight"
            style={{ color: '#6d165D' }}
          >
            {pet.petName}
          </h1>
          <p className="mb-2 font-normal text-gray-700">
            <strong>Age:</strong> {pet.petAge}
          </p>
          <p className="mb-2 font-normal text-gray-700">
            <strong>Category:</strong> {pet.petCategory}
          </p>
          <p className="mb-2 font-normal text-gray-700">
            <strong>Location:</strong> {pet.petLocation}
          </p>
          <p className="mb-3 font-normal text-gray-700">
            <strong>Description:</strong> {pet.longDescription}
          </p>
          <button
            onClick={handleAdopt}
            className="w-full px-3 py-2 text-sm font-medium bg-[#6d165D] hover:bg-[#ECA511] hover:text-[#6d165D] text-white rounded-lg transition duration-300"
            
          >
            Adopt
          </button>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          role="dialog"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: '#6d165D' }}
            >
              Adopt {pet.petName}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  User Name
                </label>
                <input
                  type="text"
                  value={user.displayName}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-2 text-white rounded-lg"
                  style={{ backgroundColor: '#6d165D' }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetails;

