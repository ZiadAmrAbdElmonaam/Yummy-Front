import axiosInstance from "./../../Network/Config";

export const KetchenIdThunk = (payload) => (dispatch) => {
 
  return dispatch({
    type: "KETCHEN_ID",
    payload,
  })
  

}