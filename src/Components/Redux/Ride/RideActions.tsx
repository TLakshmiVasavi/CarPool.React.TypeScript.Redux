import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { createAction } from "typesafe-actions";
import { RideService } from "./RideServices";
import { store } from "../Store";

const rideService = new RideService();

class RideRequestActions {
  GetRideRequestsAction = createAction(
    RideEvents.GET_RIDE_REQUESTS,
    (rideId, userId, token) => rideService.getRequests(rideId, userId, token)
  )();

  ApproveRequestAction = createAction(
    RideEvents.APPROVE_REQUEST,
    (requestId, rideId, isApprove, userId, token) =>
      rideService.approveRideRequest(
        requestId,
        rideId,
        isApprove,
        userId,
        token
      )
  )();

  OfferRideRequestAction = createAction(
    RideEvents.OFFER_RIDE_REQUEST,
    (data, userId, token) => rideService.offerRide(data, userId, token)
  )();

  BookRideRequestAction = createAction(
    RideEvents.BOOK_RIDE_REQUEST,
    (data, userId, token) => rideService.bookRide(data, userId, token)
  )();

  RequestRideAction = createAction(
    RideEvents.REQUEST_RIDE,
    (request, noOfSeats, rideId, userId, token) =>
      rideService.requestRide(request, noOfSeats, rideId, userId, token)
  )();

  GetOffersAction = createAction(RideEvents.GET_OFFERS, (token) =>
    rideService.getOffers(token)
  )();

  GetMyOffersAction = createAction(RideEvents.GET_MY_OFFERS, (userId, token) =>
    rideService.getMyOffers(userId, token)
  )();

  GetBookingsAction = createAction(RideEvents.GET_BOOKINGS, (token) =>
    rideService.getBookings(token)
  )();

  GetMyBookingsAction = createAction(
    RideEvents.GET_MY_BOOKINGS,
    (userId, token) => rideService.getMyBookings(userId, token)
  )();
}

export { RideRequestActions };

let rideActions = new RideRequestActions();

export function getMyOffers(
  isLoading: boolean,
  isLoaded: boolean,
  userId: string,
  token: string
): Types.IMyOffer[] {
  let x: Types.IMyOffer[] = [];
  if (window.location.pathname == "/MyRides" && !isLoaded && !isLoading) {
    store.dispatch(rideActions.GetMyOffersAction(userId, token));
  } else if (isLoaded) {
    x = store.getState().ride == undefined ? [] : store.getState().ride?.Offers;
  }
  return x;
}

export function getOffers(
  isLoading: boolean,
  isLoaded: boolean,
  token: string
): Types.IMyOffer[] {
  let x: Types.IMyOffer[] = [];
  if (
    window.location.pathname == "/MyRides" ||
    (window.location.pathname == "/Admin/Rides" && !isLoaded && !isLoading)
  ) {
    store.dispatch(rideActions.GetOffersAction(token));
  } else if (isLoaded) {
    x = store.getState().ride == undefined ? [] : store.getState().ride?.Offers;
  }
  return x;
}

export function getBookings(
  isLoading: boolean,
  isLoaded: boolean,
  token: string
): Types.IMyBooking[] {
  let x: Types.IMyBooking[] = [];
  if (
    window.location.pathname == "/MyRides" ||
    (window.location.pathname == "/Admin/Bookings" && !isLoaded && !isLoading)
  ) {
    store.dispatch(rideActions.GetBookingsAction(token));
  } else if (isLoaded) {
    x =
      store.getState().ride == undefined ? [] : store.getState().ride?.bookings;
  }
  return x;
}

export function getMyBookings(
  isLoading: boolean,
  isLoaded: boolean,
  userId: string,
  token: string
): Types.IMyBooking[] {
  let x: Types.IMyBooking[] = [];
  if (window.location.pathname == "/MyRides" && !isLoaded && !isLoading) {
    store.dispatch(rideActions.GetMyBookingsAction(userId, token));
  } else if (isLoaded) {
    x =
      store.getState().ride == undefined ? [] : store.getState().ride?.bookings;
  }
  return x;
}

export default rideActions;
