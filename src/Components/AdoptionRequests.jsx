import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AxiosSecure from './Hooks/AxiosSecure';
import { AuthContext } from './Provider/Authprovider';

const AdoptionRequests = () => {
    const [requests, setRequests] = useState([]);
    const axiosSecure = AxiosSecure();
    const { user } = useContext(AuthContext);

    const fetchRequests = async () => {
        try {
            const response = await axiosSecure.get('/user/adoption-requests', {
                params: { email: user.email },
            });
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching adoption requests:', error);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAction = async (id, status) => {
        try {
            const response = await axiosSecure.patch(`/adoption-requests/${id}`, { status });
            if (response.status === 200) {
                fetchRequests(); // Refresh requests
            }
        } catch (error) {
           
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Adoption Requests</h1>
            <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Serial No</th>
                        <th className="border px-4 py-2">Requester Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Phone</th>
                        <th className="border px-4 py-2">Location</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={request._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{request.petName}</td>
                            <td className="border px-4 py-2">{request.userEmail}</td>
                            <td className="border px-4 py-2">{request.phone}</td>
                            <td className="border px-4 py-2">{request.address}</td>
                            <td className="border px-4 py-2 space-x-2">
                                <button
                                    className={`bg-green-500 text-white px-3 py-1 rounded ${request.status === 'accepted' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => handleAction(request._id, 'accepted')}
                                    disabled={request.status === 'accepted'}
                                >
                                    {request.status === 'accepted' ? 'Accepted' : 'Accept'}
                                </button>
                                <button
                                    className={`bg-red-500 text-white px-3 py-1 rounded ${request.status === 'rejected' ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    );
};

export default AdoptionRequests;
