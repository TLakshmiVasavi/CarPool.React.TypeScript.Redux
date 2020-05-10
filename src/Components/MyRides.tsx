import React from "react";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import {
  IMyRides,
  IMyOffer,
  IMyBooking,
  IMyOffers,
  IMyBookings,
} from "./Interfaces";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import OfferedRides from "./OfferedRides";
import BookedRides from "./BookedRides";
import {
  getOffers,
  getBookings,
  GetMyOffersAction,
} from "./Redux/Ride/RideActions";

class MyRides extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <div className="rectangle bg-darkviolet">Booked Rides</div>
            <Col id="bookings" md={10}>
              <BookedRides />
            </Col>
          </Col>
          <Col md={6}>
            <div className="rectangle bg-darkorange">Offered Rides</div>
            <Col id="offers" md={10}>
              <OfferedRides />
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyRides;
