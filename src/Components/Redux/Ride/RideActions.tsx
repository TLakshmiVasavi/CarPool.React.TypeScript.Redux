import { RideEvents } from "./RideTypes";
import {
  IBookRideResponse,
  IMyBookings,
  IMyOffers,
  IRideRequests,
} from "../../Interfaces";
import { createAction } from "typesafe-actions";

export default class RideActions {
  GetRideRequestsAction = createAction(RideEvents.GET_RIDE_REQUESTS)<void>();

  ApproveRequestAction = createAction(RideEvents.APPROVE_REQUEST)<void>();

  ApproveRequestSuccessAction = createAction(
    RideEvents.APPROVE_REQUEST_SUCCESS
  )<void>();

  OfferRideRequestAction = createAction(RideEvents.OFFER_RIDE_REQUEST)<void>();

  OfferRideSuccessAction = createAction(RideEvents.OFFER_RIDE_SUCCESS)<void>();

  BookRideRequestAction = createAction(RideEvents.BOOK_RIDE_REQUEST)<void>();

  OfferRideFailureAction = createAction(RideEvents.OFFER_RIDE_FAILURE)<
    string
  >();

  BookRideResponseAction = createAction(RideEvents.BOOK_RIDE_RESPONSE)<
    IBookRideResponse
  >();

  BookRideFailureAction = createAction(RideEvents.BOOK_RIDE_FAILURE)<string>();

  RequestRideAction = createAction(RideEvents.REQUEST_RIDE)<void>();

  RequestRideSuccessAction = createAction(RideEvents.REQUEST_RIDE_SUCCESS)<
    void
  >();
  GetMyOffersAction = createAction(RideEvents.GET_MY_OFFERS)<void>();

  GetMyBookingsAction = createAction(RideEvents.GET_MY_BOOKINGS)<void>();

  GetMyBookingsSuccessAction = createAction(RideEvents.GET_MY_BOOKINGS_SUCCESS)<
    IMyBookings
  >();

  GetMyBookingsFailureAction = createAction(RideEvents.GET_MY_BOOKINGS_FAILURE)<
    string
  >();

  GetMyOffersSuccessAction = createAction(RideEvents.GET_MY_OFFERS_SUCCESS)<
    IMyOffers
  >();

  GetMyOffersFailureAction = createAction(RideEvents.GET_MY_OFFERS_FAILURE)<
    string
  >();

  GetRideRequestsSuccessAction = createAction(
    RideEvents.GET_RIDE_REQUESTS_SUCCESS
  )<IRideRequests>();

  GetRideRequestsFailureAction = createAction(
    RideEvents.GET_RIDE_REQUESTS_FAILURE
  )<string>();

  ApproveRequestFailureAction = createAction(
    RideEvents.APPROVE_REQUEST_FAILURE
  )<string>();

  RequestRideFailureAction = createAction(RideEvents.REQUEST_RIDE_FAILURE)<
    string
  >();
}
