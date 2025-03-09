import axios from "axios";

const baseUrl = 'https://backendtest-ddis.onrender.com';
const getToken = () => localStorage.getItem("Token");

const axiosClient = axios.create({
    baseURL: baseUrl,  // Fix: Correct key name
    headers: {
        'Content-Type': 'application/json',  // Fix: Lowercase 'headers'
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        console.log("enter request");
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Fix: Added space in "Bearer "
        }
        console.log(config);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response) => {
        console.log("enter response");
        return response;
    },
    (error) => {
        return Promise.reject(error.response || { message: "An unknown error occurred" });
    }
);
console.log(axiosClient);

export default axiosClient;
