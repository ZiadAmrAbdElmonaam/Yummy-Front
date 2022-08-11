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
          // state.userCart = state.userCart.filter(obj => {
          //   return obj._id !== action.payload})
          let flag = true
         
          for (let i = 0; i < state.userCart.length; i++) {
            // console.log (typeof(state.userCart[i]._id));
            // console.log (typeof(action.payload.id))
            // console.log(type(action.payload));

            if(state.userCart[i]._id == action.payload.id){
                state.userCart.splice(i,1)
              console.log("99999999999999999999999999999")
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
  