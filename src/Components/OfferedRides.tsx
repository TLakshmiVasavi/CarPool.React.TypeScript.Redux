import React from "react";
import { Row, Col } from "react-grid-system";
import { Types } from "./Interfaces";
import { MdLocationOn } from "react-icons/md";

import { connect } from "react-redux";
import Modal from "./PopUp";
import RideRequests from "./RideRequests";
import { AppState } from "./Redux/rootReducer";
import { container } from "../inversify.config";
import rideAction from "./Redux/Ride/RideActions";
import { TYPES } from "./Types";
let rideActions = container.get<rideAction>(TYPES.RideActions);
interface IPopUp {
  open: boolean;
}
class OfferedRides extends React.Component<IProps, IPopUp> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }
  componentWillMount() {
    this.props.getOffers();
  }
  handleClick(id: number) {
    this.props.getRequests(id);
    this.setState({ open: true });
  }
  modalOpen() {
    this.setState({ open: true });
  }

  modalClose() {
    this.setState({
      open: false,
    });
  }
  render() {
    return (
      <>
        {this.props.offers.map((ride: Types.IMyOffer) => (
          <>
            <div
              className="shadowBox"
              onClick={() => this.handleClick(ride.id)}
            >
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
                  <p>{ride.startDate.toString().split("T")[0]}</p>
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
                  <p>{ride.noOfOfferedSeats}</p>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <small>Ride Status</small>
                  <p>{ride.status}</p>
                </Col>
                <Col md={4} />
                <Col md={4}>
                  <small>Vehicle Number</small>
                  <p>{ride.vehicleId}</p>
                </Col>
              </Row>
            </div>
            <Modal show={this.state.open} handleClose={this.modalClose}>
              <RideRequests rideId={ride.id} />
            </Modal>
          </>
        ))}
      </>
    );
  }
}
interface DispatchProps {
  getOffers: () => void;
  getRequests: (rideId: number) => void;
}
const mapDispatchToProps = {
  getOffers: rideActions.GetMyOffersAction,
  getRequests: rideActions.GetRideRequestsAction,
};

const mapStateToProps = (state: AppState) => ({
  offers: state.ride.offers,
});
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, mapDispatchToProps)(OfferedRides);
