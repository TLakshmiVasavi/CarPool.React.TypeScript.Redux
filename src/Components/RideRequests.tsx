class RideRequests extends React.Component {
    state = {
        rideRequests: []
    }
    componentDidMount() {
        axios.get('https://localhost:5001/api/RideApi/RideRequests?rideId=2002')
            .then(res => {
                // console.log(res);
                this.setState({ rideRequests: res.data });
            });
    }
    render() {
        return (<React.Fragment>
            {this.state.rideRequests.map(item =>
                <div className="shadowBox">
                    <Row>
                        <Col md={4}>
                            <small>From</small>
                            <p>{item.source}Markapur</p>
                        </Col>
                        <Col md={4}>
                            <div className="dot" />
                            <div className="dot" />
                            <div className="dot" />
                            <MdLocationOn className="darkviolet" />
                        </Col>
                        <Col md={4}>
                            <small>To</small>
                            <p>{item.destination}Y.Palem</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <small>Cost</small>
                            <p>{item.cost}180</p>
                        </Col>
                        <Col md={4}>
                            <small>Seats Requested</small>
                            <p>{item.NoOfSeats}2</p>
                        </Col>
                    </Row>
                </div>
            )}
        </React.Fragment>
        );
    }
} 