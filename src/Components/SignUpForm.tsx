import { Formik } from "formik";
import * as Yup from "yup";
import React, { Component } from "react";
import axios from "axios";
import { TextField,OutlinedInput,InputLabel,InputAdornment,FormControl} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import UserContext from "./UserContext";
import { RouteComponentProps } from "react-router-dom";

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

interface IState {
  [key: string]: any;
  name: string;
  mail: string;
  password: string;
  age: number;
  number: string;
  photo: any;
  gender: string;
  hasVehicle: string;
  vehicle: {
    [key: string]: any;
    model: string;
    number: string;
    capacity: number;
  };
  vehicleType: string;
  showPassword: Boolean;
}

const validationSchema = Yup.object({
  mail: Yup.string()
    .email('Please enter valid mail').required('Required!'),
  password: Yup.string()
    .min(6, 'Password has to be longer than 6 characters!')  
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  name: Yup.string().required("Required"),
  number:Yup.string().required("Required")
  .matches(/^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/,"Please enter valid number"),
  age:Yup.string().required("Required")
  .min(1)
  .max(100),
});

class SignUpForm extends Component<RouteComponentProps, IState> {
  static contextType = UserContext;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      password: "",
      age: 20,
      number: "",
      photo: "",
      gender: "Female",
      hasVehicle: "",
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
  handlefile(e:any) {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  }
  handleMouseDownPassword(event: any) {
    event.preventDefault();
  }

  handleChange(e:any) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  async handleSubmit(evt: any) {
    var x = this.props.history;
    //this.props.history.push("/Home");
    const { toggleAuth, setUser } = this.context!;
    evt.preventDefault();
    const data = new FormData();
    Object.keys(this.state).map((i) => data.append(i, this.state[i]));
    await axios
      .post("https://localhost:5001/api/UserApi/SignUp", data)
      .then(function (response) {
        toggleAuth();
        setUser(response.data);
        x.push("/Home");
      })
      .catch(function () {
        alert("Error Loading Page");
      });
  }

  render() {
    return (
      <div className="bg-darkorange rightHalf">
        <Formik
          enableReinitialize
          initialValues={{
            name: "",
            mail: "",
            password: "",
            age: "",
            number: "",
            photo: "",
            gender: "Female",
            hasVehicle: "",
            vehicle: {
              model: "",
              number: "",
              capacity: "",
            },
            vehicleType: "",
            showPassword: true,
          }}
          validationSchema={validationSchema}
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <h1 className="form-heading underline">SignUp</h1>
              <TextField
                variant="filled"
                label="Enter Name"
                onChange={this.handleChange}
                margin="normal"
                name="name"
                helperText={errors.name}
              />
              <TextField
                variant="filled"
                label="Enter Mail"
                onChange={this.handleChange}
                margin="normal"
                name="mail"
                helperText={errors.mail}
              />
              <TextField
                variant="filled"
                label="Enter Phone number"
                onChange={this.handleChange}
                margin="normal"
                name="number"
                helperText={errors.number}
              />
              <TextField
                variant="filled"
                label="Enter Age"
                onChange={this.handleChange}
                margin="normal"
                name="age"
                helperText={errors.age}
              />
              <TextField
                margin="normal"
                select
                label="Gender"
                //value={Gender}
                onChange={this.handleChange}
                variant="filled"
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
                select
                name="hasVehicle"
                label="Has Car"
                onChange={this.handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Do you have a Vehicle"
                variant="filled"
              >
                {hasVehicle.map((option) => (
                  <option key={option.label} value={option.data}>
                    {option.label}
                  </option>
                ))}
                />
              </TextField>

              <FormControl variant="outlined" margin="normal">
                <InputLabel htmlFor="outlined-adornment-password">
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

              <input type="file" name="photo" onChange={this.handlefile} />

              <TextField
                margin="normal"
                name="vehicleType"
                select
                label="Vehicle"
                onChange={this.handleChange}
                SelectProps={{
                  native: true,
                }}
                helperText="Do you have a Vehicle"
                variant="filled"
              >
                {vehicleType.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <TextField
                variant="filled"
                label="Enter Car number"
                onChange={this.handleChange}
                margin="normal"
                name="vehicle.number"
                helperText={errors.vehicle?.number}
              />

              <TextField
                variant="filled"
                label="Enter model"
                onChange={this.handleChange}
                margin="normal"
                name="vehicle.model"
                helperText={errors.vehicle?.model}
              />

              <TextField
                variant="filled"
                label="Enter capacity"
                onChange={this.handleChange}
                margin="normal"
                name="vehicle.capacity"
                helperText={errors.vehicle?.capacity}
              />
              <button type="submit" className="submit bg-darkorange">
                Log In
              </button>
              <div className="form-group white">
                Not a member yet?
                <a
                  className="underline white"
                  onClick={() => {
                    this.props.history.push("/SignUp");
                  }}
                >
                  SIGN UP
                </a>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

export default SignUpForm;
//Completed but not checked