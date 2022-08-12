import axiosInstance from "./../../Network/Config";

export const RoleThunk = (payload) => (dispatch) => {

    
  return dispatch({
    type: "Role_CHANGE",
    payload,
  })
  


};