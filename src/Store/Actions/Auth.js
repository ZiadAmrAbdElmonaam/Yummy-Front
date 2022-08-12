import axiosInstance from "./../../Network/Config";

export const AuthThunk = (payload) => (dispatch) => {

    
  return dispatch({
    type: "Auth_CHANGE",
    payload,
  })
  


};