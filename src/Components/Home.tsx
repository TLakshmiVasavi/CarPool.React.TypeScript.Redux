import React from 'react';
import UserContext from './UserContext';
import { Row, Col, Container } from "react-grid-system";
import { RouteComponentProps } from "react-router-dom";

class Home extends React.Component<RouteComponentProps, {}> {
    static contextType = UserContext
    render() {
        return (
            <div className="Home">
                <div className="center">
                    <Container>
                        <Row>
                            <div className="name">Hey {this.context.user.name} !</div>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <div className="box bg-darkviolet" onClick={() => {
                                    this.props.history.push("/BookRide");
                                }}>Book a Ride</div></Col>
                            <Col md={6}>
                                <div className="box bg-darkorange" onClick={() => {
                                    this.props.history.push("/OfferRide");
                                }}>Offer a Ride</div></Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    }
}
export default Home;