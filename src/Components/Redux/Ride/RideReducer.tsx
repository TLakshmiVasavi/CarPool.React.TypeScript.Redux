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
} from "./RideTypes";

import { IBookRideResponse, IBooking, IOffer } from "../../Interfaces";

const RideReducer = (
  state: IOffer[] & IBookRideResponse[] & IBooking[],
  action: RideAction
) => {
  switch (action.type) {
    case OFFER_RIDE_REQUEST:
      return {
        ...state,
      };
    case OFFER_RIDE_SUCCESS:
      return {
        ...state,
      };
    case OFFER_RIDE_FAILURE:
      return {
        ...state,
        //error,
      };
    case BOOK_RIDE_REQUEST:
      return {
        ...state,
      };
    case BOOK_RIDE_FAILURE:
      return {
        ...state,
      };
    case BOOK_RIDE_RESPONSE:
      return {
        ...state,
        //...Bookings,
      };
    case REQUEST_RIDE:
      return {
        ...state,
      };
    case REQUEST_RIDE_SUCCESS:
      return {
        ...state,
      };
    case REQUEST_RIDE_FAILURE:
      return {
        ...state,
      };
    case GET_MY_BOOKINGS:
      return {
        ...state,
      };
    case GET_MY_BOOKINGS_SUCCESS:
      return {
        ...state,
        //...Bookings,
      };
    case GET_MY_BOOKINGS_FAILURE:
      return {
        ...state,
      };
    case GET_MY_OFFERS:
      return {
        ...state,
      };
    case GET_MY_OFFERS_FAILURE:
      return {
        ...state,
      };
    case GET_MY_OFFERS_SUCCESS:
      return {
        ...state,
      };
  }
};

export default RideReducer;
