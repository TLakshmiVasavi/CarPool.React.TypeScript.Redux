import React from "react";
import { UserEvents } from "./UserTypes";
import { createAction } from "typesafe-actions";
import { Types } from "../../Interfaces";
import { UserService } from "./UserService";
import { store } from "../Store";
import { container } from "../../../inversify.config";
import "reflect-metadata";
import { inject, injectable } from "inversify";
import { TYPES } from "../../Types";

//import userServices from "./UserService";
//const userServices: UserService = container.get<UserService>(TYPES.UserService);
//get(UserService);
// import getDecorators from "inversify-inject-decorators";
// const { lazyInject } = getDecorators(container);

@injectable()
class UserActions implements Types.IUserAction {
  //constructor(@inject(TYPES.UserService) private userService: UserService) {}
  @inject(TYPES.UserService) private userService: UserService;
  //let service:any=this.userService;
  UserLoginRequestAction = createAction(
    UserEvents.USER_LOGIN_REQUEST,
    (data) => {
      console.log(this);
      this.userService.Login(data);
    }
  )();

  UserLoginFailureAction = createAction(UserEvents.USER_LOGIN_FAILURE)<
    string
  >();

  UserLoginSuccessAction = createAction(UserEvents.USER_LOGIN_SUCCESS)<
    Types.IUser
  >();

  GetVehiclesAction = createAction(UserEvents.GET_VEHICLES, () =>
    this.userService.getVehicles()
  )<void>();

  GetVehiclesSuccessAction = createAction(UserEvents.GET_VEHICLES_SUCCESS)<
    Types.IVehicles
  >();

  GetVehiclesFailureAction = createAction(UserEvents.GET_VEHICLES_FAILURE)<
    string
  >();

  UpdateImageAction = createAction(UserEvents.UPDATE_USER_IMAGE, (data) => {
    console.log(data);
    this.userService.updateImage(data);
  });
  UpdateImageSuccessAction = createAction(UserEvents.UPDATE_USER_IMAGE_SUCCESS)<
    any
  >();
  UpdateImageFailureAction = createAction(UserEvents.UPDATE_USER_IMAGE_FAILURE)<
    string
  >();

  UpdateBalanceAction = createAction(
    UserEvents.UPDATE_BALANCE_REQUEST,
    (data) => this.userService.updateBalance(data)
  )();

  UpdateBalanceSuccessAction = createAction(UserEvents.UPDATE_BALANCE_SUCCESS)<
    void
  >();

  UpdateBalanceFailureAction = createAction(UserEvents.UPDATE_BALANCE_FAILURE)<
    string
  >();

  GetUserImageAction = createAction(UserEvents.GET_USER_IMAGE, () =>
    this.userService.getImage()
  )();

  GetUserImageSuccessAction = createAction(UserEvents.GET_USER_IMAGE_SUCCESS)<
    Types.IImage
  >();

  GetUserImageFailureAction = createAction(UserEvents.GET_USER_IMAGE_FAILURE)<
    string
  >();

  LogoutUserAction = createAction(UserEvents.LOGOUT_USER, () =>
    this.userService.Logout()
  )();

  LogoutUserSuccess = createAction(UserEvents.LOGOUT_USER_SUCCESS)<void>();

  UserSignupRequestAction = createAction(
    UserEvents.USER_SIGNUP_REQUEST,
    (data) => this.userService.Signup(data)
  )();

  UserSignupSuccessAction = createAction(UserEvents.USER_SIGNUP_SUCCESS)<
    Types.IUser
  >();

  UserSignupFailureAction = createAction(UserEvents.USER_SIGNUP_FAILURE)<
    string
  >();

  UpdateUserRequestAction = createAction(
    UserEvents.UPDATE_USER_REQUEST,
    (data) => this.userService.UpdateUser(data)
  )();

  UpdateUserSuccessAction = createAction(UserEvents.UPDATE_USER_SUCCESS)<
    Types.IUser
  >();

  UpdateUserFailureAction = createAction(UserEvents.UPDATE_USER_FAILURE)<
    string
  >();

  AddVehicleAction = createAction(UserEvents.ADD_VEHICLE, (data) =>
    this.userService.addVehicle(data)
  )();

  AddVehicleSuccessAction = createAction(UserEvents.ADD_VEHICLE_SUCCESS)<
    void
  >();

  AddVehicleFailureAction = createAction(UserEvents.ADD_VEHICLE_FAILURE)<
    string
  >();
}
//let UserActions = new userActions();
export default UserActions;
export function getVehicles(
  isLoading: boolean,
  isLoaded: boolean
): Types.IVehicle[] {
  let x: Types.IVehicle[] = [];
  // if (window.location.pathname == "/OfferRide" && !isLoaded && !isLoading) {
  //   store.dispatch(UserActions.GetVehiclesAction());
  // } else if (isLoaded) {
  //   x =
  //     store.getState().user == undefined ? [] : store.getState().user?.vehicles;
  // }
  return x;
}
