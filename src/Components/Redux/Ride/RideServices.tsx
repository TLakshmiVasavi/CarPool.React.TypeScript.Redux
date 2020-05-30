import axios from "axios";
import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { RideActions } from "./RideActions";
import { store } from "../Store";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import rideActions from "./RideActions";

class RideService {
  offerRide(offerRide: Types.IOfferRide, userId: string) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/OfferRide?userId=" +
          store.getState().user.mail,
        offerRide
      )
      .then(() => store.dispatch(rideActions.OfferRideSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(rideActions.OfferRideFailureAction(error));
      });
  }

  bookRide(Request: Types.IBookRide, userId: string) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/BookRide?userId=" +
          store.getState().user.mail,
        Request
      )
      .then((response) => {
        store.dispatch(rideActions.BookRideResponseAction(response.data));
      })
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(rideActions.BookRideFailureAction(error));
      });
  }

  requestRide(
    Request: Types.IBookRide,
    noOfSeats: number,
    rideId: number,
    userId: string
  ) {
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
      .then(() => store.dispatch(rideActions.RequestRideSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(rideActions.RequestRideFailureAction(error));
      });
  }

  getOffers(userId: string) {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetOfferedRides?userId=" +
          store.getState().user.mail
      )
      .then((response) =>
        store.dispatch(rideActions.GetMyOffersSuccessAction(response.data))
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(rideActions.GetMyOffersFailureAction(error));
      });
  }

  getBookings(userId: string) {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetBookings?userId=" +
          store.getState().user.mail
      )
      .then((response) =>
        store.dispatch(rideActions.GetMyBookingsSuccessAction(response.data))
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(rideActions.GetMyBookingsFailureAction(error));
      });
  }

  approveRideRequest(
    requestId: number,
    rideId: number,
    isApprove: boolean,
    userId: string
  ) {
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
      .then(() => store.dispatch(rideActions.ApproveRequestSuccessAction()))
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(rideActions.ApproveRequestFailureAction(error));
      });
  }

  getRequests(rideId: number, userId: string) {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetRequests?userId=" +
          store.getState().user.mail +
          "&rideId=" +
          rideId
      )
      .then((response) =>
        store.dispatch(rideActions.GetRideRequestsSuccessAction(response.data))
      )
      .catch((error) => {
        toast.error("Server Not Responding");
        store.dispatch(rideActions.GetRideRequestsFailureAction(error));
      });
  }
}

export { RideService };
