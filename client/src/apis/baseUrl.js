import axios from 'axios';

const baseRequest = axios.create();

baseRequest.interceptors.request.use(
    function (config) {
        const token = localStorage.token;
        if (token) config.headers.Authorization = token;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default baseRequest;