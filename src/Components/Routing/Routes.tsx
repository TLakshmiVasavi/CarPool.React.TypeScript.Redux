import React from "react";
// import { Switch, Route } from 'react-router-dom';
import { Switch } from "react-router-dom";
// import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';
// import Dashboard from '../pages/Dashboard';
import LoginSignUp from "../LoginSignUp";
import Home from "../Home";
import Route from "./Route";
import MyRides from '../MyRides';
import BookRide from '../BookRide';
import UserProfile from '../UserProfile';
import OfferRide from '../OfferRide';


export default function Routes() {
  return (
    
    <Switch>
      
      <Route path="/(Login|SignUp|)/" component={LoginSignUp} />
      {/* <MenuListComposition/> */}
      <Route path="/Profile" component={UserProfile} isPrivate/>
      <Route  path="/Home" component={Home} isPrivate/>
      <Route  path="/MyRides" component={MyRides} isPrivate/>
      <Route  path="/OfferRide" component={OfferRide} isPrivate/>
      <Route  path="/BookRide" component={BookRide} isPrivate/>
      {/* <Route path="/dashboard" component={Dashboard} isPrivate /> */}
      {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
      {/* <Route component={SignIn} /> */}
    </Switch>
    
  );
}
