import { IUser, IVehicles } from "../../Interfaces";

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
export const GET_VEHICLES = "GET_VEHICLES";
export const GET_VEHICLES_SUCCESS = "GET_VEHICLES_SUCCESS";
export const GET_VEHICLES_FAILURE = "GET_VEHICLES_FAILURE";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const ADD_VEHICLE_SUCCESS = "ADD_VEHICLE_SUCCESS";
export const ADD_VEHICLE_FAILURE = "ADD_VEHICLE_FAILURE";
export const GET_USER_IMAGE_FAILURE = "GET_USER_IMAGE_FAILURE";
export const GET_USER_IMAGE_SUCCESS = "GET_USER_IMAGE_SUCCESS";
export const GET_USER_IMAGE = "GET_USER_IMAGE";

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

export interface GetVehicles {
  type: typeof GET_VEHICLES;
}

export interface GetVehiclesSuccess {
  type: typeof GET_VEHICLES_SUCCESS;
  payload: IVehicles;
}

export interface GetVehiclesFailure {
  type: typeof GET_VEHICLES_FAILURE;
  error: string;
}

export interface AddVehicle {
  type: typeof ADD_VEHICLE;
}

export interface AddVehicleSuccess {
  type: typeof ADD_VEHICLE_SUCCESS;
}

export interface AddVehicleFailure {
  type: typeof ADD_VEHICLE_FAILURE;
  error: string;
}

export interface GetUserImageSuccess {
  type: typeof GET_USER_IMAGE_SUCCESS;
  payload: any;
}

export interface GetUserImageFailure {
  type: typeof GET_USER_IMAGE_FAILURE;
  error: string;
}

export interface GetUserImage {
  type: typeof GET_USER_IMAGE;
}

export type UserAction =
  | UserLoginSuccess
  | UserLoginFailure
  | UserLoginRequest
  | LogoutUser
  | UserSignupRequest
  | UserSignupFailure
  | UserSignupSuccess
  | UpdateUserRequest
  | UpdateUserSuccess
  | UpdateUserFailure
  | GetVehicles
  | GetVehiclesSuccess
  | GetVehiclesFailure
  | AddVehicle
  | AddVehicleSuccess
  | AddVehicleFailure
  | GetUserImage
  | GetUserImageSuccess
  | GetUserImageFailure;
