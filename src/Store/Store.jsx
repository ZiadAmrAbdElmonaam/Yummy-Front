import { createStore, applyMiddleware } from "redux";
import combineReducers from "./Reducers/CombinedReducer";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

const Store = createStore(
  combineReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
export default Store;
