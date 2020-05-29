import axios from "axios";
import { UserEvents } from "./UserTypes";
import { Types } from "../../Interfaces";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { store } from "../Store";
import "reflect-metadata";
import { injectable, inject } from "inversify";
import { container } from "../../../inversify.config";
import { TYPES } from "../../Types";
import UserActions from "./UserActions";

@injectable()
class UserService implements Types.IUserService {
  @inject(TYPES.UserActions) private userActions: UserActions;
  Login(user: Types.IAuthUser) {
    axios
      .post("https://localhost:5001/api/UserApi/Login", user)
      .then((response) => {
        if (response.data.isSuccess) {
          store.dispatch(
            this.userActions.UserLoginSuccessAction(response.data.user)
          );
          store.dispatch(this.userActions.GetUserImageAction());
        } else {
          toast.error(response.data.errorMessage);
          store.dispatch(
            this.userActions.UserLoginFailureAction(response.data.errorMessage)
          );
        }
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.UserLoginFailureAction(error));
      });
  }

  Logout() {
    axios
      .post(
        "https://localhost:5001/api/UserApi/Logout?userId=" +
          store.getState().user.mail
      )
      .then(() => store.dispatch(this.userActions.LogoutUserSuccess()));
  }

  Signup(user: Types.INewUser) {
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/SignUp", data)
      .then((response) =>
        store.dispatch(
          this.userActions.UserSignupSuccessAction(response.data.user)
        )
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.UserSignupFailureAction(error));
      });
  }

  UpdateUser(user: Types.IUser) {
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/UpdateUser", data)
      .then((response) => {
        store.dispatch(
          this.userActions.UpdateUserSuccessAction(response.data.user)
        );
        store.dispatch(this.userActions.GetUserImageAction());
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.UpdateUserFailureAction(error));
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
        store.dispatch(
          this.userActions.GetVehiclesSuccessAction(response.data)
        );
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.GetVehiclesFailureAction(error));
      });
  }

  addVehicle(vehicle: Types.IVehicle) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/AddVehicle?userId=" +
          store.getState().user.mail,
        vehicle
      )
      .then(() => store.dispatch(this.userActions.AddVehicleSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.AddVehicleFailureAction(error));
      });
  }

  updateBalance(data: Types.IWallet) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateBalance?userId=" +
          store.getState().user.mail,
        data
      )
      .then(() => store.dispatch(this.userActions.UpdateBalanceSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.UpdateBalanceFailureAction(error));
      });
  }

  getImage() {
    axios
      .get(
        "https://localhost:5001/api/UserApi/GetImage?userId=" +
          store.getState().user.mail
      )
      .then((response) => {
        store.dispatch(
          this.userActions.GetUserImageSuccessAction(response.data)
        );
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.GetUserImageFailureAction(error));
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
        store.dispatch(
          this.userActions.UpdateImageSuccessAction(response.data)
        );
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.userActions.UpdateImageFailureAction(error));
      });
  }
}

export { UserService };

// let userService = new UserService();
// export default userService;
