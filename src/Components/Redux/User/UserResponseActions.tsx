import React from "react";
import { UserEvents } from "./UserTypes";
import { createAction } from "typesafe-actions";
import { Types } from "../../Interfaces";
import { UserServices } from "./UserServices";
import { store } from "../Store";
import rideActions from "../Ride/RideActions";

class UserResponseActions {
  UpdateVehicleSuccessAction = createAction(
    UserEvents.UPDATE_VEHICLE_SUCCESS
  )();

  UpdateVehicleFailureAction = createAction(
    UserEvents.UPDATE_VEHICLE_FAILURE
  )();

  ChangePasswordFailureAction = createAction(
    UserEvents.CHANGE_PASSWORD_FAILURE_ACTION
  )();

  ChangePasswordSuccessAction = createAction(
    UserEvents.CHANGE_PASSWORD_SUCCESS_ACTION
  )();

  UserLoginFailureAction = createAction(UserEvents.USER_LOGIN_FAILURE)<
    string
  >();

  UserLoginSuccessAction = createAction(UserEvents.USER_LOGIN_SUCCESS)<
    Types.IUser
  >();

  GetAllVehiclesSuccessAction = createAction(
    UserEvents.GET_ALL_VEHICLES_SUCCESS
  )<Types.IVehicles>();

  GetAllVehiclesFailureAction = createAction(
    UserEvents.GET_ALL_VEHICLES_FAILURE
  )<string>();

  UpdateImageSuccessAction = createAction(UserEvents.UPDATE_USER_IMAGE_SUCCESS)<
    any
  >();

  UpdateImageFailureAction = createAction(UserEvents.UPDATE_USER_IMAGE_FAILURE)<
    string
  >();

  UpdateBalanceSuccessAction = createAction(UserEvents.UPDATE_BALANCE_SUCCESS)<
    void
  >();

  UpdateBalanceFailureAction = createAction(UserEvents.UPDATE_BALANCE_FAILURE)<
    string
  >();

  GetUserImageSuccessAction = createAction(UserEvents.GET_USER_IMAGE_SUCCESS)<
    Types.IImage
  >();

  GetUserImageFailureAction = createAction(UserEvents.GET_USER_IMAGE_FAILURE)<
    string
  >();

  LogoutUserSuccess = createAction(UserEvents.LOGOUT_USER_SUCCESS)<void>();

  UserSignupSuccessAction = createAction(UserEvents.USER_SIGNUP_SUCCESS)<
    Types.IUser
  >();

  UserSignupFailureAction = createAction(UserEvents.USER_SIGNUP_FAILURE)<
    string
  >();

  UpdateUserSuccessAction = createAction(UserEvents.UPDATE_USER_SUCCESS)<
    Types.IUser
  >();

  UpdateUserFailureAction = createAction(UserEvents.UPDATE_USER_FAILURE)<
    string
  >();

  AddVehicleSuccessAction = createAction(UserEvents.ADD_VEHICLE_SUCCESS)<
    Types.IVehicles
  >();

  AddVehicleFailureAction = createAction(UserEvents.ADD_VEHICLE_FAILURE)<
    string
  >();

  GetAllUsersSuccessAction = createAction(UserEvents.GET_ALL_USERS_SUCCESS)<
    Types.IUser[]
  >();

  GetAllUsersFailureAction = createAction(UserEvents.GET_ALL_USERS_FAILURE)<
    string
  >();

  GetVehiclesSuccessAction = createAction(UserEvents.GET_VEHICLES_SUCCESS)<
    Types.IVehicles
  >();

  GetVehiclesFailureAction = createAction(UserEvents.GET_VEHICLES_FAILURE)<
    string
  >();
}
export { UserResponseActions };
