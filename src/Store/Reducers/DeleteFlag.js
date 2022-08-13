// import React from "react";

import { type } from "@testing-library/user-event/dist/type";

const initialValue = {
  
    deleteflag: false,
   
  };
  
  export default function DeleteFlagThunkReducer(state = initialValue, action) {
    switch (action.type) {
      case "DELETE_FLAG":
        return {
       ...state,
       deleteflag:  action.payload
    

        };
  
        break;

  
      default:
        return state;
        break;
    }
  }
  