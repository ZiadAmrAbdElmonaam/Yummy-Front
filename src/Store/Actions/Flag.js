import axiosInstance from "./../../Network/Config";

export const FlagThunk = (payload) => (dispatch) => {

    
  return dispatch({
    type: "FLAG_CHANGE",
    payload,
  })
  


};