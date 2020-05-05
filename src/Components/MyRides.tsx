import React from "react";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import { IMyRides, IMyOffer, IMyBooking } from "./Interfaces";

class MyRides extends React.Component<{}, IMyRides> {
  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <div className="rectangle bg-darkviolet">Booked Rides</div>
            <Col id="bookings" md={10}>
              {this.state.Bookings.map((item: IMyBooking) => (
                <div className="shadowBox">
                  <Row>
                    <Col md={8}>
                      <h2>{item.providerName}Lakshmi Vasavi</h2>
                    </Col>
                    <Col md={4}>
                      <img src="#" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>From</small>
                      <p>{item.from}Markapur</p>
                    </Col>
                    <Col md={4}>
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                      <MdLocationOn className="darkviolet" />
                    </Col>
                    <Col md={4}>
                      <small>To</small>
                      <p>{item.to}Y.Palem</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Date</small>
                      <p>{item.startDate}4/15/20</p>
                    </Col>
                    <Col md={4} />
                    <Col md={4}>
                      <small>Time</small>
                      <p>{item.time}5-9</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Price</small>
                      <p>{item.cost}180</p>
                    </Col>
                    <Col md={4} />
                    <Col md={4}>
                      <small>Seats Available</small>
                      <p>{item.noOfSeats}5</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Ride Status</small>
                      <p>{item.rideStatus}Completed</p>
                    </Col>
                    <Col md={4} />
                    <Col md={4}>
                      <small>Request Status</small>
                      <p>{item.requestStatus}Approved</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Vehicle</small>
                      <p>{item.vehicleType}Car</p>
                    </Col>
                    <Col md={4} />
                    <Col md={4}>
                      <small>Vehicle Number</small>
                      <p>{item.vehicleNumber}12345</p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Col>
          <Col md={6}>
            <div className="rectangle bg-darkorange">Offered Rides</div>
            <Col id="offers" md={10}>
              {this.state.Offers.map((item: IMyOffer) => (
                <div className="shadowBox">
                  <Row>
                    <Col md={4}>
                      <small>From</small>
                      <p>{item.from}Markapur</p>
                    </Col>
                    <Col md={4}>
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                      <MdLocationOn className="darkviolet" />
                    </Col>
                    <Col md={4}>
                      <small>To</small>
                      <p>{item.to}Y.Palem</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Date</small>
                      <p>{item.startDate}4/15/20</p>
                    </Col>
                    <Col md={4} />
                    <Col md={4}>
                      <small>Time</small>
                      <p>{item.time}5-9</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Price</small>
                      <p>{item.cost}180</p>
                    </Col>
                    <Col md={4} />
                    <Col md={4}>
                      <small>Seats Available</small>
                      <p>{item.noOfOfferedSeats}5</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Ride Status</small>
                      <p>{item.rideStatus}Completed</p>
                    </Col>
                    <Col md={4} />
                    <Col md={4}>
                      <small>Vehicle Number</small>
                      <p>{item.vehicleNumber}12345</p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MyRides;
