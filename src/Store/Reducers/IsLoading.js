// // import React from "react";
// import Store from "../Store";

// const initialValue = {
  
//     token:Store.getState().login.token
   
//   };
  
//   export default function IsLoadingThunkReducer(state = initialValue, action) {
    
//     console.log("isloading action here")
//     switch (action.type) {
//       case "EMPTY_TOKEN":
//         return {
//        ...state,
//        token: action.payload,
       

//         };
  
//         break;
  
//       default:{
//         console.log("state is ====> ")

//         console.log("state is ====> ", state)
//         return state;
//         break;
//       }
//     }
//   }
  