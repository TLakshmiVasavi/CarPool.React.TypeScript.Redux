import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
import "../StyleSheets/Colors.css";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Types, vehicleType } from "./Interfaces";
import { UserActions } from "./Redux/User/UserActions";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
let userActions = new UserActions();
const validationSchema = Yup.object({
  model: Yup.string().required("Required"),
  number: Yup.string().required("Required"),
  capacity: Yup.number().required("Required"),
});

class AddVehicle extends Component<IProps, Types.IVehicle> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      model: "",
      number: "",
      capacity: 0,
      type: "Car",
    };
  }

  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/Login");
    }

    return (
      <Formik
        enableReinitialize
        initialValues={this.state}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          this.props.addVehicle(values, this.props.userId);
        }}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <div className="form-center">
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
                label={errors.model ?? "model"}
              />
              <TextField
                margin="normal"
                className="bg-white rounded-corners"
                type="text"
                onChange={handleChange}
                name="number"
                label={errors.number ?? "number"}
              />
              <TextField
                margin="normal"
                className="bg-white rounded-corners"
                type="text"
                onChange={handleChange}
                name="capacity"
                label={errors.capacity ?? "capacity"}
              />

              <button type="submit" className="submit bg-darkorange">
                Submit
              </button>
            </form>
          </div>
        )}
      </Formik>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

interface DispatchProps {
  addVehicle: (vehicle: Types.IVehicle, userId: string) => void;
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
  userId: state.user.mail,
});

export default connect(mapStateToProps, {
  addVehicle: userActions.AddVehicleAction,
})(AddVehicle);
