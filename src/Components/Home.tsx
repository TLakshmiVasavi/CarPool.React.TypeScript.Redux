import React from "react";
import { Row, Col, Container } from "react-grid-system";
import { RouteComponentProps } from "react-router-dom";
import { store } from "./Redux/Store";
import { connect } from "react-redux";

class Home extends React.Component<RouteComponentProps, {}> {
  render() {
    return (
      <div className="Home">
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
export default Home;
