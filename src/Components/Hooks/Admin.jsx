import { useContext } from 'react';
import { AuthContext } from '../Provider/Authprovider';
import AxiosSecure from './AxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Admin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = AxiosSecure();

    const { data: isAdmin, isLoading, isError } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) return false; // If no user email, return false
            const res = await axiosSecure.get(`/users/admin/${user.email}`);
            return res.data?.admin || false; // Fallback to `false` if not an admin
        },
        enabled: !!user?.email, // Prevent query from running if email is not available
    });

    return [ isAdmin, isLoading, isError] ;
};

export default Admin;
