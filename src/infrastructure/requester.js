import axios from "axios";

const BASE_URL = 'http://localhost:8080';

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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    get: (endpoint) => {
        instance.get(endpoint).then(checkStatus)
            .then(response =>{
                return response.data;
            })
    },

    post: (endpoint, data) => {
        return instance.post(endpoint, data)
        //     .then(checkStatus)
        //     .then(response => {
        //         return response.data;
        // })
    },

    put: (endpoint, data) => {
        instance.put(endpoint, data).then(checkStatus)
            .then(response => {
                return response.data;
            })
    },

    delete: (endpoint, data) => {
        instance.delete(endpoint, data).then(checkStatus)
            .then(response => {
                return response.data;
            })
    },
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        if (response.status === 403 && response.url === (BASE_URL + '/login')) {
            error.message = 'Incorrect credentials!';
            error.response = response;
            throw error;
        } else if (response.status === 403 && response.type === 'cors') {
            console.log('err response: ', response)
            error.message = 'Your JWT token is expired. Please log in!'
            error.status = 403;
            error.type = 'cors'
            throw error;
        } else if (response.status === 400) {
            console.log('err response: ', response)
            error.message = 'Error: Bad request'
            // error.message = response.message
            error.status = 400;
            error.type = 'cors'
            throw error;
        }
            // else if (response.status === 500) {
            //     console.log('err response: ', response)
            //     error.message = 'Something went wrong'
            //     error.status = 403;
            //     error.type = 'cors'
            //     throw error;
        // }
        else {
            return response.json();
        }
    }
}