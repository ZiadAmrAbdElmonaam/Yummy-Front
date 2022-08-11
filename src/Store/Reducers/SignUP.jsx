// import React from "react";

const initialValue = {
  userList: [],
};
export default function SignUpThunkReducer(state = initialValue, action) {
  switch (action.type) {
    case "POST_THUNK_DATA":
      return {
        ...state,
        userList: action.payload,
      };

      break;

    default:
      return state;
      break;
  }
}
