import axios from "axios";

const baseUrl = 'http://localhost:5000/';
const getToken=()=>localStorage.getItem("Token");
const axiosClient = axios.create({
    baseUrl:baseUrl,
    Headers:{
        'Content-Type':'application/json',
    },
})
axiosClient.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        return Promise.reject(error.response||
            {message:"An unknown error are occured"}
        );
    }   
);

axiosClient.interceptors.request.use(
    (config)=>{
        const token = getToken();
        if(token)
        {
            config.headers['Authorization']=`Bearer${token}`;
        }
        return config;
    }
    ,
    (error)=>{
        console.error('Request error:', error);
        return Promise.reject(error);
    }
)
export default axiosClient;