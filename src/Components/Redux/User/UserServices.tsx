import axios from "axios";
import { UserEvents } from "./UserTypes";
import { Types } from "../../Interfaces";
import { Dispatch } from "redux";
import { AppState } from "../rootReducer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import userActions from "./UserActions";

interface UpdateBalanceSuccess {
  type: typeof UserEvents.UPDATE_BALANCE_SUCCESS;
}

interface UpdateBalanceFailure {
  type: typeof UserEvents.UPDATE_BALANCE_FAILURE;
}

interface UserLoginSuccess {
  type: typeof UserEvents.USER_LOGIN_SUCCESS;
  payload: Types.IUser;
}

interface UserLoginFailure {
  type: typeof UserEvents.USER_LOGIN_FAILURE;
  error: string;
}

interface UserSignupSuccess {
  type: typeof UserEvents.USER_SIGNUP_SUCCESS;
  payload: Types.IUser;
}

interface UserSignupFailure {
  type: typeof UserEvents.USER_SIGNUP_FAILURE;
  error: string;
}

interface UpdateUserSuccess {
  type: typeof UserEvents.UPDATE_USER_SUCCESS;
  payload: Types.IUser;
}

interface UpdateUserFailure {
  type: typeof UserEvents.UPDATE_USER_FAILURE;
  error: string;
}

interface LogoutUser {
  type: typeof UserEvents.LOGOUT_USER;
}

interface GetVehiclesSuccess {
  type: typeof UserEvents.GET_VEHICLES_SUCCESS;
  payload: Types.IVehicles;
}

interface GetVehiclesFailure {
  type: typeof UserEvents.GET_VEHICLES_FAILURE;
  error: string;
}

interface AddVehicleSuccess {
  type: typeof UserEvents.ADD_VEHICLE_SUCCESS;
}

interface AddVehicleFailure {
  type: typeof UserEvents.ADD_VEHICLE_FAILURE;
  error: string;
}

export function Login(user: Types.IAuthUser) {
  return (dispatch: Dispatch<UserLoginSuccess | UserLoginFailure>) => {
    //dispatch(userActions.UserLoginRequestAction());
    axios
      .post("https://localhost:5001/api/UserApi/Login", user)
      .then((response) => {
        if (response.data.isSuccess) {
          dispatch(userActions.UserLoginSuccessAction(response.data.user));
          dispatch(userActions.GetUserImageAction());
          axios
            .get(
              "https://localhost:5001/api/UserApi/GetImage?userId=" +
                response.data.user.mail
            )
            .then((response) =>
              dispatch(userActions.GetUserImageSuccessAction(response.data))
            )
            .catch((error) =>
              dispatch(userActions.GetUserImageFailureAction(error))
            );
        } else {
          toast.error(response.data.errorMessage);
          dispatch(
            userActions.UserLoginFailureAction(response.data.errorMessage)
          );
        }
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        dispatch(userActions.UserLoginFailureAction(error));
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
      .then(() => dispatch(userActions.LogoutUserAction()));
  };
}

export function Signup(user: Types.INewUser) {
  return (dispatch: Dispatch<UserSignupSuccess | UserSignupFailure>) => {
    dispatch(userActions.UserSignupRequestAction(user));
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/SignUp", data)
      .then((response) =>
        dispatch(userActions.UserSignupSuccessAction(response.data.user))
      )
      .catch((error) => dispatch(userActions.UserSignupFailureAction(error)));
  };
}

export function UpdateUser(user: Types.IUser) {
  return (
    dispatch: Dispatch<UpdateUserSuccess | UpdateUserFailure>,
    getState: AppState
  ) => {
    dispatch(userActions.UpdateUserRequestAction());
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post(
        "https://localhost:5001/api/UserApi/Update?userId=" +
          getState().user.mail,
        data
      )
      .then((response) =>
        dispatch(userActions.UpdateUserSuccessAction(response.data.user))
      )
      .catch((error) => dispatch(userActions.UpdateUserFailureAction(error)));
  };
}

export function getVehicles() {
  return (
    dispatch: Dispatch<GetVehiclesSuccess | GetVehiclesFailure>,
    getState: AppState
  ) => {
    dispatch(userActions.GetVehiclesAction());
    axios
      .get(
        "https://localhost:5001/api/UserApi/GetVehicles?userId=" +
          getState().user.mail
      )
      .then((response) => {
        console.log(response.data);
        dispatch(userActions.GetVehiclesSuccessAction(response.data));
      })
      .catch((error) => dispatch(userActions.GetVehiclesFailureAction(error)));
  };
}

export function addVehicle(vehicle: Types.IVehicle) {
  return (
    dispatch: Dispatch<AddVehicleSuccess | AddVehicleFailure>,
    getState: AppState
  ) => {
    dispatch(userActions.AddVehicleAction());
    axios
      .post(
        "https://localhost:5001/api/UserApi/AddVehicle?userId=" +
          getState().user.mail,
        vehicle
      )
      .then(() => dispatch(userActions.AddVehicleSuccessAction()))
      .catch((error) => dispatch(userActions.AddVehicleFailureAction(error)));
  };
}

export function updateBalance(amount: number) {
  return (
    dispatch: Dispatch<UpdateBalanceSuccess | UpdateBalanceFailure>,
    getState: AppState
  ) => {
    dispatch(userActions.UpdateBalanceAction());
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateBalance?userId=" +
          getState().user.mail,
        amount
      )
      .then(() => dispatch(userActions.UpdateBalanceSuccessAction()))
      .catch((error) =>
        dispatch(userActions.UpdateBalanceFailureAction(error))
      );
  };
}
