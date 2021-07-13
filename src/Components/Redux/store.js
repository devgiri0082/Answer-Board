import { createStore, applyMiddleware } from "redux";
import reducer from "./Reducer/reducer";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
let myLogger = createLogger();
let store = createStore(reducer, applyMiddleware(thunk, myLogger));
export default store;
