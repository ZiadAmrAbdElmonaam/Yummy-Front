import axiosInstance from "./../../Network/Config";

export const RemoveItemThunk = (payload) => (dispatch) => {

  return dispatch({
    type: "REMOVE_ITEM",
    payload,
  })
  

};


