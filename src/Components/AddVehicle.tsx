import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
import "../StyleSheets/Colors.css";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { IVehicle, vehicleType } from "./Interfaces";
import { addVehicle } from "./Redux/User/UserActions";
import { connect } from "react-redux";

const validationSchema = Yup.object({
  model: Yup.string().required("Required"),
  number: Yup.string().required("Required"),
  capacity: Yup.number().required("Required"),
});

class AddVehicle extends Component<
  RouteComponentProps & DispatchProps,
  IVehicle
> {
  constructor(props: RouteComponentProps & DispatchProps) {
    super(props);
    this.state = {
      model: "",
      number: "",
      capacity: 0,
      type: "Car",
    };
  }

  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={this.state}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          this.props.addVehicle(values);
        }}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              className="bg-white rounded-corners"
              name="type"
              select
              label="Vehicle"
              onChange={handleChange}
              SelectProps={{
                native: true,
              }}
            >
              {vehicleType.map((option) => (
                <option key={option.label} value={option.label}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              margin="normal"
              className="bg-white rounded-corners"
              type="text"
              onChange={handleChange}
              name="model"
              label="model"
              helperText={errors.model}
            />
            <TextField
              margin="normal"
              className="bg-white rounded-corners"
              type="text"
              onChange={handleChange}
              name="number"
              label="number"
              helperText={errors.number}
            />
            <TextField
              margin="normal"
              className="bg-white rounded-corners"
              type="text"
              onChange={handleChange}
              name="capacity"
              label="capacity"
              helperText={errors.capacity}
            />

            <button type="submit" className="submit bg-darkorange">
              Submit
            </button>
          </form>
        )}
      </Formik>
    );
  }
}

interface DispatchProps {
  addVehicle: (vehicle: IVehicle) => void;
}
const mapDispatchToProps = {
  addVehicle,
};
export default connect(null, mapDispatchToProps)(AddVehicle);
