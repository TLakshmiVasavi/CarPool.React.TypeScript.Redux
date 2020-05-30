import { Formik } from "formik";
import * as Yup from "yup";
import React, { Component } from "react";
import {
  TextField,
  FilledInput,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  Input,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import { RouteComponentProps } from "react-router-dom";
import { Types, hasVehicle, vehicleType, Gender } from "./Interfaces";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { UserActions } from "./Redux/User/UserActions";
import "../StyleSheets/Colors.css";
let userActions = new UserActions();
const validationSchema = Yup.object().shape({
  mail: Yup.string()
    .email("Please enter valid mail")
    .required("Name is Required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Please Choose Strong Password"
      // "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  name: Yup.string().required("Name is Required"),
  number: Yup.string()
    .required("Number is Required")
    .matches(
      /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,
      "Please enter valid number"
    ),
  age: Yup.string()
    .required("Age is Required")
    .min(0, "Enter Valid Value")
    .max(100, "Enter Valid Value"),
});

class SignUpForm extends Component<IProps, Types.INewUser> {
  constructor(props: IProps) {
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
        type: "Car",
      },
      showPassword: true,
    };
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handlefile = this.handlefile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleVehicleChange = this.handleVehicleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickShowPassword() {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  }

  handlefile(e: any) {
    console.log(e.target);
    console.log(e.target.files[0]);
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  }

  handleMouseDownPassword(event: any) {
    event.preventDefault();
  }

  handleChange(e: any) {
    let { name, value } = e.target;
    console.log(e);
    if (value == "true") {
      value = true;
    }
    if (value == "false") {
      value = false;
    }
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
    if (this.props.isLoggedIn) {
      this.props.history.push("/Dashboard");
    }
    return (
      <div className="bg-darkorange rightHalf">
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <h1 className="form-heading underline">SignUp</h1>
              <TextField
                label={errors.name ?? "Enter Name"}
                onChange={this.handleChange}
                margin="normal"
                name="name"
              />
              <TextField
                label={errors.mail ?? "Enter Mail"}
                onChange={this.handleChange}
                margin="normal"
                name="mail"
              />
              <TextField
                label={errors.number ?? "Enter Phone number"}
                onChange={this.handleChange}
                margin="normal"
                name="number"
              />
              <TextField
                label={errors.age ?? "Enter Age"}
                onChange={this.handleChange}
                margin="normal"
                name="age"
                type="number"
              />
              <TextField
                margin="normal"
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

              <FormControl>
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  className="margin"
                  name="password"
                  type={this.state.showPassword ? "text" : "password"}
                  onChange={this.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <input type="file" name="photo" onChange={this.handlefile} />
              <TextField
                margin="normal"
                select
                name="hasVehicle"
                label="Has Vehicle"
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
              <>
                {this.state.hasVehicle && (
                  <>
                    <TextField
                      margin="normal"
                      name="type"
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
                      label={errors.vehicle?.number ?? "Enter Car number"}
                      onChange={this.handleVehicleChange}
                      margin="normal"
                      name="vehicle.number"
                    />
                    <TextField
                      label={errors.vehicle?.model ?? "Enter model"}
                      onChange={this.handleVehicleChange}
                      margin="normal"
                      name="vehicle.model"
                    />
                    {this.state.vehicle.type != "Bike" && (
                      <TextField
                        label={errors.vehicle?.capacity ?? "Enter capacity"}
                        onChange={this.handleVehicleChange}
                        margin="normal"
                        name="vehicle.capacity"
                        type="number"
                      />
                    )}
                  </>
                )}
              </>
              <button type="submit" className="submit bg-darkorange">
                SignUp
              </button>
              <div className="form-group white link">
                Not a member yet?
                <a
                  className="underline white"
                  onClick={() => {
                    this.props.history.push("/Login");
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
  Signup: (user: Types.INewUser) => void;
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
});
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, {
  Signup: userActions.UserSignupRequestAction,
})(SignUpForm);
