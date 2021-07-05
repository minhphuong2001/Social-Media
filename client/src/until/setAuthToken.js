import axiosClient from "../api/axiosClient"

const setAuthToken = (token) => {
    if (token) {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else
        delete axiosClient.defaults.headers.common['Authorization'];
}

export default setAuthToken;