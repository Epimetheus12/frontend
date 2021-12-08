import {requester, checkStatus} from '../../infrastructure';
import * as actionTypes from './actionTypes';


function loadProjectStart(){
    return{
        type: actionTypes.FETCH_PROJECTS_START
    }
}

export const loadProjectSuccess = (data) =>{
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
                dispatch(loadProjectSuccess(data.data))
            }).catch(err => {
            dispatch(loadProjectError(`${err.message}`));
        })
    };
};
