import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { Reducer } from "redux";

const intialState: IRideReducerState = {
  isLoaded: false,
  offers: [],
  bookings: [],
  availableRides: [],
};

interface IRideReducerState
  extends Types.IMyOffers,
    Types.IBookRideResponse,
    Types.IMyBookings {
  isLoaded: boolean;
}
interface IRideAction {
  type: string;
  payload?: any;
}

export const rideReducer: Reducer<IRideReducerState> = (
  state = intialState,
  action: IRideAction
) => {
  switch (action.type) {
    case RideEvents.BOOK_RIDE_REQUEST:
      return {
        ...state,
        isLoaded: false,
        isRequested: true,
      };
    case RideEvents.BOOK_RIDE_RESPONSE:
      return {
        ...state,
        availableRides: action.payload,
        isLoaded: true,
      };
    case RideEvents.GET_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookings: action.payload ?? [],
      };
    case RideEvents.GET_MY_OFFERS_SUCCESS:
      return {
        ...state,
        offers: action.payload ?? [],
      };
    case RideEvents.GET_RIDE_REQUESTS:
      return {
        ...state,
        isRequestsLoaded: false,
      };
    case RideEvents.GET_RIDE_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload ?? [],
        isRequestsLoaded: true,
      };
    case RideEvents.OFFER_RIDE_REQUEST:
    case RideEvents.OFFER_RIDE_SUCCESS:
    case RideEvents.OFFER_RIDE_FAILURE:
    case RideEvents.BOOK_RIDE_FAILURE:
    case RideEvents.REQUEST_RIDE:
    case RideEvents.REQUEST_RIDE_SUCCESS:
    case RideEvents.REQUEST_RIDE_FAILURE:
    case RideEvents.GET_MY_BOOKINGS:
    case RideEvents.GET_MY_BOOKINGS_FAILURE:
    case RideEvents.GET_MY_OFFERS:
    case RideEvents.GET_MY_OFFERS_FAILURE:
    case RideEvents.GET_RIDE_REQUESTS_FAILURE:
    default:
      return state;
  }
};
