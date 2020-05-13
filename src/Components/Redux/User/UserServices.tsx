import axios from "axios";
import { UserEvents } from "./UserTypes";
import { Types } from "../../Interfaces";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "../rootReducer";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import userActions from "./UserActions";
import { store } from "../Store";
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

interface GetImage {
  type: typeof UserEvents.GET_USER_IMAGE;
}

interface GetImageSuccess {
  type: typeof UserEvents.GET_USER_IMAGE_SUCCESS;
  payload: any;
}

interface GetImageFailure {
  type: typeof UserEvents.GET_USER_IMAGE_FAILURE;
  error: string;
}

class UserServices {
  Login(user: Types.IAuthUser) {
    axios
      .post("https://localhost:5001/api/UserApi/Login", user)
      .then((response) => {
        if (response.data.isSuccess) {
          store.dispatch(
            userActions.UserLoginSuccessAction(response.data.user)
          );
          store.dispatch(userActions.GetUserImageAction());
          axios
            .get(
              "https://localhost:5001/api/UserApi/GetImage?userId=" +
                response.data.user.mail
            )
            .then((response) =>
              store.dispatch(
                userActions.GetUserImageSuccessAction(response.data)
              )
            )
            .catch((error) =>
              store.dispatch(userActions.GetUserImageFailureAction(error))
            );
        } else {
          toast.error(response.data.errorMessage);
          store.dispatch(
            userActions.UserLoginFailureAction(response.data.errorMessage)
          );
        }
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UserLoginFailureAction(error));
      });
  }

  Logout() {
    axios
      .post(
        "https://localhost:5001/api/UserApi/Logout?userId=" +
          store.getState().user.mail
      )
      .then(() => store.dispatch(userActions.LogoutUserSuccess()));
  }

  Signup(user: Types.INewUser) {
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/SignUp", data)
      .then((response) =>
        store.dispatch(userActions.UserSignupSuccessAction(response.data.user))
      )
      .catch((error) =>
        store.dispatch(userActions.UserSignupFailureAction(error))
      );
  }

  UpdateUser(user: Types.IUser) {
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post(
        "https://localhost:5001/api/UserApi/Update?userId=" +
          store.getState().user.mail,
        data
      )
      .then((response) =>
        store.dispatch(userActions.UpdateUserSuccessAction(response.data.user))
      )
      .catch((error) =>
        store.dispatch(userActions.UpdateUserFailureAction(error))
      );
  }

  getVehicles() {
    axios
      .get(
        "https://localhost:5001/api/UserApi/GetVehicles?userId=" +
          store.getState().user.mail
      )
      .then((response) => {
        console.log(response.data);
        store.dispatch(userActions.GetVehiclesSuccessAction(response.data));
      })
      .catch((error) =>
        store.dispatch(userActions.GetVehiclesFailureAction(error))
      );
  }

  addVehicle(vehicle: Types.IVehicle) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/AddVehicle?userId=" +
          store.getState().user.mail,
        vehicle
      )
      .then(() => store.dispatch(userActions.AddVehicleSuccessAction()))
      .catch((error) =>
        store.dispatch(userActions.AddVehicleFailureAction(error))
      );
  }

  updateBalance(amount: number) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateBalance?userId=" +
          store.getState().user.mail,
        amount
      )
      .then(() => store.dispatch(userActions.UpdateBalanceSuccessAction()))
      .catch((error) =>
        store.dispatch(userActions.UpdateBalanceFailureAction(error))
      );
  }

  getImage() {
    axios
      .get(
        "https://localhost:5001/api/UserApi/GetVehicles?userId=" +
          store.getState().user.mail
      )
      .then((response) => {
        store.dispatch(userActions.GetUserImageSuccessAction(response.data));
      })
      .catch((error) => {
        store.dispatch(userActions.GetUserImageFailureAction(error));
      });
  }
}
let userServices = new UserServices();
export default userServices;
