import axios from "axios";
import { UserEvents } from "./UserTypes";
import { Types } from "../../Interfaces";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { UserActions } from "./UserActions";
import { store } from "../Store";
import userActions from "./UserActions";

class UserServices {
  Login(user: Types.IAuthUser) {
    axios
      .post("https://localhost:5001/api/UserApi/Login", user)
      .then((response) => {
        if (response.data.isSuccess) {
          store.dispatch(
            userActions.UserLoginSuccessAction(response.data.user)
          );
          store.dispatch(
            userActions.GetUserImageAction(response.data.user.mail)
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

  Logout(userId: string) {
    axios
      .post("https://localhost:5001/api/UserApi/Logout?userId=" + userId)
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
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UserSignupFailureAction(error));
      });
  }

  UpdateUser(user: Types.IUser) {
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/UpdateUser", data)
      .then((response) => {
        store.dispatch(userActions.UpdateUserSuccessAction(response.data.user));
        store.dispatch(userActions.GetUserImageAction(response.data.user.mail));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateUserFailureAction(error));
      });
  }

  getVehicles(userId: string) {
    axios
      .get("https://localhost:5001/api/UserApi/GetVehicles?userId=" + userId)
      .then((response) => {
        console.log(response.data);
        store.dispatch(userActions.GetVehiclesSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetVehiclesFailureAction(error));
      });
  }

  addVehicle(vehicle: Types.IVehicle, userId: string) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/AddVehicle?userId=" + userId,
        vehicle
      )
      .then(() => store.dispatch(userActions.AddVehicleSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.AddVehicleFailureAction(error));
      });
  }

  updateBalance(data: Types.IWallet, userId: string) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateBalance?userId=" + userId,
        data
      )
      .then(() => store.dispatch(userActions.UpdateBalanceSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateBalanceFailureAction(error));
      });
  }

  getImage(userId: string) {
    axios
      .get("https://localhost:5001/api/UserApi/GetImage?userId=" + userId)
      .then((response) => {
        store.dispatch(userActions.GetUserImageSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetUserImageFailureAction(error));
      });
  }

  updateImage(Photo: Types.IImage, userId: string) {
    console.log(Photo.image);
    alert("hi");
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateImage?userId=" + userId,
        Photo.image
      )
      .then((response) => {
        store.dispatch(userActions.UpdateImageSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateImageFailureAction(error));
      });
  }
}
export { UserServices };
