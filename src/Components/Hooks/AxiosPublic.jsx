import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-haven-server-sigma.vercel.app'
})

const AxiosPublic = () => {
    return axiosPublic;
};

export default AxiosPublic;