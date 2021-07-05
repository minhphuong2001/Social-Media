import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use((config) => {
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data)
        return response.data;
    
    return response;
}, (error) => {
    if (error.response.data)
        return error.response.data;
    
    return {
        success: false,
        message: error.message
    }
})

export default axiosClient;