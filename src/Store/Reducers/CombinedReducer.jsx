import React from "react";
import { combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import SignUpThunkReducer from "./SignUP";
import LoginThunkReducer from "./Login";
import OrderThunkReducer from "./Orders";
import FlagThunkReducer from "./Flag";
import RoleThunkReducer from "./Role";
import DeleteFlagThunkReducer from "./DeleteFlag";
// import IsLoadingThunkReducer from "./IsLoading";



export default combineReducers({
  signUp: SignUpThunkReducer,
  login: LoginThunkReducer,
  orders: OrderThunkReducer,
  flag: FlagThunkReducer,
  role: RoleThunkReducer,
  deleteFlag: DeleteFlagThunkReducer
  // isloading: IsLoadingThunkReducer
});
