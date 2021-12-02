import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../stateUtility';

const loginStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const loginSuccess = (state, action) => {
    return updateObject( state, {
        token: action.token,
        username: action.username,
        success: true,
        error: null,
        loading: false
    } );
};

const loginError = (state, action) => {
    return updateObject( state, {
        error: action.error,
        success: false,
        loading: false
    });
};

const logoutSuccess = (state, action) => {
    return updateObject(state, { token: null, userId: null, success: false, error: null});
};

const registerSuccess = (state, action) => {
    return updateObject( state, { success: true, error: null} );
}

const registerError = (state, action) => {
    return updateObject(state, {success: false, error: action.error})
}

const redirect = (state, action) => {
    return updateObject(state, {success: false, error: null})
}

const loginReducer = ( state = {
    token: null,
    userId: null,
    error: null,
    success: false,
    loading: false,
}, action ) => {
    switch ( action.type ) {
        case actionTypes.LOGIN_START: return loginStart(state, action);
        case actionTypes.LOGIN_SUCCESS: return loginSuccess(state, action);
        case actionTypes.LOGIN_ERROR: return loginError(state, action);
        case actionTypes.LOGOUT_SUCCESS: return logoutSuccess(state, action);
        case actionTypes.REDIRECTED: return redirect(state, action);
        default:
            return state;
    }
};

const registerReducer = (state ={
    success: false,
    error: null
}, action) =>{
    switch ( action.type ) {
        case actionTypes.REGISTER_SUCCESS: return registerSuccess(state, action);
        case actionTypes.REGISTER_ERROR: return registerError(state, action);
        case actionTypes.REDIRECTED: return redirect(state, action);
        default:
            return state;
    }
}

export {
    loginReducer,
    registerReducer
}