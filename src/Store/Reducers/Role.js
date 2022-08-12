// import React from "react";

import { type } from "@testing-library/user-event/dist/type";

const initialValue = {
  
    role: "",
   
  };
  
  export default function RoleThunkReducer(state = initialValue, action) {
    switch (action.type) {
      case "Role_CHANGE":
        return {
       ...state,
       role:  action.payload
    

        };
  
        break;

  
      default:
        return state;
        break;
    }
  }
  