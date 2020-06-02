import React from "react";
import { Switch, Route } from "react-router-dom";
import LoginSignUp from "./LoginSignUp";
import Dashboard from "./DashBoard";
import MyRides from "./MyRides";
import BookRide from "./BookRide";
import UserProfile from "./UserProfile";
import OfferRide from "./OfferRide";
import AddVehicle from "./AddVehicle";
import Wallet from "./Wallet";
import { Redirect } from "react-router-dom";
import Vehicles from "./Vehicles";
import Rides from "./OfferedRides";
import Bookings from "./BookedRides";
import ChangePassword from "./ChangePassword";
import Users from "./Users";

export default function Routes() {
  return (
    <Switch>
      <Route path="/Admin/Users" component={Users} />
      <Route path="/Admin/Rides" component={Rides} />
      <Route path="/Admin/Bookings" component={Bookings} />
      <Route path="/Admin/Vehicles" component={Vehicles} />
      <Route path="/(Login|SignUp|)/" component={LoginSignUp} />
      <Route path="/Profile" component={UserProfile} />
      <Route path="/MyRides" component={MyRides} />
      <Route path="/OfferRide" component={OfferRide} />
      <Route path="/BookRide" component={BookRide} />
      <Route path="/AddVehicle" component={AddVehicle} />
      <Route path="/Wallet" component={Wallet} />
      <Route path="/Dashboard" component={Dashboard} />
      <Route path="/ChangePassword" component={ChangePassword} />
      <Redirect to="/" />
    </Switch>
  );
}
