import { Row, Col } from "react-grid-system";
import React from "react";
import { MdLocationOn } from "react-icons/md";
import OfferRide from "./OfferRide";
import {IRideDetails} from "./Interfaces";

class OfferedRide extends React.Component<IRideDetails,{}>
{
    render()
    {
        return(
            <div className="shadowBox">
                  <Row>
                    <Col md={8}>
                      <h2>{this.props.Provider}Lakshmi Vasavi</h2>
                    </Col>
                    <Col md={4}>
                      <img src="#" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>From</small>
                      <p>{this.props.From}Markapur</p>
                    </Col>
                    <Col md={4}>
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                      <MdLocationOn className="darkviolet" />
                    </Col>
                    <Col md={4}>
                      <small>To</small>
                      <p>{this.props.To}Y.Palem</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Date</small>
                      <p>{this.props.StartDate}4/15/20</p>
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
                      <p>{this.props.Cost}180</p>
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
                      <p>{this.props.VehicleNumber}12345</p>
                    </Col>
                  </Row>
                </div>
        );
    }
}

export default OfferRide;