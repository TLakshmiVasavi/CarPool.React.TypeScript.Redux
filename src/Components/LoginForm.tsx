import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
import "../StyleSheets/Colors.css";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { IAuthUser } from "./Interfaces";
import { Login } from "./Redux/User/UserActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppState } from "./Redux/rootReducer";
//import * as x from "react-notifications-component";

import Notification from "react-notifications-component";

const validationSchema = Yup.object({
  id: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

class LoginForm extends Component<
  RouteComponentProps & DispatchProps,
  IAuthUser
> {
  constructor(props: RouteComponentProps & DispatchProps) {
    super(props);
    this.state = {
      id: "",
      password: "",
      error: "",
    };
  }
  render() {
    return (
      <div className="rightHalf">
        <Notification />
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            this.props.Login(values);
          }}
        >
          {({ handleSubmit, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <div>{this.state.error}</div>
              <h1 className="form-heading underline">Log In</h1>
              <TextField
                margin="normal"
                className="bg-white rounded-corners"
                type="text"
                onChange={handleChange}
                name="id"
                label="id"
                helperText={errors.id}
              />

              <TextField
                margin="normal"
                className="bg-white rounded-corners"
                type="text"
                onChange={handleChange}
                name="password"
                label="password"
                helperText={errors.password}
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

interface DispatchProps {
  Login: (user: IAuthUser) => void;
}
const mapDispatchToProps = {
  Login,
};

export default connect(null, mapDispatchToProps)(LoginForm);
