import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosSecure from './Hooks/AxiosSecure';
import Swal from 'sweetalert2';

const AllUsers = () => {
  const axiosSecure = AxiosSecure();

  // Fetch users with react-query
  const { data: users = [], isLoading, error, refetch} = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Handle "Make Admin" action
  const handleMakeAdmin = user => {
   axiosSecure.patch(`/users/admin/${user._id}`)
   .then(res => {
    console.log(res.data)
    if(res.data.modifiedCount > 0){
        refetch();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
    }
   })

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Users</h2>
        <h2 className="text-lg">Total Users: {users.length}</h2>
      </div>

      {/* Users Table */}
      <table className="table-auto w-full bg-white border border-gray-200 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Profile Picture</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="text-center">
              <td className="px-4 py-2 border">{index + 1}</td>
              <td className="px-4 py-2 border">{user.name}</td>
              <td className="px-4 py-2 border">{user.email}</td>
              <td className="px-4 py-2 border">
                <img
                  src={user.photo || '/default-profile.png'} // Fallback to default image
                  alt={user.name}
                  className="w-12 h-12 rounded-full mx-auto"
                />
              </td>
              <td className="px-4 py-2 border">
            { 
            user.role === 'admin'? 'Admin' :
                <button
                onClick={() => handleMakeAdmin(user)}
                className="bg-[#6d165D] text-white px-4 py-2 rounded-md hover:bg-[#ECA511] transition"
              >
                Make Admin
              </button>
            }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
