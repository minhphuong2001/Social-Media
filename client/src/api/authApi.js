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
    },

    followFriend: (userId) => {
        const url = `auth/${userId}/follow`

        return axiosClient.put(url);
    },

    unfollowFriend: (userId) => {
        const url = `auth/${userId}/unfollow`

        return axiosClient.put(url);
    }

};

export default authApi;