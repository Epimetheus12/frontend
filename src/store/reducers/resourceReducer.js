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

const addResourceSuccess = (state, action) => {
    return updateObject( state, { success: true, error: null} );
}

const addResourceError = (state, action) => {
    return updateObject(state, {success: false, error: action.error})
}

const createResourceError = (state, action) => {
    return updateObject(state, {success: false, error: action.error})
}




const resourceReducer = (
    state = {
        resourceData:[],
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

const addResourceReducer = (
    state = {
        success: false,
        error: null
    }, action) => {
    switch ( action.type ) {
        case actionTypes.ADD_RESOURCE_SUCCESS: return addResourceSuccess(state, action);
        case actionTypes.ADD_RESOURCE_ERROR: return addResourceError(state, action);
        case actionTypes.CREATE_RESOURCE_ERROR: return createResourceError(state, action);
        default:
            return state;
    }
}

export {
    resourceReducer,
    addResourceReducer
}