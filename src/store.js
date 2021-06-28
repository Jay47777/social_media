// import { createStore , applyMiddleware,compose} from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./reducer/rootReducer";
import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./reducer/userReducer";
import infoReducer from "./reducer/infoReducer";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)) )

const store = configureStore({
    reducer:{
        user:userReducer,
        info:infoReducer
    }
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;