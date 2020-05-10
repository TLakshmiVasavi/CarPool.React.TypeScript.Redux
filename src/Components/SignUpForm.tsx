import { Formik } from "formik";
import * as Yup from "yup";
import React, { Component } from "react";
import {
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { RouteComponentProps } from "react-router-dom";
import { INewUser } from "./Interfaces";
import { Signup } from "./Redux/User/UserActions";
import { connect } from "react-redux";

const Gender = [
  {
    label: "Female",
  },
  {
    label: "Male",
  },
];

const vehicleType = [
  {
    label: " Car ",
  },
  {
    label: " Bike ",
  },
];

const hasVehicle = [
  {
    label: "Yes",
    data: "true",
  },
  {
    label: "No",
    data: "false",
  },
];

const validationSchema = Yup.object({
  mail: Yup.string().email("Please enter valid mail").required("Required!"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  name: Yup.string().required("Required"),
  number: Yup.string()
    .required("Required")
    .matches(
      /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
      "Please enter valid number"
    ),
  age: Yup.string().required("Required").min(0).max(100),
});

class SignUpForm extends Component<
  RouteComponentProps & DispatchProps,
  INewUser
> {
  constructor(props: RouteComponentProps & DispatchProps) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      password: "",
      age: 20,
      number: "",
      photo: "",
      gender: "Female",
      hasVehicle: true,
      vehicle: {
        model: "",
        number: "",
        capacity: 0,
      },
      vehicleType: "",
      showPassword: true,
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
  }

  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handlefile(e: any) {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  }

  handleMouseDownPassword(event: any) {
    event.preventDefault();
  }

  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleVehicleChange(e: any) {
    const { name, value } = e.target;
    const vehicle = { ...this.state.vehicle };
    vehicle[name] = value;
    this.setState({ vehicle });
  }

  handleSubmit() {
    this.props.Signup(this.state);
  }

  render() {
    return (
      <div className="bg-darkorange rightHalf">
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, errors }) => (
            <form onSubmit={handleSubmit}>
              <h1 className="form-heading underline">SignUp</h1>
              <TextField
                className="bg-white rounded-corners"
                label="Enter Name"
                onChange={this.handleChange}
                margin="normal"
                name="name"
                helperText={errors.name}
              />
              <TextField
                className="bg-white rounded-corners"
                label="Enter Mail"
                onChange={this.handleChange}
                margin="normal"
                name="mail"
                helperText={errors.mail}
              />
              <TextField
                className="bg-white rounded-corners"
                label="Enter Phone number"
                onChange={this.handleChange}
                margin="normal"
                name="number"
                helperText={errors.number}
              />
              <TextField
                className="bg-white rounded-corners"
                label="Enter Age"
                onChange={this.handleChange}
                margin="normal"
                name="age"
                helperText={errors.age}
              />
              <TextField
                margin="normal"
                className="bg-white rounded-corners"
                select
                label="Gender"
                //value={Gender}
                onChange={this.handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                {Gender.map((option) => (
                  <option value={option.label}>{option.label}</option>
                ))}
                />
              </TextField>

              <TextField
                margin="normal"
                className="bg-white rounded-corners"
                select
                name="hasVehicle"
                label="Has Car"
                onChange={this.handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                {hasVehicle.map((option) => (
                  <option key={option.label} value={option.data}>
                    {option.label}
                  </option>
                ))}
                />
              </TextField>

              <FormControl margin="normal">
                <InputLabel htmlFor="filled-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  onChange={this.handleChange}
                  //helperText={errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                        edge="end"
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>

              <input
                type="file"
                name="photo"
                onChange={this.handlefile}
                className="bg-white rounded-corners"
              />
              {this.state.hasVehicle && (
                <>
                  <TextField
                    margin="normal"
                    className="bg-white rounded-corners"
                    name="vehicleType"
                    select
                    label="Vehicle"
                    onChange={this.handleVehicleChange}
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
                    className="bg-white rounded-corners"
                    label="Enter Car number"
                    onChange={this.handleVehicleChange}
                    margin="normal"
                    name="vehicle.number"
                    helperText={errors.vehicle?.number}
                  />

                  <TextField
                    className="bg-white rounded-corners"
                    label="Enter model"
                    onChange={this.handleVehicleChange}
                    margin="normal"
                    name="vehicle.model"
                    helperText={errors.vehicle?.model}
                  />

                  <TextField
                    className="bg-white rounded-corners"
                    label="Enter capacity"
                    onChange={this.handleVehicleChange}
                    margin="normal"
                    name="vehicle.capacity"
                    helperText={errors.vehicle?.capacity}
                  />
                </>
              )}
              <button type="submit" className="submit bg-darkorange">
                SignUp
              </button>
              <div className="form-group white">
                Not a member yet?
                <a
                  className="underline white"
                  onClick={() => {
                    this.props.history.push("/LoginForm");
                  }}
                >
                  LogIn
                </a>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
interface DispatchProps {
  Signup: (user: INewUser) => void;
}
const mapDispatchToProps = {
  Signup,
};
export default connect(null, mapDispatchToProps)(SignUpForm);
