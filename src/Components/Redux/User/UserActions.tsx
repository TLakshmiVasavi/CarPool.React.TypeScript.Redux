import React from "react";
import { UserEvents } from "./UserTypes";
import { createAction } from "typesafe-actions";
import {
  IUser,
  INewUser,
  IAuthUser,
  IVehicles,
  IVehicle,
  IImage,
} from "../../Interfaces";
export default class userActions {
  UpdateBalanceAction = createAction(UserEvents.UPDATE_BALANCE_REQUEST)<void>();
  UserLoginRequestAction = createAction(UserEvents.USER_LOGIN_REQUEST)<void>();
  UserLoginFailureAction = createAction(UserEvents.USER_LOGIN_FAILURE)<
    string
  >();
  UpdateBalanceSuccessAction = createAction(UserEvents.UPDATE_BALANCE_SUCCESS)<
    void
  >();
  UpdateBalanceFailureAction = createAction(UserEvents.UPDATE_BALANCE_FAILURE)<
    string
  >();
  GetVehiclesAction = createAction(UserEvents.GET_VEHICLES)<void>();
  GetVehiclesSuccessAction = createAction(UserEvents.GET_VEHICLES_SUCCESS)<
    IVehicles
  >();
  GetVehiclesFailureAction = createAction(UserEvents.GET_VEHICLES_FAILURE)<
    string
  >();
  UserLoginSuccessAction = createAction(UserEvents.USER_LOGIN_SUCCESS)<IUser>();
  GetUserImageAction = createAction(UserEvents.GET_USER_IMAGE)<void>();
  GetUserImageSuccessAction = createAction(UserEvents.GET_USER_IMAGE_SUCCESS)<
    IImage
  >();
  GetUserImageFailureAction = createAction(UserEvents.GET_USER_IMAGE_FAILURE)<
    string
  >();
  LogoutUserAction = createAction(UserEvents.LOGOUT_USER)<void>();
  UserSignupRequestAction = createAction(UserEvents.USER_SIGNUP_REQUEST)<
    INewUser
  >();
  UserSignupSuccessAction = createAction(UserEvents.USER_SIGNUP_SUCCESS)<
    IUser
  >();
  UserSignupFailureAction = createAction(UserEvents.USER_SIGNUP_FAILURE)<
    string
  >();
  UpdateUserRequestAction = createAction(UserEvents.UPDATE_USER_REQUEST)<
    void
  >();
  UpdateUserSuccessAction = createAction(UserEvents.UPDATE_USER_SUCCESS)<
    IUser
  >();
  UpdateUserFailureAction = createAction(UserEvents.UPDATE_USER_FAILURE)<
    string
  >();
  AddVehicleAction = createAction(UserEvents.ADD_VEHICLE)<void>();
  AddVehicleSuccessAction = createAction(UserEvents.ADD_VEHICLE_SUCCESS)<
    void
  >();
  AddVehicleFailureAction = createAction(UserEvents.ADD_VEHICLE_FAILURE)<
    string
  >();
}
