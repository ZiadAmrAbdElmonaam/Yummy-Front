// import React from "react";

const initialValue = {
  
    token:"",
  };
  
  export default function LoginThunkReducer(state = initialValue, action) {
    switch (action.type) {
      case "GET_LOGIN_TOKEN":
        return {
       
          token: action.payload,
        };
  
        break;
  
      default:
        return state;
        break;
    }
  }
  