// import React from "react";

import { type } from "@testing-library/user-event/dist/type";

const initialValue = {
  
    flag: false,
   
  };
  
  export default function FlagThunkReducer(state = initialValue, action) {
    switch (action.type) {
      case "FLAG_CHANGE":
        return {
       ...state,
       flag:  action.payload
    

        };
  
        break;

  
      default:
        return state;
        break;
    }
  }
  