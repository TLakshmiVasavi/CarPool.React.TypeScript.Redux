import axios from "axios";
import { UserEvents } from "./UserTypes";
import { Types } from "../../Interfaces";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { UserResponseActions } from "./UserResponseActions";
import { store } from "../Store";
import { RideResponseActions } from "../Ride/RideResponseActions";
let rideActions = new RideResponseActions();
//import userActions from "./UserActions";
let userActions = new UserResponseActions();
class UserServices {
  GetTransactions(userId: string, token: string) {
    axios
      .get(
        "https://localhost:5001/api/UserApi/GetTransactions?userId=" + userId,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        store.dispatch(userActions.GetTransactionsSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetTransactionFailureAction(error));
      });
  }
  Login(user: Types.IAuthUser) {
    axios
      .post("https://localhost:5001/api/UserApi/Login", user)
      .then((response) => {
        if (response.data.isSuccess) {
          store.dispatch(userActions.UserLoginSuccessAction(response.data));
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

  Logout(userId: string, token: string) {
    store.dispatch(rideActions.ResetDataAction());
    axios
      .post(
        "https://localhost:5001/api/UserApi/Logout?userId=" + userId,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => {
        store.dispatch(userActions.LogoutUserSuccess());
      });
  }

  Signup(user: Types.INewUser) {
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/SignUp", data)
      .then((response) =>
        store.dispatch(userActions.UserSignupSuccessAction(response.data))
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UserSignupFailureAction(error));
      });
  }

  UpdateUser(user: Types.IUser, token: string) {
    const data = new FormData();
    Object.keys(user).map((i) => data.append(i, user[i]));
    axios
      .post("https://localhost:5001/api/UserApi/UpdateUser", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        store.dispatch(userActions.UpdateUserSuccessAction(response.data.user));
        // store.dispatch(
        //   userActions.GetUserImageAction(response.data.user.mail, "")
        // );
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateUserFailureAction(error));
      });
  }

  UpdateVehicle(
    data: Types.IVehicle,
    userId: string,
    token: string,
    vehicleId: string
  ) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateVehicle?userId=" +
          userId +
          "&vehicleId=" +
          vehicleId,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        toast.info("Vehicle Updated Successfully");
        store.dispatch(userActions.UpdateVehicleSuccessAction());
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateVehicleFailureAction());
      });
  }

  ChangePassword(data: Types.IChangePassword, userId: string, token: string) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/ChangePassword?userId=" + userId,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        toast.info(response.data);

        store.dispatch(userActions.ChangePasswordSuccessAction());
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.ChangePasswordFailureAction());
      });
  }

  getVehicles(userId: string, token: string) {
    axios
      .get("https://localhost:5001/api/UserApi/GetVehicles?userId=" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        store.dispatch(userActions.GetVehiclesSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetVehiclesFailureAction(error));
      });
  }

  getAllVehicles(token: string) {
    axios
      .get("https://localhost:5001/api/UserApi/GetAllVehicles", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        store.dispatch(userActions.GetAllVehiclesSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetAllVehiclesFailureAction(error));
      });
  }

  getAllUsers(token: string) {
    axios
      .get("https://localhost:5001/api/UserApi/GetAllUsers", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        console.log(response.data);
        store.dispatch(userActions.GetAllUsersSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetAllUsersFailureAction(error));
      });
  }

  addVehicle(vehicle: Types.IVehicle, userId: string, token: string) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/AddVehicle?userId=" + userId,
        vehicle,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) =>
        store.dispatch(userActions.AddVehicleSuccessAction(response.data))
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.AddVehicleFailureAction(error));
      });
  }

  updateBalance(data: Types.IWallet, userId: string, token: string) {
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateBalance?userId=" + userId,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => store.dispatch(userActions.UpdateBalanceSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateBalanceFailureAction(error));
      });
  }

  getImage(userId: string, token: string) {
    axios
      .get("https://localhost:5001/api/UserApi/GetImage?userId=" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        store.dispatch(userActions.GetUserImageSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetUserImageFailureAction(error));
      });
  }

  updateImage(Photo: any, userId: string, token: string) {
    const data = new FormData();
    data.append("Photo", Photo);
    axios
      .post(
        "https://localhost:5001/api/UserApi/UpdateImage?userId=" + userId,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        store.dispatch(userActions.UpdateImageSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.UpdateImageFailureAction(error));
      });
  }

  getBalance(userId: string, token: string) {
    axios
      .get("https://localhost:5001/api/UserApi/GetBalance?userId=" + userId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        store.dispatch(userActions.GetBalanceSuccessAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(userActions.GetBalanceFailureAction(error));
      });
  }
}
export { UserServices };
