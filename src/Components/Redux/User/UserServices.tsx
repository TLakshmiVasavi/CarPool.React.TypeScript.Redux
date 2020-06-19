import axios from "axios";
import { UserEvents } from "./UserTypes";
import { Types } from "../../Interfaces";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import userActions from "./UserActions";
import { store } from "../Store";
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
      {if (response.data.isSuccess) {
        store.dispatch(userActions.UserSignupSuccessAction(response.data.user))
      }else{
        toast.error(response.data.errorMessage)
        store.dispatch(userActions.UserSignupFailureAction(response.data.errorMessage));
      }}
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
        store.dispatch(userActions.GetUserImageAction());
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateUserFailureAction(error));
      });
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
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetVehiclesFailureAction(error));
      });
  }

  addVehicle(vehicle: Types.IVehicle) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/AddVehicle?userId=" +
          store.getState().user.mail,
        vehicle
      )
      .then(() => store.dispatch(userActions.AddVehicleSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.AddVehicleFailureAction(error));
      });
  }

  updateBalance(data: Types.IWallet) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateBalance?userId=" +
          store.getState().user.mail,
        data
      )
      .then(() => store.dispatch(userActions.UpdateBalanceSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateBalanceFailureAction(error));
      });
  }

  getImage() {
    axios
      .get(
        "https://localhost:5001/api/UserApi/GetImage?userId=" +
          store.getState().user.mail
      )
      .then((response) => {
        store.dispatch(userActions.GetUserImageSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetUserImageFailureAction(error));
      });
  }

  updateImage(Photo: Types.IImage) {
    console.log(Photo.image);
    alert("hi");
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateImage?userId=" +
          store.getState().user.mail,
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
let userServices = new UserServices();
export default userServices;
