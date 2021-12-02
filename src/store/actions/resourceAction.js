import {requester, userService, checkStatus} from '../../infrastructure';
import * as actionTypes from './actionTypes';


function loadResourceStart(){
    return{
        type: actionTypes.FETCH_RESOURCES_START
    }
}

function loadResourceSuccess(data) {
    return {
        type: actionTypes.FETCH_RESOURCES_SUCCESS,
        data: data
    }
}

function loadResourceError(err) {
    return {
        type: actionTypes.FETCH_RESOURCES_ERROR,
        error: err
    }
}

export const fetchResourceAction = (projectId) => {
    return dispatch => {
        dispatch(loadResourceStart());
        requester.get(`/resource/project/?id=${projectId}`).then(checkStatus)
            .then(data => {
                dispatch(loadResourceSuccess(data.data))
            }).catch(err => {
            localStorage.clear();
            dispatch(loadResourceError(`${err.message}`));
        })
    };
};