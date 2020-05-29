import React from "react";
import { Types } from "./Interfaces";
import { Row, Col } from "react-grid-system";
import { MdLocationOn } from "react-icons/md";
import { AppState } from "./Redux/rootReducer";
import { connect } from "react-redux";
import { container } from "../inversify.config";
import rideAction from "./Redux/Ride/RideActions";
import { TYPES } from "./Types";
let rideActions = container.get<rideAction>(TYPES.RideActions);

class RideRequests extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(isApprove: boolean, requestId: number) {
    this.props.approveRideRequest(requestId, this.props.rideId, isApprove);
  }
  render() {
    return (
      <React.Fragment>
        {this.props.isLoaded && (
          <>
            {this.props.requests.length == 0 ? (
              <div>No Requests</div>
            ) : (
              this.props.requests.map((item: Types.IRideRequest) => (
                <div className="shadowBox">
                  <Row>
                    <Col md={4}>
                      <small>From</small>
                      <p>{item.from}</p>
                    </Col>
                    <Col md={4}>
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                      <MdLocationOn className="darkviolet" />
                    </Col>
                    <Col md={4}>
                      <small>To</small>
                      <p>{item.to}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <small>Cost</small>
                      <p>{item.cost}</p>
                    </Col>
                    <Col md={4}>
                      <small>Seats Requested</small>
                      <p>{item.noOfSeats}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <button
                        type="submit"
                        className="submit bg-darkorange"
                        onClick={() => this.handleSubmit(true, item.id)}
                      >
                        Accept
                      </button>
                    </Col>
                    <Col md={4}>
                      <button
                        type="submit"
                        className="submit bg-darkorange"
                        onClick={() => this.handleSubmit(true, item.id)}
                      >
                        Reject
                      </button>
                    </Col>
                  </Row>
                </div>
              ))
            )}
          </>
        )}
      </React.Fragment>
    );
  }
}
interface OwnProps {
  rideId: number;
}
const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
  rideId: ownProps.rideId,
  isLoaded: state.ride.isRequestsLoaded,
  requests: state.ride.requests,
});

interface DispatchProps {
  approveRideRequest: (
    requestId: number,
    rideId: number,
    isApprove: boolean
  ) => void;
}
const mapDispatchToProps = {
  approveRideRequest: rideActions.ApproveRequestAction,
};
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, mapDispatchToProps)(RideRequests);
