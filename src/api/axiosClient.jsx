import axios from "axios";

const baseUrl = 'http://localhost:5000';
// 'https://backendtest-ddis.onrender.com'; 


const getToken = () => localStorage.getItem("token");
const axiosClient = axios.create({
    baseURL: baseUrl,  
    headers: {
        'Content-Type': 'application/json',  
    },
});

// configuration before sending request 
axiosClient.interceptors.request.use(

    (config) => {
        console.log(config);
        const token = getToken();
        // console.log(token);
        if(config.url == "createProduct")
        {  config.headers={
                'Content-Type': 'multipart/form-data',  
            }
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  
        }
        // console.log(config);
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// configuration after receiving response 

axiosClient.interceptors.response.use(
    (response) => {
        // console.log("enter response");
        return response;
    },
    (error) => {
        return Promise.reject(error.response || { message: "An unknown error occurred" });
    }
);
console.log(axiosClient);

export default axiosClient;
