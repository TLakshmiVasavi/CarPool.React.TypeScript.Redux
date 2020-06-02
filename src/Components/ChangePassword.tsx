import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
import "../StyleSheets/Colors.css";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Types } from "./Interfaces";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { Redirect } from "react-router-dom";
import { UserRequestActions } from "./Redux/User/UserActions";

let userActions = new UserRequestActions();

const validationSchema = Yup.object({
  password: Yup.string().required("Required"),
  newPassword: Yup.string().required("Required"),
  confirmPassword: Yup.string().when("newPassword", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("newPassword")],
      "Both password need to be the same"
    ),
  }),
});

class ChangePassword extends Component<IProps, Types.IChangePassword> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      confirmPassword: "",
    };
  }
  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/");
    }
    return (
      <Formik
        enableReinitialize
        initialValues={this.state}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          this.props.changePassword(
            values,
            this.props.userId,
            this.props.token
          );
        }}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <div className="form-center">
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                type="text"
                onChange={handleChange}
                name="password"
                label={errors.password ?? "password"}
              />
              <TextField
                margin="normal"
                type="text"
                onChange={handleChange}
                name="newPassword"
                label={errors.newPassword ?? "new Password"}
              />
              <TextField
                margin="normal"
                type="text"
                onChange={handleChange}
                name="confirmPassword"
                label={errors.confirmPassword ?? "confirm Password"}
              />
              <button type="submit" className="submit bg-darkorange">
                Submit
              </button>
              <div className="form-group white link">
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
          </div>
        )}
      </Formik>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

interface DispatchProps {
  changePassword: (
    data: Types.IChangePassword,
    userId: string,
    token: string
  ) => void;
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
  userId: state.user.mail,
  token: state.user.token,
});

export default connect(mapStateToProps, {
  changePassword: userActions.ChangePasswordRequestAction,
})(ChangePassword);
