import { Row, Col } from "react-grid-system";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import OfferRide from "./OfferRide";
import { IMyOffer } from "./Interfaces";

class OfferedRide extends React.Component<{}, IMyOffer> {
  render() {
    return (
      <div className="shadowBox">
        <Row>
          <Col md={4}>
            <small>From</small>
            <p>{this.state.from}Markapur</p>
          </Col>
          <Col md={4}>
            <div className="dot" />
            <div className="dot" />
            <div className="dot" />
            <MdLocationOn className="darkviolet" />
          </Col>
          <Col md={4}>
            <small>To</small>
            <p>{this.state.to}Y.Palem</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <small>Date</small>
            <p>{this.state.startDate}4/15/20</p>
          </Col>
          <Col md={4} />
          <Col md={4}>
            <small>Time</small>
            <p>5-9</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <small>Price</small>
            <p>{this.state.cost}180</p>
          </Col>
          <Col md={4} />
          <Col md={4}>
            <small>Seats Available</small>
            <p>5</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <small>Ride Status</small>
            <p>Completed</p>
          </Col>
          <Col md={4} />
          <Col md={4}>
            <small>Request Status</small>
            <p>Approved</p>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <small>Vehicle</small>
            <p>Car</p>
          </Col>
          <Col md={4} />
          <Col md={4}>
            <small>Vehicle Number</small>
            <p>{this.state.vehicleNumber}12345</p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default OfferRide;
