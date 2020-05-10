export interface IAuthUser {
  [key: string]: string;
  id: string;
  password: string;
}

export interface INewUser {
  [key: string]: any;
  name: string;
  mail: string;
  password: string;
  age: number;
  number: string;
  photo: any;
  gender: string;
  hasVehicle: boolean;
  vehicle: IVehicle;
  vehicleType: string;
  showPassword: Boolean;
}

export interface IUser {
  [key: string]: any;
  name: string;
  mail: string;
  number: string;
  age: number;
  gender: string;
  photo?: any;
  isLoggedIn: boolean;
  disable: boolean;
}

export interface IRoute {
  [key: string]: any;
  from: string;
  to: string;
  stops: string[];
}

export interface IOfferRide {
  [key: string]: any;
  //id: number;
  noOfOfferedSeats: number;
  isChecked: Boolean;
  startDate: Date;
  route: IRoute;
  time: string;
  cost: number;
  vehicleNumber: string;
  availableVehicles: IVehicle[];
  firstHalf: boolean;
}

export interface IMyOffer {
  id: number;
  noOfOfferedSeats: number;
  startDate: Date;
  from: string;
  to: string;
  time: string;
  cost: number;
  vehicleNumber: string;
  rideStatus: string;
}

export interface IMyBooking {
  startDate: Date;
  from: string;
  to: string;
  time: string;
  providerName: string;
  cost: number;
  vehicleNumber: string;
  vehicleType: string;
  noOfSeats: number;
  requestStatus: string;
  rideStatus: string;
  providerPic: any;
}

export interface IBookRideResponse {
  availableRides: IAvailableRide[];
}

export interface IVehicle {
  [key: string]: any;
  model: string;
  number: string;
  capacity: number;
}

export interface IVehicles {
  vehicles: IVehicle[];
}

export interface IBookRide {
  [key: string]: any;
  from: string;
  to: string;
  startDate: Date;
  time: string;
  isChecked: boolean;
  vehicleType: string;
}

export interface IRideRequest {
  id: number;
  riderName: string;
  riderPic: any;
  from: string;
  to: string;
  noOfSeats: number;
  cost: number;
}

export interface IMyRides {
  Offers: IMyOffer[];
  Bookings: IMyBooking[];
}

export interface IMyOffers {
  offers: IMyOffer[];
}

export interface IMyBookings {
  bookings: IMyBooking[];
}

export interface IAvailableRide {
  id: number;
  vehicle: IVehicle;
  cost: number;
  providerName: string;
  providerId: string;
  providerPic: any;
  availableSeats: number;
}

export interface IRideRequests {
  requests: IRideRequest[];
}

// export interface IMRideDetails {
//   Id: number;
//   Source: string;
//   Destination: string;
//   StartDate: Date;
//   Time: string;
//   IsRideCompleted: string;
//   VehicleId: string;
// }

// export interface IOfferedRide {
//   [key: string]: any;
//   totalNoOfSeats: number;
//   noOfSeats: number;
//   isChecked: Boolean;
//   selectedDate: Date;
//   stops: string[];
//   from: string;
//   to: string;
//   time: string;
//   firstHalf: Boolean;
// }

// export interface IRides {
//   Bookings: IBooking[];
//   Offers: IOffer[];
// }
