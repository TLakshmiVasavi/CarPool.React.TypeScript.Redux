import { Dispatch } from "redux";
import axios from "axios";
import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { AppState } from "../rootReducer";
import RideActions from "./RideActions";

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
  offerRide = function (offerRide: Types.IOfferRide) {
    return (
      dispatch: Dispatch<OfferRideSuccess | OfferRideFailure>,
      getState: AppState
    ) => {
      axios
        .post(
          "https://localhost:5001/api/RideApi/OfferRide?userId=" +
            getState().user.mail,
          offerRide
        )
        .then(() => dispatch(RideActions.OfferRideSuccessAction()))
        .catch((error) => dispatch(RideActions.OfferRideFailureAction(error)));
    };
  };

  bookRide = function (Request: Types.IBookRide) {
    return (
      dispatch: Dispatch<BookRideResponse | BookRideFailure>,
      getState: any
    ) => {
      axios
        .post(
          "https://localhost:5001/api/RideApi/BookRide?userId=" +
            getState().user.mail,
          Request
        )
        .then((response) => {
          dispatch(RideActions.BookRideResponseAction(response.data));
        })
        .catch((error) => dispatch(RideActions.BookRideFailureAction(error)));
    };
  };

  requestRide = function (
    Request: Types.IBookRide,
    noOfSeats: number,
    rideId: number
  ) {
    return (
      dispatch: Dispatch<RequestRideSuccess | RequestRideFailure>,
      getState: any
    ) => {
      axios
        .post(
          "https://localhost:5001/api/RideApi/RequestRide?userId=" +
            getState().user.mail +
            "&rideId=" +
            rideId +
            "&noOfSeats" +
            noOfSeats,
          Request
        )
        .then(() => dispatch(RideActions.RequestRideSuccessAction()))
        .catch((error) =>
          dispatch(RideActions.RequestRideFailureAction(error))
        );
    };
  };

  getOffers = function () {
    return (
      dispatch: Dispatch<GetMyOffersSuccess | GetMyOffersFailure>,
      getState: any
    ) => {
      axios
        .get(
          "https://localhost:5001/api/RideApi/GetOfferedRides?userId=" +
            getState().user.mail
        )
        .then((response) =>
          dispatch(RideActions.GetMyOffersSuccessAction(response.data))
        )
        .catch((error) =>
          dispatch(RideActions.GetMyOffersFailureAction(error))
        );
    };
  };

  getBookings = function () {
    return (
      dispatch: Dispatch<GetMyOffersSuccess | GetMyOffersFailure>,
      getState: any
    ) => {
      axios
        .get(
          "https://localhost:5001/api/RideApi/GetBookings?userId=" +
            getState().user.mail
        )
        .then((response) =>
          dispatch(RideActions.GetMyBookingsSuccessAction(response.data))
        )
        .catch((error) =>
          dispatch(RideActions.GetMyBookingsFailureAction(error))
        );
    };
  };

  approveRideRequest = function (
    requestId: number,
    rideId: number,
    isApprove: boolean
  ) {
    return (
      dispatch: Dispatch<ApproveRequestSuccess | ApproveRequestFailure>,
      getState: any
    ) => {
      axios
        .post(
          "https://localhost:5001/api/RideApi/ApproveRequest?rideId=" +
            rideId +
            "&requestId" +
            requestId +
            "&isApprove" +
            isApprove +
            "&providerId" +
            getState().user.mail
        )
        .then(() => dispatch(RideActions.ApproveRequestSuccessAction()))
        .catch((error) =>
          dispatch(RideActions.ApproveRequestFailureAction(error))
        );
    };
  };

  getRequests = function (rideId: number) {
    return (
      dispatch: Dispatch<ApproveRequestSuccess | ApproveRequestFailure>,
      getState: any
    ) => {
      axios
        .get(
          "https://localhost:5001/api/RideApi/GetRequests?userId=" +
            getState().user.mail +
            "&rideId=" +
            rideId
        )
        .then((response) =>
          dispatch(RideActions.GetRideRequestsSuccessAction(response.data))
        )
        .catch((error) =>
          dispatch(RideActions.GetRideRequestsFailureAction(error))
        );
    };
  };
}
let rideService = new RideService();
export default rideService;
