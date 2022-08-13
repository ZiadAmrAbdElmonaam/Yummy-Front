import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Login from "../pages/Login/Login";
import { AuthThunk } from "../Store/Actions/Auth";
import { LoginThunk } from "../Store/Actions/Login";
import Store from "../Store/Store"



const axiosInstance = axios.create({
  
  baseURL: "http://localhost:8080",
});


axiosInstance.interceptors.request.use(
  
  (req) => {
    
    // console.log("in the interceptor" )
    if(req.url == "/login"){
      
      // console.log( "token is not found yet you still in page",req.url )
    }else  if(req.url == "pilot/signUp"){
      // console.log( "token is not found yet you still in page",req.url )
      
    }else { 
      // console.log(req.url , 55555)
      // console.log(req )
      
      // console.log(Store.getState() )
      
      //  let token = Store.getState().login.token;
      // console.log(Store.getState() ,)
      
      
      req.headers.Authorization = `Bearer` + " " + Store.getState().login.token;   
      
      
    }
    
    // let dispatch = useDispatch()
     // Add configurations here
     req.headers.ahmed = "ahmed in the header from axios instance";
     
      // req.headers.token = token;

    // console.log("headers == >  ", req.headers)

     return req;
  },
  (err) => {
    // console.log("in the interceptor error")
     return Promise.reject(err);
  }
);

// axiosInstance.interceptors.response.use(
  
//   (res) => {
    
//     // if ( (res.status == 401) || (res.status == 403) )
//     // if  (res.status == 403) {

      
      
//       console.log(        "response is ====>"    ,res.status)
//     //   // console.log(Store.getState() , 5555555555555555555555)
      
//     //   //  Store.getState().login.auth = false;
//     //   return console.log(        "response is ====>"    ,res.status) 
//     //   // return dispatch(AuthThunk(false))
//     // }
//     // else {

      
//     //   // res.headers.ahmed = "ahmed in the header from axios instance response";
      
//     //   // Add configurations here
      
      
//     //   return  console.log("res after else ==================>", res);
//     // }
    
  
//   },
//   (err) => {
//     // console.log("in the interceptor error")
//      return Promise.reject(err);
//   }
// );


export default axiosInstance;
