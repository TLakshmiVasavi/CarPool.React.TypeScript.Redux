import {
  RideAction,
  OFFER_RIDE_REQUEST,
  OFFER_RIDE_SUCCESS,
  OFFER_RIDE_FAILURE,
  BOOK_RIDE_REQUEST,
  BOOK_RIDE_FAILURE,
  BOOK_RIDE_RESPONSE,
  REQUEST_RIDE,
  REQUEST_RIDE_SUCCESS,
  REQUEST_RIDE_FAILURE,
  GET_MY_BOOKINGS,
  GET_MY_BOOKINGS_SUCCESS,
  GET_MY_BOOKINGS_FAILURE,
  GET_MY_OFFERS,
  GET_MY_OFFERS_FAILURE,
  GET_MY_OFFERS_SUCCESS,
  APPROVE_REQUEST,
  APPROVE_REQUEST_SUCCESS,
  APPROVE_REQUEST_FAILURE,
  GET_RIDE_REQUESTS,
  GET_RIDE_REQUESTS_SUCCESS,
  GET_RIDE_REQUESTS_FAILURE,
} from "./RideTypes";
import {
  OfferRideRequest,
  OfferRideSuccess,
  OfferRideFailure,
  BookRideRequest,
  BookRideFailure,
  BookRideResponse,
  RequestRide,
  RequestRideSuccess,
  RequestRideFailure,
  GetMyBookings,
  GetMyBookingsSuccess,
  GetMyBookingsFailure,
  GetMyOffers,
  GetMyOffersSuccess,
  GetMyOffersFailure,
  ApproveRequest,
  ApproveRequestSuccess,
  ApproveRequestFailure,
  GetRideRequests,
  GetRideRequestsSuccess,
  GetRideRequestsFailure,
} from "./RideTypes";
import { Dispatch } from "redux";
import axios from "axios";
import {
  IOfferRide,
  IRideRequest,
  IBookRideResponse,
  IOffer,
  IBooking,
} from "../../Interfaces";
import { type } from "os";

export function OfferRide(offerRide: IOfferRide) {
  return (
    dispatch: Dispatch<OfferRideSuccess | OfferRideFailure>,
    getState: any
  ) => {
    dispatch(OfferRideRequest());
    axios
      .post(
        "https://localhost:5001/api/RideApi/OfferRide?userId=" +
          getState().user.Id,
        offerRide
      )
      .then(() => dispatch(OfferRideSuccess()))
      .catch((error) => dispatch(OfferRideFailure(error)));
  };
}

export function BookRide(Request: IRideRequest) {
  return (
    dispatch: Dispatch<BookRideResponse | BookRideFailure>,
    getState: any
  ) => {
    dispatch(BookRideRequest());
    axios
      .post(
        "https://localhost:5001/api/RideApi/BookRide?userId=" +
          getState().user.Id,
        Request
      )
      .then((response) => dispatch(BookRideResponse(response.data)))
      .catch((error) => dispatch(BookRideFailure(error)));
  };
}

export function RequestARide(Request: IRideRequest, RideId: number) {
  return (
    dispatch: Dispatch<RequestRideSuccess | RequestRideFailure>,
    getState: any
  ) => {
    dispatch(RequestRide());
    axios
      .post(
        "https://localhost:5001/api/RideApi/RequestRide?userId=" +
          getState().user.Id +
          "&rideId=" +
          RideId
      )
      .then(() => dispatch(RequestRideSuccess()))
      .catch((error) => dispatch(RequestRideFailure(error)));
  };
}

export function GetOffers() {
  return (
    dispatch: Dispatch<GetMyOffersSuccess | GetMyOffersFailure>,
    getState: any
  ) => {
    dispatch(GetMyOffers());
    axios
      .post(
        "https://localhost:5001/api/RideApi/GetOffers?userId=" +
          getState().user.Id
      )
      .then((response) => dispatch(GetMyOffersSuccess(response.data)))
      .catch((error) => dispatch(GetMyOffersFailure(error)));
  };
}

