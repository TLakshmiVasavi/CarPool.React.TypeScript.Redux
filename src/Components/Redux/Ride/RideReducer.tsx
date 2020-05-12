import { RideEvents } from "./RideTypes";

import {
  IBookRideResponse,
  IMyBooking,
  IMyOffer,
  IMyOffers,
  IMyBookings,
  IAvailableRide,
  IOfferRide,
  IRideRequest,
  IBookRide,
  IRideRequests,
} from "../../Interfaces";
import { Reducer } from "redux";

interface IBool {
  isLoaded: boolean;
  isRequested: boolean;
  isRequestsLoaded: boolean;
}

const intialState: IMyOffers & IBookRideResponse & IMyBookings & IBool = {
  isRequested: false,
  isLoaded: false,
  isRequestsLoaded: false,
  offers: [],
  bookings: [],
  availableRides: [],
};
interface IRideAction {
  type: string;
  payload: any;
}
interface IRideReducerState
  extends IMyOffers,
    IBookRideResponse,
    IMyBookings,
    IBool {}

export const rideReducer: Reducer<any> = (state = intialState, action) => {
  switch (action.type) {
    case RideEvents.OFFER_RIDE_REQUEST:
      return {
        ...state,
      };
    case RideEvents.OFFER_RIDE_SUCCESS:
      return {
        ...state,
      };
    case RideEvents.OFFER_RIDE_FAILURE:
      return {
        ...state,
      };
    case RideEvents.BOOK_RIDE_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isRequested: true,
      };
    case RideEvents.BOOK_RIDE_FAILURE:
      return {
        ...state,
      };
    case RideEvents.BOOK_RIDE_RESPONSE:
      return {
        ...state,
        availableRides: action.payload,
        isLoaded: true,
      };
    case RideEvents.REQUEST_RIDE:
      return {
        ...state,
      };
    case RideEvents.REQUEST_RIDE_SUCCESS:
      return {
        ...state,
      };
    case RideEvents.REQUEST_RIDE_FAILURE:
      return {
        ...state,
      };
    case RideEvents.GET_MY_BOOKINGS:
      return {
        ...state,
      };
    case RideEvents.GET_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload == undefined ? [] : action.payload,
      };
    case RideEvents.GET_MY_BOOKINGS_FAILURE:
      return {
        ...state,
      };
    case RideEvents.GET_MY_OFFERS:
      return {
        ...state,
      };
    case RideEvents.GET_MY_OFFERS_FAILURE:
      return {
        ...state,
      };
    case RideEvents.GET_MY_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payload == undefined ? [] : action.payload,
      };
    case RideEvents.GET_RIDE_REQUESTS:
      return {
        ...state,
        isRequestsLoaded: false,
      };
    case RideEvents.GET_RIDE_REQUESTS_FAILURE:
      return {
        ...state,
      };
    case RideEvents.GET_RIDE_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload == undefined ? [] : action.payload,
        isRequestsLoaded: true,
      };
    default:
      return state;
  }
};
