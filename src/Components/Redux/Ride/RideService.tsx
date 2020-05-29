import axios from "axios";
import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
//import RideActions from "./RideActions";
import { store } from "../Store";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "reflect-metadata";
import { injectable, inject } from "inversify";
//import { injectable } from "../../../../node_modules/inversify";
import { container } from "../../../inversify.config";
//import { TYPES } from "./Types";
import { TYPES } from "../../Types";
import RideActions from "./RideActions";
//let RideActions = container.get<rideAction>(TYPES.RideActions);

@injectable()
class RideService implements Types.IRideService {
  @inject(TYPES.RideActions) private RideActions: RideActions;
  offerRide(offerRide: Types.IOfferRide) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/OfferRide?userId=" +
          store.getState().user.mail,
        offerRide
      )
      .then(() => store.dispatch(this.RideActions.OfferRideSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.RideActions.OfferRideFailureAction(error));
      });
  }

  bookRide(Request: Types.IBookRide) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/BookRide?userId=" +
          store.getState().user.mail,
        Request
      )
      .then((response) => {
        store.dispatch(this.RideActions.BookRideResponseAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.RideActions.BookRideFailureAction(error));
      });
  }

  requestRide(Request: Types.IBookRide, noOfSeats: number, rideId: number) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/RequestRide?userId=" +
          store.getState().user.mail +
          "&rideId=" +
          rideId +
          "&noOfSeats" +
          noOfSeats,
        Request
      )
      .then(() => store.dispatch(this.RideActions.RequestRideSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.RideActions.RequestRideFailureAction(error));
      });
  }

  getOffers() {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetOfferedRides?userId=" +
          store.getState().user.mail
      )
      .then((response) =>
        store.dispatch(this.RideActions.GetMyOffersSuccessAction(response.data))
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.RideActions.GetMyOffersFailureAction(error));
      });
  }

  getBookings() {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetBookings?userId=" +
          store.getState().user.mail
      )
      .then((response) =>
        store.dispatch(
          this.RideActions.GetMyBookingsSuccessAction(response.data)
        )
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.RideActions.GetMyBookingsFailureAction(error));
      });
  }

  approveRideRequest(requestId: number, rideId: number, isApprove: boolean) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/ApproveRequest?rideId=" +
          rideId +
          "&requestId" +
          requestId +
          "&isApprove" +
          isApprove +
          "&providerId" +
          store.getState().user.mail
      )
      .then(() =>
        store.dispatch(this.RideActions.ApproveRequestSuccessAction())
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.RideActions.ApproveRequestFailureAction(error));
      });
  }

  getRequests(rideId: number) {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetRequests?userId=" +
          store.getState().user.mail +
          "&rideId=" +
          rideId
      )
      .then((response) =>
        store.dispatch(
          this.RideActions.GetRideRequestsSuccessAction(response.data)
        )
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(this.RideActions.GetRideRequestsFailureAction(error));
      });
  }
}
// let rideService = new RideService();
// export default rideService;

export { RideService };
