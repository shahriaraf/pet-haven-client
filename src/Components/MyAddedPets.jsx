import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyAddedPets = () => {
  const [pets, setPets] = useState([]);
  const [sortedPets, setSortedPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pets'); // Get pets from your backend
        setPets(response.data);
        setSortedPets(response.data);
      } catch (error) {
        console.error('Failed to fetch pets:', error);
      }
    };

    fetchPets();
  }, []);

  const handleSort = (column) => {
    const sorted = [...sortedPets].sort((a, b) => {
      if (a[column] < b[column]) return -1;
      if (a[column] > b[column]) return 1;
      return 0;
    });
    setSortedPets(sorted);
  };

  const handleUpdate = (petId) => {
    navigate(`/update-pet/${petId}`);
  };

  const handleDelete = (petId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/pets/${petId}`);
          Swal.fire('Deleted!', 'Your pet has been deleted.', 'success');
          setPets(pets.filter((pet) => pet._id !== petId)); // Remove pet from the list
          setSortedPets(sortedPets.filter((pet) => pet._id !== petId)); // Remove pet from the sorted list
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete the pet.', 'error');
        }
      }
    });
  };

  const handleAdopt = async (petId) => {
    try {
      await axios.put(`http://localhost:5000/pets/${petId}`, { adopted: true });
      setPets(pets.map((pet) => (pet._id === petId ? { ...pet, adopted: true } : pet)));
      setSortedPets(sortedPets.map((pet) => (pet._id === petId ? { ...pet, adopted: true } : pet)));
    } catch (error) {
      console.error('Failed to update adoption status:', error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPet = currentPage * pageSize;
  const indexOfFirstPet = indexOfLastPet - pageSize;
  const currentPets = sortedPets.slice(indexOfFirstPet, indexOfLastPet);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(sortedPets.length / pageSize); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="container mx-auto p-6 pt-36">
      <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
        <thead>
          <tr>
            <th onClick={() => handleSort('petName')} className="cursor-pointer px-4 py-2">Serial Number</th>
            <th onClick={() => handleSort('petName')} className="cursor-pointer px-4 py-2">Pet Name</th>
            <th onClick={() => handleSort('petCategory')} className="cursor-pointer px-4 py-2">Pet Category</th>
            <th className="cursor-pointer px-4 py-2">Pet Image</th>
            <th onClick={() => handleSort('adopted')} className="cursor-pointer px-4 py-2">Adoption Status</th>
            <th className="cursor-pointer px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPets.map((pet, index) => (
            <tr key={pet._id} className="border-b">
              <td className="px-4 py-2">{indexOfFirstPet + index + 1}</td>
              <td className="px-4 py-2">{pet.petName}</td>
              <td className="px-4 py-2">{pet.petCategory}</td>
              <td className="px-4 py-2">
                <img src={pet.petImage} alt={pet.petName} className="w-16 h-16 object-cover rounded-full" />
              </td>
              <td className="px-4 py-2">
                {pet.adopted ? 'Adopted' : 'Not Adopted'}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleUpdate(pet._id)}
                  className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(pet._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleAdopt(pet._id)}
                  className="px-3 py-1 bg-green-500 text-white rounded"
                >
                  {pet.adopted ? 'Adopted' : 'Adopt'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedPets.length > 10 && (
        <div className="mt-4 flex justify-center">
          <ul className="flex space-x-4">
            {pageNumbers.map((number) => (
              <li
                key={number}
                onClick={() => handlePageChange(number)}
                className={`cursor-pointer px-4 py-2 ${currentPage === number ? 'bg-[#6d165D] text-white' : 'bg-gray-200'}`}
              >
                {number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyAddedPets;
