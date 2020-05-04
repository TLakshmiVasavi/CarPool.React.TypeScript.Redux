import { IUser, IRideDetails } from "../../Interfaces";
export const BOOK_RIDE_RESPONSE = "BOOK_RIDE_RESPONSE";
export const BOOK_RIDE_REQUEST = "BOOK_RIDE_REQUEST";
export const BOOK_RIDE_SUCCESS = "BOOK_RIDE_SUCCESS";
export const BOOK_RIDE_FAILURE = "BOOK_RIDE_FAILURE";
export const OFFER_RIDE_REQUEST = "OFFER_RIDE_REQUEST";
export const OFFER_RIDE_SUCCESS = "OFFER_RIDE_SUCCESS";
export const OFFER_RIDE_FAILURE = "OFFER_RIDE_FAILURE";
export const REQUEST_RIDE = "REQUEST_RIDE";
export const GET_MY_BOOKINGS = "GET_MY_BOOKINGS";
export const GET_MY_BOOKINGS_SUCCESS = "GET_MY_BOOKINGS_SUCCESS";
export const GET_MY_OFFERS = "GET_MY_OFFERS";
export const GET_MY_OFFERS_SUCCESS = "GET_MY_OFFERS_SUCCESS";

export interface OfferRideRequest {
  type: typeof OFFER_RIDE_REQUEST;
}

export interface OfferRideSuccess {
  type: typeof OFFER_RIDE_SUCCESS;
}

export interface OfferRideFailure {
  type: typeof OFFER_RIDE_FAILURE;
}

export interface BookRideRequest {
  type: typeof BOOK_RIDE_REQUEST;
}

export interface BookRideResponse {
  type: typeof BOOK_RIDE_RESPONSE;
  payload: IRideDetails[];
}

export interface RequestRide {
  type: typeof REQUEST_RIDE;
}

export interface BookRideSuccess {
  type: typeof BOOK_RIDE_SUCCESS;
}

export interface BookRideFailure {
  type: typeof BOOK_RIDE_FAILURE;
}

export interface GetMyBookings {
  type: typeof GET_MY_BOOKINGS;
}

export interface GetMyBookingsSuccess {
  type: typeof GET_MY_BOOKINGS_SUCCESS;
  payload: IBooking[];
}

export interface GetMyOffers {
  type: typeof GET_MY_OFFERS;
}

export interface GetMyOffersSuccess {
  type: typeof GET_MY_OFFERS_SUCCESS;
  payload: IOfferedRide[];
}

export type RideAction =
  | GetMyOffersSuccess
  | GetMyOffers
  | GetMyBookingsSuccess
  | GetMyBookings
  | BookRideFailure
  | BookRideSuccess
  | RequestRide
  | BookRideResponse
  | BookRideRequest
  | OfferRideRequest
  | OfferRideSuccess
  | OfferRideFailure;
