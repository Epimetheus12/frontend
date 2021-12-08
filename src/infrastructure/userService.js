import React from 'react';
import { toast } from 'react-toastify';
import { ToastComponent } from '../components/common'

const BASE_URL = 'http://localhost:8080';

const atob = (str) => {
    return new Buffer(str, 'base64').toString('binary');
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getBaseUrl: () => {
        return BASE_URL;
    },

    isAuthenticated: () => {
        return window.localStorage.getItem('token') !== null
    },

    getPayload: () => {
        const token = localStorage.getItem('token')

        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload;
            }
        }
    },

    getUsername: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['sub'];
            }
        }
    },

    getCreatedTime: () =>{
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['createdTime'];
            }
        }
    },

    getUserId: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));

            if (payload) {
                return payload['id'];
            }
        }
    },

    getRole: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload) {
                return payload['role'][0]['authority'];
            }
        }
    },

    isTheUserLoggedIn: () => {
        const token = localStorage.getItem('token')
        // console.log("========================")
        if (token !== null && token !== undefined) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const username = payload['sub'];
                if (payload) {
                    if (username !== null && username !== undefined) {
                        return true;
                    }
                }
            } catch (err) {
                localStorage.clear();
                toast.error(<ToastComponent.errorToast text={'Unauthorized'} />, {
                    position: toast.POSITION.TOP_RIGHT
                });
                // throw new Error("Unauthorized");
            }
        }
        return false;
    },

    isRoot: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'][0]['authority'];

            if (payload) {
                if ((role !== null && role !== undefined) && role === 'ROOT') {
                    return true;
                }
            }
        }

        return false;
    },

    isAdmin: () => {
        const token = localStorage.getItem('token')
        if (token !== null && token !== undefined) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const role = payload['role'][0]['authority'];
            if (payload) {
                if ((role !== null && role !== undefined) && (role === 'ADMIN' || role === 'ROOT')) {
                    return true;
                }
            }
        }

        return false;
    }


    // isLoggedInUser(username) {
    //     const token = localStorage.getItem('token')
    //     if (token !== null && token !== undefined) {
    //         const payload = JSON.parse(atob(token.split('.')[1]));
    //
    //         if (payload) {
    //             const loggedInUserName = payload['sub'];
    //             if (username === loggedInUserName) {
    //                 return true;
    //             }
    //             return false;
    //         }
    //     }
    // }

}