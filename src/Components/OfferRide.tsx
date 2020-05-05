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
import axios from "axios";
import "../StyleSheets/OfferRide.css";
import "../StyleSheets/Toogle.css";
import { IOfferRide } from "./Interfaces";

const times = ["5am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm"];

const validationSchema = Yup.object({
  noOfSeats: Yup.string().required("Required"),
  from: Yup.string().required("Required"),
  to: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
});

class OfferRide extends React.Component<RouteComponentProps, IOfferRide> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      //totalNoOfSeats: 3,
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
      vehicleId: "",
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onStopChange = this.onStopChange.bind(this);
    this.addStop = this.addStop.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onButtonChange = this.onButtonChange.bind(this);
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e: any) {
    e.preventDefault();
  }

  onStopChange(e: any) {
    // console.log(e.target);
    const { name, value } = e.target;
    this.setState((state) => {
      const stops = state.stops.map((item: string, j: string) => {
        if (j == name) {
          return value;
        } else {
          return item;
        }
      });
      return {
        stops,
      };
    });
  }

  dateHandler(e: any) {
    // console.log(e);
    this.setState({ ["startDate"]: e });
  }

  addStop() {
    // not allowed AND not working
    this.setState((state) => {
      const stops = state.stops.concat("");
      return {
        stops,
      };
    });
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  onNextClick() {
    this.setState({ firstHalf: false });
  }

  onButtonChange(e: any) {
    // console.log(e);
    this.setState({ time: e.target.value });
  }

  render() {
    return (
      <div className="OfferRide">
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            var x = this.props.history;
            const { userId } = this.context!.user?.Mail;

            axios
              .post(
                "https://localhost:5001/api/UserApi/OfferRide?userId=" + userId,
                values
              )
              .then(function (response) {
                x.push("/Home");
              })
              .catch(function () {
                alert("Error Loading Page");
              });
            console.log(values);
          }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
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
                            onChange={this.handleChange}
                            margin="normal"
                            name="from"
                            helperText={errors.from}
                          />
                          <TextField
                            label="To"
                            //value={this.state.to}
                            onChange={this.handleChange}
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
                            selected={this.state.selectedDate}
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
                                className={
                                  this.state.time === item
                                    ? "selected"
                                    : "" + "time"
                                }
                                onClick={this.onButtonChange}
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
                          {this.state.stops.length == 0 ? (
                            <button type="button" onClick={this.addStop}>
                              Add
                            </button>
                          ) : (
                            <React.Fragment>
                              {this.state.stops
                                .slice(0, -1)
                                .map((item: string, index: number) => (
                                  <TextField
                                    label={"Stop " + (index + 1)}
                                    value={item}
                                    onChange={this.onStopChange}
                                    margin="normal"
                                    //   name={index}

                                    helperText={errors.from}
                                  />
                                ))}
                              <TextField
                                label={"Stop " + this.state.stops.length}
                                key={this.state.stops.length - 1}
                                //    name={this.state.stops.length - 1}
                                value={this.state.stops.slice(-1)}
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
                      <div className="row">
                        <small>Available Seats</small>
                        <div className="btn-group" role="group">
                          {Array.from(
                            { length: this.state.totalNoOfSeats },
                            (_, k) => (
                              <button key={k} type="button" className="number">
                                {k}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                      <div className="form-group">
                        <button type="submit" className="submit bg-darkorange">
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
      </div>
    );
  }
}

export default OfferRide;
