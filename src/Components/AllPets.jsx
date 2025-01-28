import { useState, useEffect } from "react";
import AxiosSecure from "./Hooks/AxiosSecure";
import TableSkeleton from "./Skeleton/TableSkeleton";
import "react-loading-skeleton/dist/skeleton.css";


const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const axiosSecure = AxiosSecure();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axiosSecure.get("/all-pets");
        setPets(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this pet?");
    if (!confirm) return;

    try {
      await axiosSecure.delete(`/pets/${id}`);
      setPets((prevPets) => prevPets.filter((pet) => pet._id !== id));
      alert("Pet deleted successfully!");
    } catch (error) {
      console.error("Error deleting pet:", error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axiosSecure.patch(
        `/pets/${id}`,
        { adopted: status },
      );
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet._id === id ? { ...pet, adopted: status } : pet
        )
      );
      alert("Pet status updated successfully!");
    } catch (error) {
      console.error("Error updating pet status:", error);
    }
  };

  if (isLoading) return <TableSkeleton></TableSkeleton>

  return (
    <div className="p-6">
      <table className="w-full border border-gray-200 bg-slate-100 shadow-lg shadow-gray-400">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Age</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Location</th>
            <th className="p-2 border">Adopted</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet) => (
            <tr key={pet._id}>
              <td className="p-2 border">
                <img
                  src={pet.petImage}
                  alt={pet.petName}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-2 border">{pet.petName}</td>
              <td className="p-2 border">{pet.petAge}</td>
              <td className="p-2 border">{pet.petCategory}</td>
              <td className="p-2 border">{pet.petLocation}</td>
              <td className="p-2 border">
                {pet.adopted ? "Adopted" : "Not Adopted"}
              </td>
              <td className="p-2 border">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded mr-2"
                  onClick={() => handleDelete(pet._id)}
                >
                  Delete
                </button>
                <button
                  className={`${
                    pet.adopted
                      ? "bg-[#ECA511] "
                      : "bg-[#6d165D] "
                  } text-white px-3 py-1 rounded`}
                  onClick={() => handleStatusChange(pet._id, !pet.adopted)}
                >
                  {pet.adopted ? "Unadopt" : "Adopt"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllPets;
