import React from "react";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import SignUpThunkReducer from "./SignUP";

export default combineReducers({
  signUp: SignUpThunkReducer,
});
