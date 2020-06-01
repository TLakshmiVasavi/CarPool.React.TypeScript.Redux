import React from "react";
import { Row, Col } from "react-grid-system";
import { Types } from "./Interfaces";
import { MdLocationOn } from "react-icons/md";
import {
  RideRequestActions,
  getMyOffers,
  getOffers,
} from "./Redux/Ride/RideActions";
import { connect } from "react-redux";
import Modal from "./PopUp";
import RideRequests from "./RideRequests";
import { AppState } from "./Redux/rootReducer";
import Loader from "react-loader-spinner";
import { RouteComponentProps } from "react-router-dom";
let rideActions = new RideRequestActions();
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
  handleClick(id: number) {
    this.props.getRequests(id, this.props.userId, this.props.token);
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
        {this.props.isOffersLoading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        ) : (
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
        )}
      </>
    );
  }
}
interface DispatchProps {
  getRequests: (rideId: number, userId: string, token: string) => void;
}
const mapDispatchToProps = {
  getRequests: rideActions.GetRideRequestsAction,
};

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isOffersLoading: state.ride.isOffersLoaded,
  offers:
    state.user.role == "User"
      ? getMyOffers(
          state.ride.isOffersLoading,
          state.ride.isOffersLoaded,
          state.user.mail,
          state.user.token
        )
      : getOffers(
          state.ride.isOffersLoading,
          state.ride.isOffersLoaded,
          state.user.token
        ),
  userId: state.user.mail,
  token: state.user.token,
});
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, mapDispatchToProps)(OfferedRides);
