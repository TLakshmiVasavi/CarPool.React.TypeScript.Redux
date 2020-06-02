import { UserEvents } from "./UserTypes";
import { Reducer } from "redux";
import { Types } from "../../Interfaces";
import * as actions from "./UserActions";
import { ActionType } from "typesafe-actions";

export type TestAction = ActionType<typeof actions>;

interface IUserReducerState
  extends Types.IUser,
    Types.IVehicles,
    Types.ITransactions {
  isTransactionsLoaded: boolean;
  isTransactionsLoading: boolean;
  isLoading: boolean;
  isLoaded: boolean;
  isUsersLoading: boolean;
  isUsersLoaded: boolean;
  isVehiclesLoading: boolean;
  isVehiclesLoaded: boolean;
  isImageLoading: boolean;
  isImageLoaded: boolean;
  users: Types.IUser[];
  transactions: Types.ITransaction[];
  token: string;
  error: string;
  isLoggedIn: boolean;
}

const user: IUserReducerState = {
  isTransactionsLoaded: false,
  isTransactionsLoading: false,
  isImageLoaded: false,
  isImageLoading: false,
  isLoading: false,
  isLoaded: false,
  isUsersLoading: false,
  isUsersLoaded: false,
  isVehiclesLoaded: false,
  isVehiclesLoading: false,
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
  balance: 0,
  vehicles: [],
  users: [],
  transactions: [],
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
      return user;
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
        isVehiclesLoading: false,
        isVehiclesLoaded: true,
      };
    case UserEvents.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload ?? [],
        isUsersLoading: false,
        isUsersLoaded: true,
      };
    case UserEvents.GET_TRANSACTIONS_FAILURE:
    case UserEvents.GET_VEHICLES_FAILURE:
    case UserEvents.UPDATE_USER_FAILURE:
    case UserEvents.ADD_VEHICLE_FAILURE:
    case UserEvents.UPDATE_USER_IMAGE_FAILURE:
    case UserEvents.USER_LOGIN_FAILURE:
    case UserEvents.USER_SIGNUP_FAILURE:
    case UserEvents.GET_ALL_VEHICLES_FAILURE:
    case UserEvents.GET_ALL_USERS_FAILURE:
    case UserEvents.GET_BALANCE_FAILURE:
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
    case UserEvents.GET_ALL_VEHICLES:
      return {
        ...state,
        isVehiclesLoading: true,
        isVehiclesLoaded: false,
      };

    case UserEvents.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        isUsersLoading: true,
        isUsersLoaded: false,
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
    case UserEvents.GET_BALANCE:
      return {
        ...state,
        isLoading: true,
        isLoaded: false,
      };
    case UserEvents.GET_BALANCE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        balance: action.payload,
      };
    case UserEvents.GET_TRANSACTIONS:
      return {
        ...state,
        isTransactionsLoaded: false,
        isTransactionsLoading: true,
      };
    case UserEvents.GET_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        isTransactionsLoaded: true,
        isTransactionsLoading: false,
        transactions: action.payload,
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
