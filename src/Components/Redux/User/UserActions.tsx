import React from "react";
import { UserEvents } from "./UserTypes";
import { createAction } from "typesafe-actions";
import { Types } from "../../Interfaces";
import { UserServices } from "./UserServices";
import { store } from "../Store";
import rideActions from "../Ride/RideActions";

const userServices = new UserServices();
class UserRequestActions {
  GetBalanceRequestAction = createAction(
    UserEvents.GET_BALANCE,
    (userId, token) => userServices.getBalance(userId, token)
  )();
  UpdateVehicleRequestAction = createAction(
    UserEvents.UPDATE_VEHICLE,
    (data, userId, token, vehicleId) =>
      userServices.UpdateVehicle(data, userId, token, vehicleId)
  )();

  ChangePasswordRequestAction = createAction(
    UserEvents.CHANGE_PASSWORD_REQUEST_ACTION,
    (data, userId, token) => userServices.ChangePassword(data, userId, token)
  )();

  UserLoginRequestAction = createAction(UserEvents.USER_LOGIN_REQUEST, (data) =>
    userServices.Login(data)
  )();

  UpdateImageAction = createAction(
    UserEvents.UPDATE_USER_IMAGE,
    (data, userId, token) => {
      userServices.updateImage(data, userId, token);
    }
  )();

  GetUserImageAction = createAction(
    UserEvents.GET_USER_IMAGE,
    (userId, token) => userServices.getImage(userId, token)
  )();

  LogoutUserAction = createAction(UserEvents.LOGOUT_USER, (userId, token) =>
    userServices.Logout(userId, token)
  )();

  AddVehicleAction = createAction(
    UserEvents.ADD_VEHICLE,
    (data, userId, token) => userServices.addVehicle(data, userId, token)
  )();

  GetAllUsersAction = createAction(UserEvents.GET_ALL_USERS_REQUEST, (token) =>
    userServices.getAllUsers(token)
  )<void>();

  UpdateBalanceAction = createAction(
    UserEvents.UPDATE_BALANCE_REQUEST,
    (data, userId, token) => userServices.updateBalance(data, userId, token)
  )();

  GetAllVehiclesAction = createAction(UserEvents.GET_ALL_VEHICLES, (token) =>
    userServices.getAllVehicles(token)
  )<void>();

  GetVehiclesAction = createAction(UserEvents.GET_VEHICLES, (userId, token) =>
    userServices.getVehicles(userId, token)
  )<void>();

  UserSignupRequestAction = createAction(
    UserEvents.USER_SIGNUP_REQUEST,
    (data) => userServices.Signup(data)
  )();

  UpdateUserRequestAction = createAction(
    UserEvents.UPDATE_USER_REQUEST,
    (data, token) => userServices.UpdateUser(data, token)
  )();

  GetTransactions = createAction(UserEvents.GET_TRANSACTIONS, (userId, token) =>
    userServices.GetTransactions(userId, token)
  )();
}

export { UserRequestActions };

let userActions = new UserRequestActions();

export function getVehicles(
  isLoading: boolean,
  isLoaded: boolean,
  userId: string,
  token: string
): Types.IVehicle[] {
  let x: Types.IVehicle[] = [];
  if (
    (window.location.pathname == "/OfferRide" ||
      window.location.pathname == "/Profile") &&
    !isLoading &&
    !isLoaded
  ) {
    store.dispatch(userActions.GetVehiclesAction(userId, token));
  } else if (isLoaded) {
    x =
      store.getState().user == undefined ? [] : store.getState().user?.vehicles;
  }
  return x;
}

export function getAllVehicles(
  isLoading: boolean,
  isLoaded: boolean,
  token: string
): Types.IVehicle[] {
  let x: Types.IVehicle[] = [];
  if (
    window.location.pathname == "/Admin/Vehicles" &&
    !isLoading &&
    !isLoaded
  ) {
    store.dispatch(userActions.GetAllVehiclesAction(token));
  } else if (isLoaded) {
    x =
      store.getState().user == undefined ? [] : store.getState().user?.vehicles;
  }
  return x;
}

export function getAllUsers(
  isLoading: boolean,
  isLoaded: boolean,
  token: string
): Types.IUser[] {
  let x: Types.IUser[] = [];
  if (window.location.pathname == "/Admin/Users" && !isLoading && !isLoaded) {
    store.dispatch(userActions.GetAllUsersAction(token));
  } else if (isLoaded) {
    x = store.getState().user == undefined ? [] : store.getState().user?.users;
  }
  return x;
}

export function getUserImage(
  isImageLoading: boolean,
  isImageLoaded: boolean,
  userId: string,
  token: string,
  isLoggedIn: boolean
): any {
  let x: any = null;
  if (isLoggedIn && !isImageLoading && !isImageLoaded) {
    store.dispatch(userActions.GetUserImageAction(userId, token));
  } else if (isImageLoaded) {
    x =
      store.getState().user == undefined ? null : store.getState().user?.photo;
  }
  return x;
}

export function getBalance(
  isLoading: boolean,
  isLoaded: boolean,
  userId: string,
  token: string
): any {
  console.log("getBalance");
  let x: any = null;
  if (!isLoading && !isLoaded) {
    store.dispatch(userActions.GetBalanceRequestAction(userId, token));
  } else if (isLoaded) {
    x =
      store.getState().user == undefined
        ? null
        : store.getState().user?.balance;
  }
  return x;
}

export function getTransactions(
  isLoading: boolean,
  isLoaded: boolean,
  userId: string,
  token: string
): Types.ITransaction[] {
  let x: Types.ITransaction[] = [];
  if (!isLoading && !isLoaded) {
    store.dispatch(userActions.GetTransactions(userId, token));
  } else if (isLoaded) {
    x =
      store.getState().user == undefined
        ? null
        : store.getState().user?.transactions;
  }
  return x;
}

export default userActions;
