import { IUser } from "../../Interfaces";

export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
export const USER_SIGNUP_REQUEST = "USER_SIGNUP_REQUEST";
export const USER_SIGNUP_SUCCESS = "USER_SIGNUP_SUCCESS";
export const USER_SIGNUP_FAILURE = "USER_SIGNUP_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

export interface UserLoginRequest {
  type: typeof USER_LOGIN_REQUEST;
}

export interface UserLoginSuccess {
  type: typeof USER_LOGIN_SUCCESS;
  payload: IUser;
}

export interface UserLoginFailure {
  type: typeof USER_LOGIN_FAILURE;
  error: string;
}

export interface UserSignupRequest {
  type: typeof USER_SIGNUP_REQUEST;
}

export interface UserSignupSuccess {
  type: typeof USER_SIGNUP_SUCCESS;
  payload: IUser;
}

export interface UserSignupFailure {
  type: typeof USER_SIGNUP_FAILURE;
  error: string;
}

export interface UpdateUserRequest {
  type: typeof UPDATE_USER_REQUEST;
}

export interface UpdateUserSuccess {
  type: typeof UPDATE_USER_SUCCESS;
  payload: IUser;
}

export interface UpdateUserFailure {
  type: typeof UPDATE_USER_FAILURE;
  error: string;
}

export interface LogoutUser {
  type: typeof LOGOUT_USER;
}

export type UserAction =
  | UserLoginSuccess
  | UserLoginFailure
  | UserLoginRequest
  | UserSignupRequest
  | UserSignupFailure
  | UserSignupSuccess
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFailure
  | LogoutUser;
