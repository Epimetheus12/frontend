import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../stateUtility";

const loadResourceStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const loadResourceSuccess = (state, action) => {
    return updateObject( state, {
        resourceData: action.data,
        success: true,
        error: null,
        loading: false
    } );
};

const loadResourceError = (state, action) => {
    return updateObject( state, {
        error: action.error,
        success: false,
        loading: false
    });
};



const resourceReducer = (
    state = {
        resourceData:null,
        success: false,
        error:null,
        loading: false
    }, action) =>{
    switch ( action.type ) {
        case actionTypes.FETCH_RESOURCES_START: return loadResourceStart(state, action);
        case actionTypes.FETCH_RESOURCES_SUCCESS: return loadResourceSuccess(state, action);
        case actionTypes.FETCH_RESOURCES_ERROR: return loadResourceError(state, action);
        default:
            return state;
    }
}

export {
    resourceReducer
}