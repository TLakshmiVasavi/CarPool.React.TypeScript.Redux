import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { Types } from "./Interfaces";
import { MdLocationOn } from "react-icons/md";
import { AppState } from "./Redux/rootReducer";
import { RideRequestActions } from "./Redux/Ride/RideActions";
import { connect } from "react-redux";
import { getBookings, getMyBookings } from "./Redux/Ride/RideActions";
import { stat } from "fs";
import Loader from "react-loader-spinner";
import { RouteComponentProps } from "react-router-dom";
let rideActions = new RideRequestActions();
class BookedRides extends React.Component<IProps, {}> {
  render() {
    var url = "data:image/png;base64,";
    return (
      <>
        {this.props.isLoading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        ) : (
          <>
            {this.props.bookings.map((ride: Types.IMyBooking) => (
              <div className="shadowBox">
                <Row>
                  <Col md={8}>
                    <h2>{ride.providerName}</h2>
                  </Col>
                  <Col md={4}>
                    <img src={url + ride.providerPic} className="imgRound" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <small>From</small>
                    <p>{ride.from}</p>
                  </Col>
                  <Col md={4}>
                    <div className="dot" />
                    <div className="dot" />
                    <div className="dot" />
                    <MdLocationOn className="darkviolet" />
                  </Col>
                  <Col md={4}>
                    <small>To</small>
                    <p>{ride.to}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <small>Date</small>
                    <p>{ride.startDate.toString()}</p>
                  </Col>
                  <Col md={4} />
                  <Col md={4}>
                    <small>Time</small>
                    <p>{ride.time}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <small>Price</small>
                    <p>{ride.cost}</p>
                  </Col>
                  <Col md={4} />
                  <Col md={4}>
                    <small>Seats Available</small>
                    <p>{ride.noOfSeats}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <small>Ride Status</small>
                    <p>{ride.rideStatus}</p>
                  </Col>
                  <Col md={4} />
                  <Col md={4}>
                    <small>Request Status</small>
                    <p>{ride.requestStatus}</p>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <small>Vehicle</small>
                    <p>{ride.vehicleType}</p>
                  </Col>
                  <Col md={4} />
                  <Col md={4}>
                    <small>Vehicle Number</small>
                    <p>{ride.vehicleNumber}</p>
                  </Col>
                </Row>
              </div>
            ))}
          </>
        )}
      </>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoading: state.ride.isLoading,
  bookings:
    state.user.role == "User"
      ? getMyBookings(
          state.ride.isLoading,
          state.ride.isLoaded,
          state.user.mail,
          state.user.token
        )
      : getBookings(
          state.ride.isLoading,
          state.ride.isLoaded,
          state.user.token
        ),
  token: state.user.token,
});

export default connect(mapStateToProps, {})(BookedRides);
