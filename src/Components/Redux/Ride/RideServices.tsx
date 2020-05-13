import { Dispatch } from "redux";
import axios from "axios";
import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { AppState } from "../rootReducer";
import RideActions from "./RideActions";
import { store } from "../Store";

interface ApproveRequestSuccess {
  type: typeof RideEvents.APPROVE_REQUEST_SUCCESS;
}

interface ApproveRequestFailure {
  type: typeof RideEvents.APPROVE_REQUEST_FAILURE;
}

interface OfferRideSuccess {
  type: typeof RideEvents.OFFER_RIDE_SUCCESS;
}

interface OfferRideFailure {
  type: typeof RideEvents.OFFER_RIDE_FAILURE;
}

interface BookRideResponse {
  type: typeof RideEvents.BOOK_RIDE_RESPONSE;
  payload: Types.IBookRideResponse;
}

interface BookRideFailure {
  type: typeof RideEvents.BOOK_RIDE_FAILURE;
}

interface RequestRideSuccess {
  type: typeof RideEvents.REQUEST_RIDE_SUCCESS;
}

interface RequestRideFailure {
  type: typeof RideEvents.REQUEST_RIDE_FAILURE;
  error: string;
}

interface GetMyOffersSuccess {
  type: typeof RideEvents.GET_MY_OFFERS_SUCCESS;
  payload: Types.IMyOffer[];
}

interface GetMyOffersFailure {
  type: typeof RideEvents.GET_MY_OFFERS_FAILURE;
  error: string;
}
class RideService {
  offerRide(offerRide: Types.IOfferRide) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/OfferRide?userId=" +
          store.getState().user.mail,
        offerRide
      )
      .then(() => store.dispatch(RideActions.OfferRideSuccessAction()))
      .catch((error) =>
        store.dispatch(RideActions.OfferRideFailureAction(error))
      );
  }

  bookRide(Request: Types.IBookRide) {
    axios
      .post(
        "https://localhost:5001/api/RideApi/BookRide?userId=" +
          store.getState().user.mail,
        Request
      )
      .then((response) => {
        store.dispatch(RideActions.BookRideResponseAction(response.data));
      })
      .catch((error) =>
        store.dispatch(RideActions.BookRideFailureAction(error))
      );
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
      .then(() => store.dispatch(RideActions.RequestRideSuccessAction()))
      .catch((error) =>
        store.dispatch(RideActions.RequestRideFailureAction(error))
      );
  }

  getOffers() {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetOfferedRides?userId=" +
          store.getState().user.mail
      )
      .then((response) =>
        store.dispatch(RideActions.GetMyOffersSuccessAction(response.data))
      )
      .catch((error) =>
        store.dispatch(RideActions.GetMyOffersFailureAction(error))
      );
  }

  getBookings() {
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetBookings?userId=" +
          store.getState().user.mail
      )
      .then((response) =>
        store.dispatch(RideActions.GetMyBookingsSuccessAction(response.data))
      )
      .catch((error) =>
        store.dispatch(RideActions.GetMyBookingsFailureAction(error))
      );
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
      .then(() => store.dispatch(RideActions.ApproveRequestSuccessAction()))
      .catch((error) =>
        store.dispatch(RideActions.ApproveRequestFailureAction(error))
      );
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
        store.dispatch(RideActions.GetRideRequestsSuccessAction(response.data))
      )
      .catch((error) =>
        store.dispatch(RideActions.GetRideRequestsFailureAction(error))
      );
  }
}
let rideService = new RideService();
export default rideService;
