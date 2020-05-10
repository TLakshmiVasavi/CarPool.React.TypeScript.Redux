import React from "react";
import { Row, Col } from "react-grid-system";
import { AppState } from "./Redux/rootReducer";
import { MdLocationOn } from "react-icons/md";
import {
  IBookRide,
  IBookRideResponse,
  IAvailableRide,
  IRideRequest,
} from "./Interfaces";
import { connect } from "react-redux";
import { requestRide } from "./Redux/Ride/RideActions";
import "../App.css";
import Modal from "./PopUp";

interface IState {
  NumberOfSeats: number;
  modal: boolean;
}
class AvailableRides extends React.Component<
  IBookRideResponse & DispatchProps & IBool & IBookRide,
  IState
> {
  constructor(props: IBookRideResponse & DispatchProps & IBool & IBookRide) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      modal: false,
      NumberOfSeats: 0,
    };
  }
  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      NumberOfSeats: 0,
      modal: false,
    });
  }
  handleSubmit(rideId: number) {
    this.props.requestRide(this.props, this.state.NumberOfSeats, rideId);
  }
  render() {
    var url = "data:image/png;base64,";
    return (
      <React.Fragment>
        {this.props.isLoaded && this.props.availableRides.length == 0 ? (
          <div>Rides Not Available</div>
        ) : (
          this.props.availableRides.map((item: IAvailableRide) => (
            <div className="shadowBox" onClick={() => this.modalOpen()}>
              <Modal
                show={this.state.modal}
                handleClose={() => this.modalClose()}
              >
                <div className="form-group">
                  <label>Enter Number Of Seats:</label>
                  <input className="form-control" />
                </div>
                <div className="form-group">
                  <button
                    type="button"
                    onClick={() => this.handleSubmit(item.id)}
                  >
                    Request
                  </button>
                </div>
              </Modal>
              <Row>
                <Col md={8}>
                  <h2>{item.providerName}</h2>
                </Col>
                <Col md={4}>
                  <img src={url + item.providerPic} className="imgRound" />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <small>From</small>
                  <p>{this.props.from}</p>
                </Col>
                <Col md={4}>
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                  <MdLocationOn className="darkviolet" />
                </Col>
                <Col md={4}>
                  <small>To</small>
                  <p>{this.props.to}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <small>Date</small>
                  <p>
                    {/* {new Date(this.props.startDate.toLocaleDateString())} */}
                    {this.props.startDate.toDateString()}
                  </p>
                </Col>
                <Col md={4} />
                <Col md={4}>
                  <small>Time</small>
                  <p>{this.props.time}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <small>Price</small>
                  <p>{item.cost}</p>
                </Col>
                <Col md={4} />
                <Col md={4}>
                  <small>Seats Available</small>
                  <p>{item.availableSeats}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <small>Vehicle </small>
                  <p>{item.vehicle.model}</p>
                </Col>
                <Col md={4} />
                <Col md={4}>
                  <small>Vehicle Number</small>
                  <p>{item.vehicle.number}</p>
                </Col>
              </Row>
            </div>
          ))
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state: AppState) => ({
  isLoaded: state.ride.isLoaded,
  availableRides: state.ride.availableRides,
});
interface IBool {
  isLoaded: boolean;
}

interface DispatchProps {
  requestRide(Request: IBookRide, noOfSeats: number, rideId: number): void;
}
const mapDispatchToProps = {
  requestRide,
};

export default connect(mapStateToProps, mapDispatchToProps)(AvailableRides);
