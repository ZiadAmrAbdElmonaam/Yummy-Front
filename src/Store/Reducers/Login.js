// import React from "react";

import { useSelector } from "react-redux";
import Store from "../Store";

const initialValue = {
  
    token:"",
    auth:true,
     userId:0,
     ketchenId:0,
     PilotId:0
  };
  // let isloading = useSelector((state)=>{state.isloading.isLoading})
  export default function LoginThunkReducer(state = initialValue, action) {
   
    // if(isloading){
    switch (action.type) {
      case "GET_LOGIN_TOKEN":
        return {
       ...state,
          token: action.payload,
          auth: true

        };
      
        break;
        case "EMPTY_TOKEN":
          return {
         ...state,
            token: action.payload,
          
  
          };


          case "Auth_CHANGE" :
            return {
           ...state,
             auth: action.payload,
            
    
            };





        
          break;
          case "USER_ID":
            return {
           ...state,
           userId: action.payload,
            
    
            };
          
            break;
           
            case "KETCHEN_ID":
            return {
           ...state,
           ketchenId: action.payload,
            
    
            };
          
            break;

            case  "PILOT_ID":
              return {
             ...state,
             PilotId: action.payload,
              
      
              };
            
              break;


      default:
        return state;
        break;
    }
  // }
  }
  