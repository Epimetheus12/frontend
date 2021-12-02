import {requester, userService, checkStatus} from '../../infrastructure';
import * as actionTypes from './actionTypes';


function loadProjectStart(){
    return{
        type: actionTypes.FETCH_PROJECTS_START
    }
}

function loadAllProjectSuccess(data) {
    return {
        type: actionTypes.FETCH_PROJECTS_SUCCESS,
        data: data
    }
}

function loadProjectError(err) {
    return {
        type: actionTypes.FETCH_PROJECTS_ERROR,
        error: err
    }
}

export const fetchAllProjectAction = () => {
    return dispatch => {
        dispatch(loadProjectStart());
        requester.get('/project/all').then(checkStatus)
            .then(data => {
                dispatch(loadAllProjectSuccess(data.data))
            }).catch(err => {
            localStorage.clear();
            dispatch(loadProjectError(`${err.message}`));
        })
    };
};
