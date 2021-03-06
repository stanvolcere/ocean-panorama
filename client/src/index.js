//import 'semantic-ui/dist/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from "redux";

import App from './components/App';
import reducers from './reducers';

// TODO: comment out before deployment
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, { authToken: localStorage.getItem("token") }, composeEnhancers(applyMiddleware(reduxThunk)));

ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.querySelector('#root')
);