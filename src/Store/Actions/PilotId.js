import axiosInstance from "./../../Network/Config";

export const PilotIdThunk = (payload) => (dispatch) => {
 
  return dispatch({
    type: "PILOT_ID",
    payload,
  })
  

}