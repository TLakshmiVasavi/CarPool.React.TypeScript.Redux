import React from "react";
import { UserEvents } from "./UserTypes";
import { createAction } from "typesafe-actions";
import { Types } from "../../Interfaces";
import userServices from "./UserServices";
import { store } from "../Store";

class userActions {
  UserLoginRequestAction = createAction(UserEvents.USER_LOGIN_REQUEST, (data) =>
    userServices.Login(data)
  )();

  UserLoginFailureAction = createAction(UserEvents.USER_LOGIN_FAILURE)<
    string
  >();

  UserLoginSuccessAction = createAction(UserEvents.USER_LOGIN_SUCCESS)<
    Types.IUser
  >();

  GetVehiclesAction = createAction(UserEvents.GET_VEHICLES, () =>
    userServices.getVehicles()
  )<void>();

  GetVehiclesSuccessAction = createAction(UserEvents.GET_VEHICLES_SUCCESS)<
    Types.IVehicles
  >();

  GetVehiclesFailureAction = createAction(UserEvents.GET_VEHICLES_FAILURE)<
    string
  >();

  UpdateImageAction = createAction(UserEvents.UPDATE_USER_IMAGE, (data) => {
    console.log(data);
    userServices.updateImage(data);
  });
  UpdateImageSuccessAction = createAction(UserEvents.UPDATE_USER_IMAGE_SUCCESS)<
    any
  >();
  UpdateImageFailureAction = createAction(UserEvents.UPDATE_USER_IMAGE_FAILURE)<
    string
  >();

  UpdateBalanceAction = createAction(
    UserEvents.UPDATE_BALANCE_REQUEST,
    (data) => userServices.updateBalance(data)
  )();

  UpdateBalanceSuccessAction = createAction(UserEvents.UPDATE_BALANCE_SUCCESS)<
    void
  >();

  UpdateBalanceFailureAction = createAction(UserEvents.UPDATE_BALANCE_FAILURE)<
    string
  >();

  GetUserImageAction = createAction(UserEvents.GET_USER_IMAGE, () =>
    userServices.getImage()
  )();

  GetUserImageSuccessAction = createAction(UserEvents.GET_USER_IMAGE_SUCCESS)<
    Types.IImage
  >();

  GetUserImageFailureAction = createAction(UserEvents.GET_USER_IMAGE_FAILURE)<
    string
  >();

  LogoutUserAction = createAction(UserEvents.LOGOUT_USER, () =>
    userServices.Logout()
  )();

  LogoutUserSuccess = createAction(UserEvents.LOGOUT_USER_SUCCESS)<void>();

  UserSignupRequestAction = createAction(
    UserEvents.USER_SIGNUP_REQUEST,
    (data) => userServices.Signup(data)
  )();

  UserSignupSuccessAction = createAction(UserEvents.USER_SIGNUP_SUCCESS)<
    Types.IUser
  >();

  UserSignupFailureAction = createAction(UserEvents.USER_SIGNUP_FAILURE)<
    string
  >();

  UpdateUserRequestAction = createAction(
    UserEvents.UPDATE_USER_REQUEST,
    (data) => userServices.UpdateUser(data)
  )();

  UpdateUserSuccessAction = createAction(UserEvents.UPDATE_USER_SUCCESS)<
    Types.IUser
  >();

  UpdateUserFailureAction = createAction(UserEvents.UPDATE_USER_FAILURE)<
    string
  >();

  AddVehicleAction = createAction(UserEvents.ADD_VEHICLE, (data) =>
    userServices.addVehicle(data)
  )();

  AddVehicleSuccessAction = createAction(UserEvents.ADD_VEHICLE_SUCCESS)<
    void
  >();

  AddVehicleFailureAction = createAction(UserEvents.ADD_VEHICLE_FAILURE)<
    string
  >();
}
let UserActions = new userActions();
export default UserActions;
export function getVehicles(
  isLoading: boolean,
  isLoaded: boolean
): Types.IVehicle[] {
  let x: Types.IVehicle[] = [];
  if (window.location.pathname == "/OfferRide" && !isLoaded && !isLoading) {
    store.dispatch(UserActions.GetVehiclesAction());
  } else if (isLoaded) {
    x =
      store.getState().user == undefined ? [] : store.getState().user?.vehicles;
  }
  return x;
}
