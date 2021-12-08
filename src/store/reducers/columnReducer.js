import {updateObject} from "../stateUtility";
import * as actionTypes from "../actions/actionTypes";

const addColumnValueSuccess = (state, action) => {
    return updateObject( state, { success: true, error: null} );
}

const addColumnValueError = (state, action) => {
    return updateObject(state, {success: false, error: action.error})
}

const addColumnError= (state, action) => {
    return updateObject(state, {success: false, error: action.error})
}

const addColumnValueReducer = (
    state = {
        success: false,
        error: null
    }, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_COLUMN_VALUE_SUCCESS: return addColumnValueSuccess(state, action);
        case actionTypes.ADD_COLUMN_VALUE_ERROR: return addColumnValueError(state, action);
        case actionTypes.ADD_COLUMN_ERROR: return addColumnError(state, action);
        default:
            return state;
    }
}

export {
    addColumnValueReducer
}