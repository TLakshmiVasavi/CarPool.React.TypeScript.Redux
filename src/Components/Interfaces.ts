export interface IBookRide {
  [key: string]: any;
  AvailableRides: IRideDetails[];
  isChecked: Boolean;
  selectedDate: Date;
  from: string;
  to: string;
  time: string;
}

export interface IRideDetails {
  Id: number;
  VehicleNumber: string;
  StartDate: Date;
  Cost: number;
  Provider: string;
  ProviderId: string;
  From: string;
  To: string;
}

export interface IAuthUser {
  [key: string]: string;
  id: string;
  password: string;
}

export interface IMRideDetails {
  Id: number;
  Source: string;
  Destination: string;
  StartDate: Date;
  Time: string;
  IsRideCompleted: string;
  VehicleId: string;
}

export interface IOfferedRide {
  [key: string]: any;
  totalNoOfSeats: number;
  noOfSeats: number;
  isChecked: Boolean;
  selectedDate: Date;
  stops: string[];
  from: string;
  to: string;
  time: string;
  firstHalf: Boolean;
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
  hasVehicle: string;
  vehicle: IVehicle;
  vehicleType: string;
  showPassword: Boolean;
}

export interface IVehicle {
  [key: string]: any;
  model: string;
  number: string;
  capacity: number;
}

export interface IUser{
  [key: string]: any;
  name: String;
  mail: String;
  number: String;
  age: number;
  gender: String;
  photo?: any;
  isLoggedIn:Boolean;
}