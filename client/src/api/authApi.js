import axiosClient from "./axiosClient"

const authApi = {
    login: (useForm) => {
        const url = 'auth/login';

        return axiosClient.post(url, useForm);
    },

    register: (useForm) => {
        const url = 'auth/register';

        return axiosClient.post(url, useForm);
    },

    confirm: () => {
        const url = 'auth/confirm';

        return axiosClient.get(url);
    }

};

export default authApi;