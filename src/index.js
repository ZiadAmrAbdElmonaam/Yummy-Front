import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import Store from "./Store/Store";


// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { isConditionalExpression } from "typescript";






// axios.interceptors.request.use( (request) => {

//   console.log(55555555555555)

// const token = useSelector((state) => state.login.token);

//   request.headers.token = token ;
//   return request

// });

// if (token) {
//   request.headers['Authorization'] = 'Bearer ' + token;
//   request.headers.token = token ;
// }
// request.headers['Content-Type'] = 'application/json';
// return request;
// },
// error => {
// Promise.reject(error)

// For GET *** requests
// axios.interceptors.request.use(
//   (req) => {
//     console.log("in the interceptor")
//      // Add configurations here

//     console.log("headers == >  ", req.headers)

//      return req;
//   },
//   (err) => {
//     console.log("in the interceptor error")
//      return Promise.reject(err);
//   }
// );

// axios.interceptors.response.use( (response) => {

  
//     console.log(55555555555555555)
//     const token = useSelector((state) => state.login.token);

//     response.headers.token = token ;
//     return response
//   })

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
