import React from "react";
import { Row, Col, Container } from "react-grid-system";
import { RouteComponentProps } from "react-router-dom";
import { store } from "./Redux/Store";
import { connect } from "react-redux";
import { IAuthDetails } from "./Interfaces";
import { AppState } from "./Redux/rootReducer";
import { Redirect } from "react-router-dom";

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
              <div className="name">Hey {store.getState().user.name} !</div>
            </Row>
            <Row>
              <Col md={6}>
                <div
                  className="box bg-darkviolet"
                  onClick={() => {
                    this.props.history.push("/BookRide");
                  }}
                >
                  Book a Ride
                </div>
              </Col>
              <Col md={6}>
                <div
                  className="box bg-darkorange"
                  onClick={() => {
                    this.props.history.push("/OfferRide");
                  }}
                >
                  Offer a Ride
                </div>
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
  isLoggedIn: state.user.isLogedIn,
});
type IProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, null)(Dashboard);
