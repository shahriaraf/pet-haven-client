import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://pet-haven-8d5ba.web.app/'
})

const AxiosPublic = () => {
    return axiosPublic;
};

export default AxiosPublic;