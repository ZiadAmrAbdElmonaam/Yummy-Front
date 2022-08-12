// import React from "react";

import { type } from "@testing-library/user-event/dist/type";

const initialValue = {
  
    userCart: [],
   
  };
  
  export default function OrderThunkReducer(state = initialValue, action) {
    switch (action.type) {
      case "GET_ORDER":
        return {
       ...state,
       userCart: [...state.userCart, action.payload]
       

        };
  
        break;

        case "REMOVE_ITEM":
          
          let flag = true
         
          for (let i = 0; i < state.userCart.length; i++) {
          

            if(state.userCart[i]._id == action.payload.id){
                state.userCart.splice(i,1)
             
             break;
            }
          }
          return {
            ...state,
            userCart: [...state.userCart]
            
     
             };
         
  
        break;
  
      default:
        return state;
        break;
    }
  }
  