import axiosInstance from "./../../Network/Config";

export const OrderThunk = (item) => (dispatch) => {

    
  return dispatch({
    type: "GET_ORDER",
    payload: item
  })
  


};

