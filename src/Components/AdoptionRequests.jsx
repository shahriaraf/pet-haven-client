import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AxiosSecure from './Hooks/AxiosSecure';
import { AuthContext } from './Provider/Authprovider';
import TableSkeleton from './Skeleton/TableSkeleton';
import "react-loading-skeleton/dist/skeleton.css";

const AdoptionRequests = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = AxiosSecure();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const response = await axiosSecure.get('/user/adoption-requests', {
                params: { email: user.email },
            });
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching adoption requests:', error);
        }
    };

    const handleAction = async (id, status) => {
        try {
            const response = await axiosSecure.patch(`/adoption-requests/${id}`, { status });
            if (response.status === 200) {
                fetchRequests(); // Refresh requests
                Swal.fire('Success', `Request ${status}.`, 'success');
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to update request. Please try again.', 'error');
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (loading) return <TableSkeleton></TableSkeleton>

    return (
        <div className="px-4 sm:px-8">
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200 text-sm sm:text-base">
                    <thead>
                        <tr>
                            <th className="border px-2 sm:px-4 py-2">Serial No</th>
                            <th className="border px-2 sm:px-4 py-2">Requester Name</th>
                            <th className="border px-2 sm:px-4 py-2">Email</th>
                            <th className="border px-2 sm:px-4 py-2">Phone</th>
                            <th className="border px-2 sm:px-4 py-2">Location</th>
                            <th className="border px-2 sm:px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request._id} className="hover:bg-gray-100">
                                <td className="border px-2 sm:px-4 py-2 text-center">{index + 1}</td>
                                <td className="border px-2 sm:px-4 py-2">{request.petName}</td>
                                <td className="border px-2 sm:px-4 py-2">{request.userEmail}</td>
                                <td className="border px-2 sm:px-4 py-2">{request.phone}</td>
                                <td className="border px-2 sm:px-4 py-2">{request.address}</td>
                                <td className="border px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
                                    <button
                                        className={`bg-green-500 text-white px-3 py-1 rounded w-full sm:w-auto ${request.status === 'accepted' ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        onClick={() => handleAction(request._id, 'accepted')}
                                        disabled={request.status === 'accepted'}
                                    >
                                        {request.status === 'accepted' ? 'Accepted' : 'Accept'}
                                    </button>
                                    <button
                                        className={`bg-red-500 text-white px-3 py-1 rounded w-full sm:w-auto ${request.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        onClick={() => handleAction(request._id, 'rejected')}
                                        disabled={request.status === 'rejected'}
                                    >
                                        {request.status === 'rejected' ? 'Rejected' : 'Reject'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdoptionRequests;
