import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import OfferedRides from "./OfferedRides";
import BookedRides from "./BookedRides";
import { Redirect, RouteComponentProps } from "react-router-dom";

class MyRides extends React.Component<IProps, {}> {
  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/");
    }

    return (
      <Container>
        <Row>
          <Col md={6}>
            <div className="rectangle bg-darkviolet">Booked Rides</div>
            <Col id="bookings" md={10}>
              <BookedRides {...this.props.routeProps} />
            </Col>
          </Col>
          <Col md={6}>
            <div className="rectangle bg-darkorange">Offered Rides</div>
            <Col id="offers" md={10}>
              <OfferedRides {...this.props.routeProps} />
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}
type IProps = ReturnType<typeof mapStateToProps>;
const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  routeProps: ownProps,
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
});
export default connect(mapStateToProps, null)(MyRides);
