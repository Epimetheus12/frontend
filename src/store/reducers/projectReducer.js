import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../stateUtility";

const loadProjectStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const loadProjectSuccess = (state, action) => {
    return updateObject( state, {
        projectData: action.data,
        success: true,
        error: null,
        loading: false
    } );
};

const loadProjectError = (state, action) => {
    return updateObject( state, {
        error: action.error,
        success: false,
        loading: false
    });
};



export const projectReducer = (
    state = {
        projectData:null,
        success: false,
        error:null,
        loading: false
    }, action) =>{
    switch ( action.type ) {
        case actionTypes.FETCH_PROJECTS_START: return loadProjectStart(state, action);
        case actionTypes.FETCH_PROJECTS_SUCCESS: return loadProjectSuccess(state, action);
        case actionTypes.FETCH_PROJECTS_ERROR: return loadProjectError(state, action);
        default:
            return state;
    }
}
