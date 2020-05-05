import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  LOGOUT_USER,
} from "./UserTypes";
import { UserAction } from "./UserTypes";
import { INewUser, IUser } from "../../Interfaces";
const intialState: IUser = {
  name: "",
  mail: "",
  age: 20,
  number: "",
  photo: null,
  gender: "Female",
  isLoggedIn: false,
  error: "",
};

const userReducer = (
  state: INewUser | IUser = intialState,
  action: UserAction
) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        ...state,
      };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    case UPDATE_USER_REQUEST:
      return {
        ...state,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export default userReducer;
