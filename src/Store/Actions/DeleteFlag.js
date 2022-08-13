import axiosInstance from "./../../Network/Config";

export const DeleteFlagThunk = (payload) => (dispatch) => {

    
  return dispatch({
    type: "DELETE_FLAG",
    payload,
  })
  


};