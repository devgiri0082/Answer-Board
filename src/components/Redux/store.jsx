import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import todoReducer from "./reducers/todoReducer"

let myLogger = createLogger();
export const store = createStore(todoReducer, applyMiddleware(myLogger, thunk));
