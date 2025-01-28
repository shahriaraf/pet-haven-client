import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Provider/Authprovider';


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext); // Check user authentication
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
