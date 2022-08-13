import axiosInstance from "./../../Network/Config";

export const SignUPThunk = (object) => (dispatch) => {
  return axiosInstance
    .post("/kitchen", object)
    .then((res) => {
      dispatch({
        type: "POST_THUNK_DATA",
        payload: res.data,
      });
    })
    .catch((error) => {
      if (error.res && error.res.status >= 400 && error.res.status <= 500) {
        // console.log("error from sign up thunk Actions");
        // setUserError("erroR", error.res.user.message);
      }
    });
};
