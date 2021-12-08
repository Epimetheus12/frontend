import axios from "axios";

const BASE_URL = 'http://localhost:8080';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: (endpoint) => {
        const getAuthHeader = () => {
            const token = localStorage.getItem("token");

            return (token && token.length)
                ? { 'Authorization': `Bearer ${token}` }
                : {}
        }

        const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 1000,
            headers: { ...getAuthHeader()}
        });
        return instance.get(endpoint)
            // .then(response =>{
            //     return response.data;
            // })
    },

    post: (endpoint, data) => {
        const getAuthHeader = () => {
            const token = localStorage.getItem("token");

            return (token && token.length)
                ? { 'Authorization': `Bearer ${token}` }
                : {}
        }

        const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 1000,
            headers: { ...getAuthHeader()}
        });
        return instance.post(endpoint, data)
        //     .then(checkStatus)
        //     .then(response => {
        //         return response.data;
        // })
    },

    put: (endpoint, data) => {
        const getAuthHeader = () => {
            const token = localStorage.getItem("token");

            return (token && token.length)
                ? { 'Authorization': `Bearer ${token}` }
                : {}
        }

        const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 1000,
            headers: { ...getAuthHeader()}
        });
        return instance.put(endpoint, data)

    },

    delete: (endpoint, data) => {
        const getAuthHeader = () => {
            const token = localStorage.getItem("token");

            return (token && token.length)
                ? { 'Authorization': `Bearer ${token}` }
                : {}
        }

        const instance = axios.create({
            baseURL: BASE_URL,
            timeout: 1000,
            headers: { ...getAuthHeader()}
        });
        instance.delete(endpoint, data)
            .then(response => {
                return response.data;
            })
    },
}
