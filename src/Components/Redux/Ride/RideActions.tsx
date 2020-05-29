import { RideEvents } from "./RideTypes";
import { Types } from "../../Interfaces";
import { createAction } from "typesafe-actions";
import { RideService } from "./RideService";
import { container } from "../../../inversify.config";
import { TYPES } from "../../Types";
import "reflect-metadata";
import { inject, injectable } from "inversify";

//const rideService: RideService = container.get<RideService>(TYPES.RideService);
//let rideService: RideService = container.get(RideService);
@injectable()
class RideActions {
  @inject(TYPES.RideService) private rideService: RideService;
  GetRideRequestsAction = createAction(RideEvents.GET_RIDE_REQUESTS, (rideId) =>
    this.rideService.getRequests(rideId)
  )();

  ApproveRequestAction = createAction(
    RideEvents.APPROVE_REQUEST,
    (requestId, rideId, isApprove) =>
      this.rideService.approveRideRequest(requestId, rideId, isApprove)
  )();

  ApproveRequestSuccessAction = createAction(
    RideEvents.APPROVE_REQUEST_SUCCESS
  )<void>();

  OfferRideRequestAction = createAction(RideEvents.OFFER_RIDE_REQUEST, (data) =>
    this.rideService.offerRide(data)
  )();

  OfferRideSuccessAction = createAction(RideEvents.OFFER_RIDE_SUCCESS)<void>();

  BookRideRequestAction = createAction(RideEvents.BOOK_RIDE_REQUEST, (data) =>
    this.rideService.bookRide(data)
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
    (request, noOfSeats, rideId) =>
      this.rideService.requestRide(request, noOfSeats, rideId)
  )();

  RequestRideSuccessAction = createAction(RideEvents.REQUEST_RIDE_SUCCESS)<
    void
  >();
  GetMyOffersAction = createAction(RideEvents.GET_MY_OFFERS, () =>
    this.rideService.getOffers()
  )();

  GetMyBookingsAction = createAction(RideEvents.GET_MY_BOOKINGS, () =>
    this.rideService.getBookings()
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
// let rideActions = new RideActions();
// export default rideActions;
export default RideActions;
