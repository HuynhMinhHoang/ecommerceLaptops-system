// userReducer.js
import { LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
  user: {
    idAccount: null,
    fullName: "",
    dateOfBirth: null,
    gender: "",
    address: "",
    email: "",
    phone: "",
    username: "",
    avt: null,
    status: "",
    role: "",
    access_token: "",
    refresh_token: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      const data = action.payload.data;
      console.log("--------------", data);
      return {
        ...state,
        user: {
          ...state.user,
          ...data,
          access_token: data.access_token,
          refresh_token: data.refresh_token,
        },
        isAuthenticated: true,
      };

    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        user: INITIAL_STATE.user,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default userReducer;
