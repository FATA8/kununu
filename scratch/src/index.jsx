import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";

import App from "./components/App.jsx";
import "./utils/api.js";

import "./sass/App.sass";

import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";


const initialState = {
    value: ["Starting..."]
};

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UPDATE":
            state = {
                ...state,
                value: [...state.value, action.payload]
            };
            break;
        default:
            break;
    }
    return state;
};

/*
/// I rather use redux-logger, but if we need something else, it would look like this:
const myLogger = (store) => (next) => (action) => {
    console.log("myLogger Action: ", action);
    next(action);
};
*/


const middleware = applyMiddleware(createLogger({collapsed: true}));
//applyMiddleware(myLogger, logger())

// do not need combineReducers
const store = createStore(
    combineReducers({header: headerReducer}),
    {},
    middleware
); // reducer is responsible for changing the state

store.subscribe(() => {
    console.log("Store updated! state =", store.getState());
});

store.dispatch({
    type: "UPDATE",
    payload: "Loading..."
});


//render(<App />, document.getElementById('app'));
render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector("#app"));