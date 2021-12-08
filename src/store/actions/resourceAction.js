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

function createResourceError(err) {
    return{
        type: actionTypes.CREATE_RESOURCE_ERROR,
        error: err
    }
}


function addResourceSuccess(data) {
    return {
        type: actionTypes.ADD_RESOURCE_SUCCESS,
        // data: data
    }
}

function addResourceError(err) {
    return {
        type: actionTypes.ADD_RESOURCE_ERROR,
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
            dispatch(loadResourceError(`${err.message}`));
        })
    };
}

export const addResourceAction = (projectId, name, code) => {
    return dispatch => {
        requester.put(`/resource/create/?name=${name}&&resourceCode=${code}`).then(checkStatus)
            .then(data =>{
                requester.post(`/project/addResource/?pid=${projectId}&&rid=${data.data.id}`).then(checkStatus)
                    .then(data => {
                        dispatch(addResourceSuccess(data.data))
                    }).catch(err => {
                        dispatch(addResourceError(`${err.message}`));
                })
            }).catch(err =>{
                dispatch(createResourceError(`${err.message}`))
        })
    };
}