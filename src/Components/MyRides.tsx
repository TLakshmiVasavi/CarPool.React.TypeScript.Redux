import React from "react";
import { Container, Row, Col } from "react-grid-system";
import axios from "axios";
import { MdLocationOn } from "react-icons/md";
import UserContext from "./UserContext";
import {IMRideDetails} from "./Interfaces";



interface IMyRides
{
  Offers:IMRideDetails[],
  Bookings:IMRideDetails[]
}

class MyRides extends React.Component<{},IMyRides> {
  static contextType = UserContext;
  state = {
    Offers: [],
    Bookings: [],
  };
  componentDidMount() {

    axios
      .get(
        "https://localhost:5001/api/RideApi/GetOfferedRides?userId=" + this.context.user.mail
      )
      .then((res) => {
        // console.log(res);
        this.setState({ Offers: res.data });
      });
    axios
      .get(
        "https://localhost:5001/api/RideApi/GetBookings?userId=" + this.context.user.mail
      )
      .then((res) => {
        // console.log(res);
        this.setState({ Bookings: res.data });
      });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col md={6}>
            <div className="rectangle bg-darkviolet">Booked Rides</div>
            <Col id="bookings" md={10}>
              {this.state.Bookings.map((item:IMRideDetails) => (
                <div className="shadowBox">
                  <Row>
                    <Col md={8}>
                      <h2>{item.Id}Lakshmi Vasavi</h2>
                    </Col>
                    <Col md={4}>
                      <img src="#" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>From</small>
                      <p>{item.Source}Markapur</p>
                    </Col>
                    <Col md={4}>
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                      <MdLocationOn className="darkviolet" />
                    </Col>
                    <Col md={4}>
                      <small>To</small>
                      <p>{item.Destination}Y.Palem</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Date</small>
                      <p>{item.StartDate}4/15/20</p>
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
                      <p>180</p>
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
                      <p>{item.IsRideCompleted}Completed</p>
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
                      <p>{item.VehicleId}12345</p>
                    </Col>
                  </Row>
                </div>
              ))}
            </Col>
          </Col>
          <Col md={6}>
            <div className="rectangle bg-darkorange">Offered Rides</div>
            <Col id="offers" md={10}>
              {this.state.Offers.map((item:IMRideDetails) => (
                <div className="shadowBox">
                  <Row>
                    <Col md={8}>
                      <h2>{item.Id}Lakshmi Vasavi</h2>
                    </Col>
                    <Col md={4}>
                      <img src="#" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>From</small>
                      <p>{item.Source}Markapur</p>
                    </Col>
                    <Col md={4}>
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                      <MdLocationOn className="darkviolet" />
                    </Col>
                    <Col md={4}>
                      <small>To</small>
                      <p>{item.Destination}Y.Palem</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Date</small>
                      <p>{item.StartDate}4/15/20</p>
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
                      <p>180</p>
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
                      <p>{item.IsRideCompleted}Completed</p>
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
                      <p>{item.VehicleId}12345</p>
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
