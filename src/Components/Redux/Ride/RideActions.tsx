import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { createAction } from "typesafe-actions";
import { RideService } from "./RideServices";
import { store } from "../Store";
const rideService = new RideService();
class RideActions {
  GetRideRequestsAction = createAction(
    RideEvents.GET_RIDE_REQUESTS,
    (rideId, userId) => rideService.getRequests(rideId, userId)
  )();

  ApproveRequestAction = createAction(
    RideEvents.APPROVE_REQUEST,
    (requestId, rideId, isApprove, userId) =>
      rideService.approveRideRequest(requestId, rideId, isApprove, userId)
  )();

  ApproveRequestSuccessAction = createAction(
    RideEvents.APPROVE_REQUEST_SUCCESS
  )<void>();

  OfferRideRequestAction = createAction(
    RideEvents.OFFER_RIDE_REQUEST,
    (data, userId) => rideService.offerRide(data, userId)
  )();

  OfferRideSuccessAction = createAction(RideEvents.OFFER_RIDE_SUCCESS)<void>();

  BookRideRequestAction = createAction(
    RideEvents.BOOK_RIDE_REQUEST,
    (data, userId) => rideService.bookRide(data, userId)
  )();

  OfferRideFailureAction = createAction(RideEvents.OFFER_RIDE_FAILURE)<
    string
  >();

  BookRideResponseAction = createAction(RideEvents.BOOK_RIDE_RESPONSE)<
    Types.IBookRideResponse
  >();

  BookRideFailureAction = createAction(RideEvents.BOOK_RIDE_FAILURE)<string>();

  RequestRideAction = createAction(
    RideEvents.REQUEST_RIDE,
    (request, noOfSeats, rideId, userId) =>
      rideService.requestRide(request, noOfSeats, rideId, userId)
  )();

  RequestRideSuccessAction = createAction(RideEvents.REQUEST_RIDE_SUCCESS)<
    void
  >();
  GetMyOffersAction = createAction(RideEvents.GET_MY_OFFERS, (userId) =>
    rideService.getOffers(userId)
  )();

  GetMyBookingsAction = createAction(RideEvents.GET_MY_BOOKINGS, (userId) =>
    rideService.getBookings(userId)
  )();

  GetMyBookingsSuccessAction = createAction(RideEvents.GET_MY_BOOKINGS_SUCCESS)<
    Types.IMyBookings
  >();

  GetMyBookingsFailureAction = createAction(RideEvents.GET_MY_BOOKINGS_FAILURE)<
    string
  >();

  GetMyOffersSuccessAction = createAction(RideEvents.GET_MY_OFFERS_SUCCESS)<
    Types.IMyOffers
  >();

  GetMyOffersFailureAction = createAction(RideEvents.GET_MY_OFFERS_FAILURE)<
    string
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
export { RideActions };

let rideActions = new RideActions();
export function getOffers(
  isLoading: boolean,
  isLoaded: boolean,
  userId: string
): Types.IMyOffer[] {
  let x: Types.IMyOffer[] = [];
  if (window.location.pathname == "/MyRides" && !isLoaded && !isLoading) {
    store.dispatch(rideActions.GetMyOffersAction(userId));
  } else if (isLoaded) {
    x = store.getState().ride == undefined ? [] : store.getState().ride?.Offers;
  }
  return x;
}
export function getBookings(
  isLoading: boolean,
  isLoaded: boolean,
  userId: string
): Types.IMyBooking[] {
  let x: Types.IMyBooking[] = [];
  if (window.location.pathname == "/MyRides" && !isLoaded && !isLoading) {
    store.dispatch(rideActions.GetMyBookingsAction(userId));
  } else if (isLoaded) {
    x =
      store.getState().ride == undefined ? [] : store.getState().ride?.bookings;
  }
  return x;
}
export default rideActions;