export function GetBookings() {
  return (
    dispatch: Dispatch<GetMyOffersSuccess | GetMyOffersFailure>,
    getState: any
  ) => {
    dispatch(GetMyBookings());
    axios
      .post(
        "https://localhost:5001/api/RideApi/GetBookings?userId=" +
          getState().user.Id
      )
      .then((response) => dispatch(GetMyBookingsSuccess(response.data)))
      .catch((error) => dispatch(GetMyBookingsFailure(error)));
  };
}

export function ApproveRideRequest(requestId: string) {
  return (
    dispatch: Dispatch<ApproveRequestSuccess | ApproveRequestFailure>,
    getState: any
  ) => {
    dispatch(ApproveRequest());
    axios
      .post(
        "https://localhost:5001/api/RideApi/ApproveRequest?userId=" +
          getState().user.Id
      )
      .then(() => dispatch(ApproveRequestSuccess()))
      .catch((error) => dispatch(ApproveRequestFailure(error)));
  };
}

export function GetRequests(rideId: string) {
  return (
    dispatch: Dispatch<ApproveRequestSuccess | ApproveRequestFailure>,
    getState: any
  ) => {
    dispatch(GetRideRequests());
    axios
      .post(
        "https://localhost:5001/api/RideApi/GetRequests?userId=" +
          getState().user.Id +
          "&rideId=" +
          rideId
      )
      .then(() => dispatch(GetRideRequestsSuccess()))
      .catch((error) => dispatch(GetRideRequestsFailure(error)));
  };
}

export function GetRideRequests() {
  return { type: typeof GET_RIDE_REQUESTS };
}

export function GetRideRequestsSuccess() {
  return { type: typeof GET_RIDE_REQUESTS_SUCCESS };
}

export function GetRideRequestsFailure(error: string) {
  return { type: typeof GET_RIDE_REQUESTS_FAILURE };
}

export function ApproveRequest() {
  return { type: typeof APPROVE_REQUEST };
}

export function ApproveRequestSuccess() {
  return { type: typeof APPROVE_REQUEST_SUCCESS };
}

export function ApproveRequestFailure(error: string) {
  return { type: typeof APPROVE_REQUEST_FAILURE };
}

export function OfferRideRequest() {
  return { type: typeof OFFER_RIDE_REQUEST };
}

export function OfferRideSuccess() {
  return { type: typeof OFFER_RIDE_SUCCESS };
}

export function OfferRideFailure(error: string) {
  return { type: typeof OFFER_RIDE_FAILURE };
}

export function BookRideRequest() {
  return { type: typeof BOOK_RIDE_REQUEST };
}

export function BookRideResponse(response: IBookRideResponse[]) {
  return { type: typeof BOOK_RIDE_RESPONSE };
}

export function BookRideFailure(error: string) {
  return { type: typeof BOOK_RIDE_FAILURE };
}

export function RequestRide() {
  return { type: typeof REQUEST_RIDE };
}

export function RequestRideSuccess() {
  return { type: typeof REQUEST_RIDE_SUCCESS };
}

export function RequestRideFailure(error: string) {
  return { type: typeof REQUEST_RIDE_FAILURE };
}

export function GetMyBookings() {
  return { type: typeof GET_MY_BOOKINGS };
}

export function GetMyBookingsSuccess(bookings: IBooking[]) {
  return { type: typeof GET_MY_BOOKINGS_SUCCESS };
}

export function GetMyBookingsFailure(error: string) {
  return { type: typeof GET_MY_BOOKINGS_FAILURE };
}

export function GetMyOffers() {
  return { type: typeof GET_MY_OFFERS };
}

export function GetMyOffersSuccess(myOffers: IOffer[]) {
  return { type: typeof GET_MY_OFFERS_SUCCESS };
}

export function GetMyOffersFailure(error: string) {
  return { type: typeof GET_MY_OFFERS_FAILURE };
}
