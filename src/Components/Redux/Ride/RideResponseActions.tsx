import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { createAction } from "typesafe-actions";
import { RideService } from "./RideServices";
import { store } from "../Store";

class RideResponseActions {
  RequestRideSuccessAction = createAction(RideEvents.REQUEST_RIDE_SUCCESS)<
    void
  >();

  BookRideResponseAction = createAction(RideEvents.BOOK_RIDE_RESPONSE)<
    Types.IBookRideResponse
  >();

  ApproveRequestSuccessAction = createAction(
    RideEvents.APPROVE_REQUEST_SUCCESS
  )<void>();

  OfferRideFailureAction = createAction(RideEvents.OFFER_RIDE_FAILURE)<
    string
  >();

  OfferRideSuccessAction = createAction(RideEvents.OFFER_RIDE_SUCCESS)<void>();

  BookRideFailureAction = createAction(RideEvents.BOOK_RIDE_FAILURE)<string>();

  GetMyOffersFailureAction = createAction(RideEvents.GET_MY_OFFERS_FAILURE)<
    string
  >();

  GetBookingsSuccessAction = createAction(RideEvents.GET_BOOKINGS_SUCCESS)<
    Types.IMyBookings
  >();

  GetBookingsFailureAction = createAction(RideEvents.GET_BOOKINGS_FAILURE)<
    string
  >();

  GetMyBookingsSuccessAction = createAction(RideEvents.GET_MY_BOOKINGS_SUCCESS)<
    Types.IMyBookings
  >();

  GetMyBookingsFailureAction = createAction(RideEvents.GET_MY_BOOKINGS_FAILURE)<
    string
  >();

  GetOffersSuccessAction = createAction(RideEvents.GET_OFFERS_SUCCESS)<
    Types.IMyOffers
  >();

  GetOffersFailureAction = createAction(RideEvents.GET_OFFERS_FAILURE)<
    string
  >();

  GetMyOffersSuccessAction = createAction(RideEvents.GET_MY_OFFERS_SUCCESS)<
    Types.IMyOffers
  >();

  GetRideRequestsSuccessAction = createAction(
    RideEvents.GET_RIDE_REQUESTS_SUCCESS
  )<Types.IRideRequests>();

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

export { RideResponseActions };
