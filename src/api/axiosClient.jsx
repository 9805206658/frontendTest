import axios from "axios";

const baseUrl = 'https://backendtest-ddis.onrender.com'; 

// http://localhost:5000
// 'https://backendtest-ddis.onrender.com'; 


const getToken = () => localStorage.getItem("Token");

const axiosClient = axios.create({
    baseURL: baseUrl,  
    headers: {
        'Content-Type': 'application/json',  
    },
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        console.log(config.url);
        if(config.url == "createProduct")
        {  config.headers={
                'Content-Type': 'multipart/form-data',  
            }
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  
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
