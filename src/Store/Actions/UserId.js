import axiosInstance from "./../../Network/Config";

export const UserIdThunk = (payload) => (dispatch) => {
 
  return dispatch({
    type: "USER_ID",
    payload,
  })
  

}