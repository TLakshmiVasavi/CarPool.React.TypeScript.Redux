import React from "react";
import { Row, Col } from "react-grid-system";
import { AppState } from "./Redux/rootReducer";
import { MdLocationOn } from "react-icons/md";
import { Types } from "./Interfaces";
import { connect } from "react-redux";
import { RideRequestActions } from "./Redux/Ride/RideActions";
import "../App.css";
import Modal from "./PopUp";

let rideActions = new RideRequestActions();

interface IState {
  NumberOfSeats: number;
  modal: boolean;
  isImageOpen: boolean;
}

class AvailableRides extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      modal: false,
      NumberOfSeats: 0,
      isImageOpen: false,
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.openImage = this.openImage.bind(this);
    this.closeImage = this.closeImage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSeats = this.handleSeats.bind(this);
  }
  handleSeats(e: any) {
    this.setState({ NumberOfSeats: e.target.value });
  }
  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({ modal: false });
  }

  openImage() {
    this.setState({ isImageOpen: true });
    this.setState({ modal: false });
  }

  closeImage() {
    this.setState({ isImageOpen: false });
  }

  handleSubmit(rideId: number) {
    this.props.requestRide(
      this.props.request,
      this.state.NumberOfSeats,
      rideId,
      this.props.userId,
      this.props.token
    );
  }

  render() {
    var url = "data:image/png;base64,";
    return (
      <>
        {this.props.isLoaded && (
          <>
            <div className="matches">Your Matches</div>
            {this.props.availableRides.length == 0 ? (
              <div>Rides Not Available</div>
            ) : (
              this.props.availableRides.map((item: Types.IAvailableRide) => (
                <>
                  <div className="shadowBox" onClick={this.modalOpen}>
                    <Row>
                      <Col md={8}>
                        <h2>{item.providerName}</h2>
                      </Col>
                      <Col md={4}>
                        <img
                          src={url + item.providerPic}
                          className="imgRound"
                          onClick={this.openImage}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <small>From</small>
                        <p>{this.props.request.from}</p>
                      </Col>
                      <Col md={4}>
                        <div className="dot" />
                        <div className="dot" />
                        <div className="dot" />
                        <MdLocationOn className="darkviolet" />
                      </Col>
                      <Col md={4}>
                        <small>To</small>
                        <p>{this.props.request.to}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <small>Date</small>
                        <p>
                          {item.startDate.toString().split("T")[0]}
                          {/* {this.props.request.startDate.toString()} */}
                        </p>
                      </Col>
                      <Col md={4} />
                      <Col md={4}>
                        <small>Time</small>
                        <p>{item.time}</p>
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
                  <Modal show={this.state.modal} handleClose={this.modalClose}>
                    <div className="form-group">
                      <label>Enter Number Of Seats:</label>
                      <input
                        className="form-control"
                        onChange={this.handleSeats}
                      />
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
                  <Modal
                    show={this.state.isImageOpen}
                    handleClose={this.closeImage}
                  >
                    <img
                      src={url + item.providerPic}
                      onClick={this.closeImage}
                    />
                  </Modal>
                </>
              ))
            )}
          </>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: Types.IBookRide) => ({
  request: ownProps,
  isLoaded: state.ride.isLoaded,
  availableRides: state.ride.availableRides,
  userId: state.user.mail,
  token: state.user.token,
});

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

interface DispatchProps {
  requestRide(
    Request: Types.IBookRide,
    noOfSeats: number,
    rideId: number,
    userId: string,
    token: string
  ): void;
}

export default connect(mapStateToProps, {
  requestRide: rideActions.RequestRideAction,
})(AvailableRides);
