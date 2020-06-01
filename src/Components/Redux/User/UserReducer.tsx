import { UserEvents } from "./UserTypes";
import { Reducer } from "redux";
import { Types } from "../../Interfaces";
import * as actions from "./UserActions";
import { ActionType } from "typesafe-actions";

export type TestAction = ActionType<typeof actions>;

interface IUserReducerState extends Types.IUser, Types.IVehicles {
  isLoading: boolean;
  isLoaded: boolean;
  isImageLoading: boolean;
  isImageLoaded: boolean;
  users: Types.IUser[];
  token: string;
  error: string;
  isLoggedIn: boolean;
}

const user: IUserReducerState = {
  isImageLoaded: false,
  isImageLoading: false,
  isLoading: false,
  isLoaded: false,
  token: "",
  role: "",
  name: "",
  mail: "",
  age: 20,
  number: "",
  photo: null,
  gender: "Female",
  isLoggedIn: false,
  error: "",
  vehicles: [],
  users: [],
};

interface IUserAction {
  type: string;
  payload?: any;
}

export const userReducer: Reducer<IUserReducerState> = (
  state = user,
  action: IUserAction
) => {
  switch (action.type) {
    case UserEvents.USER_SIGNUP_SUCCESS:
    case UserEvents.USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };

    case UserEvents.LOGOUT_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case UserEvents.UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UserEvents.ADD_VEHICLE_SUCCESS:
    case UserEvents.GET_ALL_VEHICLES_SUCCESS:
    case UserEvents.GET_VEHICLES_SUCCESS:
      return {
        ...state,
        vehicles: action.payload ?? [],
        isLoading: false,
        isLoaded: true,
      };
    case UserEvents.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload ?? [],
        isLoading: false,
        isLoaded: true,
      };
    case UserEvents.GET_VEHICLES_FAILURE:
    case UserEvents.UPDATE_USER_FAILURE:
    case UserEvents.ADD_VEHICLE_FAILURE:
    case UserEvents.UPDATE_USER_IMAGE_FAILURE:
    case UserEvents.USER_LOGIN_FAILURE:
    case UserEvents.USER_SIGNUP_FAILURE:
    case UserEvents.GET_ALL_VEHICLES_FAILURE:
    case UserEvents.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UserEvents.GET_USER_IMAGE_FAILURE:
      return {
        ...state,
        isImageLoaded: false,
        isImageLoading: false,
      };
    case UserEvents.GET_VEHICLES:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case UserEvents.GET_ALL_VEHICLES:
    case UserEvents.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case UserEvents.GET_USER_IMAGE_SUCCESS:
    case UserEvents.UPDATE_USER_IMAGE_SUCCESS:
      return {
        ...state,
        photo: action.payload,
        isImageLoaded: true,
        isImageLoading: false,
      };
    case UserEvents.GET_USER_IMAGE:
      return {
        ...state,
        isImageLoading: true,
        isImageLoaded: false,
      };
    case UserEvents.UPDATE_USER_IMAGE:
    case UserEvents.USER_LOGIN_REQUEST:
    case UserEvents.USER_SIGNUP_REQUEST:
    case UserEvents.UPDATE_USER_REQUEST:
    case UserEvents.ADD_VEHICLE:

    default:
      return state;
  }
};
