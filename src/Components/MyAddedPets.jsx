import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AxiosSecure from './Hooks/AxiosSecure';
import { AuthContext } from './Provider/Authprovider';
import "react-loading-skeleton/dist/skeleton.css";
import TableSkeleton from './Skeleton/TableSkeleton';

const MyAddedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = AxiosSecure();
  const { user } = useContext(AuthContext);

  const fetchPets = async () => {
    try {
      const response = await axiosSecure.get('/user/pets', {
        params: { email: user.email },
      });
      setPets(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pets:', error);
      Swal.fire('Error', 'Failed to fetch pets. Please try again.', 'error');
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will permanently delete the pet.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/pet/${id}`);
          Swal.fire('Deleted!', 'Pet has been deleted.', 'success');
          fetchPets();
        } catch (error) {
          Swal.fire('Error', 'Failed to delete pet. Please try again.', 'error');
        }
      }
    });
  };

  const handleAdopt = async (id) => {
    try {
      await axiosSecure.patch(`/pets/${id}/adopted`);
      Swal.fire('Success', 'Pet marked as adopted.', 'success');
      fetchPets();
    } catch (error) {
      Swal.fire('Error', 'Failed to mark pet as adopted. Please try again.', 'error');
    }
  };

  const handleUpdate = (id) => {
    window.location.href = `/update-pet/${id}`;
  };

  if (loading) return <TableSkeleton></TableSkeleton>

  return (
    <div>
      <table className="table-auto w-full overflow-x-auto border-collapse border border-gray-300 shadow-lg text-sm sm:text-base">
        <thead>
          <tr>
            <th className="border px-2 sm:px-4 py-1 sm:py-2">Serial No</th>
            <th className="border px-2 sm:px-4 py-1 sm:py-2">Pet Name</th>
            <th className="border px-2 sm:px-4 py-1 sm:py-2">Category</th>
            <th className="border px-2 sm:px-4 py-1 sm:py-2">Image</th>
            <th className="border px-2 sm:px-4 py-1 sm:py-2">Adoption Status</th>
            <th className="border px-2 sm:px-4 py-1 sm:py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, index) => (
            <tr key={pet._id} className="hover:bg-gray-100">
              <td className="border px-2 sm:px-4 py-1 sm:py-2 text-center">{index + 1}</td>
              <td className="border px-2 sm:px-4 py-1 sm:py-2">{pet.petName}</td>
              <td className="border px-2 sm:px-4 py-1 sm:py-2">{pet.petCategory}</td>
              <td className="border px-2 sm:px-4 py-1 sm:py-2">
                <img
                  src={pet.petImage}
                  alt={pet.petName}
                  className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-md mx-auto"
                />
              </td>
              <td className="border px-2 sm:px-4 py-1 sm:py-2 text-center">
                {pet.adopted ? 'Adopted' : 'Not Adopted'}
              </td>
              <td className="border px-2 sm:px-4 py-1 sm:py-2 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                <button
                  className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded w-full sm:w-auto"
                  onClick={() => handleUpdate(pet._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded w-full sm:w-auto"
                  onClick={() => handleDelete(pet._id)}
                >
                  Delete
                </button>
                <button
                  className={`${pet.adopted ? 'bg-gray-500' : 'bg-green-500'
                    } text-white px-2 sm:px-3 py-1 rounded w-full sm:w-auto`}
                  onClick={() => handleAdopt(pet._id)}
                  disabled={pet.adopted}
                >
                  {pet.adopted ? 'Adopted' : 'Adopt'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default MyAddedPets;
