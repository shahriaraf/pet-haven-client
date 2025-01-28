import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";

const axiosSecure = axios.create({
    baseURL: 'https://pet-haven-8d5ba.web.app/'
})

const AxiosSecure = () => {
    const navigate = useNavigate();
    const {signOutUser} = useContext(AuthContext);
    axiosSecure.interceptors.request.use(function (config) { 
        const token = localStorage.getItem('access-token')
        console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        console.log('status error in the interceptor', status);
        // if(status === 401 || status === 403){
        //     await signOutUser();
        //     navigate('/login')

        // }
        return Promise.reject(error);
    })
        return axiosSecure;
};

export default AxiosSecure;