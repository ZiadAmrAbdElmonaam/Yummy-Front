// import React from "react";

const initialValue = {
  
    token:"",
    auth:true
  };
  
  export default function LoginThunkReducer(state = initialValue, action) {
    switch (action.type) {
      case "GET_LOGIN_TOKEN":
        return {
       ...state,
          token: action.payload,
          auth: true

        };
  
        break;
  
      default:
        return state;
        break;
    }
  }
  