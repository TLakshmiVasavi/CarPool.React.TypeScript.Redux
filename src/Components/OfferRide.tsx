import { RouteComponentProps } from "react-router-dom";
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
import { IOfferRide, IVehicles, IVehicle } from "./Interfaces";
import { connect } from "react-redux";
import { offerRide } from "./Redux/Ride/RideActions";
import { getVehicles } from "./Redux/User/UserActions";
import { AppState } from "./Redux/rootReducer";

const times = ["5am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm"];

const validationSchema = Yup.object({
  noOfOfferedSeats: Yup.string().required("Required"),
  // from: Yup.string().required("Required"),
  // to: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
});
interface IBool {
  isLoading: boolean;
}

class OfferRide extends React.Component<
  RouteComponentProps & DispatchProps & IVehicles & IBool,
  IOfferRide
> {
  constructor(props: RouteComponentProps & DispatchProps & IVehicles & IBool) {
    super(props);
    this.state = {
      totalNoOfSeats: 3,
      noOfOfferedSeats: 2,
      isChecked: false,
      startDate: new Date(),
      route: {
        stops: [],
        from: "",
        to: "",
      },
      time: "",
      firstHalf: true,
      cost: 0,
      availableVehicles: [],
      vehicleNumber: "",
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStopChange = this.onStopChange.bind(this);
    this.addStop = this.addStop.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  componentWillMount() {
    this.props.getVehicles();
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  handleVehicleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({
      totalNoOfSeats: this.props.vehicles.find(
        (vehicle) => vehicle.number == value
      )?.capacity,
    });
  }

  handleRouteChange(e: any) {
    const { name, value } = e.target;
    const route = { ...this.state.route };
    route[name] = value;
    this.setState({ route });
  }

  handleSubmit(e: any) {
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

  dateHandler(e: any) {
    // console.log(e);
    this.setState({ ["startDate"]: e });
  }

  addStop() {
    this.setState((state) => {
      const route = { ...state.route };
      const stops = state.route.stops.concat("stop");
      route["stops"] = stops;
      return {
        route,
      };
    });
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  onNextClick() {
    this.setState({ firstHalf: false });
  }

  render() {
    if (this.props.isLoading) {
      if (this.props.vehicles == []) {
        this.props.history.push("/User/AddVehicle");
      }
    }
    return (
      <div className="OfferRide">
        {this.props.isLoading ? (
          <div>loading</div>
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
                              label="From"
                              // value={this.state.from}
                              onChange={this.handleRouteChange}
                              margin="normal"
                              name="from"
                              helperText={errors.from}
                            />
                            <TextField
                              label="To"
                              //value={this.state.to}
                              onChange={this.handleRouteChange}
                              margin="normal"
                              name="to"
                              helperText={errors.to}
                            />
                          </Col>
                          <Col md={2}>
                            <div className="dots">
                              <div className="dot bg-darkviolet" />
                              <div className="dot" />
                              <div className="dot" />
                              <div className="dot" />
                              <MdLocationOn className="bg-darkviolet" />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={8}>
                            <small>Date</small>
                            <DatePicker
                              dateFormat="MM/dd/yyyy"
                              //margin="normal"
                              id="date-picker-inline"
                              //  label="Date picker inline"
                              selected={this.state.startDate}
                              onChange={this.dateHandler}
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
                            {this.state.route.stops == [] ? (
                              <button type="button" onClick={this.addStop}>
                                Add
                              </button>
                            ) : (
                              <React.Fragment>
                                {this.state.route.stops
                                  .slice(0, -1)
                                  .map((item: string, index: number) => (
                                    <TextField
                                      label={"Stop " + (index + 1)}
                                      value={item}
                                      name={"Stop " + (index + 1)}
                                      onChange={this.onStopChange}
                                      margin="normal"
                                      //   name={index}

                                      helperText={errors.from}
                                    />
                                  ))}
                                <TextField
                                  label={
                                    "Stop " + this.state.route.stops.length
                                  }
                                  key={this.state.route.stops.length - 1}
                                  name={"Stop " + this.state.route.stops.length}
                                  //    name={this.state.stops.length - 1}
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
                          <TextField
                            margin="normal"
                            className="bg-white"
                            name="vehicleNumber"
                            select
                            label="vehicleNumber"
                            onChange={this.handleVehicleChange}
                            SelectProps={{
                              native: true,
                            }}
                          >
                            {this.props.vehicles.map((option: IVehicle) => (
                              <option key={option.number} value={option.number}>
                                {option.number}
                              </option>
                            ))}
                          </TextField>
                        </Row>
                        <Row>
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
                                    this.state.totalNoOfSeats === k + 1
                                      ? "selected"
                                      : "" + "number"
                                  }
                                  onClick={this.handleChange}
                                  value={k + 1}
                                >
                                  {k + 1}
                                </button>
                              )
                            )}
                          </div>
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
const mapStateToProps = (state: AppState) => ({
  isLoading: state.user.isLoading,
  vehicles: state.user.vehicles,
});
interface DispatchProps {
  offerRide: (ride: IOfferRide) => void;
  getVehicles: () => void;
}
const mapDispatchToProps = {
  offerRide,
  getVehicles,
};
export default connect(mapStateToProps, mapDispatchToProps)(OfferRide);
