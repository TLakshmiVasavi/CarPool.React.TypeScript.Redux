import { Formik } from "formik";
import * as Yup from "yup";
import React from "react";
import "../StyleSheets/OfferRide.css";
import { Row, Col } from "react-grid-system";
import "../App.css";
import { MdLocationOn } from "react-icons/md";
import TextField from "@material-ui/core/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { RouteComponentProps } from "react-router-dom";
// import AvailableRide from "./AvailableRide";
import UserContext from "./UserContext";
import { IBookRide } from "./Interfaces";

const times = ["5am-9am", "9am-12pm", "12pm-3pm", "3pm-6pm", "6pm-9pm"];

const validationSchema = Yup.object({
  from: Yup.string().required("Required"),
  to: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
});

class BookRide extends React.Component<RouteComponentProps, IBookRide> {
  static contextType = UserContext;
  context: React.ContextType<typeof UserContext>;
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      AvailableRides: [],
      isChecked: false,
      selectedDate: new Date(),
      from: "",
      to: "",
      time: "5am-9am",
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.dateHandler = this.dateHandler.bind(this);
    this.onButtonChange = this.onButtonChange.bind(this);
  }
  dateHandler(e: any) {
    console.log(e);
    this.setState({ ["selectedDate"]: e });
  }
  onButtonChange(e: any) {
    this.setState({ time: e.target.value });
  }

  handleChecked() {
    this.setState({ isChecked: !this.state.isChecked });
  }

  handleSubmit(e: any) {
    var context = this.context!;
    var state = this;
    e.preventDefault();
    axios
      .post(
        "https://localhost:5001/api/RideApi/BookRide?userId=" +
          context.user?.mail,
        this.state
      )
      .then(function (res) {
        state.setState({ AvailableRides: res.data });
      })
      .catch(function () {
        alert("Error Loading Page");
      });
  }
  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="OfferRide">
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <div className="shadowBox">
                    <Row>
                      <Col md={8}>
                        <h3>Book a Ride</h3>
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

                    <div id="first">
                      <Row>
                        <Col md={8}>
                          <TextField
                            label="From"
                            onChange={this.handleChange}
                            margin="normal"
                            name="from"
                            helperText={errors.from}
                          />
                          <TextField
                            label="To"
                            onChange={this.handleChange}
                            margin="normal"
                            name="to"
                            helperText={errors.to}
                          />
                        </Col>
                        <Col md={2}>
                          <div className="dot" />
                          <div className="dot" />
                          <div className="dot" />
                          <MdLocationOn />
                        </Col>
                      </Row>
                      <Row>
                        <Col md={8}>
                          <small>Date</small>
                          <DatePicker
                            dateFormat="MM/dd/yyyy"
                            // margin="normal"
                            id="date-picker-inline"
                            //label="Date picker inline"
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
                          <input
                            onClick={this.handleSubmit}
                            type="submit"
                            className="submit bg-darkorange"
                            value="Submit"
                            data-test="submit"
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
                <Col md={8}>
                  <Col id="matches" md={10}>
                    {/* { this.state.map((ride:IRideDetails)=>(<AvailableRide {...ride}/>))} */}
                  </Col>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default BookRide;
