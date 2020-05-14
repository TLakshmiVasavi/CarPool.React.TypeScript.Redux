import React from "react";
import { Row, Col, Container } from "react-grid-system";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { Link } from "react-router-dom";

class Dashboard extends React.Component<IProps, {}> {
  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/Login");
    }

    return (
      <div className="Dashboard">
        <div className="center">
          <Container>
            <Row>
              <div className="name">Hey {this.props.userName} !</div>
            </Row>
            <Row>
              <Col md={6}>
                <Link className="box bg-darkviolet" to="/BookRide">
                  Book Ride
                </Link>
              </Col>
              <Col md={6}>
                <Link className="box bg-darkorange" to="/OfferRide">
                  Offer Ride
                </Link>
                {/* <Link to="/MyRides" />
                <Link to="/Wallet" />
                <Link to="/AddVehicle" /> */}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  userName: state.user.name,
  isLoggedIn: state.user.isLoggedIn,
});
type IProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, null)(Dashboard);
