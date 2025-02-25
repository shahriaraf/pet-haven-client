import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./Provider/Authprovider";
import Admin from "./Hooks/Admin";



const AdminRoute = ({ children }) => {
    const {user, loading} = useContext(AuthContext);
    const [isAdmin, isLoading] = Admin();
    const location = useLocation();

    if (loading || isLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>

};

export default AdminRoute;