import {requester, userService} from '../../infrastructure';
import * as actionTypes from './actionTypes';


function registerSuccess(data) {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        data: data
    }
}

function registerError(message) {
    return {
        type: actionTypes.REGISTER_ERROR,
        error: message
    }
}

export const loginStart = () => {
    return {
        type: actionTypes.LOGIN_START
    };
};

export const loginSuccess = (token, username) => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        token: token,
        username: username
    };
};

export const redirectAction = () => {
    return {
        type: actionTypes.REDIRECTED
    }
}

export const loginError = (error) => {
    return {
        type: actionTypes.LOGIN_ERROR,
        error: error
    };
};

export const logout = () => {
    localStorage.clear();
    return {
        type: actionTypes.LOGOUT_SUCCESS
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const loginAction = (username, password) => {
    return dispatch => {
        dispatch(loginStart());
        const authData = {
            username: username,
            password: password,
        };

        requester.post('/user/authenticate', authData)
            .then(data => {
                console.log(data);
                localStorage.setItem('token', data.data);
                console.log(userService.getPayload());
                dispatch(loginSuccess(data.data, userService.getUsername()))
        }).catch(err => {
            localStorage.clear();
            dispatch(loginError(`${err.message}`));
        })

    };
};

export const registerAction = (userData) => {
    return dispatch => {
        requester.post('/user/create', userData)
            .then(data =>{
            dispatch(registerSuccess(data))
        }).catch(err => {
            localStorage.clear();
            dispatch(registerError(`${err.message}`));
        })
    }
}


