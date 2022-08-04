import React from "react";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import SignUpThunkReducer from "./SignUP";
import LoginThunkReducer from "./Login";

export default combineReducers({
  signUp: SignUpThunkReducer,
  login: LoginThunkReducer
});
