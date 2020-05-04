import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILURE,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  LOGOUT_USER,
} from "./UserTypes";
import {
  UserLoginSuccess,
  UserLoginFailure,
  UserLoginRequest,
  UserSignupRequest,
  UserSignupFailure,
  UserSignupSuccess,
  UpdateUserRequest,
  UpdateUserSuccess,
  UpdateUserFailure,
  LogoutUser,
} from "./UserTypes";
import axios from "axios";
import { IUser, INewUser, IAuthUser } from "../../Interfaces";
import { Dispatch } from "redux";

export function loginUser(user: IAuthUser) {
  return (dispatch: Dispatch<UserLoginSuccess | UserLoginFailure>) => {
    dispatch(UserLoginRequest(user));
    axios
      .post("https://localhost:5001/api/UserApi/Login", user)
      .then((response) => {
        if (response.data.isSuccess) {
          {
            dispatch(UserLoginSuccess(response.data.user));
          }
        } else {
          {
            dispatch(UserLoginFailure(response.data.errorMessage));
          }
        }
      })
      .catch((error) => dispatch(UserLoginFailure(error)));
  };
}

export function logoutUser(userId: string) {
  return (dispatch: Dispatch<LogoutUser>) => {
    axios
      .post("https://localhost:5001/api/UserApi/Logout", userId)
      .then(() => dispatch(LogoutUser()));
  };
}

export function SignupUser(user: INewUser) {
  return (dispatch: Dispatch<UserSignupSuccess | UserSignupFailure>) => {
    dispatch(UserSignupRequest(user));
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/SignUp", data)
      .then((response) => dispatch(UserSignupSuccess(response.data.user)))
      .catch((error) => dispatch(UserSignupFailure(error)));
  };
}

export function UpdateUser(user: IUser) {
  return (dispatch: Dispatch<UserSignupSuccess | UserSignupFailure>) => {
    dispatch(UpdateUserRequest(user));
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/Update", data)
      .then((response) => dispatch(UpdateUserSuccess(response.data.user)))
      .catch((error) => dispatch(UpdateUserFailure(error)));
  };
}

export function UserLoginRequest(user: IAuthUser) {
  return {
    type: USER_LOGIN_REQUEST,
  };
}

export function UserLoginSuccess(user: IUser) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  };
}

export function UserLoginFailure(error: string) {
  return {
    type: USER_LOGIN_FAILURE,
    error,
  };
}

export function LogoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function UserSignupRequest(user: INewUser) {
  return {
    type: USER_SIGNUP_REQUEST,
  };
}

export function UserSignupSuccess(user: IUser) {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: user,
  };
}

export function UserSignupFailure(error: string) {
  return {
    type: USER_SIGNUP_FAILURE,
    error,
  };
}

export function UpdateUserRequest(user: IUser) {
  return {
    type: UPDATE_USER_REQUEST,
  };
}

export function UpdateUserSuccess(user: IUser) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
}

export function UpdateUserFailure(error: string) {
  return {
    type: UPDATE_USER_FAILURE,
    error,
  };
}
