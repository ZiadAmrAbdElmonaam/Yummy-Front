import axiosInstance from "./../../Network/Config";

export const IsLoadingThunk = (payload) => (dispatch) => {
 
  return dispatch({
    type: "EMPTY_TOKEN",
    payload,
  })
  

}