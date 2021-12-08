import * as actionTypes from "./actionTypes";
import {checkStatus, requester} from "../../infrastructure";

function addColumnValueSuccess(data) {
    return {
        type: actionTypes.ADD_COLUMN_VALUE_SUCCESS,
        // data: data
    }
}

function addColumnValueError(err) {
    return {
        type: actionTypes.ADD_COLUMN_VALUE_ERROR,
        error: err
    }
}

function addColumnError(err) {
    return {
        type: actionTypes.ADD_COLUMN_ERROR,
        error: err
    }
}



export const addColumnAndValueAction = (projectId, columnName, formula, type, rid) => {
    return dispatch => {
        requester.put(`/column/add/?pid=${projectId}&&columnName=${columnName}&&formula=${formula}&&type=${type}`,).then(checkStatus)
            .then(data =>{
                requester.put(`/project/addResource/?rid=${rid}&&cid=${data.data.id}`).then(checkStatus)
                    .then(data => {
                        dispatch(addColumnValueSuccess(data.data))
                    }).catch(err => {
                    dispatch(addColumnValueError(`${err.message}`));
                })
            }).catch(err =>{
            dispatch(addColumnError(`${err.message}`))
        })
    };
}