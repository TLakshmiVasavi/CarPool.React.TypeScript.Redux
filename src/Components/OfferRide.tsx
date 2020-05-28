import { RouteComponentProps, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import { Row, Col } from "react-grid-system";
import { MdLocationOn } from "react-icons/md";
import { InputAdornment } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../StyleSheets/OfferRide.css";
import "../StyleSheets/Toogle.css";
import { Types, times } from "./Interfaces";
import { connect } from "react-redux";
import rideActions from "./Redux/Ride/RideActions";
import userActions from "./Redux/User/UserActions";
import { AppState } from "./Redux/rootReducer";
import Loader from "react-loader-spinner";
import { getVehicles } from "./Redux/User/UserActions";

const validationSchema = Yup.object({
  noOfOfferedSeats: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
  route: Yup.object({
    from: Yup.string().required("Required"),
    to: Yup.string().required("Required"),
  }),
});

class OfferRide extends React.Component<IProps, Types.IOfferRide> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      totalNoOfSeats: 0,
      noOfOfferedSeats: 0,
      isChecked: false,
      startDate: new Date(),
      route: {
        stops: [],
        from: "",
        to: "",
      },
      time: "5am-9am",
      firstHalf: true,
      cost: 0,
      availableVehicles: [],
      vehicleId: "0",
      //this.props.vehicles == [] ? "0" : this.props.vehicles[0].number,
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStopChange = this.onStopChange.bind(this);
    this.addStop = this.addStop.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  // componentWillMount() {
  //   this.props.getVehicles();
  // }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleDateChange(e: any) {
    this.setState({ ["startDate"]: e });
  }

  handleVehicleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({
      totalNoOfSeats: this.props.vehicles.find(
        (vehicle: Types.IVehicle) => vehicle.number == value
      )?.capacity,
    });
  }

  handleRouteChange(e: any) {
    const { name, value } = e.target;
    const route = { ...this.state.route };
    route[name] = value;
    this.setState({ route });
  }
  componentWillReceiveProps() {
    if (this.props.isLoaded) {
      if (this.props.vehicles == []) {
        this.props.history.push("/User/AddVehicle");
      } else {
        this.setState({ ["vehicleId"]: this.props.vehicles[0]?.number });
        this.setState({ ["totalNoOfSeats"]: this.props.vehicles[0]?.capacity });
        this.setState({
          ["noOfOfferedSeats"]: this.props.vehicles[0]?.capacity,
        });
      }
    }
  }

  handleSubmit(e: any) {
    this.setState(["vehicleId"]);
    e.preventDefault();
    this.props.offerRide(this.state);
  }

  onStopChange(e: any) {
    const { name, value } = e.target;
    this.setState((state) => {
      const route = { ...state.route };
      const stops = state.route.stops.map((item: string, j: number) => {
        if ("Stop " + (j + 1) == name) {
          return value;
        } else {
          return item;
        }
      });
      route["stops"] = stops;
      return {
        route,
      };
    });
  }

  addStop() {
    this.setState((state) => {
      const route = { ...state.route };
      const stops = state.route.stops.concat("");
      route["stops"] = stops;
      return {
        route,
      };
    });
  }

  handleChecked() {
    this.props.history.push("/BookRide");
    this.setState({ isChecked: !this.state.isChecked });
  }

  onNextClick() {
    this.setState({ firstHalf: false });
  }

  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/Login");
    }

    if (this.props.isLoading) {
      if (this.props.vehicles == []) {
        this.props.history.push("/User/AddVehicle");
      }
    }
    return (
      <div className="OfferRide">
        {this.props.isLoading ? (
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        ) : (
          <Formik
            enableReinitialize
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={() => {
              this.props.offerRide(this.state);
            }}
          >
            {({ handleSubmit, errors }) => (
              <form onSubmit={handleSubmit}>
                <Col md={4}>
                  <div className="shadowBox">
                    <Row>
                      <Col md={8}>
                        <h3>Offer a Ride</h3>
                        <small>We get you Rides asap!</small>
                      </Col>
                      <Col md={2}>
                        <label className="switch">
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={this.handleChecked}
                          />
                          <span className="slider round"></span>
                        </label>
                      </Col>
                    </Row>

                    {this.state.firstHalf ? (
                      <div id="first">
                        <Row>
                          <Col md={8}>
                            <TextField
                              label={errors.from ?? "From"}
                              onChange={this.handleRouteChange}
                              margin="normal"
                              name="from"
                            />
                            <TextField
                              label={errors.to ?? "To"}
                              onChange={this.handleRouteChange}
                              margin="normal"
                              name="to"
                            />
                          </Col>
                          <Col md={2}>
                            <div className="dots">
                              <div className="dot bg-darkviolet" />
                              <div className="dot" />
                              <div className="dot" />
                              <div className="dot" />
                              <MdLocationOn className="darkviolet" />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={8}>
                            <small>Date</small>
                            <DatePicker
                              dateFormat="MM/dd/yyyy"
                              name="startDate"
                              id="date-picker-inline"
                              selected={this.state.startDate}
                              onChange={this.handleDateChange}
                              minDate={new Date()}
                            />
                          </Col>
                          <Col md={12}>
                            <small>Time</small>
                            <div
                              data-toggle="button"
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              {times.map((item, index) => (
                                <button
                                  type="button"
                                  key={index}
                                  name="time"
                                  className={
                                    this.state.time === item
                                      ? "selected"
                                      : "" + "time"
                                  }
                                  onClick={this.handleChange}
                                  value={item}
                                >
                                  {item}
                                </button>
                              ))}
                            </div>
                            <a
                              href="#"
                              className="next darkviolet"
                              onClick={this.onNextClick}
                            >
                              Next&raquo;
                            </a>
                          </Col>
                        </Row>
                      </div>
                    ) : (
                      <div id="second">
                        <Row>
                          <Col md={8}>
                            {this.state.route.stops.length == 0 ? (
                              <button type="button" onClick={this.addStop}>
                                Add
                              </button>
                            ) : (
                              <React.Fragment>
                                {this.state.route.stops
                                  .slice(0, -1)
                                  .map((item: string, index: number) => (
                                    <TextField
                                      label={
                                        errors.from ?? "Stop " + (index + 1)
                                      }
                                      value={item}
                                      name={"Stop " + (index + 1)}
                                      onChange={this.onStopChange}
                                      margin="normal"
                                    />
                                  ))}
                                <TextField
                                  label={
                                    "Stop " + this.state.route.stops.length
                                  }
                                  key={this.state.route.stops.length - 1}
                                  name={"Stop " + this.state.route.stops.length}
                                  value={this.state.route.stops.slice(-1)}
                                  onChange={this.onStopChange}
                                  margin="normal"
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="start">
                                        <Add onClick={this.addStop} />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              </React.Fragment>
                            )}
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextField
                              margin="normal"
                              className="bg-white"
                              name="vehicleId"
                              select
                              label="vehicle Number"
                              onChange={this.handleVehicleChange}
                              defaultValue={this.props.vehicles[0].number}
                              SelectProps={{
                                native: true,
                              }}
                            >
                              {this.props.vehicles.map(
                                (option: Types.IVehicle) => (
                                  <option
                                    key={option.number}
                                    value={option.number}
                                  >
                                    {option.number}
                                  </option>
                                )
                              )}
                            </TextField>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <small>Available Seats</small>
                            <div className="btn-group" role="group">
                              {Array.from(
                                { length: this.state.totalNoOfSeats },
                                (_, k) => (
                                  <button
                                    key={k}
                                    name="noOfOfferedSeats"
                                    type="button"
                                    className={
                                      this.state.noOfOfferedSeats == k + 1
                                        ? "selected number"
                                        : "number"
                                    }
                                    onClick={this.handleChange}
                                    value={k + 1}
                                  >
                                    {k + 1}
                                  </button>
                                )
                              )}
                            </div>
                          </Col>
                          <Col>
                            <small>Price</small>
                            <TextField
                              label=""
                              onChange={this.handleChange}
                              margin="normal"
                              name="cost"
                            />
                          </Col>
                        </Row>

                        <div className="form-group">
                          <button
                            type="submit"
                            className="submit bg-darkorange"
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              </form>
            )}
          </Formik>
        )}
      </div>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
  isLoading: state.user.isLoading,
  isLoaded: state.user.isLoaded,
  // vehicles: state.user.isLoaded
  //   ? state.user.vehicles
  vehicles: getVehicles(state.user.isLoading, state.user.isLoaded),
  // executeQueryAndExtractData()
  //await getVehicles(),
});

interface DispatchProps {
  offerRide: (ride: Types.IOfferRide) => void;
  //getVehicles: () => void;
}

const mapDispatchToProps = {
  offerRide: rideActions.OfferRideRequestAction,
  //getVehicles: userActions.GetVehiclesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferRide);
