import { useQuery } from '@tanstack/react-query';
import React from 'react';
import AxiosSecure from './Hooks/AxiosSecure';
import Swal from 'sweetalert2';
import TableSkeleton from './Skeleton/TableSkeleton';
import "react-loading-skeleton/dist/skeleton.css";

const AllUsers = () => {
  const axiosSecure = AxiosSecure();

  // Fetch users with react-query
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Handle "Make Admin" action
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  if (isLoading) return <TableSkeleton></TableSkeleton>

  if (error) {
    return <div>Error loading users: {error.message}</div>;
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold">All Users</h2>
        <h2 className="text-md sm:text-lg">Total Users: {users.length}</h2>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-slate-100 shadow-lg shadow-gray-400 border border-gray-200 rounded-lg text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 sm:px-4 py-2 border">#</th>
              <th className="px-2 sm:px-4 py-2 border">Name</th>
              <th className="px-2 sm:px-4 py-2 border">Email</th>
              <th className="px-2 sm:px-4 py-2 border">Profile Picture</th>
              <th className="px-2 sm:px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="text-center">
                <td className="px-2 sm:px-4 py-2 border">{index + 1}</td>
                <td className="px-2 sm:px-4 py-2 border">{user.name}</td>
                <td className="px-2 sm:px-4 py-2 border">{user.email}</td>
                <td className="px-2 sm:px-4 py-2 border">
                  <img
                    src={user.photo || '/default-profile.png'}
                    alt={user.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="px-2 sm:px-4 py-2 border">
                  {user.role === 'admin' ? (
                    'Admin'
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-[#6d165D] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-md hover:bg-[#ECA511] transition w-full sm:w-auto"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
