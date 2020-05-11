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
  GET_VEHICLES,
  GET_VEHICLES_FAILURE,
  GET_VEHICLES_SUCCESS,
  ADD_VEHICLE,
  ADD_VEHICLE_FAILURE,
  ADD_VEHICLE_SUCCESS,
  GET_USER_IMAGE,
  GET_USER_IMAGE_FAILURE,
  GET_USER_IMAGE_SUCCESS,
  UPDATE_BALANCE_REQUEST,
  UPDATE_BALANCE_SUCCESS,
  UPDATE_BALANCE_FAILURE,
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
  AddVehicle,
  AddVehicleSuccess,
  AddVehicleFailure,
  GetVehicles,
  GetVehiclesFailure,
  GetVehiclesSuccess,
  LogoutUser,
  GetUserImage,
  GetUserImageFailure,
  GetUserImageSuccess,
  UpdateBalanceRequest,
  UpdateBalanceFailure,
  UpdateBalanceSuccess,
} from "./UserTypes";
import axios from "axios";
import {
  IUser,
  INewUser,
  IAuthUser,
  IVehicles,
  IVehicle,
} from "../../Interfaces";
import { Dispatch } from "redux";
import { AppState } from "../rootReducer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { DispatchProp } from "react-redux";

export function Login(user: IAuthUser) {
  return (dispatch: Dispatch<UserLoginSuccess | UserLoginFailure>) => {
    dispatch(UserLoginRequestAction(user));
    axios
      .post("https://localhost:5001/api/UserApi/Login", user)
      .then((response) => {
        if (response.data.isSuccess) {
          dispatch(UserLoginSuccessAction(response.data.user));
          dispatch(GetUserImageAction());
          axios
            .get(
              "https://localhost:5001/api/UserApi/GetImage?userId=" +
                response.data.user.mail
            )
            .then((response) =>
              dispatch(GetUserImageSuccessAction(response.data))
            )
            .catch((error) => dispatch(GetUserImageFailureAction(error)));
        } else {
          toast.error(response.data.errorMessage);
          dispatch(UserLoginFailureAction(response.data.errorMessage));
        }
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        dispatch(UserLoginFailureAction(error));
      });
  };
}

export function Logout() {
  return (dispatch: Dispatch<LogoutUser>, getState: AppState) => {
    axios
      .post(
        "https://localhost:5001/api/UserApi/Logout?userId=" +
          getState().user.mail
      )
      .then(() => dispatch(LogoutUserAction()));
  };
}

export function Signup(user: INewUser) {
  return (dispatch: Dispatch<UserSignupSuccess | UserSignupFailure>) => {
    dispatch(UserSignupRequestAction(user));
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/SignUp", data)
      .then((response) => dispatch(UserSignupSuccessAction(response.data.user)))
      .catch((error) => dispatch(UserSignupFailureAction(error)));
  };
}

export function UpdateUser(user: IUser) {
  return (
    dispatch: Dispatch<UpdateUserSuccess | UpdateUserFailure>,
    getState: AppState
  ) => {
    dispatch(UpdateUserRequestAction());
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post(
        "https://localhost:5001/api/UserApi/Update?userId=" +
          getState().user.mail,
        data
      )
      .then((response) => dispatch(UpdateUserSuccessAction(response.data.user)))
      .catch((error) => dispatch(UpdateUserFailureAction(error)));
  };
}

export function getVehicles() {
  return (
    dispatch: Dispatch<GetVehiclesSuccess | GetVehiclesFailure>,
    getState: AppState
  ) => {
    dispatch(GetVehiclesAction());
    axios
      .get(
        "https://localhost:5001/api/UserApi/GetVehicles?userId=" +
          getState().user.mail
      )
      .then((response) => {
        console.log(response.data);
        dispatch(GetVehiclesSuccessAction(response.data));
      })
      .catch((error) => dispatch(GetVehiclesFailureAction(error)));
  };
}

export function addVehicle(vehicle: IVehicle) {
  return (
    dispatch: Dispatch<AddVehicleSuccess | AddVehicleFailure>,
    getState: AppState
  ) => {
    dispatch(AddVehicleAction());
    axios
      .post(
        "https://localhost:5001/api/UserApi/AddVehicle?userId=" +
          getState().user.mail,
        vehicle
      )
      .then((response) => dispatch(AddVehicleSuccessAction()))
      .catch((error) => dispatch(AddVehicleFailureAction(error)));
  };
}

export function updateBalance(amount: number) {
  return (
    dispatch: Dispatch<UpdateBalanceSuccess | UpdateBalanceFailure>,
    getState: AppState
  ) => {
    dispatch(UpdateBalanceAction());
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateBalance?userId=" +
          getState().user.mail,
        amount
      )
      .then(() => dispatch(UpdateBalanceSuccessAction()))
      .catch(() => dispatch(UpdateBalanceFailureAction()));
  };
}

export function UpdateBalanceAction() {
  return {
    type: UPDATE_BALANCE_REQUEST,
  };
}

export function UpdateBalanceSuccessAction() {
  return {
    type: UPDATE_BALANCE_SUCCESS,
  };
}
export function UpdateBalanceFailureAction() {
  return {
    type: UPDATE_BALANCE_FAILURE,
  };
}
export function GetVehiclesAction() {
  return {
    type: GET_VEHICLES,
  };
}

export function GetVehiclesSuccessAction(vehicles: IVehicles) {
  return {
    type: GET_VEHICLES_SUCCESS,
    payload: vehicles,
  };
}

export function GetVehiclesFailureAction(error: string) {
  return {
    type: GET_VEHICLES_FAILURE,
    payload: error,
  };
}

export function UserLoginRequestAction(user: IAuthUser) {
  return {
    type: USER_LOGIN_REQUEST,
  };
}

export function UserLoginSuccessAction(user: IUser) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: user,
  };
}

export function UserLoginFailureAction(error: string) {
  return {
    type: USER_LOGIN_FAILURE,
    error,
  };
}

export function GetUserImageAction() {
  return {
    type: GET_USER_IMAGE,
  };
}

export function GetUserImageSuccessAction(response: any) {
  return {
    type: GET_USER_IMAGE_SUCCESS,
    payload: response,
  };
}

export function GetUserImageFailureAction(response: any) {
  return {
    type: GET_USER_IMAGE_FAILURE,
    payload: response,
  };
}

export function LogoutUserAction() {
  return {
    type: LOGOUT_USER,
  };
}

export function UserSignupRequestAction(user: INewUser) {
  return {
    type: USER_SIGNUP_REQUEST,
  };
}

export function UserSignupSuccessAction(user: IUser) {
  return {
    type: USER_SIGNUP_SUCCESS,
    payload: user,
  };
}

export function UserSignupFailureAction(error: string) {
  return {
    type: USER_SIGNUP_FAILURE,
    error,
  };
}

export function UpdateUserRequestAction() {
  return {
    type: UPDATE_USER_REQUEST,
  };
}

export function UpdateUserSuccessAction(user: IUser) {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
}

export function UpdateUserFailureAction(error: string) {
  return {
    type: UPDATE_USER_FAILURE,
    error,
  };
}

export function AddVehicleAction() {
  return {
    type: ADD_VEHICLE,
  };
}

export function AddVehicleSuccessAction() {
  return {
    type: ADD_VEHICLE_SUCCESS,
  };
}

export function AddVehicleFailureAction(error: string) {
  return {
    type: ADD_VEHICLE_FAILURE,
    error,
  };
}
