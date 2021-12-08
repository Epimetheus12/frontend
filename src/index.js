import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import serviceWorker from './serviceWorker';
import {loginReducer, registerReducer, projectReducer, resourceReducer, addResourceReducer, addColumnValueReducer} from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    project: projectReducer,
    resource: resourceReducer,
    addResource: addResourceReducer,
    addColumnValue: addColumnValueReducer
});

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
serviceWorker();
